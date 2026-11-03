// 단원별 움직이는 그림. 상자 사이로 패킷·쿠키·열쇠 같은 칩이 옮겨 다니며 한 단계에 한 가지만 바뀝니다. 값과 주소는 예시입니다.
import type {Tone} from './cs-diagrams';
export type MotionBox={id:string;x:number;y:number;w:number;h:number;label:string;sub?:string;kind?:'store'};
export type MotionChip={id:string;label:string;tone?:Tone};
/** 상자 가운데, 또는 상자 가운데에서 [dx, dy]만큼 옮긴 자리 */
export type Place=string|[string,number,number];
export type MotionFrame={
 caption:string;
 /** 이 단계에 보이는 칩과 그 자리. 빠진 칩은 사라집니다. */
 at:Record<string,Place>;
 /** 이 단계에서 이 자리에서 출발해 at으로 날아가는 칩 */
 from?:Record<string,Place>;
 labels?:Record<string,string>;
 tone?:Record<string,Tone>;
 sub?:Record<string,string>;
 on?:string[];
 link?:[string,string][];
};
export type Motion={title:string;width:number;height:number;boxes:MotionBox[];chips:MotionChip[];frames:MotionFrame[]};

const b=(id:string,x:number,y:number,w:number,h:number,label:string,sub?:string,kind?:'store'):MotionBox=>({id,x,y,w,h,label,sub,kind});
const c=(id:string,label:string,tone?:Tone):MotionChip=>({id,label,tone});
// 상자 안 아래쪽, 이름과 설명 밑에 칩이 놓이는 자리
const inside=(box:string,dx=0,dy=24):Place=>[box,dx,dy];

export const motions:Record<string,Motion>={
 process:{title:'문맥 교환: CPU가 프로세스 A에서 B로 넘어가는 순간',width:720,height:312,
  boxes:[b('timer',30,30,170,76,'타이머','정해진 시간마다 신호'),b('cpu',260,16,200,140,'CPU','레지스터 · PC'),b('kernel',260,200,200,96,'커널','스케줄러'),b('pcbA',30,200,190,96,'PCB A','A가 멈춘 상태','store'),b('pcbB',500,200,190,96,'PCB B','B가 멈춘 상태','store')],
  chips:[c('regA','A 레지스터 PC=0x4012'),c('regB','B 레지스터 PC=0x7a30'),c('irq','인터럽트','wait'),c('pt','B의 페이지 테이블','note')],
  frames:[
   {caption:'CPU가 프로세스 A를 실행하고 있습니다. 레지스터에는 A가 지금 실행하는 명령의 위치(PC)와 계산 중인 값이 들어 있습니다. B는 지난번에 멈춘 상태가 PCB B에 보관된 채 차례를 기다립니다.',at:{regA:['cpu',0,10],regB:inside('pcbB')},sub:{cpu:'A 실행 중 · 사용자 모드'},on:['cpu']},
   {caption:'A에게 준 시간 조각이 끝나 타이머가 인터럽트를 겁니다. CPU는 A의 다음 명령으로 가지 않고 커널 모드로 바꿔 커널의 인터럽트 처리 코드로 뛰어듭니다.',at:{regA:['cpu',0,10],regB:inside('pcbB'),irq:inside('kernel')},from:{irq:'timer'},sub:{cpu:'커널 모드'},on:['timer','kernel'],link:[['timer','cpu']]},
   {caption:'A가 멈춘 자리를 잃지 않도록 커널이 레지스터 값을 모두 PCB A에 저장합니다.',at:{regA:inside('pcbA'),regB:inside('pcbB')},sub:{cpu:'커널 모드'},on:['kernel','pcbA'],link:[['cpu','pcbA']]},
   {caption:'스케줄러가 실행할 준비가 된 프로세스 가운데 다음 차례를 고릅니다. 이번에는 B입니다.',at:{regA:inside('pcbA'),regB:inside('pcbB')},sub:{cpu:'커널 모드',kernel:'다음 차례: B'},on:['kernel','pcbB']},
   {caption:'PCB B에 저장해 둔 값을 CPU 레지스터에 다시 채웁니다. 다른 프로세스로 바뀌었으니 메모리 주소를 번역할 페이지 테이블도 B의 것으로 바꿉니다.',at:{regA:inside('pcbA'),regB:['cpu',0,10],pt:['cpu',0,44]},from:{pt:'kernel'},sub:{cpu:'커널 모드',kernel:'다음 차례: B'},on:['cpu','pcbB'],link:[['pcbB','cpu']]},
   {caption:'사용자 모드로 돌아가면 B는 지난번에 멈춘 바로 그 명령부터 이어서 실행합니다. B 입장에서는 멈췄던 적이 없는 것처럼 보입니다. A는 다음 차례까지 PCB A에서 기다립니다.',at:{regA:inside('pcbA'),regB:['cpu',0,10],pt:['cpu',0,44]},sub:{cpu:'B 실행 중 · 사용자 모드'},on:['cpu']},
   {caption:'이 교체에는 비용이 듭니다. 저장하고 복원하는 동안 어느 프로그램도 일을 하지 못하고, 주소 공간이 바뀌면 TLB와 캐시에 쌓아 둔 내용이 쓸모없어져 한동안 느려집니다. 같은 프로세스의 스레드끼리 바꿀 때는 페이지 테이블을 바꾸지 않아도 되어 더 가볍습니다.',at:{regA:inside('pcbA'),regB:['cpu',0,10],pt:['cpu',0,44]},sub:{cpu:'B 실행 중 · 사용자 모드'},on:['cpu','kernel']}
  ]},

 tcp:{title:'TCP 연결: 세 번 주고받아 열고, 데이터를 보내고, 닫기까지',width:720,height:250,
  boxes:[b('client',30,80,220,100,'클라이언트','CLOSED'),b('server',470,80,220,100,'서버 :443','LISTEN')],
  chips:[c('syn','SYN seq=100'),c('synack','SYN+ACK seq=300 ack=101'),c('ack','ACK ack=301'),c('data','seq=101 · 5바이트'),c('dack','ACK ack=106'),c('fin','FIN'),c('finack','ACK, FIN','note')],
  frames:[
   {caption:'서버는 포트 443에서 연결을 기다립니다(LISTEN). 클라이언트에는 아직 아무 연결이 없습니다(CLOSED).',at:{},on:['server']},
   {caption:'SYN: 클라이언트가 연결을 청하며 "내 바이트 번호는 100부터 센다"고 알립니다. 실제 시작 번호는 무작위로 정합니다.',at:{syn:inside('server')},from:{syn:inside('client')},sub:{client:'SYN_SENT'},link:[['client','server']]},
   {caption:'SYN+ACK: 서버가 "다음엔 101번을 기다린다"(ack=101)고 답하면서 자기 시작 번호 300을 알립니다.',at:{synack:inside('client')},from:{synack:inside('server')},sub:{client:'SYN_SENT',server:'SYN_RECEIVED'},link:[['server','client']]},
   {caption:'ACK: 클라이언트가 301번을 기다린다고 답하면 양쪽 모두 ESTABLISHED가 됩니다. 연결을 여는 데만 왕복 한 번이 들었고 데이터는 아직 한 바이트도 가지 않았습니다.',at:{ack:inside('server')},from:{ack:inside('client')},sub:{client:'ESTABLISHED',server:'ESTABLISHED'},on:['client','server'],link:[['client','server']]},
   {caption:'이제 데이터를 보냅니다. 101번부터 5바이트, 즉 101~105번 바이트입니다.',at:{data:inside('server')},from:{data:inside('client')},sub:{client:'ESTABLISHED',server:'ESTABLISHED'},link:[['client','server']]},
   {caption:'서버가 "106번부터 주세요"(ack=106)라고 답합니다. 이 확인이 정해진 시간 안에 오지 않으면 클라이언트는 같은 바이트를 다시 보냅니다. 잃어버린 패킷을 되찾는 방법이 이것입니다.',at:{dack:inside('client')},from:{dack:inside('server')},sub:{client:'ESTABLISHED',server:'ESTABLISHED'},link:[['server','client']]},
   {caption:'보낼 것이 끝나면 클라이언트가 FIN을 보냅니다. "나는 더 보낼 것이 없다"는 뜻이고, 서버는 남은 데이터를 마저 보낼 수 있습니다.',at:{fin:inside('server')},from:{fin:inside('client')},sub:{client:'FIN_WAIT',server:'CLOSE_WAIT'},link:[['client','server']]},
   {caption:'서버도 ACK와 자기 FIN을 보내고, 클라이언트의 마지막 ACK로 연결이 닫힙니다. 먼저 닫은 쪽은 늦게 도착할 패킷에 대비해 잠시 TIME_WAIT 상태로 기다립니다.',at:{finack:inside('client')},from:{finack:inside('server')},sub:{client:'TIME_WAIT',server:'CLOSED'},link:[['server','client']]}
  ]},

 dns:{title:'www.example.com의 주소를 처음 찾을 때',width:720,height:316,
  boxes:[b('pc',20,116,150,86,'내 컴퓨터','브라우저'),b('resolver',220,116,180,86,'재귀 리졸버','통신사 · 공용 DNS'),b('root',470,10,230,86,'루트 서버','.'),b('tld',470,116,230,86,'.com 서버','TLD'),b('auth',470,222,230,86,'example.com 서버','권한 서버')],
  chips:[c('q','www.example.com?'),c('ref1','.com 서버 주소','note'),c('ref2','권한 서버 주소','note'),c('ans','A 203.0.113.10')],
  frames:[
   {caption:'브라우저가 www.example.com의 IP 주소를 묻습니다. 내 컴퓨터의 캐시에 없으니 설정된 재귀 리졸버에게 질문을 넘깁니다.',at:{q:inside('resolver')},from:{q:inside('pc')},link:[['pc','resolver']]},
   {caption:'리졸버도 처음 듣는 이름입니다. 이름 나무의 꼭대기인 루트 서버에게 묻습니다.',at:{q:inside('root')},from:{q:inside('resolver')},on:['root'],link:[['resolver','root']]},
   {caption:'루트는 답을 모르지만 .com을 맡은 서버들의 주소를 알려 줍니다.',at:{ref1:inside('resolver')},from:{ref1:inside('root')},link:[['root','resolver']]},
   {caption:'리졸버가 같은 질문을 .com 서버에게 다시 합니다.',at:{q:inside('tld')},from:{q:inside('resolver')},on:['tld'],link:[['resolver','tld']]},
   {caption:'.com 서버도 답 대신 example.com을 맡은 권한 서버의 주소를 알려 줍니다. 각 층은 자기 아래 가지가 누구 담당인지만 압니다.',at:{ref2:inside('resolver')},from:{ref2:inside('tld')},link:[['tld','resolver']]},
   {caption:'권한 서버에게 묻습니다. 이 서버는 example.com의 주인이 직접 등록한 기록을 갖고 있습니다.',at:{q:inside('auth')},from:{q:inside('resolver')},on:['auth'],link:[['resolver','auth']]},
   {caption:'권한 서버가 답합니다. www.example.com의 A 기록은 203.0.113.10이고 TTL은 300초입니다.',at:{ans:inside('resolver')},from:{ans:inside('auth')},sub:{resolver:'TTL 300초 동안 캐시'},link:[['auth','resolver']]},
   {caption:'리졸버는 답을 캐시에 넣고 내 컴퓨터에 돌려줍니다. 300초 안에 누가 같은 이름을 물으면 루트까지 가지 않고 바로 답합니다.',at:{ans:inside('pc')},from:{ans:inside('resolver')},sub:{resolver:'캐시: www → 203.0.113.10'},on:['pc','resolver'],link:[['resolver','pc']]}
  ]},

 tls:{title:'TLS 1.3: 왕복 한 번으로 암호화된 대화를 시작하기',width:720,height:316,
  boxes:[b('client',30,90,220,100,'브라우저'),b('server',470,90,220,100,'서버','shop.example.com'),b('trust',30,222,220,86,'루트 인증서 목록','브라우저가 믿는 기관','store')],
  chips:[c('ch','ClientHello + 공개 값'),c('sh','ServerHello + 공개 값'),c('cert','인증서 · 서명 · Finished','note'),c('fin','Finished'),c('data','GET /orders (암호화)')],
  frames:[
   {caption:'TCP 연결이 열리면 브라우저가 ClientHello를 보냅니다. 쓸 수 있는 암호 방식 목록과 함께 키를 맞추는 데 쓸 자기 쪽 공개 값을 미리 넣어 보냅니다.',at:{ch:inside('server')},from:{ch:inside('client')},link:[['client','server']]},
   {caption:'서버가 암호 방식을 고르고 자기 쪽 공개 값을 돌려줍니다. 두 공개 값으로 양쪽은 각자 같은 비밀 키를 계산합니다. 중간에서 공개 값만 본 사람은 이 키를 알아낼 수 없습니다.',at:{sh:inside('client')},from:{sh:inside('server')},sub:{client:'공유 키 계산',server:'공유 키 계산'},on:['client','server'],link:[['server','client']]},
   {caption:'같은 응답에 서버는 인증서와 서명을 이미 암호화해서 붙입니다. 인증서에는 도메인, 서버의 공개 키, 그리고 인증 기관의 서명이 들어 있습니다.',at:{cert:inside('client')},from:{cert:inside('server')},sub:{client:'공유 키 있음',server:'공유 키 있음'},link:[['server','client']]},
   {caption:'브라우저는 인증서의 서명을 거슬러 올라가 자기가 믿는 루트 인증서에 닿는지, 도메인이 맞는지, 기한이 남았는지 확인합니다. 하나라도 틀리면 경고 화면을 띄우고 멈춥니다.',at:{cert:inside('trust')},from:{cert:inside('client')},sub:{client:'인증서 확인',server:'공유 키 있음'},on:['trust'],link:[['client','trust']]},
   {caption:'확인이 끝나면 브라우저도 Finished를 보냅니다. 지금까지 오간 메시지가 중간에 바뀌지 않았음을 서로 확인하는 값입니다. 여기까지 왕복 한 번입니다.',at:{fin:inside('server')},from:{fin:inside('client')},sub:{client:'암호화 준비 끝',server:'암호화 준비 끝'},link:[['client','server']]},
   {caption:'이제 HTTP 요청과 응답은 공유 키로 암호화되어 오갑니다. 중간의 공유기나 통신사는 어느 사이트에 접속하는지 정도만 알 수 있고 주소 경로, 쿠키, 내용은 읽을 수 없습니다.',at:{data:inside('server')},from:{data:inside('client')},sub:{client:'암호화된 대화',server:'암호화된 대화'},on:['client','server'],link:[['client','server']]}
  ]},

 session:{title:'세션 쿠키가 브라우저와 서버 사이를 오가는 길',width:720,height:300,
  boxes:[b('browser',20,20,220,110,'브라우저 탭','shop.example.com'),b('jar',20,180,220,100,'쿠키 저장소','브라우저 안','store'),b('server',280,20,200,110,'서버'),b('store',510,20,190,110,'세션 저장소','Redis 등','store')],
  chips:[c('login','POST /login'),c('entry','k3f9 → 사용자 7'),c('setc','Set-Cookie: sid=k3f9'),c('cookie','sid=k3f9'),c('req','GET /orders · sid=k3f9'),c('resp','사용자 7의 주문'),c('expire','Set-Cookie: sid= 만료','fail')],
  frames:[
   {caption:'사용자가 로그인 폼을 제출합니다. 브라우저가 아이디와 비밀번호를 HTTPS로 서버에 보냅니다.',at:{login:inside('server')},from:{login:inside('browser')},link:[['browser','server']]},
   {caption:'서버가 비밀번호를 확인하고 아무도 짐작할 수 없는 무작위 세션 ID를 만듭니다. "이 ID는 사용자 7"이라는 기록은 서버 쪽 세션 저장소에만 둡니다.',at:{entry:inside('store')},from:{entry:inside('server')},on:['store'],link:[['server','store']]},
   {caption:'응답의 Set-Cookie 헤더로 세션 ID만 돌려보냅니다. 함께 붙이는 HttpOnly는 페이지 스크립트가 쿠키를 읽지 못하게, Secure는 HTTPS 연결에만 실어 보내게 하는 표시입니다.',at:{entry:inside('store'),setc:inside('browser')},from:{setc:inside('server')},link:[['server','browser']]},
   {caption:'브라우저가 이 쿠키를 shop.example.com 몫으로 쿠키 저장소에 넣어 둡니다. 서버는 이 브라우저에 대해 따로 기억하는 것이 없습니다. 기억은 저장소의 기록과 쿠키 한 줄로 나뉘어 있습니다.',at:{entry:inside('store'),cookie:inside('jar')},from:{cookie:inside('browser')},on:['jar']},
   {caption:'사용자가 주문 내역을 누릅니다. 브라우저는 같은 사이트로 가는 요청마다 저장해 둔 쿠키를 자동으로 붙입니다. 앱 코드에서 따로 넣지 않아도 됩니다.',at:{entry:inside('store'),cookie:inside('jar'),req:inside('server')},from:{req:inside('jar')},link:[['jar','server']]},
   {caption:'서버는 세션 저장소에서 k3f9를 찾아 사용자 7이라는 것을 알아내고, 사용자 7의 주문만 골라 응답합니다.',at:{entry:inside('store'),cookie:inside('jar'),resp:inside('browser')},from:{resp:inside('server')},on:['server','store'],link:[['store','server'],['server','browser']]},
   {caption:'로그아웃하면 서버가 저장소에서 k3f9 기록을 지웁니다. 누가 쿠키를 훔쳐 갔더라도 이제 그 ID로는 아무것도 할 수 없습니다.',at:{entry:inside('store'),cookie:inside('jar')},labels:{entry:'k3f9 삭제됨'},tone:{entry:'fail'},on:['store']},
   {caption:'응답에 같은 이름의 쿠키를 이미 지난 만료 시각으로 보내면 브라우저도 쿠키를 지웁니다. 다음 요청부터는 쿠키 없이 나가서 다시 로그인 화면이 뜹니다.',at:{expire:inside('jar')},from:{expire:inside('server')},on:['jar'],link:[['server','jar']]}
  ]},

 cors:{title:'다른 출처로 PUT을 보낼 때 브라우저가 하는 일',width:720,height:250,
  boxes:[b('script',20,70,180,110,'페이지 스크립트','shop.example.com'),b('browser',260,70,200,110,'브라우저','출처 검사'),b('api',520,70,180,110,'서버','api.example.com')],
  chips:[c('put','fetch PUT /cart'),c('pre','OPTIONS 사전 요청','note'),c('allow','허용: shop · PUT'),c('res','200 응답'),c('err','CORS 오류','fail')],
  frames:[
   {caption:'shop.example.com에서 받은 스크립트가 fetch로 api.example.com에 PUT 요청을 보내려 합니다. 출처가 다르니 브라우저가 중간에서 확인합니다.',at:{put:inside('browser')},from:{put:inside('script')},link:[['script','browser']]},
   {caption:'PUT은 단순 요청이 아니라서 브라우저가 실제 요청보다 먼저 OPTIONS 요청으로 허락을 묻습니다. 이것을 사전 요청(preflight)이라고 합니다. 요청에는 어느 출처에서 무엇을 보내려는지가 담깁니다.',at:{pre:inside('api')},from:{pre:inside('browser')},on:['api'],link:[['browser','api']]},
   {caption:'서버가 Access-Control-Allow-Origin에 shop.example.com을, Allow-Methods에 PUT을 담아 답합니다.',at:{allow:inside('browser')},from:{allow:inside('api')},on:['browser'],link:[['api','browser']]},
   {caption:'허락을 확인한 브라우저가 이제 실제 PUT 요청을 보냅니다.',at:{put:inside('api')},from:{put:inside('browser')},labels:{put:'PUT /cart'},link:[['browser','api']]},
   {caption:'응답이 오면 브라우저는 응답에도 허락 헤더가 있는지 확인한 뒤에야 스크립트에 넘겨줍니다.',at:{res:inside('script')},from:{res:inside('api')},on:['script'],link:[['api','script']]},
   {caption:'사전 요청에 허락이 없었다면 브라우저는 실제 요청을 보내지 않고 스크립트에 오류를 냅니다. 사전 요청이 필요 없는 단순 GET은 서버까지 가서 처리되고 브라우저가 응답만 감춥니다. CORS는 서버를 지키는 장치가 아니라 다른 출처의 응답을 함부로 읽지 못하게 하는 브라우저의 규칙입니다.',at:{err:inside('script')},from:{err:inside('browser')},on:['browser'],link:[['browser','script']]}
  ]},

 index:{title:'B-tree 인덱스로 id 42를 찾아 내려가기',width:720,height:320,
  boxes:[b('root',260,10,200,86,'루트 [30 | 70]'),b('n1',20,120,200,86,'[10 | 20]'),b('n2',260,120,200,86,'[40 | 55]'),b('n3',500,120,200,86,'[80 | 90]'),b('leaf',260,228,200,86,'잎 [40 · 42 · 48]'),b('table',500,228,200,86,'테이블 페이지 812','주문 행','store')],
  chips:[c('q','WHERE id = 42')],
  frames:[
   {caption:'주문 테이블에서 id가 42인 행을 찾습니다. 인덱스가 없으면 테이블을 처음부터 끝까지 읽어야 합니다. B-tree 인덱스는 루트 페이지 하나를 읽는 데서 시작합니다.',at:{q:inside('root',0,22)},sub:{root:'페이지 읽기 1'},on:['root']},
   {caption:'루트에서 42는 30과 70 사이이므로 가운데 자식으로 내려갑니다. 왼쪽과 오른쪽 가지는 읽지 않습니다.',at:{q:inside('n2',0,22)},sub:{root:'42는 30과 70 사이',n2:'페이지 읽기 2'},on:['n2'],link:[['root','n2']]},
   {caption:'두 번째 페이지에서 42는 40과 55 사이이므로 그 범위를 맡은 잎으로 내려갑니다.',at:{q:inside('leaf',0,22)},sub:{n2:'42는 40과 55 사이',leaf:'페이지 읽기 3'},on:['leaf'],link:[['n2','leaf']]},
   {caption:'잎에서 42를 찾았습니다. 잎에는 키와 함께 그 행이 테이블의 어느 페이지에 있는지가 적혀 있습니다.',at:{q:inside('leaf',0,22)},labels:{q:'42 → 페이지 812'},sub:{leaf:'42를 찾음'},on:['leaf'],link:[['leaf','table']]},
   {caption:'그 테이블 페이지를 읽어 행을 꺼냅니다. 페이지 네 번으로 끝났습니다. 실제 노드에는 키가 수백 개씩 들어가므로 행이 수억 개여도 서너 단계면 잎에 닿습니다.',at:{q:inside('table',0,22)},labels:{q:'주문 42 · 31,000원'},sub:{table:'페이지 읽기 4'},on:['table']}
  ]},

 cache:{title:'캐시를 먼저 보고 없으면 DB에서 채우기 (cache-aside)',width:720,height:300,
  boxes:[b('user',20,100,150,100,'사용자'),b('app',230,100,170,100,'앱 서버'),b('cache',480,16,220,100,'캐시','Redis','store'),b('db',480,184,220,100,'DB','디스크')],
  chips:[c('get','GET product:7'),c('miss','없음 (miss)','wait'),c('query','SELECT … id=7'),c('row','상품 7'),c('set','SET product:7 TTL 600'),c('hit','hit · 상품 7'),c('upd','UPDATE 가격'),c('del','DEL product:7','fail')],
  frames:[
   {caption:'사용자가 상품 7을 엽니다. 앱은 DB보다 먼저 캐시에 product:7이 있는지 묻습니다.',at:{get:inside('cache')},from:{get:inside('user')},link:[['app','cache']]},
   {caption:'처음이라 캐시에 없습니다. 이것을 캐시 미스라고 합니다.',at:{miss:inside('app')},from:{miss:inside('cache')},sub:{cache:'비어 있음'},link:[['cache','app']]},
   {caption:'앱이 DB에서 상품 7을 읽습니다. 디스크를 읽고 쿼리를 처리하느라 캐시보다 훨씬 느립니다.',at:{query:inside('db')},from:{query:inside('app')},sub:{cache:'비어 있음'},on:['db'],link:[['app','db']]},
   {caption:'읽은 값을 사용자에게 돌려주면서 캐시에도 넣습니다. TTL 600초를 붙여 두면 무효화를 놓쳐도 10분 뒤에는 저절로 사라집니다.',at:{row:inside('user'),set:inside('cache')},from:{row:inside('db'),set:inside('app')},sub:{cache:'product:7 저장됨'},on:['cache'],link:[['app','cache']]},
   {caption:'다음 사용자가 같은 상품을 열면 캐시가 바로 답합니다(캐시 히트). DB는 이 요청을 보지도 않습니다.',at:{hit:inside('user')},from:{hit:inside('cache')},sub:{cache:'product:7 저장됨'},on:['cache'],link:[['cache','app']]},
   {caption:'관리자가 가격을 바꿉니다. 앱은 DB를 먼저 고친 뒤 캐시의 product:7을 지웁니다. 다음 읽기는 미스가 되어 새 값으로 다시 채워집니다.',at:{upd:inside('db'),del:inside('cache')},from:{upd:inside('app'),del:inside('app')},sub:{cache:'지워짐'},on:['db','cache'],link:[['app','db'],['app','cache']]}
  ]},

 lb:{title:'로드 밸런서가 요청을 나누고 고장 난 서버를 빼는 과정',width:720,height:316,
  boxes:[b('user',20,116,140,86,'사용자들'),b('lb',220,116,170,86,'로드 밸런서','라운드 로빈'),b('s1',470,10,230,86,'서버 1','정상'),b('s2',470,116,230,86,'서버 2','정상'),b('s3',470,222,230,86,'서버 3','정상')],
  chips:[c('r1','요청 1'),c('r2','요청 2'),c('r3','요청 3'),c('h1','/health 200'),c('h2','응답 없음','fail'),c('h3','/health 200'),c('r4','요청 4'),c('r5','요청 5')],
  frames:[
   {caption:'요청 1이 들어오자 로드 밸런서가 서버 1에 보냅니다. 라운드 로빈은 서버들에게 차례대로 하나씩 돌아가며 맡기는 방식입니다.',at:{r1:inside('s1')},from:{r1:inside('user')},link:[['lb','s1']]},
   {caption:'요청 2는 다음 차례인 서버 2로 갑니다.',at:{r2:inside('s2')},from:{r2:inside('user')},link:[['lb','s2']]},
   {caption:'요청 3은 서버 3으로 갑니다. 다음 요청은 다시 서버 1부터입니다.',at:{r3:inside('s3')},from:{r3:inside('user')},link:[['lb','s3']]},
   {caption:'로드 밸런서는 몇 초마다 각 서버의 /health를 부릅니다. 서버 1과 3은 200으로 답하지만 서버 2는 정해진 시간 안에 응답하지 않습니다.',at:{h1:inside('s1'),h2:inside('s2'),h3:inside('s3')},from:{h1:inside('lb'),h2:inside('lb'),h3:inside('lb')},sub:{s2:'헬스 체크 실패'},on:['lb']},
   {caption:'정해 둔 횟수만큼 연속으로 실패하자 서버 2를 대상에서 뺍니다. 요청 4는 서버 1로 갑니다.',at:{r4:inside('s1')},from:{r4:inside('user')},sub:{s2:'대상에서 빠짐'},on:['s2'],link:[['lb','s1']]},
   {caption:'요청 5는 서버 2를 건너뛰고 서버 3으로 갑니다. 서버 2가 고쳐져 헬스 체크를 다시 연속으로 통과하면 대상에 돌아옵니다.',at:{r5:inside('s3')},from:{r5:inside('user')},sub:{s2:'대상에서 빠짐'},link:[['lb','s3']]}
  ]},

 deadlock:{title:'두 스레드가 잠금을 반대 순서로 잡을 때',width:720,height:300,
  boxes:[b('t1',20,20,220,110,'스레드 1','A 다음 B를 잡으려 함'),b('t2',480,20,220,110,'스레드 2','B 다음 A를 잡으려 함'),b('lockA',20,180,220,100,'잠금 A','주문 행','store'),b('lockB',480,180,220,100,'잠금 B','재고 행','store')],
  chips:[c('ka','열쇠 A'),c('kb','열쇠 B')],
  frames:[
   {caption:'두 잠금이 모두 비어 있습니다. 스레드 1은 A를 잡은 다음 B를, 스레드 2는 B를 잡은 다음 A를 잡으려 합니다.',at:{ka:inside('lockA'),kb:inside('lockB')}},
   {caption:'스레드 1이 잠금 A를 잡습니다.',at:{ka:inside('t1'),kb:inside('lockB')},sub:{t1:'A 보유'},on:['t1']},
   {caption:'거의 같은 순간 스레드 2가 잠금 B를 잡습니다. 여기까지는 둘 다 아무 잘못이 없습니다.',at:{ka:inside('t1'),kb:inside('t2')},sub:{t1:'A 보유',t2:'B 보유'},on:['t2']},
   {caption:'스레드 1이 B를 잡으려 하지만 스레드 2가 쥐고 있어 기다립니다.',at:{ka:inside('t1'),kb:inside('t2')},sub:{t1:'A 보유 · B 기다림',t2:'B 보유'},on:['t1'],link:[['t1','lockB']]},
   {caption:'스레드 2도 A를 잡으려 하지만 스레드 1이 쥐고 있습니다. 서로가 서로를 기다리는 원이 생겨 둘 다 영원히 멈춥니다. 이것이 교착 상태입니다.',at:{ka:inside('t1'),kb:inside('t2')},tone:{ka:'fail',kb:'fail'},sub:{t1:'A 보유 · B 기다림',t2:'B 보유 · A 기다림'},on:['t1','t2'],link:[['t1','lockB'],['t2','lockA']]},
   {caption:'가장 흔한 해법은 모든 스레드가 같은 순서로 잠금을 잡게 하는 것입니다. 스레드 2도 A부터 잡으려 하면 스레드 1이 A와 B를 모두 쓰고 놓을 때까지 기다렸다가 차례로 얻습니다. 원이 생길 수 없습니다.',at:{ka:inside('t1',-50),kb:inside('t1',50)},sub:{t1:'A, B 보유 → 쓰고 반납',t2:'A 차례 기다림'},on:['t1'],link:[['t2','lockA']]}
  ]}
};
