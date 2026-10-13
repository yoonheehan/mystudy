// Adapted topic selection from anjeongkyun/backend-interview-questions.
// This file's learning text and examples are distributed under CC BY-SA 4.0.
export type Deepening = {
 title:string; path:string; definition:string; why:string; scene:string;
 steps:string[]; mistake:string; question:string; answer:string;
 code:string; output:string; note:string; refs:[string,string][];
};
export const deepening:Record<string,Deepening>={
 process:{
  title:'컨텍스트 스위칭 · 요리사를 늘리면 항상 빨라질까?',path:'operating-system/context-switching',
  definition:'컨텍스트 스위칭은 CPU가 실행할 흐름을 바꾸면서 기존 실행 상태를 저장하고 다음 실행 상태를 복원하는 작업입니다. 어디까지 실행했는지 나타내는 프로그램 카운터, 스택 포인터, 레지스터 등이 다음 진행에 필요합니다.',
  why:'한 CPU에서도 여러 작업이 진행되게 하고, 입출력을 기다리는 작업 대신 준비된 작업을 실행하려고 실행 시간을 나눕니다. 요리사가 주문 A의 조리 단계를 적어 두고 주문 B를 처리한 다음 A로 돌아오는 것과 비슷합니다. 기록과 복원에도 시간이 들기 때문에 작업을 잘게 나누기만 하면 이득이 생기지는 않습니다.',
  scene:'API 서버에 요청이 많다고 요청마다 새 스레드를 만들면 메모리와 생성 비용이 늘고, 실행 가능한 흐름 사이의 전환과 잠금 경쟁도 늘 수 있습니다. 제한된 풀을 두고 응답 시간·처리량·CPU 사용률·대기열을 함께 측정해 개수를 조정합니다.',
  steps:['작업이 CPU 시간을 쓰다가 시간 할당 종료·입출력 대기·선점 등의 계기를 만납니다.','OS가 기존 흐름의 실행 상태를 보관하고 다음 실행 가능한 흐름을 선택합니다.','다른 프로세스로 넘어가면 주소 공간의 전환도 고려합니다. 같은 프로세스의 스레드는 주소 공간을 공유합니다.','새 작업이 접근하는 데이터에 따라 캐시와 주소 변환 캐시(TLB)의 적중률이 달라져 전환 이후에도 비용이 생길 수 있습니다.'],
  mistake:'시스템 콜이나 인터럽트가 발생했다고 반드시 다른 스레드로 바뀌는 것은 아닙니다. 모드 전환과 실행 흐름 전환을 구분하세요. 프로세스 전환 때 캐시가 전부 지워지거나 언제나 몇 배 느리다고 단정할 수도 없습니다. CPU의 PCID/ASID 지원, OS, 작업 집합에 따라 다릅니다.',
  question:'스레드를 두 배로 늘렸는데 처리량은 그대로이고 CPU만 높아졌다면 무엇을 확인할까요?',
  answer:'먼저 CPU 계산, 외부 I/O, 잠금 중 어떤 것이 병목인지 확인합니다. runnable 스레드 수와 전환 횟수, 잠금 대기, 메모리와 p95 지연을 함께 봅니다. 풀 크기를 제한하고 작은 작업을 묶는 방법을 비교하되 I/O 대기가 긴 작업에서 무조건 스레드를 줄이지는 않습니다.',
  code:`# 실제 OS가 아닌, 실행 위치를 저장하는 스케줄러 모형입니다.
from collections import deque
tasks = {"A": ["읽기", "계산"], "B": ["받기", "저장"]}
position = {name: 0 for name in tasks}
ready = deque(tasks)
trace = []
while ready:
    name = ready.popleft()
    trace.append(name + ":" + tasks[name][position[name]])
    position[name] += 1  # 다음에 돌아올 위치를 보관
    if position[name] < len(tasks[name]):
        ready.append(name)
assert trace == ["A:읽기", "B:받기", "A:계산", "B:저장"]
print(" -> ".join(trace))`,
  output:'A:읽기 -> B:받기 -> A:계산 -> B:저장',note:'position이 저장된 실행 위치 역할을 합니다. 실제 레지스터·커널 스케줄러·캐시 비용을 구현하거나 측정하는 코드는 아닙니다.',
  refs:[['Linux Kernel · TLB','https://docs.kernel.org/arch/x86/tlb.html']]
 },
 deadlock:{
  title:'락과 세마포어 · 한 명씩 수정하기와 두 명까지 입장하기',path:'operating-system/mutex-vs-semaphore',
  definition:'임계 구역은 여러 실행 흐름이 동시에 건드리면 결과가 깨질 수 있는 코드 구간입니다. 상호 배제는 그 구간에 한 흐름씩 들어가게 하는 규칙입니다. 세마포어는 획득할 때 줄고 반환할 때 늘어나는 카운터를 이용해 자원 수나 신호를 관리합니다.',
  why:'식당 장부를 두 사람이 읽고 각각 덮어쓰면 먼저 쓴 주문이 사라질 수 있습니다. 장부 수정은 한 명씩, 두 개뿐인 조리 기구 사용은 두 명까지 허용해야 합니다. 보호할 데이터와 제한할 자원의 수가 다르므로 도구를 나눕니다.',
  scene:'외부 API 호출을 동시에 두 개만 진행하도록 제한하면서 공유 카운터를 안전하게 갱신해 봅니다. 동시 실행 제한은 초당 호출 수 제한과 다릅니다. 호출이 빨리 끝나면 초당 수백 번도 가능하므로 초당 제한에는 별도의 시간 기반 정책이 필요합니다.',
  steps:['공유 상태의 읽기·계산·쓰기를 하나의 임계 구역으로 묶습니다.','Python Lock으로 그 구역의 진입을 보호합니다.','BoundedSemaphore(2)로 진행 중인 작업 수에 상한을 둡니다.','with 구문으로 예외가 발생해도 획득한 자원을 반환합니다.'],
  mistake:'일반적인 소유권 있는 뮤텍스와 Python threading.Lock을 똑같이 설명하지 마세요. Python 기본 Lock은 다른 스레드도 release할 수 있습니다. RLock은 획득한 스레드가 해제하며 재진입을 지원합니다. BoundedSemaphore는 과도한 반환을 감지하지만 해제자의 소유권을 보장하지 않습니다.',
  question:'동시 다운로드를 세 개로 제한하면 초당 요청 수도 세 번으로 제한되나요?',
  answer:'아닙니다. 세마포어는 진행 중인 개수를 제한합니다. 초당 호출 수는 시간 창이나 토큰 버킷 같은 정책으로 제한합니다. 두 요구가 함께 있으면 두 제어를 함께 사용하고 대기 시간·타임아웃도 정합니다.',
  code:`from concurrent.futures import ThreadPoolExecutor
from threading import Lock, BoundedSemaphore
import time
guard = Lock()
slots = BoundedSemaphore(2)
active = peak = 0
def download(number):
    global active, peak
    with slots:
        with guard:
            active += 1
            peak = max(peak, active)
        try:
            time.sleep(0.02)  # 다운로드 대기 대신 사용
            return number
        finally:
            with guard:
                active -= 1
with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(download, range(4)))
assert results == [0, 1, 2, 3] and peak <= 2 and active == 0
print(results)
print("동시 실행 상한 준수:", peak <= 2)`,
  output:'[0, 1, 2, 3]\n동시 실행 상한 준수: True',note:'PC의 Python에서 실행합니다. 실측 최대치는 스케줄링에 따라 달라도 두 개를 넘으면 안 됩니다. 락을 잡은 채 네트워크 응답을 기다리지 않도록 보호 구간을 짧게 둡니다.',
  refs:[['Python · Lock / RLock / Semaphore','https://docs.python.org/3/library/threading.html']]
 },
 async:{
  title:'숨은 블로킹 · async 함수 안에서 멈추는 서버',path:'operating-system/sync-async-blocking',
  definition:'블로킹 여부는 호출이 끝나기 전 호출자의 실행을 붙잡는지, 비동기 여부는 작업 완료를 어떤 방식으로 다루는지 살피는 구분입니다. 문맥에 따라 용어 사용이 달라지므로 실제 API의 반환·대기·완료 방식을 설명하는 것이 안전합니다.',
  why:'카페에서 주문한 뒤 다른 일을 하다가 알림을 받는 것과, 준비됐는지 계속 카운터에 물어보는 것은 다릅니다. 즉시 반환하는 호출을 반복해도 바쁜 폴링이면 CPU를 낭비합니다. 이벤트 루프는 준비된 작업을 진행하고 대기 중인 작업은 잠시 양보하게 하려는 구조입니다.',
  scene:'async def 안에서 time.sleep이나 동기 DB 드라이버를 호출하면 이벤트 루프 스레드가 붙잡힐 수 있습니다. asyncio.sleep으로 양보하거나, 적합한 비동기 드라이버를 쓰고, 필요한 블로킹 I/O는 제한된 별도 스레드로 보냅니다.',
  steps:['두 작업을 gather로 시작합니다.','블로킹 함수는 완료될 때까지 이벤트 루프를 점유합니다.','await asyncio.sleep은 해당 작업을 대기시키고 다른 작업에 실행 기회를 줍니다.','블로킹 I/O를 asyncio.to_thread로 옮길 수 있지만 취소 시 실행 중인 스레드가 자동 종료되는 것은 아닙니다.'],
  mistake:'async만 붙이거나 모든 지점에 await를 적는다고 병렬 계산이 되지 않습니다. 순차 await와 동시에 시작한 작업도 구분해야 합니다. 타임아웃·풀 크기·DB 연결 수·취소 후 정리를 함께 설계합니다.',
  question:'비동기 서버로 바꿨는데 다른 요청까지 멈춘다면 어디를 먼저 볼까요?',
  answer:'이벤트 루프 지연을 보고 동기 네트워크 호출, 파일 작업, time.sleep, 무거운 CPU 계산을 찾습니다. I/O에는 비동기 API나 제한된 스레드 풀, CPU 작업에는 프로세스 워커 등 적합한 실행 경계를 검토합니다. 단일 작업의 시간을 줄이는 효과와 대기를 겹쳐 처리량을 높이는 효과를 구분합니다.',
  code:`import asyncio
import time
async def job(name, blocking, log):
    log.append(name + " 시작")
    if blocking:
        time.sleep(0.02)
    else:
        await asyncio.sleep(0.02)
    log.append(name + " 끝")
async def main():
    for blocking in (True, False):
        log = []
        await asyncio.gather(job("A", blocking, log), job("B", blocking, log))
        if blocking:
            assert log == ["A 시작", "A 끝", "B 시작", "B 끝"]
        else:
            assert set(log[:2]) == {"A 시작", "B 시작"}
        print("블로킹" if blocking else "양보", log)
asyncio.run(main())`,
  output:'블로킹: A가 끝난 뒤 B가 시작합니다. 양보: A와 B가 모두 시작한 뒤 완료됩니다. 완료 순서에는 의존하지 마세요.',note:'PC에서 .py 파일로 실행합니다. 노트북처럼 이미 이벤트 루프가 실행 중인 환경에서는 main을 await하는 방식이 필요할 수 있습니다. sleep은 외부 대기 모형이며 성능 벤치마크는 아닙니다.',
  refs:[['Python · asyncio.to_thread','https://docs.python.org/3/library/asyncio-task.html#asyncio.to_thread']]
 },
 cache:{
  title:'캐시 스탬피드 · 인기 상품의 캐시가 만료되는 순간',path:'cache/cache-stampede',
  definition:'캐시 스탬피드는 같은 데이터의 캐시 미스를 여러 요청이 동시에 만나 원본 저장소로 갱신 요청이 몰리는 현상입니다. 높은 평균 적중률만으로 순간적인 부하를 알 수는 없습니다.',
  why:'식당에서 메뉴 안내판을 지우는 순간 손님 모두가 주방에 같은 메뉴를 물으면 요리가 밀립니다. 안내판을 다시 쓰는 담당자를 하나로 정하면 반복 문의를 줄일 수 있습니다. 캐시의 성능 이득이 사라질 때 원본이 견딜 수 있는지도 설계해야 합니다.',
  scene:'인기 상품 하나에 천 명이 동시에 접속하는 상황을 생각하세요. 여러 키의 만료를 TTL 지터로 분산해도 그 상품 한 키가 만료되면 요청이 몰릴 수 있습니다. 같은 키의 갱신 병합, 사전 갱신, 오래된 값의 제한적 제공, DB 동시 조회 제한을 함께 검토합니다.',
  steps:['캐시에서 값을 확인합니다.','미스이면 해당 키의 갱신 권한을 얻습니다.','권한을 얻은 뒤 다시 캐시를 확인합니다. 앞선 요청이 이미 채웠을 수 있습니다.','한 요청만 원본을 조회하고 결과를 저장합니다. 나머지는 정책에 따라 기다리거나 허용된 오래된 값을 받습니다.'],
  mistake:'TTL 지터가 인기 키 하나의 동시 미스를 해결해 주지는 않습니다. 프로세스 안의 Lock은 다른 서버의 요청을 제어하지 못합니다. 분산 락은 만료·소유자 확인·작업 지연을 고려하고, 잠금 자체만으로 모든 중복 갱신을 완전히 막는다고 가정하지 마세요.',
  question:'캐시가 죽었을 때 모든 요청을 곧바로 DB에 보내도 될까요?',
  answer:'DB가 그 부하를 감당하는지 확인해야 합니다. 동시 조회와 대기열을 제한하고, 중요도에 따라 일부 기능을 줄이거나 실패 응답을 정합니다. 오래된 값 허용 여부는 상품 설명과 결제 잔액처럼 업무별로 다르게 판단합니다.',
  code:`from concurrent.futures import ThreadPoolExecutor
from threading import Lock
import time
cache = {}
refresh = Lock()  # 이 예제는 키 하나, 프로세스 하나만 다룹니다.
reads = 0
def get_product(_):
    global reads
    with refresh:
        if "product" not in cache:
            reads += 1
            time.sleep(0.02)
            cache["product"] = "책"
        return cache["product"]
with ThreadPoolExecutor(max_workers=8) as pool:
    values = list(pool.map(get_product, range(8)))
assert values == ["책"] * 8 and reads == 1
print("같은 결과:", len(set(values)) == 1)
print("원본 조회:", reads)`,
  output:'같은 결과: True\n원본 조회: 1',note:'TTL·분산 락·갱신 실패는 구현하지 않은 단일 프로세스 모형입니다. 운영에서는 키별 병합을 고려해 서로 다른 상품까지 한 잠금으로 묶지 않습니다.',
  refs:[['AWS Builders Library · 캐시 의존성','https://aws.amazon.com/builders-library/caching-challenges-and-strategies/']]
 },
 transaction:{
  title:'낙관적 갱신 · 같은 재고를 읽은 두 주문',path:'database/optimistic-vs-pessimistic',
  definition:'낙관적 동시성 제어는 읽은 뒤 갱신할 때 버전 등의 조건을 검사해 중간 변경을 발견하는 방식입니다. 비관적 제어는 필요한 구간에 잠금을 획득해 경쟁을 제한합니다. 둘 다 충돌·대기·실패 처리 비용을 가집니다.',
  why:'두 직원이 동시에 “재고 1”을 읽고 판매 후 0을 쓰면 두 건을 팔았는데 장부는 한 건만 줄어듭니다. 이전 값을 믿고 덮어쓰는 대신 “내가 읽은 버전이 그대로인가”를 갱신과 함께 검사하면 오래된 계산을 발견할 수 있습니다.',
  scene:'수정 충돌이 드문 상품 설명에는 버전 검사가 유용할 수 있고 한정 판매 재고에는 조건부 차감이 단순할 수 있습니다. 사용자의 문서 수정을 무조건 자동 재시도하면 다른 사람의 수정을 덮을 수 있으므로 충돌을 알리거나 병합하는 정책이 필요합니다.',
  steps:['두 주문이 재고와 버전 0을 읽었다고 가정합니다.','첫 주문이 WHERE version = 0 AND qty > 0 조건으로 차감하며 버전을 1로 바꿉니다.','두 번째 주문의 같은 조건은 맞지 않아 영향받은 행이 0개입니다.','최신 상태를 다시 읽고 재고 부족인지 충돌인지 판단합니다. 안전한 경우에만 횟수와 총 시간에 제한을 두고 재시도합니다.'],
  mistake:'낙관적 제어도 UPDATE 시 DB 잠금이 생길 수 있습니다. 비관적 잠금에도 데드락과 타임아웃이 있습니다. 영향받은 행이 0개인 것만으로 항상 버전 충돌이라고 단정하지 말고 행 부재·재고 조건도 살펴야 합니다.',
  question:'재고 하나를 두 요청이 동시에 주문하면 어떤 방법으로 초과 판매를 막겠습니까?',
  answer:'업무에 맞는 DB 트랜잭션 안에서 조건부 UPDATE나 행 잠금을 검토합니다. 차감 성공 여부를 영향받은 행 수로 확인하고 주문 생성도 같은 업무 경계에서 처리합니다. 외부 결제는 로컬 DB 롤백만으로 되돌아가지 않으므로 멱등 요청과 상태 확인·보상 절차를 별도로 둡니다.',
  code:`import sqlite3
db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE stock (id INTEGER PRIMARY KEY, qty INTEGER, version INTEGER)")
db.execute("INSERT INTO stock VALUES (1, 1, 0)")
def buy(expected_version):
    with db:
        cursor = db.execute(
            "UPDATE stock SET qty = qty - 1, version = version + 1 "
            "WHERE id = ? AND version = ? AND qty > 0", (1, expected_version))
        return cursor.rowcount == 1
first, second = buy(0), buy(0)
state = db.execute("SELECT qty, version FROM stock").fetchone()
assert (first, second, state) == (True, False, (0, 1))
print(first, second, state)`,
  output:'True False (0, 1)',note:'두 요청이 같은 과거 버전을 가진 상황을 순서대로 재현합니다. 실제 동시 DB 부하 실험은 아닙니다. SQLite의 잠금 방식은 PostgreSQL·MySQL의 행 잠금과 같지 않으며 이 예제로 SELECT FOR UPDATE를 검증하지 않습니다.',
  refs:[['PostgreSQL · 잠금과 데드락','https://www.postgresql.org/docs/current/explicit-locking.html'],['Python · sqlite3','https://docs.python.org/3/library/sqlite3.html']]
 },
 rest:{
  title:'멱등 키 · 결제 응답을 못 받으면 다시 결제할까?',path:'api-design/idempotency-and-retry',
  definition:'멱등성은 같은 요청을 반복했을 때 의도한 서버 효과가 한 번 수행했을 때와 같다는 성질입니다. 응답 코드나 로그까지 매번 같아야 한다는 뜻은 아닙니다. 멱등 키는 하나의 업무 시도를 식별해 중복 처리를 제어하는 키입니다.',
  why:'택배 접수는 완료됐지만 접수증 전달에 실패할 수 있습니다. 접수증이 없다고 새 접수 번호로 다시 신청하면 두 건이 됩니다. 네트워크 타임아웃도 업무 실패를 확정하지 못하므로 같은 시도를 알아볼 식별자와 상태 조회가 필요합니다.',
  scene:'결제 버튼 한 번에 주문 시도 키를 정하고 통신 재시도에는 같은 키를 유지합니다. 서버는 공유 저장소의 고유 제약 등으로 중복을 원자적으로 판정하고 요청 내용도 비교합니다. 같은 키에 다른 금액이 오면 기존 결과를 무조건 돌려주지 않습니다.',
  steps:['요청의 키·사용자·작업 종류·내용을 확인합니다.','새 키를 고유 제약으로 등록하고 업무 결과와 일관된 상태를 저장합니다.','중복 요청이면 진행 중·완료·실패 상태에 맞게 처리합니다.','외부 결제 업체에도 지원되는 멱등 키를 전달하고 불확실한 결과는 조회로 확인합니다. 키 보관 기간과 재시도 예산도 정합니다.'],
  mistake:'딕셔너리에 키가 있는지 보고 나중에 넣는 코드는 여러 서버의 동시 요청을 보호하지 못합니다. 로컬 DB 트랜잭션으로 외부 PG 호출까지 원자적으로 만들 수도 없습니다. PUT이라는 메서드 이름만으로 잘못 작성한 핸들러가 안전해지지 않습니다.',
  question:'타임아웃 뒤 같은 결제를 재시도할 때 키를 새로 만들면 어떤 문제가 생기나요?',
  answer:'서버가 새로운 업무 시도로 판단해 중복 결제가 가능해집니다. 같은 시도에는 같은 키를 사용하고, 내용이 다르면 오류를 처리합니다. 불확실한 외부 결과는 상태를 조회합니다. 재시도는 가능한 오류에만 횟수·총 시간·백오프·지터를 정하고 여러 계층에서 증폭되지 않게 합니다.',
  code:`# 외부 결제 없이 로컬 포인트 차감의 중복을 막는 모형입니다.
import sqlite3
db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE wallet (id INTEGER PRIMARY KEY, balance INTEGER)")
db.execute("CREATE TABLE requests (key TEXT PRIMARY KEY, amount INTEGER, result INTEGER)")
db.execute("INSERT INTO wallet VALUES (1, 100)")
db.commit()
def spend(key, amount):
    if amount <= 0:
        raise ValueError("금액은 양수여야 합니다")
    with db:
        try:
            db.execute("INSERT INTO requests VALUES (?, ?, NULL)", (key, amount))
        except sqlite3.IntegrityError:
            old_amount, result = db.execute(
                "SELECT amount, result FROM requests WHERE key = ?", (key,)).fetchone()
            if old_amount != amount:
                raise ValueError("같은 키에 다른 금액")
            return result
        changed = db.execute(
            "UPDATE wallet SET balance = balance - ? WHERE id = 1 AND balance >= ?",
            (amount, amount)).rowcount
        if changed != 1:
            raise ValueError("잔액 부족")
        result = db.execute("SELECT balance FROM wallet WHERE id = 1").fetchone()[0]
        db.execute("UPDATE requests SET result = ? WHERE key = ?", (result, key))
        return result
assert spend("order-1", 30) == spend("order-1", 30) == 70
try:
    spend("order-1", 40)
except ValueError:
    print("다른 금액 거절")
assert db.execute("SELECT balance FROM wallet").fetchone()[0] == 70
print("남은 포인트:", 70)`,
  output:'다른 금액 거절\n남은 포인트: 70',note:'단일 사용자·로컬 DB 모형입니다. 외부 결제, 처리 중 응답, 다중 서버 장애를 구현하지 않습니다. 운영 키는 사용자·업무 범위에 묶고 금액 외의 요청 내용도 검사해야 합니다.',
  refs:[['AWS · 멱등 API와 재시도','https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/']]
 }
};
export const deepeningSource={name:'anjeongkyun/backend-interview-questions',url:'https://github.com/anjeongkyun/backend-interview-questions',license:'https://creativecommons.org/licenses/by-sa/4.0/deed.ko'};
