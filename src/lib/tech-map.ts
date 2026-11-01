// 백엔드에서 자주 만나는 도구를 맡은 일별로 묶은 지도. 각 도구는 그것을 설명하는 단원으로 이어집니다.
// test:content checks that every lesson id here exists.
export type MapTool = { name: string; born: string; role: string; notFor: string; lesson: string };
export type MapLayer = { title: string; question: string; tools: MapTool[] };

export const techMap: MapLayer[] = [
 { title: '원본을 지키는 저장소', question: '잃으면 안 되는 데이터는 어디에 두나요?', tools: [
  { name: 'PostgreSQL · MySQL', born: '여러 데이터를 함께 맞춰 바꾸고 어떤 질문에도 SQL로 답하려고', role: '주문, 결제, 회원처럼 서비스의 원본을 트랜잭션으로 지킵니다.', notFor: '글 속 단어 검색, 키 하나로 초당 수십만 건 읽기', lesson: 'transaction' },
  { name: 'MongoDB', born: 'JSON처럼 중첩된 데이터를 화면이 읽는 모양 그대로 저장하려고', role: '카탈로그, 콘텐츠처럼 문서 단위로 읽고 모양이 제각각인 데이터를 담습니다.', notFor: '여러 데이터를 자주 함께 맞춰야 하는 업무', lesson: 'documentdb' },
  { name: 'SQLAlchemy · Django ORM · PgBouncer', born: '표와 객체를 잇는 반복 코드와 비싼 DB 연결을 줄이려고', role: '객체 조작을 SQL로 옮기고 연결을 풀에서 돌려 씁니다.', notFor: '복잡한 집계(직접 SQL), 쿼리 수를 확인하지 않는 목록 화면', lesson: 'orm' },
  { name: 'Cassandra · DynamoDB', born: '서버 한 대로 감당할 수 없는 쓰기를 여러 서버에 나눠 받으려고', role: '키와 시간 순으로 읽는 거대한 데이터를 늘어나는 만큼 처리합니다.', notFor: '조인, 즉석 집계, 접근 패턴이 자주 바뀌는 데이터', lesson: 'database-choice' }
 ]},
 { title: '빠르게 읽고 함께 쓰는 곳', question: '같은 것을 반복해서 읽거나 여러 서버가 같은 값을 봐야 하면?', tools: [
  { name: 'Redis · Valkey', born: '문자열만 담는 캐시로는 목록과 카운터를 안전하게 다룰 수 없어서', role: '캐시, 세션, 처리율 제한, 순위표, 짧은 락을 메모리에서 원자적으로 처리합니다.', notFor: '메모리보다 큰 데이터, 잃으면 안 되는 유일한 원본', lesson: 'redis' },
  { name: 'Memcached', born: 'DB가 버티지 못하자 여러 서버의 남는 메모리를 하나의 캐시로 쓰려고', role: 'DB 앞에서 조회 결과를 단순한 키값으로 복사해 둡니다.', notFor: '자료구조 연산, 영속성이 필요한 데이터', lesson: 'cache' },
  { name: 'CDN', born: '먼 거리의 사용자에게 같은 파일을 매번 원본에서 보내는 것이 느려서', role: '이미지, 영상, 정적 파일을 사용자 가까운 곳에 복사해 둡니다.', notFor: '사용자마다 다른 응답, 즉시 바뀌어야 하는 데이터', lesson: 'storage' }
 ]},
 { title: '찾기', question: '사용자가 쓰는 말로 찾고 관련 있는 순서로 보여 주려면?', tools: [
  { name: 'Elasticsearch · OpenSearch', born: 'DB의 인덱스로는 글 속의 단어로 찾고 관련도로 정렬할 수 없어서', role: '역색인으로 단어 검색, 관련도 정렬, 로그 검색을 합니다.', notFor: '원본 저장, 트랜잭션, 쓰자마자 읽어야 하는 일', lesson: 'search' }
 ]},
 { title: '나중에 처리하고 사건을 전하기', question: '오래 걸리는 일과 여러 시스템이 알아야 할 사건은 어떻게 넘기나요?', tools: [
  { name: 'RabbitMQ · SQS', born: '요청 안에서 모든 일을 끝내면 느리고 한 곳의 장애가 전체로 번져서', role: '이메일 발송, 썸네일 생성 같은 작업을 큐에 넣고 작업자가 나눠 처리합니다.', notFor: '지난 메시지를 다시 읽거나 여러 시스템이 같은 사건을 각자 읽는 일', lesson: 'queue' },
  { name: 'Kafka', born: '사이트의 모든 활동 기록을 여러 시스템에 흘려보내야 해서', role: '사건을 순서대로 쌓는 로그로 여러 소비자가 각자 읽고 다시 처리합니다.', notFor: '작은 규모의 작업 분배, 메시지별 지연 재시도', lesson: 'queue' }
 ]},
 { title: '요청의 길목', question: '요청은 어디를 거쳐 앱에 닿나요?', tools: [
  { name: 'Nginx', born: '접속 하나에 프로세스 하나를 쓰던 서버로는 동시 접속 1만 개를 감당할 수 없어서', role: 'TLS 종료, 정적 파일, 리버스 프록시, 타임아웃과 버퍼링을 맡습니다.', notFor: '업무 로직', lesson: 'proxy' },
  { name: 'API 게이트웨이 (Kong · AWS API Gateway)', born: '서비스가 수십 개로 나뉘자 앱이 모든 주소를 알 수 없어서', role: '외부 요청의 입구에서 인증, 처리율 제한, 서비스별 라우팅을 맡습니다.', notFor: '업무 로직(넣으면 새 모놀리스가 됩니다)', lesson: 'microservices' },
  { name: '로드 밸런서 (ALB · NLB)', born: '서버 한 대로는 요청과 장애를 감당할 수 없어서', role: '요청을 건강한 서버들에 나눠 보내고 고장 난 서버를 뺍니다.', notFor: '서버 안의 느린 쿼리 같은 병목 해결', lesson: 'lb' }
 ]},
 { title: '실행하고 배포하기', question: '코드를 어떻게 똑같이 옮기고 자동으로 올리나요?', tools: [
  { name: 'Docker', born: '내 컴퓨터에서 되던 앱이 서버에서는 안 돌아서', role: '앱과 실행 환경을 이미지 하나로 묶어 어디서나 같게 실행합니다.', notFor: '보안 경계를 가상 머신만큼 강하게 나누는 일', lesson: 'docker' },
  { name: 'Kubernetes', born: '수천 개 컨테이너를 사람이 직접 띄우고 살릴 수 없어서', role: '원하는 상태를 선언하면 컨테이너를 배치하고 죽으면 다시 띄웁니다.', notFor: '서버 몇 대짜리 작은 서비스(운영 비용이 더 큼)', lesson: 'kubernetes' },
  { name: 'GitHub Actions', born: '사람이 손으로 테스트하고 배포하면 빠뜨리고 틀려서', role: '코드가 올라올 때마다 테스트, 빌드, 배포를 자동으로 실행합니다.', notFor: '운영 중인 서비스의 상태 감시', lesson: 'cicd' }
 ]},
 { title: '지켜보기', question: '서비스 안에서 무슨 일이 일어나는지 어떻게 아나요?', tools: [
  { name: 'Prometheus', born: '수시로 생기고 사라지는 서버들의 숫자를 라벨로 나눠 보고 싶어서', role: '/metrics를 주기적으로 가져와 시계열로 저장하고 PromQL로 계산해 알림을 보냅니다.', notFor: '로그 본문, 사용자 ID처럼 값이 끝없는 라벨', lesson: 'monitoring' },
  { name: 'Grafana', born: '여러 저장소의 그래프를 한 화면에서 보고 싶어서', role: '메트릭, 로그, 트레이스를 한 대시보드에 그리고 서로 오가게 연결합니다.', notFor: '데이터 저장(그리기만 합니다)', lesson: 'monitoring' },
  { name: 'ELK · Loki', born: '서버마다 접속해 로그 파일을 읽을 수 없어서', role: '흩어진 로그를 한곳에 모아 검색합니다. Loki는 라벨만 색인해 싸게 모읍니다.', notFor: '숫자 추세 계산(메트릭이 더 쌉니다)', lesson: 'monitoring' },
  { name: 'OpenTelemetry · Jaeger', born: '여러 서비스를 거치는 요청의 어디가 느린지 알 수 없어서', role: '요청에 추적 ID를 붙여 구간별 시간을 기록하고 세 신호를 같은 방식으로 수집합니다.', notFor: '모든 요청을 빠짐없이 영구 보관하는 일', lesson: 'observability' }
 ]},
 { title: '로그인과 권한 위임', question: '비밀번호를 넘기지 않고 로그인과 권한을 맡기려면?', tools: [
  { name: 'Keycloak · Cognito · Auth0', born: '서비스마다 비밀번호를 받던 관행을 끝내고 로그인을 한곳에 모으려고', role: 'OAuth 2.0과 OpenID Connect로 로그인, 소셜 로그인, 토큰 발급을 맡습니다.', notFor: '앱 안의 세부 권한 규칙(앱이 직접 판단합니다)', lesson: 'oauth' }
 ]},
 { title: '여러 서버가 합의하기', question: '서버 여러 대가 "지금 누가 주인인가"에 어떻게 동의하나요?', tools: [
  { name: 'etcd · ZooKeeper', born: '네트워크가 끊겨도 서버들이 같은 결정을 내려야 해서', role: '설정, 리더 선출, 잠금을 Raft나 Zab 합의로 일관되게 저장합니다. Kubernetes의 기억 장치입니다.', notFor: '대용량 데이터 저장, 빠른 쓰기가 많은 일', lesson: 'raft' }
 ]}
];
