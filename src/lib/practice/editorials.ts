// Written walkthroughs for each practice problem: the key idea, steps, why it is correct, a reference solution and the usual mistakes.
export type Editorial = { idea:string; steps:string[]; why:string; code:string; mistakes:string[] };
export const editorials:Record<string,Editorial> = {
 maximum:{
  idea:'지금까지 본 값 중 가장 큰 값을 하나 들고 다니며 한 번만 훑습니다.',
  steps:['빈 배열이면 바로 None을 돌려줍니다.','첫 값을 최댓값 후보로 잡습니다.','나머지 값을 차례로 보며 후보보다 크면 바꿉니다.'],
  why:'i번째까지 봤을 때 best는 앞의 i개 중 최댓값이라는 성질이 매 반복에서 유지됩니다. 끝까지 보면 전체의 최댓값입니다.',
  code:`def solution(data):
    nums = data["nums"]
    if not nums:
        return None
    best = nums[0]
    for x in nums[1:]:
        if x > best:
            best = x
    return best`,
  mistakes:['best = 0으로 시작하면 [-7, -2, -9]에서 0을 돌려줍니다. 배열에 없는 값입니다.','빈 배열에서 nums[0]을 읽으면 IndexError가 납니다.']},
 'range-sum':{
  idea:'앞에서부터의 합 P를 한 번 만들어 두면 구간 합은 P[r+1] − P[l] 뺄셈 한 번입니다.',
  steps:['길이 n+1인 P를 만들고 P[0] = 0으로 둡니다.','P[i+1] = P[i] + nums[i]로 채웁니다.','질문 [l, r]마다 P[r+1] − P[l]을 결과에 넣습니다.'],
  why:'P[r+1]은 0..r의 합, P[l]은 0..l−1의 합이므로 빼면 l..r만 남습니다. P[0] = 0 덕분에 l = 0도 같은 식입니다.',
  code:`def solution(data):
    nums, queries = data["nums"], data["queries"]
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    return [prefix[r + 1] - prefix[l] for l, r in queries]`,
  mistakes:['질문마다 sum(nums[l:r+1])을 쓰면 n과 q가 5만일 때 시간이 초과됩니다.','P[r] − P[l]로 쓰면 r번째 값이 빠집니다. 양 끝 포함 여부를 확인합니다.']},
 unique:{
  idea:'이미 본 값을 집합에 기억하고 처음 보는 값만 결과에 붙입니다.',
  steps:['빈 집합 seen과 빈 결과 리스트를 만듭니다.','값을 앞에서부터 보며 seen에 없으면 결과에 붙이고 seen에 넣습니다.'],
  why:'각 값은 처음 나올 때 한 번만 결과에 들어가고 순서는 입력 순서를 그대로 따릅니다.',
  code:`def solution(data):
    seen, result = set(), []
    for x in data["nums"]:
        if x not in seen:
            seen.add(x)
            result.append(x)
    return result`,
  mistakes:['list(set(nums))는 순서를 보장하지 않습니다. list(dict.fromkeys(nums))는 순서를 지키므로 한 줄 답으로 쓸 수 있습니다.','결과 리스트에서 x in result로 찾으면 매번 O(n)이라 전체 O(n²)입니다.']},
 palindrome:{
  idea:'양 끝에서 포인터 두 개를 안쪽으로 움직이며 영문자와 숫자만 비교합니다.',
  steps:['l = 0, r = 끝에서 시작합니다.','l이나 r이 영문자·숫자가 아니면 건너뜁니다.','둘 다 문자면 소문자로 바꿔 비교하고 다르면 False입니다.','포인터가 만나면 True입니다.'],
  why:'회문은 i번째와 끝에서 i번째가 같은 문자열입니다. 거를 문자를 건너뛰면 정리한 문자열의 양 끝을 비교하는 것과 같습니다.',
  code:`def solution(data):
    s = data["text"]
    l, r = 0, len(s) - 1
    while l < r:
        if not s[l].isalnum():
            l += 1
        elif not s[r].isalnum():
            r -= 1
        elif s[l].lower() != s[r].lower():
            return False
        else:
            l += 1
            r -= 1
    return True`,
  mistakes:['문장부호를 거르지 않으면 "A b, B a!"를 False로 판단합니다.','정리한 문자열을 따로 만들어 뒤집는 방법도 맞지만 O(n) 추가 공간을 씁니다.']},
 brackets:{
  idea:'여는 괄호를 스택에 쌓고 닫는 괄호가 오면 맨 위와 짝이 맞는지 봅니다.',
  steps:['닫는 괄호 → 여는 괄호 짝 사전을 만듭니다.','여는 괄호는 push합니다.','닫는 괄호면 스택이 비었거나 맨 위가 짝이 아니면 False입니다. 맞으면 pop합니다.','끝나고 스택이 비어 있으면 True입니다.'],
  why:'가장 나중에 연 괄호가 가장 먼저 닫혀야 하므로 스택의 맨 위가 항상 다음에 닫힐 괄호입니다.',
  code:`def solution(data):
    pair = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in data["text"]:
        if ch in pair:
            if not stack or stack.pop() != pair[ch]:
                return False
        else:
            stack.append(ch)
    return not stack`,
  mistakes:['종류별 개수만 세면 "([)]"를 통과시킵니다.','끝에 스택이 남는 "(("를 True로 돌려주기 쉽습니다.']},
 frequency:{
  idea:'Counter로 값별 횟수를 세고 (빈도가 큰 순, 값이 작은 순)으로 하나를 고릅니다.',
  steps:['빈 배열이면 None입니다.','Counter로 센 뒤 min(key=(−빈도, 값))으로 고릅니다.'],
  why:'키 (−빈도, 값)에서 가장 작은 것은 빈도가 가장 크고 그중 값이 가장 작은 항목입니다.',
  code:`from collections import Counter

def solution(data):
    nums = data["nums"]
    if not nums:
        return None
    count = Counter(nums)
    return min(count, key=lambda v: (-count[v], v))`,
  mistakes:['Counter.most_common(1)은 동점일 때 먼저 센 값을 돌려줘서 작은 값 규칙을 어길 수 있습니다.','값마다 nums.count(v)를 부르면 O(n²)입니다.']},
 merge:{
  idea:'두 배열의 아직 쓰지 않은 맨 앞을 비교해 작은 쪽을 꺼냅니다. 병합 정렬의 병합 단계입니다.',
  steps:['i = j = 0에서 시작합니다.','a[i] ≤ b[j]면 a[i]를, 아니면 b[j]를 붙이고 그 포인터만 움직입니다.','한쪽이 끝나면 다른 쪽의 남은 부분을 그대로 붙입니다.'],
  why:'두 배열이 각각 정렬되어 있으므로 남은 값 중 최솟값은 항상 두 맨 앞 중 하나입니다.',
  code:`def solution(data):
    a, b = data["a"], data["b"]
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out`,
  mistakes:['sorted(a + b)도 통과하지만 O((n+m) log(n+m))이고 정렬되어 있다는 조건을 쓰지 않습니다.','남은 부분을 붙이지 않으면 긴 쪽의 꼬리가 사라집니다.']},
 'lower-bound':{
  idea:'"nums[i] ≥ target"이 False…False True…True로 나뉘므로 처음 True가 되는 자리를 이진 탐색합니다.',
  steps:['lo = 0, hi = n으로 둡니다. hi는 범위 밖(답이 n일 수 있음)입니다.','mid의 값이 target보다 작으면 lo = mid + 1, 아니면 hi = mid입니다.','lo == hi가 되면 그 자리가 답입니다.'],
  why:'반복마다 "답은 [lo, hi] 안에 있다"가 유지되고 범위가 매번 줄어 반드시 끝납니다.',
  code:`def solution(data):
    nums, target = data["nums"], data["target"]
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
  mistakes:['값을 찾자마자 return하면 중복 중 첫 자리가 아닐 수 있습니다.','hi = n − 1로 시작하면 모두 작을 때 n을 돌려줄 수 없습니다. bisect.bisect_left(nums, target)가 같은 일을 합니다.']},
 'pair-count':{
  idea:'앞에서 본 값의 개수를 사전에 세어 두고 현재 값의 짝(target − x)이 몇 번 나왔는지 더합니다.',
  steps:['빈 Counter seen을 만듭니다.','x마다 answer += seen[target − x]를 하고 그다음 seen[x] += 1을 합니다.'],
  why:'j를 기준으로 i < j인 짝은 모두 seen에 들어 있으므로 각 쌍을 정확히 한 번 셉니다. 현재 값을 나중에 넣으므로 같은 인덱스를 두 번 쓰지 않습니다.',
  code:`from collections import Counter

def solution(data):
    seen = Counter()
    answer = 0
    for x in data["nums"]:
        answer += seen[data["target"] - x]
        seen[x] += 1
    return answer`,
  mistakes:['seen[x]를 먼저 늘리면 target이 2x일 때 자기 자신과 짝을 지어 [2, 2, 2]가 6이 됩니다.','집합만 쓰면 같은 값의 개수를 잃어 [1, 1, 2, 2]가 4가 아니게 됩니다.']},
 'short-window':{
  idea:'모든 값이 양수이므로 오른쪽을 늘리면 합이 커지고 왼쪽을 줄이면 작아집니다. 슬라이딩 윈도를 씁니다.',
  steps:['left = 0, total = 0에서 시작합니다.','right를 하나씩 늘리며 total에 더합니다.','total ≥ target인 동안 길이를 기록하고 left를 빼며 줄입니다.'],
  why:'오른쪽 끝을 고정했을 때 조건을 만족하는 가장 짧은 구간을 찾고 나면 left를 다시 왼쪽으로 돌릴 필요가 없습니다. 오른쪽이 늘어날수록 합만 커지기 때문입니다.',
  code:`def solution(data):
    nums, target = data["nums"], data["target"]
    best = len(nums) + 1
    left = total = 0
    for right, x in enumerate(nums):
        total += x
        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if best > len(nums) else best`,
  mistakes:['while 대신 if를 쓰면 한 번만 줄여서 더 짧은 구간을 놓칩니다.','음수가 섞인 문제에 같은 방법을 쓰면 틀립니다. 그때는 누적 합을 씁니다.']},
 warmer:{
  idea:'아직 더 따뜻한 날을 못 찾은 날의 인덱스를 스택에 쌓습니다. 스택의 온도는 위로 갈수록 낮거나 같습니다.',
  steps:['결과를 0으로 채웁니다.','오늘 온도가 스택 맨 위 날보다 높으면 그날의 답을 오늘 − 그날로 정하고 pop합니다. 반복합니다.','오늘을 push합니다.'],
  why:'어떤 날 d가 스택에서 빠지는 순간이 d 이후 처음으로 더 높은 온도가 나온 날입니다. 그 전의 날들은 d보다 높지 않아서 d를 꺼내지 못했습니다.',
  code:`def solution(data):
    temps = data["temps"]
    answer = [0] * len(temps)
    stack = []
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            j = stack.pop()
            answer[j] = i - j
        stack.append(i)
    return answer`,
  mistakes:['< 대신 <=를 쓰면 같은 온도를 더 따뜻한 날로 처리합니다.','날마다 뒤를 훑으면 O(n²)이라 큰 입력에서 느립니다. 단조 스택은 각 인덱스를 한 번 넣고 한 번 빼서 O(n)입니다.']},
 maze:{
  idea:'모든 이동 비용이 1이므로 BFS로 처음 도착한 거리가 최단 거리입니다.',
  steps:['격자가 비었거나 시작·끝이 벽이면 −1입니다.','시작 칸 거리를 0으로 두고 큐에 넣습니다.','꺼낸 칸의 상하좌우 중 통로이고 처음 보는 칸에 거리 + 1을 적고 큐에 넣습니다.','끝 칸의 거리를 돌려주고 끝내 못 가면 −1입니다.'],
  why:'BFS는 거리 d인 칸을 모두 꺼낸 뒤에 거리 d+1인 칸을 꺼내므로 처음 적힌 거리보다 짧은 경로가 있을 수 없습니다.',
  code:`from collections import deque

def solution(data):
    grid = data["grid"]
    if not grid or not grid[0]:
        return -1
    rows, cols = len(grid), len(grid[0])
    if grid[0][0] or grid[rows - 1][cols - 1]:
        return -1
    dist = [[-1] * cols for _ in range(rows)]
    dist[0][0] = 0
    queue = deque([(0, 0)])
    while queue:
        r, c = queue.popleft()
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0 and dist[nr][nc] < 0:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))
    return dist[rows - 1][cols - 1]`,
  mistakes:['큐에서 꺼낼 때 방문 표시를 하면 같은 칸이 여러 번 들어가 120×120에서 느려집니다.','DFS로 찾은 첫 경로는 최단이 아닐 수 있습니다.']},
 islands:{
  idea:'방문하지 않은 땅을 만날 때마다 섬 하나를 세고 그 섬 전체를 BFS로 방문 표시합니다.',
  steps:['모든 칸을 차례로 봅니다.','땅이고 아직 방문하지 않았으면 섬 수를 1 늘리고 BFS로 이어진 땅을 모두 표시합니다.'],
  why:'BFS 한 번이 연결된 땅 덩어리 하나를 남김없이 표시하므로 새로 시작하는 횟수가 곧 섬의 수입니다.',
  code:`from collections import deque

def solution(data):
    grid = data["grid"]
    rows = len(grid)
    cols = len(grid[0]) if rows else 0
    seen = [[False] * cols for _ in range(rows)]
    count = 0
    for sr in range(rows):
        for sc in range(cols):
            if grid[sr][sc] != 1 or seen[sr][sc]:
                continue
            count += 1
            seen[sr][sc] = True
            queue = deque([(sr, sc)])
            while queue:
                r, c = queue.popleft()
                for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1 and not seen[nr][nc]:
                        seen[nr][nc] = True
                        queue.append((nr, nc))
    return count`,
  mistakes:['재귀 DFS는 땅이 1만 칸 넘게 이어지면 Python 재귀 한도를 넘습니다.','대각선까지 이웃으로 보면 [[1, 0], [0, 1]]이 1이 됩니다.']},
 coins:{
  idea:'dp[x]를 "금액 x를 만드는 최소 동전 수"로 정의하고 0부터 amount까지 채웁니다.',
  steps:['dp[0] = 0, 나머지는 무한대로 둡니다.','x마다 동전 c ≤ x에 대해 dp[x] = min(dp[x], dp[x − c] + 1)입니다.','dp[amount]가 무한대면 −1입니다.'],
  why:'x를 만드는 최적해의 마지막 동전이 c라면 나머지는 x − c의 최적해여야 합니다. 마지막 동전을 모두 시도하므로 최적해를 놓치지 않습니다.',
  code:`def solution(data):
    coins, amount = data["coins"], data["amount"]
    INF = amount + 1
    dp = [0] + [INF] * amount
    for x in range(1, amount + 1):
        for c in coins:
            if c <= x and dp[x - c] + 1 < dp[x]:
                dp[x] = dp[x - c] + 1
    return -1 if dp[amount] == INF else dp[amount]`,
  mistakes:['큰 동전부터 고르는 그리디는 [1, 3, 4]로 6을 만들 때 3개(4+1+1)를 답합니다.','무한대 상태에 1을 더해 비교하면 도달 불가 상태가 답으로 섞일 수 있습니다.']},
 schedule:{
  idea:'끝나는 시각이 빠른 예약부터 고르고 직전에 고른 예약이 끝난 뒤 시작하는 것만 받습니다.',
  steps:['end 기준으로 정렬합니다.','last_end = −∞로 두고 start ≥ last_end인 예약을 고르며 last_end를 갱신합니다.'],
  why:'최적해의 첫 예약을 가장 빨리 끝나는 예약으로 바꿔도 뒤와 겹치지 않으므로 개수가 줄지 않습니다(교환 논증). 이를 반복하면 그리디의 선택이 최적입니다.',
  code:`def solution(data):
    count, last_end = 0, float("-inf")
    for start, end in sorted(data["intervals"], key=lambda x: x[1]):
        if start >= last_end:
            count += 1
            last_end = end
    return count`,
  mistakes:['시작 시각으로 정렬하면 [1, 100] 하나가 짧은 예약 여러 개를 막습니다.','start > last_end로 쓰면 끝나는 시각에 바로 시작하는 예약을 놓칩니다.']},
 'subarray-k':{
  idea:'구간 합 = P[j] − P[i]이므로 지금까지의 누적 합 중 "현재 누적 합 − k"가 몇 번 나왔는지 셉니다.',
  steps:['seen = {0: 1}로 시작합니다. 빈 앞부분을 뜻합니다.','값을 더해 prefix를 갱신하고 answer += seen[prefix − k]를 합니다.','seen[prefix] += 1을 합니다.'],
  why:'오른쪽 끝을 j로 고정하면 합이 k인 구간의 수는 P[i] = P[j] − k인 i의 수와 같습니다. 모든 j에 대해 더하면 전체 개수입니다.',
  code:`from collections import Counter

def solution(data):
    seen = Counter({0: 1})
    prefix = answer = 0
    for x in data["nums"]:
        prefix += x
        answer += seen[prefix - data["k"]]
        seen[prefix] += 1
    return answer`,
  mistakes:['음수가 있으므로 슬라이딩 윈도는 틀립니다.','seen = {0: 1}을 빼면 맨 앞에서 시작하는 구간을 세지 못합니다.']},
 lis:{
  idea:'tails[L]에 "길이 L+1인 증가 수열이 끝날 수 있는 가장 작은 값"을 유지합니다. tails는 항상 정렬되어 있어 이진 탐색으로 갱신합니다.',
  steps:['x마다 tails에서 x 이상인 첫 자리를 bisect_left로 찾습니다.','그 자리가 끝이면 붙이고 아니면 그 값을 x로 바꿉니다.','tails의 길이가 답입니다.'],
  why:'끝 값이 작을수록 뒤에 더 많은 값을 붙일 수 있으므로 같은 길이라면 작은 끝 값만 기억하면 됩니다. bisect_left를 쓰므로 같은 값은 길이를 늘리지 않아 엄격한 증가가 지켜집니다.',
  code:`from bisect import bisect_left

def solution(data):
    tails = []
    for x in data["nums"]:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)`,
  mistakes:['bisect_right를 쓰면 [2, 2, 2]가 3이 됩니다.','tails는 실제 수열이 아닙니다. 길이만 맞습니다.','O(n²) DP도 맞지만 n = 5만이면 느립니다.']},
 dijkstra:{
  idea:'거리가 가장 작은 후보를 최소 힙에서 꺼내 확정하고 그 정점의 간선으로 이웃의 거리를 줄입니다.',
  steps:['인접 목록을 만듭니다.','dist[start] = 0, 힙에 (0, start)를 넣습니다.','꺼낸 거리가 dist보다 크면 낡은 항목이니 건너뜁니다.','이웃 거리가 줄면 dist를 바꾸고 힙에 넣습니다.','무한대는 −1로 바꿔 돌려줍니다.'],
  why:'간선 비용이 0 이상이므로 힙에서 꺼낸 가장 작은 거리는 다른 경로로 더 줄어들 수 없습니다.',
  code:`import heapq

def solution(data):
    n, start = data["n"], data["start"]
    graph = [[] for _ in range(n)]
    for a, b, w in data["edges"]:
        graph[a].append((b, w))
    INF = float("inf")
    dist = [INF] * n
    dist[start] = 0
    heap = [(0, start)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(heap, (dist[v], v))
    return [x if x != INF else -1 for x in dist]`,
  mistakes:['간선이 방향 간선입니다. 양쪽으로 넣으면 틀립니다.','낡은 항목 검사를 빼면 같은 정점을 여러 번 처리해 느려집니다.']},
 cycle:{
  idea:'선수 과목이 없는(진입 차수 0) 과목부터 듣고 그 과목을 지운다고 생각합니다. 칸 알고리즘(위상 정렬)입니다.',
  steps:['각 과목의 진입 차수를 셉니다.','진입 차수 0인 과목을 큐에 넣습니다.','꺼낸 과목의 다음 과목 차수를 1씩 줄이고 0이 되면 큐에 넣습니다.','꺼낸 과목 수가 n이면 True입니다.'],
  why:'순환 안의 과목은 서로를 기다리므로 진입 차수가 끝내 0이 되지 않습니다. 그래서 순환이 있으면 꺼낸 수가 n보다 적습니다.',
  code:`from collections import deque

def solution(data):
    n = data["n"]
    graph = [[] for _ in range(n)]
    indegree = [0] * n
    for a, b in data["edges"]:
        graph[a].append(b)
        indegree[b] += 1
    queue = deque(i for i in range(n) if indegree[i] == 0)
    taken = 0
    while queue:
        u = queue.popleft()
        taken += 1
        for v in graph[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                queue.append(v)
    return taken == n`,
  mistakes:['방문 표시 하나만 쓰는 DFS는 이미 끝난 정점과 지금 경로 위의 정점을 구분하지 못해 순환을 잘못 찾습니다. DFS라면 세 가지 상태를 씁니다.','자기 자신을 가리키는 간선 [a, a]도 순환입니다.']},
 knapsack:{
  idea:'dp[c]를 "용량 c 이내에서 얻는 최대 가치"로 두고 물건마다 용량을 큰 쪽부터 갱신합니다.',
  steps:['dp를 capacity+1개의 0으로 만듭니다.','물건 (w, v)마다 c를 capacity에서 w까지 거꾸로 돌며 dp[c] = max(dp[c], dp[c − w] + v)입니다.','dp[capacity]가 답입니다.'],
  why:'c를 큰 쪽부터 갱신하면 dp[c − w]는 아직 이 물건을 넣기 전의 값이라 같은 물건이 두 번 들어가지 않습니다.',
  code:`def solution(data):
    cap = data["capacity"]
    dp = [0] * (cap + 1)
    for w, v in zip(data["weights"], data["values"]):
        for c in range(cap, w - 1, -1):
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[cap]`,
  mistakes:['c를 작은 쪽부터 돌면 같은 물건을 여러 번 담는 무제한 배낭이 됩니다.','가치/무게 비율로 고르는 그리디는 0/1 배낭에서 틀립니다.']},
 'edit-distance':{
  idea:'dp[i][j]를 "a의 앞 i글자를 b의 앞 j글자로 바꾸는 최소 비용"으로 둡니다.',
  steps:['dp[i][0] = i(모두 삭제), dp[0][j] = j(모두 삽입)입니다.','마지막 글자가 같으면 dp[i−1][j−1]입니다.','다르면 1 + min(삭제 dp[i−1][j], 삽입 dp[i][j−1], 교체 dp[i−1][j−1])입니다.'],
  why:'최적의 연산 순서에서 a의 마지막 글자는 지워지거나 b의 마지막 글자와 맞춰지거나(같거나 교체) b의 마지막 글자가 삽입됩니다. 세 경우를 모두 보므로 빠짐이 없습니다.',
  code:`def solution(data):
    a, b = data["a"], data["b"]
    prev = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        cur = [i] + [0] * len(b)
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                cur[j] = prev[j - 1]
            else:
                cur[j] = 1 + min(prev[j], cur[j - 1], prev[j - 1])
        prev = cur
    return prev[len(b)]`,
  mistakes:['첫 행과 첫 열을 0으로 두면 빈 문자열과의 거리가 틀립니다.','같은 글자일 때도 1을 더하면 비용이 부풀어 오릅니다.']},
 rooms:{
  idea:'시작 시각을 +1, 종료 시각을 −1 사건으로 보고 시간순으로 훑으며 동시에 진행 중인 수의 최댓값을 구합니다.',
  steps:['(시각, +1)과 (시각, −1) 사건을 만듭니다.','시각 순으로 정렬하되 같은 시각이면 −1을 먼저 둡니다.','차례로 더하며 최댓값을 기록합니다.'],
  why:'필요한 방의 수는 한순간에 겹치는 예약 수의 최댓값과 같습니다. 같은 시각에 끝나고 시작하면 방을 재사용하므로 종료를 먼저 처리합니다.',
  code:`def solution(data):
    events = []
    for s, e in data["intervals"]:
        events.append((s, 1))
        events.append((e, -1))
    events.sort()
    cur = best = 0
    for _, delta in events:
        cur += delta
        best = max(best, cur)
    return best`,
  mistakes:['(e, −1)이 (s, +1)보다 먼저 정렬되는 것은 −1 < 1 덕분입니다. 부호를 반대로 쓰면 [1,3], [3,5]가 2가 됩니다.','시작 시각으로 정렬하고 최소 힙에 종료 시각을 넣는 방법도 같은 답을 냅니다.']},
 'window-max':{
  idea:'덱에 인덱스를 담되 값이 내림차순이 되게 유지합니다. 덱의 맨 앞이 현재 구간의 최댓값입니다.',
  steps:['새 값보다 작거나 같은 값은 덱 뒤에서 뺍니다. 다시는 최댓값이 될 수 없습니다.','새 인덱스를 뒤에 넣습니다.','맨 앞 인덱스가 구간 밖이면 앞에서 뺍니다.','i ≥ k − 1부터 맨 앞의 값을 결과에 넣습니다.'],
  why:'뒤에서 빠지는 값은 자기보다 크거나 같은 새 값이 더 오래 구간에 남으므로 최댓값이 될 기회가 없습니다. 인덱스마다 한 번 넣고 한 번 빼서 O(n)입니다.',
  code:`from collections import deque

def solution(data):
    nums, k = data["nums"], data["k"]
    if not nums or k == 0:
        return []
    dq, out = deque(), []
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            out.append(nums[dq[0]])
    return out`,
  mistakes:['값을 담으면 구간 밖으로 나갔는지 알 수 없습니다. 인덱스를 담습니다.','구간마다 max(nums[i:i+k])를 쓰면 O(nk)입니다.']},
 components:{
  idea:'Union-Find로 간선마다 두 노드의 그룹을 합치고 실제로 합쳐질 때마다 그룹 수를 1 줄입니다.',
  steps:['parent[i] = i, 그룹 수 = n으로 시작합니다.','find는 루트를 찾으며 경로를 압축합니다.','간선 (a, b)의 루트가 다르면 합치고 그룹 수를 줄입니다.'],
  why:'처음에는 노드마다 그룹이 하나입니다. 서로 다른 두 그룹을 합칠 때만 1이 줄고 이미 같은 그룹이면(중복 간선, 자기 간선) 그대로이므로 남은 수가 연결 요소의 수입니다.',
  code:`def solution(data):
    n = data["n"]
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    groups = n
    for a, b in data["edges"]:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            groups -= 1
    return groups`,
  mistakes:['간선마다 무조건 그룹 수를 줄이면 중복 간선과 자기 간선에서 틀립니다.','재귀 find는 경로가 길면 재귀 한도에 걸릴 수 있어 반복문으로 씁니다.']}
};
