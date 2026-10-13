import type {Deepening} from './practical-deepening';
// Topic discovery only: no repository paragraphs, images or examples copied.
// Explanations and runnable Python demonstrations independently authored here.
export const backtonySource={name:'backtony/Backend_Interview_for_Beginner',url:'https://github.com/backtony/Backend_Interview_for_Beginner'};
export const backtonyDeepening:Record<string,Deepening>={
 vpc:{
  title:'CIDR와 서브넷 · 주소를 왜 구역으로 나눌까?',path:'Network.md',
  definition:'CIDR은 주소와 접두사 길이로 IP 주소 범위를 나타내는 방식입니다. IPv4의 /24는 앞 24비트를 네트워크 접두사로 사용하므로 나머지 8비트에 해당하는 총 256개 주소를 포함합니다. 서브넷은 큰 주소 범위를 더 작은 네트워크 범위로 나눈 것입니다.',
  why:'도시 전체의 주소를 한 구역으로 관리하기보다 동네별 범위를 정하면 경로와 정책을 구분하기 쉽습니다. 과거 고정된 주소 클래스보다 접두사 길이로 크기를 조절하는 방식이 주소 배분과 경로 집계에 유연합니다. 숫자에 점이 찍힌 위치와 네트워크 경계가 항상 일치하지 않으므로 /26 같은 길이도 이해해야 합니다.',
  scene:'10.0.0.0/24를 네 개의 /26으로 나누면 각 범위에 64개 주소가 있습니다. 프런트 서버·애플리케이션·DB의 배치를 나눌 수 있지만 서브넷을 나눴다는 사실만으로 접근이 차단되지는 않습니다. Route Table과 보안 그룹·ACG 등의 허용 규칙이 실제 통신 경계를 만듭니다.',
  steps:['IPv4의 전체 32비트에서 접두사 길이를 빼 주소 개수를 계산합니다.','네 구역을 만들려면 구역 구분에 두 비트를 더 써 /24를 /26으로 나눕니다.','서로 다른 범위가 겹치지 않는지 확인합니다. VPC 연결이나 VPN에서 중복 대역은 문제가 될 수 있습니다.','라우팅·접근 정책과 클라우드 예약 주소를 확인한 뒤 서버에 쓸 수 있는 주소 수를 계획합니다.'],
  mistake:'Python hosts()의 결과는 AWS·Ncloud에서 할당 가능한 주소 목록이 아닙니다. 일반 /26 IPv4 hosts()는 62개를 보여주지만 AWS의 일반 IPv4 서브넷은 첫 네 주소와 마지막 주소를 예약하므로 /26의 할당 가능 주소는 59개입니다. Ncloud는 해당 상품의 예약 정책을 따로 확인하세요. /31·/32에는 일반적인 두 주소 제외 규칙을 그대로 적용하지 않습니다.',
  question:'10.0.0.0/24를 네 서브넷으로 나누면 각 접두사와 총 주소 수는 어떻게 되나요?',
  answer:'두 비트를 더 구역 구분에 사용해 /26이 됩니다. 각 범위는 2의 6승인 64개 주소이며 시작 주소는 .0, .64, .128, .192입니다. 총 주소 수와 실제 서버 할당 가능 수는 구별하고 클라우드의 예약 정책과 경로·보안 정책을 함께 확인합니다.',
  code:`from ipaddress import ip_network, ip_address
network = ip_network("10.0.0.0/24")
parts = list(network.subnets(new_prefix=26))
assert len(parts) == 4 and all(p.num_addresses == 64 for p in parts)
assert ip_address("10.0.0.70") in parts[1]
assert not parts[0].overlaps(parts[1])
for part in parts:
    print(part, "전체", part.num_addresses, "일반 hosts", len(list(part.hosts())))
print("10.0.0.70 소속:", parts[1])`,
  output:'10.0.0.0/26 전체 64 일반 hosts 62\n10.0.0.64/26 전체 64 일반 hosts 62\n10.0.0.128/26 전체 64 일반 hosts 62\n10.0.0.192/26 전체 64 일반 hosts 62\n10.0.0.70 소속: 10.0.0.64/26',
  note:'주소 계산만 수행합니다. 실제 VPC나 PC 네트워크 설정은 바꾸지 않습니다. 일반 hosts 결과와 클라우드의 할당 가능 주소를 혼동하지 마세요.',
  refs:[['Python · ipaddress','https://docs.python.org/3/library/ipaddress.html'],['AWS · Subnet CIDR와 예약 주소','https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html']]
 },
 join:{
  title:'N+1 조회 · 주문 세 건을 읽는데 왜 네 번 왕복할까?',path:'Spring%20%26%20JPA.md',
  definition:'N+1은 목록을 읽는 한 번의 조회 뒤 각 항목의 연관 데이터를 개별 조회하여 N번의 추가 왕복이 생기는 패턴입니다. ORM의 지연 로딩에서 잘 나타나지만 직접 작성한 반복 조회나 외부 API 호출에서도 같은 문제가 생길 수 있습니다.',
  why:'택배 기사에게 전체 주문 목록을 한 번 받고, 각 주문의 주소를 한 건씩 다시 물으면 주문이 늘수록 왕복이 늘어납니다. 단일 조회가 빨라도 네트워크 대기와 DB 연결 사용 시간이 누적될 수 있으므로 필요한 데이터를 묶어 가져오는 설계를 검토합니다.',
  scene:'주문 세 건의 고객 이름을 표시할 때 주문 조회 1회와 고객 조회 3회를 수행하는 코드를 JOIN 한 번으로 바꿔 봅니다. 여기서는 주문마다 고객 한 명이므로 결과 행 수가 그대로입니다. 주문과 주문 항목처럼 일대다를 조인하면 주문 행이 늘 수 있어 페이지 크기와 중복 처리를 다시 설계해야 합니다.',
  steps:['요청 한 건 동안 실행되는 쿼리 수와 반복 패턴을 로그·트레이스로 확인합니다.','화면에 필요한 열과 연관 관계를 정합니다.','JOIN 또는 부모 ID들을 모은 배치 조회를 비교합니다.','쿼리 수뿐 아니라 반환 행 수·전송량·메모리·실행 계획도 비교합니다.'],
  mistake:'N+1은 지연 로딩에서만 생기는 문제가 아닙니다. 모든 관계를 무조건 즉시 조회하거나 거대한 JOIN 하나로 합치는 것도 답이 아닙니다. 쿼리 수를 줄여도 결과가 폭증할 수 있습니다. 배치 IN 조회는 입력이 없을 때와 바인딩 개수 제한을 처리해야 합니다.',
  question:'고객 목록 페이지의 N+1을 JOIN으로 해결했더니 페이징 결과가 틀어졌습니다. 왜일까요?',
  answer:'일대다 조인에서 부모 한 행이 자식 수만큼 늘어나 LIMIT이 부모 개수가 아닌 조인 결과 행에 적용됐는지 확인합니다. 부모 페이지를 먼저 정한 뒤 해당 ID들의 자식을 배치 조회하는 방법 등을 비교합니다. 예상 쿼리 수와 행 수를 함께 검증합니다.',
  code:`import sqlite3
db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE customers(id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders(id INTEGER PRIMARY KEY, customer_id INTEGER);
INSERT INTO customers VALUES (1, '민수'), (2, '지연');
INSERT INTO orders VALUES (10, 1), (11, 1), (12, 2);
""")
queries = []
db.set_trace_callback(lambda sql: queries.append(sql) if sql.lstrip().upper().startswith("SELECT") else None)
orders = db.execute("SELECT id, customer_id FROM orders ORDER BY id").fetchall()
slow = [(oid, db.execute("SELECT name FROM customers WHERE id = ?", (cid,)).fetchone()[0])
        for oid, cid in orders]
slow_count = len(queries)
queries.clear()
fast = db.execute("SELECT o.id, c.name FROM orders o JOIN customers c "
                  "ON c.id = o.customer_id ORDER BY o.id").fetchall()
assert slow == fast == [(10, '민수'), (11, '민수'), (12, '지연')]
assert slow_count == 4 and len(queries) == 1
print("동일한 결과:", slow == fast)
print("조회 횟수:", slow_count, "->", len(queries))`,
  output:'동일한 결과: True\n조회 횟수: 4 -> 1',note:'SQLite를 Python에서 직접 호출해 ORM 없이도 N+1이 생김을 확인합니다. 실행 시간 비교 대신 동일한 결과와 실제 SELECT 호출 수를 검증합니다.',
  refs:[['Python · sqlite3 trace callback','https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.set_trace_callback'],['PostgreSQL · JOIN','https://www.postgresql.org/docs/current/tutorial-join.html']]
 },
 index:{
  title:'커버링 인덱스 · 검색 뒤 본문을 다시 읽는 비용',path:'Database.md',
  definition:'커버링 인덱스는 특정 쿼리의 조건과 반환에 필요한 정보를 인덱스가 포함하는 관계를 말합니다. 모든 쿼리에 대해 커버링인 인덱스가 따로 정해져 있는 것은 아닙니다. 쿼리와 DB 구현에 따라 인덱스만으로 읽기를 마칠 수 있는지가 달라집니다.',
  why:'도서 목록에 제목뿐 아니라 필요한 저자 정보까지 있으면 책을 하나씩 꺼내지 않고 답할 수 있습니다. 다만 목록에 모든 본문을 넣으면 목록 자체가 커지고 갱신 비용도 늘어납니다. 필요한 열만 담는 설계가 읽기 이득과 쓰기 부담 사이의 선택입니다.',
  scene:'회원 상태로 이름만 조회할 때 (status, name) 인덱스는 SQLite에서 필요한 열을 포함합니다. 여기에 인덱스에 없는 email까지 요청하면 테이블 데이터를 읽을 필요가 생깁니다. 실제 실행 계획을 두 쿼리에서 비교합니다.',
  steps:['WHERE·JOIN·ORDER BY와 SELECT 열을 확인합니다.','조건에 맞는 인덱스 열 순서와 필요한 반환 열을 설계합니다.','EXPLAIN QUERY PLAN이나 해당 DB의 EXPLAIN으로 접근 경로를 확인합니다.','추가된 인덱스 크기와 INSERT·UPDATE 비용도 측정합니다.'],
  mistake:'필요한 열이 인덱스에 있다고 모든 DB에서 테이블 접근이 항상 없어지는 것은 아닙니다. PostgreSQL의 index-only scan도 MVCC 가시성 확인 때문에 heap fetch가 필요할 수 있습니다. 또한 복합 인덱스의 앞 열이 없는 조건을 항상 전혀 활용할 수 없다고 단정하지 말고 DB 버전과 실제 계획을 확인하세요.',
  question:'인덱스가 모든 반환 열을 포함했는데 PostgreSQL에서 Heap Fetches가 보이면 왜일까요?',
  answer:'인덱스의 열 포함 여부와 행의 가시성 확인은 다른 문제입니다. visibility map이 해당 페이지의 가시성을 보장하지 못하면 힙을 읽을 수 있습니다. 테이블 갱신 빈도와 VACUUM 상태, 실행 계획을 확인하고 무조건 인덱스 열을 더 추가하지 않습니다.',
  code:`import sqlite3
db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE users(id INTEGER PRIMARY KEY, status TEXT, name TEXT, email TEXT)")
db.executemany("INSERT INTO users VALUES (?, ?, ?, ?)",
               [(i, 'active', f'user{i}', f'{i}@example.test') for i in range(10)])
db.execute("CREATE INDEX idx_status_name ON users(status, name)")
def plan(sql):
    return ' | '.join(row[3] for row in db.execute("EXPLAIN QUERY PLAN " + sql, ('active',)))
covered = plan("SELECT name FROM users WHERE status = ?")
not_covered = plan("SELECT name, email FROM users WHERE status = ?")
assert 'COVERING INDEX' in covered.upper()
assert 'COVERING INDEX' not in not_covered.upper()
print("name만: 커버링", 'COVERING INDEX' in covered.upper())
print("email 추가: 커버링", 'COVERING INDEX' in not_covered.upper())`,
  output:'name만: 커버링 True\nemail 추가: 커버링 False',note:'SQLite의 실행 계획을 검사하는 예제입니다. 계획 문구는 버전에 따라 달라질 수 있으며 PostgreSQL의 visibility map을 구현하지 않습니다. 몇 배 빠르다는 결론을 이 작은 데이터로 내리지 마세요.',
  refs:[['SQLite · 커버링 인덱스','https://www.sqlite.org/queryplanner.html'],['PostgreSQL · Index-only scans','https://www.postgresql.org/docs/current/indexes-index-only-scans.html']]
 },
 queue:{
  title:'Kafka 파티션과 오프셋 · 배송 목록을 나눠 읽기',path:'Kafka.md',
  definition:'Kafka의 토픽은 레코드를 모으는 논리적 이름이고 파티션은 그 토픽의 로그를 나누는 단위입니다. 오프셋은 파티션 안에서 레코드의 위치입니다. 컨슈머 그룹은 각 파티션을 그룹 내 소비자에게 배정해 작업을 나눕니다.',
  why:'배송 목록 한 권을 순서대로 읽으면 담당자가 하나라 병목이 생길 수 있습니다. 목록을 구역별로 나누고 각 구역의 다음 읽을 위치를 기록하면 병렬 처리와 재시작이 쉬워집니다. 대신 구역 사이 전체 순서를 하나로 보장하는 것은 어려워집니다.',
  scene:'같은 그룹에 소비자를 늘려도 파티션 수보다 많은 소비자는 일반적인 배정 방식에서 일할 파티션이 없을 수 있습니다. 특정 주문 키가 한 파티션에 몰리면 전체 평균 처리량이 좋아도 그 파티션의 랙이 커집니다. 생산 속도·처리 시간·키 분포를 파티션별로 봅니다.',
  steps:['주문 키와 파티셔너 규칙에 따라 레코드를 파티션에 배치합니다.','그룹이 각 파티션을 소비자에게 배정합니다.','소비자는 레코드를 받아 업무를 처리합니다.','완료된 범위에 맞춰 다음 읽을 오프셋을 커밋합니다. 재시작 시 커밋된 위치부터 다시 읽을 수 있으므로 업무 중복을 대비합니다.'],
  mistake:'파티션 안의 로그 순서와 비동기 업무의 완료 순서는 같지 않을 수 있습니다. 앞선 작업이 끝나지 않았는데 뒤 작업의 오프셋까지 커밋하면 재시작 후 미완료 작업을 건너뛸 수 있습니다. 업무 성공 직후 커밋 전에 죽으면 중복 처리 가능성도 있습니다. Kafka의 exactly-once 기능이 외부 DB·이메일까지 자동으로 한 번만 수행해 주지는 않습니다.',
  question:'업무 처리는 성공했지만 오프셋 커밋 전에 서버가 죽으면 어떻게 되나요?',
  answer:'재시작 후 같은 레코드를 다시 처리할 수 있습니다. 이벤트 ID의 고유 제약 등으로 업무 효과를 멱등하게 만들고 그 기록과 DB 변경을 같은 트랜잭션 경계에서 관리합니다. 병렬 처리에서는 완료된 연속 범위까지만 커밋하며 외부 호출의 중복도 별도로 처리합니다.',
  code:`# Kafka 없이 오프셋 커밋 전 장애를 재현하는 모형입니다.
events = [(0, 'order-A'), (1, 'order-B')]
committed = 0  # 다음에 읽을 위치
handled = set()
sent = []
def handle(event_id):
    if event_id not in handled:
        handled.add(event_id)
        sent.append(event_id)
handle(events[0][1])  # 업무 성공 뒤 커밋 전에 장애 발생
for offset, event_id in events[committed:]:
    handle(event_id)
    committed = offset + 1
assert sent == ['order-A', 'order-B'] and committed == 2
print("업무 결과:", sent)
print("다음 위치:", committed)`,
  output:"업무 결과: ['order-A', 'order-B']\n다음 위치: 2",note:'handled를 유지한 것은 내구성 있는 공유 DB를 가정한 모형입니다. 실제 프로세스의 set은 재시작하면 사라집니다. Kafka 접속·리밸런싱·원자적 DB 처리를 구현하지 않습니다. 파티션 수가 바뀌면 키 배치와 순서 정책도 다시 검토해야 합니다.',
  refs:[['Apache Kafka · Consumer와 offset','https://kafka.apache.org/41/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html']]
 },
 scale:{
  title:'복제와 샤딩 · 같은 장부를 복사할까, 나눌까?',path:'Database.md',
  definition:'복제는 같은 데이터의 복사본을 여러 노드에 유지하는 방식이고 샤딩은 데이터 일부를 서로 다른 저장소에 분배하는 방식입니다. 복제는 읽기 분산과 장애 대응 등에, 샤딩은 데이터와 작업의 분산에 활용할 수 있습니다. 두 방식은 함께 사용할 수도 있습니다.',
  why:'장부를 복사하면 여러 직원이 조회할 수 있지만 원본 변경이 복사본에 도착하는 시간을 고려해야 합니다. 장부를 고객 구역별로 나누면 저장과 갱신을 분산할 수 있지만 모든 구역의 합계를 내거나 고객을 이동시킬 때 더 복잡해집니다.',
  scene:'사용자가 프로필을 바꾸자마자 비동기 읽기 복제본에서 조회하면 이전 이름이 잠시 보일 수 있습니다. 변경 직후 원본 읽기나 버전 기반 정책을 검토합니다. 고객 ID % 2로 샤드를 나눴다가 % 3으로 바꾸면 기존 고객의 위치가 많이 달라져 데이터 이동 계획이 필요합니다.',
  steps:['느린 이유가 읽기 부하, 쓰기 부하, 저장량, 특정 키의 집중 중 무엇인지 측정합니다.','읽기 복제 시 지연과 변경 직후 읽기 요구를 정합니다.','샤딩 시 조회 경로·트랜잭션 경계·키 분포를 기준으로 샤드 키를 고릅니다.','노드 추가·장애 전환·재분배·백업 복구 절차까지 검토합니다.'],
  mistake:'읽기 복제본이 생겼다고 쓰기 부하가 자동 분산되지는 않습니다. 해시 분배도 특정 인기 고객의 부하를 항상 고르게 만들지는 않습니다. 범위 샤딩도 데이터 증가나 핫스팟 때문에 분할·이동이 필요할 수 있습니다. 복제는 삭제 오류까지 복제할 수 있으므로 백업을 대체하지 않습니다.',
  question:'프로필을 변경한 뒤 이름이 잠깐 이전 값으로 돌아왔다면 어떤 경로를 확인할까요?',
  answer:'쓰기 대상과 읽기 대상, 캐시 여부, 복제 지연을 확인합니다. 변경 직후 강한 신선도가 필요한 읽기는 원본으로 보내거나 필요한 버전이 복제됐는지 확인하는 정책을 검토합니다. 모든 읽기를 원본에 보내는 비용과 복제 지연을 허용할 업무도 함께 구분합니다.',
  code:`primary = {'name': '민수', 'version': 1}
replica = primary.copy()
primary.update(name='지연', version=2)
assert replica['name'] == '민수' and primary['name'] == '지연'
print('변경 직후 복사본:', replica['name'])
replica = primary.copy()  # 복제 적용을 흉내 냅니다.
print('복제 적용 후:', replica['name'])
ids = list(range(6))
moved = [customer for customer in ids if customer % 2 != customer % 3]
assert moved == [2, 3, 4, 5]
print('2개 -> 3개 샤드에서 위치 변경:', moved)`,
  output:'변경 직후 복사본: 민수\n복제 적용 후: 지연\n2개 -> 3개 샤드에서 위치 변경: [2, 3, 4, 5]',note:'dict 복사와 정수 나머지로 설계 효과만 보여 줍니다. 실제 복제 프로토콜·일관된 해싱·장애 전환을 구현하지 않습니다. AWS RDS 읽기 복제본과 Multi-AZ의 구체적인 역할도 상품 구성별로 확인하세요.',
  refs:[['AWS RDS · Read Replicas','https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html']]
 },
 kit:{
  title:'서버 계층과 의존성 주입 · 일을 왜 나눠 맡길까?',path:'Spring%20%26%20JPA.md',
  definition:'서버 계층 분리는 요청 해석, 업무 규칙, 저장소 접근 같은 책임을 구분하는 설계입니다. 의존성 주입(DI)은 필요한 협력 객체나 함수를 사용하는 쪽 내부에서 고정 생성하지 않고 외부에서 전달하는 방식입니다. 특정 언어나 프레임워크 전용 개념은 아닙니다.',
  why:'주문 접수 직원이 결제 규칙과 창고 장부의 저장 방식까지 모두 알아야 한다면 창고를 바꿀 때 접수 방식도 고쳐야 합니다. 주문 규칙은 유지하고 장부 담당자를 교체할 수 있게 역할을 나누면 변경 이유와 확인 범위가 분명해집니다.',
  scene:'HTTP를 해석하는 핸들러가 입력을 확인하고, 서비스가 판매 수량 규칙을 검사하며, 저장소가 재고를 차감하게 합니다. 서비스에 저장소를 전달하면 테스트에서 작은 메모리 저장소를 쓰고 운영에서는 DB 저장소를 연결할 수 있습니다. 파일 이름을 나누는 것보다 실제 책임과 의존 방향이 중요합니다.',
  steps:['핸들러에서 입력 형식과 인증 주체를 읽습니다.','서비스가 업무 권한·수량·주문 규칙을 검사합니다.','저장소가 적절한 트랜잭션과 조건부 갱신으로 데이터를 처리합니다.','핸들러가 내부 객체 전체 대신 필요한 결과만 응답합니다.'],
  mistake:'DI를 쓰면 의존성이 없어지는 것이 아니라 연결 방식을 바꾸는 것입니다. Python의 underscore 필드나 클래스 분리도 보안 경계를 만들지 않습니다. 인증만 핸들러에 두고 다른 호출 경로의 업무 권한 검사를 놓치지 마세요. 작은 프로그램에 계층과 추상화를 과도하게 늘리면 추적 비용이 커질 수 있습니다.',
  question:'DB 저장 방식이 바뀌었을 때 주문 규칙 코드를 적게 바꾸려면 어떻게 할까요?',
  answer:'업무 코드가 요구하는 저장소의 작은 동작 계약을 정하고 구현을 외부에서 전달합니다. DB 고유 SQL과 연결 관리는 저장소 쪽으로 모읍니다. 동시에 트랜잭션 범위와 실패 시 응답을 명확히 하며 무조건 클래스를 더 만드는 방식으로 해결하지 않습니다.',
  code:`class MemoryStock:
    def __init__(self, count):
        self.count = count
    def reserve(self, quantity):
        if self.count < quantity:
            return False
        self.count -= quantity
        return True
class OrderService:
    def __init__(self, stock):
        self.stock = stock  # 협력 객체를 외부에서 받습니다.
    def order(self, quantity):
        if type(quantity) is not int or quantity <= 0:
            raise ValueError('양의 정수 수량이 필요합니다')
        return {'accepted': self.stock.reserve(quantity)}
stock = MemoryStock(1)
service = OrderService(stock)
assert service.order(1) == {'accepted': True}
assert service.order(1) == {'accepted': False}
try:
    service.order(True)  # bool도 int의 하위 타입이므로 따로 주의
except ValueError:
    print('잘못된 수량 거절')
assert stock.count == 0
print('남은 재고:', stock.count)`,
  output:'잘못된 수량 거절\n남은 재고: 0',note:'HTTP 처리·인증·동시성은 제외한 단일 실행 모형입니다. MemoryStock의 읽기 후 쓰기는 운영의 동시 요청을 보호하지 않습니다. 실제 저장소는 조건부 갱신·잠금 등과 트랜잭션 경계를 구현해야 합니다.',
  refs:[['Python · 클래스와 객체','https://docs.python.org/3/tutorial/classes.html']]
 }
};
