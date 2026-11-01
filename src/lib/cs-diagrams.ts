// 단원별 개념 그림. 단계마다 한 가지가 바뀌도록 짠 고정 예제이며 실제 시스템을 실행하거나 측정하지 않습니다.
export type Tone='ok'|'fail'|'wait'|'note';
export type SequenceStep={from:number;to:number;label:string;tone?:Tone;caption:string};
export type TableStep={rows:string[][];highlight?:number[];packet?:string;caption:string};
export type TimelineStep={lane:number;text:string;tone?:Tone;state?:string;caption:string};
export type FlowStep={active:number;status:Record<number,Tone>;result?:string;caption:string};
export type Diagram=
 |{kind:'sequence';title:string;lanes:string[];steps:SequenceStep[]}
 |{kind:'table';title:string;columns:string[];packetLabel?:string;steps:TableStep[]}
 |{kind:'timeline';title:string;lanes:string[];stateLabel?:string;steps:TimelineStep[]}
 |{kind:'flow';title:string;nodes:{label:string;sub?:string}[];steps:FlowStep[]};

export const diagrams:Record<string,Diagram>={
 memory:{kind:'flow',title:'가상 주소 하나가 실제 RAM에 닿기까지',
  nodes:[
   {label:'프로그램이 주소를 읽음',sub:'가상 주소 0x7f3a_2040'},
   {label:'TLB 확인',sub:'최근 변환 결과 캐시'},
   {label:'페이지 테이블 탐색',sub:'x86-64는 보통 4단계'},
   {label:'페이지가 RAM에 있는가',sub:'없으면 페이지 폴트'},
   {label:'디스크에서 읽어 오기',sub:'무거운 페이지 폴트'},
   {label:'물리 주소로 접근',sub:'프레임 0x1a2b + 0x040'}
  ],
  steps:[
   {active:0,status:{0:'ok'},caption:'프로그램은 실제 RAM 위치를 모른 채 자기 주소 공간의 가상 주소만 씁니다.'},
   {active:1,status:{0:'ok',1:'fail'},caption:'CPU가 먼저 TLB에서 이 페이지의 변환 결과를 찾지만 최근에 쓴 적이 없어 없습니다(TLB 미스).'},
   {active:2,status:{0:'ok',1:'fail',2:'ok'},caption:'페이지 테이블을 단계별로 따라 내려가 이 페이지에 대한 항목을 찾습니다.'},
   {active:3,status:{0:'ok',1:'fail',2:'ok',3:'fail'},caption:'항목에는 "지금 RAM에 없음"이라고 표시되어 있습니다. CPU가 페이지 폴트로 커널을 부릅니다.'},
   {active:4,status:{0:'ok',1:'fail',2:'ok',3:'fail',4:'wait'},caption:'내용이 스왑이나 파일에 있으므로 커널이 디스크에서 읽어 빈 프레임에 올립니다. 메모리 접근보다 수천 배 이상 느린 구간입니다.'},
   {active:5,status:{0:'ok',1:'fail',2:'ok',3:'ok',4:'ok',5:'ok'},result:'다음 접근부터는 TLB에서 바로 변환됩니다.',caption:'페이지 테이블을 고치고 명령을 다시 실행해 물리 주소로 읽습니다. 변환 결과는 TLB에 넣어 둡니다.'}
  ]},
 linux:{kind:'flow',title:'UID 1001(app)이 /srv/app/config.yml을 열 때',
  nodes:[
   {label:'root(UID 0)인가',sub:'맞으면 대부분 통과'},
   {label:'파일 소유자인가',sub:'소유자: root → 칸 rw-'},
   {label:'파일 그룹에 속하는가',sub:'그룹: app → 칸 r--'},
   {label:'기타 사용자',sub:'칸 ---'}
  ],
  steps:[
   {active:0,status:{0:'note'},caption:'파일 권한은 rw-r----- root:app입니다. 프로세스는 UID 1001(app), 보조 그룹에 app이 있습니다. 먼저 root인지 봅니다. 아닙니다.'},
   {active:1,status:{0:'note',1:'note'},caption:'파일 소유자는 root라서 소유자 칸(rw-)은 이 프로세스에 적용되지 않습니다.'},
   {active:2,status:{0:'note',1:'note',2:'ok'},result:'읽기 허용, 쓰기 거부',caption:'프로세스가 파일의 그룹 app에 속하므로 그룹 칸 r--만 적용됩니다. 읽기는 되고 쓰기는 안 됩니다.'},
   {active:3,status:{0:'note',1:'note',2:'ok',3:'note'},result:'읽기 허용, 쓰기 거부',caption:'이미 그룹 칸에서 결정됐으므로 기타 칸은 보지 않습니다. 첫 번째로 맞은 칸 하나만 적용됩니다.'}
  ]},
 diagnosis:{kind:'flow',title:'휴대폰에서 PC 개발 서버(http://192.168.0.12:5173)가 안 열릴 때',
  nodes:[
   {label:'이름·주소 확인',sub:'192.168.0.12는 PC의 LAN 주소'},
   {label:'TCP 연결',sub:'Test-NetConnection / nc -vz'},
   {label:'서버 바인딩 확인',sub:'ss -ltnp: 어느 주소에서 듣는가'},
   {label:'HTTP 응답',sub:'curl -v'}
  ],
  steps:[
   {active:0,status:{0:'ok'},caption:'주소는 IP라 이름 해석이 필요 없습니다. 휴대폰과 PC가 같은 Wi-Fi이고 주소도 맞습니다.'},
   {active:1,status:{0:'ok',1:'fail'},result:'Connection refused',caption:'즉시 Connection refused가 납니다. PC까지는 닿았지만 그 포트에서 받는 프로그램이 없다는 뜻입니다. 경로와 방화벽은 일단 통과입니다.'},
   {active:2,status:{0:'ok',1:'fail',2:'fail'},result:'127.0.0.1:5173에서만 리스닝',caption:'PC에서 ss -ltnp를 보니 서버가 127.0.0.1:5173에만 바인딩되어 있습니다. 같은 컴퓨터 안의 요청만 받는 설정입니다.'},
   {active:2,status:{0:'ok',1:'fail',2:'ok'},result:'0.0.0.0:5173으로 다시 실행',caption:'서버를 --host 0.0.0.0으로 다시 띄우면 모든 IPv4 인터페이스에서 받습니다.'},
   {active:3,status:{0:'ok',1:'ok',2:'ok',3:'ok'},result:'HTTP/1.1 200 OK',caption:'TCP 연결이 되고 HTTP 200이 돌아옵니다. 아래 단계부터 확인하면 고칠 곳이 바로 보입니다.'}
  ]},
 tcp:{kind:'sequence',title:'연결을 열고, 데이터를 보내고, 닫기까지',lanes:['클라이언트','서버'],
  steps:[
   {from:0,to:1,label:'SYN  seq=100',caption:'클라이언트가 무작위로 고른 시작 순서 번호 100과 함께 SYN을 보냅니다.'},
   {from:1,to:0,label:'SYN/ACK  seq=300 ack=101',caption:'서버가 "101번부터 받을 준비가 됐다"고 확인하면서 자기 시작 번호 300을 보냅니다.'},
   {from:0,to:1,label:'ACK  ack=301',caption:'클라이언트가 서버의 번호를 확인합니다. 이제 양쪽 모두 상대의 시작 번호를 알고 연결이 열립니다.'},
   {from:0,to:1,label:'데이터 100바이트  seq=101',caption:'요청 데이터 100바이트를 보냅니다. 순서 번호는 101부터 200까지를 차지합니다.'},
   {from:1,to:0,label:'ACK  ack=201',caption:'서버는 다음에 받을 위치 201을 알려 줍니다. 이 확인이 오지 않으면 클라이언트는 같은 데이터를 다시 보냅니다.'},
   {from:0,to:1,label:'FIN',caption:'보낼 데이터가 끝난 클라이언트가 먼저 FIN을 보냅니다. 반대 방향은 아직 열려 있습니다.'},
   {from:1,to:0,label:'ACK',caption:'서버가 FIN을 확인합니다. 서버는 남은 응답을 마저 보낼 수 있습니다.'},
   {from:1,to:0,label:'FIN',caption:'서버도 보낼 것이 끝나 FIN을 보냅니다.'},
   {from:0,to:1,label:'ACK',caption:'클라이언트가 마지막 ACK를 보냅니다.'},
   {from:0,to:0,label:'TIME_WAIT',tone:'wait',caption:'먼저 끊은 클라이언트는 마지막 ACK가 사라졌을 때를 대비해 한동안 TIME_WAIT 상태로 기다린 뒤 완전히 닫습니다.'}
  ]},
 nat:{kind:'table',title:'공유기의 변환 테이블이 채워지고 쓰이는 과정',columns:['내부 주소:포트','바깥 주소:포트','상대 주소:포트','남은 시간'],packetLabel:'지금 지나가는 패킷',
  steps:[
   {rows:[],packet:'노트북 192.168.0.10:51000 → 203.0.113.80:443',caption:'노트북이 웹 서버로 요청을 보냅니다. 출발지는 사설 주소라 그대로는 인터넷에서 돌아올 수 없습니다.'},
   {rows:[['192.168.0.10:51000','198.51.100.20:62001','203.0.113.80:443','300초']],highlight:[0],packet:'198.51.100.20:62001 → 203.0.113.80:443',caption:'공유기가 출발지를 공인 IP의 62001번 포트로 바꾸고 그 대응을 표에 적습니다.'},
   {rows:[['192.168.0.10:51000','198.51.100.20:62001','203.0.113.80:443','300초']],highlight:[0],packet:'203.0.113.80:443 → 198.51.100.20:62001 ⇒ 192.168.0.10:51000',caption:'응답이 62001번으로 돌아오면 표에서 찾아 목적지를 노트북의 원래 주소로 되돌립니다.'},
   {rows:[['192.168.0.10:51000','198.51.100.20:62001','203.0.113.80:443','280초'],['192.168.0.11:40000','198.51.100.20:62002','203.0.113.80:443','300초']],highlight:[1],packet:'휴대폰 192.168.0.11:40000 → 203.0.113.80:443',caption:'휴대폰이 같은 서버에 접속하면 다른 바깥 포트 62002를 받습니다. 응답이 섞이지 않는 이유입니다.'},
   {rows:[['192.168.0.11:40000','198.51.100.20:62002','203.0.113.80:443','10초']],packet:'바깥에서 198.51.100.20:62001 → ?',caption:'노트북 연결이 한동안 조용해 항목이 지워졌습니다. 이제 62001번으로 오는 패킷은 갈 곳이 없어 버려집니다. 오래 열어 두는 연결에 keepalive가 필요한 이유입니다.'}
  ]},
 deadlock:{kind:'timeline',title:'A→B와 B→A 송금이 동시에 실행될 때',lanes:['트랜잭션 A (1→2)','트랜잭션 B (2→1)'],stateLabel:'잠금 상태',
  steps:[
   {lane:0,text:'계좌 1 잠금',tone:'ok',state:'1: A',caption:'A가 보내는 계좌 1의 행을 잠급니다.'},
   {lane:1,text:'계좌 2 잠금',tone:'ok',state:'1: A · 2: B',caption:'거의 동시에 B가 보내는 계좌 2의 행을 잠급니다.'},
   {lane:0,text:'계좌 2를 기다림',tone:'wait',state:'1: A · 2: B · A→B 대기',caption:'A가 받는 계좌 2를 잠그려 하지만 B가 쥐고 있어 기다립니다.'},
   {lane:1,text:'계좌 1을 기다림',tone:'fail',state:'A→B, B→A 원 완성',caption:'B도 계좌 1을 기다립니다. 서로가 서로를 기다리는 원이 생겨 둘 다 영원히 진행할 수 없습니다.'},
   {lane:1,text:'deadlock detected로 중단',tone:'fail',state:'1: A · 2: 풀림',caption:'DB가 대기 그래프에서 원을 찾아 B를 중단시키고 B의 잠금을 풉니다. B를 보낸 앱은 트랜잭션 전체를 다시 실행해야 합니다.'},
   {lane:0,text:'계좌 2 잠금 · 커밋',tone:'ok',state:'잠금 없음',caption:'A는 계좌 2를 얻어 송금을 마칩니다. 두 트랜잭션이 모두 계좌 번호가 작은 쪽부터 잠갔다면 이 원은 처음부터 생기지 않습니다.'}
  ]},
 dns:{kind:'sequence',title:'www.example.com의 주소를 처음 찾을 때',lanes:['내 컴퓨터','재귀 리졸버','루트','.com 서버','권한 서버'],
  steps:[
   {from:0,to:0,label:'캐시 확인: 없음',tone:'note',caption:'브라우저와 운영체제 캐시, hosts 파일에 답이 없습니다.'},
   {from:0,to:1,label:'www.example.com A?',caption:'운영체제가 설정된 재귀 리졸버에게 묻습니다.'},
   {from:1,to:2,label:'www.example.com A?',caption:'리졸버도 캐시에 없어서 루트 서버부터 묻습니다.'},
   {from:2,to:1,label:'.com은 저 서버들에게',caption:'루트는 답을 모르지만 .com을 맡은 서버 목록(NS)을 알려 줍니다.'},
   {from:1,to:3,label:'www.example.com A?',caption:'리졸버가 .com 서버에 묻습니다.'},
   {from:3,to:1,label:'example.com은 ns1.example.com에게',caption:'.com 서버는 example.com의 권한 서버를 알려 줍니다.'},
   {from:1,to:4,label:'www.example.com A?',caption:'권한 서버에 묻습니다.'},
   {from:4,to:1,label:'A 203.0.113.10  TTL 300',caption:'권한 서버가 주소와 TTL 300초를 돌려줍니다.'},
   {from:1,to:0,label:'A 203.0.113.10',caption:'리졸버는 이 답을 300초 동안 캐시하고 내 컴퓨터에 돌려줍니다. 루트와 .com의 답도 각자의 TTL만큼 캐시됩니다.'},
   {from:0,to:1,label:'1분 뒤 같은 질문',tone:'note',caption:'다른 사람이 같은 리졸버에 1분 뒤 같은 이름을 물으면 리졸버가 캐시에서 바로 답합니다. 남은 TTL은 240초입니다.'}
  ]},
 http:{kind:'sequence',title:'HTTPS 연결이 열리고 첫 요청이 오가기까지 (TLS 1.3)',lanes:['브라우저','서버'],
  steps:[
   {from:0,to:1,label:'ClientHello · SNI · 키 공유값',caption:'브라우저가 지원하는 암호 방식, 키 합의에 쓸 공개값, 접속할 도메인 이름(SNI)을 보냅니다.'},
   {from:1,to:0,label:'ServerHello · 키 공유값',caption:'서버가 방식을 고르고 자기 공개값을 보냅니다. 이제 양쪽이 같은 비밀 키를 계산하고 이후 메시지는 암호화됩니다.'},
   {from:1,to:0,label:'인증서 · 서명 · Finished',caption:'서버가 인증서와, 인증서의 개인키로 지금까지의 대화에 서명한 값을 보냅니다.'},
   {from:0,to:0,label:'인증서 검증',tone:'note',caption:'브라우저가 신뢰하는 루트까지 서명이 이어지는지, 도메인 이름이 맞는지, 유효 기간 안인지, 서명이 맞는지 확인합니다.'},
   {from:0,to:1,label:'Finished',caption:'브라우저도 대화 내용을 확인하는 Finished를 보냅니다. 왕복 한 번으로 핸드셰이크가 끝났습니다.'},
   {from:0,to:1,label:'GET /orders  (암호화)',caption:'이제 HTTP 요청을 암호화된 연결 안에서 보냅니다. 중간에서는 내용을 볼 수도 바꿀 수도 없습니다.'},
   {from:1,to:0,label:'200 OK · JSON  (암호화)',caption:'서버의 응답도 암호화되어 돌아옵니다.'},
   {from:0,to:1,label:'GET /orders/1042  (같은 연결)',tone:'note',caption:'다음 요청은 같은 연결을 재사용하므로 핸드셰이크를 다시 하지 않습니다.'}
  ]},
 kit:{kind:'flow',title:'POST /orders {item: 42, qty: 2, price: 100}을 서버가 처리할 때',
  nodes:[
   {label:'인증',sub:'세션 쿠키로 사용자 확인'},
   {label:'형식 검증',sub:'item 정수, qty 1~99'},
   {label:'권한',sub:'이 사용자가 주문할 수 있는가'},
   {label:'업무 규칙',sub:'재고 확인, 가격은 서버가 계산'},
   {label:'응답 고르기',sub:'화면에 필요한 필드만'}
  ],
  steps:[
   {active:0,status:{0:'ok'},caption:'쿠키의 세션 ID로 사용자 7임을 확인합니다.'},
   {active:1,status:{0:'ok',1:'ok'},caption:'스키마에 맞는지 봅니다. price 필드는 스키마에 없는 값이라 무시합니다.'},
   {active:2,status:{0:'ok',1:'ok',2:'ok'},caption:'사용자 7은 정상 회원이라 주문을 만들 수 있습니다.'},
   {active:3,status:{0:'ok',1:'ok',2:'ok',3:'ok'},result:'합계 = 상품 42의 DB 가격 15,000원 × 2 = 30,000원',caption:'브라우저가 보낸 price 100은 쓰지 않고 DB의 가격으로 다시 계산합니다. 화면에서 가격을 바꿔 보내도 소용이 없습니다.'},
   {active:4,status:{0:'ok',1:'ok',2:'ok',3:'ok',4:'ok'},result:'201 {"orderId": 5531, "total": 30000}',caption:'주문 ID와 합계만 돌려줍니다. 내부 메모나 다른 사용자 정보는 응답에 넣지 않습니다.'}
  ]},
 async:{kind:'timeline',title:'외부 API 호출과 DB 조회를 한 이벤트 루프에서',lanes:['태스크 A (API 호출)','태스크 B (DB 조회)'],stateLabel:'이벤트 루프',
  steps:[
   {lane:0,text:'요청 전송 → await',tone:'wait',state:'A 대기, B 차례',caption:'A가 외부 API에 요청을 보내고 await에서 차례를 루프에 돌려줍니다.'},
   {lane:1,text:'쿼리 전송 → await',tone:'wait',state:'둘 다 대기 · epoll로 기다림',caption:'루프가 B를 실행하고 B도 DB에 쿼리를 보낸 뒤 await합니다. 루프는 운영체제에 두 소켓 중 준비된 것을 묻고 기다립니다.'},
   {lane:1,text:'결과 도착 · 이어서 실행',tone:'ok',state:'B 실행',caption:'DB 응답이 먼저 도착해 B가 멈췄던 자리에서 이어서 실행하고 끝납니다.'},
   {lane:0,text:'응답 도착 · 이어서 실행',tone:'ok',state:'A 실행',caption:'API 응답이 도착해 A가 이어서 실행됩니다. 전체 시간은 두 대기 시간의 합이 아니라 더 긴 쪽에 가깝습니다.'},
   {lane:0,text:'time.sleep(1) 호출',tone:'fail',state:'루프 전체 1초 멈춤',caption:'만약 A가 asyncio.sleep 대신 time.sleep(1)을 부르면 스레드가 통째로 멈춰 그동안 B도, 다른 모든 요청도 진행되지 않습니다.'}
  ]},
 rest:{kind:'table',title:'멱등 키 저장소가 중복 결제를 막는 과정',columns:['멱등 키','요청 내용 해시','상태','저장된 응답'],packetLabel:'지금 들어온 요청',
  steps:[
   {rows:[],packet:'POST /payments  Idempotency-Key: K1  {order: 88, amount: 30000}',caption:'클라이언트가 결제 요청마다 새 키 K1을 만들어 붙입니다.'},
   {rows:[['K1','a3f9…','처리 중','—']],highlight:[0],packet:'(서버가 카드사에 결제 요청 중)',caption:'처음 보는 키라 기록하고 처리를 시작합니다. 같은 키로 동시에 오는 요청은 이 상태를 보고 막습니다.'},
   {rows:[['K1','a3f9…','완료','201 {paymentId: 771}']],highlight:[0],packet:'응답 201이 네트워크에서 사라짐',caption:'결제는 끝났고 응답을 저장했지만 응답이 클라이언트에 닿기 전에 연결이 끊겼습니다.'},
   {rows:[['K1','a3f9…','완료','201 {paymentId: 771}']],highlight:[0],packet:'재시도  Idempotency-Key: K1  같은 내용',caption:'클라이언트가 같은 키로 다시 보냅니다. 서버는 결제를 다시 하지 않고 저장해 둔 201을 그대로 돌려줍니다.'},
   {rows:[['K1','a3f9…','완료','201 {paymentId: 771}']],highlight:[0],packet:'Idempotency-Key: K1  {order: 88, amount: 1000}',caption:'같은 키인데 내용이 다르면 클라이언트의 실수이므로 처리하지 않고 오류로 거절합니다.'}
  ]},
 proxy:{kind:'sequence',title:'느린 리포트 요청이 502로 끝나는 과정',lanes:['사용자','nginx','앱 워커 (gunicorn)','DB'],
  steps:[
   {from:0,to:1,label:'GET /report',caption:'사용자의 요청이 nginx에 도착합니다.'},
   {from:1,to:2,label:'GET /report · X-Forwarded-For',caption:'nginx가 원래 사용자 주소를 헤더에 붙여 앱 워커에 넘깁니다. nginx의 읽기 타임아웃은 기본 60초입니다.'},
   {from:2,to:3,label:'큰 집계 쿼리',caption:'워커가 DB에 무거운 쿼리를 보냅니다.'},
   {from:3,to:3,label:'잠금 대기 · 35초째 응답 없음',tone:'wait',caption:'쿼리가 잠금을 기다리느라 30초가 넘도록 끝나지 않습니다.'},
   {from:2,to:2,label:'워커 timeout 30초 → 강제 재시작',tone:'fail',caption:'gunicorn은 30초 동안 응답하지 않는 워커를 죽이고 새로 띄웁니다. 처리 중이던 요청의 연결도 함께 끊깁니다.'},
   {from:2,to:1,label:'연결 끊김 (응답 없음)',tone:'fail',caption:'nginx는 업스트림이 응답 도중 연결을 끊은 것을 봅니다.'},
   {from:1,to:0,label:'502 Bad Gateway',tone:'fail',caption:'nginx의 60초가 지나기 전에 앱 쪽이 먼저 끊었으므로 504가 아니라 502입니다. 고칠 곳은 DB 잠금과 쿼리이고 타임아웃만 늘리면 대기열만 길어집니다.'}
  ]},
 index:{kind:'flow',title:'WHERE id = 4210을 B-tree 인덱스로 찾을 때',
  nodes:[
   {label:'루트 노드',sub:'키 [1000 | 5000 | 9000]'},
   {label:'중간 노드',sub:'키 [4000 | 4500]'},
   {label:'잎 노드',sub:'… 4198, 4210, 4233 … → 행 위치'},
   {label:'테이블 페이지',sub:'행 (217, 3) 읽기'}
  ],
  steps:[
   {active:0,status:{0:'ok'},caption:'루트에서 4210을 키들과 비교합니다. 1000 이상 5000 미만이므로 두 번째 자식으로 내려갑니다.'},
   {active:1,status:{0:'ok',1:'ok'},caption:'중간 노드에서 4000 이상 4500 미만이므로 해당 잎으로 내려갑니다.'},
   {active:2,status:{0:'ok',1:'ok',2:'ok'},caption:'잎 노드에서 4210을 찾습니다. 잎에는 그 행이 테이블의 217번 페이지 3번째 칸에 있다고 적혀 있습니다.'},
   {active:3,status:{0:'ok',1:'ok',2:'ok',3:'ok'},result:'페이지 4개를 읽고 끝 · 순차 스캔이면 테이블 전체를 읽어야 함',caption:'테이블 페이지에서 행을 읽습니다. 행이 수백만 개여도 이 정도 단계로 끝납니다. 조건이 전체의 상당 부분에 걸리면 옵티마이저는 오히려 순차 스캔을 고릅니다.'}
  ]},
 transaction:{kind:'timeline',title:'마지막 재고 1개를 두 요청이 동시에 살 때',lanes:['요청 A','요청 B'],stateLabel:'재고 qty',
  steps:[
   {lane:0,text:'SELECT qty → 1',tone:'ok',state:'1',caption:'READ COMMITTED에서 A가 재고를 읽습니다. 1개 남았습니다.'},
   {lane:1,text:'SELECT qty → 1',tone:'ok',state:'1',caption:'거의 동시에 B도 1을 읽습니다. A가 아직 아무것도 바꾸지 않았기 때문입니다.'},
   {lane:0,text:'UPDATE qty = 0 · 커밋',tone:'ok',state:'0',caption:'A가 "1개 있으니 판다"고 판단해 0으로 바꾸고 커밋합니다.'},
   {lane:1,text:'UPDATE qty = 0 · 커밋',tone:'fail',state:'0 · 주문은 2건',caption:'B도 자기가 읽은 1을 근거로 0으로 바꿉니다. 주문은 두 건인데 재고는 하나뿐이었습니다. 갱신 손실입니다.'},
   {lane:0,text:'UPDATE … SET qty = qty - 1 WHERE qty > 0 → 1행',tone:'ok',state:'0',caption:'고친 방법: 읽고 판단하지 말고 조건과 변경을 한 문장으로 씁니다. A의 문장은 1행을 바꿉니다.'},
   {lane:1,text:'같은 문장 → 0행 · 품절 처리',tone:'note',state:'0 · 주문은 1건',caption:'B의 문장이 실행될 때는 qty > 0 조건에 맞는 행이 없어 0행이 바뀝니다. 앱은 이것을 보고 품절로 처리합니다.'}
  ]},
 cache:{kind:'table',title:'cache-aside로 상품 정보를 읽고 고칠 때',columns:['캐시 키','값','남은 TTL'],packetLabel:'지금 일어나는 일',
  steps:[
   {rows:[],packet:'GET product:7 → 캐시 미스 → DB에서 읽음',caption:'처음 요청이라 캐시에 없어 DB에서 읽습니다.'},
   {rows:[['product:7','{"price": 15000}','300초']],highlight:[0],packet:'읽은 값을 TTL 300초로 캐시에 저장',caption:'읽은 결과를 TTL과 함께 캐시에 넣고 돌려줍니다.'},
   {rows:[['product:7','{"price": 15000}','240초']],highlight:[0],packet:'GET product:7 → 캐시 적중',caption:'1분 뒤 같은 요청은 DB에 가지 않고 캐시에서 답합니다.'},
   {rows:[],packet:'가격 변경: DB를 18000으로 고친 뒤 캐시 키 삭제',caption:'가격이 바뀌면 DB를 먼저 고치고 캐시의 키를 지웁니다. 캐시에 새 값을 직접 쓰지 않습니다.'},
   {rows:[['product:7','{"price": 18000}','300초']],highlight:[0],packet:'GET product:7 → 미스 → DB의 새 값으로 다시 채움',caption:'다음 요청이 DB의 최신 값으로 캐시를 다시 채웁니다.'}
  ]},
 queue:{kind:'table',title:'SQS 메시지가 실패와 재시도를 거치는 과정',columns:['메시지','상태','받은 횟수','다시 보이는 시각'],packetLabel:'지금 일어나는 일',
  steps:[
   {rows:[['order-41','대기','0','—']],highlight:[0],packet:'주문 서비스가 "order-41 이메일 발송" 메시지를 보냄',caption:'생산자가 메시지를 큐에 넣고 바로 다음 일을 합니다.'},
   {rows:[['order-41','처리 중 (숨김)','1','12:00:30']],highlight:[0],packet:'워커 1이 메시지를 받음',caption:'워커 1이 받아 가면 가시성 타임아웃(기본 30초) 동안 다른 워커에게 보이지 않습니다.'},
   {rows:[['order-41','처리 중 (숨김)','1','12:00:30']],highlight:[0],packet:'워커 1이 처리 도중 죽음 · 삭제 요청 없음',caption:'워커 1이 이메일을 보낸 직후, 삭제하기 전에 죽었습니다. 큐는 처리됐는지 알 수 없습니다.'},
   {rows:[['order-41','처리 중 (숨김)','2','12:01:05']],highlight:[0],packet:'타임아웃이 지나 다시 보임 → 워커 2가 받음',caption:'30초가 지나 메시지가 다시 보이고 워커 2가 받습니다. 같은 메시지가 두 번 처리될 수 있는 순간입니다.'},
   {rows:[],packet:'워커 2: "order-41 발송함" 기록 확인 → 건너뛰고 삭제',caption:'워커 2는 처리 기록 테이블에서 order-41을 이미 보냈음을 확인하고 다시 보내지 않고 메시지를 삭제합니다. 멱등한 소비자입니다.'}
  ]},
 normalization:{kind:'table',title:'주소를 주문마다 복사했을 때와 나눴을 때',columns:['표 · 행','저장된 내용'],packetLabel:'지금 일어나는 일',
  steps:[
   {rows:[['주문 1','민수 · 서울 마포구 · 키보드 · 39,000원'],['주문 2','민수 · 서울 마포구 · 마우스 · 19,000원']],packet:'고객 정보를 주문 행마다 복사해 둔 표',caption:'고객 이름과 주소가 주문마다 반복해서 저장되어 있습니다.'},
   {rows:[['주문 1','민수 · 부산 해운대구 · 키보드 · 39,000원'],['주문 2','민수 · 서울 마포구 · 마우스 · 19,000원']],highlight:[0,1],packet:'민수가 이사함 → 주문 1의 주소만 고침',caption:'한 행만 고치면 같은 고객의 주소가 두 개가 됩니다. 수정 이상입니다.'},
   {rows:[['고객 7','민수 · 서울 마포구'],['주문 1','고객 7 · 키보드 · 당시 가격 39,000원'],['주문 2','고객 7 · 마우스 · 당시 가격 19,000원']],packet:'고객 표를 나누고 주문에는 고객 ID만 둠',caption:'고객 정보는 고객 표 한 곳에만 둡니다. 주문 당시 가격은 그 시점의 기록이라 주문 항목에 그대로 남깁니다.'},
   {rows:[['고객 7','민수 · 부산 해운대구'],['주문 1','고객 7 · 키보드 · 당시 가격 39,000원'],['주문 2','고객 7 · 마우스 · 당시 가격 19,000원']],highlight:[0],packet:'이사 → 고객 7 한 행만 고침 · 키보드 가격이 45,000원으로 올라도 주문 1은 그대로',caption:'고칠 곳이 하나뿐이라 어긋날 수 없고 상품 가격이 바뀌어도 지난 주문 금액은 바뀌지 않습니다.'}
  ]},
 join:{kind:'table',title:'고객 A(주문 2개), B(1개), C(0개)를 조인하면',columns:['고객','주문 ID','금액'],packetLabel:'실행한 SQL',
  steps:[
   {rows:[['A','101','30,000'],['A','102','12,000'],['B','103','8,000']],packet:'customers c INNER JOIN orders o ON o.customer_id = c.id',caption:'INNER JOIN은 짝이 있는 행만 남깁니다. A는 주문 수만큼 두 번 나오고 주문이 없는 C는 빠집니다.'},
   {rows:[['A','101','30,000'],['A','102','12,000'],['B','103','8,000'],['C','NULL','NULL']],highlight:[3],packet:'customers c LEFT JOIN orders o ON o.customer_id = c.id',caption:'LEFT JOIN은 왼쪽의 모든 고객을 남기고 짝이 없는 C는 주문 컬럼을 NULL로 채웁니다.'},
   {rows:[['A','101','30,000'],['B','103','8,000']],packet:'… LEFT JOIN orders o ON … WHERE o.status = \'paid\'  (102는 미결제)',caption:'오른쪽 조건을 WHERE에 두면 NULL인 C의 행이 조건에서 걸러져 INNER JOIN처럼 됩니다. 결제 완료 주문이 없는 고객까지 남기려면 이 조건을 ON에 둡니다.'},
   {rows:[['A','2','—'],['B','1','—'],['C','0','—']],highlight:[2],packet:'SELECT c.name, COUNT(o.id) … LEFT JOIN … GROUP BY c.name',caption:'주문 수는 COUNT(o.id)로 셉니다. COUNT(*)로 세면 NULL로 채운 C의 행도 1로 세어 버립니다.'}
  ]},
 'database-choice':{kind:'flow',title:'저장소를 고를 때 던지는 질문',
  nodes:[
   {label:'여러 항목을 함께 맞춰 바꿔야 하는가',sub:'주문·재고·결제처럼'},
   {label:'관계가 많고 새 질문이 자주 생기는가',sub:'다양한 조인과 집계'},
   {label:'키 하나로 읽고 쓰는가',sub:'접근 패턴이 정해져 있음'},
   {label:'잠깐 틀리거나 사라져도 되는가',sub:'다시 만들 수 있는 데이터'}
  ],
  steps:[
   {active:0,status:{0:'ok'},caption:'주문 데이터부터 봅니다. 주문을 만들 때 재고 차감과 결제 기록이 함께 맞아야 합니다.'},
   {active:1,status:{0:'ok',1:'ok'},caption:'월별, 상품별, 고객별 매출처럼 새 질문이 계속 생깁니다.'},
   {active:3,status:{0:'ok',1:'ok',2:'note',3:'fail'},result:'주문: 관계형 DB (PostgreSQL)',caption:'잠깐이라도 틀리면 안 되는 데이터입니다. 트랜잭션과 제약, SQL이 있는 관계형 DB가 맞습니다.'},
   {active:2,status:{0:'note',1:'note',2:'ok'},caption:'이번에는 장바구니를 봅니다. 사용자 ID 하나로 통째로 읽고 쓰고 다른 데이터와 함께 맞출 일이 거의 없습니다.'},
   {active:3,status:{0:'note',1:'note',2:'ok',3:'ok'},result:'장바구니: 키값 저장소 (Redis, DynamoDB)',caption:'사라져도 다시 담으면 되는 데이터라 빠른 키값 저장소가 잘 맞습니다. 같은 서비스 안에서도 데이터마다 답이 다를 수 있습니다.'}
  ]},
 session:{kind:'sequence',title:'로그인부터 로그아웃까지 세션 쿠키가 하는 일',lanes:['브라우저','서버','세션 저장소'],
  steps:[
   {from:0,to:1,label:'POST /login  아이디·비밀번호',caption:'사용자가 로그인 폼을 제출합니다.'},
   {from:1,to:1,label:'저장된 해시와 비교',tone:'note',caption:'서버가 비밀번호를 저장된 Argon2 해시와 비교해 확인합니다.'},
   {from:1,to:2,label:'sid=9f2c… → 사용자 42',caption:'추측할 수 없는 새 세션 ID를 만들어 저장소에 사용자와 만료 시각을 기록합니다.'},
   {from:1,to:0,label:'Set-Cookie: sid · HttpOnly · Secure · SameSite=Lax',caption:'세션 ID를 쿠키로 보냅니다. 스크립트는 읽을 수 없고 HTTPS로만, 같은 사이트 요청에만 붙습니다.'},
   {from:0,to:1,label:'GET /orders  Cookie: sid=9f2c…',caption:'브라우저는 이후 요청마다 쿠키를 자동으로 붙입니다.'},
   {from:1,to:2,label:'sid=9f2c… 조회 → 사용자 42',caption:'서버는 저장소에서 사용자를 찾고 그 사용자의 주문만 조회합니다. 인증 다음에 권한 검사가 따로 있습니다.'},
   {from:1,to:0,label:'200  사용자 42의 주문',caption:'사용자 42의 주문 목록을 돌려줍니다.'},
   {from:1,to:2,label:'로그아웃: sid=9f2c… 삭제',caption:'로그아웃하면 저장소에서 세션을 지웁니다. 쿠키가 남아 있어도 이제 아무것도 가리키지 않습니다.'},
   {from:1,to:0,label:'다음 요청 → 401',tone:'fail',caption:'지운 세션 ID로 온 요청은 401이 됩니다. 서버 세션은 이렇게 즉시 무효화할 수 있습니다.'}
  ]},
 cors:{kind:'sequence',title:'shop.example.com의 스크립트가 api.example.com에 PUT을 보낼 때',lanes:['페이지 스크립트','브라우저','API 서버'],
  steps:[
   {from:0,to:1,label:'fetch PUT /cart  (JSON, 쿠키 포함)',caption:'페이지가 다른 출처의 API로 JSON PUT 요청을 보내려 합니다. PUT과 JSON은 단순 요청이 아닙니다.'},
   {from:1,to:2,label:'OPTIONS /cart  Origin: shop… · Method: PUT',caption:'브라우저가 실제 요청 전에 이 출처에서 PUT을 보내도 되는지 먼저 묻습니다(preflight).'},
   {from:2,to:1,label:'204  Allow-Origin: shop… · Allow-Methods: PUT · Allow-Credentials',caption:'서버가 이 출처, 이 메서드, 쿠키 동반을 허락한다고 답합니다.'},
   {from:1,to:2,label:'PUT /cart  Cookie 포함',caption:'허락을 확인한 브라우저가 실제 요청을 보냅니다.'},
   {from:2,to:1,label:'200  Allow-Origin: shop…',caption:'응답에도 허락 헤더가 있어야 합니다.'},
   {from:1,to:0,label:'응답 전달',caption:'브라우저가 응답을 페이지 스크립트에 넘겨줍니다.'},
   {from:0,to:1,label:'evil.test 페이지의 같은 fetch',tone:'note',caption:'이번에는 다른 사이트 evil.test의 스크립트가 같은 API를 부른다고 해 봅시다.'},
   {from:1,to:0,label:'응답 읽기 차단',tone:'fail',caption:'서버의 허락 목록에 evil.test가 없어 브라우저가 응답을 넘겨주지 않습니다. 다만 단순 요청이었다면 요청 자체는 이미 서버에 도착했을 수 있으므로, 상태 변경은 CSRF 대책으로 따로 막아야 합니다.'}
  ]},
 iam:{kind:'flow',title:'역할 upload-worker가 S3를 호출할 때 정책 평가',
  nodes:[
   {label:'명시적 거부가 있는가',sub:'어느 정책에서든 Deny'},
   {label:'조직 정책·권한 경계가 허용하는가',sub:'허용 범위의 바깥 울타리'},
   {label:'역할 정책이나 버킷 정책이 허용하는가',sub:'s3:GetObject on uploads/*'},
   {label:'결과',sub:'허용 또는 거부'}
  ],
  steps:[
   {active:0,status:{0:'note'},caption:'s3:GetObject로 uploads/a.jpg를 읽으려 합니다. 이 요청을 거부하는 정책은 없습니다.'},
   {active:1,status:{0:'note',1:'ok'},caption:'조직의 서비스 제어 정책도 S3 읽기를 막지 않습니다.'},
   {active:3,status:{0:'note',1:'ok',2:'ok',3:'ok'},result:'s3:GetObject uploads/a.jpg → 허용',caption:'역할 정책에 uploads/* 읽기 허용이 있으므로 허용됩니다.'},
   {active:2,status:{0:'note',1:'ok',2:'fail'},caption:'같은 역할이 s3:DeleteObject를 호출합니다. 어떤 정책에도 삭제 허용이 없습니다.'},
   {active:3,status:{0:'note',1:'ok',2:'fail',3:'fail'},result:'s3:DeleteObject → 거부 (허용이 없으면 기본 거부)',caption:'명시적 거부가 없어도 허용이 없으면 거부입니다. 필요 없는 권한을 주지 않으면 역할이 탈취되어도 지울 수 없습니다.'}
  ]},
 validation:{kind:'flow',title:'입력 두 개가 서버를 지나는 길',
  nodes:[
   {label:'스키마 검증',sub:'타입·길이·형식 (Pydantic)'},
   {label:'권한 확인',sub:'이 사용자의 자원인가'},
   {label:'SQL 파라미터 바인딩',sub:'값은 값으로만'},
   {label:'출력 인코딩',sub:'HTML에 넣을 때 &lt; 등으로'}
  ],
  steps:[
   {active:0,status:{0:'fail'},result:"email = \"' OR '1'='1\" → 400 형식 오류",caption:"로그인 email에 ' OR '1'='1을 넣었습니다. 이메일 형식이 아니라 스키마 단계에서 거절됩니다."},
   {active:0,status:{0:'ok'},caption:'이번에는 리뷰 본문에 <script>alert(1)</script>를 넣었습니다. 1000자 이하 문자열이라 형식은 통과합니다.'},
   {active:1,status:{0:'ok',1:'ok'},caption:'로그인한 사용자가 자기가 산 상품에 리뷰를 쓰는 것이라 권한도 통과합니다.'},
   {active:2,status:{0:'ok',1:'ok',2:'ok'},caption:'INSERT … VALUES (%s)로 본문을 값으로 넘기므로 어떤 문자가 있어도 그냥 문자열로 저장됩니다.'},
   {active:3,status:{0:'ok',1:'ok',2:'ok',3:'ok'},result:'화면에 <script>alert(1)</script>가 글자 그대로 보임 · 실행되지 않음',caption:'다른 사용자의 화면에 출력할 때 HTML 인코딩을 하므로 스크립트가 실행되지 않고 글자로 보입니다.'}
  ]},
 vpc:{kind:'table',title:'패킷마다 경로 테이블의 어느 줄이 쓰이는가',columns:['서브넷','목적지','다음으로 보낼 곳'],packetLabel:'지금 지나가는 패킷',
  steps:[
   {rows:[['공개','10.0.0.0/16','local'],['공개','0.0.0.0/0','인터넷 게이트웨이'],['사설','10.0.0.0/16','local'],['사설','0.0.0.0/0','NAT 게이트웨이'],['격리','10.0.0.0/16','local']],packet:'VPC 10.0.0.0/16의 서브넷 세 개와 각자의 경로',caption:'서브넷마다 경로 테이블이 있습니다. 모두 VPC 안 통신은 local로 처리하고 나머지 주소를 어디로 보낼지가 다릅니다.'},
   {rows:[['공개','10.0.0.0/16','local'],['공개','0.0.0.0/0','인터넷 게이트웨이'],['사설','10.0.0.0/16','local'],['사설','0.0.0.0/0','NAT 게이트웨이'],['격리','10.0.0.0/16','local']],highlight:[1],packet:'로드 밸런서(공개) → 사용자 198.51.100.7 응답',caption:'공개 서브넷의 로드 밸런서가 인터넷 사용자에게 응답할 때는 0.0.0.0/0 → 인터넷 게이트웨이 줄이 쓰입니다.'},
   {rows:[['공개','10.0.0.0/16','local'],['공개','0.0.0.0/0','인터넷 게이트웨이'],['사설','10.0.0.0/16','local'],['사설','0.0.0.0/0','NAT 게이트웨이'],['격리','10.0.0.0/16','local']],highlight:[0],packet:'로드 밸런서 → 앱 서버 10.0.2.15:8000',caption:'VPC 안의 앱 서버로 넘길 때는 local 줄이 쓰입니다. 앱 서버의 보안 그룹은 로드 밸런서 보안 그룹에서 온 8000번만 허용합니다.'},
   {rows:[['공개','10.0.0.0/16','local'],['공개','0.0.0.0/0','인터넷 게이트웨이'],['사설','10.0.0.0/16','local'],['사설','0.0.0.0/0','NAT 게이트웨이'],['격리','10.0.0.0/16','local']],highlight:[3],packet:'앱 서버(사설) → 결제 API 203.0.113.50:443',caption:'사설 서브넷의 앱이 외부 API를 부르면 NAT 게이트웨이로 나갑니다. 밖에서 앱 서버로 먼저 들어오는 길은 없습니다.'},
   {rows:[['공개','10.0.0.0/16','local'],['공개','0.0.0.0/0','인터넷 게이트웨이'],['사설','10.0.0.0/16','local'],['사설','0.0.0.0/0','NAT 게이트웨이'],['격리','10.0.0.0/16','local']],highlight:[4],packet:'DB(격리) → 인터넷 주소: 맞는 경로 없음 → 버려짐',caption:'격리 서브넷에는 local 줄만 있어 인터넷으로 나갈 길도 들어올 길도 없습니다. DB를 여기에 두는 이유입니다.'}
  ]},
 lb:{kind:'table',title:'서버 하나가 고장 나고, 배포로 교체될 때',columns:['서버','가용 영역','상태','받는 요청'],packetLabel:'지금 일어나는 일',
  steps:[
   {rows:[['app-1','a','정상','33%'],['app-2','b','정상','33%'],['app-3','c','정상','33%']],packet:'세 영역에 한 대씩, 라운드 로빈으로 분산',caption:'로드 밸런서가 정상인 세 서버에 차례로 요청을 보냅니다.'},
   {rows:[['app-1','a','정상','33%'],['app-2','b','상태 확인 실패 1회','33%'],['app-3','c','정상','33%']],highlight:[1],packet:'app-2의 /health가 응답하지 않음',caption:'app-2가 상태 확인에 실패하기 시작합니다. 한 번 실패로 바로 빼지는 않습니다.'},
   {rows:[['app-1','a','정상','50%'],['app-2','b','비정상 · 제외','0%'],['app-3','c','정상','50%']],highlight:[1],packet:'정해진 횟수만큼 연속 실패 → 대상에서 제외',caption:'연속으로 정해진 횟수만큼 실패하자 app-2를 빼고 나머지 두 대로 나눕니다. 사용자는 에러를 보지 않습니다.'},
   {rows:[['app-1','a','드레이닝 (새 요청 없음)','0%'],['app-3','c','정상','50%'],['app-4','b','정상 · 새 버전','50%']],highlight:[0,2],packet:'배포: 새 버전 app-4 투입, app-1 교체 시작',caption:'새 버전 app-4가 상태 확인을 통과해 들어오고 app-1은 새 요청을 받지 않으며 처리 중인 요청이 끝나기를 기다립니다(기본 300초).'},
   {rows:[['app-3','c','정상','50%'],['app-4','b','정상 · 새 버전','50%']],packet:'app-1 종료',caption:'처리 중이던 요청이 모두 끝난 뒤 app-1을 종료합니다. 배포하는 동안 끊긴 요청이 없습니다.'}
  ]},
 storage:{kind:'sequence',title:'사진을 서버를 거치지 않고 S3에 올리기',lanes:['브라우저','API 서버','S3','DB'],
  steps:[
   {from:0,to:1,label:'POST /uploads  {이름, 형식: image/jpeg}',caption:'브라우저가 올릴 파일의 정보만 API 서버에 보냅니다.'},
   {from:1,to:1,label:'권한 확인 · 키 uploads/u7/9f2c.jpg 생성',tone:'note',caption:'서버가 로그인과 용량 제한을 확인하고 저장할 객체 키를 정합니다.'},
   {from:1,to:0,label:'미리 서명된 PUT URL (5분 유효)',caption:'그 키에 이 형식으로 5분 동안만 올릴 수 있는 서명된 URL을 돌려줍니다.'},
   {from:0,to:2,label:'PUT 파일 본문',caption:'브라우저가 파일을 S3에 직접 올립니다. 큰 파일이 API 서버의 메모리와 대역폭을 쓰지 않습니다.'},
   {from:2,to:0,label:'200 OK',caption:'S3가 저장을 확인합니다.'},
   {from:0,to:1,label:'업로드 완료 알림',caption:'브라우저가 서버에 끝났다고 알립니다.'},
   {from:1,to:3,label:'키 uploads/u7/9f2c.jpg 저장',caption:'DB에는 파일 자체가 아니라 객체 키만 저장합니다. 화면에 보여 줄 때는 CDN 주소나 짧은 읽기용 서명 URL을 씁니다.'}
  ]},
 docker:{kind:'table',title:'Dockerfile 층이 다시 빌드되는 범위',columns:['층','Dockerfile 명령','이번 빌드'],packetLabel:'이번에 바뀐 것',
  steps:[
   {rows:[['1','FROM python:3.13-slim','새로 받음'],['2','COPY requirements.txt .','새로 만듦'],['3','RUN pip install -r requirements.txt','새로 만듦'],['4','COPY . .','새로 만듦'],['5','CMD ["gunicorn", "app:app"]','새로 만듦']],packet:'첫 빌드',caption:'처음에는 모든 층을 만듭니다. 의존성을 설치하는 3번 층이 가장 오래 걸립니다.'},
   {rows:[['1','FROM python:3.13-slim','캐시 사용'],['2','COPY requirements.txt .','캐시 사용'],['3','RUN pip install -r requirements.txt','캐시 사용'],['4','COPY . .','새로 만듦'],['5','CMD ["gunicorn", "app:app"]','새로 만듦']],highlight:[3,4],packet:'app.py만 수정',caption:'소스 코드만 바뀌면 4번 층부터 다시 만들고 무거운 설치 층은 캐시를 씁니다. 빌드가 몇 초로 끝납니다.'},
   {rows:[['1','FROM python:3.13-slim','캐시 사용'],['2','COPY requirements.txt .','새로 만듦'],['3','RUN pip install -r requirements.txt','새로 만듦'],['4','COPY . .','새로 만듦'],['5','CMD ["gunicorn", "app:app"]','새로 만듦']],highlight:[1,2,3,4],packet:'requirements.txt에 패키지 추가',caption:'의존성 목록이 바뀌면 2번 층부터 아래가 모두 다시 만들어집니다.'},
   {rows:[['1','FROM python:3.13-slim','캐시 사용'],['2','COPY . .','새로 만듦'],['3','RUN pip install -r requirements.txt','새로 만듦'],['4','CMD ["gunicorn", "app:app"]','새로 만듦']],highlight:[1,2],packet:'잘못된 순서: COPY . . 를 설치보다 먼저 둔 경우 · app.py만 수정',caption:'소스 전체를 먼저 복사하면 코드 한 줄만 바뀌어도 설치 층까지 매번 다시 만들어집니다. 자주 바뀌는 것을 아래에 두는 이유입니다.'}
  ]},
 scale:{kind:'table',title:'앱 서버를 늘릴 때 DB 연결 수가 어떻게 되는가',columns:['구성','계산','DB 연결','max_connections 100'],packetLabel:'지금 일어나는 일',
  steps:[
   {rows:[['서버 2대 · 워커 4 · 풀 10','2 × 4 × 10','80','여유 있음']],packet:'평소 구성',caption:'서버마다 워커가 4개, 워커마다 연결 풀 10개라 최대 80개입니다. PostgreSQL 기본 한도 100 안에 듭니다.'},
   {rows:[['서버 2대 · 워커 4 · 풀 10','2 × 4 × 10','80','여유 있음'],['서버 6대 · 워커 4 · 풀 10','6 × 4 × 10','240','초과']],highlight:[1],packet:'트래픽이 늘어 오토스케일링이 6대로 늘림',caption:'앱 서버를 늘리자 연결이 240개가 필요해졌습니다. DB는 새 연결을 거부하고 앱은 연결을 기다리다 오류를 냅니다.'},
   {rows:[['서버 6대 · 워커 4 · 풀 10','6 × 4 × 10','240 → PgBouncer','앱 쪽 연결'],['PgBouncer 트랜잭션 풀','서버 연결 30','30','여유 있음']],highlight:[1],packet:'앱과 DB 사이에 PgBouncer를 둠',caption:'앱의 많은 연결은 PgBouncer가 받고 실제 DB 연결은 30개만 씁니다. 트랜잭션이 진행되는 동안만 DB 연결을 빌려주기 때문입니다.'},
   {rows:[['서버 6대 · 워커 4 · 풀 10','6 × 4 × 10','240 → PgBouncer','앱 쪽 연결'],['PgBouncer 트랜잭션 풀','서버 연결 30','30','DB CPU 95%']],highlight:[1],packet:'그래도 응답이 느림 → DB CPU 확인',caption:'연결 문제는 풀렸지만 DB CPU가 가득 찼다면 병목은 DB 자체입니다. 이제는 앱 서버가 아니라 느린 쿼리와 인덱스, 읽기 복제본을 봐야 합니다.'}
  ]},
 cicd:{kind:'flow',title:'커밋 하나가 운영까지 가는 파이프라인',
  nodes:[
   {label:'린트 · 타입 검사',sub:'풀 리퀘스트마다'},
   {label:'단위 테스트',sub:'필수 상태 검사'},
   {label:'이미지 빌드',sub:'태그 = 커밋 해시 a1b2c3d'},
   {label:'스테이징 배포 · 통합 테스트',sub:'같은 이미지 사용'},
   {label:'카나리 5%',sub:'오류율·지연 비교'},
   {label:'전체 배포',sub:'100%'}
  ],
  steps:[
   {active:1,status:{0:'ok',1:'ok'},caption:'풀 리퀘스트에서 린트와 테스트가 통과해야 병합할 수 있습니다.'},
   {active:2,status:{0:'ok',1:'ok',2:'ok'},caption:'병합되면 이미지를 한 번만 만들고 커밋 해시를 태그로 붙입니다.'},
   {active:3,status:{0:'ok',1:'ok',2:'ok',3:'ok'},caption:'그 이미지를 그대로 스테이징에 배포해 통합 테스트를 돌립니다. 환경마다 다시 빌드하지 않습니다.'},
   {active:4,status:{0:'ok',1:'ok',2:'ok',3:'ok',4:'fail'},result:'카나리 오류율 0.2% → 3.1%',caption:'운영 트래픽의 5%만 새 버전으로 보냈더니 오류율이 크게 올랐습니다. 테스트에서 못 잡은 문제입니다.'},
   {active:4,status:{0:'ok',1:'ok',2:'ok',3:'ok',4:'fail',5:'note'},result:'자동 롤백 → 이전 태그 f9e8d7c로 복귀 · 영향은 5%의 사용자',caption:'카나리를 이전 이미지로 되돌리고 전체 배포는 하지 않습니다. 한꺼번에 배포했다면 모든 사용자가 오류를 봤을 것입니다.'}
  ]},
 observability:{kind:'table',title:'p99 알림에서 느린 쿼리를 찾아가는 과정',columns:['스팬','서비스','시작','걸린 시간'],packetLabel:'지금 보고 있는 것',
  steps:[
   {rows:[],packet:'알림: checkout API p99 3.1초 (SLO 1초), 14:03부터',caption:'메트릭 대시보드에서 결제 API의 p99 지연이 목표를 크게 넘었다는 알림이 옵니다. 평균은 0.2초라 평균만 봤다면 몰랐을 것입니다.'},
   {rows:[['POST /checkout','api','0 ms','3,080 ms'],['장바구니 조회','api → redis','12 ms','4 ms'],['재고 차감 쿼리','api → postgres','20 ms','2,910 ms'],['결제 요청','api → payments','2,935 ms','120 ms']],packet:'14:05의 느린 요청 하나의 트레이스 (trace_id 4bf92f35…)',caption:'느린 요청의 트레이스를 열면 구간별 시간이 보입니다.'},
   {rows:[['POST /checkout','api','0 ms','3,080 ms'],['장바구니 조회','api → redis','12 ms','4 ms'],['재고 차감 쿼리','api → postgres','20 ms','2,910 ms'],['결제 요청','api → payments','2,935 ms','120 ms']],highlight:[2],packet:'시간 대부분이 재고 차감 쿼리에서 쓰임',caption:'3초 가운데 2.9초가 재고 차감 쿼리 하나에서 쓰였습니다. 결제사나 Redis는 문제가 아닙니다.'},
   {rows:[['POST /checkout','api','0 ms','3,080 ms'],['재고 차감 쿼리','api → postgres','20 ms','2,910 ms']],highlight:[1],packet:'로그 검색 trace_id=4bf92f35… → "lock wait on stock row 42"',caption:'같은 trace_id로 로그를 찾으니 인기 상품 42의 재고 행을 잠그려고 기다렸다는 기록이 있습니다. 원인은 그 행에 몰린 잠금 경합입니다.'}
  ]},
 recovery:{kind:'timeline',title:'실수로 지운 테이블을 시점 복구로 되돌리기',lanes:['운영 DB','백업 · 복구'],stateLabel:'시각',
  steps:[
   {lane:1,text:'베이스 백업 완료',tone:'ok',state:'00:00',caption:'매일 0시에 전체 백업을 하고 그 뒤의 모든 변경 기록(WAL)은 계속 보관합니다.'},
   {lane:0,text:'평소 주문 처리',tone:'ok',state:'00:00 ~ 14:12',caption:'하루 동안 주문이 들어오고 그 변경이 WAL로 계속 쌓입니다.'},
   {lane:0,text:'DELETE FROM orders (조건 누락)',tone:'fail',state:'14:13',caption:'운영자가 조건을 빠뜨린 DELETE를 실행했습니다. 복제본에도 몇 초 안에 똑같이 반영되어 복제본으로는 되돌릴 수 없습니다.'},
   {lane:0,text:'장애 인지 · 쓰기 중단',tone:'wait',state:'14:20',caption:'주문이 사라졌다는 문의로 장애를 알아채고 쓰기를 막습니다.'},
   {lane:1,text:'새 DB를 14:12 시점으로 복원',tone:'ok',state:'14:20 ~ 14:55',caption:'0시 백업을 펼치고 WAL을 14:12까지만 재생한 새 DB를 만듭니다. 원래 DB는 덮어쓰지 않습니다.'},
   {lane:1,text:'데이터 확인 · 앱 연결 전환',tone:'ok',state:'15:05',caption:'주문 수를 확인하고 앱의 연결 대상을 새 DB로 바꿉니다. 14:12부터 쓰기를 막은 14:20 사이의 주문은 원래 DB의 기록과 비교해 따로 살립니다.'}
  ]},
 sync:{kind:'timeline',title:'잔여 1개인 쿠폰을 두 스레드가 발급할 때',lanes:['스레드 A','스레드 B'],stateLabel:'쿠폰 재고',
  steps:[
   {lane:0,text:'재고 읽기 → 1',tone:'ok',state:'1',caption:'락 없이 A가 재고를 읽습니다. 1개 남았습니다.'},
   {lane:1,text:'재고 읽기 → 1',tone:'ok',state:'1',caption:'A가 아직 차감하기 전에 스케줄러가 B로 바꿉니다. B도 1을 읽습니다.'},
   {lane:0,text:'발급 · 재고 = 0',tone:'ok',state:'0',caption:'A는 자기가 읽은 1을 근거로 발급하고 0을 씁니다.'},
   {lane:1,text:'발급 · 재고 = 0',tone:'fail',state:'0 · 발급 2건',caption:'B도 자기가 읽은 1을 근거로 발급합니다. 쿠폰은 하나인데 두 명이 받았습니다.'},
   {lane:0,text:'with lock: 읽기 → 1 · 발급 · 0',tone:'ok',state:'0',caption:'고친 코드에서는 A가 락을 잡고 읽기와 차감을 한 덩어리로 끝낸 뒤 락을 놓습니다.'},
   {lane:1,text:'락 대기 → 읽기 → 0 · 거절',tone:'note',state:'0 · 발급 1건',caption:'B는 A가 락을 놓을 때까지 기다렸다가 재고 0을 보고 발급하지 않습니다.'}
  ]},
 scheduling:{kind:'table',title:'CPU limit 0.5코어인 컨테이너에 요청이 몰릴 때',columns:['시각','남은 할당량','상태'],packetLabel:'지금 일어나는 일',
  steps:[
   {rows:[['0ms','50ms','대기']],highlight:[0],packet:'100ms 주기 시작 · cpu.max = 50000 100000',caption:'cgroup은 100ms마다 이 컨테이너에 CPU 시간 50ms를 줍니다.'},
   {rows:[['0ms','50ms','대기'],['5ms','30ms','스레드 4개 실행']],highlight:[1],packet:'요청 4개가 동시에 도착 · 스레드 4개가 4코어에서 실행',caption:'스레드 4개가 동시에 일하면 실제 시간 1ms마다 할당량이 4ms씩 줄어듭니다.'},
   {rows:[['0ms','50ms','대기'],['5ms','30ms','스레드 4개 실행'],['12.5ms','0ms','스로틀링']],highlight:[2],packet:'할당량 소진 · 컨테이너 전체 정지',caption:'주기가 시작된 지 12.5ms 만에 50ms를 다 썼습니다. 컨테이너의 모든 스레드가 멈춥니다.'},
   {rows:[['0ms','50ms','대기'],['5ms','30ms','스레드 4개 실행'],['12.5ms','0ms','스로틀링'],['40ms','0ms','새 요청도 대기']],highlight:[3],packet:'새 요청 도착 · 처리할 수 없음',caption:'그 사이 도착한 요청은 CPU가 비어 있어도 처리되지 않습니다. 평균 사용률은 50%로 보입니다.'},
   {rows:[['12.5ms ~ 100ms','0ms','87.5ms 동안 정지'],['100ms','50ms','재개']],highlight:[1],packet:'다음 주기 · 할당량 다시 50ms',caption:'다음 주기에야 다시 실행됩니다. nr_throttled 지표가 늘고 p99 지연이 튑니다. limit을 올리거나 워커 수를 할당량에 맞춥니다.'}
  ]},
 tls:{kind:'flow',title:'api.example.com의 인증서를 Python 클라이언트가 검증할 때',
  nodes:[
   {label:'체인 만들기',sub:'서버 인증서 + 서버가 보낸 중간 인증서'},
   {label:'루트까지 서명 확인',sub:'신뢰 저장소의 루트에 닿는가'},
   {label:'기간 확인',sub:'notBefore ≤ 지금 ≤ notAfter'},
   {label:'이름 확인',sub:'SAN에 api.example.com이 있는가'},
   {label:'개인키 소유 확인',sub:'핸드셰이크 서명 검증'}
  ],
  steps:[
   {active:0,status:{0:'fail'},result:'unable to get local issuer certificate',caption:'처음 배포한 서버는 자기 인증서만 보냈습니다. 중간 인증서가 없어 체인이 루트까지 이어지지 않습니다. 브라우저는 캐시로 채웠지만 Python은 실패합니다.'},
   {active:0,status:{0:'ok'},caption:'서버 설정을 fullchain으로 바꿔 중간 인증서를 함께 보냅니다.'},
   {active:1,status:{0:'ok',1:'ok'},caption:'서버 인증서의 서명은 중간 CA의 공개키로, 중간 CA의 서명은 루트의 공개키로 확인됩니다. 루트는 시스템 신뢰 저장소에 있습니다.'},
   {active:2,status:{0:'ok',1:'ok',2:'ok'},caption:'유효 기간 안입니다. 만료 30일 전부터 알림을 받도록 감시합니다.'},
   {active:3,status:{0:'ok',1:'ok',2:'ok',3:'ok'},caption:'SAN에 api.example.com이 있습니다. IP 주소로 접속했다면 여기서 실패합니다.'},
   {active:4,status:{0:'ok',1:'ok',2:'ok',3:'ok',4:'ok'},result:'검증 통과 · TLS 1.3 연결 수립',caption:'서버가 개인키로 서명한 핸드셰이크 값이 인증서의 공개키로 검증됩니다. 인증서를 훔쳐 온 것이 아니라 진짜 주인입니다.'}
  ]},
 websocket:{kind:'sequence',title:'nginx 뒤의 채팅 서버에 WebSocket으로 연결할 때',lanes:['브라우저','nginx','채팅 서버'],
  steps:[
   {from:0,to:1,label:'GET /chat · Upgrade: websocket · Key',caption:'브라우저가 HTTP 요청으로 WebSocket 전환을 요청합니다.'},
   {from:1,to:2,label:'Upgrade · Connection 헤더 전달',caption:'nginx에 Upgrade 헤더 설정이 있어야 앱까지 전달됩니다. 설정이 없으면 앱은 평범한 GET으로 받고 연결이 실패합니다.'},
   {from:2,to:0,label:'101 Switching Protocols · Accept',caption:'서버가 키로 계산한 Accept 값을 담아 101로 답합니다. nginx는 이때부터 양쪽 연결을 터널로 이어 줍니다.'},
   {from:2,to:0,label:'새 메시지: "안녕하세요"',caption:'요청 없이 서버가 먼저 메시지를 보냅니다.'},
   {from:0,to:2,label:'메시지: "반가워요"',caption:'브라우저도 같은 연결로 언제든 보냅니다.'},
   {from:2,to:0,label:'ping (30초마다)',tone:'note',caption:'방이 조용해도 서버가 30초마다 ping을 보내고 브라우저가 pong으로 답합니다. nginx의 60초 유휴 제한에 걸리지 않습니다.'},
   {from:1,to:0,label:'연결 끊김 (재배포)',tone:'fail',caption:'서버를 재배포하면 연결이 끊깁니다. close 프레임 없이 끊기면 코드 1006이 보입니다.'},
   {from:0,to:1,label:'1.3초 뒤 재연결 · 마지막 메시지 ID',tone:'wait',caption:'브라우저는 무작위 지연을 섞어 다시 연결하고 마지막으로 받은 메시지 ID를 보내 빠진 메시지를 받습니다.'}
  ]},
 ratelimit:{kind:'table',title:'API 키 K의 토큰 버킷 · 초당 1개 채움, 최대 5개',columns:['시각','요청','남은 토큰','응답'],packetLabel:'지금 일어나는 일',
  steps:[
   {rows:[['0.0초','—','5','—']],highlight:[0],packet:'한동안 조용해서 버킷이 가득 찼습니다',caption:'토큰은 초당 1개씩 채워지지만 5개를 넘지 않습니다.'},
   {rows:[['0.0초','—','5','—'],['0.0초','요청 5개','0','200 × 5']],highlight:[1],packet:'같은 순간 요청 5개',caption:'모아 둔 토큰 5개로 버스트 5개가 모두 통과합니다.'},
   {rows:[['0.0초','—','5','—'],['0.0초','요청 5개','0','200 × 5'],['0.1초','요청 2개','0','429 × 2 · Retry-After: 1']],highlight:[2],packet:'토큰 없음 → 거절',caption:'0.1초 동안 채워진 토큰은 0.1개라 꺼낼 수 없습니다. 429와 함께 1초 뒤에 오라고 알립니다.'},
   {rows:[['0.0초','—','5','—'],['0.0초','요청 5개','0','200 × 5'],['0.1초','요청 2개','0','429 × 2 · Retry-After: 1'],['1.1초','재시도 1개','0.1','200']],highlight:[3],packet:'Retry-After를 따른 재시도',caption:'1초 동안 토큰 1개가 채워져 재시도가 통과합니다. 남은 토큰은 0.1개입니다.'},
   {rows:[['장애 복구 + 1초','앱 1만 대 동시 재시도','곧 0','대부분 429'],['복구 + 0~1초','지터로 흩어진 재시도','채워지는 만큼','차례로 200']],highlight:[1],packet:'장애 복구 직후의 재시도',caption:'클라이언트 1만 대가 모두 정확히 1초 뒤 재시도하면 다시 몰립니다. 지터를 섞으면 재시도가 1초 안에 고르게 흩어집니다.'}
  ]},
 replication:{kind:'timeline',title:'댓글을 쓰고 바로 목록을 새로고침할 때',lanes:['주 DB','복제본'],stateLabel:'사용자 화면',
  steps:[
   {lane:0,text:'INSERT 댓글 101 · 커밋',tone:'ok',state:'작성 완료',caption:'쓰기는 주 DB로 갑니다. 비동기 복제라 주 DB는 복제본을 기다리지 않고 커밋을 끝냅니다.'},
   {lane:1,text:'WAL 수신 대기 · 지연 0.5초',tone:'wait',state:'—',caption:'변경 기록이 복제본으로 가는 중입니다. 대량 쓰기가 있으면 지연이 더 길어집니다.'},
   {lane:1,text:'SELECT 목록 → 100까지',tone:'fail',state:'내 댓글이 없음',caption:'0.2초 뒤 목록 조회가 복제본으로 갑니다. 아직 101이 적용되지 않아 방금 쓴 댓글이 보이지 않습니다.'},
   {lane:1,text:'WAL 적용 · 101까지',tone:'ok',state:'다시 새로고침하면 보임',caption:'0.5초 뒤 복제본이 따라잡습니다. 사용자는 댓글이 사라졌다 나타났다고 느낍니다.'},
   {lane:0,text:'쓰기 후 5초는 주 DB에서 SELECT',tone:'ok',state:'바로 보임',caption:'고친 방법: 쓰기를 한 사용자의 읽기는 5초 동안 주 DB로 보냅니다. 다른 사용자의 목록 조회는 계속 복제본이 받습니다.'},
   {lane:1,text:'지연 > 30초면 읽기 대상에서 제외',tone:'note',state:'—',caption:'복제 지연을 감시해 너무 늦은 복제본은 읽기에서 빼고 주 DB나 다른 복제본으로 보냅니다.'}
  ]},
 raft:{kind:'sequence',title:'3대 Raft 클러스터에서 쓰기와 리더 교체',lanes:['클라이언트','노드 1','노드 2','노드 3'],
  steps:[
   {from:0,to:1,label:'SET x = 5',caption:'임기 2의 리더인 노드 1이 쓰기를 받아 자기 로그 7번에 붙입니다.'},
   {from:1,to:2,label:'AppendEntries #7 (임기 2)',caption:'리더가 팔로워들에게 항목을 복제합니다.'},
   {from:2,to:1,label:'저장함',caption:'노드 2가 저장했다고 답합니다. 리더와 합쳐 2대, 3대 중 과반수입니다.'},
   {from:1,to:0,label:'커밋 · 성공',caption:'과반수가 저장했으므로 7번은 커밋됩니다. 노드 3의 답을 기다리지 않고 성공을 돌려줍니다.'},
   {from:1,to:1,label:'노드 1 장애',tone:'fail',caption:'노드 1이 멈춰 하트비트가 끊깁니다.'},
   {from:3,to:3,label:'선거 타임아웃 · 임기 3 후보',tone:'wait',caption:'무작위 타임아웃이 먼저 끝난 노드 3이 임기를 3으로 올리고 후보가 됩니다.'},
   {from:3,to:2,label:'RequestVote (임기 3 · 마지막 6번)',caption:'노드 3은 7번을 받지 못해 로그가 6번까지입니다.'},
   {from:2,to:3,label:'거절 · 내 로그가 더 최신',tone:'fail',caption:'노드 2는 커밋된 7번을 가졌으므로 뒤처진 후보에게 투표하지 않습니다. 커밋된 항목이 사라지지 않게 하는 규칙입니다.'},
   {from:2,to:3,label:'RequestVote (임기 4 · 마지막 7번)',tone:'note',caption:'다음 타임아웃에 노드 2가 임기 4 후보로 나서고 노드 3이 투표해 노드 2가 리더가 됩니다.'},
   {from:2,to:3,label:'AppendEntries #7 (임기 4)',caption:'새 리더가 노드 3에게 빠진 7번을 채워 줍니다. 세 노드의 로그가 다시 같아집니다.'}
  ]},
 pytest:{kind:'table',title:'할인 버그를 테스트로 재현하고 고칠 때',columns:['테스트','입력','결과'],packetLabel:'지금 일어나는 일',
  steps:[
   {rows:[['test_vip_discount','10,000원 · 회원 10%','통과']],highlight:[0],packet:'pytest -q · 기존 테스트',caption:'기존 테스트는 회원 할인만 확인해서 통과합니다. 쿠폰과 함께 쓰는 경우는 확인하지 않았습니다.'},
   {rows:[['test_vip_discount','10,000원 · 회원 10%','통과'],['test_coupon[2000-3000-0]','2,000원 · 쿠폰 3,000원','실패 · assert -1000 == 0']],highlight:[1],packet:'버그를 재현하는 테스트를 먼저 추가',caption:'신고된 버그를 그대로 테스트로 적습니다. pytest가 실제 값 −1000과 기대값 0을 함께 보여 줍니다.'},
   {rows:[['test_vip_discount','10,000원 · 회원 10%','통과'],['test_coupon[2000-3000-0]','2,000원 · 쿠폰 3,000원','통과']],highlight:[1],packet:'코드 수정: return max(0, round(discounted))',caption:'금액이 0 아래로 내려가지 않게 고치자 재현 테스트가 통과합니다.'},
   {rows:[['test_vip_discount','10,000원 · 회원 10%','통과'],['test_coupon[10000-3000-7000]','10,000원 · 쿠폰 3,000원','통과'],['test_coupon[2000-3000-0]','2,000원 · 쿠폰 3,000원','통과'],['test_coupon[0-0-0]','0원','통과']],highlight:[1,3],packet:'parametrize로 경계값 추가',caption:'정상 경우와 0원 같은 경계값도 같은 테스트에 묶어 둡니다. 줄 하나가 테스트 하나로 실행됩니다.'},
   {rows:[['전체 4개','—','4 passed in 0.03s']],highlight:[0],packet:'풀 리퀘스트 → CI에서 pytest 실행',caption:'CI가 모든 테스트를 통과시켜야 병합할 수 있습니다. 누군가 나중에 같은 계산을 고쳐도 이 테스트가 버그의 재발을 막습니다.'}
  ]},
 git:{kind:'timeline',title:'main과 feature 브랜치가 같은 줄을 고쳤을 때',lanes:['main','feature/timeout'],stateLabel:'상태',
  steps:[
   {lane:1,text:'git switch -c feature/timeout (A에서)',tone:'ok',state:'두 브랜치 모두 커밋 A',caption:'커밋 A에서 작업 브랜치를 만듭니다. 브랜치는 A를 가리키는 이름표 하나가 더 생긴 것뿐입니다.'},
   {lane:0,text:'커밋 B: TIMEOUT = 5 (동료가 먼저 병합)',tone:'ok',state:'main → B',caption:'그사이 동료의 변경이 main에 병합되었습니다. config.py의 TIMEOUT이 5가 됐습니다.'},
   {lane:1,text:'커밋 C: TIMEOUT = 10',tone:'ok',state:'feature → C',caption:'나는 같은 줄을 10으로 바꿔 커밋했습니다.'},
   {lane:1,text:'git rebase main → 충돌',tone:'fail',state:'<<<<<<< 5 ======= 10 >>>>>>>',caption:'main의 최신 상태 위에 내 커밋을 다시 적용하려 하자 같은 줄을 양쪽이 다르게 고쳐 충돌이 납니다.'},
   {lane:1,text:'합의한 8로 고침 · git add · rebase --continue',tone:'note',state:'feature → C′ (B 위)',caption:'동료와 이야기해 8로 정하고 충돌 표시를 지웁니다. 커밋 C는 부모가 B로 바뀌어 새 해시의 C′가 됩니다.'},
   {lane:1,text:'pytest 통과 · git push --force-with-lease',tone:'ok',state:'원격 feature → C′',caption:'리베이스로 해시가 바뀌어 일반 push는 거절됩니다. --force-with-lease는 원격이 내가 마지막으로 본 상태일 때만 덮어써서 남의 커밋을 지우지 않습니다.'},
   {lane:0,text:'풀 리퀘스트 병합 · main → C′',tone:'ok',state:'이력 A → B → C′',caption:'리뷰와 CI를 통과해 병합합니다. main은 fast-forward로 C′를 가리키고 이력은 한 줄로 남습니다.'}
  ]},
 kubernetes:{kind:'sequence',title:'Deployment를 적용하고 노드 하나가 죽을 때',lanes:['kubectl','API 서버·etcd','컨트롤러','스케줄러','kubelet'],
  steps:[
   {from:0,to:1,label:'apply · replicas: 3',caption:'원하는 상태를 담은 Deployment를 제출합니다. API 서버가 검증하고 etcd에 저장합니다.'},
   {from:2,to:1,label:'파드 3개 생성',caption:'Deployment와 ReplicaSet 컨트롤러가 실제 파드 수 0을 보고 파드 객체 3개를 만듭니다. 아직 노드는 정해지지 않았습니다.'},
   {from:3,to:1,label:'파드마다 노드 배정',caption:'스케줄러가 requests를 감당할 수 있는 노드를 골라 기록합니다. 가능하면 노드를 나눠 배치합니다.'},
   {from:4,to:1,label:'컨테이너 실행 · Ready',caption:'각 노드의 kubelet이 이미지를 받아 실행하고 readiness probe가 통과하면 Ready로 보고합니다. 이제 Service가 트래픽을 보냅니다.'},
   {from:4,to:4,label:'노드 2 응답 없음',tone:'fail',caption:'노드 하나가 죽어 그 노드의 kubelet이 보고를 멈춥니다.'},
   {from:1,to:1,label:'노드 장애 표시 · 파드 정리',tone:'wait',caption:'노드 컨트롤러가 일정 시간 보고가 없는 노드를 NotReady로 표시하고 그 위의 파드를 정리합니다. Service에서도 빠집니다.'},
   {from:2,to:1,label:'실제 2 < 원하는 3 → 1개 생성',caption:'ReplicaSet 컨트롤러가 차이를 보고 새 파드를 만듭니다. 사람이 아무것도 하지 않았습니다.'},
   {from:3,to:1,label:'남은 노드에 배정',caption:'스케줄러가 살아 있는 노드에 새 파드를 배정합니다.'},
   {from:4,to:1,label:'Ready · 다시 3개',tone:'ok',caption:'kubelet이 실행하고 readiness가 통과하면 다시 파드 3개가 트래픽을 받습니다. 원하는 상태와 실제 상태가 다시 같아졌습니다.'}
  ]}
};
