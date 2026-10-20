import { useState, useCallback } from 'react';
import { Zap, Copy, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Run Berlekamp-Massey in the browser (BigInt for large mod)
function berlekampMassey(seq: bigint[], mod: bigint): bigint[] {
  const n = seq.length;
  let cur: bigint[] = [];
  let lst: bigint[] = [];
  let lf = 0;
  let ld = 0n;

  for (let i = 0; i < n; i++) {
    let t = 0n;
    for (let j = 0; j < cur.length; j++) {
      t = (t + cur[j] * seq[i - 1 - j]) % mod;
    }
    const diff = ((seq[i] - t) % mod + mod) % mod;
    if (diff === 0n) continue;
    if (cur.length === 0) {
      cur = new Array(i + 1).fill(0n);
      lf = i;
      ld = diff;
      continue;
    }
    const k = (diff * modPow(ld, mod - 2n, mod)) % mod;
    const c: bigint[] = new Array(Math.max(cur.length, i - lf - 1 + 1 + lst.length)).fill(0n);
    // copy cur
    for (let j = 0; j < cur.length; j++) c[j] = cur[j];
    // add shift
    const offset = i - lf - 1;
    if (offset >= 0) {
      c[offset] = (c[offset] + k + mod) % mod;
    }
    for (let j = 0; j < lst.length; j++) {
      c[offset + 1 + j] = (c[offset + 1 + j] + (mod - k * lst[j] % mod) + mod) % mod;
    }
    if (i - lf + lst.length >= cur.length) {
      lst = [...cur];
      lf = i;
      ld = diff;
    }
    cur = c;
  }
  return cur;
}

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = result * base % mod;
    exp = exp / 2n;
    base = base * base % mod;
  }
  return result;
}

function matMul(A: bigint[][], B: bigint[][], mod: bigint): bigint[][] {
  const n = A.length;
  const C: bigint[][] = Array.from({ length: n }, () => new Array(n).fill(0n));
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      if (A[i][k] === 0n) continue;
      for (let j = 0; j < n; j++) {
        C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod;
      }
    }
  }
  return C;
}

function matPow(M: bigint[][], p: bigint, mod: bigint): bigint[][] {
  const n = M.length;
  let R: bigint[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1n : 0n))
  );
  while (p > 0n) {
    if (p % 2n === 1n) R = matMul(R, M, mod);
    M = matMul(M, M, mod);
    p = p / 2n;
  }
  return R;
}

function computeNthTerm(seq: bigint[], c: bigint[], n: bigint, mod: bigint): bigint {
  const k = BigInt(c.length);
  if (n < BigInt(seq.length)) return ((seq[Number(n)] % mod) + mod) % mod;
  if (k === 0n) return 0n;

  // Companion matrix
  const M: bigint[][] = Array.from({ length: Number(k) }, (_, i) =>
    Array.from({ length: Number(k) }, (_, j) => {
      if (i === 0) return c[j];
      if (j === i - 1) return 1n;
      return 0n;
    })
  );

  const R = matPow(M, n - k + 1n, mod);
  let ans = 0n;
  for (let j = 0; j < Number(k); j++) {
    ans = (ans + R[0][j] * seq[Number(k) - 1 - j]) % mod;
  }
  return (ans + mod) % mod;
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} style={{
      display: 'flex', alignItems: 'center', gap: '4px',
      background: copied ? 'rgba(52,211,153,0.15)' : 'rgba(79,142,247,0.1)',
      border: `1px solid ${copied ? 'rgba(52,211,153,0.4)' : 'rgba(79,142,247,0.3)'}`,
      color: copied ? '#34d399' : '#4f8ef7',
      borderRadius: '6px', padding: '4px 10px', cursor: 'pointer',
      fontSize: '0.75rem', fontWeight: 600,
    }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function BerlekampMasseyCalc() {
  const { state, setState } = useApp();
  const [seqInput, setSeqInput] = useState(state.bmSequence || '');
  const [modInput, setModInput] = useState(state.bmMod || '998244353');
  const [queryN, setQueryN] = useState('');
  const [result, setResult] = useState<{
    recurrence: bigint[];
    nthTerm: bigint | null;
    order: number;
    error: string | null;
  } | null>(null);

  const run = useCallback(() => {
    try {
      const mod = BigInt(modInput.trim());
      if (mod <= 1n) throw new Error('Mod phải > 1');

      const seq = seqInput
        .split(/[\s,]+/)
        .filter(s => s.trim())
        .map(s => {
          const v = BigInt(s.trim());
          return ((v % mod) + mod) % mod;
        });

      if (seq.length < 2) throw new Error('Cần ít nhất 2 số hạng');

      const c = berlekampMassey(seq, mod);
      let nthTerm: bigint | null = null;
      if (queryN.trim()) {
        const n = BigInt(queryN.trim());
        nthTerm = computeNthTerm(seq, c, n, mod);
      }

      setResult({ recurrence: c, nthTerm, order: c.length, error: null });
      setState(s => ({ ...s, bmSequence: seqInput, bmMod: modInput }));
    } catch (e: any) {
      setResult({ recurrence: [], nthTerm: null, order: 0, error: e.message });
    }
  }, [seqInput, modInput, queryN]);

  const generatePythonCode = () => {
    if (!result || result.recurrence.length === 0) return '';
    const c = result.recurrence.map(x => x.toString()).join(', ');
    const seq = seqInput.split(/[\s,]+/).filter(s => s.trim()).map(s => s.trim()).join(', ');
    return `# Berlekamp-Massey Result
MOD = ${modInput}
# Recurrence: a[i] = sum(c[j] * a[i-1-j] for j in range(${result.order}))
coefficients = [${c}]  # order = ${result.order}
initial_terms = [${seq}]

def nth_term(n, seq=initial_terms, c=coefficients, mod=MOD):
    from typing import List
    if n < len(seq): return seq[n] % mod
    k = len(c)
    if k == 0: return 0
    def mat_mul(A, B):
        n = len(A)
        C = [[0]*n for _ in range(n)]
        for i in range(n):
            for kk in range(n):
                if A[i][kk] == 0: continue
                for j in range(n):
                    C[i][j] = (C[i][j] + A[i][kk] * B[kk][j]) % mod
        return C
    def mat_pow(M, p):
        n = len(M)
        R = [[int(i==j) for j in range(n)] for i in range(n)]
        while p:
            if p & 1: R = mat_mul(R, M)
            M = mat_mul(M, M)
            p >>= 1
        return R
    M = [[c[j] for j in range(k)] if i == 0 else [int(j == i-1) for j in range(k)]
         for i in range(k)]
    R = mat_pow(M, n - k + 1)
    return sum(R[0][j] * seq[k-1-j] for j in range(k)) % mod

# Test: nth_term(${queryN || 10})`;
  };

  const PRESETS = [
    { name: 'Fibonacci', seq: '1 1 2 3 5 8 13 21 34 55', mod: '998244353' },
    { name: 'Lucas', seq: '2 1 3 4 7 11 18 29 47 76', mod: '998244353' },
    { name: 'a[n]=3a[n-1]-a[n-2]', seq: '1 3 8 21 55 144 377 987', mod: '1000000007' },
    { name: 'a[n]=a[n-1]+a[n-2]+a[n-3]', seq: '1 1 2 4 7 13 24 44 81 149', mod: '998244353' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
          <span style={{
            background: 'linear-gradient(135deg, #a78bfa, #4f8ef7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
            🧮 Berlekamp-Massey Calculator
          </span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '0.9rem' }}>
          Vũ khí bí mật: nhập 8–16 số hạng từ Subtask 1 → tìm công thức truy hồi → tính a(N) với N ≤ 10¹⁸
        </p>
      </div>

      <div className="warning-box" style={{ marginBottom: '20px' }}>
        <strong>🎯 Chiến thuật:</strong> Từ Subtask 1 (N nhỏ), tính tay hoặc code brute force ra 8–16 số hạng đầu tiên.
        Nhập vào đây → BM tự tìm công thức truy hồi → tính a(10^18) trong giây lát!
      </div>

      {/* Presets */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>Ví dụ nhanh:</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {PRESETS.map(p => (
            <button
              key={p.name}
              onClick={() => { setSeqInput(p.seq); setModInput(p.mod); setResult(null); }}
              style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                borderRadius: '999px', padding: '4px 12px', fontSize: '0.78rem',
                cursor: 'pointer', color: 'var(--text-secondary)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#a78bfa'; (e.currentTarget as HTMLButtonElement).style.color = '#a78bfa'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
            Số hạng đầu tiên (cách nhau bởi dấu cách hoặc dấu phẩy):
          </label>
          <textarea
            className="input-field"
            rows={3}
            value={seqInput}
            onChange={e => setSeqInput(e.target.value)}
            placeholder="1 1 2 3 5 8 13 21 34 55"
            style={{ fontFamily: 'monospace', fontSize: '0.9rem', resize: 'vertical' }}
          />
        </div>
        <div>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Modulo (thường là 998244353 hoặc 10^9+7):
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {['998244353', '1000000007'].map(m => (
                <button
                  key={m}
                  onClick={() => setModInput(m)}
                  style={{
                    padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer',
                    background: modInput === m ? 'rgba(167,139,250,0.15)' : 'var(--bg-secondary)',
                    border: `1px solid ${modInput === m ? 'rgba(167,139,250,0.4)' : 'var(--border)'}`,
                    color: modInput === m ? '#a78bfa' : 'var(--text-secondary)',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
            <input
              className="input-field"
              value={modInput}
              onChange={e => setModInput(e.target.value)}
              placeholder="998244353"
              style={{ fontFamily: 'monospace' }}
            />
          </div>
          <div style={{ marginTop: '12px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Tính a[N] = ? (tùy chọn, có thể nhập N ≤ 10^18):
            </label>
            <input
              className="input-field"
              value={queryN}
              onChange={e => setQueryN(e.target.value)}
              placeholder="1000000000000000000"
              style={{ fontFamily: 'monospace' }}
            />
          </div>
        </div>
      </div>

      <button
        className="btn-primary"
        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', padding: '10px 24px', marginBottom: '24px' }}
        onClick={run}
      >
        <Zap size={16} /> Chạy Berlekamp-Massey
      </button>

      {result && (
        <div className="animate-fade-in">
          {result.error ? (
            <div className="warning-box">❌ Lỗi: {result.error}</div>
          ) : (
            <div>
              {/* Recurrence result */}
              <div style={{
                background: 'rgba(167,139,250,0.08)',
                border: '1px solid rgba(167,139,250,0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#a78bfa' }}>
                    🎯 Kết Quả Berlekamp-Massey
                  </h3>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Bậc truy hồi (order):</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#a78bfa' }}>{result.order}</div>
                </div>

                {result.order > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Hệ số c[0], c[1], ..., c[{result.order - 1}]:</div>
                    <div style={{
                      background: '#0d1117',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      color: '#a78bfa',
                      wordBreak: 'break-all',
                    }}>
                      [{result.recurrence.map(x => x.toString()).join(', ')}]
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.6 }}>
                      Công thức: <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                        a[i] = {result.recurrence.map((c, j) => `${c.toString()} × a[i-${j + 1}]`).join(' + ')} (mod {modInput})
                      </span>
                    </div>
                  </div>
                )}

                {result.nthTerm !== null && (
                  <div style={{
                    background: 'rgba(52,211,153,0.08)',
                    border: '1px solid rgba(52,211,153,0.3)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                  }}>
                    <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, marginBottom: '4px' }}>
                      a[{queryN}] mod {modInput} =
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {result.nthTerm.toString()}
                    </div>
                  </div>
                )}
              </div>

              {/* Generated Python code */}
              {result.order > 0 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>🐍 Code Python tự động sinh:</h4>
                    <CopyBtn text={generatePythonCode()} />
                  </div>
                  <div style={{
                    background: '#0d1117',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    overflow: 'auto',
                  }}>
                    <pre style={{
                      margin: 0, padding: '14px',
                      fontSize: '0.78rem', lineHeight: 1.65,
                      color: 'var(--text-primary)',
                      fontFamily: "'JetBrains Mono', monospace",
                      maxHeight: '350px',
                    }}>
                      {generatePythonCode()}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
