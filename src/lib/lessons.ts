import { expansion } from './interview-expansion';
export const categories = ['네트워크', '운영체제와 Linux', '서버와 API', '데이터와 처리', '클라우드 설계', '보안과 인증', '배포와 운영'];
export const sources = {
 pyThreads:{name:'Python · threading',url:'https://docs.python.org/3/library/threading.html'},
 pyProcesses:{name:'Python · multiprocessing',url:'https://docs.python.org/3/library/multiprocessing.html'},
 pyPool:{name:'Python · concurrent.futures',url:'https://docs.python.org/3/library/concurrent.futures.html'},
 pyMemory: { name: 'Python · tracemalloc', url: 'https://docs.python.org/3/library/tracemalloc.html' },
 locking: { name: 'PostgreSQL · Locks & Deadlocks', url: 'https://www.postgresql.org/docs/current/explicit-locking.html' },
 joins: { name: 'PostgreSQL · Joins', url: 'https://www.postgresql.org/docs/current/tutorial-join.html' },
 normalization: { name: 'Microsoft Learn · Normalization', url: 'https://learn.microsoft.com/en-us/previous-versions/troubleshoot/microsoft-365/microsoft-365-apps/access/database-normalization-description' },
 dynamodb: { name: 'AWS · DynamoDB Transactions', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transactions.html' },
 threads: { name: 'Linux man-pages · Threads', url: 'https://man7.org/linux/man-pages/man7/pthreads.7.html' },
 memory: { name: 'Linux Kernel · Memory Concepts', url: 'https://docs.kernel.org/admin-guide/mm/concepts.html' },
 linux: { name: 'Linux man-pages · Credentials', url: 'https://man7.org/linux/man-pages/man7/credentials.7.html' },
 socket: { name: 'Linux man-pages · ss', url: 'https://man7.org/linux/man-pages/man8/ss.8.html' },
 queue: { name: 'AWS SQS · At-least-once Delivery', url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html' },
 storage: { name: 'AWS S3 · Object Storage', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html' },
 recovery: { name: 'AWS RDS · Point-in-time Restore', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html' },
 cicd: { name: 'GitHub Actions · Python', url: 'https://docs.github.com/en/actions/tutorials/build-and-test-code/python' },
 validation: { name: 'OWASP · Input Validation', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html' },
 interview: { name: 'Interview Question for Beginner · MIT', url: 'https://github.com/jbee37142/Interview_Question_for_Beginner' },
 questions: { name: 'ksundong · Backend Interview Question (원문 라이선스 안내 확인)', url: 'https://github.com/ksundong/backend-interview-question' },
 http: { name: 'MDN · HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview' },
 nat: { name: 'AWS · NAT Gateway', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html' },
 ncloud: { name: 'NAVER Cloud · NAT Gateway', url: 'https://guide.ncloud-docs.com/docs/networking-vpc-vpcdetailenatgw' },
 kit: { name: 'MDN · HTTP 요청과 응답', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages' },
 event: { name: 'Python · asyncio', url: 'https://docs.python.org/3/library/asyncio-task.html' },
 index: { name: 'PostgreSQL · Indexes', url: 'https://www.postgresql.org/docs/current/indexes.html' },
 tx: { name: 'PostgreSQL · Transaction Isolation', url: 'https://www.postgresql.org/docs/current/transaction-iso.html' },
 cache: { name: 'MDN · HTTP Caching', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching' },
 docker: { name: 'Docker · Containers', url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/' },
 auth: { name: 'OWASP · Session Management', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html' },
 cors: { name: 'MDN · CORS', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS' },
 iam: { name: 'AWS · IAM Best Practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' },
 sg: { name: 'AWS · Security Group Rules', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html' },
 sre: { name: 'Google SRE · Monitoring', url: 'https://sre.google/sre-book/monitoring-distributed-systems/' },
 kernelSched: { name: 'Linux Kernel · EEVDF Scheduler', url: 'https://docs.kernel.org/scheduler/sched-eevdf.html' },
 tls13: { name: 'RFC 8446 · TLS 1.3', url: 'https://www.rfc-editor.org/rfc/rfc8446' },
 websocket: { name: 'RFC 6455 · WebSocket', url: 'https://www.rfc-editor.org/rfc/rfc6455' },
 rfc6585: { name: 'RFC 6585 · 429 Too Many Requests', url: 'https://www.rfc-editor.org/rfc/rfc6585' },
 backoff: { name: 'AWS · Timeouts, retries and backoff with jitter', url: 'https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/' },
 pgReplication: { name: 'PostgreSQL · Standby Servers', url: 'https://www.postgresql.org/docs/current/warm-standby.html' },
 raft: { name: 'Raft · Consensus Algorithm', url: 'https://raft.github.io/' },
 etcd: { name: 'etcd · FAQ', url: 'https://etcd.io/docs/v3.5/faq/' },
 fsyncMan: { name: 'Linux man-pages · fsync', url: 'https://man7.org/linux/man-pages/man2/fsync.2.html' },
 pyDis: { name: 'Python · dis', url: 'https://docs.python.org/3/library/dis.html' },
 pytestDocs: { name: 'pytest · Fixtures', url: 'https://docs.pytest.org/en/stable/how-to/fixtures.html' },
 gitBook: { name: 'Pro Git · Branching', url: 'https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging' },
 k8sDeployment: { name: 'Kubernetes · Deployments', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/' }
};
export type SourceKey = keyof typeof sources;
export type Lesson = {
 id: string; category: number; title: string; english: string; hook: string;
 definition: string; analogy: string; steps: string[]; scenario: string;
 aws: string; ncloud: string; tradeoff: string; code: string; language: string;
 codeNotes: string[]; answer: string; follow: [string, string][];
 memory: string; mistake: string; quiz: { question: string; options: string[]; correct: number; explanation: string };
 refs: SourceKey[]; minutes: number;
};
type Input = Omit<Lesson, 'minutes' | 'codeNotes'> & { codeNotes?: string[] };
const l = (x: Input): Lesson => ({ minutes: 15, codeNotes: ['먼저 입력과 출력을 확인하세요. 코드의 각 줄을 동작 단계에 연결하면 외우는 부담이 줄어듭니다.', '예시는 해당 개념에 집중한 학습용입니다. 실제 서비스에서는 권한, 오류 처리, 환경별 설정을 추가하세요.'], ...x });
const core: Lesson[] = [
l({id:'nat', category:0, title:'NAT와 사설 IP', english:'Network Address Translation', hook:'우리 집 기기들은 어떻게 하나의 공인 IP를 나눠 쓸까?',
definition:'NAT는 라우터 같은 네트워크 장비가 패킷의 IP 주소를 다른 주소로 바꾸는 기술입니다. IPv4 주소를 절약하고 서로 다른 주소 공간을 연결할 때 사용합니다. 일상에서 흔한 형태는 여러 사설 IP를 하나의 공인 IP로 바꾸면서 포트도 함께 변환하는 NAPT/PAT입니다. 사설 IP는 인터넷에서 직접 라우팅되지 않으므로, 인터넷으로 나갈 때 외부에서 통신 가능한 주소가 필요합니다.',
analogy:'아파트 101호와 102호가 각각 택배를 보내는데, 외부에는 아파트 대표 주소만 알려주는 상황을 생각하세요. 관리실은 “대표 주소의 접수번호 62001 = 101호의 주문”이라는 장부를 씁니다. 답장이 오면 접수번호를 보고 원래 집으로 돌려줍니다. IP가 아파트 주소라면 포트는 접수번호입니다. 이 비유는 주소·포트 변환의 역할을 설명하며 실제 네트워크의 모든 보안 기능을 뜻하지는 않습니다.',
steps:['내 PC 192.168.0.10:51000이 웹 서버 203.0.113.80:443으로 요청합니다. 목적지 주소는 그대로입니다.', '공유기는 출발지 IP와 포트를 198.51.100.20:62001로 바꾸고, 원래 주소와의 대응 관계를 변환 테이블에 저장합니다.', '웹 서버는 공인 IP의 62001번 포트로 응답합니다. 서버 입장에서는 내부 PC의 사설 주소를 알 필요가 없습니다.', '공유기는 연결 상태와 변환 테이블을 확인해 목적지를 192.168.0.10:51000으로 복원합니다. 다른 기기는 다른 대응 관계로 구분합니다.'],
scenario:'집에서 노트북과 휴대폰으로 동시에 같은 웹 사이트에 접속해도 공유기가 응답을 구분합니다. 서버에서는 사설 서브넷의 애플리케이션이 외부 결제 API를 호출할 때 쓰입니다. 상대 업체가 출발지 IP 허용 목록을 요구하면 NAT의 공인 IP를 등록할 수 있습니다. 다만 NAT를 통과한 외부 요청의 실제 사용자 IP를 애플리케이션에서 자동으로 알 수 있는 것은 아닙니다.',
aws:'AWS의 인터넷용 Public NAT Gateway는 공용 서브넷에 두고 Elastic IP를 연결합니다. 사설 서브넷의 기본 경로를 NAT로, NAT가 있는 서브넷의 인터넷 경로를 Internet Gateway로 향하게 합니다. 사설 서버가 시작한 외부 통신과 그 응답을 처리하며, 외부에서 사설 서버로 새 연결을 시작하는 용도로 쓰지 않습니다.',
ncloud:'NAVER Cloud의 VPC NAT Gateway는 전용 서브넷을 선택해 생성합니다. Public형은 공인 IP로 인터넷에 나가고 Private형은 사설망 통신에 사용합니다. 서버 서브넷의 Route Table에서 해당 NAT로 향하는 경로를 설정합니다. AWS의 서브넷 배치를 그대로 복사하지 말고 Ncloud의 NAT 전용 서브넷 조건을 확인하세요.',
tradeoff:'NAT는 경로와 주소 변환을 제공합니다. 접근 통제는 보안 그룹·ACG·방화벽으로 별도 설계합니다. 가용 영역별 NAT 배치는 장애 범위를 줄이는 대신 비용이 늘 수 있습니다. 내부 클라우드 서비스에만 접근한다면 서비스가 지원하는 사설 엔드포인트와 비용·경로를 비교하세요.',
language:'Python · 주소 변환 모형',code:`# 네트워크를 변경하지 않는 교육용 모형입니다.
mapping = {}
public_ip = "198.51.100.20"

def outbound(private_ip, private_port):
    public_port = 62001 + len(mapping)
    mapping[public_port] = (private_ip, private_port)
    return public_ip, public_port

print(outbound("192.168.0.10", 51000))
print(outbound("192.168.0.11", 51000))
print(mapping[62001])  # 응답을 원래 PC로 전달
# 실제 NAT는 프로토콜·목적지·타임아웃·포트 충돌도 관리합니다.`,
codeNotes:['같은 사설 포트 51000을 사용해도 외부 포트 62001, 62002로 구분합니다.', 'mapping은 관리실의 장부입니다. 응답은 공인 포트로 원래 목적지를 찾습니다.', '실제 패킷 전송 코드는 아닙니다. 아래 실습에서도 문서용 IP만 사용합니다.'],
answer:'NAT는 패킷의 IP 주소를 변환하는 기술입니다. 흔히 사설망의 여러 기기가 공인 IP 하나를 공유하도록 포트까지 변환하는 PAT를 사용합니다. 변환 테이블로 응답을 원래 기기에 전달합니다. 클라우드에서는 사설 서버의 외부 API 호출에 Public NAT Gateway를 사용할 수 있고, 외부 사용자의 접속은 로드 밸런서 같은 별도 진입 경로로 받습니다. NAT 자체를 방화벽과 동일시하지 않습니다.',
follow:[['포트 포워딩과는 어떻게 다른가요?','보통 외부의 특정 포트로 들어오는 연결을 지정된 내부 IP·포트에 전달하는 DNAT 설정입니다. 일반적인 출발지 NAT와 연결 방향이 다릅니다. 클라우드 NAT Gateway를 포트 포워딩 장비처럼 사용하지 않습니다.'],['사설 IP 범위는 무엇인가요?','IPv4의 대표 사설 범위는 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16입니다. 172로 시작하는 모든 주소가 사설 IP인 것은 아닙니다.'],['NAT가 있으면 서버가 안전한가요?','변환 상태가 없는 외부 연결이 바로 들어오기 어렵다는 점과 접근 통제는 구별해야 합니다. 인바운드 정책, 패치, 자격 증명 관리까지 필요합니다.']],
memory:'사설 → 공인 → 장부 → 원래 기기. 주소를 바꾸고, 포트로 구분한다.',mistake:'“NAT는 외부 사용자가 사설 서버에 접속하도록 해주는 서비스”라고 답하면 방향을 혼동한 것입니다.',
quiz:{question:'사설 서버가 외부 결제 API를 호출해야 합니다. 적절한 인터넷 출구는?',options:['Public NAT Gateway와 올바른 라우팅','Private NAT Gateway만 생성','DB 포트를 인터넷 전체에 공개'],correct:0,explanation:'Public NAT와 인터넷으로 이어지는 경로가 필요합니다. 외부 사용자의 서비스 접속과는 다른 흐름입니다.'}, refs:['nat','ncloud']}),
l({id:'dns',category:0,title:'DNS와 요청의 여행',english:'Domain Name System',hook:'주소창에 도메인을 입력하면 가장 먼저 무슨 일이 일어날까?',definition:'DNS는 도메인 이름에 대응하는 정보를 찾는 분산 시스템입니다. A는 IPv4, AAAA는 IPv6, CNAME은 다른 이름을 가리킵니다. 브라우저와 운영체제의 캐시를 확인하고 재귀 리졸버에 질문합니다. 필요한 경우 리졸버가 루트·TLD·권한 서버를 따라가 답을 구합니다. DNS는 도메인을 IP로 찾는 단계이지 웹 페이지 본문을 내려주는 서버는 아닙니다.',analogy:'친구 이름은 기억하지만 전화번호는 모를 때 연락처를 찾는 것과 같습니다. 내 연락처에 없으면 안내 데스크가 다른 기관에 물어봅니다. 오래된 연락처를 저장해 두면 친구가 번호를 바꿔도 한동안 예전 번호로 연락하게 됩니다. DNS의 TTL은 그 연락처를 다시 확인하기까지의 캐시 유효시간에 해당합니다.',steps:['브라우저·OS 캐시에서 도메인 정보를 찾습니다.','재귀 리졸버가 캐시 또는 권한 서버에서 레코드를 얻습니다.','얻은 IP로 연결하고 HTTPS라면 TLS를 협상합니다.','HTTP 요청을 보내면 서버가 HTML·JSON 등을 응답합니다.'],scenario:'새 서버로 이사했는데 일부 사용자는 구 서버에 접속한다면 DNS 캐시를 의심합니다. 전환 직전에만 TTL을 낮추면 이미 긴 TTL로 캐시된 응답은 바로 없어지지 않습니다. 전환 전에 TTL을 낮추고 기존 유효시간이 지나도록 계획한 뒤 두 환경을 함께 운영합니다.',aws:'Route 53에서 레코드를 관리하고 로드 밸런서의 이름을 진입점으로 연결할 수 있습니다. 인스턴스 IP를 하나씩 외우게 만드는 대신 안정적인 이름으로 접근합니다.',ncloud:'Global DNS에 도메인 레코드를 관리하고 Load Balancer의 제공 주소에 맞춰 연결합니다. 도메인 소유권과 네임서버 위임도 함께 확인해야 합니다.',tradeoff:'TTL을 짧게 두면 변경 반영이 빨라질 수 있지만 DNS 질의가 늘어납니다. DNS round robin은 이름 해석 단계의 분산이며, 애플리케이션 상태를 확인하고 요청을 분산하는 로드 밸런서와 역할이 다릅니다.',language:'터미널 · 조회만 수행',code:`nslookup example.com
# macOS/Linux 또는 dig 설치 환경
dig example.com A
dig example.com AAAA
# 응답 헤더, 연결 시간을 확인
curl -I https://example.com`,answer:'DNS는 도메인 이름을 IP 등 레코드로 해석하는 분산 시스템입니다. 캐시를 먼저 확인하고 리졸버가 필요하면 권한 서버까지 질의합니다. IP를 얻은 뒤 연결과 TLS, HTTP 요청이 이어집니다. 배포 시에는 TTL과 캐시 때문에 모든 사용자가 즉시 새 주소를 받지는 않는다는 점을 고려합니다.',follow:[['DNS가 실패하면 어떻게 진단하나요?','이름 해석 실패인지 연결 실패인지 먼저 나눕니다. nslookup 결과, 레코드, 네임서버 위임, TTL을 확인하고 IP 연결·TLS는 별도로 확인합니다.'],['CNAME은 리다이렉트인가요?','DNS 이름의 별칭입니다. HTTP 301·302 응답으로 브라우저의 URL을 바꾸는 리다이렉트와 다릅니다.']],memory:'이름 찾기 → 연결 → 암호화 → 요청.',mistake:'DNS 조회 한 번마다 항상 루트 서버부터 방문하는 것은 아닙니다. 캐시가 경로를 줄입니다.',quiz:{question:'DNS 변경 후 일부 사용자만 예전 서버에 접속하는 이유로 가장 적절한 것은?',options:['HTML 문법','DNS 캐시의 TTL','DB 인덱스'],correct:1,explanation:'이전에 받은 DNS 정보가 캐시에 남아 있을 수 있습니다.'},refs:['http','interview']}),
l({id:'tcp',category:0,title:'TCP · UDP · 연결',english:'Transmission Control Protocol / User Datagram Protocol',hook:'영상 통화와 결제 요청은 왜 다른 통신 선택을 할까?',definition:'TCP는 바이트 스트림을 순서대로 전달하고 손실에 대한 재전송과 흐름·혼잡 제어를 제공합니다. UDP는 데이터그램을 연결 수립 없이 전송하며 전달·순서를 자체 보장하지 않습니다. 이 차이는 “UDP가 무조건 빠르다”는 뜻이 아니라 서비스가 어디서 신뢰성과 지연을 관리할지에 대한 선택입니다. QUIC처럼 UDP 위에서 신뢰성을 구현하는 프로토콜도 있습니다.',analogy:'TCP는 책의 빠진 페이지를 다시 받아 순서대로 제본하는 배송입니다. UDP는 실시간 경기 상황을 계속 보내는 방송에 가깝습니다. 지나간 프레임을 기다리느라 현재 상황이 늦어지면 더 불편할 수 있습니다. 단, 방송 서비스도 필요에 따라 손실 복구를 따로 설계합니다.',steps:['TCP 클라이언트가 SYN으로 연결을 요청합니다.','서버가 SYN-ACK으로 응답합니다.','클라이언트가 ACK을 보내 양쪽의 초기 순서 번호를 확인합니다.','연결 후 데이터 전송·확인·재전송을 수행합니다. TLS 협상은 그 위의 별도 단계입니다.'],scenario:'결제 API에서는 응답이 손실되어도 결제가 이미 처리됐을 수 있습니다. TCP가 신뢰성을 제공해도 애플리케이션 수준에서 “결제가 한 번만 처리된다”는 의미까지 보장하지 않습니다. 요청 재시도와 멱등성 키를 함께 설계합니다.',aws:'TCP 기반 웹 트래픽에는 ALB를, 전송 계층 TCP·UDP 요구에는 지원 조건에 맞춰 NLB를 검토합니다. 포트와 프로토콜을 보안 그룹에서 일치시킵니다.',ncloud:'서비스 프로토콜에 맞는 Application·Network Load Balancer 종류를 확인합니다. ACG 규칙에서도 TCP와 UDP를 구분해야 합니다.',tradeoff:'TCP 재전송은 손실을 복구하지만 지연이 늘 수 있습니다. UDP 기반 서비스는 순서·손실·혼잡 처리 요구를 애플리케이션 또는 상위 프로토콜이 책임져야 합니다.',language:'Python · 로컬 UDP 송신',code:`import socket
# 수신 서버가 없으면 응답은 없습니다.
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
    sock.sendto(b"hello", ("127.0.0.1", 9999))
# sendto 성공은 상대 애플리케이션의 수신 확인이 아닙니다.`,answer:'TCP는 연결을 수립하고 순서·재전송·흐름 및 혼잡 제어를 제공하는 바이트 스트림입니다. UDP는 데이터그램을 보내며 전달과 순서를 자체 보장하지 않습니다. 지연과 손실 허용 수준에 따라 선택하고, HTTP/3의 QUIC처럼 UDP 위에서 신뢰성을 추가할 수도 있습니다. 연결 수립은 SYN → SYN/ACK → ACK로 진행하고 종료는 각 방향의 FIN과 ACK로 진행합니다. FIN과 ACK가 합쳐질 수 있어 패킷 수는 항상 네 개가 아닙니다. 능동 종료 측의 TIME_WAIT는 마지막 ACK 재전송과 오래된 패킷의 영향을 줄이는 데 필요합니다. TCP 전달과 업무 처리 보장은 구별합니다.',follow:[['3-way handshake는 왜 하나요?','양쪽이 송수신할 수 있는지 확인하고 초기 순서 번호를 교환해 이후 바이트를 추적합니다.'],['TCP면 중복 결제가 없나요?','아닙니다. 응답 손실 후 클라이언트가 새 요청을 보낼 수 있으므로 멱등성 설계가 필요합니다.']],memory:'TCP는 순서와 복구, UDP는 데이터그램. 업무 보장은 따로.',mistake:'HTTP가 항상 TCP 위에서만 동작한다고 단정하지 마세요. HTTP/3는 QUIC을 사용합니다.',quiz:{question:'UDP sendto가 성공했다면 무엇을 알 수 있나요?',options:['상대가 업무를 완료했다','패킷 순서가 보장된다','로컬 송신 호출이 성공했다'],correct:2,explanation:'상대 수신·업무 처리·순서 보장까지 의미하지 않습니다.'},refs:['interview','http']}),
l({id:'http',category:0,title:'HTTP와 HTTPS',english:'Hypertext Transfer Protocol / TLS',hook:'자물쇠 표시가 있으면 모든 보안 문제가 해결될까?',definition:'HTTP는 요청과 응답으로 리소스를 주고받는 애플리케이션 프로토콜입니다. 메서드·경로·헤더·본문이 요청을 구성하고 상태 코드·헤더·본문이 응답을 구성합니다. HTTPS는 HTTP 통신을 TLS로 보호해 도청과 변조를 막고 인증서로 서버 신원을 확인합니다. HTTP의 무상태성은 서버가 이전 요청을 자동으로 기억하는 규칙이 없다는 뜻이며, 쿠키와 세션으로 상태를 구현할 수 있습니다.',analogy:'HTTP는 주문서의 작성 규칙, TLS는 주문서를 넣는 잠금 봉투입니다. 봉투가 안전해도 주문서에 적힌 사용자 권한이 올바른지는 식당이 확인해야 합니다. HTTPS가 있다고 다른 사람의 주문 정보를 조회해도 되는 것은 아닙니다.',steps:['클라이언트가 서버에 연결하고 인증서를 검증합니다.','TLS 협상으로 통신을 보호할 키를 설정합니다.','HTTP 메서드·헤더·본문을 전송합니다.','서버는 상태 코드와 데이터를 반환합니다.'],scenario:'로그인 페이지에서 비밀번호가 HTTPS로 전송되어도 서버 로그에 그대로 기록하면 노출될 수 있습니다. 인증서 갱신, HTTP에서 HTTPS로 전환, Secure 쿠키, 민감 정보 로그 제거가 함께 필요합니다.',aws:'ALB 또는 CloudFront에서 인증서를 적용해 TLS를 종료할 수 있습니다. 로드 밸런서에서 서버까지도 암호화할지는 데이터와 위협 모델에 맞춰 결정합니다.',ncloud:'Certificate Manager와 Load Balancer·CDN 계열 서비스의 인증서 연동 조건을 확인합니다. 사용 중인 서비스의 HTTPS 리스너와 만료일을 점검합니다.',tradeoff:'TLS 종료 지점이 중앙화되면 인증서 운영이 쉬워집니다. 그러나 뒷단 통신 보호와 신뢰할 프록시의 범위를 별도로 정해야 합니다.',language:'터미널 · 응답 살펴보기',code:`curl -i https://example.com
# -i: 상태 코드와 헤더를 본문과 함께 출력
# 200: 성공 / 401: 인증 필요 / 403: 권한 거부
# 404: 리소스 없음 / 500: 서버 내부 오류
# 인증서 검증을 끄는 -k를 운영 해결책으로 쓰지 마세요.`,answer:'HTTP는 메서드·헤더·본문으로 요청하고 상태 코드와 데이터로 응답하는 프로토콜입니다. HTTPS는 TLS로 전송 구간의 기밀성과 무결성, 서버 인증을 제공합니다. 클라이언트는 인증서 체인과 호스트명 등을 검증하고, 현대적인 TLS는 키 합의로 세션 키를 얻어 대칭키로 데이터를 보호합니다. 인증서를 단순히 개인키로 암호화한 문서라고 설명하지 않겠습니다. 다만 사용자 권한 검증이나 데이터베이스 보안까지 해결하지는 않으므로 인증·인가와 입력 검증을 별도로 적용합니다.',follow:[['401과 403의 차이는?','401은 유효한 인증 자격이 없는 상황, 403은 서버가 요청을 이해했지만 수행을 거부하는 상황입니다. 정보 노출을 막기 위해 의도적으로 404를 반환하는 정책도 있습니다.'],['HTTP는 무상태인데 로그인은 어떻게 하나요?','쿠키에 세션 식별자를 보내고 서버 저장소에서 사용자 상태를 조회하거나 검증 가능한 토큰을 사용합니다.']],memory:'HTTP는 대화 규칙, TLS는 안전한 통로, 인가는 서버의 판단.',mistake:'POST라는 이유만으로 데이터가 암호화되는 것은 아닙니다.',quiz:{question:'HTTPS가 직접 해결하는 문제는?',options:['다른 사용자 주문 접근','전송 중 도청·변조','SQL 인젝션'],correct:1,explanation:'HTTPS는 전송 구간을 보호합니다. 인가와 SQL 방어는 애플리케이션에서 처리합니다.'},refs:['http']}),
l({id:'kit',category:2,title:'브라우저와 서버의 경계',english:'Client / Server / API Boundary',hook:'브라우저에 보내면 안 되는 코드는 어디에 둘까?',definition:'브라우저는 화면을 보여주고 서버는 신뢰할 수 있는 기준으로 요청을 검증하고 데이터를 처리합니다. 브라우저의 입력·숨겨진 필드·검사는 사용자가 바꿀 수 있습니다. DB 연결 정보와 비밀 키는 서버에 두고, API에는 화면에 필요한 최소 결과만 반환합니다. 서버에서 만든 데이터도 응답으로 보내면 사용자에게 공개됩니다.',analogy:'카페의 홀은 브라우저, 주방은 서버입니다. 손님에게 메뉴와 완성된 음식은 보여주지만 금고 열쇠와 전체 주문 장부를 건네지 않습니다. 주방에서 만든 결과라도 손님에게 전달하면 공개된다는 점이 중요합니다. 서버 전용 load의 반환 데이터도 브라우저에 직렬화되어 전달됩니다.',steps:['요청의 입력과 인증 정보를 읽습니다.','서버에서 타입·업무 권한을 검증합니다.','DB와 내부 API는 서버 안에서 사용합니다.','화면에 필요한 최소 결과를 응답합니다.'],scenario:'프로필 API는 인증된 사용자와 조회 권한을 확인한 뒤 이름 등 필요한 필드만 반환합니다. DB 접속 문자열이나 관리자 키를 응답과 로그에 넣지 않습니다. 이 사이트도 API 엔드포인트를 사용하지만 학습은 특정 프레임워크 문법보다 요청·검증·응답의 경계를 중심으로 합니다.',aws:'Python 서버를 EC2 또는 컨테이너에서 실행하고 로드 밸런서 뒤에 배치할 수 있습니다. 비밀값은 실행 환경의 비밀 관리 수단과 역할로 관리합니다.',ncloud:'Server나 컨테이너에서 Python 서버를 실행하고 Load Balancer 뒤에 배치합니다. 브라우저에 전달할 데이터와 내부 자격 증명을 구별합니다.',tradeoff:'한 프로젝트에서 화면과 서버를 다루면 개발이 단순해집니다. 별도 백엔드는 팀·배포·확장 경계를 분리할 필요가 생길 때 검토합니다. 프레임워크 경계와 보안 경계는 함께 확인합니다.',language:'Python · API 응답 경계 모형',code:`# 실제 HTTP 서버 대신 요청 검증과 반환 범위를 보여주는 모형입니다.
def profile_response(authenticated, user):
    if not authenticated:
        return {"status": 401, "body": {"error": "로그인 필요"}}
    return {"status": 200, "body": {"name": user["name"]}}

user = {"name": "민수", "private_key": "서버 내부 값"}
print(profile_response(True, user))  # private_key는 응답에 없음`,answer:'브라우저 입력은 신뢰하지 않고 서버에서 구조·인증·권한과 업무 규칙을 검증하겠습니다. 비밀값과 DB 접근은 서버 안에서 처리하고 응답에는 필요한 최소 필드만 포함하겠습니다. 서버의 반환값도 브라우저에 도착하면 공개 데이터라는 점을 확인하겠습니다.',follow:[['프론트에서 검증했는데 서버에서도 해야 하나요?','사용자는 UI를 우회해 요청을 직접 보낼 수 있어 서버 검증이 필요합니다.'],['서버 응답에 비밀 키를 포함하면?','사용자가 응답을 읽을 수 있으므로 비밀이 노출됩니다.']],memory:'입력은 검증, 비밀은 서버, 응답은 최소.',mistake:'서버 안에서 만든 값이라고 응답으로 보내도 비밀이 유지되는 것은 아닙니다.',quiz:{question:'API 응답에 포함하면 안 되는 값은?',options:['공개 상품 이름','DB 관리자 비밀번호','사용자의 공개 별명'],correct:1,explanation:'DB 관리자 자격 증명은 서버 내부에서만 사용해야 합니다.'},refs:['kit']}),
l({id:'async',category:2,title:'비동기와 이벤트 루프',english:'Async I/O / Event Loop',hook:'서버 한 대가 요청 여러 개를 어떻게 기다릴까?',definition:'비동기는 작업 완료를 기다리는 동안 다른 작업의 진행을 허용하고 결과를 나중에 처리하는 방식입니다. Python asyncio의 이벤트 루프는 준비된 코루틴을 실행하고 await 지점에서 다른 작업에 실행 기회를 줍니다. await할 작업이 즉시 끝나면 반드시 전환되는 것은 아닙니다. 오래 걸리는 동기 계산과 블로킹 I/O는 같은 루프의 다른 요청을 지연시킬 수 있습니다.',analogy:'직원이 음식이 완성될 때까지 주방 앞에 서 있지 않고 다음 주문을 받는 방식입니다. 직원이 직접 반죽에 오래 붙잡히면 다른 주문을 받지 못합니다. 대기를 양보하는 것과 계산을 다른 일꾼에게 맡기는 것은 다릅니다.',steps:['요청을 받고 외부 I/O를 시작합니다.','대기 중인 I/O를 await하면 다른 작업에 실행 기회를 줍니다.','이벤트 루프가 다른 준비된 작업을 처리합니다.','I/O가 완료되면 후속 작업을 실행합니다.'],scenario:'사용자와 상품 조회가 독립적이면 asyncio.gather로 함께 기다릴 수 있습니다. 사용자 조회 결과로 주문을 찾아야 한다면 순서가 필요합니다. 무제한 동시 호출 대신 세마포어와 연결 풀 한도로 자원 사용을 제한합니다.',aws:'I/O 서버와 CPU 작업 워커를 분리하고 지표에 맞춰 확장합니다. CPU 작업은 별도 프로세스나 작업 큐를 검토하고 비동기 함수만으로 병렬 계산을 기대하지 않습니다.',ncloud:'웹 요청 처리 서버와 이미지 변환 등 작업 서버를 나누고 서버·컨테이너 수를 별도로 관리할 수 있습니다. 비동기 코드만으로 무한한 동시 처리가 가능해지는 것은 아닙니다.',tradeoff:'동시 I/O는 총 대기를 줄일 수 있지만 실패 처리와 자원 제한이 필요합니다. asyncio.gather는 기본 설정에서 첫 예외를 호출자에게 전달해도 다른 작업을 자동 취소하지 않습니다. 관련 작업의 수명과 취소를 함께 관리하려면 TaskGroup 같은 구조를 검토합니다.',language:'Python · asyncio 대기 동시 처리',code:`import asyncio
import time

async def lookup(name):
    await asyncio.sleep(0.1)  # 외부 I/O 대기를 흉내 냅니다.
    return {"name": name}

async def main():
    started = time.perf_counter()
    user, product = await asyncio.gather(lookup("user"), lookup("product"))
    print(user, product)
    print(round(time.perf_counter() - started, 2))  # 약 0.1초, 기기별 차이

asyncio.run(main())`,answer:'동기·비동기는 완료를 확인하거나 통지받는 방식, 블로킹·논블로킹은 호출자가 반환까지 기다리는지를 구분합니다. 이벤트 루프는 준비된 작업을 처리하고 I/O 대기 중 실행 기회를 양보합니다. 긴 동기 계산은 루프를 막을 수 있으므로 CPU 작업을 분리하고 I/O 동시성도 자원 한도에 맞추겠습니다.',follow:[['동시성과 병렬성의 차이는?','동시성은 여러 작업을 진행 중인 상태로 다루는 것이고, 병렬성은 실제로 같은 시간에 여러 작업을 실행하는 것입니다.'],['await를 쓰면 서버가 멈추나요?','해당 async 함수의 진행을 양보합니다. 모든 요청 처리가 멈추는 것은 아니지만 await 이전의 긴 동기 계산은 이벤트 루프를 막습니다.']],memory:'기다림은 양보, 계산은 점유.',mistake:'async 키워드가 CPU 작업을 자동으로 병렬화하지 않습니다.',quiz:{question:'Python asyncio 이벤트 루프를 오래 막을 가능성이 높은 작업은?',options:['비동기 I/O를 await','긴 동기 for문으로 이미지 계산','타이머 예약'],correct:1,explanation:'동기 CPU 계산은 이벤트 루프 스레드를 점유합니다.'},refs:['event']}),
l({id:'rest',category:2,title:'REST와 멱등성',english:'Resource / Idempotency',hook:'결제 버튼을 두 번 누르면 두 번 결제될까?',definition:'REST는 리소스와 표현, 무상태 요청, 일관된 인터페이스 등을 중심으로 하는 아키텍처 스타일입니다. HTTP API에서는 명사형 리소스 경로와 메서드를 활용합니다. 멱등성은 같은 요청을 여러 번 수행해도 의도된 서버 상태 효과가 한 번 수행한 것과 같다는 성질입니다. 응답이 언제나 같거나 로그가 한 번만 남는다는 뜻은 아닙니다.',analogy:'전등을 “켜라”는 명령은 여러 번 내려도 켜진 상태입니다. “스위치를 반전해라”는 명령은 두 번이면 다시 꺼집니다. 결제 요청은 기본적으로 반전 명령처럼 추가 효과가 생길 수 있어 “주문 A에 대한 결제 한 번”이라는 식별이 필요합니다.',steps:['요청에서 리소스·메서드·입력을 정의합니다.','서버에서 인증·인가·스키마를 검증합니다.','중복 수행이 위험하면 멱등성 키와 업무 데이터를 원자적으로 기록합니다.','재시도에는 기존 결과 또는 진행 상태를 반환합니다.'],scenario:'결제 서버가 결제 완료 후 응답을 보내기 전에 연결이 끊어질 수 있습니다. 클라이언트는 같은 멱등성 키로 재시도합니다. 서버는 DB unique 제약, 요청 내용 비교, 결제 제공자의 멱등성 기능을 조합합니다. 단순 메모리 Map은 재시작·서버 여러 대 환경에서 충분하지 않습니다.',aws:'ALB 뒤의 여러 서버가 같은 멱등성 저장소를 공유하도록 설계합니다. 타임아웃에 따른 재시도와 실제 업무 처리 완료는 별도로 추적합니다.',ncloud:'Load Balancer 뒤 서버들도 공통 DB 제약과 업무 식별자를 사용합니다. 특정 서버에만 중복 방지 기록을 두면 분산 후 실패할 수 있습니다.',tradeoff:'멱등성 기록 보관 기간, 같은 키에 다른 본문이 들어오는 경우, 처리 중 상태, 실패 후 재시도 정책을 명시해야 합니다.',language:'SQL · 중복 주문 방지의 한 요소',code:`CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  idempotency_key TEXT NOT NULL,
  request_hash TEXT NOT NULL,
  UNIQUE (user_id, idempotency_key)
);
-- 키와 요청 본문이 같은지 검사해야 합니다.
-- 외부 결제와 DB 커밋은 하나의 DB 트랜잭션으로 묶이지 않습니다.`,answer:'멱등성은 반복 요청의 의도된 상태 효과가 한 번과 같다는 성질입니다. PUT·DELETE는 의미상 멱등성을 가지지만 POST 결제는 별도 설계가 필요합니다. 사용자 범위의 멱등성 키와 요청 해시를 DB 제약으로 관리하고, 외부 결제의 멱등성·실패 복구까지 연결하겠습니다.',follow:[['DELETE가 두 번째에 404면 멱등성이 아닌가요?','리소스가 삭제된 최종 상태 효과는 같을 수 있습니다. 상태 코드 동일성으로 멱등성을 판단하지 않습니다.'],['GET에 데이터를 넣으면 안전한가요?','안전한 메서드는 의도된 상태 변경을 요청하지 않는다는 의미입니다. 조회 URL에 비밀 정보를 넣으면 로그·기록에 남을 수 있습니다.']],memory:'응답의 같음이 아니라 효과의 같음.',mistake:'HTTP 메서드 이름만 붙인다고 구현이 자동으로 멱등해지지 않습니다.',quiz:{question:'멱등성을 가장 잘 설명한 것은?',options:['모든 응답 코드가 같다','재시도 시간이 짧다','반복 요청의 의도된 상태 효과가 같다'],correct:2,explanation:'반복에 따른 서버 상태 효과를 기준으로 판단합니다.'},refs:['http','interview']}),
l({id:'proxy',category:2,title:'리버스 프록시와 타임아웃',english:'Reverse Proxy / Upstream',hook:'502와 504는 어디서 발생한 문제일까?',definition:'리버스 프록시는 서버 앞에서 요청을 받아 내부 서버로 전달합니다. TLS 종료, 라우팅, 부하 분산, 압축 등을 맡을 수 있습니다. 502는 게이트웨이가 상위 서버에서 유효한 응답을 받지 못한 경우, 504는 상위 서버 응답을 제때 받지 못한 경우입니다. 상태 코드만으로 원인을 단정하지 말고 프록시·앱·DB 흐름을 추적합니다.',analogy:'병원 접수대가 환자를 적절한 진료실로 보내는 구조입니다. 502는 진료실과 제대로 대화할 수 없었던 상황, 504는 정한 시간 안에 답이 오지 않은 상황에 가깝습니다. 접수대가 기다리는 시간을 늘리는 것만으로 진료가 느린 원인이 해결되지는 않습니다.',steps:['프록시가 외부 요청과 TLS 연결을 받습니다.','경로와 건강 상태에 따라 내부 서버를 선택합니다.','서버에 요청을 전달하고 제한 시간 내 응답을 기다립니다.','응답을 클라이언트로 전달하고 요청 ID·시간을 기록합니다.'],scenario:'DB 쿼리가 40초 걸리는데 프록시 타임아웃이 30초라면 사용자는 504를 봅니다. 앱은 여전히 일을 할 수 있습니다. 바깥쪽 제한 시간보다 내부 호출의 시간 예산을 짧게 정하고 취소·오류 반환·비동기 작업 전환을 검토합니다.',aws:'ALB의 리스너·대상 그룹·헬스 체크·타임아웃을 앱과 함께 설정합니다. 로드 밸런서 로그와 앱의 요청 ID를 연결해 실패 지점을 확인합니다.',ncloud:'Load Balancer의 리스너와 서버 포트·헬스 체크 경로가 맞는지 확인합니다. ACG에서 로드 밸런서로부터의 접근을 허용해야 합니다.',tradeoff:'신뢰할 프록시가 전달한 헤더만 사용해야 합니다. 아무 클라이언트의 X-Forwarded-For를 신뢰하면 IP 기반 판단이 위조될 수 있습니다.',language:'Nginx · 구성 예시',code:`server {
  listen 80;
  server_name localhost;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_read_timeout 30s;
  }
}
# 로컬 예시입니다. 운영 HTTPS·프록시 체인은 별도 구성하세요.`,answer:'리버스 프록시는 외부 요청을 받아 내부 서버에 전달하며 TLS 종료와 라우팅 등을 담당합니다. 502와 504가 발생하면 프록시 로그부터 대상 서버 상태, 연결, 앱 처리 시간, DB 지연을 요청 ID로 연결해 조사합니다. 타임아웃만 늘리지 않고 병목과 업무 재시도 안전성을 함께 확인합니다.',follow:[['프록시와 NAT는 같은가요?','둘 다 중간에 위치할 수 있지만 리버스 프록시는 요청을 받아 상위 서버에 전달하고, NAT는 패킷 주소를 변환합니다. 계층과 역할이 다릅니다.'],['헬스 체크가 성공인데 왜 장애인가요?','단순 프로세스 생존 체크만 성공하고 DB 등 의존성에 장애가 있을 수 있습니다. liveness·readiness와 사용자 경로 지표를 나눠 봅니다.']],memory:'앞단 → 연결 → 앱 → DB. 시간 예산은 안쪽부터.',mistake:'504가 곧 서버 프로세스 종료를 의미하는 것은 아닙니다.',quiz:{question:'504 발생 시 첫 대응으로 적절한 것은?',options:['타임아웃을 무조건 10배 증가','요청 경로별 지연과 로그 확인','DB를 인터넷에 공개'],correct:1,explanation:'어느 구간에서 시간 예산을 초과했는지 먼저 확인해야 합니다.'},refs:['http','sg']}),
l({id:'index',category:3,title:'인덱스와 실행 계획',english:'Database Index / Query Plan',hook:'행이 늘어나자 검색이 느려졌다면?',definition:'인덱스는 테이블 전체를 읽는 대신 조건에 맞는 위치를 빠르게 찾기 위한 보조 자료구조입니다. 일반적인 B-tree 인덱스는 정렬된 키를 통해 동등·범위 검색과 정렬을 돕습니다. 그러나 저장 공간과 쓰기 시 갱신 비용이 필요합니다. 옵티마이저는 조건의 선택도·통계·비용에 따라 인덱스를 쓰지 않고 순차 스캔을 선택할 수도 있습니다.',analogy:'책 뒤의 찾아보기입니다. “NAT”를 찾을 때 전체 책을 읽는 대신 페이지 번호로 이동합니다. 하지만 책 내용을 수정할 때마다 찾아보기도 수정해야 합니다. 거의 모든 페이지를 읽을 거라면 찾아보기를 거치지 않고 처음부터 읽는 편이 빠를 수도 있습니다.',steps:['느린 쿼리와 실제 조건·정렬을 수집합니다.','EXPLAIN으로 실행 계획을 확인합니다.','조건과 정렬에 맞는 인덱스를 설계합니다.','대표 데이터로 읽기 개선과 쓰기 비용을 측정합니다.'],scenario:'내 주문 목록은 WHERE user_id = ? ORDER BY created_at DESC 형태입니다. (user_id, created_at) 복합 인덱스를 검토합니다. 반환 컬럼, LIMIT, 데이터 분포에 따라 효과가 달라집니다. 운영 EXPLAIN ANALYZE는 쿼리를 실제 실행하므로 변경 쿼리에는 특히 주의합니다.',aws:'RDS 같은 관리형 DB에서도 쿼리와 인덱스는 애플리케이션 팀이 설계합니다. 인스턴스를 크게 만드는 전에 실행 계획과 연결 풀을 봅니다.',ncloud:'Cloud DB에서도 느린 쿼리·통계와 인덱스를 확인합니다. 관리형 운영이 비효율적인 쿼리를 자동으로 모두 고쳐주지는 않습니다.',tradeoff:'인덱스를 많게 만들면 읽기 후보는 늘지만 INSERT·UPDATE·DELETE와 저장 공간 부담이 커집니다. 사용하지 않는 인덱스와 중복 인덱스도 점검합니다.',language:'PostgreSQL · 조회 계획',code:`CREATE INDEX idx_orders_user_created
ON orders (user_id, created_at DESC);

EXPLAIN SELECT id, created_at
FROM orders WHERE user_id = 42
ORDER BY created_at DESC LIMIT 20;
-- 실제 스키마에 orders 테이블이 있어야 실행 가능합니다.`,answer:'인덱스는 조회 위치를 빠르게 찾는 보조 구조이며 읽기 속도와 쓰기 비용의 교환입니다. 느린 쿼리의 조건·정렬·데이터 분포를 확인하고 실행 계획으로 검증하겠습니다. 복합 인덱스의 순서는 접근 패턴에 맞추고, 인덱스가 있어도 항상 사용되는 것은 아니라는 점을 고려합니다.',follow:[['복합 인덱스 순서가 왜 중요한가요?','키가 지정한 컬럼 순서로 정렬되기 때문입니다. 선행 컬럼 조건과 범위·정렬 조건이 실제 탐색 범위를 결정합니다. 엔진별 최적화 가능성도 확인합니다.'],['인덱스가 있는데 느리면?','너무 많은 행 반환, 비효율적인 조인, 최신 통계 여부, 정렬·랜덤 I/O, 연결 대기 등을 실행 계획과 시간 지표로 확인합니다.']],memory:'찾아보기는 읽기를 돕고, 수정할 때 값을 치른다.',mistake:'모든 컬럼에 인덱스를 추가하는 것은 보편적인 성능 해결책이 아닙니다.',quiz:{question:'인덱스의 일반적인 비용은?',options:['쓰기 갱신과 추가 공간','HTTPS 해제','DNS 변경'],correct:0,explanation:'테이블 변경 때 인덱스도 관리해야 합니다.'},refs:['index']}),
l({id:'transaction',category:3,title:'트랜잭션과 동시성',english:'ACID / Isolation / Lock',hook:'마지막 재고 하나를 두 사람이 동시에 주문하면?',definition:'트랜잭션은 여러 DB 작업을 하나의 논리적 단위로 처리합니다. ACID는 원자성, 일관성, 격리성, 지속성입니다. 격리 수준은 동시에 실행되는 작업이 어떤 변경을 관찰할지 결정합니다. 읽고 나중에 수정하는 사이에 다른 요청이 끼어들 수 있으므로, 트랜잭션을 쓴다는 사실만으로 모든 경쟁 조건이 해결되지는 않습니다.',analogy:'계좌 A에서 돈을 빼고 B에 넣는 두 작업을 봉투 하나로 묶는 것입니다. 둘 중 하나만 완료되면 돈이 사라질 수 있어 모두 성공하거나 되돌려야 합니다. 그런데 여러 직원이 같은 장부를 동시에 수정하면 봉투만으로 부족하고, 잠금이나 조건 확인 같은 규칙이 필요합니다.',steps:['BEGIN으로 논리적 작업을 시작합니다.','제약·조건부 갱신·잠금으로 경쟁을 제어합니다.','모든 변경이 성공하면 COMMIT합니다.','실패하면 ROLLBACK하고 충돌·교착은 정책에 맞춰 재시도합니다.'],scenario:'재고를 먼저 SELECT한 뒤 무조건 1을 빼면 두 요청이 같은 재고를 볼 수 있습니다. UPDATE ... WHERE stock > 0 RETURNING으로 검증과 감소를 묶습니다. 반환 행이 없으면 품절입니다. 주문 생성도 같은 DB 트랜잭션에서 처리하고, 외부 결제 호출은 복구 전략을 별도로 설계합니다.',aws:'관리형 DB의 Multi-AZ와 트랜잭션 격리성은 다른 문제입니다. 고가용성 구성이 잘못된 재고 처리 로직을 해결하지는 않습니다.',ncloud:'Cloud DB에서도 트랜잭션 시간을 짧게 유지하고 엔진의 격리 수준과 잠금 동작을 확인합니다. 외부 API 대기 중 잠금을 오래 잡지 않습니다.',tradeoff:'강한 격리는 이상 현상을 줄이지만 충돌·재시도·성능 부담이 생길 수 있습니다. 업무 불변식을 정의하고 필요한 제약과 격리를 선택합니다.',language:'PostgreSQL · 조건부 갱신',code:`BEGIN;
UPDATE products SET stock = stock - 1
WHERE id = 7 AND stock > 0
RETURNING id, stock;
-- 반환 행이 있으면 같은 트랜잭션 안에서 주문 생성
-- 반환 행이 없으면 품절 처리 후 ROLLBACK
COMMIT;
-- 위 분기 판단은 애플리케이션에서 구현합니다.`,answer:'ACID는 전부 성공하거나 취소되는 원자성, 불변식을 유지하는 일관성, 동시 작업의 간섭을 제어하는 격리성, 커밋 후 보존되는 내구성입니다. 격리 수준에 따라 관찰 가능한 현상이 달라지고 구현도 엔진마다 다릅니다. PostgreSQL의 Serializable은 모든 요청을 하나의 잠금으로 직렬 실행하는 방식이 아닙니다. 동시 요청의 업무 불변식은 별도 제어가 필요합니다. 재고 감소는 조건부 UPDATE로 확인과 변경을 묶고 주문 저장을 같은 트랜잭션에 넣겠습니다. 필요한 경우 행 잠금이나 직렬화 격리를 쓰고 충돌 재시도와 외부 결제 복구도 설계합니다.',follow:[['ACID의 C는 무엇인가요?','정의된 제약과 불변식을 유지한다는 일관성입니다. 분산 시스템에서 복제본이 같은 값을 보느냐는 일관성과 문맥이 다릅니다.'],['교착 상태는 어떻게 줄이나요?','잠금 순서를 통일하고 작업 시간을 줄이며 적절한 인덱스를 사용합니다. 교착 실패가 생겨도 안전하게 재시도하도록 설계합니다.']],memory:'한 묶음 + 동시 접근 규칙. 트랜잭션만으로 끝나지 않는다.',mistake:'SELECT 후 UPDATE를 BEGIN으로 감쌌다고 자동으로 재고 초과 판매가 방지되지는 않습니다.',quiz:{question:'마지막 재고의 경쟁 조건을 줄이는 방법은?',options:['SELECT 후 조건 없이 감소','조건부 UPDATE와 반환 행 검사','프론트엔드 버튼만 비활성화'],correct:1,explanation:'서버·DB에서 검증과 변경을 원자적으로 수행해야 합니다.'},refs:['tx']}),
l({id:'cache',category:3,title:'캐시와 데이터 신선도',english:'Cache-aside / TTL / Invalidation',hook:'빠른 응답을 위해 언제까지 어제의 값을 보여줘도 될까?',definition:'캐시는 반복 계산이나 원본 조회 결과를 가까운 곳에 저장해 지연과 부하를 줄입니다. Cache-aside는 캐시를 조회하고 없으면 원본에서 읽어 저장하는 패턴입니다. TTL은 유효시간이며, 갱신·삭제 정책과 함께 데이터 신선도를 결정합니다. 브라우저 HTTP 캐시, CDN, 애플리케이션 Redis 캐시는 위치와 책임이 서로 다릅니다.',analogy:'자주 사용하는 반찬을 냉장고 앞칸에 둡니다. 편하지만 오래된 반찬인지 확인해야 합니다. 메뉴판은 잠시 예전 가격이어도 괜찮을 수 있지만 실제 결제 가격은 다시 확인해야 합니다. 어떤 데이터에 어느 정도의 오래됨을 허용할지 업무가 결정합니다.',steps:['사용자·권한·쿼리를 포함한 안전한 캐시 키를 만듭니다.','캐시 hit이면 저장된 값을 반환합니다.','miss이면 원본을 조회하고 TTL과 함께 저장합니다.','쓰기 후 무효화하고 동시 miss·장애·오래된 값 허용 정책을 관리합니다.'],scenario:'상품 설명은 1분 캐시해도 되지만 결제 직전 재고와 가격은 권위 있는 저장소에서 확인합니다. 모든 요청이 동시에 만료된 캐시를 조회하면 원본이 과부하되는 stampede가 생길 수 있습니다. TTL 분산과 단일 재생성, 필요하면 오래된 값 임시 제공을 설계합니다.',aws:'ElastiCache는 앱 데이터 캐시, CloudFront는 엣지 HTTP 캐시 용도로 검토합니다. 로그인 사용자별 응답이 공개 캐시에 섞이지 않도록 키와 Cache-Control을 확인합니다.',ncloud:'Cloud DB for Redis와 CDN 계열 서비스를 각각 앱 캐시·콘텐츠 배포에 맞춰 사용합니다. 인증된 응답은 공유 캐시 정책을 신중하게 정합니다.',tradeoff:'짧은 TTL은 신선도를 높이지만 원본 부하가 늘 수 있습니다. no-cache는 저장 금지가 아니라 재사용 전 검증을 요구하며, no-store는 저장하지 말라는 의미입니다.',language:'Python · 공개 응답 캐시 헤더 모형',code:`def public_catalog_response(items):
    return {"status": 200, "headers": {"Cache-Control": "public, max-age=60"},
            "body": {"items": items}}
print(public_catalog_response(["노트", "펜"]))
# 공개 목록만 캐시합니다. 개인 정보 응답에는 적용하지 않습니다.`,answer:'캐시는 지연과 원본 부하를 줄이지만 신선도와 무효화가 핵심입니다. 데이터별 허용 오래됨을 정하고 cache-aside, TTL, 쓰기 후 삭제를 적용하겠습니다. 동시 만료와 장애 시 원본 부하를 제한하며, 사용자별 데이터가 공유 캐시에 섞이지 않도록 키와 정책을 분리합니다.',follow:[['캐시가 죽으면요?','원본으로 무제한 우회하면 원본도 죽을 수 있습니다. 동시성 제한·회로 차단·부분 기능 제한과 허용 가능한 오래된 값 사용을 검토합니다.'],['캐시를 지워도 왜 예전 값이 보이나요?','이전 DB 조회가 뒤늦게 캐시를 다시 채우는 경쟁이나 다른 계층의 캐시가 있을 수 있습니다. 버전·갱신 순서·계층별 정책을 확인합니다.']],memory:'빠른 복사본에는 유효기간과 폐기 규칙이 필요하다.',mistake:'no-cache와 no-store를 같은 의미로 설명하지 마세요.',quiz:{question:'Cache-Control: no-cache의 의미는?',options:['절대 저장하지 않는다','다시 쓰기 전에 검증한다','영구 저장한다'],correct:1,explanation:'저장할 수 있지만 재사용 전에 서버 검증이 필요합니다.'},refs:['cache']}),
l({id:'queue',category:3,title:'메시지 큐와 재시도',english:'Producer / Consumer / At-least-once',hook:'주문은 빨리 받고, 이메일은 나중에 보낼 수 없을까?',definition:'메시지 큐는 생산자와 소비자 사이에서 작업을 보관하고 전달해 시간과 처리 속도를 분리합니다. 많은 시스템은 적어도 한 번 전달을 제공하므로 중복 처리가 가능하다고 가정해야 합니다. 큐에 넣었다는 사실은 작업 완료를 의미하지 않습니다. 영속성·확인 응답·재시도·순서 보장 조건은 선택한 제품과 구성에 따라 다릅니다.',analogy:'식당 주문 전표가 주방 대기 줄에 쌓이고 요리사가 차례로 처리합니다. 접수 직원은 요리가 끝날 때까지 기다리지 않아도 됩니다. 하지만 전표를 처리했는지 확인하지 못하면 같은 전표가 다시 나올 수 있어 주문 번호로 중복 조리를 막아야 합니다.',steps:['생산자가 업무 식별자와 필요한 데이터를 전송합니다.','소비자가 메시지를 받아 제한된 동시성으로 작업합니다.','성공한 작업은 확인 응답 또는 삭제합니다.','실패는 지수 백오프·지터로 재시도하고 반복 실패는 DLQ로 분리합니다.'],scenario:'주문 저장은 성공했는데 큐 전송 전에 앱이 죽으면 이메일 작업이 유실될 수 있습니다. DB의 주문과 outbox 행을 같은 트랜잭션으로 저장하고 별도 전달자가 큐에 보내는 패턴을 검토합니다. 전달자도 재전송할 수 있으므로 소비자는 주문 ID로 멱등하게 처리합니다.',aws:'SQS의 큐 유형·visibility timeout·DLQ를 작업 시간과 중복 정책에 맞춰 설정합니다. 소비자 처리 완료 전에 메시지를 삭제하지 않습니다.',ncloud:'메시징 또는 관리형 Kafka 서비스를 검토할 때 사용 가능한 상품과 전달·순서·확인 응답 의미를 확인합니다. 로그 스트림과 작업 큐의 소비 모델을 동일하게 가정하지 않습니다.',tradeoff:'큐는 부하를 완충하지만 지연과 운영 요소가 늘어납니다. 큐 깊이뿐 아니라 가장 오래된 메시지의 나이와 재시도 수를 봅니다.',language:'Python · 멱등 소비자의 개념 모형',code:`processed = set()  # 교육용: 운영에서는 공유 영속 저장소 사용

def consume(message):
    job_id = message["id"]
    if job_id in processed:
        return "already processed"
    # 실제 처리는 DB 제약과 원자성·외부 효과 복구가 필요
    processed.add(job_id)
    return "done"

print(consume({"id": "order-42"}))
print(consume({"id": "order-42"}))`,answer:'큐는 생산자와 소비자를 분리하고 순간 부하를 완충합니다. 중복 전달을 가정해 업무 ID로 멱등하게 처리하고 성공 후 확인 응답을 하겠습니다. 재시도 횟수와 DLQ, 처리 지연을 관리하며 DB 저장과 메시지 전송 사이의 유실은 outbox 패턴 등을 검토합니다.',follow:[['정확히 한 번 처리는 가능한가요?','제품의 보장 범위와 외부 부수 효과를 구별해야 합니다. 큐 내부 보장만으로 이메일·결제까지 정확히 한 번을 단정할 수 없습니다.'],['큐가 계속 길어지면?','생산 속도, 소비 속도, 실패 반복, 병목 자원을 확인합니다. 워커만 늘리면 DB가 더 과부하될 수 있으므로 의존성 한계도 확인합니다.']],memory:'접수와 완료는 다르다. 재전송을 예상하고 같은 일을 안전하게.',mistake:'큐를 사용했다는 이유만으로 메시지 유실·중복이 모두 사라지지는 않습니다.',quiz:{question:'적어도 한 번 전달 큐의 소비자는 무엇을 가정해야 하나요?',options:['메시지 중복 가능','중복 절대 없음','외부 결제 자동 원자성'],correct:0,explanation:'재전달에 대비해 멱등 처리가 필요합니다.'},refs:['queue','questions']}),
l({id:'vpc',category:4,title:'VPC · 서브넷 · 라우팅',english:'Virtual Private Cloud / CIDR',hook:'같은 클라우드 안에서 공개 서버와 비공개 DB를 어떻게 나눌까?',definition:'VPC는 클라우드 안에 구성하는 논리적 네트워크입니다. 서브넷은 IP 주소 범위를 나눈 구역이며 route table은 목적지별 다음 경로를 결정합니다. CIDR의 /숫자는 네트워크 주소 비트 수입니다. 예를 들어 IPv4 /24는 총 256개 주소를 포함하지만 클라우드 예약 주소 때문에 모두 리소스에 사용할 수 있는 것은 아닙니다. 공개·비공개는 이름보다 실제 경로와 주소, 정책으로 판단합니다.',analogy:'VPC는 캠퍼스, 서브넷은 건물, 라우팅 테이블은 길 안내 표지판, 보안 그룹은 출입 명단입니다. 길이 있다고 출입이 허용되는 것은 아니며 출입 명단에 있다고 길이 생기는 것도 아닙니다.',steps:['겹치지 않는 VPC 주소 범위를 정합니다.','가용 영역과 역할에 맞춰 서브넷을 나눕니다.','인터넷·NAT·사설 서비스 목적지의 경로를 설정합니다.','보안 규칙과 DNS를 설정하고 실제 연결을 확인합니다.'],scenario:'외부 요청은 공개 로드 밸런서가 받고 앱과 DB는 사설 영역에 둡니다. 앱의 외부 API 호출은 NAT로, DB 연결은 내부 주소로 보냅니다. VPC를 다른 조직 네트워크와 연결할 가능성이 있으면 처음부터 IP 범위 중복을 피해야 합니다.',aws:'공용 서브넷은 Internet Gateway로 향하는 경로가 있는 서브넷입니다. 인스턴스가 인터넷과 직접 통신하려면 필요한 공인 주소와 보안 정책도 맞아야 합니다.',ncloud:'VPC의 Subnet·Route Table·ACG·Network ACL을 역할에 맞게 설정합니다. NAT Gateway의 전용 서브넷 등 제품별 배치 조건을 구분하세요.',tradeoff:'네트워크를 너무 작게 잡으면 확장과 연결에 어려움이 생깁니다. 너무 넓게 열어 둔 정책은 역할 분리를 무의미하게 만듭니다.',language:'Python · CIDR 확인',code:`from ipaddress import ip_network, ip_address
network = ip_network("10.0.1.0/24")
print(network.num_addresses)  # 256
print(ip_address("10.0.1.42") in network)  # True
# 공급자의 예약 주소 수는 별도로 확인합니다.`,answer:'VPC는 논리 네트워크, 서브넷은 주소 구역, route table은 목적지별 경로입니다. 로드 밸런서는 공개 진입점으로 두고 앱·DB는 사설 영역으로 나누겠습니다. 외부 호출에는 NAT를 쓰고 보안 규칙은 필요한 주체·포트만 허용합니다. 라우팅과 접근 통제를 별도로 검증합니다.',follow:[['사설 서브넷이면 인터넷에 전혀 못 나가나요?','Public NAT 등 출구 경로가 있으면 외부 통신을 시작할 수 있습니다. 직접 공개 접근과 외부 호출을 구분합니다.'],['보안 그룹과 라우팅의 차이는?','라우팅은 어디로 보낼지, 보안 정책은 어떤 통신을 허용할지 정합니다. 둘 다 충족해야 통신할 수 있습니다.']],memory:'구역은 서브넷, 길은 라우팅, 출입은 보안 규칙.',mistake:'서브넷 이름을 private으로 지정하는 것만으로 비공개가 보장되지 않습니다.',quiz:{question:'IPv4 /24의 전체 주소 수는?',options:['24','256','사용 가능 주소가 항상 256'],correct:1,explanation:'전체 256개이며 예약 주소와 사용 가능 수는 다릅니다.'},refs:['sg','nat','ncloud']}),
l({id:'lb',category:4,title:'로드 밸런서와 가용성',english:'Load Balancer / Health Check',hook:'서버 한 대가 고장 나도 서비스를 계속하려면?',definition:'로드 밸런서는 여러 서버로 트래픽을 나누고 상태 확인을 통해 사용할 대상을 선택합니다. L4는 TCP·UDP 등 전송 계층, L7은 HTTP 경로·호스트 같은 애플리케이션 정보로 분기할 수 있습니다. 여러 서버가 있어도 같은 가용 영역이나 같은 DB 장애에 모두 묶이면 전체 서비스의 고가용성은 확보되지 않습니다.',analogy:'마트의 안내 직원이 열린 계산대로 손님을 보냅니다. 계산대가 닫히면 다른 곳으로 안내합니다. 하지만 계산대마다 장바구니 기록이 따로 있으면 손님이 옮겨갈 때 문제가 생기므로 공통 저장소 또는 상태 전달 규칙이 필요합니다.',steps:['외부 클라이언트는 로드 밸런서 주소로 접속합니다.','로드 밸런서는 건강한 대상 중 정책에 따라 선택합니다.','선택한 서버가 공통 데이터·세션 저장소와 통신합니다.','종료할 서버는 새 요청에서 제외하고 기존 요청을 마무리합니다.'],scenario:'세션을 서버 메모리에만 저장하면 다음 요청이 다른 서버로 갈 때 로그인이 풀릴 수 있습니다. 공통 세션 저장소를 쓰거나 토큰 검증을 설계합니다. sticky session은 임시 해결이 될 수 있지만 장애·재배포 때 세션을 잃는 근본 문제는 남습니다.',aws:'ALB의 대상 그룹과 헬스 체크를 설정하고 여러 가용 영역에 대상을 배치합니다. DB와 캐시도 서비스 요구에 맞는 장애 대응이 필요합니다.',ncloud:'Load Balancer의 대상 서버와 헬스 체크를 설정합니다. 가용 영역·존 지원 범위와 서비스별 이중화 구성을 확인해 공통 장애 지점을 줄입니다.',tradeoff:'헬스 체크가 너무 엄격하면 일시적인 의존성 장애로 모든 서버를 제외할 수 있습니다. 너무 단순하면 실제 실패 서버가 계속 트래픽을 받습니다.',language:'Python · 상태 확인 모형',code:`def health_response(process_alive, dependencies_ready):
    return {"liveness": 200 if process_alive else 503,
            "readiness": 200 if process_alive and dependencies_ready else 503}
print(health_response(True, False))
# 프로세스는 살아 있지만 DB 장애로 트래픽을 받을 준비가 안 된 상태`,answer:'로드 밸런서는 여러 건강한 서버로 요청을 분산합니다. 상태 없는 앱과 공통 세션 저장소를 구성하고 여러 가용 영역에 배치하겠습니다. 헬스 체크와 graceful shutdown으로 재배포 중 요청 손실을 줄이고, DB와 캐시 같은 공통 의존성의 장애까지 검토합니다.',follow:[['L4와 L7을 어떻게 선택하나요?','HTTP 경로·호스트 라우팅이 필요하면 L7을 검토하고, TCP·UDP 전달 등 전송 계층 요구라면 L4의 프로토콜 지원을 확인합니다.'],['서버만 두 대면 충분한가요?','공통 DB·가용 영역·네트워크·인증 시스템이 단일 장애 지점이면 충분하지 않습니다. 목표 가용성에 맞춰 전체 경로를 설계합니다.']],memory:'분산 + 건강 확인 + 상태 공유 + 장애 구역 분리.',mistake:'로드 밸런서가 애플리케이션의 병목을 자동으로 고쳐주지는 않습니다.',quiz:{question:'여러 앱 서버에서 로그인 유지에 적절한 방법은?',options:['한 서버 메모리만 사용','공통 세션 저장소·검증 설계','매번 다른 랜덤 쿠키'],correct:1,explanation:'어떤 대상 서버가 받아도 사용자 상태를 검증할 수 있어야 합니다.'},refs:['sg','auth']}),
l({id:'storage',category:4,title:'스토리지와 CDN',english:'Object / Block / File Storage',hook:'업로드한 사진을 앱 서버 디스크에만 저장해도 될까?',definition:'블록 스토리지는 디스크처럼 블록을 제공하고, 파일 스토리지는 폴더·파일 인터페이스를, 객체 스토리지는 키·내용·메타데이터 단위의 API를 제공합니다. 객체 스토리지는 일반적인 OS 파일 시스템과 동일하지 않습니다. CDN은 사용자 가까운 엣지에서 콘텐츠를 전달·캐시해 지연과 원본 부하를 줄입니다.',analogy:'블록 스토리지는 빈 책장, 파일 스토리지는 공유 서류함, 객체 스토리지는 번호로 맡기고 찾는 물품 보관소입니다. CDN은 자주 찾는 물건을 동네 지점에 미리 두는 방식입니다. 보관소에 물건이 있다고 모두에게 열어야 하는 것은 아닙니다.',steps:['파일 소유자와 크기·형식을 검증합니다.','객체 키를 충돌하지 않게 정하고 스토리지에 저장합니다.','DB에는 소유권·키·메타데이터를 기록합니다.','공개 콘텐츠는 CDN으로, 비공개 콘텐츠는 권한 검사·짧은 서명 URL로 제공합니다.'],scenario:'앱 서버 A의 로컬 업로드 폴더에만 저장하면 B에서는 사진을 찾지 못하고 재배포 시 없어질 수 있습니다. 파일은 공유 객체 저장소에, 메타데이터는 DB에 둡니다. 프리사인 URL은 짧은 유효시간과 대상 키·권한을 제한하고 업로드 완료 뒤 실제 파일을 검사합니다.',aws:'S3를 객체 저장소, EBS를 블록 스토리지, EFS를 파일 스토리지 예로 구분합니다. CloudFront 캐시와 객체 접근 정책을 함께 설계합니다.',ncloud:'Object Storage·Block Storage·NAS는 서로 다른 사용 방식을 가집니다. CDN 계열 서비스와 원본 접근을 구성할 때 공개 파일과 개인 파일을 분리합니다.',tradeoff:'캐시를 오래 쓰려면 파일명에 버전·해시를 넣어 변경 파일을 새 URL로 제공하는 방법이 유용합니다. 개인 파일 URL과 서명 토큰은 유출되지 않게 관리합니다.',language:'Python · 서버에서 정하는 객체 키',code:`from uuid import uuid4

def image_key(user_id):
    # user_id는 인증 후 서버에서 결정한 식별자입니다.
    return f"uploads/{user_id}/{uuid4().hex}.jpg"
print(image_key("user-42"))
# 실제 업로드 전 권한·용량·콘텐츠 형식을 검증합니다.`,answer:'앱 서버 로컬 디스크만 쓰면 확장·재배포에서 파일 일관성이 깨질 수 있습니다. 사용자 파일은 객체 스토리지에 저장하고 DB에서 소유권과 키를 관리하겠습니다. 공개 콘텐츠는 CDN과 버전 URL로 제공하고, 비공개 파일은 권한 확인 후 제한된 서명 URL을 발급합니다.',follow:[['CDN 무효화는 언제 필요한가요?','같은 URL의 내용을 변경했는데 캐시가 남은 경우입니다. 버전 URL로 교체하면 기존 캐시와 충돌을 줄일 수 있습니다.'],['서명 URL이면 영구적으로 안전한가요?','유효시간 안에는 URL 소지자가 접근할 수 있는 권한처럼 작동할 수 있습니다. 만료·대상·메서드 제한과 로그 노출 방지를 적용합니다.']],memory:'파일은 공유 보관소, 소유권은 DB, 가까운 사본은 CDN.',mistake:'객체 스토리지를 로컬 디스크의 완전한 대체로 가정하면 경로·동시 수정·메타데이터 동작에서 문제가 생깁니다.',quiz:{question:'앱 서버를 여러 대로 늘릴 때 업로드 파일의 적절한 위치는?',options:['첫 번째 서버 임시 폴더','브라우저 메모리만','공유 객체 저장소와 소유권 DB'],correct:2,explanation:'앱 재배포와 서버 선택에 영향을 받지 않도록 공유 저장소를 사용합니다.'},refs:['storage','cache']}),
l({id:'docker',category:4,title:'컨테이너와 실행 환경',english:'Image / Container / Virtual Machine',hook:'“내 컴퓨터에서는 되는데”를 줄이는 방법은?',definition:'이미지는 실행에 필요한 파일과 의존성을 담은 템플릿이고 컨테이너는 그 이미지로 실행된 격리된 프로세스입니다. 보통 호스트 커널을 공유하며 가상 머신처럼 별도 게스트 OS 전체를 부팅하는 것과 다릅니다. 컨테이너는 환경 재현을 돕지만 네트워크·권한·영속 데이터·비밀값은 별도로 관리해야 합니다.',analogy:'레시피와 재료 꾸러미가 이미지, 그 꾸러미로 실제 요리하는 주방 작업이 컨테이너입니다. 같은 레시피로 여러 작업을 만들 수 있지만 주문 장부까지 매번 새로 만들면 데이터가 사라집니다. 영속 데이터는 별도 저장소로 분리합니다.',steps:['의존성과 빌드를 재현할 수 있는 이미지를 만듭니다.','실행 시 환경 변수와 필요한 권한을 주입합니다.','포트와 상태 확인·자원 제한을 설정합니다.','컨테이너를 교체해도 남을 데이터는 외부 볼륨·DB에 둡니다.'],scenario:'Python 서버 코드와 필요한 의존성을 이미지에 넣어 같은 실행 환경을 구성할 수 있습니다. .env·클라우드 키를 이미지에 COPY하지 않습니다. 이미지는 버전·다이제스트로 식별하고 롤백 가능한 이전 이미지를 보관합니다.',aws:'ECS·EKS 등의 컨테이너 실행 환경을 검토할 수 있습니다. 이미지 저장과 실행 권한을 분리하고 최소 권한과 비밀값 주입을 적용합니다.',ncloud:'Container Registry와 Kubernetes 등 실행 환경의 역할을 구분합니다. Kubernetes는 컨테이너 실행·배치 도구이며 DB 백업이나 앱의 정확성을 자동으로 보장하지 않습니다.',tradeoff:'가상 머신보다 가볍게 여러 프로세스를 배치할 수 있지만 호스트 커널을 공유합니다. 보안 경계·운영 복잡도·팀 역량에 따라 배포 방식을 고릅니다.',language:'Dockerfile · Python 실행 환경 예시',code:`FROM python:3.13-slim
WORKDIR /app
COPY app.py ./app.py
USER 10001:10001
CMD ["python", "app.py"]
# app.py는 자신의 Python 서버 코드입니다.
# 외부 의존성이 있다면 버전을 고정해 설치하고 서버 포트를 구성합니다.`,answer:'컨테이너는 이미지로 실행한 격리된 프로세스이며 보통 호스트 커널을 공유합니다. 이미지로 의존성을 고정해 배포 환경 차이를 줄이고, 비밀값은 실행 시 주입하며 영속 데이터는 외부에 둡니다. 최소 권한·자원 제한·상태 확인과 이미지 롤백을 함께 설계합니다.',follow:[['컨테이너를 삭제하면 데이터는요?','컨테이너의 쓰기 계층에만 둔 데이터는 잃을 수 있습니다. 볼륨이나 외부 DB·객체 저장소에 영속화합니다.'],['이미지에 비밀값을 넣고 나중에 지우면?','이전 이미지 레이어나 빌드 기록에 남을 수 있습니다. 처음부터 포함하지 않고 유출 시 자격 증명을 교체해야 합니다.']],memory:'이미지는 꾸러미, 컨테이너는 실행, 데이터는 밖에.',mistake:'컨테이너와 가상 머신을 같은 격리 방식이라고 설명하지 마세요.',quiz:{question:'컨테이너에 대한 설명으로 맞는 것은?',options:['항상 별도 커널을 부팅한다','보통 호스트 커널을 공유한다','컨테이너 삭제로 DB 백업이 된다'],correct:1,explanation:'컨테이너와 가상 머신의 중요한 차이입니다.'},refs:['docker']}),
l({id:'session',category:5,title:'쿠키 · 세션 · JWT',english:'Authentication / Authorization',hook:'로그인했다는 사실과 볼 권한이 있다는 사실은 같을까?',definition:'인증은 누구인지 확인하고 인가는 무엇을 할 수 있는지 결정합니다. 쿠키는 브라우저의 저장·전송 수단, 세션은 서버 측 사용자 상태를 관리하는 방식입니다. JWT는 서명 검증 가능한 클레임 형식으로, 일반적인 서명 JWT의 본문은 암호화된 비밀 저장소가 아닙니다. 쿠키에 세션 ID 또는 토큰을 넣을 수 있어 쿠키와 JWT는 대체 관계만으로 설명할 수 없습니다.',analogy:'출입증은 신원 확인, 연구실별 허가 목록은 인가입니다. 출입증을 가진 학생이 모든 연구실에 들어갈 수는 없습니다. 또한 출입증 겉면에 비밀을 적으면 다른 사람이 읽을 수 있는 것처럼 서명 토큰의 내용을 비밀로 생각하면 안 됩니다.',steps:['자격 증명을 검증하고 안전한 세션을 만듭니다.','HttpOnly·Secure·SameSite 정책으로 쿠키를 설정합니다.','매 요청에서 세션 또는 토큰을 검증합니다.','리소스 소유권과 작업 권한을 서버에서 검사합니다.'],scenario:'GET /orders/42에 로그인만 확인하면 다른 사용자의 주문을 볼 수 있습니다. 요청 사용자의 ID와 주문 소유자를 서버에서 비교해야 합니다. 로그아웃·탈취·비밀번호 변경 시 세션 무효화와 토큰 만료·철회 정책도 설계합니다.',aws:'세션 저장소 또는 관리형 인증 서비스를 검토하고 앱 내부 리소스 인가는 별도 구현합니다. 짧은 토큰 수명과 키 회전·검증 조건을 정합니다.',ncloud:'공통 세션 저장소와 서비스별 사용자 권한을 구성합니다. 클라우드 관리 콘솔 권한과 웹 서비스의 고객 권한은 서로 다른 범위입니다.',tradeoff:'서버 세션은 즉시 철회가 쉽지만 저장소가 필요합니다. JWT는 분산 검증이 편하지만 만료 전 철회·클레임 변경·키 관리가 필요합니다.',language:'Python · 쿠키 응답 헤더 모형',code:`from http.cookies import SimpleCookie
cookie = SimpleCookie()
cookie["session"] = "서버가 생성한_임의_세션_ID"
cookie["session"]["httponly"] = True
cookie["session"]["secure"] = True
cookie["session"]["samesite"] = "Lax"
cookie["session"]["path"] = "/"
print(cookie.output())
# 실제 세션 저장소·로그인 검증·만료 처리는 별도로 구현합니다.`,answer:'인증은 신원, 인가는 작업 권한입니다. 쿠키는 전송 수단이고 세션은 상태 관리 방식이며 JWT는 서명된 클레임 형식입니다. 서버에서 세션과 리소스 소유권을 매번 확인하고 안전한 쿠키 정책을 적용하겠습니다. JWT를 쓸 때도 본문 노출과 만료·철회·검증 조건을 관리합니다.',follow:[['HttpOnly가 XSS를 막나요?','JavaScript가 해당 쿠키 값을 읽는 것을 제한하지만 XSS 자체나 사용자 권한으로 요청하는 공격까지 모두 막지는 않습니다.'],['JWT는 암호화되어 있나요?','일반적인 JWS 형식은 서명되어 있을 뿐 본문을 읽을 수 있습니다. 암호화 JWT인 JWE는 별도 형식입니다.']],memory:'누구인가 = 인증, 해도 되는가 = 인가. 서명은 비밀이 아니다.',mistake:'로그인 검사만 하고 리소스 소유권을 확인하지 않는 오류를 피하세요.',quiz:{question:'일반적인 서명 JWT에 넣으면 안 되는 것은?',options:['만료 시각','사용자 식별자','비밀번호'],correct:2,explanation:'서명 JWT의 본문은 비밀 저장소가 아닙니다.'},refs:['auth']}),
l({id:'cors',category:5,title:'CORS와 CSRF',english:'Cross-Origin / Cross-Site Request Forgery',hook:'CORS를 켜면 공격 요청이 전부 차단될까?',definition:'CORS는 다른 출처의 응답을 브라우저 JavaScript가 읽도록 허용하는 HTTP 헤더 기반 체계입니다. 출처는 scheme·host·port 조합입니다. 요청 종류에 따라 preflight가 먼저 발생하지만 일부 요청은 실제 전송될 수 있어 CORS를 인증 방어로 쓰면 안 됩니다. CSRF는 브라우저가 자동 전송하는 쿠키 등을 악용해 사용자가 의도하지 않은 상태 변경 요청을 보내게 하는 공격입니다.',analogy:'CORS는 다른 학교 학생에게 성적표를 보여줘도 되는지에 관한 열람 규칙입니다. CSRF는 누군가 학생을 속여 본인 도장으로 신청서를 제출시키는 문제입니다. 열람을 막았다고 신청서 제출까지 모두 막혔다고 생각하면 안 됩니다.',steps:['다른 출처 요청에 대해 허용 출처·메서드·헤더를 정합니다.','필요한 요청은 OPTIONS preflight로 허용 조건을 확인합니다.','쿠키 인증 요청에는 SameSite·CSRF 토큰·Origin 검증 등 방어를 적용합니다.','서버에서는 CORS와 무관하게 인증·인가를 수행합니다.'],scenario:'개발 UI localhost:5173과 API localhost:3000은 다른 출처입니다. 가능하면 개발 프록시나 같은 출처 배치를 사용합니다. 자격 증명을 포함하는 CORS에서는 wildcard 출처를 사용할 수 없으며 허용 목록과 Vary: Origin을 함께 설계합니다.',aws:'API Gateway나 앱 서버에서 필요한 클라이언트 출처만 허용합니다. 엣지에서 캐시한다면 Origin별 응답이 섞이지 않도록 캐시 키와 헤더를 확인합니다.',ncloud:'로드 밸런서만 설치했다고 앱의 CORS·CSRF가 자동 해결되지는 않습니다. 실제 API 응답과 브라우저 preflight를 확인합니다.',tradeoff:'모든 출처 허용은 공개 읽기 API에 쓰일 수 있지만 사용자 데이터와 쿠키 인증 API에 그대로 적용하면 안 됩니다. CORS는 curl 등 서버 클라이언트의 접근을 제한하는 인증 장치가 아닙니다.',language:'Python · 공개 읽기 API 헤더 모형',code:`headers = {"Access-Control-Allow-Origin": "https://study.example.com",
           "Vary": "Origin"}
print(headers)
# 허용 출처는 서버가 정합니다. 임의 Origin을 그대로 반사하지 않습니다.
# CORS는 브라우저의 응답 읽기 정책이며 서버 인증·CSRF 방어가 아닙니다.`,answer:'CORS는 브라우저의 교차 출처 응답 읽기 정책이며 서버 인증 장치가 아닙니다. 일부 요청은 CORS 오류가 나도 전송될 수 있습니다. 쿠키를 사용하는 상태 변경에는 SameSite와 CSRF 토큰·Origin 검증 등을 적용하고 모든 요청에서 서버 인가를 수행하겠습니다.',follow:[['curl은 되는데 브라우저만 안 되면?','브라우저 CORS 정책과 preflight 응답을 확인합니다. 서버 연결·인증·프록시 오류와 구분합니다.'],['GET으로 상태를 바꿔도 되나요?','GET은 안전한 조회 의미를 지켜야 합니다. 상태 변경을 GET으로 구현하면 링크·프리패치·CSRF 등의 위험이 커집니다.']],memory:'CORS는 읽기 허용, CSRF는 위조된 행동 방어.',mistake:'CORS 오류가 요청이 서버에 전혀 도착하지 않았다는 뜻은 아닙니다.',quiz:{question:'CORS가 직접 제한하는 것은?',options:['모든 인터넷 클라이언트의 접속','브라우저 JS의 교차 출처 응답 읽기','DB 관리자 권한'],correct:1,explanation:'인증과 서버 인가를 대체하지 않습니다.'},refs:['cors']}),
l({id:'iam',category:5,title:'IAM과 최소 권한',english:'Identity and Access Management',hook:'앱이 파일을 읽는데 관리자 키까지 필요할까?',definition:'IAM은 클라우드 리소스에 대해 어떤 주체가 어떤 작업을 할 수 있는지 관리합니다. 최소 권한은 필요한 대상·행동·조건만 허용하는 원칙입니다. 사람 계정과 워크로드 권한은 분리하고 가능한 경우 임시 자격 증명과 역할을 사용합니다. 네트워크 보안 규칙은 통신 경로·포트를, IAM은 서비스 API의 작업 권한을 다루므로 서로 대체하지 않습니다.',analogy:'청소 담당자에게 전 건물의 금고 열쇠를 주지 않고 맡은 구역의 출입권만 줍니다. 문이 열려 있어도 장부를 수정할 권한이 생기는 것은 아닙니다. 네트워크 출입과 서비스 작업 권한을 분리해서 생각하세요.',steps:['사람과 서버 등 주체를 구분합니다.','필요한 리소스·행동·조건을 목록화합니다.','역할·임시 자격 증명·최소 정책을 적용합니다.','사용 기록을 감사하고 불필요한 권한·키를 제거합니다.'],scenario:'이미지 제공 서버에는 지정된 객체 경로의 읽기 권한만 필요합니다. 버킷 삭제·계정 관리 권한은 필요하지 않습니다. GitHub에 키가 올라갔다면 커밋을 지우는 것만으로 끝내지 않고 키를 폐기·교체하고 접근 기록을 확인합니다.',aws:'워크로드에는 지원 환경의 IAM role과 임시 자격 증명을 사용하고 사람 계정은 MFA와 연합 인증을 검토합니다. 루트 계정을 일상 업무에 쓰지 않습니다.',ncloud:'Sub Account와 역할·정책을 통해 사람과 서비스의 권한을 제한합니다. Ncloud의 인증·정책 모델에 맞춰 자격 증명 수명과 감사 기록을 관리합니다.',tradeoff:'너무 넓은 wildcard 정책은 설정이 쉬워도 유출 피해를 크게 만듭니다. 반대로 최소 권한을 유지하려면 사용 목적과 변경 절차를 명확하게 해야 합니다.',language:'AWS IAM · 읽기만 허용하는 정책 예시',code:`{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::example-study-bucket/public/*"
  }]
}
// 실제 버킷 이름과 요구 작업에 맞게 검토 후 사용합니다.`,answer:'IAM은 주체가 리소스에 수행할 작업을 통제합니다. 사람과 서버 권한을 분리하고 최소 작업·대상만 허용하겠습니다. 가능한 경우 역할과 임시 자격 증명을 사용하고 MFA·감사·키 회전을 관리합니다. 네트워크 보안 그룹과 서비스 API 권한을 별도 검증합니다.',follow:[['키가 유출되면 어떻게 하나요?','키를 즉시 비활성화·교체하고 사용 기록과 변경 리소스를 조사합니다. 파일·Git 기록 제거와 재발 방지 검사를 함께 수행합니다.'],['403이면 보안 그룹 문제인가요?','요청이 서비스에 도달해 권한 거부 응답을 받은 경우 IAM·리소스 정책·인증 조건을 조사합니다. 연결 자체의 실패와 구별합니다.']],memory:'누가 / 무엇을 / 어디까지 / 언제까지.',mistake:'접속이 안 될 때 관리자 권한을 영구 부여하는 식으로 해결하지 마세요.',quiz:{question:'파일 읽기 서버에 적절한 권한은?',options:['계정 전체 관리자','지정 객체의 읽기만','모든 버킷 삭제'],correct:1,explanation:'작업과 대상을 최소 범위로 제한합니다.'},refs:['iam','sg']}),
l({id:'validation',category:5,title:'입력 검증과 비밀 관리',english:'Validation / SQL Injection / Secret',hook:'프론트에서 검사했으니 서버는 믿어도 될까?',definition:'사용자 입력은 브라우저 검사를 거쳤더라도 서버에서 다시 검증해야 합니다. 공격자는 UI를 우회해 HTTP 요청을 직접 보낼 수 있습니다. 구조·타입·길이·허용 값·업무 권한을 확인하고, SQL은 값을 문자열에 이어 붙이지 않고 파라미터로 전달합니다. 비밀번호는 복호화할 필요가 없는 검증용 해시로 관리하고 API 키는 별도 비밀 관리 체계에 둡니다.',analogy:'매장 입구에서 가방을 확인했더라도 창고 출입 담당자가 신분을 다시 확인하는 것입니다. 가격표를 고객이 써서 제출하게 만들면 안 됩니다. 클라이언트는 상품 ID와 수량을 보내고 실제 가격·할인·권한은 서버가 결정합니다.',steps:['본문 크기·Content-Type을 제한하고 파싱 오류를 처리합니다.','타입·길이·범위와 허용 필드를 검증합니다.','사용자의 작업 권한과 서버 기준 업무 값을 확인합니다.','파라미터 쿼리·안전한 출력·비밀값 비노출을 적용합니다.'],scenario:'상품 주문에 price: 1을 보내더라도 서버는 신뢰하지 않고 DB의 상품 가격을 읽습니다. 업데이트 요청을 DB 객체에 그대로 펼치면 isAdmin 같은 허용하지 않은 필드가 변경될 수 있으므로 허용 필드를 명시합니다.',aws:'Secrets Manager 등 비밀 관리 수단과 실행 역할을 검토합니다. 로그에는 토큰·비밀번호·전체 인증 헤더를 남기지 않습니다.',ncloud:'비밀값을 관리할 수 있는 서비스 또는 통제된 배포 환경에 보관하고 소스·빌드 이미지·브라우저 번들에 포함하지 않습니다. 서비스 지원 조건을 확인합니다.',tradeoff:'검증은 SQL 파라미터화나 출력 이스케이프를 대체하지 않습니다. 여러 방어가 서로 다른 경계의 위험을 줄입니다.',language:'Python · 서버 입력 검증 모형',code:`def validate_order(data):
    if not isinstance(data, dict):
        raise ValueError("객체를 보내세요")
    quantity = data.get("quantity")
    # bool은 int의 하위 타입이므로 정수만 허용하려면 type으로 구별합니다.
    if type(quantity) is not int or not 1 <= quantity <= 100:
        raise ValueError("수량은 1~100의 정수입니다")
    return {"quantity": quantity}  # 허용한 필드만 반환
print(validate_order({"quantity": 2, "is_admin": True}))
# 가격과 구매 권한은 DB와 인증 정보로 서버에서 결정합니다.`,answer:'브라우저 검사는 사용성을 돕지만 신뢰 경계는 서버입니다. 서버에서 타입·길이·허용 필드·권한을 검사하고 가격 같은 업무 값은 서버 기준으로 계산하겠습니다. SQL은 파라미터화하고 비밀값은 소스와 응답·로그에서 제외하며 비밀번호는 적절한 전용 해시로 관리합니다.',follow:[['SQL 입력에서 따옴표만 지우면 되나요?','문자 삭제 규칙으로 쿼리 구조를 안전하게 보장하기 어렵습니다. 파라미터 쿼리를 사용하고 식별자 같은 동적 구조는 허용 목록으로 제한합니다.'],['환경 변수면 무조건 비밀인가요?','브라우저 공개 접두사, 빌드 직렬화, 응답·로그 출력 등에 따라 노출될 수 있습니다. 실행 위치와 전달 경계를 확인해야 합니다.']],memory:'입력은 검증, 쿼리는 파라미터, 가격은 서버, 비밀은 밖으로 보내지 않기.',mistake:'클라이언트가 보낸 userId나 isAdmin을 권한의 근거로 믿지 마세요.',quiz:{question:'결제 가격을 결정할 데이터는?',options:['사용자가 보낸 price','브라우저 숨김 필드','서버의 상품·할인 정보'],correct:2,explanation:'클라이언트 값을 업무의 권위 있는 값으로 사용하면 안 됩니다.'},refs:['validation','kit','iam']}),
l({id:'scale',category:6,title:'스케일링과 병목',english:'Scale-up / Scale-out / Backpressure',hook:'서버를 늘렸는데 왜 DB가 더 느려졌을까?',definition:'Scale-up은 한 자원의 CPU·메모리 등을 키우고, scale-out은 인스턴스 수를 늘립니다. 확장 효과는 현재 병목과 공유 의존성에 따라 달라집니다. 앱 서버마다 연결 풀을 크게 두면 서버 수 증가가 DB 연결 수 폭증으로 이어질 수 있습니다. 처리 능력을 넘는 요청을 제한하는 backpressure도 서비스 안정성에 필요합니다.',analogy:'식당 계산대를 늘려도 주방이 하나라면 음식은 빨라지지 않습니다. 주문만 더 빨리 쌓입니다. 진짜 병목이 계산인지 조리인지 먼저 측정하고, 처리 가능한 양만 받아야 전체가 무너지지 않습니다.',steps:['지연·처리량·오류·포화 지표로 병목을 찾습니다.','단일 자원 크기 증가와 수평 확장을 비교합니다.','공유 세션·연결 풀·파일 저장 경계를 정리합니다.','부하 테스트로 한계를 확인하고 자동 확장·요청 제한을 설정합니다.'],scenario:'서버 10대에 DB pool을 각 50으로 잡으면 최대 500 연결이 생깁니다. DB가 이 수를 감당하는지 확인해야 합니다. 요청마다 연결을 새로 만들지 않고 풀을 사용하되, 총 연결 예산을 서버 수와 함께 정합니다.',aws:'Auto Scaling 지표는 CPU만이 아니라 요청 수·큐 대기·지연 등 워크로드에 맞춰 선택합니다. 늘어난 인스턴스의 준비 시간과 축소 시 연결 종료도 고려합니다.',ncloud:'Auto Scaling과 Load Balancer를 함께 구성할 때 준비 완료 조건·최소 수·최대 수·증감 정책을 정합니다. DB·외부 API의 한계를 따로 관리합니다.',tradeoff:'Scale-up은 단순하지만 한계와 장애 집중이 있습니다. Scale-out은 상태·관측·배포 운영이 복잡해집니다. 비용 목표도 함께 정합니다.',language:'Python · DB 연결 예산',code:`db_budget = 200
reserved = 40
max_app_servers = 8
pool_per_server = (db_budget - reserved) // max_app_servers
print(pool_per_server)  # 20
# 모든 서비스·워커·관리 연결도 전체 예산에 포함합니다.`,answer:'먼저 병목 지표를 측정하고 자원 증가와 서버 수 증가를 비교하겠습니다. 수평 확장에서는 세션·파일을 공유 저장소에 두고 DB 연결 총량과 외부 API 한계를 관리합니다. 자동 확장뿐 아니라 요청 제한과 backpressure로 과부하가 의존성 전체로 번지는 것을 막습니다.',follow:[['CPU가 낮은데 느리면?','DB·네트워크·연결 풀 대기나 락 경쟁일 수 있습니다. 요청 구간별 시간과 포화 지표를 확인합니다.'],['오토스케일링이면 피크를 항상 막나요?','준비 시간과 최대 용량 제한이 있습니다. 최소 여유 용량·큐·rate limit·성능 계획을 함께 사용합니다.']],memory:'늘리기 전에 막힌 곳 찾기. 앱 수 × 풀 크기 = 전체 연결.',mistake:'서버 수를 늘리면 모든 종류의 병목이 해결된다고 가정하지 마세요.',quiz:{question:'DB 연결 풀 30개인 앱 서버가 6대라면 앱의 최대 연결 후보 수는?',options:['30','180','6'],correct:1,explanation:'서버 수와 서버별 풀 크기를 곱해 전체 예산을 봅니다.'},refs:['sre']}),
l({id:'cicd',category:6,title:'CI/CD와 안전한 배포',english:'Continuous Integration / Delivery',hook:'새 버전을 배포하다 실패하면 어떻게 돌아갈까?',definition:'CI는 변경을 자주 통합하며 자동 검사로 문제를 발견하는 과정이고, CD는 배포 가능한 결과를 준비하거나 자동 배포하는 흐름입니다. 파이프라인의 성공과 실제 서비스 정상은 다릅니다. 점진 배포·헬스 체크·관측·롤백 가능한 산출물과 호환되는 DB 변경을 함께 설계해야 합니다.',analogy:'교정 → 인쇄 → 작은 서점에 먼저 배송 → 반응 확인 → 전체 배송 순서입니다. 책 파일을 예전 버전으로 돌릴 수 있어도 독자가 적어 둔 장부를 지우면 복구가 되지 않습니다. 코드 롤백과 데이터 복구를 구분하세요.',steps:['변경마다 타입·테스트·빌드를 자동 확인합니다.','같은 버전의 재현 가능한 산출물을 생성합니다.','작은 트래픽 또는 일부 서버부터 배포합니다.','지연·오류·업무 지표를 확인하고 진행·중단·롤백합니다.'],scenario:'컬럼을 바로 삭제하면 구 버전 앱이 실패합니다. 먼저 새 컬럼을 추가하고 양쪽 버전과 호환되는 코드를 배포한 뒤 데이터 이전과 정리를 순차 진행하는 expand-contract를 검토합니다. 롤백 중에도 새 데이터가 구 코드와 호환되는지 확인합니다.',aws:'CodePipeline 등 도구 또는 GitHub Actions로 검사·이미지 생성·배포를 연결할 수 있습니다. 배포 권한은 대상 환경에 한정하고 장기 키보다 임시 인증을 검토합니다.',ncloud:'Source 계열 개발 도구나 외부 CI를 선택해 빌드·배포를 자동화할 수 있습니다. 현재 상품 지원과 배포 대상 인증 방식은 공식 문서를 확인합니다.',tradeoff:'블루그린은 빠른 전환·복귀를 돕지만 추가 자원이 필요합니다. 카나리는 작은 영향으로 검증하지만 의미 있는 지표와 트래픽 분배가 필요합니다.',language:'GitHub Actions · Python 검사 단계',code:`name: python-check
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-python@v5
        with:
          python-version: '3.13'
      - run: python -m unittest discover -s tests
# 프로젝트의 tests 폴더에 표준 unittest 테스트가 있을 때 사용합니다.`,answer:'CI로 변경의 타입·테스트·빌드를 자동 검증하고 동일한 산출물을 점진 배포하겠습니다. 배포 후 실제 오류율·지연·업무 지표를 확인하고 실패 시 이전 버전으로 복귀합니다. DB 변경은 구·신 버전 호환을 유지하는 단계적 변경으로 진행해 코드 롤백이 가능하게 합니다.',follow:[['파이프라인이 성공했는데 장애면?','검사가 놓친 환경·데이터·의존성 차이와 실제 사용자 경로를 확인합니다. 배포 후 관측과 중단 기준이 필요합니다.'],['무중단은 요청 하나도 안 끊기나요?','준비 완료, 기존 연결 drain, 앱 종료 처리, 클라이언트 재시도까지 필요합니다. 배포 전략 이름만으로 보장하지 않습니다.']],memory:'검사 → 같은 산출물 → 조금 배포 → 관측 → 확대 또는 복귀.',mistake:'DB 파괴적 변경 뒤 코드만 롤백하면 복구된다고 생각하지 마세요.',quiz:{question:'구 버전도 실행 중인 배포에서 안전한 스키마 변경은?',options:['사용 중 컬럼 즉시 삭제','호환되는 추가 후 단계적 이전','DB를 매번 초기화'],correct:1,explanation:'구·신 버전의 공존을 고려하는 단계적 변경이 필요합니다.'},refs:['cicd','docker','sre']}),
l({id:'observability',category:6,title:'로그 · 메트릭 · 트레이스',english:'Observability / Golden Signals',hook:'“사이트가 느려요”를 어떤 숫자와 경로로 설명할까?',definition:'로그는 개별 사건, 메트릭은 집계된 수치, 트레이스는 요청이 여러 컴포넌트를 통과한 경로와 시간을 기록합니다. 지연·트래픽·오류·포화는 서비스 상태를 보는 대표 축입니다. 평균만 보면 일부 사용자의 긴 대기를 놓칠 수 있어 p95·p99 같은 백분위 지연과 실패 요청을 분리해 확인합니다.',analogy:'택배의 사건 기록이 로그, 하루 지연 건수 그래프가 메트릭, 한 택배가 물류센터를 지나간 시간표가 트레이스입니다. 그래프로 이상을 발견하고 시간표로 막힌 구간을 찾고 개별 기록으로 이유를 확인합니다.',steps:['사용자 경험과 관련된 정상 기준·SLO를 정합니다.','요청 ID를 전 구간에 전달하고 비밀값을 제외한 구조화 로그를 남깁니다.','오류율·백분위 지연·처리량·포화 지표를 수집합니다.','실행 가능한 경보와 트레이스로 병목을 조사합니다.'],scenario:'평균 100ms라도 1% 사용자가 10초 대기할 수 있습니다. 느린 요청의 DB 구간인지 외부 API 구간인지 트레이스로 확인합니다. 사용자 이메일처럼 종류가 무한히 늘어나는 값을 메트릭 label에 넣으면 비용과 저장 부담이 커지므로 집계 차원을 제한합니다.',aws:'CloudWatch 로그·메트릭과 분산 추적 수단을 연결할 수 있습니다. 인프라 지표만 보지 않고 앱의 성공·실패 기준을 함께 수집합니다.',ncloud:'Cloud Insight 등 관측 도구와 앱의 구조화 로그·추적을 연결합니다. 서비스·인스턴스·요청 ID로 장애 구간을 좁힙니다.',tradeoff:'모든 본문을 로깅하면 비용과 개인 정보 위험이 커집니다. 샘플링·보관 기간·민감값 제거와 필요한 조사 범위를 균형 있게 정합니다.',language:'Python · 구조화 로그 모형',code:`import json
import time
from uuid import uuid4
started = time.perf_counter()
print(json.dumps({"request_id": uuid4().hex, "route": "/api/orders",
                  "status": 200, "duration_ms": round((time.perf_counter()-started)*1000, 2)}))
# 토큰·비밀번호·전체 요청 본문은 기록하지 않습니다.`,answer:'메트릭으로 오류율·지연·트래픽·포화의 이상을 감지하고 트레이스로 느린 구간을 찾은 뒤 요청 ID의 로그로 원인을 확인하겠습니다. 평균 외에 p95·p99와 실패 요청도 보고, 사용자 경험 기준의 SLO와 실행 가능한 경보를 설정합니다. 비밀 정보와 높은 카디널리티도 제한합니다.',follow:[['경보가 너무 많이 울리면?','사용자 영향과 대응 필요성 중심으로 경보를 줄이고 지속시간·중복 억제·담당·대응 절차를 정합니다.'],['p99는 무슨 뜻인가요?','관찰한 요청의 99%가 해당 시간 이하에 완료됐다는 뜻입니다. 관측 기간과 표본·집계 방식도 함께 확인합니다.']],memory:'숫자로 감지 → 경로로 위치 → 기록으로 이유.',mistake:'평균 응답 시간 하나만으로 모든 사용자 경험이 좋다고 판단하지 마세요.',quiz:{question:'요청 한 건이 어느 서비스에서 오래 걸렸는지 찾는 데 가장 직접적인 것은?',options:['분산 트레이스','전체 CPU 평균만','DNS 이름 변경'],correct:0,explanation:'구간별 요청 시간을 연결해 병목 위치를 찾습니다.'},refs:['sre']}),
l({id:'recovery',category:6,title:'장애 대응과 백업',english:'RTO / RPO / Restore / Postmortem',hook:'백업 파일이 있으면 복구할 수 있다고 말해도 될까?',definition:'RTO는 복구에 허용할 시간 목표, RPO는 허용 가능한 데이터 손실의 시간 범위 목표입니다. 복제는 가용성을 돕지만 잘못된 삭제도 복제될 수 있어 백업과 다릅니다. 백업은 존재 여부뿐 아니라 실제 복원 가능성·암호화 키·권한·소요 시간까지 검증해야 합니다. 목표는 서비스와 업무 영향에 맞춰 정합니다.',analogy:'문서를 다른 컴퓨터에 실시간 동기화하면 실수로 지운 내용도 함께 지워질 수 있습니다. 특정 시점으로 돌아갈 사본과 그 사본을 여는 열쇠가 있어야 합니다. 사본을 복원하는 데 하루가 걸리면 1시간 복구 목표를 충족하지 못합니다.',steps:['장애 영향·시작 시점·최근 변경을 확인합니다.','배포 중단·롤백·우회 등으로 사용자 영향을 먼저 줄입니다.','데이터 손상 여부와 목표 시점에 따라 복구합니다.','정확성을 검증하고 원인·개선·담당·기한을 기록합니다.'],scenario:'주문 테이블을 잘못 삭제했다면 복제본도 영향을 받았을 수 있습니다. 기존 백업과 시점 복구 가능 범위를 확인하고 별도 환경에서 복원합니다. 누락 주문·중복 결제·외부 시스템 상태를 대조한 뒤 서비스 전환을 판단합니다.',aws:'RDS 백업·시점 복구와 별도 계정·리전 사본 등을 업무 요구에 맞춰 검토합니다. 관리형 기능이 있어도 복구 시나리오와 접근 권한을 직접 검증해야 합니다.',ncloud:'Cloud DB의 백업·복구 지원 범위와 보관 정책을 확인하고 실제 복원 훈련을 수행합니다. 동일 계정·존 장애에서 사본과 키를 사용할 수 있는지도 확인합니다.',tradeoff:'낮은 RTO·RPO는 더 많은 자원·복제·자동화·훈련을 요구할 수 있습니다. 필요한 업무부터 우선순위를 정하고 복구 비용을 합의합니다.',language:'Python · 복구 목표 계산',code:`backup_interval_minutes = 60
restore_minutes = 25
validation_minutes = 15
print('예시 복구 시간:', restore_minutes + validation_minutes)
print('주기 백업만 있을 때 손실 창 상한 예시:',
      backup_interval_minutes)
# 전송 지연·백업 실패·로그 기반 복구 등 실제 조건은 별도 반영`,answer:'RTO는 복구 시간, RPO는 허용 데이터 손실 범위의 목표입니다. 복제와 백업은 목적이 다르므로 시점 복구와 별도 사본을 설계하겠습니다. 장애 시 사용자 영향을 먼저 줄이고 데이터·외부 효과를 검증합니다. 실제 복원 훈련으로 목표 충족을 확인하고 사후 분석의 개선 작업을 추적합니다.',follow:[['백업이 정상인데 복구가 실패하면?','키·권한·호환 버전·완전성·의존성 문제가 있을 수 있습니다. 주기적인 실제 복원과 데이터 검증이 필요합니다.'],['장애 원인 분석에서 무엇을 기록하나요?','영향, 시간표, 탐지·완화·복구 과정, 기술·절차의 기여 원인, 재발 방지 작업과 담당·기한을 기록합니다. 개인 비난보다 시스템 개선을 목표로 합니다.']],memory:'RTO는 언제 살아나는가, RPO는 어디까지 잃어도 되는가.',mistake:'복제본과 백업을 같은 것으로 생각하지 마세요.',quiz:{question:'RPO 10분이 의미하는 것은?',options:['복구가 반드시 10분 안에 완료','허용 데이터 손실 시간 범위 목표가 10분','백업 용량 10MB'],correct:1,explanation:'복구 시간 목표는 RTO입니다.'},refs:['recovery','sre']})
];
const operatingSystem: Lesson[] = [
l({id:'process',category:1,title:'프로세스와 스레드',english:'Process / Thread / Context Switch',hook:'서버 프로그램을 여러 개 실행하는 것과 스레드를 늘리는 것은 어떻게 다를까?',definition:'프로그램은 실행할 코드이고, 프로세스는 OS가 자원과 주소 공간을 부여해 실행하는 단위입니다. 스레드는 프로세스 안의 실행 흐름입니다. 일반적인 스레드는 코드·힙 등 자원을 공유하고 각자의 스택을 사용합니다. CPU는 준비된 작업을 스케줄링하고 실행 대상을 바꾸며, 문맥 교환에는 상태 저장·복구와 캐시 영향 등의 비용이 있습니다.',analogy:'프로세스는 독립 식당, 스레드는 한 식당의 요리사입니다. 요리사마다 작업 순서 메모는 따로 있지만 냉장고와 주문 장부는 공유합니다. 같은 재료를 동시에 마지막 하나라고 가져가면 문제가 생기므로 공유 자원에는 협업 규칙이 필요합니다.',steps:['프로세스가 생성되어 코드·메모리·파일 등 자원을 받습니다.','스레드가 명령을 수행하고 필요하면 I/O를 기다립니다.','스케줄러가 준비된 실행 흐름에 CPU 시간을 배분합니다.','공유 상태에 대한 갱신은 잠금·원자 연산·메시지 등으로 조율합니다.'],scenario:'Python 서버를 프로세스 여러 개로 실행하면 일반 메모리의 세션 저장소도 각자 따로 생깁니다. 같은 프로세스의 스레드는 힙을 공유하지만 각 실행 흐름의 지역 상태와 공유 자원의 동기화를 구별해야 합니다. CPU 처리와 장애 격리, 상태 공유 필요성을 기준으로 구조를 정합니다.',aws:'EC2나 컨테이너에서 여러 워커를 실행할 때 CPU·메모리 제한과 프로세스 수를 함께 정합니다. 인스턴스 수 증가와 내부 워커 수 증가는 서로 다른 확장 단위입니다.',ncloud:'Server·컨테이너에서도 OS 프로세스와 스레드의 원리는 같습니다. 앱·작업 워커를 나눌 때 각각의 자원과 재시작 정책을 설정합니다.',tradeoff:'스레드의 자원 공유는 통신을 쉽게 하지만 데이터 경쟁과 장애 영향을 키울 수 있습니다. 프로세스 분리는 격리를 돕지만 통신·메모리 비용을 고려해야 합니다.',language:'Python · 스레드 실행 흐름',code:`from threading import Thread, Lock
counter = 0
lock = Lock()

def work():
    global counter
    for _ in range(1000):
        with lock:
            counter += 1

workers = [Thread(target=work) for _ in range(2)]
for worker in workers: worker.start()
for worker in workers: worker.join()
print(counter)  # 2000
# Python 런타임의 GIL·free-threaded 설정과 병렬성은 별도 확인`,codeNotes:['ThreadPoolExecutor의 결과에서 PID가 같은지, 스레드 이름이 나뉘는지 확인합니다.','ProcessPoolExecutor의 결과에서 부모와 다른 PID를 관찰합니다. 프로세스 사이의 입력·반환값은 전달 과정이 필요합니다.','이 예시는 구조를 관찰하는 코드입니다. 작은 계산에서는 프로세스를 만드는 비용이 계산보다 클 수 있습니다.'],answer:'프로세스는 자원과 주소 공간을 가진 실행 단위이고 스레드는 그 안의 실행 흐름입니다. 스레드는 힙 등을 공유하지만 스택은 각자 가집니다. 공유 상태에는 동기화가 필요하고 문맥 교환도 비용이 있습니다. 서버 설계에서는 장애 격리·CPU 처리·메모리와 통신 비용을 비교해 프로세스와 워커 수를 선택하겠습니다.',follow:[['스레드를 많이 만들면 항상 빠른가요?','CPU 수·I/O 대기·공유 락·문맥 교환에 따라 달라집니다. 무제한 생성 대신 제한된 워커 풀과 측정을 사용합니다.'],['프로세스끼리는 정보를 못 나누나요?','파이프·소켓·공유 메모리·외부 DB 등 IPC와 저장소를 통해 공유할 수 있습니다. 다만 일반 변수는 독립 주소 공간에 있습니다.']],memory:'프로세스는 식당, 스레드는 요리사. 공유 냉장고에는 규칙.',mistake:'스레드 수와 CPU 코어 수를 동일시하지 마세요.',quiz:{question:'일반적인 같은 프로세스의 스레드가 공유하는 것은?',options:['모든 스택 변수','힙과 전역 자원','별도 컴퓨터의 디스크만'],correct:1,explanation:'힙·전역 자원은 공유하며 각 실행 흐름의 스택은 구분됩니다.'},refs:['threads','pyThreads','pyProcesses','pyPool']}),
l({id:'memory',category:1,title:'메모리와 OOM',english:'Virtual Memory / RSS / Out of Memory',hook:'메모리 사용률이 높으면 무조건 누수일까?',definition:'가상 메모리는 프로세스에 주소 공간을 제공하고 실제 메모리와의 대응을 관리하는 방식입니다. RSS는 현재 물리 메모리에 올라온 페이지의 크기를 보는 지표입니다. OS는 파일 캐시에도 메모리를 쓰므로 free가 낮다는 사실만으로 누수를 단정하면 안 됩니다. 사용 가능한 메모리, 프로세스 증가 추세, 스왑과 제한을 함께 봅니다. OOM은 필요한 메모리를 확보하지 못하는 상황입니다.',analogy:'책상 위가 RAM, 서랍이 디스크라고 생각하세요. 모든 문서를 한 번에 책상에 올릴 필요 없이 필요한 부분을 가져옵니다. 쓰지 않는 서류도 치울 수 있어 보이는 빈자리만으로 공간 부족을 판단하면 안 됩니다. 누수는 더 이상 쓸 일이 없는 서류가 계속 버려지지 않는 상황에 가깝습니다.',steps:['프로세스가 가상 주소 공간에서 메모리를 요청합니다.','필요한 페이지를 실제 메모리에 배치하거나 매핑합니다.','GC 런타임은 도달 가능한 객체를 기준으로 메모리를 관리합니다.','호스트·컨테이너 제한과 실제 사용량을 넘으면 할당 실패·종료가 발생할 수 있습니다.'],scenario:'요청마다 배열에 로그를 계속 넣고 비우지 않으면 참조가 살아 있어 GC도 회수하지 못할 수 있습니다. 대용량 파일 전체를 한 번에 읽는 대신 작은 청크로 나눠 처리하면 최고 메모리를 줄일 수 있습니다. peak와 장기 추세를 구분하고 heap snapshot은 민감 데이터와 중단 비용을 고려해 수집합니다.',aws:'인스턴스 메모리와 컨테이너 메모리 제한, 런타임 메모리 사용을 구별합니다. 메모리 지표와 종료 원인을 함께 보고 단순 재시작 반복보다 증가 원인을 조사합니다.',ncloud:'Server나 Kubernetes에서 메모리 사용·컨테이너 OOMKilled·재시작 횟수를 확인합니다. 애플리케이션 캐시 크기와 처리 동시성을 제한합니다.',tradeoff:'캐시 확대와 동시성 증가는 성능을 높일 수 있지만 메모리도 늘립니다. 과도한 스왑은 지연을 크게 만들 수 있어 용량과 작업 크기를 설계해야 합니다.',language:'Python · 추가 할당량 관찰',code:`import tracemalloc
tracemalloc.start()
values = [str(i) for i in range(10_000)]
current, peak = tracemalloc.get_traced_memory()
print({"current_KiB": round(current / 1024), "peak_KiB": round(peak / 1024)})
del values
tracemalloc.stop()
# 추적 시작 이후의 Python 할당량입니다. RSS·전체 프로세스 메모리는 아닙니다.`,answer:'가상 메모리는 주소 공간과 물리 메모리 대응을 관리합니다. 메모리 장애를 조사할 때 사용 가능한 메모리와 RSS·힙·외부 메모리, 제한과 증가 추세를 구별하겠습니다. 누수는 불필요한 객체 참조가 남는지 확인하고 파일 스트리밍·캐시 제한·동시성 제어로 최고 사용량을 줄이겠습니다.',follow:[['GC가 있으면 누수가 없나요?','아닙니다. 사용하지 않아도 참조가 유지된 객체는 회수되지 않을 수 있습니다. 무제한 캐시·리스너·전역 배열 등을 확인합니다.'],['힙과 RSS는 왜 다르나요?','프로세스 물리 메모리는 Python 객체 외에 스택·네이티브 할당·버퍼·코드 등을 포함할 수 있습니다. 한 지표만 보면 원인을 놓칠 수 있습니다.']],memory:'주소 공간 ≠ 물리 사용량. 빈 공간보다 사용 가능량과 추세.',mistake:'OS의 파일 캐시를 무조건 애플리케이션 메모리 누수로 해석하지 마세요.',quiz:{question:'GC가 있는데도 누수가 생길 수 있는 이유는?',options:['불필요한 객체의 참조가 남는다','HTTPS 때문','DNS TTL이 길어서'],correct:0,explanation:'도달 가능한 객체는 실제로 더 이상 쓰지 않더라도 회수되지 않을 수 있습니다.'},refs:['memory','pyMemory']}),
l({id:'linux',category:1,title:'Linux 권한과 서비스',english:'UID / GID / rwx / Signal',hook:'권한 오류를 chmod 777로 해결해도 괜찮을까?',definition:'Linux는 사용자·그룹과 파일 권한으로 접근을 통제합니다. 기본 rwx 권한은 소유자·그룹·기타에 대해 읽기·쓰기·실행을 지정하며 디렉터리의 실행 권한은 탐색 가능성과 관련됩니다. 앱은 필요한 권한만 가진 서비스 사용자로 실행합니다. SIGTERM은 종료 요청을 처리할 기회를 주고 SIGKILL은 잡아서 정리할 수 없는 강제 종료 신호입니다.',analogy:'사무실 서류함에는 소유 직원·팀·외부인의 열람과 수정 권한이 다릅니다. 문이 안 열린다고 누구나 수정할 수 있게 열면 접근 오류는 사라져도 사고 위험이 커집니다. 퇴근 안내를 받고 장부를 정리하는 것이 SIGTERM, 즉시 전원을 끊는 상황이 SIGKILL에 가깝습니다.',steps:['실행 프로세스의 UID·GID와 파일 소유권을 확인합니다.','필요한 파일·디렉터리 권한과 상위 경로 접근을 확인합니다.','서비스 관리자에서 실행 사용자·환경·재시작 정책을 설정합니다.','종료 시 새 요청을 멈추고 기존 요청·연결을 제한 시간 안에 정리합니다.'],scenario:'Python 서버가 업로드 디렉터리에 쓰지 못하면 실제 실행 사용자를 먼저 확인합니다. root로 바꾸거나 전체 777로 열기 전에 지정 폴더의 소유권과 그룹 권한을 맞춥니다. 실행 파일·설정은 앱이 함부로 수정할 수 없게 하고 비밀 설정은 최소 주체만 읽게 합니다.',aws:'Linux EC2에서도 OS 파일 권한과 IAM은 별도입니다. IAM에서 S3 읽기를 허용해도 로컬 설정 파일을 읽을 권한이 없을 수 있습니다.',ncloud:'Linux Server의 서비스 계정·파일 권한과 Sub Account의 클라우드 권한을 구분합니다. 시스템 서비스가 실패하면 실행 사용자·환경 변수·로그를 확인합니다.',tradeoff:'최소 권한은 침해 시 피해 범위를 줄이지만 배포·쓰기 폴더·로그 권한을 명확하게 구성해야 합니다. 서비스 자동 재시작은 반복 실패의 원인 조사를 대신하지 않습니다.',language:'Linux · 읽기 전용 진단 명령',code:`id
ls -ld /srv /srv/app
ls -l /srv/app
ps -eo pid,user,comm
# systemd 기반 서버에서 서비스가 존재할 때
systemctl status your-app --no-pager
journalctl -u your-app -n 50 --no-pager
# 로그를 공유할 때 비밀값과 개인 정보를 제거합니다.`,answer:'Linux 파일 권한은 사용자·그룹과 rwx로 관리하며 서비스는 최소 권한 계정으로 실행하겠습니다. 접근 오류는 실행 사용자·소유권·상위 디렉터리 권한을 확인하고 필요한 범위만 수정합니다. 배포 종료에는 SIGTERM으로 요청 정리 시간을 주고 강제 종료와 자동 재시작 로그도 관리합니다.',follow:[['chmod 644의 뜻은?','소유자는 읽기·쓰기 6, 그룹과 기타는 읽기 4입니다. 실행 권한은 없습니다. 디렉터리에 적용할 때는 탐색 권한이 없다는 점도 고려해야 합니다.'],['kill은 항상 강제 종료인가요?','kill은 신호를 보내는 명령이며 기본은 SIGTERM입니다. kill -9는 SIGKILL로 정리 기회를 주지 않습니다.']],memory:'누가 실행하는지 먼저. 읽기 4·쓰기 2·실행 1.',mistake:'모든 권한 문제를 root 실행이나 chmod 777로 해결하지 마세요.',quiz:{question:'chmod 644의 소유자 권한은?',options:['읽기·쓰기','읽기·실행','모든 실행만'],correct:0,explanation:'6은 읽기 4와 쓰기 2의 합입니다.'},refs:['linux']}),
l({id:'diagnosis',category:1,title:'서버 연결 장애 진단',english:'DNS / Socket / Port / Route / Application',hook:'“접속이 안 돼요”를 어디부터 확인할까?',definition:'서버 연결은 이름 해석, 경로, 정책, 리스닝 소켓, TLS, HTTP, 업무 처리의 여러 단계를 거칩니다. 소켓은 애플리케이션이 통신하는 인터페이스이며 IP·포트·프로토콜이 연결을 구분하는 핵심 정보입니다. 127.0.0.1에만 listen한 서버는 원격에서 직접 접근할 수 없습니다. 0.0.0.0은 모든 로컬 IPv4 인터페이스에 바인딩하는 의미이며 접속 목적지 주소로 쓰는 개념과 구별합니다.',analogy:'친구를 만나려면 주소가 맞는지, 길이 있는지, 입구가 열렸는지, 친구가 방에서 기다리는지, 대화가 가능한지 순서로 확인합니다. 집 안에서 친구를 만날 수 있다고 외부 입구까지 정상이라는 뜻은 아닙니다.',steps:['DNS가 기대한 주소를 반환하는지 확인합니다.','서버에서 프로세스와 리스닝 IP·포트를 확인합니다.','클라이언트와 서버 사이 라우팅·방화벽·보안 정책을 확인합니다.','TLS·HTTP 응답과 앱·DB 오류를 요청 ID로 조사합니다.'],scenario:'서버 내부 curl은 성공하지만 외부에서 실패하면 localhost 바인딩, 포트 노출, 방화벽·ACG·보안 그룹, 로드 밸런서 대상 설정을 확인합니다. connection refused는 대상에서 연결이 거부된 단서이고 timeout은 경로·필터링·응답 지연 등 후보가 있어 하나로 단정하지 않습니다.',aws:'EC2의 공인 주소·route table·보안 그룹·NACL과 ALB 대상 포트를 확인합니다. 포트를 인터넷 전체에 열기보다 정상 요청 주체에 필요한 통신만 허용합니다.',ncloud:'Server의 IP·서브넷 Route Table·ACG·Network ACL, Load Balancer의 리스너·헬스 체크를 구분해 확인합니다. NAT는 사용자 진입점의 대체가 아닙니다.',tradeoff:'한 번에 여러 설정을 바꾸면 원인을 알기 어렵습니다. 한 단계씩 증거를 모으고 변경 전후를 비교하며, 점검 명령 결과에는 민감 정보가 포함될 수 있습니다.',language:'Linux · 로컬 서비스 조회',code:`# 현재 listen 중인 TCP 소켓을 읽습니다.
ss -lnt
# 로컬 앱 HTTP 응답 확인
curl -i --max-time 5 http://127.0.0.1:3000/api/health
# 도메인 조회 확인
nslookup example.com
# 인터페이스와 경로 확인
ip address
ip route
# 설치된 배포판의 명령 지원 여부를 확인합니다.`,answer:'접속 실패는 DNS, 경로·정책, 리스닝 IP·포트, TLS, HTTP와 앱 처리 단계로 나눠 조사하겠습니다. 서버 내부 요청과 외부 요청을 비교하고 ss로 실제 바인딩을 확인합니다. 한 번에 모든 포트를 열지 않고 원인을 좁힌 뒤 필요한 설정만 변경하겠습니다.',follow:[['ping이 되면 웹 서비스도 정상인가요?','ICMP 응답과 HTTP 포트·TLS·업무 처리는 별개입니다. 반대로 ICMP가 차단되어도 웹은 정상일 수 있습니다.'],['0.0.0.0으로 바인딩하면 안전한가요?','수신 인터페이스 범위를 넓히는 것입니다. 보안 정책·인증·배포 네트워크와 함께 결정해야 합니다.']],memory:'이름 → 길·문 → 대기 중인 앱 → TLS·HTTP → 업무.',mistake:'ping 실패만 보고 웹 서버 장애를 확정하지 마세요.',quiz:{question:'서버 내부 요청만 성공하고 외부가 실패할 때 확인할 사항은?',options:['localhost 바인딩과 네트워크 정책','HTML 글자 크기만','SQL 인덱스 이름만'],correct:0,explanation:'수신 인터페이스와 외부 접근 경로가 내부 요청과 다를 수 있습니다.'},refs:['socket','sg']})
];
const additions: Lesson[] = [
l({id:'sync',category:1,title:'락과 동기화 도구',english:'Mutex / Semaphore / Condition Variable',hook:'스레드 두 개가 같은 숫자를 1씩 올렸는데 왜 합이 모자랄까?',definition:'여러 스레드가 같은 데이터를 동시에 바꾸면 실행 순서에 따라 결과가 달라지는 경쟁 상태가 생깁니다. counter += 1처럼 한 줄로 보이는 코드도 읽기·계산·쓰기 세 단계라 중간에 다른 스레드가 끼어들 수 있습니다. 동기화 도구는 이 끼어들기를 통제합니다. 뮤텍스(락)는 한 번에 한 스레드만 임계 구역에 들어가게 하고 세마포어는 동시에 들어갈 수 있는 수를 N개로 제한합니다. 조건 변수는 "재고가 생길 때까지"처럼 어떤 조건이 참이 될 때까지 잠들어 기다리게 합니다.',analogy:'화장실 열쇠가 하나뿐인 카페를 떠올리세요. 열쇠를 가진 사람만 들어갈 수 있으니 뮤텍스입니다. 주차장 입구의 "남은 자리 3"은 세마포어입니다. 자리가 0이면 차는 차단기 앞에서 기다립니다. 진동벨을 받고 음식이 나올 때까지 앉아서 기다리는 것은 조건 변수입니다. 계속 카운터를 들여다보지 않아도 준비되면 깨워 줍니다.',steps:['여러 스레드가 함께 읽고 쓰는 데이터(공유 상태)를 찾습니다.','그 데이터를 바꾸는 코드 구간을 임계 구역으로 정하고 하나의 락으로 감쌉니다.','동시 접근 수만 제한하면 될 때는 세마포어, 조건을 기다려야 할 때는 조건 변수를 씁니다.','락을 여러 개 잡아야 하면 항상 같은 순서로 잡아 교착 상태를 막고 락 안에서는 느린 I/O를 하지 않습니다.'],scenario:'주문 서버가 메모리에 쿠폰 잔여 수량을 들고 있습니다. 요청이 몰리자 잔여 1개인 쿠폰이 두 명에게 발급됐습니다. 두 스레드가 거의 동시에 잔여 수량 1을 읽고 각자 0으로 바꿨기 때문입니다. 확인과 차감을 하나의 락 안에 넣어 해결했습니다. 서버를 여러 대로 늘린 뒤에는 프로세스 안의 락이 다른 서버를 막지 못하므로 DB의 조건부 UPDATE로 옮겼습니다.',aws:'EC2나 ECS에서 인스턴스를 여러 개 띄우면 각 프로세스의 락은 서로를 모릅니다. 여러 서버가 함께 지켜야 하는 규칙은 RDS의 행 잠금과 조건부 UPDATE, DynamoDB의 조건부 쓰기처럼 공유 저장소의 원자적 연산으로 옮깁니다.',ncloud:'Server나 Kubernetes Service에서 파드를 여러 개 띄울 때도 마찬가지입니다. Cloud DB의 트랜잭션과 잠금, Redis의 원자 명령으로 여러 인스턴스 사이의 동시성을 다룹니다.',tradeoff:'락은 정확성을 주지만 그만큼 스레드가 줄을 서므로 처리량이 줄어듭니다. 락 범위를 너무 넓히면 병렬성이 사라지고 너무 잘게 나누면 락을 여러 개 잡다가 교착 상태가 생깁니다. 공유 상태 자체를 줄이는 설계(큐로 한 스레드에게 넘기기, 불변 데이터)가 가장 확실한 방법일 때가 많습니다.',language:'Python · 락 없는 증가와 락 있는 증가',code:`from threading import Thread, Lock
import time

stock = {"coupon": 1}
lock = Lock()
issued = []

def issue(name):
    with lock:  # 확인과 차감을 한 덩어리로 묶습니다
        if stock["coupon"] > 0:
            time.sleep(0.01)  # 다른 스레드가 끼어들 틈을 일부러 만듭니다
            stock["coupon"] -= 1
            issued.append(name)

threads = [Thread(target=issue, args=(n,)) for n in ("A", "B", "C")]
for t in threads: t.start()
for t in threads: t.join()
print(issued, stock)  # 발급은 한 명뿐이고 재고는 0입니다`,codeNotes:['with lock: 줄을 지우고 실행하면 세 스레드가 모두 잔여 1을 보고 발급해 재고가 음수가 됩니다.','time.sleep은 실제 서버의 DB 조회나 계산처럼 확인과 차감 사이에 걸리는 시간을 흉내 냅니다.','이 락은 한 프로세스 안에서만 유효합니다. 서버가 여러 대면 DB나 Redis의 원자적 연산이 필요합니다.'],answer:'경쟁 상태는 공유 데이터를 읽고 바꾸는 사이에 다른 스레드가 끼어들어 생깁니다. 공유 상태를 찾아 확인과 변경을 하나의 락으로 묶고 동시 접근 수 제한에는 세마포어, 조건 대기에는 조건 변수를 씁니다. 여러 락은 정해진 순서로 잡아 교착을 막고 서버가 여러 대라면 DB나 Redis의 원자적 연산으로 옮깁니다.',follow:[['Python에는 GIL이 있는데 락이 왜 필요한가요?','GIL은 바이트코드 하나하나의 실행을 직렬화할 뿐 counter += 1 같은 여러 단계의 연산 전체를 보호하지 않습니다. 스레드 전환이 읽기와 쓰기 사이에 일어날 수 있으므로 여전히 락이 필요합니다.'],['뮤텍스와 이진 세마포어는 같은가요?','값의 범위는 비슷하지만 뮤텍스는 잡은 스레드만 풀 수 있는 소유권 개념이 있고 우선순위 상속 같은 기능이 붙기도 합니다. 세마포어는 다른 스레드가 신호를 보내 풀 수 있어 생산자·소비자 신호에 씁니다.']],memory:'읽고 판단하고 쓰는 사이에는 틈이 있다. 그 틈을 하나의 락으로 닫는다.',mistake:'락을 잡은 채 네트워크 호출이나 sleep을 하면 다른 스레드가 모두 그 시간만큼 기다립니다.',quiz:{question:'counter += 1을 두 스레드가 각각 1000번 실행했는데 합이 2000보다 작을 수 있는 이유는?',options:['정수가 넘쳐서','읽기와 쓰기 사이에 다른 스레드가 끼어들어서','스레드가 하나만 실행돼서'],correct:1,explanation:'읽기·더하기·쓰기 사이에 전환이 일어나면 한쪽의 증가가 덮어써져 사라집니다.'},refs:['pyThreads','threads']}),
l({id:'scheduling',category:1,title:'CPU 스케줄링',english:'Time Slice / Run Queue / CFS · EEVDF / cgroup',hook:'CPU 사용률이 40%인데 왜 요청이 느릴까?',definition:'CPU 코어 하나는 한순간에 스레드 하나만 실행합니다. 스케줄러는 실행할 준비가 된 스레드들(실행 큐) 중 다음에 실행할 것을 고르고 정해진 시간이 지나면 다른 스레드로 바꿉니다. 이것을 선점이라고 합니다. Linux는 2.6.23부터 각 스레드가 실제로 쓴 CPU 시간을 가중치로 나눈 가상 실행 시간(vruntime)이 가장 적은 스레드를 고르는 CFS를 썼고 6.6부터는 같은 생각에 마감 시간 개념을 더한 EEVDF로 옮겨 가고 있습니다. 컨테이너의 CPU 제한은 cgroup이 일정 주기마다 쓸 수 있는 시간을 잘라 주는 방식이라 평균 사용률이 낮아도 순간적으로 멈출 수 있습니다.',analogy:'놀이터 그네 하나를 아이 여럿이 나눠 탄다고 해 봅시다. 공정하게 하려면 지금까지 가장 적게 탄 아이에게 다음 차례를 줍니다. 형이나 동생에게 가중치를 다르게 주면 누군가는 조금 더 오래 탑니다. 컨테이너의 CPU 제한은 "1분마다 20초만 탈 수 있다"는 규칙과 같습니다. 처음 20초를 몰아서 타면 남은 40초는 그네가 비어 있어도 기다려야 합니다.',steps:['실행할 준비가 된 스레드가 실행 큐에 들어갑니다. I/O를 기다리는 스레드는 큐에 없습니다.','스케줄러가 가장 적게 실행된(가상 실행 시간이 가장 작은) 스레드를 고릅니다.','스레드가 잠들거나 할당된 시간이 끝나면 문맥 교환으로 다음 스레드를 실행합니다.','cgroup의 CPU 제한이 있으면 주기 안에서 쓸 시간을 다 쓴 그룹은 다음 주기까지 멈춥니다(스로틀링).'],scenario:'Kubernetes에서 CPU limit을 1코어로 준 API 파드가 평균 CPU 40%인데도 응답 p99가 튀었습니다. 요청이 몰릴 때 여러 스레드가 동시에 CPU를 쓰면 100ms 주기의 할당량을 30ms 만에 다 써 버리고 나머지 70ms 동안 멈췄기 때문입니다. container_cpu_cfs_throttled_periods_total 지표로 스로틀링을 확인하고 limit을 올리거나 워커 수를 코어 수에 맞췄습니다.',aws:'ECS와 EKS의 CPU 단위는 cgroup 제한으로 바뀝니다. 버스트 가능 인스턴스(T 계열)는 크레딧이 떨어지면 기준 성능으로 묶이므로 CPU 사용률과 함께 크레딧 잔량을 봅니다.',ncloud:'Ncloud Kubernetes Service도 파드의 requests와 limits가 cgroup으로 적용됩니다. 노드의 CPU 사용률만 보지 말고 컨테이너별 스로틀링 지표를 함께 확인합니다.',tradeoff:'타임 슬라이스를 짧게 하면 반응성이 좋아지지만 문맥 교환이 늘어 처리량이 떨어집니다. CPU limit은 이웃 파드를 보호하지만 지연에 민감한 서비스에는 짧은 정지를 만듭니다. 그래서 requests는 꼭 주되 limit은 신중하게 정하는 팀이 많습니다.',language:'Python · 가상 실행 시간으로 다음 작업 고르기',code:`import heapq

# (가상 실행 시간, 이름, 가중치). 가중치가 클수록 vruntime이 천천히 늘어 더 자주 실행됩니다.
queue = [(0.0, "api", 2.0), (0.0, "batch", 1.0)]
heapq.heapify(queue)
timeline = []
for _ in range(6):
    vruntime, name, weight = heapq.heappop(queue)
    timeline.append(name)
    ran_ms = 4
    heapq.heappush(queue, (vruntime + ran_ms / weight, name, weight))
print(timeline)  # api가 batch보다 두 배 자주 실행됩니다`,codeNotes:['heapq로 가상 실행 시간이 가장 작은 작업을 꺼냅니다. CFS가 레드-블랙 트리로 하는 일을 단순하게 흉내 냈습니다.','가중치를 바꿔 실행 비율이 어떻게 달라지는지 확인하세요. nice 값이 실제 가중치를 정합니다.','실제 스케줄러는 여러 코어, 잠든 스레드, 캐시 위치까지 고려합니다. 이 코드는 원리만 보여 줍니다.'],answer:'스케줄러는 실행 큐에서 다음 스레드를 골라 시간을 나눠 줍니다. Linux는 가중치를 반영한 가상 실행 시간이 가장 작은 스레드를 고르는 CFS를 썼고 지금은 EEVDF로 옮겨 가고 있습니다. 컨테이너에서는 CPU 사용률 평균만 보지 않고 cgroup 스로틀링과 실행 큐 대기 시간을 함께 봐서 지연 원인을 찾겠습니다.',follow:[['로드 애버리지와 CPU 사용률은 어떻게 다른가요?','로드 애버리지는 실행 중이거나 실행을 기다리는 작업 수의 평균이고 Linux는 디스크 대기 같은 중단 불가 상태도 셉니다. 코어 수보다 크게 높으면 줄을 서는 작업이 많다는 뜻입니다.'],['CPU limit을 아예 안 주면 안 되나요?','지연은 줄지만 한 파드가 노드의 CPU를 독차지해 이웃을 느리게 할 수 있습니다. requests로 보장 몫을 정하고 limit은 서비스 특성에 따라 정합니다.']],memory:'평균 CPU가 낮아도 줄을 서거나 할당량에 걸리면 느리다.',mistake:'CPU 사용률 그래프만 보고 "CPU는 여유 있다"고 단정하지 마세요. 스로틀링과 실행 큐 대기는 따로 봐야 합니다.',quiz:{question:'CPU limit 1코어인 컨테이너가 평균 40%만 쓰는데 가끔 멈추는 가장 흔한 이유는?',options:['메모리 부족','짧은 순간 할당량을 다 써서 스로틀링됨','DNS 지연'],correct:1,explanation:'cgroup은 주기마다 할당량을 주므로 몰아서 쓰면 남은 주기 동안 멈춥니다.'},refs:['kernelSched','threads']}),
l({id:'tls',category:0,title:'TLS와 인증서',english:'Certificate Chain / CA / SNI / mTLS',hook:'자물쇠 아이콘은 무엇을 확인했다는 뜻일까?',definition:'TLS는 두 프로그램 사이의 통신을 암호화하고 상대가 누구인지 확인하는 프로토콜입니다. 상대 확인은 인증서로 합니다. 인증서는 "이 공개키의 주인은 example.com이다"라는 문장에 인증 기관(CA)이 서명한 문서입니다. 브라우저는 서버 인증서에서 중간 CA, 루트 CA까지 서명이 이어지는지 확인하고 루트가 운영체제나 브라우저의 신뢰 저장소에 있으면 믿습니다. 그다음 도메인 이름, 유효 기간, 서버가 그 개인키를 실제로 가졌는지를 확인합니다. 자물쇠는 "이 도메인의 주인과 암호화된 통신을 한다"는 뜻이지 그 사이트가 믿을 만하다는 뜻은 아닙니다.',analogy:'인증서는 신분증과 같습니다. 신분증 자체는 누구나 위조해서 만들 수 있지만 정부(루트 CA)의 도장과 그 도장을 위임받은 구청(중간 CA)의 도장이 진짜인지 확인하면 믿을 수 있습니다. 사진과 얼굴이 같은지(개인키 소유 증명)와 유효 기간도 봅니다. 하지만 신분증이 진짜라고 그 사람이 정직하다는 보장은 없습니다.',steps:['클라이언트가 접속할 도메인 이름을 SNI에 담아 보냅니다. 서버는 그 이름에 맞는 인증서를 고릅니다.','서버가 자기 인증서와 중간 CA 인증서를 보냅니다.','클라이언트는 신뢰 저장소의 루트까지 서명을 따라가고 이름·기간·용도를 확인합니다.','서버가 개인키로 핸드셰이크 내용에 서명해 그 인증서의 주인임을 증명하고 이후 대칭키로 암호화합니다.'],scenario:'새 서버로 옮긴 뒤 브라우저는 잘 열리는데 Python 배치 작업만 CERTIFICATE_VERIFY_FAILED를 냈습니다. 서버 설정에 중간 CA 인증서를 빠뜨렸기 때문입니다. 브라우저는 예전에 받은 중간 인증서를 캐시해 두거나 인증서의 주소에서 내려받아 채우지만 많은 라이브러리는 그렇게 하지 않습니다. openssl s_client -connect host:443 -servername host -showcerts로 서버가 보내는 체인을 확인하고 fullchain 파일로 바꿨습니다.',aws:'ACM은 공개 인증서를 무료로 발급하고 ALB, CloudFront에 붙이면 자동으로 갱신합니다. 인증서는 리전 단위이고 CloudFront용은 us-east-1에서 발급합니다. 서비스 사이의 mTLS가 필요하면 Private CA를 검토합니다.',ncloud:'Certificate Manager에서 인증서를 등록하거나 발급해 Load Balancer와 CDN에 연결합니다. 외부에서 받은 인증서를 올릴 때는 중간 인증서를 포함한 체인을 함께 등록합니다.',tradeoff:'인증서 수명이 짧을수록 키가 유출됐을 때의 피해 기간이 줄지만 갱신을 자동화하지 않으면 만료 사고가 잦아집니다. 폐기 확인(OCSP)을 엄격하게 하면 CA 서버 장애가 곧 우리 서비스 장애가 되므로 대부분의 브라우저는 실패해도 통과시키거나 다른 방식을 씁니다.',language:'Python · 인증서 정보와 남은 기간 확인',code:`import socket, ssl
from datetime import datetime, timezone

def cert_days_left(host, port=443):
    context = ssl.create_default_context()  # 시스템 신뢰 저장소와 이름 검사를 사용합니다
    with socket.create_connection((host, port), timeout=5) as sock:
        with context.wrap_socket(sock, server_hostname=host) as tls:  # SNI와 이름 검사
            cert = tls.getpeercert()
    expires = datetime.fromtimestamp(ssl.cert_time_to_seconds(cert["notAfter"]), timezone.utc)
    subject = dict(item[0] for item in cert["subject"])
    return subject.get("commonName"), tls.version(), (expires - datetime.now(timezone.utc)).days

# print(cert_days_left("example.com"))  # 네트워크가 되는 PC에서 실행하세요`,codeNotes:['create_default_context는 체인 검증과 호스트 이름 검사를 켠 상태로 시작합니다. verify_mode를 끄는 코드는 쓰지 않습니다.','server_hostname이 SNI로 전달되고 인증서 이름 검사에도 쓰입니다.','이 함수를 매일 실행해 남은 일수가 30일 아래로 떨어지면 알림을 보내는 것이 간단한 만료 감시입니다.'],answer:'TLS는 암호화와 상대 확인을 함께 제공합니다. 상대 확인은 서버 인증서에서 루트 CA까지 서명이 이어지는지, 이름과 기간이 맞는지, 서버가 개인키를 가졌는지로 합니다. 운영에서는 중간 인증서를 포함한 체인을 배포하고 갱신을 자동화하며 만료 일수를 감시하겠습니다. 내부 서비스 사이에는 필요하면 양쪽이 인증서를 내는 mTLS를 씁니다.',follow:[['HTTPS면 피싱 사이트가 아닌가요?','아닙니다. 피싱 도메인도 그 도메인의 소유를 증명하면 인증서를 받을 수 있습니다. 자물쇠는 도메인과의 암호화된 연결만 보장합니다.'],['인증서 검증을 끄면 왜 위험한가요?','중간에서 가짜 인증서를 내미는 공격자를 구별할 수 없게 됩니다. 암호화는 되지만 공격자와 암호화된 대화를 하는 셈입니다.']],memory:'암호화는 비밀을, 인증서 체인은 상대가 누구인지를 지킨다.',mistake:'인증서 오류를 verify=False로 넘기지 마세요. 원인은 대개 빠진 중간 인증서, 이름 불일치, 만료입니다.',quiz:{question:'브라우저는 되는데 Python 클라이언트만 인증서 검증에 실패할 때 가장 먼저 의심할 것은?',options:['서버가 중간 CA 인증서를 보내지 않음','TCP 포트 차단','DNS TTL'],correct:0,explanation:'브라우저는 빠진 중간 인증서를 채우는 경우가 있지만 많은 라이브러리는 서버가 보낸 체인만 씁니다.'},refs:['tls13','http']}),
l({id:'websocket',category:0,title:'WebSocket과 실시간 통신',english:'Upgrade / Frame / Ping-Pong / SSE',hook:'채팅 메시지를 받으려고 1초마다 서버에 물어봐야 할까?',definition:'HTTP는 클라이언트가 물어야 서버가 답하는 구조라 서버가 먼저 소식을 보내기 어렵습니다. WebSocket은 HTTP 요청으로 시작해 "이 연결을 WebSocket으로 바꾸자"는 Upgrade를 주고받은 뒤 같은 TCP 연결 위에서 양쪽이 언제든 메시지(프레임)를 보내는 프로토콜입니다. 2011년 RFC 6455로 표준이 되었습니다. 서버에서 클라이언트로 한 방향만 보내면 되는 알림이나 진행률은 평범한 HTTP 응답을 길게 열어 두는 Server-Sent Events(SSE)가 더 간단할 수 있습니다.',analogy:'HTTP는 편지입니다. 답장을 받으려면 먼저 보내야 하고 새 소식이 있는지 알려면 계속 편지를 보내 물어야 합니다. WebSocket은 전화입니다. 처음에 "전화로 바꿀까요?"라고 묻고 상대가 "네"라고 하면 그다음부터는 누구든 먼저 말할 수 있습니다. 대신 전화를 오래 붙들고 있으면 회선을 계속 차지하고 중간에 끊기면 다시 걸어야 합니다.',steps:['브라우저가 Upgrade: websocket과 무작위 키를 담은 HTTP GET을 보냅니다.','서버가 키로 계산한 값을 담아 101 Switching Protocols로 답하면 연결이 WebSocket으로 바뀝니다.','양쪽이 텍스트나 바이너리 프레임을 자유롭게 주고받고 ping과 pong으로 연결이 살아 있는지 확인합니다.','어느 한쪽이 close 프레임을 보내 정상 종료하거나 네트워크가 끊기면 클라이언트가 간격을 늘려 가며 다시 연결합니다.'],scenario:'nginx 뒤에 둔 채팅 서버가 로컬에서는 되는데 배포하면 연결 직후 끊겼습니다. nginx가 Upgrade 헤더를 앱으로 넘기지 않았기 때문입니다. proxy_http_version 1.1과 Upgrade, Connection 헤더를 설정해 해결했습니다. 그다음에는 조용한 방에서 정확히 60초마다 연결이 끊겼습니다. nginx의 proxy_read_timeout 기본값이 60초라 그동안 데이터가 없으면 닫았기 때문입니다. 서버가 30초마다 ping을 보내게 바꿨습니다.',aws:'ALB는 WebSocket을 지원하며 유휴 제한 시간이 지나면 연결을 닫으므로 heartbeat 주기를 그보다 짧게 합니다. 연결 상태를 서버가 관리하기 어렵다면 API Gateway의 WebSocket API로 연결을 맡기고 메시지만 Lambda나 백엔드로 받는 방식도 있습니다.',ncloud:'Load Balancer에서 WebSocket을 통과시킬 때 리스너 프로토콜과 유휴 시간 설정을 확인합니다. 서버를 여러 대 두면 한 서버에 연결된 사용자에게 다른 서버가 메시지를 보낼 수 있도록 Redis Pub/Sub 같은 중계가 필요합니다.',tradeoff:'WebSocket은 지연이 낮지만 연결마다 서버 메모리와 파일 디스크립터를 계속 쓰고 서버 재배포 때 모든 연결이 끊깁니다. 수평 확장 시 메시지를 다른 서버의 연결로 전달하는 계층이 필요합니다. 업데이트가 몇 초에 한 번이면 짧은 폴링이나 SSE가 운영이 더 쉽습니다.',language:'Python · Upgrade 응답의 Sec-WebSocket-Accept 계산',code:`import base64, hashlib

GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"  # RFC 6455에 고정된 값

def accept_value(client_key):
    digest = hashlib.sha1((client_key + GUID).encode()).digest()
    return base64.b64encode(digest).decode()

# RFC 6455 본문의 예시 키와 결과입니다
print(accept_value("dGhlIHNhbXBsZSBub25jZQ=="))  # s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`,codeNotes:['서버가 클라이언트의 키에 고정 GUID를 붙여 해시해 돌려주면 클라이언트는 상대가 WebSocket을 이해하는 서버임을 확인합니다.','이 값은 보안 인증이 아닙니다. 사용자 인증은 연결 시 쿠키나 토큰으로 따로 하고 Origin 헤더도 검사합니다.','실제 서버는 websockets 같은 라이브러리나 프레임워크 기능을 쓰고 이 계산을 직접 하지 않습니다.'],answer:'WebSocket은 HTTP Upgrade로 시작해 하나의 TCP 연결 위에서 양방향 메시지를 주고받는 프로토콜입니다. 프록시가 Upgrade 헤더를 넘기도록 설정하고 유휴 제한보다 짧은 ping으로 연결을 유지하며 끊기면 지수 백오프로 재연결하겠습니다. 서버가 여러 대면 Pub/Sub으로 메시지를 중계하고 한 방향 알림이면 SSE를 먼저 검토합니다.',follow:[['WebSocket 연결에서 인증은 어떻게 하나요?','연결을 여는 HTTP 요청에서 쿠키나 토큰으로 인증하고 Origin을 확인합니다. 연결이 오래가므로 토큰 만료와 권한 변경 시 연결을 끊는 정책도 정합니다.'],['서버를 재배포하면 연결은 어떻게 되나요?','모두 끊깁니다. 서버는 종료 전에 close 프레임을 보내고 클라이언트는 무작위 지연을 섞어 재연결해야 모든 사용자가 동시에 몰리지 않습니다.']],memory:'HTTP로 악수하고 전화로 바꾼다. 조용하면 ping으로 살아 있음을 알린다.',mistake:'WebSocket을 쓰면 메시지 전달이 보장된다고 생각하지 마세요. 끊긴 동안의 메시지는 재연결 후 다시 받아 오는 설계가 필요합니다.',quiz:{question:'nginx 뒤의 WebSocket이 조용할 때 정확히 60초마다 끊기는 이유로 가장 알맞은 것은?',options:['proxy_read_timeout 기본값','TLS 인증서 만료','DNS 캐시 만료'],correct:0,explanation:'nginx는 기본 60초 동안 업스트림에서 데이터가 없으면 연결을 닫습니다. ping으로 데이터를 흘려보냅니다.'},refs:['websocket','http']}),
l({id:'ratelimit',category:2,title:'속도 제한과 백오프',english:'Token Bucket / 429 / Retry-After / Jitter',hook:'한 사용자가 1초에 1000번 호출하면 다른 사용자는 어떻게 될까?',definition:'속도 제한은 한 사용자나 키가 정해진 시간에 보낼 수 있는 요청 수를 제한해 서버와 다른 사용자를 보호하는 장치입니다. 가장 널리 쓰는 토큰 버킷은 버킷에 일정 속도로 토큰을 채우고 요청마다 하나씩 꺼냅니다. 토큰이 있으면 통과, 없으면 HTTP 429 Too Many Requests로 거절하고 Retry-After 헤더로 언제 다시 오라고 알려 줍니다. 버킷 크기만큼 순간적인 몰림(버스트)은 허용하면서 평균 속도는 지킵니다. 반대편의 클라이언트는 거절이나 실패를 받으면 간격을 지수적으로 늘리고 무작위 값을 섞어(지터) 다시 시도합니다.',analogy:'놀이공원의 패스권을 떠올리세요. 매 10분마다 패스가 한 장씩 생기고 지갑에는 최대 5장까지 모입니다. 아침에 모아 둔 5장으로 연달아 탈 수는 있지만 다 쓰면 다음 패스가 생길 때까지 기다려야 합니다. 거절당한 사람이 모두 정확히 10분 뒤 한꺼번에 다시 오면 또 줄이 막히니 저마다 조금씩 다른 시간에 오는 것이 지터입니다.',steps:['제한할 대상(API 키, 사용자 ID, IP)과 기준(초당 10회, 버스트 20회)을 정합니다.','요청마다 대상의 버킷에서 지난 시간만큼 토큰을 채우고 하나를 꺼냅니다.','토큰이 없으면 429와 Retry-After를 돌려주고 처리하지 않습니다.','클라이언트는 Retry-After를 따르거나 지수 백오프와 지터로 재시도하고 최대 횟수를 둡니다.'],scenario:'파트너사 한 곳이 버그로 같은 주문 조회를 초당 수백 번 호출해 DB 커넥션이 바닥났고 다른 고객의 요청까지 실패했습니다. API 키별로 초당 20회, 버스트 40회의 토큰 버킷을 Redis에 두고 넘는 요청은 429로 거절했습니다. 그 뒤 장애 때 모든 모바일 앱이 1초 간격으로 재시도해 복구된 서버를 다시 쓰러뜨리는 일이 생기자 앱의 재시도를 지수 백오프와 전체 지터로 바꿨습니다.',aws:'API Gateway는 토큰 버킷 방식으로 계정, 스테이지, 사용량 계획 단위의 속도와 버스트를 제한합니다. WAF의 속도 기반 규칙으로 IP별 요청 수를 제한할 수 있고 AWS SDK는 기본으로 지수 백오프와 지터가 들어간 재시도를 합니다.',ncloud:'API Gateway의 사용량 계획(Usage Plan)으로 API 키별 호출 한도를 설정합니다. 앱 안에서 세밀하게 제한하려면 Cloud DB for Redis에 카운터를 둡니다.',tradeoff:'제한을 빡빡하게 하면 서버는 안전하지만 정상 사용자도 거절당합니다. 서버마다 따로 세면 빠르지만 전체 한도가 서버 수만큼 늘어나고 Redis에 모아 세면 정확하지만 요청마다 Redis를 한 번 더 호출합니다. 재시도는 일시적 실패를 숨겨 주지만 잘못하면 장애 때 부하를 몇 배로 키웁니다.',language:'Python · 토큰 버킷',code:`class TokenBucket:
    def __init__(self, rate, capacity):
        self.rate, self.capacity = rate, capacity  # 초당 채울 토큰, 최대 토큰
        self.tokens, self.last = capacity, 0.0

    def allow(self, now):
        self.tokens = min(self.capacity, self.tokens + (now - self.last) * self.rate)
        self.last = now
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False

bucket = TokenBucket(rate=1, capacity=5)
burst = [bucket.allow(0.0) for _ in range(7)]  # 같은 순간 7번
print(burst)              # 앞의 5번만 통과
print(bucket.allow(2.0))  # 2초 뒤에는 토큰 2개가 다시 생겨 통과`,codeNotes:['now를 인자로 받게 해서 시간을 직접 넣어 시험할 수 있습니다. 실제 코드에서는 time.monotonic()을 씁니다.','토큰을 매초 채우는 타이머 없이 요청이 올 때 지난 시간만큼 한꺼번에 계산합니다.','서버가 여러 대면 이 상태를 Redis에 두고 Lua 스크립트로 채우기와 꺼내기를 원자적으로 처리합니다.'],answer:'속도 제한은 대상별로 허용 속도와 버스트를 정해 서버와 다른 사용자를 보호합니다. 토큰 버킷으로 평균 속도를 지키면서 짧은 몰림은 허용하고 넘는 요청은 429와 Retry-After로 거절하겠습니다. 서버가 여러 대면 Redis에서 원자적으로 세고 클라이언트 재시도는 지수 백오프와 지터, 최대 횟수로 제한합니다.',follow:[['고정 윈도와 토큰 버킷은 무엇이 다른가요?','고정 윈도는 1분마다 카운터를 0으로 되돌려서 59초와 61초에 몰아 보내면 짧은 시간에 한도의 두 배가 통과합니다. 토큰 버킷이나 슬라이딩 윈도는 경계에서 몰리는 문제를 줄입니다.'],['왜 재시도에 지터가 필요한가요?','모든 클라이언트가 같은 간격으로 재시도하면 같은 순간에 몰려 서버가 다시 쓰러집니다. 무작위 값을 섞으면 재시도가 시간에 흩어집니다.']],memory:'평균은 채우는 속도로, 몰림은 버킷 크기로. 거절당하면 흩어져서 다시.',mistake:'429를 받고 바로 같은 간격으로 계속 재시도하지 마세요. Retry-After를 따르고 백오프와 지터를 씁니다.',quiz:{question:'초당 1개씩 채우고 최대 5개인 토큰 버킷에 같은 순간 7개 요청이 오면?',options:['7개 모두 통과','5개 통과 2개 거절','1개 통과 6개 거절'],correct:1,explanation:'모아 둔 토큰 5개로 버스트 5개가 통과하고 나머지는 토큰이 다시 생길 때까지 거절됩니다.'},refs:['rfc6585','backoff']}),
l({id:'replication',category:3,title:'복제와 샤딩',english:'Primary / Replica / Replication Lag / Sharding',hook:'방금 쓴 댓글이 새로고침하면 왜 사라질까?',definition:'복제는 같은 데이터를 여러 서버에 복사해 두는 것입니다. 쓰기는 주(primary) DB가 받고 변경 기록을 복제본(replica)에 보내 따라 하게 합니다. 읽기를 복제본으로 나누면 읽기 처리량이 늘고 주 DB가 죽으면 복제본을 승격해 이어 갑니다. 대부분의 복제는 기본이 비동기라 복제본이 몇 ms에서 몇 초 늦을 수 있습니다(복제 지연). 샤딩은 데이터 자체를 키 기준으로 나눠 서로 다른 서버에 저장하는 것입니다. 복제가 읽기와 가용성을 늘린다면 샤딩은 쓰기와 저장 용량을 늘립니다.',analogy:'복제는 본점의 메뉴판을 지점마다 복사해 두는 것입니다. 손님은 가까운 지점에서 메뉴를 보지만 본점이 가격을 바꾸면 지점 메뉴판이 바뀌기까지 시간이 걸립니다. 샤딩은 손님 이름의 첫 글자로 ㄱ~ㅁ은 1호점, ㅂ~ㅎ은 2호점이 장부를 맡는 것입니다. 장부가 너무 커지면 나누지만 두 지점 장부를 함께 봐야 하는 질문은 번거로워집니다.',steps:['주 DB가 쓰기를 처리하고 변경 기록(WAL, binlog)을 남깁니다.','복제본이 그 기록을 받아 같은 순서로 적용합니다. 비동기면 주 DB는 기다리지 않습니다.','읽기 요청을 복제본으로 보내되 방금 쓴 사용자의 읽기처럼 최신이어야 하는 읽기는 주 DB로 보냅니다.','데이터나 쓰기가 한 서버의 한계를 넘으면 샤드 키를 정해 데이터를 여러 주 DB로 나눕니다.'],scenario:'댓글을 쓰자마자 목록을 다시 불러오면 내 댓글이 보이지 않는다는 문의가 들어왔습니다. 쓰기는 주 DB로, 목록 조회는 복제본으로 보냈는데 복제가 0.5초쯤 늦었기 때문입니다. 쓰기 후 5초 동안 그 사용자의 읽기는 주 DB로 보내도록 바꿨습니다. 1년 뒤 쓰기량이 주 DB 하나의 한계에 닿자 사용자 ID를 샤드 키로 데이터를 나눴습니다.',aws:'RDS 읽기 전용 복제본은 비동기 복제이고 ReplicaLag 지표로 지연을 봅니다. Multi-AZ는 동기식 대기 복제본으로 장애 조치용이며 읽기를 받지 않습니다(다중 AZ DB 클러스터 제외). Aurora는 저장 계층을 공유해 복제본 지연이 보통 짧습니다. DynamoDB는 파티션 키로 자동 샤딩합니다.',ncloud:'Cloud DB for MySQL과 PostgreSQL은 Slave(읽기) 서버를 추가해 읽기를 분산하고 Master 장애 시 자동 승격을 설정할 수 있습니다. 복제 지연 지표를 모니터링에 함께 둡니다.',tradeoff:'동기 복제는 데이터 유실이 없지만 쓰기마다 복제본을 기다려 느리고 복제본 장애가 쓰기를 막을 수 있습니다. 비동기 복제는 빠르지만 장애 조치 순간 마지막 쓰기가 사라질 수 있습니다. 샤딩은 쓰기 한계를 풀지만 샤드를 넘는 조인과 트랜잭션, 재분배가 어려워져 정말 필요할 때까지 미룹니다.',language:'Python · 샤드를 늘릴 때 옮겨야 하는 키의 수',code:`import hashlib, bisect

def h(text):
    return int(hashlib.md5(text.encode()).hexdigest(), 16)

keys = [f"user:{i}" for i in range(10_000)]

# 1) 해시 % 샤드 수: 4대 → 5대
moved_mod = sum(h(k) % 4 != h(k) % 5 for k in keys)

# 2) 일관 해싱: 샤드마다 링 위에 점 100개
def ring(shards):
    points = sorted((h(f"{s}#{v}"), s) for s in shards for v in range(100))
    return [p for p, _ in points], [s for _, s in points]

def owner(r, key):
    pos, names = r
    return names[bisect.bisect(pos, h(key)) % len(names)]

before, after = ring(["s0", "s1", "s2", "s3"]), ring(["s0", "s1", "s2", "s3", "s4"])
moved_ring = sum(owner(before, k) != owner(after, k) for k in keys)
print(moved_mod, moved_ring)  # 나머지 방식은 약 80%, 일관 해싱은 약 20%만 이동`,codeNotes:['나머지 방식은 샤드 수가 바뀌면 거의 모든 키의 자리가 바뀌어 대량 이동이 필요합니다.','일관 해싱은 새 샤드가 링에서 맡게 된 구간의 키만 옮깁니다. 이상적으로 1/5입니다.','샤드마다 점을 여러 개(가상 노드) 두면 데이터가 고르게 나뉩니다. 숫자를 10으로 줄여 결과를 비교해 보세요.'],answer:'복제는 같은 데이터를 여러 서버에 두어 읽기를 나누고 장애에 대비합니다. 비동기 복제의 지연을 전제로 쓰기 직후의 읽기는 주 DB로 보내고 복제 지연을 감시하겠습니다. 쓰기와 저장량이 한 서버의 한계를 넘으면 접근 패턴에 맞는 샤드 키로 나누되 샤드를 넘는 조인과 재분배 비용을 함께 설계합니다.',follow:[['장애 조치 때 데이터가 사라질 수 있나요?','비동기 복제라면 주 DB가 커밋했지만 아직 복제본에 가지 않은 쓰기가 사라질 수 있습니다. 허용할 수 없으면 동기 복제나 반동기 복제를 쓰고 그만큼 쓰기 지연을 받아들입니다.'],['샤드 키는 어떻게 고르나요?','대부분의 쿼리가 하나의 샤드에서 끝나고 데이터와 트래픽이 고르게 퍼지는 키를 고릅니다. 생성 시각처럼 한쪽으로 몰리는 키는 최신 샤드만 바빠집니다.']],memory:'복제는 읽기와 생존을, 샤딩은 쓰기와 용량을 늘린다. 복제본은 조금 늦다.',mistake:'복제본에서 읽은 값이 항상 최신이라고 가정하지 마세요. 쓰기 직후 읽기, 재고 확인처럼 최신이어야 하는 읽기는 주 DB로 보냅니다.',quiz:{question:'댓글을 쓴 직후 목록에서 내 댓글이 안 보이는 가장 흔한 원인은?',options:['복제 지연이 있는 복제본에서 읽음','인덱스가 없음','TLS 오류'],correct:0,explanation:'비동기 복제본은 주 DB보다 늦을 수 있어 방금 쓴 내용이 아직 없을 수 있습니다.'},refs:['pgReplication','tx']}),
l({id:'raft',category:3,title:'합의와 Raft',english:'Leader Election / Log Replication / Quorum',hook:'서버 세 대가 "지금 리더는 누구인가"에 어떻게 같은 답을 낼까?',definition:'합의는 여러 서버가 일부가 죽거나 네트워크가 끊겨도 같은 값이나 같은 순서의 기록에 동의하는 문제입니다. Raft는 이를 이해하기 쉽게 만든 알고리즘입니다. 서버들은 리더 하나를 뽑고 모든 쓰기는 리더가 받아 자기 로그에 적은 뒤 다른 서버에 복제합니다. 과반수가 받아 적으면 그 항목은 커밋되어 다시는 사라지지 않습니다. 리더가 죽으면 정해진 시간 동안 소식이 없는 서버가 후보로 나서 과반수의 표를 받아 새 리더가 됩니다. 과반수가 필요하므로 3대면 1대, 5대면 2대까지 죽어도 동작합니다. etcd, Consul, Kafka의 KRaft가 Raft를 씁니다.',analogy:'반장 선거와 회의록을 떠올리세요. 반장이 결정 사항을 회의록에 적고 반 친구들에게 돌립니다. 반 이상이 자기 공책에 받아 적으면 확정입니다. 반장이 한동안 연락이 없으면 누군가 "내가 반장 할게"라며 표를 모읍니다. 표는 한 학기(임기)에 한 사람에게만 줄 수 있고 자기보다 회의록이 뒤처진 후보에게는 주지 않습니다. 반이 둘로 갈라져도 과반수를 가진 쪽만 결정할 수 있어서 결정이 두 갈래로 나뉘지 않습니다.',steps:['모든 서버는 팔로워로 시작하고 리더의 하트비트를 기다립니다.','일정 시간(무작위 150~300ms 등) 하트비트가 없으면 임기 번호를 올리고 후보가 되어 투표를 요청합니다.','과반수의 표를 받은 후보가 리더가 되어 클라이언트 쓰기를 로그에 붙이고 팔로워에게 복제합니다.','과반수가 저장하면 리더가 그 항목을 커밋하고 상태 기계에 적용한 뒤 클라이언트에 성공을 알립니다.'],scenario:'Kubernetes 클러스터의 etcd를 2대로 운영하다가 한 대가 디스크 문제로 멈추자 클러스터 전체가 새 파드를 만들지 못했습니다. 2대의 과반수는 2대라 한 대만 남으면 쓰기를 커밋할 수 없기 때문입니다. 3대로 늘리고 각각 다른 가용 영역에 뒀습니다. 그 뒤에는 한 영역이 끊겨도 나머지 두 대가 과반수를 이뤄 계속 동작했습니다.',aws:'EKS는 etcd를 AWS가 여러 가용 영역에 나눠 운영해 사용자는 직접 다루지 않습니다. Aurora와 DynamoDB도 내부적으로 쿼럼 기반 복제를 씁니다. 직접 Consul이나 etcd를 띄운다면 서로 다른 AZ에 홀수 대를 둡니다.',ncloud:'Ncloud Kubernetes Service의 컨트롤 플레인은 관리형으로 제공됩니다. 직접 합의 기반 시스템을 운영할 때는 서로 다른 존에 3대 이상 홀수로 배치하고 디스크 지연을 감시합니다.',tradeoff:'과반수 확인 덕분에 데이터가 갈라지지 않지만 쓰기마다 과반수 왕복을 기다려 단일 서버보다 느립니다. 서버를 늘리면 견딜 수 있는 장애 수는 늘지만 과반수도 커져 쓰기가 느려집니다. 짝수 대는 이득이 없습니다. 4대도 견디는 장애는 3대와 같은 1대입니다.',language:'Python · 과반수로 커밋 위치 정하기',code:`def commit_index(match_index, leader_last):
    # 각 서버가 어디까지 받아 적었는지(리더 포함)로 과반수가 가진 위치를 구합니다
    positions = sorted(match_index + [leader_last], reverse=True)
    majority = len(positions) // 2 + 1
    return positions[majority - 1]

def tolerated_failures(n):
    return (n - 1) // 2

print(commit_index([7, 5], leader_last=8))        # 3대 중 2대가 7까지 → 7
print(commit_index([8, 3, 2, 8], leader_last=9))  # 5대 중 3대가 8까지 → 8
print([tolerated_failures(n) for n in (2, 3, 4, 5)])  # [0, 1, 1, 2]`,codeNotes:['내림차순으로 정렬해 과반수 번째 값을 고르면 "과반수가 적어도 여기까지 가졌다"는 위치가 됩니다.','실제 Raft는 현재 임기의 항목일 때만 이 방식으로 커밋합니다. 이전 임기의 항목은 현재 임기 항목과 함께 커밋됩니다.','tolerated_failures로 2대와 4대가 3대보다 나을 게 없음을 확인하세요.'],answer:'Raft는 리더를 뽑고 모든 쓰기를 리더의 로그로 받아 과반수가 저장하면 커밋하는 합의 알고리즘입니다. 리더가 죽으면 무작위 선거 시간이 지난 팔로워가 임기를 올려 과반수 표를 받아 리더가 됩니다. 과반수가 필요하므로 서로 다른 장애 영역에 3대나 5대를 두고 디스크와 네트워크 지연을 감시하겠습니다.',follow:[['네트워크가 둘로 갈라지면 어떻게 되나요?','과반수를 가진 쪽만 리더를 뽑고 쓰기를 커밋합니다. 소수 쪽의 옛 리더는 쓰기를 받아도 커밋하지 못하고 네트워크가 복구되면 새 리더의 로그로 덮어씁니다.'],['선거 시간은 왜 무작위인가요?','모든 서버가 같은 순간 후보가 되면 표가 나뉘어 아무도 과반수를 얻지 못합니다. 시간을 흩어 두면 대개 한 서버가 먼저 나서 바로 당선됩니다.']],memory:'과반수가 적어야 확정된다. 리더가 사라지면 가장 먼저 깨어난 후보가 표를 모은다.',mistake:'가용성을 높이려고 2대나 4대로 운영하지 마세요. 견딜 수 있는 장애 수는 늘지 않고 과반수만 커집니다.',quiz:{question:'5대로 운영하는 Raft 클러스터가 동시에 견딜 수 있는 서버 장애 수는?',options:['1대','2대','4대'],correct:1,explanation:'과반수 3대가 살아 있어야 하므로 2대까지 죽어도 동작합니다.'},refs:['raft','etcd']}),
l({id:'pytest',category:6,title:'테스트와 pytest',english:'Unit Test / Fixture / Parametrize / Mock',hook:'코드를 고칠 때마다 손으로 다 눌러 봐야 할까?',definition:'자동 테스트는 코드가 기대대로 동작하는지 확인하는 코드입니다. 입력을 주고 결과를 assert로 확인하며 한 번 써 두면 코드를 고칠 때마다 몇 초 만에 다시 돌릴 수 있습니다. pytest는 Python에서 가장 널리 쓰는 테스트 도구입니다. test_로 시작하는 함수를 찾아 실행하고 평범한 assert 문이 실패하면 양쪽 값을 보여 줍니다. 픽스처는 테스트에 필요한 준비물(임시 DB, 샘플 사용자)을 만들고 정리하는 함수이고 parametrize는 같은 테스트를 여러 입력으로 반복합니다. 외부 API처럼 느리거나 통제할 수 없는 의존성은 가짜 객체로 바꿔 끼웁니다.',analogy:'요리사가 손님에게 내기 전에 맛을 보는 것과 같습니다. 매번 모든 요리를 처음부터 먹어 볼 수는 없으니 핵심 양념은 작은 숟가락으로 빠르게 확인하고(단위 테스트) 하루에 몇 번은 완성된 코스를 통째로 먹어 봅니다(통합 테스트). 재료 손질처럼 매번 반복되는 준비는 미리 정해 두면(픽스처) 맛보기에 집중할 수 있습니다.',steps:['고칠 동작을 정하고 기대하는 입력과 출력을 테스트로 먼저 적습니다.','픽스처로 필요한 준비물을 만들고 외부 의존성은 가짜로 바꿉니다.','pytest로 실행해 실패를 확인한 뒤 코드를 고쳐 통과시킵니다.','CI에서 모든 테스트를 자동으로 돌려 실패하면 병합하지 못하게 합니다.'],scenario:'할인 계산 함수를 고친 뒤 정상 주문은 잘 됐는데 쿠폰과 회원 할인을 함께 쓰면 금액이 음수가 되는 버그가 배포됐습니다. 이 조합을 재현하는 테스트를 먼저 써서 실패를 확인하고 금액을 0 아래로 내리지 않게 고쳤습니다. 이후 경계값(0원, 쿠폰이 금액보다 큰 경우)을 parametrize로 묶어 두었고 같은 버그는 다시 나오지 않았습니다.',aws:'CodeBuild나 GitHub Actions에서 pytest를 돌리고 결과를 JUnit XML로 남깁니다. AWS 서비스를 부르는 코드는 botocore의 Stubber나 moto 같은 라이브러리로 가짜 응답을 주어 실제 계정 없이 테스트합니다.',ncloud:'SourceBuild와 SourcePipeline에서 빌드 단계에 pytest를 넣어 실패하면 배포가 멈추게 합니다. 통합 테스트용 DB는 운영과 분리된 테스트 전용 자원을 씁니다.',tradeoff:'단위 테스트는 빠르고 실패 원인이 분명하지만 부품 사이의 연결 문제는 놓칩니다. 통합·E2E 테스트는 실제와 가깝지만 느리고 불안정합니다. 가짜 객체를 너무 많이 쓰면 테스트는 통과하는데 실제로는 깨지는 일이 생깁니다. 그래서 단위 테스트를 많이, 통합 테스트를 적당히, E2E를 소수로 두는 피라미드 모양이 흔합니다.',language:'Python · pytest 픽스처와 parametrize',code:`import pytest

def final_price(price, coupon=0, member_rate=0.0):
    discounted = price * (1 - member_rate) - coupon
    return max(0, round(discounted))

@pytest.fixture
def vip():
    return {"name": "민수", "member_rate": 0.1}

def test_vip_discount(vip):
    assert final_price(10_000, member_rate=vip["member_rate"]) == 9_000

@pytest.mark.parametrize("price, coupon, expected", [
    (10_000, 3_000, 7_000),
    (2_000, 3_000, 0),   # 쿠폰이 더 커도 음수가 되지 않습니다
    (0, 0, 0),
])
def test_coupon(price, coupon, expected):
    assert final_price(price, coupon) == expected

# 파일로 저장한 뒤 터미널에서: pytest -q test_price.py`,codeNotes:['vip 픽스처는 이름이 같은 매개변수를 가진 테스트에 자동으로 전달됩니다.','parametrize의 각 줄이 별도의 테스트로 실행되고 실패하면 어느 입력인지 함께 보입니다.','expected 값을 하나 틀리게 바꿔 실행해 보세요. pytest가 assert의 양쪽 값을 보여 줍니다.'],answer:'자동 테스트는 기대하는 입력과 출력을 코드로 적어 변경 때마다 빠르게 확인하는 장치입니다. pytest로 픽스처를 써서 준비를 재사용하고 parametrize로 경계값을 묶으며 외부 의존성은 가짜로 바꿔 빠르고 안정적인 단위 테스트를 만들겠습니다. 버그는 재현 테스트를 먼저 쓰고 고치며 CI에서 실패하면 병합을 막습니다.',follow:[['커버리지 100%면 버그가 없나요?','아닙니다. 커버리지는 코드가 실행됐는지만 보고 결과를 제대로 확인했는지는 모릅니다. assert 없이 실행만 해도 커버리지는 올라갑니다.'],['DB를 쓰는 코드는 어떻게 테스트하나요?','저장소 계층을 분리해 업무 로직은 가짜 저장소로 단위 테스트하고 실제 쿼리는 테스트용 DB를 띄운 통합 테스트로 확인합니다. 테스트마다 트랜잭션을 롤백해 서로 영향을 주지 않게 합니다.']],memory:'버그는 테스트로 먼저 재현하고 고친다. 테스트가 기억해 주니 다시 오지 않는다.',mistake:'테스트끼리 순서에 의존하게 만들지 마세요. 각 테스트는 혼자 실행해도 통과해야 합니다.',quiz:{question:'pytest에서 여러 테스트가 같은 준비물(임시 사용자)을 쓰게 하는 기능은?',options:['parametrize','fixture','skip'],correct:1,explanation:'픽스처가 준비물을 만들고 정리하며 매개변수 이름으로 테스트에 전달됩니다.'},refs:['pytestDocs','cicd']}),
l({id:'git',category:6,title:'Git 브랜치와 병합',english:'Commit / Branch / Merge / Rebase',hook:'두 사람이 같은 파일을 고쳤을 때 Git은 어떻게 합칠까?',definition:'Git은 프로젝트의 변경 이력을 저장하는 분산 버전 관리 시스템입니다. 커밋은 그 시점의 전체 파일 상태(스냅샷)와 부모 커밋, 작성자, 메시지를 묶은 기록이고 내용의 SHA-1 해시가 이름이 됩니다. 브랜치는 특정 커밋을 가리키는 이름표일 뿐이라 만들고 지우는 비용이 거의 없습니다. 병합(merge)은 두 갈래의 변경을 합친 새 커밋을 만들고 리베이스(rebase)는 내 커밋들을 상대 브랜치 끝에 다시 쌓아 이력을 한 줄로 만듭니다. 같은 줄을 양쪽이 다르게 고쳤을 때만 충돌이 나고 사람이 골라 줘야 합니다.',analogy:'공동 문서를 쓰는 팀을 떠올리세요. 커밋은 저장 버튼을 누를 때마다 남는 전체 사본이고 브랜치는 "민수 초안", "지은 초안" 같은 책갈피입니다. 병합은 두 초안을 합쳐 새 판을 만드는 것이고 리베이스는 지은의 수정을 민수 초안의 최신판 위에서 처음부터 다시 적용하는 것입니다. 둘이 같은 문단을 다르게 고쳤다면 누군가 읽고 골라야 합니다.',steps:['main에서 작업용 브랜치를 만들고 작은 단위로 커밋합니다.','원격 저장소에 push하고 풀 리퀘스트로 리뷰와 CI를 받습니다.','main이 앞서 나갔으면 merge나 rebase로 최신 상태를 반영하고 충돌을 해결합니다.','리뷰가 끝나면 main에 병합하고 작업 브랜치는 지웁니다.'],scenario:'두 개발자가 각자 브랜치에서 config.py의 같은 타임아웃 값을 다르게 바꿨습니다. 먼저 병합된 쪽은 문제가 없었지만 두 번째 풀 리퀘스트에서 충돌이 났습니다. 충돌 표시(<<<<<<<, =======, >>>>>>>) 사이의 두 값을 보고 팀과 합의한 값으로 고친 뒤 테스트를 돌려 커밋했습니다. 리베이스로 정리한 브랜치를 다시 올릴 때는 다른 사람이 같은 브랜치에 올린 커밋을 덮어쓰지 않도록 --force-with-lease를 썼습니다.',aws:'GitHub이나 GitLab 저장소를 CodeConnections로 CodePipeline·CodeBuild와 연결하는 구성이 흔합니다. 브랜치 보호 규칙으로 main에 직접 push를 막고 리뷰와 CI 통과를 병합 조건으로 겁니다.',ncloud:'SourceCommit으로 Git 저장소를 만들고 SourcePipeline과 연결해 특정 브랜치에 병합되면 빌드와 배포가 실행되게 합니다.',tradeoff:'merge는 실제로 일어난 일을 그대로 남기지만 병합 커밋이 많아 이력이 복잡해집니다. rebase는 이력이 깔끔하지만 커밋 해시가 바뀌어 이미 공유한 브랜치에 쓰면 다른 사람의 작업과 엇갈립니다. 브랜치를 오래 살려 두면 충돌이 커지므로 작게 자주 병합하는 편이 대개 낫습니다.',language:'Python · Git이 파일 내용으로 이름을 만드는 방법',code:`import hashlib

def git_blob_id(content: bytes) -> str:
    # git hash-object와 같은 계산: "blob <크기>\\0" 머리말 + 내용의 SHA-1
    header = f"blob {len(content)}\\0".encode()
    return hashlib.sha1(header + content).hexdigest()

print(git_blob_id(b"hello\\n"))   # ce013625030ba8dba906f756967f9e9ca394464a
print(git_blob_id(b"hello!\\n"))  # 한 글자만 달라도 완전히 다른 이름
# 터미널에서 확인: printf 'hello\\n' | git hash-object --stdin`,codeNotes:['같은 내용은 어느 컴퓨터에서나 같은 이름을 가집니다. 그래서 Git은 중복 저장을 피하고 변조를 알아챕니다.','커밋도 같은 방식으로 트리, 부모, 작성자, 메시지를 해시한 이름을 가집니다. 부모가 바뀌면 커밋 이름도 바뀝니다.','리베이스하면 커밋 해시가 바뀌는 이유가 여기 있습니다. 부모 커밋이 달라지기 때문입니다.'],answer:'Git은 커밋을 내용의 해시로 이름 붙인 스냅샷으로 저장하고 브랜치는 커밋을 가리키는 이름표입니다. 작은 브랜치에서 작업해 풀 리퀘스트로 리뷰와 CI를 거치고 main의 변경은 merge나 rebase로 반영하겠습니다. 이미 공유한 브랜치는 리베이스하지 않고 충돌은 양쪽 의도를 확인한 뒤 해결하고 테스트로 검증합니다.',follow:[['git reset과 git revert는 어떻게 다른가요?','reset은 브랜치가 가리키는 커밋을 뒤로 옮겨 이력에서 지웁니다. revert는 되돌리는 새 커밋을 추가해 이력을 남깁니다. 이미 공유한 브랜치에서는 revert를 씁니다.'],['force push는 왜 위험한가요?','원격 브랜치를 내 로컬 상태로 덮어써서 그사이 다른 사람이 올린 커밋이 사라질 수 있습니다. 꼭 필요하면 --force-with-lease로 원격이 내가 마지막으로 본 상태일 때만 덮어씁니다.']],memory:'커밋은 내용으로 이름 붙인 사진, 브랜치는 그 사진에 붙인 책갈피.',mistake:'다른 사람과 함께 쓰는 브랜치를 리베이스하고 강제로 push하지 마세요. 동료의 커밋이 사라질 수 있습니다.',quiz:{question:'리베이스한 뒤 커밋 해시가 바뀌는 이유는?',options:['Git이 무작위로 이름을 다시 붙여서','부모 커밋이 바뀌어 커밋 내용의 해시가 달라져서','원격 저장소가 이름을 정해서'],correct:1,explanation:'커밋 해시에는 부모 커밋이 포함되므로 다른 커밋 위에 다시 쌓으면 해시가 달라집니다.'},refs:['gitBook','cicd']}),
l({id:'kubernetes',category:4,title:'Kubernetes 기본',english:'Pod / Deployment / Service / Probe',hook:'서버가 죽으면 누가 새로 띄워 줄까?',definition:'Kubernetes는 여러 서버(노드)에 컨테이너를 배치하고 원하는 상태를 계속 유지해 주는 시스템입니다. 사용자는 "이 이미지로 파드 3개"처럼 원하는 상태를 YAML로 선언하고 API 서버에 제출합니다. 컨트롤러들은 실제 상태를 계속 지켜보다가 원하는 상태와 다르면 맞추는 일을 반복합니다. 파드는 함께 배치되는 컨테이너 묶음이자 가장 작은 배포 단위이고 Deployment는 파드 묶음의 개수와 업데이트 방식을 관리합니다. Service는 계속 바뀌는 파드들 앞에 고정된 이름과 주소를 주고 준비된(readiness probe를 통과한) 파드에만 트래픽을 보냅니다.',analogy:'식당 매니저에게 "홀 직원 3명이 항상 있게 해 주세요"라고 부탁하는 것과 같습니다. 한 명이 아파서 빠지면 매니저가 알아서 대체 인력을 부릅니다. 손님은 직원 이름을 몰라도 "주문 받는 분"을 찾으면 되고(Service) 새 직원은 교육이 끝난 뒤에야 주문을 받습니다(readiness). 매니저는 계속 현장을 둘러보며 부탁받은 상태와 비교합니다.',steps:['Deployment YAML에 이미지, 파드 수, 자원 요청, 프로브를 적어 kubectl apply로 제출합니다.','API 서버가 원하는 상태를 etcd에 저장하고 컨트롤러가 부족한 파드를 만듭니다.','스케줄러가 자원이 맞는 노드를 고르고 그 노드의 kubelet이 컨테이너를 실행합니다.','readiness probe를 통과한 파드만 Service 뒤에 붙고 파드가 죽으면 컨트롤러가 다시 만듭니다.'],scenario:'새 버전을 배포하자 파드는 Running인데 요청의 일부가 502로 실패했습니다. 앱이 DB 연결과 캐시 준비에 20초가 걸리는데 readiness probe가 없어 컨테이너가 시작되자마자 트래픽을 받았기 때문입니다. /ready 엔드포인트를 만들고 readiness probe를 걸어 준비가 끝난 파드만 트래픽을 받게 했습니다. liveness probe는 DB 상태를 보지 않게 따로 만들어 DB가 잠깐 느려도 모든 파드가 재시작되지 않게 했습니다.',aws:'EKS는 컨트롤 플레인(API 서버, etcd)을 AWS가 운영하고 노드는 EC2 관리형 노드 그룹이나 Fargate로 둡니다. Service를 외부에 노출할 때는 AWS Load Balancer Controller로 ALB나 NLB를 만듭니다.',ncloud:'Ncloud Kubernetes Service는 관리형 컨트롤 플레인과 워커 노드 그룹을 제공합니다. Container Registry에 이미지를 올리고 Load Balancer와 연결해 외부에 노출합니다.',tradeoff:'Kubernetes는 자동 복구, 롤링 업데이트, 확장을 표준화하지만 배워야 할 개념과 운영할 구성 요소가 많습니다. 서비스가 몇 개뿐이고 팀이 작다면 ECS, Cloud Run 같은 더 단순한 관리형 컨테이너 서비스가 나을 수 있습니다.',language:'Python · 원하는 상태에 맞추는 조정 루프',code:`desired = 3
pods = {"web-a": "Running", "web-b": "Running", "web-c": "Running"}
created = 0

def reconcile():
    global created
    alive = [name for name, state in pods.items() if state == "Running"]
    for name in [n for n, s in pods.items() if s != "Running"]:
        del pods[name]                 # 죽은 파드는 정리합니다
    while len(alive) < desired:        # 부족하면 새로 만듭니다
        created += 1
        name = f"web-new{created}"
        pods[name] = "Running"
        alive.append(name)
    for name in alive[desired:]:       # 많으면 줄입니다
        del pods[name]

pods["web-b"] = "Failed"   # 노드 장애로 파드 하나가 죽음
reconcile()
print(sorted(pods))        # 다시 3개
desired = 2                # 원하는 상태를 바꾸면
reconcile()
print(len(pods))           # 2개로 줄어듭니다`,codeNotes:['컨트롤러는 "무엇이 바뀌었나"가 아니라 "지금 상태와 원하는 상태가 다른가"를 봅니다. 그래서 놓친 이벤트가 있어도 다음 확인에서 바로잡습니다.','실제 Deployment 컨트롤러는 ReplicaSet을 거쳐 파드를 만들고 롤링 업데이트 때 새 버전과 옛 버전의 개수를 함께 조절합니다.','desired 값을 바꿔 가며 reconcile을 여러 번 불러도 결과가 같은지 확인하세요. 조정 루프는 멱등해야 합니다.'],answer:'Kubernetes는 원하는 상태를 선언하면 컨트롤러가 실제 상태와 비교해 계속 맞춰 주는 시스템입니다. Deployment로 파드 수와 롤링 업데이트를 관리하고 Service로 안정된 주소를 주며 readiness probe로 준비된 파드에만 트래픽을 보내겠습니다. 자원 requests와 limits, 종료 시 SIGTERM 처리도 함께 설정합니다.',follow:[['liveness와 readiness probe는 어떻게 다른가요?','readiness가 실패하면 트래픽만 끊고 파드는 그대로 둡니다. liveness가 실패하면 컨테이너를 재시작합니다. liveness에 DB 같은 외부 의존성을 넣으면 DB 장애 때 모든 파드가 재시작되는 연쇄 장애가 생깁니다.'],['파드를 지울 때 요청이 끊기지 않게 하려면?','Kubernetes는 SIGTERM을 보내고 유예 시간(기본 30초)을 줍니다. 앱은 새 요청을 받지 않고 진행 중인 요청을 마친 뒤 종료해야 합니다. Service에서 빠지는 데 시간이 걸리므로 종료 직전 짧은 대기를 두기도 합니다.']],memory:'원하는 상태를 적어 두면 컨트롤러가 계속 맞춘다. 준비된 파드만 손님을 받는다.',mistake:'liveness probe에 DB 연결 확인을 넣지 마세요. DB가 잠깐 느려지면 모든 파드가 동시에 재시작됩니다.',quiz:{question:'파드는 Running인데 시작 직후 요청이 실패한다면 가장 먼저 확인할 것은?',options:['readiness probe 설정','노드의 디스크 크기','DNS TTL'],correct:0,explanation:'readiness probe가 없으면 앱이 준비되기 전부터 Service가 트래픽을 보냅니다.'},refs:['k8sDeployment','docker']}),
l({id:'machine',category:1,title:'컴퓨터는 프로그램을 어떻게 실행하나',english:'Stored Program / CPU / Instruction Cycle / Compiler · Interpreter',hook:'print("hello") 한 줄은 CPU에게 어떤 모습으로 도착할까?',definition:'컴퓨터는 메모리에 저장된 명령어를 CPU가 하나씩 꺼내 실행하는 기계입니다. 프로그램도 데이터처럼 메모리에 들어 있다는 생각을 저장 프로그램 방식이라고 부르며 지금의 거의 모든 컴퓨터가 이 구조입니다. CPU는 다음에 실행할 명령의 위치를 프로그램 카운터에 기억하고, 명령을 가져오고(fetch), 해석하고(decode), 실행하는(execute) 일을 끝없이 반복합니다. 계산 중인 값은 CPU 안의 아주 작고 빠른 저장소인 레지스터에 둡니다. 사람이 쓴 코드는 컴파일러가 미리 기계어로 바꾸거나, 인터프리터가 실행하면서 해석합니다. Python은 소스를 바이트코드로 바꾼 뒤 인터프리터가 그 바이트코드를 하나씩 실행합니다.',analogy:'요리책을 보며 요리하는 사람을 떠올리세요. 요리책(메모리)에 순서대로 적힌 지시를 한 줄 읽고, 무슨 뜻인지 이해하고, 실행한 뒤 다음 줄로 넘어갑니다. 책갈피(프로그램 카운터)가 지금 몇 번째 줄인지 알려 주고 손에 든 그릇(레지스터)에 지금 다루는 재료를 담습니다. 외국어 요리책이라면 미리 통째로 번역해 두거나(컴파일러) 옆에서 통역사가 한 줄씩 읽어 주는(인터프리터) 방법이 있습니다.',steps:['소스 코드를 컴파일러나 인터프리터가 CPU가 이해하는 명령으로 바꿉니다.','운영체제가 프로그램을 메모리에 올리고 CPU의 프로그램 카운터를 첫 명령에 맞춥니다.','CPU는 명령을 가져오고, 해석하고, 실행한 뒤 프로그램 카운터를 다음 명령으로 옮깁니다.','계산 중인 값은 레지스터에 두고 필요할 때 메모리에서 읽거나 메모리에 씁니다.'],scenario:'반복문 안에서 리스트를 순회하는 Python 코드가 같은 일을 하는 C 코드보다 수십 배 느렸습니다. Python은 한 줄을 실행할 때마다 인터프리터가 바이트코드를 해석하고 객체의 타입을 확인하는 일을 반복하기 때문입니다. 계산이 많은 부분을 C로 구현된 NumPy 연산으로 바꾸자 해석하는 비용이 반복마다가 아니라 한 번만 들게 되어 크게 빨라졌습니다.',aws:'EC2 인스턴스를 고를 때 x86(Intel·AMD)과 ARM(Graviton) 중 무엇을 쓰는지가 바로 명령어 집합의 차이입니다. Python 코드는 인터프리터가 있으면 어디서든 돌지만 C 확장이 들어간 라이브러리는 그 CPU용으로 컴파일된 패키지가 있어야 합니다.',ncloud:'서버 유형을 고를 때 CPU 아키텍처와 코어 수를 확인합니다. 컨테이너 이미지도 CPU 아키텍처별로 만들어지므로 개발 PC(예: ARM 맥)와 서버의 아키텍처가 다르면 이미지를 그에 맞게 빌드해야 합니다.',tradeoff:'미리 컴파일하면 실행이 빠르지만 CPU와 운영체제마다 따로 빌드해야 하고 고친 뒤 다시 컴파일해야 합니다. 인터프리터는 바로 실행하고 어디서든 같은 코드가 돌지만 실행 중에 해석하는 비용이 듭니다. JIT 컴파일러는 실행 중 자주 쓰는 부분만 기계어로 바꿔 두 장점을 섞습니다.',language:'Python · 한 줄이 바이트코드 몇 개가 되는지 보기',code:`import dis

counter = 0

def add_one():
    global counter
    counter += 1   # 한 줄처럼 보이지만

dis.dis(add_one)
# Python 3.12 예시 출력:
#   LOAD_GLOBAL  counter   ← 메모리에서 값을 읽고
#   LOAD_CONST   1
#   BINARY_OP    +=        ← 더하고
#   STORE_GLOBAL counter   ← 다시 쓴다`,codeNotes:['dis 모듈은 Python이 함수를 어떤 바이트코드로 바꿨는지 보여 줍니다. 출력은 Python 버전마다 조금씩 다릅니다.','counter += 1이 읽기, 더하기, 쓰기 여러 명령으로 나뉘는 것을 확인하세요. 1장 동기화 단원의 경쟁 상태가 바로 이 틈에서 생깁니다.','다른 함수(리스트 컴프리헨션, if 문)도 dis로 열어 보며 한 줄이 몇 개의 명령이 되는지 비교해 보세요.'],answer:'컴퓨터는 메모리에 저장된 명령어를 CPU가 가져오고, 해석하고, 실행하는 일을 반복하는 기계입니다. 프로그램 카운터가 다음 명령의 위치를, 레지스터가 계산 중인 값을 기억합니다. 사람이 쓴 코드는 컴파일러가 미리 기계어로 바꾸거나 인터프리터가 실행하며 해석하는데 Python은 바이트코드로 바꾼 뒤 인터프리터가 실행합니다. 그래서 한 줄의 코드도 실제로는 여러 명령으로 나뉘어 실행됩니다.',follow:[['Python은 컴파일 언어인가요, 인터프리터 언어인가요?','둘 다의 성격이 있습니다. CPython은 소스를 먼저 바이트코드로 컴파일하고(.pyc 파일) 그 바이트코드를 인터프리터가 실행합니다. 기계어로 바꾸는 것은 아니라서 흔히 인터프리터 언어로 분류합니다.'],['레지스터와 메모리는 무엇이 다른가요?','레지스터는 CPU 안에 있는 수십 개 정도의 아주 작은 저장소로 한 사이클 안에 읽고 씁니다. 메모리는 CPU 밖에 있어 훨씬 크지만 접근에 수십~수백 배 시간이 걸립니다. 그래서 그 사이에 캐시가 있습니다.']],memory:'CPU는 꺼내고, 해석하고, 실행하고, 다음 줄로 간다. 한 줄의 코드는 여러 명령이다.',mistake:'"Python 코드를 CPU가 직접 실행한다"고 설명하지 마세요. CPU는 기계어만 실행하고 Python 코드는 인터프리터라는 프로그램이 대신 실행합니다.',quiz:{question:'counter += 1이 두 스레드에서 동시에 실행될 때 값이 사라질 수 있는 근본 이유는?',options:['CPU가 너무 빨라서','한 줄이 읽기·더하기·쓰기 여러 명령으로 나뉘어 그 사이에 끼어들 수 있어서','정수의 크기가 제한되어서'],correct:1,explanation:'바이트코드와 기계어 수준에서 여러 명령으로 나뉘기 때문에 그 사이에 다른 스레드가 실행될 수 있습니다.'},refs:['pyDis','threads']}),
l({id:'filesystem',category:1,title:'파일과 파일 시스템',english:'File / Directory / Inode / File Descriptor / fsync',hook:'파일을 저장했다는 메시지가 떴는데 전원이 나가면 그 파일은 정말 남아 있을까?',definition:'파일은 이름이 붙은 바이트의 나열이고 파일 시스템은 그 바이트들을 디스크의 어느 블록에 두었는지, 누가 주인이고 언제 바뀌었는지를 관리하는 운영체제의 구성 요소입니다. UNIX 계열에서는 파일의 정보(크기, 권한, 소유자, 데이터 블록의 위치)를 inode라는 구조에 담고 디렉터리는 이름과 inode 번호를 짝지은 목록입니다. 프로그램이 파일을 열면 운영체제는 작은 정수인 파일 디스크립터를 돌려주고 이후 읽기와 쓰기는 이 번호로 합니다. write가 성공해도 데이터는 먼저 메모리의 페이지 캐시에 들어갈 뿐이고 디스크에 확실히 남기려면 fsync를 불러야 합니다.',analogy:'도서관을 떠올리세요. 책장(디스크)에 책(데이터)이 꽂혀 있고 색인 카드(inode)에 책의 위치와 대출 규칙이 적혀 있습니다. 서가 안내판(디렉터리)은 "운영체제 → 카드 1042번"처럼 제목과 카드 번호만 알려 줍니다. 책을 빌리면 받는 대출 번호표(파일 디스크립터)로 이후 일을 처리합니다. 사서가 "반납 처리했어요"라고 해도 장부에 아직 옮겨 적지 않았다면(fsync 전) 정전 때 기록이 사라질 수 있습니다.',steps:['프로그램이 경로로 파일을 열면 운영체제가 디렉터리를 차례로 따라가 inode를 찾고 권한을 확인합니다.','운영체제가 열린 파일을 가리키는 파일 디스크립터 번호를 돌려줍니다.','read와 write는 이 번호로 하고 쓴 내용은 먼저 메모리의 페이지 캐시에 들어갑니다.','fsync를 부르거나 운영체제가 나중에 내려쓸 때 데이터가 디스크에 기록됩니다.'],scenario:'설정 파일을 그 자리에서 덮어쓰다가 서버가 재부팅되자 파일이 반쯤 쓰인 채 남아 앱이 시작하지 못했습니다. 새 내용을 임시 파일에 쓰고 fsync한 뒤 os.replace로 이름을 바꾸는 방식으로 고쳤습니다. 이름 바꾸기는 원자적이라 읽는 쪽은 옛 파일이나 새 파일 중 하나만 보고 반쯤 쓰인 파일은 보지 않습니다.',aws:'EC2의 EBS 볼륨은 블록 장치라 그 위에 ext4나 XFS 같은 파일 시스템을 만들어 씁니다. 여러 서버가 같은 파일을 함께 써야 하면 EFS 같은 네트워크 파일 시스템을, 파일을 통째로 올리고 받기만 하면 S3 같은 객체 스토리지를 씁니다.',ncloud:'서버의 기본 스토리지와 추가 블록 스토리지 위에 파일 시스템을 만들어 마운트합니다. 여러 서버가 함께 쓰는 파일은 NAS 상품을, 사용자 업로드 파일은 Object Storage를 검토합니다.',tradeoff:'매번 fsync하면 데이터가 안전하지만 디스크를 기다리느라 느려집니다. 페이지 캐시에 맡기면 빠르지만 정전 시 최근 쓰기가 사라질 수 있습니다. 그래서 DB는 꼭 필요한 순간(커밋)에만 로그를 fsync하고 나머지는 운영체제에 맡깁니다.',language:'Python · inode, 하드 링크, 안전한 덮어쓰기',code:`import os, tempfile

folder = tempfile.mkdtemp()
original = os.path.join(folder, "config.txt")
with open(original, "w") as f:
    f.write("timeout=5\\n")
    print("파일 디스크립터 번호:", f.fileno())

alias = os.path.join(folder, "config-link.txt")
os.link(original, alias)               # 같은 inode를 가리키는 두 번째 이름
a, b = os.stat(original), os.stat(alias)
print("같은 inode인가:", a.st_ino == b.st_ino, "· 이름 수:", a.st_nlink)

# 안전한 덮어쓰기: 임시 파일에 쓰고 fsync한 뒤 이름을 바꾼다
tmp = original + ".tmp"
with open(tmp, "w") as f:
    f.write("timeout=8\\n")
    f.flush()
    os.fsync(f.fileno())               # 디스크에 확실히 기록
os.replace(tmp, original)              # 원자적으로 교체
print(open(original).read().strip())`,codeNotes:['os.link로 만든 두 번째 이름은 복사본이 아니라 같은 inode를 가리킵니다. 그래서 st_ino가 같고 st_nlink가 2가 됩니다.','os.replace는 같은 파일 시스템 안에서 원자적이라 읽는 쪽이 반쯤 쓰인 파일을 볼 일이 없습니다.','os.fsync를 빼도 프로그램은 똑같이 동작하는 것처럼 보입니다. 차이는 정전이나 커널 장애 때만 드러납니다.'],answer:'파일 시스템은 이름 붙은 바이트를 디스크의 블록에 배치하고 그 정보를 관리합니다. UNIX 계열은 파일의 정보와 블록 위치를 inode에 두고 디렉터리는 이름과 inode 번호를 잇습니다. 프로그램은 파일 디스크립터로 읽고 쓰며 write는 먼저 페이지 캐시에 들어가므로 꼭 남아야 하는 데이터는 fsync하고 덮어쓰기는 임시 파일과 원자적 이름 바꾸기로 하겠습니다.',follow:[['파일을 지웠는데 디스크 공간이 안 줄어드는 이유는?','rm은 디렉터리에서 이름을 지울 뿐이고 그 파일을 열고 있는 프로세스가 있으면 inode와 데이터 블록은 남아 있습니다. 로그 파일을 지웠는데 공간이 그대로라면 lsof로 아직 열고 있는 프로세스를 찾아 재시작합니다.'],['하드 링크와 심볼릭 링크는 어떻게 다른가요?','하드 링크는 같은 inode를 가리키는 또 하나의 이름이라 원본 이름을 지워도 데이터가 남습니다. 심볼릭 링크는 다른 경로를 적어 둔 작은 파일이라 원본이 사라지면 끊어집니다.']],memory:'이름은 디렉터리에, 정보는 inode에, 내용은 블록에. 저장했다는 말은 fsync 뒤에 믿는다.',mistake:'write가 성공했다고 디스크에 저장됐다고 단정하지 마세요. 정전에 대비해야 하는 데이터는 fsync가 필요합니다.',quiz:{question:'설정 파일을 덮어쓰는 도중 서버가 꺼져도 반쯤 쓰인 파일이 남지 않게 하는 방법은?',options:['더 빠른 디스크를 쓴다','임시 파일에 쓰고 fsync한 뒤 원자적으로 이름을 바꾼다','파일 권한을 777로 바꾼다'],correct:1,explanation:'이름 바꾸기는 원자적이라 읽는 쪽은 옛 파일이나 새 파일 중 하나만 봅니다.'},refs:['fsyncMan','linux']})
];
// Reading order inside a chapter when it differs from the order lessons were written in; unlisted lessons keep their place after these.
const sequence: Record<number, string[]> = {
 1: ['machine', 'process', 'scheduling', 'sync', 'deadlock', 'memory', 'filesystem', 'linux', 'diagnosis'],
 0: ['dns', 'tcp', 'nat', 'http', 'tls', 'websocket'],
 2: ['kit', 'rest', 'async', 'proxy', 'ratelimit'],
 3: ['normalization', 'join', 'index', 'transaction', 'database-choice', 'cache', 'queue', 'replication', 'raft'],
 5: ['session', 'cors', 'validation', 'iam'],
 4: ['docker', 'vpc', 'lb', 'storage', 'kubernetes'],
 6: ['git', 'pytest', 'cicd', 'observability', 'scale', 'recovery']
};
const position = (x: Lesson) => { const i = sequence[x.category]?.indexOf(x.id) ?? -1; return i < 0 ? Infinity : i; };
export const lessons = [...core, ...operatingSystem, ...expansion, ...additions].sort((a,b) => a.category-b.category || position(a)-position(b));

