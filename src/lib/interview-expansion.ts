import type { Lesson } from './lessons';

// Question topics checked against ksundong/backend-interview-question.
// All prompts, explanations and code below were written for this learning site.
export const focusedQuestions: Record<string, { question: string; intent: string; outline: string[] }> = {
 deadlock: {question:'동시에 반대 방향으로 송금하면 교착 상태가 생길 수 있나요? 어떻게 줄일 건가요?',intent:'순환 대기를 실제 트랜잭션으로 설명하고 재시도 경계를 판단합니다.',outline:['네 가지 발생 조건','반대 잠금 순서의 예','일관된 순서와 짧은 트랜잭션','중단 후 전체 재시도와 부수 효과']},
 normalization: {question:'정규화는 어떤 오류를 줄이나요? 주문 당시 가격까지 분리해야 하나요?',intent:'중복 제거와 역사적 기록을 구별합니다.',outline:['함수적 종속','삽입·수정·삭제 이상','현재 값과 당시 스냅샷','반정규화의 갱신 비용']},
 join: {question:'미주문 고객을 남기는 JOIN을 작성하고 ON과 WHERE의 차이를 설명해 보세요.',intent:'행 수·NULL·필터 위치를 실제 결과로 설명합니다.',outline:['INNER와 LEFT','일대다로 늘어나는 행','NULL과 IS NULL','오른쪽 필터의 위치']},
 'database-choice': {question:'새 주문 서비스에서 관계형 DB와 NoSQL을 어떤 기준으로 선택할 건가요?',intent:'제품 이름 대신 데이터와 업무 요구를 비교합니다.',outline:['대표 액세스 패턴','트랜잭션·제약·일관성','확장·비용·운영 경험','원본과 복사본의 경계']},
 dns: {question:'주소창에 도메인을 입력한 뒤 화면이 보일 때까지 어떤 일이 일어나나요?',intent:'용어를 실제 요청의 순서로 연결할 수 있는지 확인합니다.',outline:['캐시와 DNS로 주소 찾기','연결과 TLS 협상','HTTP 요청·응답과 렌더링','기존 연결·캐시·HTTP/3에 따른 차이']},
 tcp: {question:'TCP와 UDP를 어떻게 선택하고, TCP의 연결 수립과 종료는 어떻게 다른가요?',intent:'신뢰성·지연·연결 상태를 서비스 요구와 연결합니다.',outline:['바이트 스트림과 데이터그램','SYN → SYN/ACK → ACK','양방향 종료와 TIME_WAIT','UDP 위의 QUIC도 신뢰성을 구현할 수 있음']},
 http: {question:'HTTPS가 보장하는 것은 무엇이며 인증서는 어떤 역할을 하나요?',intent:'암호화와 서버 신원 확인을 구분합니다.',outline:['HTTP와 TLS의 관계','인증서 체인·호스트명 검증','키 합의 후 대칭키로 통신','업무 권한은 서버에서 별도로 검사']},
 process: {question:'프로세스와 스레드는 무엇을 공유하며 공유 상태에는 어떤 문제가 생기나요?',intent:'격리·공유·동기화의 비용을 설명합니다.',outline:['프로세스 주소 공간','스레드별 스택과 공유 힙','경쟁 상태와 동기화','성능은 작업과 구현에 따라 측정']},
 async: {question:'동기·비동기와 블로킹·논블로킹은 같은 구분인가요?',intent:'완료 통지 방식과 호출자의 대기를 구분합니다.',outline:['결과를 받는 방식','호출이 반환될 때까지 대기하는지','이벤트 루프와 I/O','CPU 작업은 await만 붙여도 빨라지지 않음']},
 index: {question:'인덱스가 있는데도 조회가 느릴 수 있나요? 많이 만들면 항상 유리한가요?',intent:'검색 구조와 쓰기 비용을 실행 계획으로 설명합니다.',outline:['찾을 범위 줄이기','선택도·복합 인덱스 순서','EXPLAIN으로 확인','쓰기·저장 공간·유지 비용']},
 transaction: {question:'ACID와 격리 수준을 설명하고, 재고 한 개를 동시에 주문하면 어떻게 처리할 건가요?',intent:'정의를 실제 동시성 오류를 막는 설계로 연결합니다.',outline:['원자성·일관성·격리성·내구성','격리 수준별 관찰 차이','조건부 UPDATE 또는 잠금','충돌 시 트랜잭션 전체 재시도']},
 cache: {question:'캐시를 사용하면 어떤 문제가 생기고 DB 변경과 캐시 갱신은 어떻게 맞추나요?',intent:'조회 속도의 대가인 데이터 신선도와 장애 경로를 설명합니다.',outline:['원본과 복사본','cache-aside와 TTL','무효화·동시 갱신 경쟁','캐시 장애 시 원본 보호']},
 session: {question:'쿠키·세션·JWT의 관계를 설명하고 로그아웃은 어떻게 구현하나요?',intent:'저장 수단·서버 상태·토큰 형식을 분리합니다.',outline:['쿠키는 전송·저장 수단','세션 ID와 서버 상태','서명 JWT의 본문은 비밀이 아님','만료·철회·쿠키 제거·권한 확인']},
 cors: {question:'CORS 오류는 왜 브라우저에서 생기며 OPTIONS 요청은 무엇을 확인하나요?',intent:'브라우저 읽기 정책과 서버 인증을 구분합니다.',outline:['scheme·host·port로 origin 구분','preflight가 필요한 조건','허용 origin·메서드·헤더','인증과 CSRF 방어는 별도']},
 rest: {question:'GET·POST·PUT·PATCH를 어떻게 구분하며 멱등성은 재시도와 어떤 관계가 있나요?',intent:'메서드 의미와 중복 요청의 업무 결과를 연결합니다.',outline:['자원과 HTTP 메서드','안전성과 멱등성','응답과 작업 효과는 다를 수 있음','주문 생성의 멱등 키']},
 memory: {question:'가상 메모리는 무엇이며 RAM을 늘려도 OOM이 생길 수 있나요?',intent:'주소 공간·실제 사용량·프로세스 제한을 구분합니다.',outline:['가상 주소와 물리 페이지','페이지 폴트와 매핑','컨테이너 제한·힙 제한·누수','swap은 무한한 RAM이 아님']}
};

type Draft = Omit<Lesson, 'minutes' | 'codeNotes'>;
const drafts: Draft[] = [
{
 id:'deadlock',category:1,title:'교착 상태와 잠금 순서',english:'Deadlock / Starvation',hook:'두 사람이 서로 가진 열쇠만 기다리면 누가 먼저 움직일까?',
 definition:'교착 상태는 여러 작업이 서로가 가진 자원을 기다려 더 진행하지 못하는 상태입니다. 고전적인 자원 모델의 발생 조건은 상호 배제, 점유 대기, 비선점, 순환 대기입니다. 기아 상태는 다른 작업은 진행하지만 특정 작업이 자원을 얻지 못하는 상황입니다. 잠금이 있다는 사실만으로 교착 상태인 것은 아닙니다.',
 analogy:'지수는 프린터를 잡고 스캐너를 기다리고, 민수는 스캐너를 잡고 프린터를 기다립니다. 둘 다 지금 가진 장비를 놓지 않아 업무가 멈춥니다. 모두 프린터부터 예약하면 원형 대기가 끊깁니다. 반대로 새치기가 계속되어 한 사람만 차례를 못 받는 것은 기아입니다.',
 steps:['A가 계좌 1을, B가 계좌 2를 잠급니다.','A가 계좌 2를, B가 계좌 1을 기다리면 대기 관계가 원을 만듭니다.','DB가 교착 상태를 감지하면 한 트랜잭션을 중단시켜 다른 작업이 진행하게 합니다.','모든 경로에서 잠금 순서를 통일하고 중단된 트랜잭션 전체를 제한적으로 재시도합니다.'],
 scenario:'A→B 송금과 B→A 송금이 동시에 일어납니다. 송금 방향대로 잠그면 순서가 반대가 됩니다. 계좌 ID가 작은 것부터 잠그도록 통일하고, 잠금 중 외부 API 호출처럼 오래 걸리는 일을 피합니다.',
 aws:'RDS에서도 교착 상태는 생깁니다. DB 로그·대기 정보·앱 오류를 함께 보고 커넥션을 늘리기 전에 짧은 트랜잭션과 잠금 순서를 검토합니다.',
 ncloud:'Cloud DB에서도 엔진의 잠금 규칙과 대기 상태를 확인합니다. 관리형 서비스는 서로 다른 업무 코드의 잠금 순서를 대신 통일해 주지 않습니다.',
 tradeoff:'재시도에는 횟수 제한과 지연이 필요합니다. 외부 결제가 이미 수행됐다면 DB 재시도만으로 중복 결제를 막을 수 없습니다.',language:'PostgreSQL · 두 psql 세션 비교',
 code:`-- 개인 연습 DB에서 한 번 생성
CREATE TABLE lab_accounts (id integer PRIMARY KEY, balance integer);
INSERT INTO lab_accounts VALUES (1, 100), (2, 100);
-- A: BEGIN 후 계좌 1 잠금
BEGIN;
SELECT * FROM lab_accounts WHERE id = 1 FOR UPDATE;
-- B: 별도 세션에서 BEGIN 후 계좌 2 잠금
-- A: 계좌 2 요청 → 대기
SELECT * FROM lab_accounts WHERE id = 2 FOR UPDATE;
-- B: 계좌 1 요청 → 교착 감지, 하나가 중단
-- 실습 종료 후 두 세션 모두 ROLLBACK;

-- 개선: 두 세션 모두 1 → 2 순서로 잠금
-- 먼저 잠근 쪽이 완료될 때 다른 쪽은 대기
-- 실제 송금의 UPDATE와 COMMIT은 이 실습에 포함하지 않음`,
 answer:'교착 상태는 서로 가진 자원을 기다리는 작업들이 진행하지 못하는 상황입니다. 송금 두 건이 계좌를 반대 순서로 잠그면 원형 대기가 생깁니다. 모든 경로의 잠금 순서를 통일하고 트랜잭션을 짧게 유지하겠습니다. DB가 중단한 트랜잭션은 전체를 제한적으로 재시도하며 외부 부수 효과의 중복도 별도로 관리하겠습니다.',
 follow:[['타임아웃을 늘리면 해결되나요?','진행 가능한 작업이 오래 걸리는 경우와 서로를 기다리는 경우는 다릅니다. 대기 시간을 늘리기 전에 대기 관계와 잠금 순서를 확인합니다.'],['기아 상태와는 어떻게 다른가요?','교착 상태는 관련 작업들이 서로 막혀 있고 기아는 다른 작업은 진행하는데 특정 작업만 자원을 받지 못합니다. 공정한 대기열·우선순위 조정 등을 검토합니다.']],
 memory:'잠금은 줄 세우기. 교착은 서로의 줄 끝을 붙잡기.',mistake:'실패한 SQL 한 줄만 재실행하지 말고 중단된 트랜잭션의 경계를 확인하세요.',
 quiz:{question:'반대 방향의 송금에서 교착 가능성을 줄이려면?',options:['계좌 ID 순으로 잠금 순서를 통일한다','모든 트랜잭션에 sleep을 추가한다','RAM만 늘린다'],correct:0,explanation:'일관된 잠금 순서는 원형 대기를 줄입니다. 관련된 모든 코드 경로가 같은 규칙을 따라야 합니다.'},refs:['locking']
},
{
 id:'normalization',category:3,title:'정규화와 데이터 중복',english:'Normalization / Functional Dependency',hook:'고객 주소를 주문마다 복사하면 이사한 뒤 어떤 주소가 맞을까?',
 definition:'정규화는 함수적 종속을 기준으로 테이블을 구성해 불필요한 중복과 삽입·수정·삭제 이상을 줄이는 과정입니다. X→Y는 X가 같으면 Y가 하나로 결정된다는 뜻입니다. 1NF는 단일 값으로 구성된 속성, 2NF는 후보키 일부에만 의존하는 비주요 속성의 분리, 3NF는 비주요 속성의 부적절한 이행 종속 제거를 중심으로 이해할 수 있습니다.',
 analogy:'학급 명부의 매 줄에 학생·반·담임 전화번호를 반복하면 담임 번호를 바꿀 때 학생 수만큼 고쳐야 합니다. 학생 명부와 반 정보를 나누고 반 번호로 연결하면 한 곳만 수정합니다. 테이블 개수보다 무엇이 무엇을 결정하는지가 핵심입니다.',
 steps:['주문 행에 고객 ID와 현재 고객명을 반복 저장한 표를 생각합니다.','고객 ID가 고객의 현재 이름을 결정한다는 업무 규칙을 확인합니다.','고객과 주문을 나누고 키로 연결합니다.','주문 당시 주소·가격은 현재 정보가 아니라 사건의 기록이므로 따로 보관합니다.'],
 scenario:'현재 고객 이름을 주문마다 반복하면 변경이 누락될 수 있습니다. 반면 주문 당시 배송 주소를 현재 프로필 주소로 바꾸면 안 됩니다. 불필요한 중복과 역사적 스냅샷을 구별해야 합니다.',
 aws:'RDS 스키마에서 고객·주문처럼 변경 주체를 분리하고 외래키·인덱스를 검토합니다. 측정된 병목에 따라 조회 모델이나 캐시를 도입할 수 있습니다.',
 ncloud:'관계형 Cloud DB에서도 같은 원칙을 적용합니다. 관리형 백업과 가용성 기능이 중복 데이터의 업무 불일치를 자동 해결하지는 않습니다.',
 tradeoff:'조회에 JOIN이 필요할 수 있습니다. 반정규화는 실제 병목과 갱신 비용을 비교해 선택하고 원본과 복사본의 동기화 규칙을 정합니다.',language:'PostgreSQL · 작은 스키마 실습',
 code:`CREATE TABLE lab_customers (id integer PRIMARY KEY, name text);
CREATE TABLE lab_orders (
  id integer PRIMARY KEY,
  customer_id integer REFERENCES lab_customers(id),
  shipping_address_at_order text
);
INSERT INTO lab_customers VALUES (1, '민수');
INSERT INTO lab_orders VALUES (10, 1, '서울 옛집');
UPDATE lab_customers SET name = '김민수' WHERE id = 1;
SELECT o.id, c.name, o.shipping_address_at_order
FROM lab_orders o JOIN lab_customers c ON c.id = o.customer_id;
-- 10 | 김민수 | 서울 옛집
-- 현재 이름은 한 곳에서 변경, 주문 당시 주소는 유지`,
 answer:'정규화는 함수적 종속을 바탕으로 중복과 갱신 이상을 줄이는 설계입니다. 현재 고객 이름을 고객 테이블에서 관리하면 변경이 한 곳에 반영됩니다. 주문 당시 주소와 가격은 사건의 기록이므로 현재 값과 분리해 보존합니다. 조회 비용이 문제가 되면 실행 계획과 인덱스를 확인한 뒤 조회 모델이나 반정규화를 검토하겠습니다.',
 follow:[['반정규화는 언제 고려하나요?','조회 패턴과 부하를 측정한 뒤입니다. 원본 위치, 갱신 주체, 불일치 허용 시간과 복구 방식을 함께 정합니다.'],['많이 나누면 항상 좋은가요?','후보키와 함수적 종속, 분해 후 정보 손실 여부를 확인해야 합니다. 테이블 수만으로 판단하지 않습니다.']],
 memory:'현재 사실은 한 곳에. 당시 사실은 기록으로.',mistake:'현재 상품 가격으로 과거 주문 금액을 다시 계산하지 마세요.',
 quiz:{question:'가격 변경 후에도 과거 주문 금액을 유지하려면?',options:['주문 당시 단가를 주문 항목에 기록한다','현재 단가로 과거 주문도 재계산한다','모든 외래키를 삭제한다'],correct:0,explanation:'당시 단가는 주문 사건의 속성이므로 불필요한 원본 중복과 구별합니다.'},refs:['normalization']
},
{
 id:'join',category:3,title:'JOIN과 누락된 행',english:'INNER JOIN / LEFT JOIN / NULL',hook:'주문하지 않은 고객도 고객 목록에 남겨야 한다면?',
 definition:'JOIN은 두 테이블의 행을 조건으로 조합합니다. INNER JOIN은 맞는 조합만 남기고 LEFT JOIN은 왼쪽 행을 유지하며 오른쪽에 대응이 없으면 NULL을 채웁니다. 한 고객에 주문이 세 개면 결과도 세 행이 될 수 있습니다. 집합 그림보다 실제 행 수와 NULL을 직접 확인하세요.',
 analogy:'고객 명단과 영수증을 고객 번호로 붙입니다. 영수증이 있는 사람만 모으면 INNER JOIN, 없는 사람도 명단에 남기면 LEFT JOIN입니다. 영수증이 여러 장이면 같은 고객이 여러 번 나타납니다.',
 steps:['고객 두 명과 주문 한 건을 준비합니다.','INNER JOIN으로 주문한 고객만 남는지 확인합니다.','LEFT JOIN으로 미주문 고객도 남고 주문 ID가 NULL인지 봅니다.','오른쪽 조건을 WHERE에 넣으면 NULL 행이 사라질 수 있습니다. ON과 WHERE의 의미를 구분합니다.'],
 scenario:'전체 고객과 결제 주문을 보여주는 화면에서 WHERE order.status = paid를 쓰면 미주문 고객이 사라집니다. JOIN으로 행이 늘어 합계가 중복되지 않는지도 확인해야 합니다.',
 aws:'RDS에서도 JOIN 키 인덱스와 실행 계획을 확인합니다. 고객마다 주문을 따로 조회하는 N+1 호출과 한 쿼리의 JOIN을 데이터 크기·페이지 처리 기준으로 비교합니다.',
 ncloud:'Cloud DB에서 실행 시간과 읽은 행 수를 확인합니다. 읽기 복제본을 사용하면 복제 지연이 허용되는 화면인지 판단합니다.',
 tradeoff:'큰 테이블을 무제한 JOIN하면 반환 행이 커집니다. 필요한 컬럼·조건·페이지 크기를 제한하고 실행 계획을 확인합니다. JOIN 자체가 항상 느린 것은 아닙니다.',language:'PostgreSQL · VALUES로 바로 실행',
 code:`WITH customers(id, name) AS (
  VALUES (1, '민수'), (2, '지수')
), orders(id, customer_id, status) AS (
  VALUES (101, 1, 'paid')
)
SELECT c.name, o.id
FROM customers c
LEFT JOIN orders o
  ON o.customer_id = c.id AND o.status = 'paid';
-- 민수 | 101
-- 지수 | NULL
-- 상태 조건을 WHERE로 옮기면 지수 행이 사라짐`,
 answer:'INNER JOIN은 대응되는 조합만, LEFT JOIN은 왼쪽 행을 모두 남깁니다. 고객 전체에 결제 주문을 연결할 때 ON에 결제 조건을 두면 미주문 고객도 남습니다. 오른쪽 조건을 WHERE에 두면 NULL 행이 제외될 수 있습니다. 일대다로 행이 늘어나는 점과 집계 중복을 확인하고 실행 계획으로 성능을 판단하겠습니다.',
 follow:[['NULL을 = NULL로 비교하나요?','일반 비교 결과는 unknown입니다. NULL 여부는 IS NULL 또는 IS NOT NULL로 검사합니다.'],['JOIN 결과가 늘어나면 오류인가요?','일대다 관계면 정상입니다. 원하는 단위가 고객 한 명인지 주문 한 건인지 정하고 집계와 중복 제거를 설계합니다.']],
 memory:'INNER는 맞는 짝. LEFT는 왼쪽을 지킨다.',mistake:'LEFT JOIN이라고 WHERE 뒤에도 왼쪽 행이 모두 남는 것은 아닙니다.',
 quiz:{question:'미주문 고객도 남기며 결제 주문만 연결하려면?',options:['LEFT JOIN의 ON에 주문 상태 조건을 둔다','WHERE에서 오른쪽 상태를 필터링한다','INNER JOIN을 쓴다'],correct:0,explanation:'ON은 연결될 오른쪽 행을 제한하고 LEFT JOIN은 연결되지 않은 왼쪽 고객을 유지합니다.'},refs:['joins']
},
{
 id:'database-choice',category:3,title:'관계형 DB와 NoSQL 선택',english:'Relational / Document / Key-value',hook:'주문과 장바구니를 꼭 같은 저장 방식으로 다뤄야 할까?',
 definition:'관계형 DB는 행·컬럼·관계와 제약 조건을 중심으로 데이터를 관리합니다. NoSQL은 문서·키값·그래프 등 여러 모델을 묶은 이름입니다. 두 종류 모두 구현에 따라 트랜잭션·복제·확장을 제공할 수 있습니다. 조회 패턴, 변경 단위, 일관성 요구, 운영 경험을 기준으로 고릅니다.',
 analogy:'연결된 주문·결제 장부는 표로 검증하기 편하고 한 상품의 다양한 옵션은 문서로 함께 읽기 편할 수 있습니다. 공구함에서 드라이버와 렌치를 고르듯 작업에 맞는 모델을 고릅니다.',
 steps:['주문 결제 확인, 사용자별 목록처럼 대표 조회를 구체적으로 씁니다.','어떤 변경이 함께 성공해야 하는지와 허용 지연을 정합니다.','관계·제약·JOIN 중심인지 문서 한 건 또는 키 조회 중심인지 비교합니다.','성능·백업·복구·개발 복잡도를 작은 구현으로 검증합니다.'],
 scenario:'주문 원본은 관계형 DB, 재생성 가능한 조회 결과는 캐시로 둘 수 있습니다. 서로 다른 DB 사이의 갱신은 자동으로 한 트랜잭션이 되지 않으므로 원본과 실패 시 복구 경로를 정해야 합니다.',
 aws:'RDS와 DynamoDB를 액세스 패턴·트랜잭션 범위·파티션 키·비용으로 검토합니다. DynamoDB도 트랜잭션을 지원하므로 NoSQL이면 트랜잭션이 없다고 말하지 않습니다.',
 ncloud:'Cloud DB의 실제 지원 엔진과 기능을 비교합니다. 원본과 캐시를 구별하고 두 저장소의 정합성과 장애 시 동작을 설계합니다.',
 tradeoff:'여러 DB를 함께 쓰면 모델별 장점을 얻지만 동기화·복구가 복잡해집니다. 요구사항을 충족하는 단순한 설계부터 시작합니다.',language:'Python · 모델 비교용 dict',
 code:`# 관계형 모델: 키로 연결하고 주문 당시 단가를 보존합니다.
product = {"id": 7, "current_price": 12000}
item = {"order_id": 10, "product_id": 7, "unit_price_at_order": 10000}
# 문서 모델: 함께 읽는 옵션을 한 문서에 포함합니다.
document = {"id": 7, "name": "티셔츠", "options": [{"color": "blue", "size": "M"}]}
print(product, item, document)
# 실제 DB 연결 대신 데이터 모델의 모양을 비교하는 예시입니다.`,
 answer:'관계형 DB와 NoSQL은 모델과 액세스 패턴으로 비교하겠습니다. 관계와 제약이 중요한 주문 원본에는 관계형 모델이 편할 수 있고 함께 읽는 옵션은 문서 모델로 표현할 수 있습니다. NoSQL도 제품별로 트랜잭션을 제공하고 관계형 DB도 확장할 수 있으므로 단순한 구분을 피하겠습니다. 여러 저장소를 쓰면 원본과 동기화·복구 비용도 평가하겠습니다.',
 follow:[['NoSQL은 스키마가 없나요?','유연한 형태를 허용해도 앱은 필요한 필드와 버전을 알아야 합니다. 입력 검증과 스키마 변경 전략이 필요합니다.'],['캐시를 주문 원본으로 써도 되나요?','데이터 유실·만료·영속성·복구 요구를 먼저 검증해야 합니다. 캐시 목적으로 구성한 저장소와 업무 원본은 책임이 다릅니다.']],
 memory:'이름보다 조회. 원본은 분명히.',mistake:'NoSQL은 무조건 빠르고 트랜잭션이 없다고 일반화하지 마세요.',
 quiz:{question:'DB를 고를 때 가장 먼저 정할 것은?',options:['조회 패턴과 일관성·변경 요구','가장 새로운 제품 이름','테이블은 나쁘다는 가정'],correct:0,explanation:'모델과 운영 요구에 따라 적합한 선택이 달라집니다.'},refs:['dynamodb','index']
}
];
export const expansion: Lesson[] = drafts.map(x => ({ minutes:20,codeNotes:['주석과 출력부터 읽고 입력을 바꿨을 때 결과를 예상해 보세요.','SQL은 개인 연습 DB에서 실행하세요. 코드가 완성 서비스인지 개념 실습인지 표시를 확인하세요.'],...x }));
