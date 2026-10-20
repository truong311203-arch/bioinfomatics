import { useState } from 'react';
import { Copy, Check, Cpu } from 'lucide-react';

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      style={{
        display: 'flex', alignItems: 'center', gap: '5px',
        background: copied ? 'rgba(52,211,153,0.15)' : 'rgba(79,142,247,0.15)',
        border: `1px solid ${copied ? 'rgba(52,211,153,0.4)' : 'rgba(79,142,247,0.4)'}`,
        color: copied ? '#34d399' : '#4f8ef7',
        borderRadius: '6px', padding: '5px 12px', cursor: 'pointer',
        fontSize: '0.78rem', fontWeight: 600,
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function SnippetBlock({ title, lang, code, description }: { title: string; lang: string; code: string; description?: string }) {
  const isPython = lang.includes('Python');
  const colors = isPython
    ? { bg: 'rgba(52,211,153,0.04)', border: 'rgba(52,211,153,0.2)', label: '#34d399' }
    : { bg: 'rgba(79,142,247,0.04)', border: 'rgba(79,142,247,0.2)', label: '#4f8ef7' };

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
          {description && <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{description}</p>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: colors.label, fontWeight: 600, fontFamily: 'monospace' }}>{lang}</span>
          <CopyBtn text={code} />
        </div>
      </div>
      <div style={{ background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <pre style={{
          margin: 0, padding: '14px', overflow: 'auto',
          fontSize: '0.79rem', lineHeight: 1.65, color: 'var(--text-primary)',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          maxHeight: '350px',
        }}>
          {code}
        </pre>
      </div>
    </div>
  );
}

const PYTHON_TEMPLATE = `#!/usr/bin/env python3
# ============================================================
# template_bioturing.py – BioTuring IOI Subtask Standard
# ============================================================
import sys
import os
from math import inf, gcd, ceil, floor, log2
from collections import defaultdict, Counter, deque
from itertools import accumulate, combinations, permutations
from functools import lru_cache
from bisect import bisect_left, bisect_right

# ──────────────────────────────────────────────────────────
# I/O OPTIMIZATION (CRITICAL for large N)
# ──────────────────────────────────────────────────────────
input = sys.stdin.readline          # Fast single-line read
# OR for very large input:
# data = sys.stdin.read().split()
# idx = 0
# def input(): global idx; token = data[idx]; idx += 1; return token

# ──────────────────────────────────────────────────────────
# RECURSION LIMIT (for DFS / @cache)
# ──────────────────────────────────────────────────────────
sys.setrecursionlimit(300_000)

# ──────────────────────────────────────────────────────────
# COMMON CONSTANTS
# ──────────────────────────────────────────────────────────
MOD = 998_244_353     # or 1_000_000_007
INF = float('inf')
NINF = float('-inf')

# ──────────────────────────────────────────────────────────
# SUBTASK BRANCHING TEMPLATE
# ──────────────────────────────────────────────────────────
def solve_subtask1(n, data):
    """Subtask 1: N ≤ 20 or N ≤ 1000 – Simple O(N²) or brute force"""
    # TODO: implement brute force
    pass

def solve_subtask2(n, data):
    """Subtask 2: N ≤ 10^5 – Efficient algorithm"""
    # TODO: implement efficient solution
    pass

def solve_subtask3(n, data):
    """Subtask 3: N ≤ 2×10^5 or N ≤ 10^18 – Optimal"""
    # TODO: implement optimal solution
    pass

def main():
    n = int(input())
    data = list(map(int, input().split()))
    
    # ── SUBTASK ROUTING ──────────────────────────────
    if n <= 20:
        ans = solve_subtask1(n, data)
    elif n <= 1000:
        # Still subtask 1/2 boundary
        ans = solve_subtask1(n, data)
    else:
        ans = solve_subtask2(n, data)
    
    print(ans)

if __name__ == '__main__':
    main()`;

const CPP_TEMPLATE = `// ============================================================
// template.cpp – BioTuring KACTL Standard Template
// ============================================================
#pragma GCC optimize("O2,unroll-loops")
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")
#include <bits/stdc++.h>
using namespace std;

// ──────────────────────────────────────────────────────────
// KACTL MACROS
// ──────────────────────────────────────────────────────────
#define rep(i, a, b) for(int i = a; i < (b); ++i)
#define all(x) x.begin(), x.end()
#define sz(x) (int)(x).size()
typedef long long ll;
typedef pair<int,int> pii;
typedef vector<int> vi;
typedef vector<ll> vll;
typedef vector<pii> vpii;

// ──────────────────────────────────────────────────────────
// CONSTANTS
// ──────────────────────────────────────────────────────────
const ll MOD = 998244353;   // or 1e9+7
const ll INF = 1e18;
const int INF32 = 1e9;
const double EPS = 1e-9;

// ──────────────────────────────────────────────────────────
// MODULAR ARITHMETIC
// ──────────────────────────────────────────────────────────
ll pw(ll a, ll b, ll mod = MOD) {
    a %= mod; ll r = 1;
    for (; b; b >>= 1, a = a*a%mod)
        if (b & 1) r = r*a%mod;
    return r;
}
ll inv(ll a, ll mod = MOD) { return pw(a, mod-2, mod); }

// ──────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n; cin >> n;
    
    // TODO: Subtask branching if needed
    // if (n <= 1000) { ... } else { ... }
    
    return 0;
}`;

const BM_PYTHON = `# ============================================================
# Berlekamp-Massey + Matrix Exponentiation
# Vũ khí bí mật: từ Subtask 1 tìm pattern → tính a(N) với N ≤ 10^18
# ============================================================
import sys
input = sys.stdin.readline

MOD = 998244353

def berlekamp_massey(s, mod=MOD):
    """Find shortest linear recurrence. Returns coefficients c[]."""
    n = len(s)
    cur, lst = [], []
    lf, ld = 0, 0
    for i in range(n):
        t = sum(cur[j] * s[i-1-j] for j in range(len(cur))) % mod
        if (s[i] - t) % mod == 0:
            continue
        if not cur:
            cur = [0] * (i + 1)
            lf, ld = i, (s[i] - t) % mod
            continue
        k = -(s[i] - t) * pow(ld, mod - 2, mod) % mod
        c = [0] * (i - lf - 1) + [k] + [-k * x % mod for x in lst]
        if len(c) < len(cur):
            c += [0] * (len(cur) - len(c))
        for j in range(len(cur)):
            c[j] = (c[j] + cur[j]) % mod
        if i - lf + len(lst) >= len(cur):
            lst, lf, ld = cur, i, (s[i] - t) % mod
        cur = c
    return cur

def mat_mul(A, B, mod):
    n = len(A)
    C = [[0]*n for _ in range(n)]
    for i in range(n):
        for k in range(n):
            if A[i][k] == 0: continue
            for j in range(n):
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod
    return C

def mat_pow(M, p, mod):
    n = len(M)
    R = [[int(i==j) for j in range(n)] for i in range(n)]
    while p:
        if p & 1: R = mat_mul(R, M, mod)
        M = mat_mul(M, M, mod)
        p >>= 1
    return R

def nth_term(seq, n, mod=MOD):
    """Compute seq[n] for arbitrary large n using BM + Matrix Exp."""
    if n < len(seq): return seq[n] % mod
    c = berlekamp_massey(seq, mod)
    k = len(c)
    if k == 0: return 0
    # Companion matrix
    M = [[0]*k for _ in range(k)]
    for j in range(k): M[0][j] = c[j]
    for i in range(1, k): M[i][i-1] = 1
    R = mat_pow(M, n - k + 1, mod)
    return sum(R[0][j] * seq[k-1-j] for j in range(k)) % mod

# Usage:
# seq = [1, 1, 2, 3, 5, 8, 13, 21]  # first terms from Subtask 1
# print(nth_term(seq, 10**18))         # computes in O(K² log N)`;

const DSU_POTENTIAL = `# Union-Find with Potential (Weighted DSU)
# Dùng cho: tìm chênh lệch giữa các phần tử trong cùng component
class DSUPotential:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.pot = [0] * n  # potential[i] = offset from i to its root
    
    def find(self, x):
        if self.parent[x] == x:
            return x, 0
        root, p = self.find(self.parent[x])
        self.pot[x] += self.pot[self.parent[x]]
        self.parent[x] = root
        return root, self.pot[x]
    
    def union(self, x, y, diff):
        """Set potential[y] - potential[x] = diff"""
        rx, px = self.find(x)
        ry, py = self.find(y)
        if rx == ry:
            return py - px == diff  # consistency check
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
            px, py = py, px
            diff = -diff
        self.parent[ry] = rx
        self.pot[ry] = px - py + diff
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True`;

const SEGMENT_TREE = `# Segment Tree with Lazy Propagation (Flat Array, PyPy-optimized)
class LazySegTree:
    def __init__(self, n, identity=0):
        self.n = n
        self.size = 1
        while self.size < n: self.size <<= 1
        self.tree = [identity] * (2 * self.size)
        self.lazy = [0] * (2 * self.size)
        self.identity = identity
    
    def _push(self, node):
        if self.lazy[node]:
            for child in [2*node, 2*node+1]:
                self.tree[child] += self.lazy[node]
                self.lazy[child] += self.lazy[node]
            self.lazy[node] = 0
    
    def _update(self, node): 
        self.tree[node] = self.tree[2*node] + self.tree[2*node+1]
    
    def update(self, l, r, val, node=1, lo=None, hi=None):
        if lo is None: lo, hi = 0, self.size - 1
        if r < lo or hi < l: return
        if l <= lo and hi <= r:
            self.tree[node] += val * (hi - lo + 1)
            self.lazy[node] += val
            return
        self._push(node)
        mid = (lo + hi) // 2
        self.update(l, r, val, 2*node, lo, mid)
        self.update(l, r, val, 2*node+1, mid+1, hi)
        self._update(node)
    
    def query(self, l, r, node=1, lo=None, hi=None):
        if lo is None: lo, hi = 0, self.size - 1
        if r < lo or hi < l: return self.identity
        if l <= lo and hi <= r: return self.tree[node]
        self._push(node)
        mid = (lo + hi) // 2
        return self.query(l, r, 2*node, lo, mid) + self.query(l, r, 2*node+1, mid+1, hi)`;

const ROLLING_HASH = `# Rolling Hash mod (2^61 - 1) for DNA strings
# Safe against anti-hash tests, handles {A, C, G, T}
MOD = (1 << 61) - 1  # Mersenne prime
BASE = 131  # or use 1000000007 with smaller base

def mul(a, b):
    """Modular multiplication mod 2^61-1"""
    return (a * b) % MOD

class RollingHash:
    def __init__(self, s):
        n = len(s)
        self.h = [0] * (n + 1)
        self.pw = [1] * (n + 1)
        for i, c in enumerate(s):
            self.h[i+1] = (self.h[i] * BASE + ord(c)) % MOD
            self.pw[i+1] = self.pw[i] * BASE % MOD
    
    def get(self, l, r):  # hash of s[l..r] 0-indexed
        return (self.h[r+1] - self.h[l] * self.pw[r-l+1]) % MOD
    
    def lcp(self, rh, l1, l2, n):
        """LCP between self[l1:] and rh[l2:] of max length n, using binary search"""
        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if self.get(l1, l1+mid-1) == rh.get(l2, l2+mid-1):
                lo = mid
            else:
                hi = mid - 1
        return lo

# Usage with DNA:
# dna = "ACGTACGT"
# rh = RollingHash(dna)
# hash_acg = rh.get(0, 2)  # hash of "ACG"`;

const HOPKROFT_KARP_FULL = `# Hopcroft-Karp O(√V × E) – Fastest Bipartite Matching in Python
from collections import deque

def hopcroft_karp(n, m, adj):
    """
    n: left nodes (0-indexed), m: right nodes (0-indexed)
    adj: adj[u] = list of right nodes connected to left node u
    Returns: (matching_size, match_left, match_right)
    """
    INF = float('inf')
    match_l = [-1] * n
    match_r = [-1] * m
    
    def bfs():
        dist = [INF] * n
        queue = deque()
        for u in range(n):
            if match_l[u] < 0:
                dist[u] = 0
                queue.append(u)
        found = False
        while queue:
            u = queue.popleft()
            for v in adj[u]:
                w = match_r[v]
                if w < 0:
                    found = True
                elif dist[w] == INF:
                    dist[w] = dist[u] + 1
                    queue.append(w)
        return found, dist
    
    def dfs(u, dist):
        for v in adj[u]:
            w = match_r[v]
            if w < 0 or (dist[w] == dist[u]+1 and dfs(w, dist)):
                match_l[u] = v
                match_r[v] = u
                return True
        dist[u] = INF
        return False
    
    matching = 0
    while True:
        found, dist = bfs()
        if not found: break
        for u in range(n):
            if match_l[u] < 0 and dfs(u, dist):
                matching += 1
    
    return matching, match_l, match_r`;

const HUNGARIAN = `# Hungarian Algorithm O(N³) – Assignment Problem
# Min-cost perfect matching in bipartite graph
def hungarian(cost):
    """
    cost[i][j] = cost of assigning worker i to job j
    Returns: (min_cost, assignment[]) where assignment[i] = job for worker i
    """
    n = len(cost)
    INF = float('inf')
    u = [0] * (n + 1)  # potential for workers
    v = [0] * (n + 1)  # potential for jobs
    p = [0] * (n + 1)  # p[j] = worker matched to job j
    way = [0] * (n + 1)
    
    for i in range(1, n + 1):
        p[0] = i
        j0 = 0
        minv = [INF] * (n + 1)
        used = [False] * (n + 1)
        while True:
            used[j0] = True
            i0 = p[j0]
            delta = INF
            j1 = -1
            for j in range(1, n + 1):
                if not used[j]:
                    cur = cost[i0-1][j-1] - u[i0] - v[j]
                    if cur < minv[j]:
                        minv[j] = cur
                        way[j] = j0
                    if minv[j] < delta:
                        delta = minv[j]
                        j1 = j
            for j in range(n + 1):
                if used[j]:
                    u[p[j]] += delta
                    v[j] -= delta
                else:
                    minv[j] -= delta
            j0 = j1
            if p[j0] == 0:
                break
        while j0:
            p[j0] = p[way[j0]]
            j0 = way[j0]
    
    assignment = [0] * n
    for j in range(1, n + 1):
        if p[j]:
            assignment[p[j]-1] = j - 1
    return -v[0], assignment`;

const FENWICK_LOWER_BOUND = `# Fenwick Tree (Binary Indexed Tree) 1D với lower_bound O(log N)
class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)
        self.log_n = n.bit_length()

    def add(self, i, delta):
        """Thêm delta vào phần tử tại vị trí i (1-indexed)"""
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i):
        """Tính tổng tiền tố từ 1 đến i (1-indexed)"""
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

    def range_query(self, l, r):
        """Tính tổng đoạn [l, r] (1-indexed)"""
        return self.query(r) - self.query(l - 1)

    def lower_bound(self, target_sum):
        """
        Binary lifting trên BIT tìm vị trí nhỏ nhất i sao cho query(i) >= target_sum.
        Yêu cầu: tất cả các phần tử >= 0. Độ phức tạp: O(log N).
        """
        idx = 0
        current_sum = 0
        for step in range(self.log_n, -1, -1):
            next_idx = idx + (1 << step)
            if next_idx <= self.n and current_sum + self.tree[next_idx] < target_sum:
                idx = next_idx
                current_sum += self.tree[idx]
        return idx + 1`;

const SPARSE_TABLE = `# Sparse Table – Static RMQ truy vấn O(1), tiền xử lý O(N log N)
class SparseTable:
    def __init__(self, arr, op=min):
        self.op = op
        self.n = len(arr)
        self.k = self.n.bit_length()
        self.st = [arr[:]]
        
        for j in range(1, self.k):
            prev = self.st[j - 1]
            length = 1 << (j - 1)
            cur = [self.op(prev[i], prev[i + length]) for i in range(self.n - (1 << j) + 1)]
            self.st.append(cur)

    def query(self, l, r):
        """Truy vấn giá trị trên đoạn [l, r] (0-indexed, inclusive) trong O(1)"""
        length = r - l + 1
        j = length.bit_length() - 1
        return self.op(self.st[j][l], self.st[j][r - (1 << j) + 1])`;

const SUFFIX_ARRAY_LCP = `# Suffix Array + LCP Array (Kasai Algorithm)
def build_suffix_array(s):
    """Xây dựng Suffix Array trong O(N log^2 N) ngắn gọn, tối ưu cho PyPy"""
    n = len(s)
    k = 1
    sa = list(range(n))
    rank = [ord(c) for c in s]
    tmp = [0] * n
    
    while k < n:
        sa.sort(key=lambda x: (rank[x], rank[x + k] if x + k < n else -1))
        tmp[sa[0]] = 0
        for i in range(1, n):
            prev = (rank[sa[i-1]], rank[sa[i-1] + k] if sa[i-1] + k < n else -1)
            cur = (rank[sa[i]], rank[sa[i] + k] if sa[i] + k < n else -1)
            tmp[sa[i]] = tmp[sa[i-1]] + (1 if cur > prev else 0)
        rank = tmp[:]
        if rank[sa[-1]] == n - 1:
            break
        k *= 2
    return sa

def build_lcp(s, sa):
    """Thuật toán Kasai tính mảng LCP (Longest Common Prefix) trong O(N)"""
    n = len(s)
    rank = [0] * n
    for i, p in enumerate(sa):
        rank[p] = i
    lcp = [0] * (n - 1)
    h = 0
    for i in range(n):
        if rank[i] > 0:
            j = sa[rank[i] - 1]
            while i + h < n and j + h < n and s[i + h] == s[j + h]:
                h += 1
            lcp[rank[i] - 1] = h
            if h > 0:
                h -= 1
        else:
            h = 0
    return lcp`;

const DIJKSTRA_TRACE_BFS01 = `# Dijkstra Chuẩn có Truy Vết Đường Đi & BFS 0-1
import heapq
from collections import deque

def dijkstra_with_trace(n, adj, start, target=None):
    """
    n: số đỉnh (0-indexed)
    adj[u]: danh sách các cạnh (v, weight)
    Trả về: (dist, parent)
    """
    dist = [float('inf')] * n
    parent = [-1] * n
    dist[start] = 0
    pq = [(0, start)]
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        if target is not None and u == target:
            break
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                heapq.heappush(pq, (dist[v], v))
                
    return dist, parent

def reconstruct_path(parent, target):
    """Truy vết đường đi từ start đến target"""
    path = []
    curr = target
    while curr != -1:
        path.append(curr)
        curr = parent[curr]
    return path[::-1]

def bfs_01(n, adj, start):
    """BFS 0-1 chạy trong O(V + E) khi trọng số chỉ là 0 hoặc 1"""
    dist = [float('inf')] * n
    dist[start] = 0
    dq = deque([start])
    while dq:
        u = dq.popleft()
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                if w == 0:
                    dq.appendleft(v)
                else:
                    dq.append(v)
    return dist`;

const GAUSSIAN_MOD2_FLOAT = `# Khử Gauss (Gaussian Elimination) – Float & Mod 2 (Bitmask)
def gauss_real(A, b, eps=1e-9):
    """Giải Ax = b trên số thực trong O(N^3). Trả về ans hoặc None nếu vô nghiệm."""
    n = len(A)
    m = len(A[0])
    M = [A[i][:] + [b[i]] for i in range(n)]
    row = 0
    for col in range(m):
        pivot = max(range(row, n), key=lambda r: abs(M[r][col]))
        if abs(M[pivot][col]) < eps: continue
        M[row], M[pivot] = M[pivot], M[row]
        pivot_val = M[row][col]
        for c in range(col, m + 1): M[row][c] /= pivot_val
        for r in range(n):
            if r != row and abs(M[r][col]) > eps:
                factor = M[r][col]
                for c in range(col, m + 1): M[r][c] -= factor * M[row][c]
        row += 1
    for r in range(row, n):
        if abs(M[r][m]) > eps: return None
    ans = [0.0] * m
    for r in range(row):
        for c in range(m):
            if abs(M[r][c] - 1.0) < eps:
                ans[c] = M[r][m]
                break
    return ans

def gauss_xor_mod2(equations, num_vars):
    """
    Giải hệ phương trình XOR mod 2 bằng Bitmask trong O(N^2 * M / 64) – Siêu tốc cho PyPy!
    Mỗi equation là số nguyên biểu diễn bitmask (bit 0..num_vars-1 là biến, bit num_vars là vế phải).
    """
    basis = [0] * (num_vars + 1)
    for mask in equations:
        for b in range(num_vars, -1, -1):
            if (mask >> b) & 1:
                if not basis[b]:
                    basis[b] = mask
                    break
                mask ^= basis[b]
    if basis[0] == 1:
        return None  # Phương trình 0 = 1 -> Vô nghiệm
    return basis`;

const snippets = [
  { title: 'template_bioturing.py – Khung Chuẩn Python 3', lang: 'Python 3 / PyPy 3', code: PYTHON_TEMPLATE, description: 'File template chuẩn: I/O tối ưu, setrecursionlimit, phân nhánh Subtask' },
  { title: 'template.cpp – Khung KACTL C++17', lang: 'C++17', code: CPP_TEMPLATE, description: 'Template C++ với KACTL macros, modular arithmetic, fast I/O' },
  { title: 'Berlekamp-Massey + Matrix Exp – Vũ Khí Bí Mật', lang: 'Python 3', code: BM_PYTHON, description: 'Tìm công thức truy hồi từ 8-16 số hạng → tính a[N] với N ≤ 10^18' },
  { title: 'Union-Find with Potential (Weighted DSU)', lang: 'Python 3', code: DSU_POTENTIAL, description: 'DSU theo dõi chênh lệch potential giữa các phần tử cùng component' },
  { title: 'Fenwick Tree (BIT) 1D + lower_bound O(log N)', lang: 'Python 3', code: FENWICK_LOWER_BOUND, description: 'Binary Indexed Tree 1D với binary lifting lower_bound trên BIT' },
  { title: 'Lazy Segment Tree (Flat Array, PyPy-optimized)', lang: 'Python 3', code: SEGMENT_TREE, description: 'Segment Tree với lazy propagation cho range update + range query' },
  { title: 'Sparse Table – Static RMQ O(1)', lang: 'Python 3', code: SPARSE_TABLE, description: 'Truy vấn min/max đoạn bất kỳ trong O(1), tiền xử lý O(N log N)' },
  { title: 'Rolling Hash mod (2^61-1) – DNA String Hashing', lang: 'Python 3', code: ROLLING_HASH, description: 'Hash bền vững cho chuỗi DNA {A,C,G,T} – LCP query bằng binary search' },
  { title: 'Suffix Array + LCP Array (Kasai Algorithm)', lang: 'Python 3', code: SUFFIX_ARRAY_LCP, description: 'Mảng hậu tố và LCP cho bài toán chuỗi con chung, đếm xâu con' },
  { title: 'Dijkstra với Truy Vết Đường Đi & BFS 0-1', lang: 'Python 3', code: DIJKSTRA_TRACE_BFS01, description: 'Đường đi ngắn nhất có mảng parent phục hồi lộ trình & BFS 0-1 O(V+E)' },
  { title: 'Gaussian Elimination – Float & Mod 2 Bitmask', lang: 'Python 3', code: GAUSSIAN_MOD2_FLOAT, description: 'Khử Gauss số thực và hệ phương trình XOR mod 2 bằng bitmask' },
  { title: 'Hopcroft-Karp – Bipartite Matching đầy đủ', lang: 'Python 3', code: HOPKROFT_KARP_FULL, description: 'Cặp ghép cực đại hai phía O(√V × E) – phiên bản hoàn chỉnh' },
  { title: 'Hungarian Algorithm O(N³) – Assignment Problem', lang: 'Python 3', code: HUNGARIAN, description: 'Phân công trọng số nhỏ nhất – dùng khi N ≤ 500' },
];

export default function Module3Vault() {
  const [filter, setFilter] = useState<'all' | 'python' | 'cpp'>('all');

  const filtered = snippets.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'python') return s.lang.includes('Python');
    if (filter === 'cpp') return s.lang.includes('C++');
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
          <span className="gradient-text-purple">🗡️ Kho Vũ Khí Code Mẫu</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '0.9rem' }}>
          Code mẫu hoàn chỉnh sẵn sàng copy-paste – Python 3 / PyPy 3 & C++17
        </p>
      </div>

      {/* Info banner */}
      <div className="success-box" style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <Cpu size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.82rem', lineHeight: 1.7 }}>
          <strong>💡 Ghi nhớ KACTL Reference:</strong> FenwickTree.h (Trang 5) · SuffixTree.h (Trang 22) · BerlekampMassey.h (Trang 6) · SolveLinearBinary.h (Trang 8) · Matrix.h (Trang 7) · LineContainer.h (Trang 15)
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {[
          { key: 'all', label: '🔀 Tất cả' },
          { key: 'python', label: '🐍 Python / PyPy 3' },
          { key: 'cpp', label: '⚡ C++17' },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`tab-button ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key as any)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Snippets */}
      {filtered.map((snippet, i) => (
        <div key={i} className="card" style={{ padding: '20px', marginBottom: '16px' }}>
          <SnippetBlock {...snippet} />
        </div>
      ))}
    </div>
  );
}
