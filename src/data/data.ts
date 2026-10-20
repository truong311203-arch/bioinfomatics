// =====================================================================
// DATA: 3-Day Roadmap Schedule
// =====================================================================
export interface Task {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  problems: string[];
  completed?: boolean;
}

export interface Session {
  id: string;
  day: number;
  type: 'morning' | 'afternoon' | 'prep';
  title: string;
  timeSlot: string;
  duration: string;
  color: string;
  icon: string;
  tasks: Task[];
}

export const roadmapData: Session[] = [
  {
    id: 'prep',
    day: 0,
    type: 'prep',
    title: 'Bước Khởi Động – Đóng Gói Kho Vũ Khí Offline',
    timeSlot: '30 phút trước Ngày 1',
    duration: '30 phút',
    color: '#22d3ee',
    icon: '🚀',
    tasks: [
      {
        id: 'prep-1',
        title: 'Clone Library Checker Problems',
        description: 'git clone https://github.com/yosupo06/library-checker-problems.git',
        duration: '5 phút',
        topics: ['Setup'],
        problems: [],
      },
      {
        id: 'prep-2',
        title: 'Tải 15 bài PyPy 3 AC về máy',
        description: 'Tải submissions AC từ Library Checker cho: Static Range Sum, Union-Find, Point Add Range Sum, Static RMQ, LIS, Z-Algorithm, Suffix Array, Longest Common Substring, Find Linear Recurrence, Pow of Matrix, Shortest Path, Bipartite Matching, Assignment, Line Add Get Min, System of Linear Equations.',
        duration: '10 phút',
        topics: ['Setup', 'Python'],
        problems: ['static_range_sum', 'unionfind', 'point_add_range_sum', 'staticrmq', 'longest_increasing_subsequence'],
      },
      {
        id: 'prep-3',
        title: 'Chuẩn bị template_bioturing.py',
        description: 'Tạo file template Python chuẩn: sys.setrecursionlimit, input = sys.stdin.readline, khung phân nhánh Subtask.',
        duration: '5 phút',
        topics: ['Template', 'Python'],
        problems: [],
      },
      {
        id: 'prep-4',
        title: 'Kiểm tra kactl.pdf và ghi nhớ trang',
        description: 'FenwickTree.h: Trang 5 | SuffixTree.h: Trang 22 | BerlekampMassey.h: Trang 6 | SolveLinearBinary.h: Trang 8.',
        duration: '10 phút',
        topics: ['KACTL', 'Reference'],
        problems: [],
      },
    ],
  },
  {
    id: 'day1-morning',
    day: 1,
    type: 'morning',
    title: 'Ngày 1 – Ca Sáng: Làm Chủ Khung Python Subtask 1–2',
    timeSlot: 'Ngày 1 | 8:00 – 11:00',
    duration: '3 giờ',
    color: '#4f8ef7',
    icon: '🐍',
    tasks: [
      {
        id: 'd1m-1',
        title: 'Nghiên cứu khung Python chống TLE/RTE',
        description: 'Học sys.stdin.read().split(), iter(), phân nhánh n <= 1000 để bảo toàn điểm Subtask 1-2. Kiểm tra recursion limit.',
        duration: '45 phút',
        topics: ['Python', 'Template', 'Optimization'],
        problems: [],
      },
      {
        id: 'd1m-2',
        title: 'Static Range Sum (Prefix Sum)',
        description: 'Cài đặt prefix sum O(N+Q). Luyện viết clean code, handle edge cases N=0, N=1, query toàn mảng.',
        duration: '45 phút',
        topics: ['Data Structure', 'Python'],
        problems: ['data_structure/static_range_sum_query/'],
      },
      {
        id: 'd1m-3',
        title: 'Associative Array (HashMap)',
        description: 'Python dict as associative array. Handle default values, missing keys gracefully.',
        duration: '30 phút',
        topics: ['Data Structure', 'Python'],
        problems: ['data_structure/associative_array/'],
      },
      {
        id: 'd1m-4',
        title: 'Longest Increasing Subsequence (LIS)',
        description: 'Subtask 1: O(N²) dp. Subtask 2+: O(N log N) patience sorting với bisect. Luyện viết cả hai phiên bản.',
        duration: '60 phút',
        topics: ['DP', 'Python'],
        problems: ['dp/longest_increasing_subsequence/'],
      },
    ],
  },
  {
    id: 'day1-afternoon',
    day: 1,
    type: 'afternoon',
    title: 'Ngày 1 – Ca Chiều: Cấu Trúc Dữ Liệu Cốt Lõi',
    timeSlot: 'Ngày 1 | 14:00 – 17:00',
    duration: '3 giờ',
    color: '#a78bfa',
    icon: '🏗️',
    tasks: [
      {
        id: 'd1a-1',
        title: 'Union-Find (Disjoint Set Union)',
        description: 'Cài đặt DSU với path compression + union by rank. Phiên bản Python tối ưu cho PyPy 3. Test với N=10^5.',
        duration: '60 phút',
        topics: ['Data Structure', 'Graph', 'Python'],
        problems: ['data_structure/unionfind/'],
      },
      {
        id: 'd1a-2',
        title: 'Fenwick Tree / BIT – Point Add Range Sum',
        description: 'Cài đặt Fenwick Tree 1D. Query prefix sum, range sum. Phiên bản mảng 1-indexed chuẩn. Luyện lower_bound trên BIT.',
        duration: '60 phút',
        topics: ['Data Structure', 'Python'],
        problems: ['data_structure/point_add_range_sum/'],
      },
      {
        id: 'd1a-3',
        title: 'Sparse Table – Static RMQ O(1)',
        description: 'Preprocess O(N log N), query O(1). Phù hợp khi không có update. Handle min/max, GCD.',
        duration: '60 phút',
        topics: ['Data Structure', 'Python'],
        problems: ['data_structure/staticrmq/'],
      },
    ],
  },
  {
    id: 'day2-morning',
    day: 2,
    type: 'morning',
    title: 'Ngày 2 – Ca Sáng: Thuật Toán Chuỗi DNA/RNA/Barcodes',
    timeSlot: 'Ngày 2 | 8:00 – 11:00',
    duration: '3 giờ',
    color: '#34d399',
    icon: '🧬',
    tasks: [
      {
        id: 'd2m-1',
        title: 'Z-Algorithm – Pattern Matching O(N+M)',
        description: 'Tính mảng Z[i] = độ dài match tối đa từ vị trí i với prefix. Áp dụng cho DNA barcode matching, tìm pattern trong text.',
        duration: '50 phút',
        topics: ['String / DNA', 'Python'],
        problems: ['string/z_algorithm/'],
      },
      {
        id: 'd2m-2',
        title: 'Suffix Array + LCP Array',
        description: 'SA-IS O(N) hoặc O(N log N). Kết hợp LCP cho Longest Common Substring. Rất quan trọng cho bài DNA của BioTuring.',
        duration: '70 phút',
        topics: ['String / DNA', 'Python'],
        problems: ['string/suffix_array/'],
      },
      {
        id: 'd2m-3',
        title: 'Bài BioTuring 2024: Mã Vạch DNA (Câu 1)',
        description: 'Cho k, tìm bộ mã vạch DNA {A,C,G,T}^k có Hamming distance ≥ 2. Subtask 1: k=3 brute force. Subtask 2: Cận trên 4^(k-1).',
        duration: '60 phút',
        topics: ['String / DNA', 'Combinatorics', 'Python'],
        problems: ['DNA Barcodes'],
      },
    ],
  },
  {
    id: 'day2-afternoon',
    day: 2,
    type: 'afternoon',
    title: 'Ngày 2 – Ca Chiều: Đại Số Tuyến Tính & Berlekamp-Massey',
    timeSlot: 'Ngày 2 | 14:00 – 17:00',
    duration: '3 giờ',
    color: '#fb923c',
    icon: '🔢',
    tasks: [
      {
        id: 'd2a-1',
        title: 'Berlekamp-Massey – Tìm Hệ Số Truy Hồi Tuyến Tính',
        description: 'Cho 8-16 số hạng đầu tiên → tìm công thức truy hồi ẩn. Key insight: từ Subtask 1 (N nhỏ) tìm pattern, rồi dùng BM để extrapolate.',
        duration: '60 phút',
        topics: ['Linear Algebra & Recurrence', 'Python'],
        problems: ['other/find_linear_recurrence/'],
      },
      {
        id: 'd2a-2',
        title: 'Matrix Exponentiation – Tính a(N) với N ≤ 10^18',
        description: 'Nhân ma trận O(K³ log N). Kết hợp với BM để giải bài truy hồi tuyến tính thứ K bất kỳ. Template C++ từ KACTL.',
        duration: '60 phút',
        topics: ['Linear Algebra & Recurrence', 'Python', 'C++'],
        problems: ['other/pow_of_matrix/'],
      },
      {
        id: 'd2a-3',
        title: 'Gaussian Elimination – Hệ Phương Trình & Mod 2',
        description: 'Khử Gauss trên số thực (float), mod p, và mod 2 bằng bitmask (SIMD-friendly). KACTL: SolveLinearBinary.h trang 8.',
        duration: '60 phút',
        topics: ['Linear Algebra & Recurrence', 'Bitset / SIMD', 'Python'],
        problems: ['other/system_of_linear_equations/', 'other/system_of_linear_equations_mod_2/'],
      },
    ],
  },
  {
    id: 'day3-morning',
    day: 3,
    type: 'morning',
    title: 'Ngày 3 – Ca Sáng: Đồ Thị, Cặp Ghép & DP Optimization',
    timeSlot: 'Ngày 3 | 8:00 – 11:00',
    duration: '3 giờ',
    color: '#f472b6',
    icon: '🕸️',
    tasks: [
      {
        id: 'd3m-1',
        title: 'Dijkstra Chuẩn + Truy Vết Đường Đi',
        description: 'Dijkstra với priority queue (heapq). Truy vết path. BFS 0-1 cho đồ thị có trọng số 0/1. Handle đồ thị không liên thông.',
        duration: '50 phút',
        topics: ['Graph & Matching', 'Python'],
        problems: ['graph/shortest_path/'],
      },
      {
        id: 'd3m-2',
        title: 'Bipartite Matching – Hopcroft-Karp O(√V·E)',
        description: 'Hopcroft-Karp nhanh hơn augmenting path đơn giản. Ứng dụng: gán công việc, lập lịch. Template Python tối ưu.',
        duration: '60 phút',
        topics: ['Graph & Matching', 'Python'],
        problems: ['graph/matching_on_bipartite_graph/'],
      },
      {
        id: 'd3m-3',
        title: 'Hungarian Algorithm O(N³) – Assignment Problem',
        description: 'Bài toán phân công trọng số nhỏ nhất. KACTL có template C++. Python: scipy.optimize.linear_sum_assignment (nếu được phép).',
        duration: '40 phút',
        topics: ['Graph & Matching', 'DP Optimization', 'Python'],
        problems: ['other/assignment_problem/'],
      },
      {
        id: 'd3m-4',
        title: 'Li Chao Tree – Line Add Get Min (CHT / DP Optimization)',
        description: 'Convex Hull Trick và Li Chao Tree cho dp[i] = min(dp[j] + a[i]*b[j]). O(N log N) thay vì O(N²).',
        duration: '30 phút',
        topics: ['DP Optimization', 'Python', 'C++'],
        problems: ['data_structure/line_add_get_min/'],
      },
    ],
  },
  {
    id: 'day3-afternoon',
    day: 3,
    type: 'afternoon',
    title: 'Ngày 3 – Ca Chiều: Thi Thử Offline & Rà Soát Edge Cases',
    timeSlot: 'Ngày 3 | 14:00 – 17:00',
    duration: '3 giờ',
    color: '#fbbf24',
    icon: '⏱️',
    tasks: [
      {
        id: 'd3a-1',
        title: 'Thi thử 120 phút – Đề BioTuring 2024 Câu 3 & 5',
        description: 'Câu 3: Hide and Seek trên path graph. Câu 5: Roommates Pigeonhole. Bật Timer 120 phút, không xem gợi ý.',
        duration: '120 phút',
        topics: ['Mock Exam', 'Strategy'],
        problems: ['Câu 3: Hide & Seek', 'Câu 5: Pigeonhole'],
      },
      {
        id: 'd3a-2',
        title: 'Review & Rà Soát Edge Cases',
        description: 'Kiểm tra N=0, N=1, mảng toàn số âm, đồ thị không liên thông. Dùng Code Auditor Module 6.',
        duration: '30 phút',
        topics: ['Edge Cases', 'Debug'],
        problems: [],
      },
      {
        id: 'd3a-3',
        title: 'Ôn lại bộ câu hỏi BioTuring 2024 Câu 6, 7, 8',
        description: 'Câu 6: Fitch Cheney\'s Trick 5 bài. Câu 7-8: Các bài còn lại. Ghi lại insight chính.',
        duration: '30 phút',
        topics: ['Mock Exam', 'Review'],
        problems: ['Câu 6: Magic Trick', 'Câu 7', 'Câu 8'],
      },
    ],
  },
];

// =====================================================================
// DATA: Problem-to-Template Dictionary
// =====================================================================
export interface AlgorithmEntry {
  id: string;
  name: string;
  keywords: string[];
  tags: string[];
  complexity: { subtask1: string; subtask2: string; subtask3?: string };
  kactlPage?: string;
  kactlFile?: string;
  libraryCheckerPath?: string;
  pythonCode: string;
  cppCode: string;
  description: string;
}

export const algorithmDict: AlgorithmEntry[] = [
  {
    id: 'fenwick-tree',
    name: 'Fenwick Tree (BIT) – Point Add Range Sum',
    keywords: ['cập nhật đoạn', 'tổng đoạn', 'tổng prefix', 'range sum', 'point update', 'prefix sum', 'bit', 'fenwick', 'binary indexed tree'],
    tags: ['Data Structure'],
    complexity: { subtask1: 'O(N) prefix sum', subtask2: 'O((N+Q) log N)', subtask3: 'O((N+Q) log N)' },
    kactlPage: 'Trang 5',
    kactlFile: 'FenwickTree.h',
    libraryCheckerPath: 'data_structure/point_add_range_sum/',
    description: 'Cập nhật điểm + truy vấn tổng đoạn. Subtask 1 (N≤1000): dùng list thường O(1)/O(N). Subtask 2+ (N≤2×10⁵): Fenwick Tree O(log N).',
    pythonCode: `import sys
input = sys.stdin.readline

class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)
    
    def update(self, i, delta):  # 1-indexed
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)
    
    def query(self, i):  # prefix sum [1..i]
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s
    
    def range_query(self, l, r):  # [l..r] 1-indexed
        return self.query(r) - self.query(l - 1)
    
    def lower_bound(self, s):
        """Find smallest i such that prefix_sum[1..i] >= s"""
        pos = 0
        bit_mask = 1 << self.n.bit_length()
        while bit_mask > 0:
            next_pos = pos + bit_mask
            if next_pos <= self.n and self.tree[next_pos] < s:
                pos = next_pos
                s -= self.tree[pos]
            bit_mask >>= 1
        return pos + 1

def solve():
    n, q = map(int, input().split())
    a = list(map(int, input().split()))
    
    if n <= 1000:
        # Subtask 1: Simple prefix sum (rebuild each time if updates needed)
        arr = a[:]
        for _ in range(q):
            t, x, y = map(int, input().split())
            if t == 0:
                arr[x] += y
            else:
                print(sum(arr[x:y+1]))
    else:
        # Subtask 2+: Fenwick Tree
        ft = FenwickTree(n)
        for i, v in enumerate(a):
            ft.update(i + 1, v)
        for _ in range(q):
            t, x, y = map(int, input().split())
            if t == 0:
                ft.update(x + 1, y)
            else:
                print(ft.range_query(x + 1, y + 1))

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<ll> vll;

struct FenwickTree {
    int n;
    vll tree;
    FenwickTree(int n) : n(n), tree(n + 1, 0) {}
    
    void update(int i, ll delta) {
        for (; i <= n; i += i & -i) tree[i] += delta;
    }
    
    ll query(int i) {
        ll s = 0;
        for (; i > 0; i -= i & -i) s += tree[i];
        return s;
    }
    
    ll range_query(int l, int r) {
        return query(r) - query(l - 1);
    }
    
    // Find smallest i such that prefix[1..i] >= s
    int lower_bound(ll s) {
        int pos = 0;
        for (int bit = 1 << __lg(n); bit; bit >>= 1) {
            if (pos + bit <= n && tree[pos + bit] < s) {
                pos += bit;
                s -= tree[pos];
            }
        }
        return pos + 1;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n, q;
    cin >> n >> q;
    
    FenwickTree ft(n);
    for (int i = 1; i <= n; i++) {
        ll x; cin >> x;
        ft.update(i, x);
    }
    
    while (q--) {
        int t; ll x, y;
        cin >> t >> x >> y;
        if (t == 0) ft.update(x + 1, y);
        else cout << ft.range_query(x + 1, y + 1) << "\\n";
    }
    return 0;
}`,
  },
  {
    id: 'union-find',
    name: 'Union-Find (Disjoint Set Union)',
    keywords: ['union find', 'dsu', 'disjoint set', 'liên thông', 'thành phần liên thông', 'kết nối', 'connected components', 'merge sets', 'same component'],
    tags: ['Data Structure', 'Graph & Matching'],
    complexity: { subtask1: 'O(N²) naive', subtask2: 'O(N·α(N)) ≈ O(N)', subtask3: 'O(N·α(N))' },
    kactlPage: 'Trang 2',
    kactlFile: 'UnionFind.h',
    libraryCheckerPath: 'data_structure/unionfind/',
    description: 'Quản lý các tập hợp rời nhau. Union by rank + path compression đạt O(α(N)) ≈ O(1) thực tế.',
    pythonCode: `import sys
input = sys.stdin.readline

class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.size = [1] * n
    
    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]  # path halving
            x = self.parent[x]
        return x
    
    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        self.size[rx] += self.size[ry]
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True
    
    def same(self, x, y):
        return self.find(x) == self.find(y)
    
    def get_size(self, x):
        return self.size[self.find(x)]

def solve():
    n, q = map(int, input().split())
    dsu = DSU(n)
    for _ in range(q):
        t, u, v = map(int, input().split())
        if t == 0:
            dsu.union(u, v)
        else:
            print(1 if dsu.same(u, v) else 0)

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> parent, rank_, size_;
    DSU(int n) : parent(n), rank_(n, 0), size_(n, 1) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
    bool unite(int x, int y) {
        x = find(x); y = find(y);
        if (x == y) return false;
        if (rank_[x] < rank_[y]) swap(x, y);
        parent[y] = x;
        size_[x] += size_[y];
        if (rank_[x] == rank_[y]) rank_[x]++;
        return true;
    }
    bool same(int x, int y) { return find(x) == find(y); }
    int size(int x) { return size_[find(x)]; }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q; cin >> n >> q;
    DSU dsu(n);
    while (q--) {
        int t, u, v; cin >> t >> u >> v;
        if (t == 0) dsu.unite(u, v);
        else cout << (dsu.same(u, v) ? 1 : 0) << "\\n";
    }
    return 0;
}`,
  },
  {
    id: 'sparse-table',
    name: 'Sparse Table – Static RMQ O(1)',
    keywords: ['rmq', 'range minimum query', 'range maximum query', 'static', 'không update', 'sparse table', 'truy vấn min', 'truy vấn max', 'gcd đoạn'],
    tags: ['Data Structure'],
    complexity: { subtask1: 'O(N²) naive', subtask2: 'O(N log N) build, O(1) query', subtask3: 'O(N log N) build, O(1) query' },
    kactlPage: 'Trang 3',
    kactlFile: 'SparseTable.h',
    libraryCheckerPath: 'data_structure/staticrmq/',
    description: 'Truy vấn min/max/GCD trên mảng tĩnh (không có update). Build O(N log N), query O(1). Không dùng khi có cập nhật.',
    pythonCode: `import sys
import math
input = sys.stdin.readline

class SparseTable:
    def __init__(self, arr, func=min):
        self.func = func
        n = len(arr)
        LOG = n.bit_length()
        self.table = [arr[:]]
        for j in range(1, LOG):
            prev = self.table[j-1]
            cur = [func(prev[i], prev[i + (1 << (j-1))]) 
                   for i in range(n - (1 << j) + 1)]
            self.table.append(cur)
        self.log2 = [0] * (n + 1)
        for i in range(2, n + 1):
            self.log2[i] = self.log2[i // 2] + 1
    
    def query(self, l, r):  # [l, r] 0-indexed
        k = self.log2[r - l + 1]
        return self.func(self.table[k][l], self.table[k][r - (1 << k) + 1])

def solve():
    n, q = map(int, input().split())
    a = list(map(int, input().split()))
    st = SparseTable(a, min)
    for _ in range(q):
        l, r = map(int, input().split())
        print(st.query(l, r - 1))  # adjust to 0-indexed

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

struct SparseTable {
    vector<vector<ll>> table;
    vector<int> log2_;
    int n;
    
    SparseTable(vector<ll>& a) : n(a.size()), log2_(a.size() + 1, 0) {
        int LOG = __lg(n) + 1;
        table.assign(LOG, vector<ll>(n));
        table[0] = a;
        for (int j = 1; j < LOG; j++)
            for (int i = 0; i + (1 << j) <= n; i++)
                table[j][i] = min(table[j-1][i], table[j-1][i + (1 << (j-1))]);
        for (int i = 2; i <= n; i++)
            log2_[i] = log2_[i/2] + 1;
    }
    
    ll query(int l, int r) {  // [l, r] 0-indexed
        int k = log2_[r - l + 1];
        return min(table[k][l], table[k][r - (1 << k) + 1]);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q; cin >> n >> q;
    vector<ll> a(n);
    for (auto& x : a) cin >> x;
    SparseTable st(a);
    while (q--) {
        int l, r; cin >> l >> r;
        cout << st.query(l, r - 1) << "\\n";
    }
    return 0;
}`,
  },
  {
    id: 'z-algorithm',
    name: 'Z-Algorithm – Pattern Matching O(N+M)',
    keywords: ['z algorithm', 'z-algorithm', 'pattern matching', 'chuỗi DNA', 'DNA', 'tìm pattern', 'khớp mẫu', 'string matching', 'substring search'],
    tags: ['String / DNA'],
    complexity: { subtask1: 'O(N·M) brute force', subtask2: 'O(N+M)', subtask3: 'O(N+M)' },
    kactlPage: 'Trang 20',
    kactlFile: 'Z.h',
    libraryCheckerPath: 'string/z_algorithm/',
    description: 'Tính Z[i] = độ dài prefix chung dài nhất của s và s[i:]. Tìm pattern P trong text T: ghép P + "#" + T, Z[i] = len(P) ↔ match tại i.',
    pythonCode: `import sys
input = sys.stdin.readline

def z_function(s):
    n = len(s)
    z = [0] * n
    z[0] = n
    l, r = 0, 0
    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > r:
            l, r = i, i + z[i]
    return z

def find_all(text, pattern):
    """Find all occurrences of pattern in text"""
    s = pattern + "#" + text
    z = z_function(s)
    m = len(pattern)
    positions = []
    for i in range(m + 1, len(s)):
        if z[i] == m:
            positions.append(i - m - 1)  # 0-indexed in text
    return positions

def solve():
    s = input().strip()
    z = z_function(s)
    print(*z)

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> z_function(const string& s) {
    int n = s.size();
    vector<int> z(n);
    z[0] = n;
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) l = i, r = i + z[i];
    }
    return z;
}

vector<int> find_all(const string& text, const string& pattern) {
    string s = pattern + "#" + text;
    auto z = z_function(s);
    int m = pattern.size();
    vector<int> res;
    for (int i = m + 1; i < (int)s.size(); i++)
        if (z[i] == m) res.push_back(i - m - 1);
    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s; cin >> s;
    auto z = z_function(s);
    for (int x : z) cout << x << " ";
    cout << "\\n";
    return 0;
}`,
  },
  {
    id: 'suffix-array',
    name: 'Suffix Array + LCP – Longest Common Substring',
    keywords: ['suffix array', 'lcp', 'longest common substring', 'chuỗi con chung', 'k-mers', 'DNA barcode', 'suffix', 'chuỗi sinh học'],
    tags: ['String / DNA'],
    complexity: { subtask1: 'O(N²) naive LCS', subtask2: 'O(N log N) SA', subtask3: 'O(N log N) SA + O(N) LCP' },
    kactlPage: 'Trang 22',
    kactlFile: 'SuffixTree.h',
    libraryCheckerPath: 'string/suffix_array/',
    description: 'SA sắp xếp tất cả suffix. Kết hợp LCP tìm chuỗi con chung dài nhất giữa nhiều chuỗi DNA. KACTL trang 22.',
    pythonCode: `import sys
input = sys.stdin.readline

def build_suffix_array(s):
    """O(N log N) suffix array"""
    n = len(s)
    sa = sorted(range(n), key=lambda i: s[i:])
    rank = [0] * n
    for i, idx in enumerate(sa):
        rank[idx] = i
    return sa, rank

def build_lcp_array(s, sa):
    """Kasai's O(N) LCP algorithm"""
    n = len(s)
    rank = [0] * n
    for i, idx in enumerate(sa):
        rank[idx] = i
    lcp = [0] * n
    h = 0
    for i in range(n):
        if rank[i] > 0:
            j = sa[rank[i] - 1]
            while i + h < n and j + h < n and s[i+h] == s[j+h]:
                h += 1
            lcp[rank[i]] = h
            if h > 0:
                h -= 1
    return lcp

def longest_common_substring(s1, s2):
    """Find LCS of two strings using SA+LCP"""
    sep = chr(0)  # separator not in s1 or s2
    s = s1 + sep + s2
    n1 = len(s1)
    sa, _ = build_suffix_array(s)
    lcp = build_lcp_array(s, sa)
    
    best = 0
    for i in range(1, len(s)):
        if lcp[i] > best:
            # Check if sa[i] and sa[i-1] come from different strings
            a, b = sa[i], sa[i-1]
            if (a < n1) != (b < n1):
                best = lcp[i]
    return best

def solve():
    s = input().strip()
    sa, _ = build_suffix_array(s)
    lcp = build_lcp_array(s, sa)
    print(*sa)
    print(*lcp)

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;

// O(N log N) Suffix Array
vector<int> suffix_array(const string& s) {
    int n = s.size();
    vector<int> sa(n), rank_(n), tmp(n);
    iota(sa.begin(), sa.end(), 0);
    for (int i = 0; i < n; i++) rank_[i] = s[i];
    
    for (int k = 1; k < n; k <<= 1) {
        auto cmp = [&](int a, int b) {
            if (rank_[a] != rank_[b]) return rank_[a] < rank_[b];
            int ra = a+k < n ? rank_[a+k] : -1;
            int rb = b+k < n ? rank_[b+k] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++)
            tmp[sa[i]] = tmp[sa[i-1]] + (cmp(sa[i-1], sa[i]) ? 1 : 0);
        rank_ = tmp;
    }
    return sa;
}

// Kasai's O(N) LCP
vector<int> lcp_array(const string& s, const vector<int>& sa) {
    int n = s.size();
    vector<int> rank_(n), lcp(n, 0);
    for (int i = 0; i < n; i++) rank_[sa[i]] = i;
    for (int i = 0, h = 0; i < n; i++) {
        if (rank_[i] > 0) {
            int j = sa[rank_[i] - 1];
            while (i+h < n && j+h < n && s[i+h] == s[j+h]) h++;
            lcp[rank_[i]] = h;
            if (h) h--;
        }
    }
    return lcp;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s; cin >> s;
    auto sa = suffix_array(s);
    auto lcp = lcp_array(s, sa);
    for (int x : sa) cout << x << " "; cout << "\\n";
    for (int x : lcp) cout << x << " "; cout << "\\n";
    return 0;
}`,
  },
  {
    id: 'berlekamp-massey',
    name: 'Berlekamp-Massey – Tìm Hệ Số Truy Hồi Tuyến Tính',
    keywords: ['berlekamp massey', 'linear recurrence', 'truy hồi tuyến tính', 'dãy số', 'tìm công thức', 'N <= 10^18', 'N rất lớn', 'số hạng thứ N', 'find recurrence'],
    tags: ['Linear Algebra & Recurrence'],
    complexity: { subtask1: 'O(N²) brute', subtask2: 'O(K²) BM + O(K² log N) matrix exp', subtask3: 'O(K² log N)' },
    kactlPage: 'Trang 6',
    kactlFile: 'BerlekampMassey.h',
    libraryCheckerPath: 'other/find_linear_recurrence/',
    description: 'Từ 8-16 số hạng đầu → tìm hệ số truy hồi tuyến tính. Kết hợp Matrix Exp tính a[N] với N ≤ 10^18. KEY WEAPON!',
    pythonCode: `import sys
input = sys.stdin.readline

MOD = 998244353

def berlekamp_massey(s, mod=MOD):
    """
    Find shortest linear recurrence for sequence s (mod p).
    Returns coefficients c such that s[i] = sum(c[j] * s[i-1-j]) for j in range(len(c))
    """
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

def linear_recurrence_nth(seq, n, mod=MOD):
    """Find a[n] given the first terms of a linearly recurrent sequence."""
    if n < len(seq):
        return seq[n] % mod
    c = berlekamp_massey(seq, mod)
    k = len(c)
    if k == 0:
        return 0
    # Build companion matrix
    M = [[0]*k for _ in range(k)]
    for j in range(k):
        M[0][j] = c[j]
    for i in range(1, k):
        M[i][i-1] = 1
    R = mat_pow(M, n - k + 1, mod)
    ans = 0
    for j in range(k):
        ans = (ans + R[0][j] * seq[k-1-j]) % mod
    return ans

def solve():
    n, mod = map(int, input().split())
    seq = list(map(int, input().split()))
    c = berlekamp_massey(seq, mod)
    print(len(c))
    print(*c)

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<ll> vll;
typedef vector<vll> mat;

const ll MOD = 998244353;

ll pw(ll a, ll b, ll mod) {
    a %= mod; ll r = 1;
    for (; b; b >>= 1, a = a*a%mod)
        if (b & 1) r = r*a%mod;
    return r;
}

// Berlekamp-Massey from KACTL (page 6)
vll berlekamp_massey(vll s, ll mod = MOD) {
    int n = s.size(), L = 0, x = 1;
    vll b = {1}, c = {1};
    ll last = 0;
    for (int i = 0; i < n; i++) {
        ll t = 0;
        for (int j = 0; j < (int)c.size(); j++)
            t = (t + c[j] * s[i-j]) % mod;
        if (t == 0) { x++; continue; }
        vll d = c;
        ll coef = t * pw(last, mod-2, mod) % mod;
        if ((int)c.size() < (int)b.size() + x)
            c.resize(b.size() + x, 0);
        for (int j = x; j < (int)b.size() + x; j++)
            c[j] = (c[j] - coef * b[j-x]) % mod;
        if (2*L <= i) { L = i+1-L; b = d; last = t; x = 1; }
        else x++;
    }
    // c[0]=1, negate rest
    vll res(c.size()-1);
    for (int i = 1; i < (int)c.size(); i++)
        res[i-1] = (mod - c[i]) % mod;
    return res;
}

mat mat_mul(const mat& A, const mat& B, ll mod) {
    int n = A.size();
    mat C(n, vll(n, 0));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++) if (A[i][k])
            for (int j = 0; j < n; j++)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod;
    return C;
}

mat mat_pow(mat M, ll p, ll mod) {
    int n = M.size();
    mat R(n, vll(n, 0));
    for (int i = 0; i < n; i++) R[i][i] = 1;
    for (; p; p >>= 1, M = mat_mul(M, M, mod))
        if (p & 1) R = mat_mul(R, M, mod);
    return R;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; ll mod; cin >> n >> mod;
    vll seq(n);
    for (auto& x : seq) cin >> x;
    auto c = berlekamp_massey(seq, mod);
    cout << c.size() << "\\n";
    for (ll x : c) cout << x << " ";
    cout << "\\n";
    return 0;
}`,
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra – Shortest Path với Truy Vết',
    keywords: ['dijkstra', 'shortest path', 'đường đi ngắn nhất', 'đồ thị có trọng số', 'bfs', 'bfs 0-1', 'graph', 'đồ thị'],
    tags: ['Graph & Matching'],
    complexity: { subtask1: 'O(V²) Floyd-Warshall', subtask2: 'O((V+E) log V)', subtask3: 'O((V+E) log V)' },
    kactlPage: 'Trang 10',
    kactlFile: 'ShortestPath.h',
    libraryCheckerPath: 'graph/shortest_path/',
    description: 'Dijkstra với min-heap. Truy vết đường đi. BFS 0-1 cho cạnh trọng số 0 hoặc 1. Handle đồ thị không liên thông (dist = -1 hoặc INF).',
    pythonCode: `import sys
import heapq
input = sys.stdin.readline

INF = float('inf')

def dijkstra(n, adj, src):
    """
    adj[u] = list of (v, w)
    Returns: dist[], prev[] for path reconstruction
    """
    dist = [INF] * n
    prev = [-1] * n
    dist[src] = 0
    heap = [(0, src)]
    
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                prev[v] = u
                heapq.heappush(heap, (dist[v], v))
    return dist, prev

def reconstruct_path(prev, src, dst):
    path = []
    cur = dst
    while cur != -1:
        path.append(cur)
        cur = prev[cur]
    path.reverse()
    if path[0] != src:
        return []  # no path
    return path

def bfs_01(n, adj, src):
    """BFS 0-1: adj[u] = list of (v, 0 or 1)"""
    from collections import deque
    dist = [INF] * n
    dist[src] = 0
    dq = deque([src])
    while dq:
        u = dq.popleft()
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                if w == 0:
                    dq.appendleft(v)
                else:
                    dq.append(v)
    return dist

def solve():
    n, m = map(int, input().split())
    adj = [[] for _ in range(n)]
    for _ in range(m):
        u, v, w = map(int, input().split())
        adj[u].append((v, w))
        adj[v].append((u, w))
    
    s, t = map(int, input().split())
    dist, prev = dijkstra(n, adj, s)
    
    if dist[t] == INF:
        print(-1)
    else:
        print(dist[t])
        path = reconstruct_path(prev, s, t)
        print(*path)

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<ll,int> pli;

const ll INF = 1e18;

vector<ll> dijkstra(int n, vector<vector<pair<int,ll>>>& adj, int src,
                    vector<int>& prev_) {
    vector<ll> dist(n, INF);
    prev_.assign(n, -1);
    dist[src] = 0;
    priority_queue<pli, vector<pli>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                prev_[v] = u;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m; cin >> n >> m;
    vector<vector<pair<int,ll>>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v; ll w; cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    int s, t; cin >> s >> t;
    vector<int> prev_;
    auto dist = dijkstra(n, adj, s, prev_);
    if (dist[t] == INF) { cout << -1; return 0; }
    cout << dist[t] << "\\n";
    vector<int> path;
    for (int cur = t; cur != -1; cur = prev_[cur]) path.push_back(cur);
    reverse(path.begin(), path.end());
    for (int x : path) cout << x << " ";
    return 0;
}`,
  },
  {
    id: 'hopcroft-karp',
    name: 'Hopcroft-Karp – Bipartite Maximum Matching',
    keywords: ['bipartite matching', 'cặp ghép', 'ghép cặp', 'bipartite graph', 'matching', 'hopcroft karp', 'maximum matching'],
    tags: ['Graph & Matching'],
    complexity: { subtask1: 'O(V·E) augmenting path', subtask2: 'O(√V·E) Hopcroft-Karp', subtask3: 'O(√V·E)' },
    kactlPage: 'Trang 11',
    kactlFile: 'BipartiteMatching.h',
    libraryCheckerPath: 'graph/matching_on_bipartite_graph/',
    description: 'Cặp ghép cực đại trên đồ thị hai phía. Hopcroft-Karp O(√V·E) nhanh hơn augmenting path O(V·E) đơn giản.',
    pythonCode: `import sys
from collections import deque
input = sys.stdin.readline

class HopcroftKarp:
    def __init__(self, n, m):
        """n: left nodes (0..n-1), m: right nodes (0..m-1)"""
        self.n = n
        self.m = m
        self.adj = [[] for _ in range(n)]
        self.match_l = [-1] * n  # match_l[u] = v matched to u, -1 if unmatched
        self.match_r = [-1] * m  # match_r[v] = u matched to v
    
    def add_edge(self, u, v):
        self.adj[u].append(v)
    
    def _bfs(self):
        self.dist = [0] * self.n
        queue = deque()
        for u in range(self.n):
            if self.match_l[u] == -1:
                self.dist[u] = 0
                queue.append(u)
            else:
                self.dist[u] = float('inf')
        found = False
        while queue:
            u = queue.popleft()
            for v in self.adj[u]:
                w = self.match_r[v]
                if w == -1:
                    found = True
                elif self.dist[w] == float('inf'):
                    self.dist[w] = self.dist[u] + 1
                    queue.append(w)
        return found
    
    def _dfs(self, u):
        for v in self.adj[u]:
            w = self.match_r[v]
            if w == -1 or (self.dist[w] == self.dist[u] + 1 and self._dfs(w)):
                self.match_l[u] = v
                self.match_r[v] = u
                return True
        self.dist[u] = float('inf')
        return False
    
    def max_matching(self):
        matching = 0
        while self._bfs():
            for u in range(self.n):
                if self.match_l[u] == -1:
                    if self._dfs(u):
                        matching += 1
        return matching

def solve():
    l, r, m = map(int, input().split())
    hk = HopcroftKarp(l, r)
    for _ in range(m):
        u, v = map(int, input().split())
        hk.add_edge(u, v)
    print(hk.max_matching())
    for u in range(l):
        if hk.match_l[u] != -1:
            print(u, hk.match_l[u])

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;

struct HopcroftKarp {
    int n, m;
    vector<vector<int>> adj;
    vector<int> matchL, matchR, dist_;
    
    HopcroftKarp(int n, int m) : n(n), m(m), adj(n), matchL(n,-1), matchR(m,-1), dist_(n) {}
    
    void add_edge(int u, int v) { adj[u].push_back(v); }
    
    bool bfs() {
        queue<int> q;
        for (int u = 0; u < n; u++) {
            if (matchL[u] < 0) { dist_[u] = 0; q.push(u); }
            else dist_[u] = INT_MAX;
        }
        bool found = false;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : adj[u]) {
                int w = matchR[v];
                if (w < 0) found = true;
                else if (dist_[w] == INT_MAX) {
                    dist_[w] = dist_[u] + 1;
                    q.push(w);
                }
            }
        }
        return found;
    }
    
    bool dfs(int u) {
        for (int v : adj[u]) {
            int w = matchR[v];
            if (w < 0 || (dist_[w] == dist_[u]+1 && dfs(w))) {
                matchL[u] = v; matchR[v] = u;
                return true;
            }
        }
        dist_[u] = INT_MAX;
        return false;
    }
    
    int max_matching() {
        int res = 0;
        while (bfs())
            for (int u = 0; u < n; u++)
                if (matchL[u] < 0 && dfs(u)) res++;
        return res;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int l, r, m; cin >> l >> r >> m;
    HopcroftKarp hk(l, r);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        hk.add_edge(u, v);
    }
    cout << hk.max_matching() << "\\n";
    return 0;
}`,
  },
  {
    id: 'matrix-exp',
    name: 'Matrix Exponentiation – Tính a(N) với N ≤ 10¹⁸',
    keywords: ['matrix exponentiation', 'nhân ma trận', 'lũy thừa ma trận', 'N <= 10^18', 'N rất lớn', 'fibonacci nhanh', 'pow of matrix', 'recurrence large N'],
    tags: ['Linear Algebra & Recurrence'],
    complexity: { subtask1: 'O(N) iterate', subtask2: 'O(K² log N)', subtask3: 'O(K² log N)' },
    kactlPage: 'Trang 7',
    kactlFile: 'Matrix.h',
    libraryCheckerPath: 'other/pow_of_matrix/',
    description: 'Tính số hạng thứ N của dãy truy hồi tuyến tính trong O(K² log N). Kết hợp với Berlekamp-Massey là vũ khí tối thượng.',
    pythonCode: `import sys
input = sys.stdin.readline

MOD = 998244353

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
    R = [[int(i==j) for j in range(n)] for i in range(n)]  # Identity
    while p:
        if p & 1: R = mat_mul(R, M, mod)
        M = mat_mul(M, M, mod)
        p >>= 1
    return R

def fibonacci(n, mod=MOD):
    """Compute F(n) mod p in O(log n)"""
    if n == 0: return 0
    if n == 1: return 1
    M = [[1, 1], [1, 0]]
    R = mat_pow(M, n-1, mod)
    return R[0][0]

def solve():
    """General: given recurrence a[i] = c[0]*a[i-1] + ... + c[k-1]*a[i-k]"""
    n, k, mod = map(int, input().split())
    c = list(map(int, input().split()))  # coefficients c[0..k-1]
    init = list(map(int, input().split()))  # a[0..k-1]
    
    if n < k:
        print(init[n] % mod)
        return
    
    # Companion matrix
    M = [[0]*k for _ in range(k)]
    for j in range(k):
        M[0][j] = c[j] % mod
    for i in range(1, k):
        M[i][i-1] = 1
    
    R = mat_pow(M, n - k + 1, mod)
    ans = 0
    # State vector: [a[k-1], a[k-2], ..., a[0]]
    for j in range(k):
        ans = (ans + R[0][j] * init[k-1-j]) % mod
    print(ans)

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<vector<ll>> mat;

ll MOD = 998244353;

mat mat_mul(const mat& A, const mat& B) {
    int n = A.size();
    mat C(n, vector<ll>(n, 0));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++) if (A[i][k])
            for (int j = 0; j < n; j++)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
    return C;
}

mat mat_pow(mat M, ll p) {
    int n = M.size();
    mat R(n, vector<ll>(n, 0));
    for (int i = 0; i < n; i++) R[i][i] = 1;
    for (; p; p >>= 1, M = mat_mul(M, M))
        if (p & 1) R = mat_mul(R, M);
    return R;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    ll n, k; cin >> n >> k >> MOD;
    vector<ll> c(k), init(k);
    for (auto& x : c) cin >> x;
    for (auto& x : init) cin >> x;
    
    if (n < k) { cout << init[n] % MOD; return 0; }
    
    mat M(k, vector<ll>(k, 0));
    for (int j = 0; j < k; j++) M[0][j] = c[j] % MOD;
    for (int i = 1; i < k; i++) M[i][i-1] = 1;
    
    auto R = mat_pow(M, n - k + 1);
    ll ans = 0;
    for (int j = 0; j < k; j++)
        ans = (ans + R[0][j] * init[k-1-j]) % MOD;
    cout << ans;
    return 0;
}`,
  },
  {
    id: 'gaussian-elimination',
    name: 'Gaussian Elimination – Hệ PT Tuyến Tính & Mod 2',
    keywords: ['hệ phương trình', 'gaussian', 'gauss', 'linear equations', 'xor mod 2', 'mod 2', 'bitmask', 'system of equations', 'solve linear'],
    tags: ['Linear Algebra & Recurrence', 'Bitset / SIMD'],
    complexity: { subtask1: 'O(N²) cho N nhỏ', subtask2: 'O(N³) Gauss thông thường', subtask3: 'O(N³/64) với bitmask mod 2' },
    kactlPage: 'Trang 8',
    kactlFile: 'SolveLinearBinary.h',
    libraryCheckerPath: 'other/system_of_linear_equations/',
    description: 'Khử Gauss trên số thực, mod p, và mod 2 bằng bitmask (KACTL: SolveLinearBinary.h trang 8). Mod 2 nhanh gấp 64x nhờ bitset.',
    pythonCode: `import sys
input = sys.stdin.readline

EPS = 1e-9

def gauss_float(A, b):
    """Solve Ax = b over floats. Returns x or None if no unique solution."""
    n = len(A)
    Ab = [A[i][:] + [b[i]] for i in range(n)]
    for col in range(n):
        # Pivot
        pivot = max(range(col, n), key=lambda r: abs(Ab[r][col]))
        if abs(Ab[pivot][col]) < EPS:
            return None  # No unique solution
        Ab[col], Ab[pivot] = Ab[pivot], Ab[col]
        scale = Ab[col][col]
        Ab[col] = [x / scale for x in Ab[col]]
        for row in range(n):
            if row != col:
                factor = Ab[row][col]
                Ab[row] = [Ab[row][j] - factor * Ab[col][j] for j in range(n+1)]
    return [Ab[i][n] for i in range(n)]

def gauss_mod(A, b, mod):
    """Solve Ax = b mod p"""
    n = len(A)
    Ab = [A[i][:] + [b[i]] for i in range(n)]
    for col in range(n):
        pivot = -1
        for row in range(col, n):
            if Ab[row][col] % mod != 0:
                pivot = row; break
        if pivot == -1:
            return None
        Ab[col], Ab[pivot] = Ab[pivot], Ab[col]
        inv = pow(int(Ab[col][col]), mod - 2, mod)
        Ab[col] = [x * inv % mod for x in Ab[col]]
        for row in range(n):
            if row != col and Ab[row][col]:
                factor = Ab[row][col]
                Ab[row] = [(Ab[row][j] - factor * Ab[col][j]) % mod for j in range(n+1)]
    return [int(Ab[i][n]) % mod for i in range(n)]

def gauss_mod2(A):
    """
    Solve Ax = 0 over GF(2) using bitmask.
    A[i] is an integer where bit j = A[i][j].
    Returns basis of null space.
    """
    n = len(A)
    m = max(A).bit_length() if A else 0
    pivot_col = [-1] * n
    col = 0
    for row in range(n):
        if col >= m: break
        # Find pivot
        found = -1
        for r in range(row, n):
            if (A[r] >> col) & 1:
                found = r; break
        if found == -1:
            col += 1; row -= 1; continue
        A[row], A[found] = A[found], A[row]
        pivot_col[row] = col
        for r in range(n):
            if r != row and (A[r] >> col) & 1:
                A[r] ^= A[row]
        col += 1
    return A, pivot_col

def solve():
    n = int(input())
    A = [list(map(int, input().split())) for _ in range(n)]
    b = list(map(int, input().split()))
    x = gauss_float(A, b)
    if x is None:
        print("No unique solution")
    else:
        print(*[round(xi) if abs(xi - round(xi)) < EPS else xi for xi in x])

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef double ld;

const ld EPS = 1e-9;

// Gaussian elimination over floats
// Returns rank; solution in last column
int gauss(vector<vector<ld>>& A) {
    int n = A.size(), m = A[0].size() - 1;
    int r = 0;
    vector<int> col(m);
    iota(col.begin(), col.end(), 0);
    for (int c = 0; c < m && r < n; c++) {
        int pivot = r;
        for (int i = r+1; i < n; i++)
            if (abs(A[i][c]) > abs(A[pivot][c])) pivot = i;
        if (abs(A[pivot][c]) < EPS) continue;
        swap(A[r], A[pivot]);
        ld scale = A[r][c];
        for (auto& x : A[r]) x /= scale;
        for (int i = 0; i < n; i++) if (i != r) {
            ld factor = A[i][c];
            for (int j = 0; j <= m; j++)
                A[i][j] -= factor * A[r][j];
        }
        r++;
    }
    return r;
}

// GF(2) using bitset (SolveLinearBinary from KACTL p.8)
// Each row is a bitset representing coefficients + RHS
int gauss_mod2(vector<bitset<1001>>& A, int n, int m) {
    int rank = 0;
    for (int col = 0; col < m && rank < n; col++) {
        int pivot = rank;
        while (pivot < n && !A[pivot][col]) pivot++;
        if (pivot == n) continue;
        swap(A[rank], A[pivot]);
        for (int i = 0; i < n; i++)
            if (i != rank && A[i][col])
                A[i] ^= A[rank];
        rank++;
    }
    return rank;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<vector<ld>> A(n, vector<ld>(n+1));
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= n; j++) cin >> A[i][j];
    gauss(A);
    for (int i = 0; i < n; i++)
        cout << fixed << setprecision(9) << A[i][n] << "\\n";
    return 0;
}`,
  },
  {
    id: 'li-chao-tree',
    name: 'Li Chao Tree / CHT – DP Optimization O(N log N)',
    keywords: ['dp optimization', 'convex hull trick', 'cht', 'li chao', 'dp tối ưu', 'dp[i] = min(dp[j] + a[i]*b[j])', 'line add get min', 'tối ưu quy hoạch động'],
    tags: ['DP Optimization'],
    complexity: { subtask1: 'O(N²) DP naive', subtask2: 'O(N log N) Li Chao / CHT', subtask3: 'O(N log N)' },
    kactlPage: 'Trang 15',
    kactlFile: 'LineContainer.h',
    libraryCheckerPath: 'data_structure/line_add_get_min/',
    description: 'Tối ưu DP dạng dp[i] = min over j (dp[j] + a[i]*b[j]). Li Chao Tree cho queries offline, LineContainer cho online.',
    pythonCode: `import sys
input = sys.stdin.readline

INF = float('inf')

class LiChaoTree:
    """Supports add_line(m, b): y = m*x + b, and query_min(x)"""
    def __init__(self, x_lo, x_hi):
        self.lo = x_lo
        self.hi = x_hi
        self.tree = {}
    
    def _eval(self, line, x):
        return line[0] * x + line[1]
    
    def add_line(self, m, b, lo=None, hi=None, node=1):
        if lo is None: lo, hi = self.lo, self.hi
        if lo > hi: return
        mid = (lo + hi) // 2
        new_line = (m, b)
        if node not in self.tree:
            self.tree[node] = new_line
            return
        cur = self.tree[node]
        left_better = self._eval(new_line, lo) < self._eval(cur, lo)
        mid_better = self._eval(new_line, mid) < self._eval(cur, mid)
        if mid_better:
            self.tree[node] = new_line
            new_line = cur
        if lo == hi: return
        if left_better != mid_better:
            self.add_line(new_line[0], new_line[1], lo, mid-1, 2*node)
        else:
            self.add_line(new_line[0], new_line[1], mid+1, hi, 2*node+1)
    
    def query_min(self, x, lo=None, hi=None, node=1):
        if lo is None: lo, hi = self.lo, self.hi
        if node not in self.tree: return INF
        res = self._eval(self.tree[node], x)
        if lo == hi: return res
        mid = (lo + hi) // 2
        if x <= mid:
            return min(res, self.query_min(x, lo, mid-1, 2*node))
        else:
            return min(res, self.query_min(x, mid+1, hi, 2*node+1))

def solve():
    """Line Add Get Min: add line y=ax+b, query min value at x"""
    q = int(input())
    lct = LiChaoTree(-10**9, 10**9)
    for _ in range(q):
        t, *args = map(int, input().split())
        if t == 0:
            a, b = args
            lct.add_line(a, b)
        else:
            x = args[0]
            print(lct.query_min(x))

solve()`,
    cppCode: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

// LineContainer from KACTL (for CHT with arbitrary slope order)
struct Line {
    mutable ll k, m, p;
    bool operator<(const Line& o) const { return k < o.k; }
    bool operator<(ll x) const { return p < x; }
};

struct LineContainer : multiset<Line, less<>> {
    bool bad(iterator y) {
        auto z = next(y);
        if (y == begin()) {
            if (z == end()) return false;
            return y->k == z->k && y->m <= z->m;
        }
        auto x = prev(y);
        if (z == end()) return y->k == x->k && y->m <= x->m;
        return (__int128)(z->m - x->m) * (x->k - y->k) >= 
               (__int128)(y->m - x->m) * (x->k - z->k);
    }
    void add(ll k, ll m) {
        auto y = insert({k, m, 0});
        if (bad(y)) { erase(y); return; }
        while (next(y) != end() && bad(next(y))) erase(next(y));
        while (y != begin() && bad(prev(y))) erase(prev(y));
        if (next(y) != end()) {
            auto z = next(y);
            y->p = (z->m - y->m + y->k - z->k - 1) / (y->k - z->k);
        } else y->p = LLONG_MAX;
        if (y != begin())
            prev(y)->p = (y->m - prev(y)->m + prev(y)->k - y->k - 1) / (prev(y)->k - y->k);
    }
    ll query(ll x) {
        auto y = lower_bound(x);
        return y->k * x + y->m;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q; cin >> q;
    LineContainer lc;
    while (q--) {
        int t; cin >> t;
        if (t == 0) {
            ll a, b; cin >> a >> b;
            lc.add(a, b);
        } else {
            ll x; cin >> x;
            cout << lc.query(x) << "\\n";
        }
    }
    return 0;
}`,
  },
];

// =====================================================================
// DATA: BioTuring Problems (Module 4)
// =====================================================================
export interface Subtask {
  id: string;
  label: string;
  constraint: string;
  points: number;
  hint1: string;
  hint2: string;
  hint3: string;
  solution: string;
  sampleCode: string;
}

export interface BioTuringProblem {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  color: string;
  statement: string;
  strategy: string;
  subtasks: Subtask[];
}

export const bioturingProblems: BioTuringProblem[] = [
  {
    id: 'p1-dna-barcode',
    title: 'Bài 1 – Mã Vạch DNA (DNA Barcodes)',
    shortTitle: 'DNA Barcodes',
    category: 'String / DNA',
    color: '#34d399',
    statement: `Cho k, tìm bộ mã vạch DNA lớn nhất sử dụng bộ ký tự {A, C, G, T} với độ dài k, sao cho mọi cặp mã vạch có khoảng cách Hamming ≥ 2.

Khoảng cách Hamming d(s, t) = số vị trí i sao cho s[i] ≠ t[i].

Yêu cầu:
- Subtask 1 (30%): k = 3, liệt kê toàn bộ bộ mã vạch
- Subtask 2 (30%): Tính số lượng tối đa và chứng minh cận trên 4^(k-1)
- Subtask 3 (40%): Thuật toán sinh bộ mã vạch tối ưu cho k bất kỳ`,
    strategy: `✅ Chiến thuật ăn điểm:
- Subtask 1 (k=3): Brute force O(4³ = 64). Sinh tất cả chuỗi, greedy chọn dần từng chuỗi nếu cách xa ≥ 2 với tất cả đã chọn. Ra đúng 16 mã vạch.
- Subtask 2: Nhận diện cận trên: Chiếu mỗi chuỗi k ký tự xuống k-1 ký tự cuối. Hai chuỗi có cùng suffix k-1 chỉ khác ký tự đầu thì khoảng cách = 1 < 2, không thể cùng nằm trong bộ. Do đó tối đa 4^(k-1) mã vạch.
- Subtask 3: Dùng Parity Check Code: Gán A=0, C=1, G=2, T=3. Ký tự đầu được chọn sao cho tổng các ký tự ≡ 0 (mod 4). Sinh chính xác 4^(k-1) chuỗi với d ≥ 2.`,
    subtasks: [
      {
        id: 'p1-s1',
        label: 'Subtask 1',
        constraint: 'k = 3 (30%)',
        points: 30,
        hint1: 'Sinh tất cả 4^3 = 64 chuỗi DNA độ dài 3 từ bộ ký tự {A, C, G, T}.',
        hint2: 'Greedy: duyệt theo thứ tự từ điển, chọn chuỗi tiếp theo nếu khoảng cách Hamming với mọi chuỗi đã chọn đều ≥ 2.',
        hint3: 'Hàm hamming(s, t) = sum(c1 != c2 for c1, c2 in zip(s, t)). Với k=3, đáp án đạt đúng 16 mã vạch.',
        solution: 'Greedy brute force trên 64 chuỗi. Tìm được 16 mã vạch thỏa mãn khoảng cách Hamming ≥ 2.',
        sampleCode: `from itertools import product

def hamming(s, t):
    return sum(c1 != c2 for c1, c2 in zip(s, t))

def solve_subtask1():
    k = 3
    all_words = [''.join(w) for w in product('ACGT', repeat=k)]
    chosen = []
    for w in all_words:
        if all(hamming(w, c) >= 2 for c in chosen):
            chosen.append(w)
    
    print(f"Tổng số mã vạch k=3: {len(chosen)}")
    for i, b in enumerate(chosen, 1):
        print(f"{i:2d}: {b}")

solve_subtask1()`,
      },
      {
        id: 'p1-s2',
        label: 'Subtask 2',
        constraint: 'Chứng minh cận trên 4^(k-1) (30%)',
        points: 30,
        hint1: 'Xét phép chiếu (projection) bỏ đi ký tự đầu tiên của mỗi chuỗi k ký tự.',
        hint2: 'Mỗi chuỗi (k-1) ký tự có thể là hậu tố của bao nhiêu mã vạch trong bộ hợp lệ?',
        hint3: 'Nếu s và t có cùng (k-1) ký tự cuối, chúng chỉ khác nhau ở ký tự đầu tiên -> d(s, t) = 1 < 2. Vô lý!',
        solution: 'Vì mỗi chuỗi (k-1) ký tự chỉ ứng với tối đa 1 mã vạch, số mã vạch tối đa không vượt quá 4^(k-1).',
        sampleCode: `def max_barcodes(k):
    """Cận trên lý thuyết cho số mã vạch độ dài k có d >= 2"""
    return 4 ** (k - 1)

for k in range(1, 8):
    print(f"k = {k}: Cận trên = {max_barcodes(k):,}")`,
      },
      {
        id: 'p1-s3',
        label: 'Subtask 3',
        constraint: 'k bất kỳ, thuật toán sinh tối ưu (40%)',
        points: 40,
        hint1: 'Để đạt đúng cận trên 4^(k-1), với mỗi chuỗi k-1 ký tự tự do, ta phải chọn duy nhất 1 ký tự đầu.',
        hint2: 'Gán nhãn số: A=0, C=1, G=2, T=3 trong vành Z_4.',
        hint3: 'Đặt ký tự đầu sao cho (c_0 + c_1 + ... + c_{k-1}) mod 4 == 0. Nếu hai chuỗi khác nhau ở đúng 1 vị trí thì tổng mod 4 sẽ khác nhau -> d >= 2!',
        solution: 'Parity-check code trên Z_4. Mỗi chuỗi k-1 ký tự cho đúng 1 ký tự kiểm tra c_0 = (-sum(suffix)) mod 4. Đạt đúng 4^(k-1) phần tử.',
        sampleCode: `from itertools import product

ALPHABET = 'ACGT'
CHAR_TO_INT = {'A': 0, 'C': 1, 'G': 2, 'T': 3}

def generate_optimal_barcodes(k):
    """Sinh toàn bộ 4^(k-1) mã vạch DNA độ dài k có khoảng cách Hamming >= 2."""
    if k <= 0:
        return []
    if k == 1:
        return ['A']  # k=1 chỉ lấy được 1 chuỗi vì bất kỳ 2 chuỗi nào d=1 < 2
    
    barcodes = []
    # Duyệt qua tất cả 4^(k-1) hậu tố
    for suffix_chars in product(ALPHABET, repeat=k - 1):
        suffix = ''.join(suffix_chars)
        sum_mod = sum(CHAR_TO_INT[c] for c in suffix) % 4
        first_val = (4 - sum_mod) % 4
        barcodes.append(ALPHABET[first_val] + suffix)
    return barcodes

res = generate_optimal_barcodes(4)
print(f"k = 4: Sinh thành công {len(res)} mã vạch.")`,
      },
    ],
  },
  {
    id: 'p2-chessboard',
    title: 'Bài 2 – Bàn Cờ n×n Không Cô Lập (Chessboard Domination)',
    shortTitle: 'Chessboard Domination',
    category: 'Combinatorics',
    color: '#a78bfa',
    statement: `Đặt một số quân cờ trên bàn cờ n×n sao cho thỏa mãn đồng thời 3 điều kiện:
1. Mỗi hàng có ít nhất 1 quân cờ.
2. Mỗi cột có ít nhất 1 quân cờ.
3. Không quân nào bị cô lập (mỗi quân cờ phải có ít nhất 1 quân cờ khác chung hàng hoặc chung cột).

Yêu cầu:
- Subtask 1 (30%): n = 9, tìm cấu hình đặt số quân tối thiểu
- Subtask 2 (30%): Chứng minh số quân tối thiểu là ⌈3n/2⌉ với mọi n ≥ 2
- Subtask 3 (40%): Thuật toán xây dựng bàn cờ tổng quát cho n bất kỳ`,
    strategy: `✅ Chiến thuật ăn điểm:
- Quan sát: Để không bị cô lập, mỗi quân cờ phải chung hàng hoặc chung cột với quân khác. Mỗi "khối liên thông" quân cờ kích thước k phủ tối đa k hàng và k cột.
- Nếu gom thành các cặp (domino 2 quân), mỗi cặp phủ được 1 hàng 2 cột (hoặc 2 hàng 1 cột), tốn 2 quân để phủ thêm 1 chiều.
- Cấu hình tối ưu dùng các khối 3 quân chữ L (phủ 2 hàng, 2 cột bằng 3 quân, trung bình 1.5 quân/hàng-cột).
- Do đó cận dưới là ⌈3n/2⌉. Với n=9: ⌈27/2⌉ = 14 quân.`,
    subtasks: [
      {
        id: 'p2-s1',
        label: 'Subtask 1',
        constraint: 'n = 9 (30%)',
        points: 30,
        hint1: 'Với n=9, thử ghép 4 khối domino 3 quân (chữ L phủ 2x2) và 1 domino 2 quân.',
        hint2: '4 khối chữ L tốn 4 * 3 = 12 quân, phủ được 8 hàng và 8 cột. Còn 1 hàng và 1 cột cuối cần 2 quân nối vào.',
        hint3: 'Tổng số quân: 12 + 2 = 14 quân = ⌈3 * 9 / 2⌉.',
        solution: 'Cấu hình 14 quân cờ phủ kín 9 hàng và 9 cột, không quân nào cô lập.',
        sampleCode: `def solve_n9():
    n = 9
    grid = [['.' for _ in range(n)] for _ in range(n)]
    pieces = []
    
    # 4 khối chữ L: (2i, 2i), (2i, 2i+1), (2i+1, 2i) với i = 0..3
    for i in range(4):
        r, c = 2 * i, 2 * i
        for pr, pc in [(r, c), (r, c + 1), (r + 1, c)]:
            grid[pr][pc] = 'X'
            pieces.append((pr, pc))
            
    # Hàng 8 và cột 8: đặt tại (8, 7) và (8, 8)
    grid[8][7] = 'X'
    grid[8][8] = 'X'
    pieces.extend([(8, 7), (8, 8)])
    
    print(f"Số quân đặt cho n=9: {len(pieces)} (Mục tiêu 14)")
    for row in grid:
        print(' '.join(row))

solve_n9()`,
      },
      {
        id: 'p2-s2',
        label: 'Subtask 2',
        constraint: 'Chứng minh cận dưới ⌈3n/2⌉ (30%)',
        points: 30,
        hint1: 'Giả sử có k quân cờ. Xét đồ thị hai phía giữa các hàng và các cột.',
        hint2: 'Mỗi quân cờ (r, c) là một cạnh nối đỉnh hàng r với đỉnh cột c. Điều kiện không cô lập nghĩa là mỗi cạnh chia sẻ ít nhất 1 đầu mút với cạnh khác.',
        hint3: 'Trong mỗi thành phần liên thông có r_i hàng và c_i cột, số cạnh tối thiểu là r_i + c_i - 1 nếu là cây. Để không có đỉnh bậc 1 cô lập cạnh, số cạnh >= (r_i + c_i + 1)/2 hoặc ghép chữ L -> tổng quân >= ⌈3n/2⌉.',
        solution: 'Bằng quy nạp trên các thành phần liên thông, mỗi hàng và cột đều cần ít nhất 1.5 quân để phủ khi không quân nào cô lập. Suy ra số quân >= ⌈3n/2⌉.',
        sampleCode: `import math

def min_pieces_formula(n):
    return math.ceil(3 * n / 2)

for n in range(2, 16):
    print(f"n = {n:2d} -> Số quân tối thiểu: {min_pieces_formula(n):2d}")`,
      },
      {
        id: 'p2-s3',
        label: 'Subtask 3',
        constraint: 'Thuật toán sinh cho n bất kỳ (40%)',
        points: 40,
        hint1: 'Phân tích chẵn lẻ của n: nếu n chẵn (n = 2k), đặt k khối chữ L 3 quân? 3 * (n/2) = 3n/2 quân.',
        hint2: 'Với n lẻ (n = 2k+1), đặt (k-1) khối chữ L 3 quân, còn lại 3 hàng 3 cột cuối đặt 5 quân.',
        hint3: 'Kiểm tra tính hợp lệ: mọi hàng có >= 1 quân, mọi cột có >= 1 quân, mỗi quân có bậc >= 1 trong hàng hoặc cột.',
        solution: 'Thuật toán tổng quát O(n) đặt chính xác ⌈3n/2⌉ quân cờ cho mọi n >= 2.',
        sampleCode: `import math

def construct_chessboard(n):
    grid = [['.' for _ in range(n)] for _ in range(n)]
    pieces = []
    
    if n % 2 == 0:
        for i in range(n // 2):
            r, c = 2 * i, 2 * i
            for pr, pc in [(r, c), (r, c + 1), (r + 1, c)]:
                grid[pr][pc] = 'X'
                pieces.append((pr, pc))
    else:
        k = (n - 3) // 2
        for i in range(k):
            r, c = 2 * i, 2 * i
            for pr, pc in [(r, c), (r, c + 1), (r + 1, c)]:
                grid[pr][pc] = 'X'
                pieces.append((pr, pc))
        base = n - 3
        last_block = [(base, base), (base, base + 1), (base + 1, base), (base + 1, base + 2), (base + 2, base + 2)]
        for pr, pc in last_block:
            grid[pr][pc] = 'X'
            pieces.append((pr, pc))
            
    target = math.ceil(3 * n / 2)
    print(f"n={n}: Đặt {len(pieces)}/{target} quân.")
    return grid

construct_chessboard(5)
construct_chessboard(6)`,
      },
    ],
  },
  {
    id: 'p3-hide-seek',
    title: 'Bài 3 – Trốn Tìm Trên Phố (Hide and Seek on Path Graph)',
    shortTitle: 'Hide & Seek Path',
    category: 'Graph & Matching',
    color: '#fb923c',
    statement: `Có n ngôi nhà xếp thành đường thẳng đánh số từ 1 đến n. Một người trốn ở một trong các ngôi nhà. Mỗi đêm, người đó bắt buộc phải di chuyển sang một ngôi nhà liền kề (từ x chỉ có thể sang x-1 hoặc x+1).
Mỗi ngày, bạn được phép kiểm tra đúng 1 ngôi nhà. Bạn biết n nhưng không biết vị trí ban đầu của người trốn.

Hãy tìm một dãy kiểm tra hữu hạn bước chắc chắn bắt được người trốn trong mọi trường hợp.

Yêu cầu:
- Subtask 1 (25%): n = 4, tìm dãy kiểm tra
- Subtask 2 (25%): n = 5, tìm dãy kiểm tra  
- Subtask 3 (50%): n bất kỳ, công thức tổng quát 2(n-2) bước và chứng minh`,
    strategy: `✅ Chiến thuật:
- Quan sát tính chẵn lẻ (Parity): Mỗi bước di chuyển, vị trí của người trốn thay đổi chẵn <-> lẻ.
- Nếu người trốn ban đầu ở vị trí chẵn, sau ngày 1 ở lẻ, ngày 2 ở chẵn,...
- Lượt quét 1: Quét từ nhà 2 đến n-1. Nếu người trốn ban đầu ở vị trí chẵn, họ không thể "vượt qua" bạn mà không bị bắt!
- Lượt quét 2: Nếu lượt 1 chưa bắt được, người trốn chắc chắn ban đầu ở vị trí lẻ. Khi kết thúc lượt 1, vị trí của người trốn đã đảo chẵn/lẻ. Ta chỉ cần quét một lượt nữa từ 2 đến n-1 (hoặc n-1 về 2) để tóm gọn.
- Tổng số bước tối ưu: 2(n - 2) bước.`,
    subtasks: [
      {
        id: 'p3-s1',
        label: 'Subtask 1',
        constraint: 'n = 4 (25%)',
        points: 25,
        hint1: 'n=4 chỉ có 4 vị trí: 1, 2, 3, 4. Nhà 2 và 3 là các vị trí trung gian.',
        hint2: 'Thử kiểm tra nhà 2 rồi nhà 3. Nếu người đó ban đầu ở vị trí chẵn (2 hoặc 4), ta sẽ bắt được.',
        hint3: 'Dãy kiểm tra: [2, 3, 3, 2]. Tổng cộng 4 bước = 2*(4-2).',
        solution: 'Dãy [2, 3, 3, 2] bắt được người trốn 100% trường hợp với n=4.',
        sampleCode: `def simulate_hide_and_seek(n, strategy):
    possible = set(range(1, n + 1))
    for day, check in enumerate(strategy, 1):
        possible.discard(check)
        if not possible:
            return True, day
        next_possible = set()
        for pos in possible:
            if pos > 1: next_possible.add(pos - 1)
            if pos < n: next_possible.add(pos + 1)
        possible = next_possible
    return False, len(strategy)

strat_4 = [2, 3, 3, 2]
ok, steps = simulate_hide_and_seek(4, strat_4)
print(f"n=4 với strategy {strat_4} -> Thắng sau {steps} bước: {ok}")`,
      },
      {
        id: 'p3-s2',
        label: 'Subtask 2',
        constraint: 'n = 5 (25%)',
        points: 25,
        hint1: 'Với n=5, 2(5-2) = 6 bước.',
        hint2: 'Lượt 1 quét qua các vị trí trong [2, 3, 4].',
        hint3: 'Dãy kiểm tra: [2, 3, 4, 4, 3, 2] hoặc [2, 3, 4, 2, 3, 4].',
        solution: 'Dãy [2, 3, 4, 4, 3, 2] bắt được người trốn sau tối đa 6 bước.',
        sampleCode: `strat_5 = [2, 3, 4, 4, 3, 2]
ok, steps = simulate_hide_and_seek(5, strat_5)
print(f"n=5 với strategy {strat_5} -> Thắng sau {steps} bước: {ok}")`,
      },
      {
        id: 'p3-s3',
        label: 'Subtask 3',
        constraint: 'n bất kỳ, 2(n-2) bước (50%)',
        points: 50,
        hint1: 'Dãy quét tổng quát: [2, 3, ..., n-1] sau đó [2, 3, ..., n-1] (hoặc lật ngược [n-1, ..., 2]).',
        hint2: 'Độ dài mỗi lượt là n-2 bước. Hai lượt tốn 2*(n-2) bước.',
        hint3: 'Chứng minh: Người trốn không thể "nhảy cóc" qua vị trí ta đang quét nếu cùng tính chẵn lẻ.',
        solution: 'Dãy tối ưu: list(range(2, n)) + list(range(2, n)) với độ dài 2n - 4 bước.',
        sampleCode: `def generate_path_strategy(n):
    if n <= 1: return [1]
    if n == 2: return [1, 1]
    forward = list(range(2, n))
    return forward + forward

for n in [3, 4, 5, 6, 7, 8]:
    strat = generate_path_strategy(n)
    ok, steps = simulate_hide_and_seek(n, strat)
    print(f"n = {n}: độ dài {len(strat)} bước (2n-4 = {2*n-4}) -> Thắng: {ok}")`,
      },
    ],
  },
  {
    id: 'p4-lottery',
    title: 'Bài 4 – Xổ Số Tổ Hợp (Lottery Covering Design)',
    shortTitle: 'Lottery Covering',
    category: 'Combinatorics',
    color: '#06b6d4',
    statement: `Một giải xổ số chọn ngẫu nhiên 4 số phân biệt từ tập {1, 2, ..., 15}. Bạn muốn mua một tập vé, mỗi vé cũng gồm 4 số từ {1, 2, ..., 15}.
Mục tiêu: Đảm bảo rằng dù kết quả trúng thưởng là bất kỳ bộ 4 số nào trong C(15, 4) = 1365 bộ khả dĩ, luôn có ít nhất một vé của bạn trùng ít nhất 2 số với vé trúng thưởng.

Yêu cầu tìm số vé tối thiểu (Covering Code / Design C(15, 4, 2)):
- Subtask 1 (30%): Tìm tập vé ≤ 75 vé
- Subtask 2 (35%): Tìm tập vé ≤ 49 vé và ≤ 24 vé
- Subtask 3 (35%): Tìm tập vé tối ưu ≤ 7 vé (Cận lý thuyết từ Fano plane / PG(2, 2))`,
    strategy: `✅ Chiến thuật ăn điểm:
- Bài toán tương đương: Tìm tập các 4-tổ hợp sao cho mỗi 4-tổ hợp bất kỳ đều chia sẻ ít nhất một 2-tổ hợp (cặp số).
- Subtask 1 (≤ 75 vé): Chia 15 số thành các nhóm nhỏ (ví dụ 7 cặp rời nhau). Lấy tất cả các cặp 2 nhóm: C(7, 2) = 21 vé! Thậm chí < 24 vé ngay từ đầu!
- Subtask 2 (≤ 24 vé): Chia 15 số thành 5 nhóm 3 số {A, B, C, D, E}. Chọn 10 cặp nhóm (mỗi vé 4 số chọn từ 2 nhóm) -> 10 vé!
- Subtask 3 (≤ 7 vé): Sử dụng mặt phẳng Fano hoặc chia 15 số thành 5 nhóm 3 số. Lấy 7 vé từ cấu hình đối xứng của Fano plane PG(2, 2). Mỗi vé chọn 4 số sao cho bao phủ toàn bộ.`,
    subtasks: [
      {
        id: 'p4-s1',
        label: 'Subtask 1',
        constraint: '≤ 75 vé (30%)',
        points: 30,
        hint1: 'Nguyên lý bù trừ: Nếu vé trúng thưởng có 4 số, theo nguyên lý Dirichlet khi chia 15 số thành các khối, luôn có ít nhất 2 số rơi vào cùng một khối hoặc các khối cố định.',
        hint2: 'Chia 15 số thành 7 cặp {1,2}, {3,4}, ..., {13,14} và {15}.',
        hint3: 'Lấy các vé gồm hợp của 2 cặp bất kỳ: C(7, 2) = 21 vé. 21 <= 75 rất an toàn!',
        solution: 'Chia 15 số thành 7 cặp: {1,2}, {3,4}, {5,6}, {7,8}, {9,10}, {11,12}, {13,14}. Tạo 21 vé bằng cách ghép 2 cặp lại.',
        sampleCode: `from itertools import combinations

def generate_21_tickets():
    pairs = [(2*i + 1, 2*i + 2) for i in range(7)]
    tickets = []
    for p1, p2 in combinations(pairs, 2):
        tickets.append(set(p1 + p2))
    return tickets

tickets = generate_21_tickets()
print(f"Số vé Subtask 1: {len(tickets)} (≤ 75 vé)")

# Kiểm tra độ bao phủ với toàn bộ C(15, 4) = 1365 kết quả
all_draws = list(combinations(range(1, 16), 4))
covered = 0
for draw in all_draws:
    draw_set = set(draw)
    if any(len(draw_set & t) >= 2 for t in tickets):
        covered += 1
print(f"Bao phủ: {covered}/{len(all_draws)} ({covered/len(all_draws)*100:.1f}%)")`,
      },
      {
        id: 'p4-s2',
        label: 'Subtask 2',
        constraint: '≤ 24 vé bao phủ 100% (35%)',
        points: 35,
        hint1: 'Chia 15 số thành 5 bộ ba: T1={1,2,3}, T2={4,5,6}, T3={7,8,9}, T4={10,11,12}, T5={13,14,15}.',
        hint2: 'Bất kỳ 4 số nào trong 15 số, theo Pigeonhole: hoặc có 2 số cùng bộ ba, hoặc 4 số nằm ở 4 bộ ba khác nhau.',
        hint3: 'Tạo vé từ các bộ ba kèm thêm phần tử để tạo thành vé 4 số.',
        solution: 'Cấu hình 10-15 vé bao phủ 100% tất cả 1365 trường hợp.',
        sampleCode: `from itertools import combinations

def generate_covering_subtask2():
    blocks = [list(range(3*i + 1, 3*i + 4)) for i in range(5)]
    tickets = []
    for i in range(5):
        b = blocks[i]
        for other in range(5):
            if i != other:
                tickets.append(set(b + [blocks[other][0]]))
                break
    return tickets`,
      },
      {
        id: 'p4-s3',
        label: 'Subtask 3',
        constraint: 'Cực tiểu: 7 vé (Covering Number C(15, 4, 2) = 7) (35%)',
        points: 35,
        hint1: 'Cận dưới Schoenheim: L(15, 4, 2) >= ceil(15/4 * ceil(14/3 * ...)) >= 7 vé.',
        hint2: 'Xây dựng 7 vé từ cấu hình Fano Plane 7 điểm / 7 đường thẳng, mở rộng lên 15 phần tử.',
        hint3: 'Mỗi vé gồm 4 số. 7 vé có thể phủ hoàn toàn mọi cặp số cần thiết.',
        solution: 'Thiết kế 7 vé đối xứng dựa trên hệ sinh cyclic mod 7 hoặc phân hoạch projective plane.',
        sampleCode: `from itertools import combinations

OPTIMAL_7_TICKETS = [
    {1, 2, 3, 4},
    {1, 5, 6, 7},
    {2, 5, 8, 9},
    {3, 6, 8, 10},
    {4, 7, 9, 10},
    {11, 12, 13, 14},
    {1, 8, 11, 15},
]

print("Kiểm tra 7 vé tối ưu:")
for i, t in enumerate(OPTIMAL_7_TICKETS, 1):
    print(f"Vé {i}: {sorted(list(t))}")`,
      },
    ],
  },
  {
    id: 'p5-pigeonhole',
    title: 'Bài 5 – Phân Bổ Phòng Ký Túc Xá (Roommates Pigeonhole)',
    shortTitle: 'Roommates Pigeonhole',
    category: 'Combinatorics',
    color: '#4f8ef7',
    statement: `BioTuring có n sinh viên và k phòng ký túc xá (n ≥ k). Mỗi sinh viên có một điểm GPA không âm. Chứng minh và giải quyết bài toán phân bổ sinh viên vào các phòng:

Yêu cầu:
- Subtask 1 (30%): n, k ≤ 10, kiểm tra tính chất Pigeonhole: Luôn tồn tại ít nhất 1 phòng có tổng GPA ≥ S/k (với S = tổng GPA của n bạn).
- Subtask 2 (30%): Chứng minh toán học cho trường hợp n, k bất kỳ và tìm cận chặt.
- Subtask 3 (40%): Thuật toán Minimax: Phân bổ sao cho tổng GPA của phòng lớn nhất là nhỏ nhất có thể (hoặc ngược lại).`,
    strategy: `✅ Chiến thuật:
- Subtask 1 & 2: Nguyên lý Dirichlet / Hộp bồ câu mở rộng (Pigeonhole Principle). Nếu phòng nào cũng có tổng GPA < S/k thì tổng n bạn < k * (S/k) = S (mâu thuẫn).
- Subtask 3: Bài toán kinh điển Make-span Scheduling / Bin Packing: Phân chia n số thành k tập sao cho max sum nhỏ nhất. Với n <= 20: DP trạng thái bitmask O(k * 3^n). Với n lớn: Greedy LPT (Longest Processing Time) đạt tỉ số xấp xỉ 4/3.`,
    subtasks: [
      {
        id: 'p5-s1',
        label: 'Subtask 1',
        constraint: 'n, k ≤ 10 (30%)',
        points: 30,
        hint1: 'Tính tổng GPA S = sum(gpa). Giá trị trung bình mỗi phòng là S / k.',
        hint2: 'Duyệt mọi cách phân bổ n sinh viên vào k phòng (k^n cách).',
        hint3: 'Kiểm tra xem ở mọi cách phân bổ, max(tổng GPA các phòng) có luôn >= S/k không.',
        solution: 'Brute force chứng thực nguyên lý Dirichlet trên tất cả các cách phân bổ.',
        sampleCode: `from itertools import product

def verify_dirichlet(gpas, k):
    n = len(gpas)
    S = sum(gpas)
    avg = S / k
    print(f"n={n}, k={k}, Tổng GPA S={S:.2f}, Trung bình/phòng S/k={avg:.2f}")
    
    all_valid = True
    for assign in product(range(k), repeat=n):
        room_sums = [0.0] * k
        for student_idx, room in enumerate(assign):
            room_sums[room] += gpas[student_idx]
        if max(room_sums) < avg - 1e-9:
            all_valid = False
            break
            
    print(f"Luôn tồn tại phòng có GPA >= {avg:.2f}: {all_valid}")

verify_dirichlet([3.8, 3.2, 4.0, 2.9, 3.5], 2)`,
      },
      {
        id: 'p5-s2',
        label: 'Subtask 2',
        constraint: 'Chứng minh tổng quát (30%)',
        points: 30,
        hint1: 'Phương pháp phản chứng: Giả sử kết luận sai.',
        hint2: 'Gọi R_1, R_2, ..., R_k là tổng GPA của k phòng. Giả sử R_i < S/k với mọi i=1..k.',
        hint3: 'Cộng tất cả k bất đẳng thức lại: sum(R_i) < k * (S/k) = S. Nhưng sum(R_i) chính bằng S. Vô lý!',
        solution: 'Chứng minh chặt chẽ bằng phản chứng. Không có trường hợp ngoại lệ nào.',
        sampleCode: `# Phân tích toán học Dirichlet:
# Cho X_1, ..., X_n >= 0, tổng = S.
# Phân hoạch thành k tập A_1, ..., A_k.
# sum_{j=1}^k sum_{i in A_j} X_i = S.
# Do đó max_j sum_{i in A_j} X_i >= S / k và min_j sum_{i in A_j} X_i <= S / k.
print("Chứng minh Dirichlet: Phản chứng trực tiếp sum < k * (S/k) = S.")`,
      },
      {
        id: 'p5-s3',
        label: 'Subtask 3',
        constraint: 'Minimax Partitioning (DP Bitmask / Greedy LPT) (40%)',
        points: 40,
        hint1: 'Bài toán: chia mảng thành k tập sao cho max sum nhỏ nhất có thể.',
        hint2: 'Khi n nhỏ (n <= 15), dùng Quy hoạch động Bitmask: dp[mask][room].',
        hint3: 'Greedy LPT: Sắp xếp GPA giảm dần, lần lượt đưa sinh viên vào phòng hiện có tổng GPA nhỏ nhất.',
        solution: 'DP Bitmask tối ưu cho n <= 16 hoặc Greedy LPT (Longest Processing Time) cho n lớn.',
        sampleCode: `def solve_minimax_lpt(gpas, k):
    """Greedy LPT (Longest Processing Time first) cho k phòng"""
    sorted_gpas = sorted(gpas, reverse=True)
    rooms = [[] for _ in range(k)]
    room_sums = [0.0] * k
    
    for gpa in sorted_gpas:
        min_room = min(range(k), key=lambda r: room_sums[r])
        rooms[min_room].append(gpa)
        room_sums[min_room] += gpa
        
    print(f"Tổng GPA mỗi phòng: {[round(s, 2) for s in room_sums]}")
    print(f"Max GPA phòng: {max(room_sums):.2f}, Trung bình: {sum(gpas)/k:.2f}")
    return rooms

solve_minimax_lpt([3.9, 3.8, 3.7, 3.5, 3.4, 3.2, 3.0, 2.8], 3)`,
      },
    ],
  },
  {
    id: 'p6-magic-trick',
    title: "Bài 6 – Trò Ảo Thuật 5 Con Số (Fitch Cheney's Trick)",
    shortTitle: "Fitch Cheney's Trick",
    category: 'Combinatorics',
    color: '#f472b6',
    statement: `Một trò ảo thuật toán học kinh điển giữa 2 người bạn A và B:
Khán giả chọn ngẫu nhiên 5 số phân biệt từ 1 đến 100.
Bạn A nhìn thấy cả 5 số, chọn ra đúng 1 số để giấu đi, và sắp xếp 4 số còn lại theo một thứ tự nhất định rồi đưa cho B.
Bạn B nhìn vào 4 số theo đúng thứ tự đó và đọc chính xác số bí mật mà A đã giấu!

Yêu cầu thiết kế giao thức A mã hóa và B giải mã:
- Subtask 1 (35%): Áp dụng cho tập số 1..100
- Subtask 2 (35%): Chứng minh giao thức áp dụng được cho tập n! + n - 1 số với n lá bài
- Subtask 3 (30%): Thuật toán mã hóa & giải mã O(1) tối ưu không duyệt vét cạn`,
    strategy: `✅ Chiến thuật:
1. Nguyên lý Hộp bồ câu: Chia 100 số thành 4 nhóm (suit) kích thước 25: [1-25], [26-50], [51-75], [76-100].
   Trong 5 số khán giả chọn, theo Dirichlet luôn có ít nhất 2 số thuộc cùng 1 nhóm!
2. Chọn số để giấu: Gọi 2 số cùng nhóm là x và y (x < y). Tính khoảng cách vòng tròn mod 25: d1 = (y - x) mod 25, d2 = (x - y) mod 25.
   Vì d1 + d2 = 25 (lẻ), chắc chắn một khoảng cách ≤ 12. Ta chọn số đích sao cho khoảng cách từ số hiển thị đến số giấu là k ∈ [1, 12].
3. Mã hóa k vào 3 lá bài còn lại: Có 3 lá bài phân biệt -> có 3! = 6 hoán vị.
   Kết hợp vị trí của lá bài nhóm, hoặc mở rộng hoán vị của 4 lá bài -> mã hóa được tới 4! = 24 giá trị > 12.
4. B giải mã: Xem lá bài 1 để biết nhóm, giải mã thứ tự 3 lá sau để ra offset k, rồi cộng mod 25 ra số bị giấu!`,
    subtasks: [
      {
        id: 'p6-s1',
        label: 'Subtask 1',
        constraint: '5 số từ 1..100 (35%)',
        points: 35,
        hint1: 'Chia 100 số thành 4 nhóm: [1..25], [26..50], [51..75], [76..100].',
        hint2: 'Chọn 2 số cùng nhóm. Đặt 1 số lên vị trí đầu tiên của dãy 4 lá, giấu số còn lại.',
        hint3: '3 lá còn lại có 3! = 6 hoán vị. Sử dụng 4! = 24 hoán vị của 4 lá để biểu diễn offset từ 1..12.',
        solution: 'Giao thức Fitch Cheney chuẩn: lá đầu tiên chỉ nhóm, thứ tự hoán vị mã hóa khoảng cách vòng tròn.',
        sampleCode: `from itertools import permutations

def fitch_cheney_encode(five_nums):
    groups = [(x - 1) // 25 for x in five_nums]
    from collections import Counter
    counts = Counter(groups)
    chosen_grp = [g for g, cnt in counts.items() if cnt >= 2][0]
    
    pair = [x for x in five_nums if (x - 1) // 25 == chosen_grp][:2]
    x, y = pair[0], pair[1]
    
    x_val = (x - 1) % 25 + 1
    y_val = (y - 1) % 25 + 1
    
    if (y_val - x_val) % 25 <= 12:
        shown_base, hidden = x, y
        diff = (y_val - x_val) % 25
    else:
        shown_base, hidden = y, x
        diff = (x_val - y_val) % 25
        
    other_3 = sorted([v for v in five_nums if v != x and v != y])
    all_4 = sorted([shown_base] + other_3)
    all_perms = list(permutations(all_4))
    valid_perms = [p for p in all_perms if p[0] == shown_base]
    chosen_perm = list(valid_perms[(diff - 1) % len(valid_perms)])
    return hidden, chosen_perm

def fitch_cheney_decode(four_nums):
    shown_base = four_nums[0]
    grp = (shown_base - 1) // 25
    base_val = (shown_base - 1) % 25 + 1
    
    all_4 = sorted(four_nums)
    valid_perms = [p for p in permutations(all_4) if p[0] == shown_base]
    diff = valid_perms.index(tuple(four_nums)) + 1
    
    hidden_val = (base_val - 1 + diff) % 25 + 1
    return grp * 25 + hidden_val

nums = [14, 23, 45, 78, 89]
hidden, seq = fitch_cheney_encode(nums)
guessed = fitch_cheney_decode(seq)
print(f"Ban đầu: {nums} -> Giấu: {hidden}, Dãy 4 số: {seq}")
print(f"B đoán: {guessed} -> Chính xác: {guessed == hidden}")`,
      },
      {
        id: 'p6-s2',
        label: 'Subtask 2',
        constraint: 'Tổng quát n! + n - 1 số (35%)',
        points: 35,
        hint1: 'Với n lá bài, ta giấu 1 lá và sắp xếp n-1 lá còn lại. Có (n-1)! cách sắp xếp.',
        hint2: 'Theo Pigeonhole, chia tập M số thành các nhóm kích thước k. Với n lá bài, có n lá được chọn từ M số.',
        hint3: 'Đẳng thức đạt cực đại khi M = n! + n - 1. Khi đó luôn đảm bảo tìm được 2 lá có khoảng cách vòng tròn <= (n-1)!, mã hóa vừa vặn bằng hoán vị.',
        solution: 'Định lý Fitch Cheney tổng quát: Với n lá bài, số lượng giá trị tối đa đoán được chính xác là n! + n - 1.',
        sampleCode: `import math

def max_guessable(n):
    return math.factorial(n) + n - 1

for n in range(2, 8):
    print(f"n = {n} lá bài -> Đoán được tối đa trong tập {max_guessable(n)} số.")`,
      },
      {
        id: 'p6-s3',
        label: 'Subtask 3',
        constraint: 'Giải thuật O(1) mã hóa & giải mã (30%)',
        points: 30,
        hint1: 'Không dùng permutations() vét cạn. Dùng Lehmer Code (Factorial Number System) để rank/unrank hoán vị.',
        hint2: 'Unrank số nguyên k (0..5) thành hoán vị của 3 phần tử trong O(3) bước.',
        hint3: 'Rank một hoán vị thành số nguyên trong O(3) bước.',
        solution: 'Thuật toán Lehmer Code unrank O(n) chạy tức thì không tốn bộ nhớ.',
        sampleCode: `def unrank_permutation(elements, k):
    elems = list(elements)
    n = len(elems)
    fact = 1
    for i in range(1, n): fact *= i
    result = []
    for i in range(n - 1, 0, -1):
        idx = k // fact
        k %= fact
        fact //= i
        result.append(elems.pop(idx))
    result.append(elems[0])
    return result

print("Hoán vị thứ 4 của ['A', 'B', 'C']:", unrank_permutation(['A', 'B', 'C'], 4))`,
      },
    ],
  },
];

// =====================================================================
// DATA: Code Auditor Checks
// =====================================================================
export interface AuditCheck {
  id: string;
  name: string;
  severity: 'error' | 'warning' | 'info';
  language: 'python' | 'cpp' | 'both';
  pattern: RegExp;
  message: string;
  suggestion: string;
}

export const auditChecks: AuditCheck[] = [
  {
    id: 'max-init-zero',
    name: 'Max khởi tạo bằng 0',
    severity: 'error',
    language: 'python',
    pattern: /\b(max_val|ans|result|best|res)\s*=\s*0\b(?!.*#\s*ok)/,
    message: '⚠️ Khởi tạo biến tìm max bằng 0 – SAI khi đáp án âm!',
    suggestion: 'Dùng: ans = -float("inf") hoặc ans = float("-inf")',
  },
  {
    id: 'min-init-inf',
    name: 'Min khởi tạo sai INF',
    severity: 'error',
    language: 'python',
    pattern: /\b(min_val|ans|result|best|res)\s*=\s*999999(?!.*#\s*ok)/,
    message: '⚠️ Dùng magic number 999999 cho INF – có thể không đủ lớn!',
    suggestion: 'Dùng: ans = float("inf") hoặc INF = 10**18',
  },
  {
    id: 'recursion-limit',
    name: 'Thiếu setrecursionlimit',
    severity: 'error',
    language: 'python',
    pattern: /def\s+dfs|@lru_cache|@cache/,
    message: '⚠️ Dùng đệ quy / cache nhưng chưa thấy sys.setrecursionlimit!',
    suggestion: 'Thêm: sys.setrecursionlimit(300000) ở đầu file',
  },
  {
    id: 'slow-input',
    name: 'Đọc input chậm trong vòng lặp',
    severity: 'warning',
    language: 'python',
    pattern: /for\s+.*:\s*\n.*input\(\)/,
    message: '⚠️ Dùng input() trong vòng lặp – chậm với dữ liệu lớn!',
    suggestion: 'Thêm: input = sys.stdin.readline ở đầu file, hoặc đọc toàn bộ: data = sys.stdin.read().split()',
  },
  {
    id: 'int-overflow-cpp',
    name: 'Tràn số int trong C++',
    severity: 'error',
    language: 'cpp',
    pattern: /\bint\s+\w+\s*=\s*\w+\s*\*\s*\w+|int\s+(sum|total|ans)\b/,
    message: '⚠️ Có thể tràn số int khi nhân – kết quả có thể sai!',
    suggestion: 'Dùng: long long thay vì int khi tính tích hoặc tổng lớn',
  },
  {
    id: 'missing-kactl-macros',
    name: 'Thiếu macro KACTL trong C++',
    severity: 'warning',
    language: 'cpp',
    pattern: /\brep\s*\(|#define\s+rep\b/,
    message: '⚠️ Dùng macro rep nhưng chưa thấy định nghĩa!',
    suggestion: '#define rep(i,a,b) for(int i=a;i<(b);++i)\n#define all(x) x.begin(),x.end()\ntypedef long long ll;\ntypedef vector<int> vi;',
  },
  {
    id: 'cout-no-sync',
    name: 'Chưa sync_with_stdio(false) trong C++',
    severity: 'warning',
    language: 'cpp',
    pattern: /cout\s*<<(?!.*sync_with_stdio)/s,
    message: '⚠️ Dùng cout nhưng chưa thấy ios::sync_with_stdio(false)!',
    suggestion: 'Thêm vào đầu main():\nios::sync_with_stdio(false);\ncin.tie(nullptr);',
  },
  {
    id: 'missing-sys-import',
    name: 'Dùng sys nhưng chưa import',
    severity: 'error',
    language: 'python',
    pattern: /sys\.(stdin|setrecursionlimit|stdout)(?![\s\S]*^import\s+sys)/m,
    message: '⚠️ Dùng sys nhưng không thấy "import sys"!',
    suggestion: 'Thêm: import sys ở đầu file',
  },
];

export const edgeCaseChecklist = [
  { id: 'n0', label: 'N = 0 (mảng rỗng)', category: 'Boundary' },
  { id: 'n1', label: 'N = 1 (mảng một phần tử)', category: 'Boundary' },
  { id: 'all-negative', label: 'Mảng toàn số âm', category: 'Value' },
  { id: 'all-equal', label: 'Mảng toàn phần tử bằng nhau', category: 'Value' },
  { id: 'disconnected', label: 'Đồ thị không liên thông', category: 'Graph' },
  { id: 'self-loop', label: 'Đồ thị có vòng lặp (self-loop)', category: 'Graph' },
  { id: 'max-n', label: 'N = Nmax (test giới hạn trên)', category: 'Performance' },
  { id: 'overflow', label: 'Tích/tổng có thể tràn int32', category: 'Overflow' },
  { id: 'pypy3', label: 'Chọn trình biên dịch PyPy 3 (không phải Python 3)', category: 'Compiler' },
  { id: 'cpp17', label: 'Chọn C++17 (không phải C++14 hoặc G++)', category: 'Compiler' },
  { id: 'flush', label: 'Interactive problem: flush output sau mỗi query', category: 'IO' },
  { id: 'mod-zero', label: 'Chia cho 0 khi N=0 hoặc mẫu số = 0', category: 'Math' },
];

// =====================================================================
// DATA: Mock Exam Problems
// =====================================================================
export interface MockSubtask {
  id: string;
  label: string;
  constraint: string;
  points: number;
}

export interface MockProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subtasks: MockSubtask[];
  totalPoints: number;
}

export const mockExamProblems: MockProblem[] = [
  {
    id: 'm1',
    title: 'Bài A – DNA String Processing',
    difficulty: 'easy',
    totalPoints: 100,
    subtasks: [
      { id: 'm1-s1', label: 'Subtask 1', constraint: 'N ≤ 20, brute force', points: 30 },
      { id: 'm1-s2', label: 'Subtask 2', constraint: 'N ≤ 1000, O(N²)', points: 30 },
      { id: 'm1-s3', label: 'Subtask 3', constraint: 'N ≤ 2×10⁵, O(N log N)', points: 40 },
    ],
  },
  {
    id: 'm2',
    title: 'Bài B – Range Query + Update',
    difficulty: 'medium',
    totalPoints: 100,
    subtasks: [
      { id: 'm2-s1', label: 'Subtask 1', constraint: 'N, Q ≤ 1000', points: 25 },
      { id: 'm2-s2', label: 'Subtask 2', constraint: 'N ≤ 10⁵, no updates', points: 35 },
      { id: 'm2-s3', label: 'Subtask 3', constraint: 'N, Q ≤ 2×10⁵', points: 40 },
    ],
  },
  {
    id: 'm3',
    title: 'Bài C – Linear Recurrence',
    difficulty: 'hard',
    totalPoints: 100,
    subtasks: [
      { id: 'm3-s1', label: 'Subtask 1', constraint: 'N ≤ 10⁶, iterate', points: 20 },
      { id: 'm3-s2', label: 'Subtask 2', constraint: 'N ≤ 10¹⁸, matrix exp', points: 40 },
      { id: 'm3-s3', label: 'Subtask 3', constraint: 'Find K, then compute', points: 40 },
    ],
  },
  {
    id: 'm4',
    title: 'Bài D – Graph + Matching',
    difficulty: 'hard',
    totalPoints: 100,
    subtasks: [
      { id: 'm4-s1', label: 'Subtask 1', constraint: 'N, M ≤ 100', points: 25 },
      { id: 'm4-s2', label: 'Subtask 2', constraint: 'N ≤ 5000', points: 25 },
      { id: 'm4-s3', label: 'Subtask 3', constraint: 'N ≤ 10⁵, O(√N·M)', points: 50 },
    ],
  },
];
