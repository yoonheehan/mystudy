// 단원별 역사와 설계 배경. 사실 관계는 sources의 1차 자료로 확인했습니다.
export type HistoryEvent={year:string;title:string;body:string};
export type DesignDecision={question:string;answer:string;cost:string};
export type LessonHistory={intro:string;timeline:HistoryEvent[];decisions:DesignDecision[];today:string[];sources:[string,string][]};

export const histories:Record<string,LessonHistory>={
 process:{
  intro:'프로세스와 스레드는 누군가 한 번에 설계한 개념이 아닙니다. 비싼 CPU를 놀리지 않으려는 노력이 먼저 있었고 여러 사람이 컴퓨터 한 대를 나눠 쓰려는 요구가 뒤따랐습니다. 마지막으로 프로그램 하나 안에서 여러 일을 함께 하려는 요구가 더해지면서 지금 모양이 되었습니다. 이 순서를 따라가면 프로세스는 왜 메모리를 나누고 스레드는 왜 공유하는지가 저절로 보입니다.',
  timeline:[
   {year:'1950년대',title:'한 번에 한 프로그램',body:'초기 컴퓨터는 프로그램을 하나씩 차례로 실행했습니다. 운영자가 카드 묶음을 넣고 끝나면 다음 묶음을 넣었습니다. 1956년 GM과 북미항공이 IBM 704용으로 만든 GM-NAA I/O 같은 모니터 프로그램이 작업을 자동으로 이어 붙였지만 프로그램이 테이프에서 데이터를 읽는 동안 CPU는 아무 일도 하지 않았습니다. 그때 CPU는 가장 비싼 부품이었으니 이 대기 시간이 곧 돈이었습니다.'},
   {year:'1960년대 초',title:'기다리는 동안 다른 프로그램을',body:'해결책은 메모리에 프로그램 여러 개를 함께 올려 두고 하나가 입출력을 기다리면 다른 프로그램에 CPU를 넘기는 멀티프로그래밍이었습니다. 맨체스터 대학의 Atlas가 대표적인 예로, 가상 메모리도 이 기계에서 처음 쓰였습니다. 그런데 이렇게 하자 문제가 두 가지 생겼습니다. 한 프로그램이 다른 프로그램의 메모리를 덮어쓰면 안 되고 CPU를 넘겼다가 돌려받을 때 어디까지 실행했는지 기억해야 합니다. 앞의 문제는 메모리 보호와 주소 공간으로, 뒤의 문제는 문맥 저장으로 이어집니다.'},
   {year:'1961~1965',title:'여러 사람이 나눠 쓰는 컴퓨터',body:'MIT의 CTSS는 여러 사용자가 단말기로 동시에 접속해 컴퓨터 한 대를 나눠 쓰게 한 초기 시분할 시스템입니다. 이제 CPU를 넘기는 이유가 입출력 대기만이 아니라 공정함이 됩니다. 아무도 기다리지 않더라도 짧은 시간마다 타이머 인터럽트로 실행 대상을 바꿔야 모든 사용자가 바로 반응을 받습니다. 이 흐름은 1965년에 시작된 Multics로 이어졌습니다.'},
   {year:'1965~1966',title:'프로세스라는 이름과 동기화',body:'다익스트라는 1965년 글 「협력하는 순차 프로세스」에서 여러 실행 흐름이 공유 자원을 안전하게 쓰는 방법으로 세마포어를 제안했습니다. 이듬해 데니스와 반 혼은 논문 「멀티프로그래밍 계산의 프로그래밍 의미론」에서 실행 중인 계산을 프로세스로, 그 계산이 접근할 수 있는 자원의 범위를 따로 정의했습니다. 실행과 자원을 나눠 생각하는 이 틀이 오늘날 프로세스는 자원의 단위, 스레드는 실행의 단위라는 구분의 뿌리입니다.'},
   {year:'1970년대',title:'유닉스의 fork',body:'유닉스는 fork()로 실행 중인 프로세스를 복제하고 exec()로 다른 프로그램을 덮어 실행하는 단순한 방법을 택했습니다. 셸이 명령마다 새 프로세스를 띄우고 파이프로 프로세스끼리 출력을 이어 붙이는 방식이 여기서 나왔습니다. 프로세스를 싸고 흔한 도구로 만든 셈입니다. 대신 프로세스끼리 데이터를 나누려면 언제나 파이프 같은 통로를 거쳐야 했습니다.'},
   {year:'1985~1995',title:'스레드의 등장',body:'창을 그리면서 파일을 저장하는 GUI 프로그램, 여러 연결을 동시에 받는 서버, CPU를 여러 개 단 컴퓨터가 나오면서 프로그램 하나 안에서 여러 일을 하려는 요구가 커졌습니다. 그때마다 프로세스를 만들면 주소 공간을 새로 꾸리고 데이터를 통로로 주고받아야 해서 무거웠습니다. 카네기멜런 대학의 Mach 커널은 자원을 담는 태스크와 실행 흐름인 스레드를 분리했습니다. 1995년에는 POSIX 표준(IEEE 1003.1c)이 pthreads API를 정했습니다. 스레드는 주소 공간을 공유해서 만들기 쉽고 데이터를 바로 나눌 수 있지만 그 대가로 경쟁 상태와 동기화 문제가 프로그래머 몫으로 넘어왔습니다.'},
   {year:'1999~2004',title:'만 개의 연결',body:'댄 케겔이 1999년에 정리한 C10K 문제, 즉 서버 한 대가 동시 연결 1만 개를 받으려면 어떻게 해야 하는가가 서버 설계의 화두가 되었습니다. 연결마다 프로세스를 두는 Apache의 prefork, 스레드를 두는 worker, 소수의 프로세스가 이벤트 루프로 많은 연결을 돌보는 nginx(2004 공개)가 각각 다른 답이었습니다. 리눅스는 clone() 시스템 호출로 무엇을 공유할지 골라 실행 흐름을 만들기 때문에, 커널 입장에서 스레드는 자원을 공유하는 프로세스입니다. 2003년 NPTL이 들어오면서 리눅스 스레드는 POSIX 규칙을 제대로 따르고 수만 개를 만들어도 될 만큼 가벼워졌습니다.'},
   {year:'2008',title:'다시 프로세스로',body:'구글 크롬은 탭과 웹 페이지를 별도 프로세스로 나누는 구조로 나왔습니다. 탭 하나가 죽어도 브라우저 전체가 죽지 않고 웹 페이지를 권한이 낮은 프로세스 안에 가둘 수 있었습니다. 메모리를 더 쓰는 대신 격리를 얻은 선택입니다. 프로세스가 무거운 옛 방식이 아니라 안전을 위한 도구라는 것을 보여 준 사례입니다.'},
   {year:'2024~2025',title:'파이썬과 GIL',body:'CPython은 GIL 때문에 한 순간에 스레드 하나만 파이썬 바이트코드를 실행합니다. 그래서 계산이 많은 일은 multiprocessing으로 프로세스를 나누는 것이 정석이었습니다. PEP 703에 따라 3.13에서 GIL을 뺀 free-threaded 빌드가 실험 기능으로 나왔고 PEP 779에 따라 3.14에서는 공식 지원 빌드가 되었습니다. 다만 기본 빌드는 여전히 GIL을 씁니다.'}
  ],
  decisions:[
   {question:'프로세스는 왜 메모리를 서로 나눌까?',answer:'멀티프로그래밍에서 한 프로그램의 버그가 다른 프로그램을 망가뜨리지 않게 하려는 것입니다. CPU의 메모리 관리 장치(MMU)가 프로세스마다 다른 주소 번역표를 쓰기 때문에, 같은 주소 0x1000이라도 프로세스마다 다른 실제 메모리를 가리키고 남의 영역에는 닿지 않습니다.',cost:'프로세스끼리 데이터를 주고받으려면 파이프, 소켓, 공유 메모리 같은 IPC를 거쳐야 합니다. 프로세스를 전환할 때는 주소 번역표도 바꿔야 해서 TLB 같은 캐시의 효율이 떨어집니다.'},
   {question:'스레드는 왜 메모리를 공유할까?',answer:'같은 프로그램 안의 일들은 원래 같은 데이터를 다룹니다. 복사하거나 통로로 보내지 않고 바로 읽는 것이 빠르고 간단합니다. 주소 공간을 새로 꾸리지 않으니 만들고 전환하는 비용도 프로세스보다 작습니다.',cost:'두 스레드가 같은 값을 동시에 바꾸면 결과가 꼬이므로 락이 필요합니다. 락은 교착 상태와 병목을 부릅니다. 또 한 스레드의 메모리 오류가 프로세스 전체를 무너뜨릴 수 있습니다.'},
   {question:'그런데 스택만은 왜 스레드마다 따로일까?',answer:'스택에는 함수 호출 순서와 지역 변수, 곧 어디까지 실행했는가가 쌓입니다. 실행 흐름마다 이 기록이 따로 있어야 서로 다른 함수를 동시에 진행하고 전환했다가도 정확히 그 자리로 돌아올 수 있습니다.',cost:'스레드마다 스택 메모리를 미리 잡아 두기 때문에 스레드를 수만 개 만들면 그것만으로도 메모리가 꽤 듭니다. 스레드 풀로 개수를 제한하는 것도 이 때문입니다.'},
   {question:'OS는 왜 강제로 CPU를 빼앗을까?',answer:'프로그램이 스스로 CPU를 양보하는 협력형 방식에서는 한 프로그램이 양보하지 않으면 컴퓨터 전체가 멈췄습니다. Windows 3.1과 Mac OS 9까지 이 방식이었습니다. 타이머 인터럽트로 OS가 강제로 전환하는 선점형 방식이어야 공정함과 응답성을 보장할 수 있습니다.',cost:'코드가 언제 끊길지 모르기 때문에, 공유 데이터를 바꾸는 코드는 늘 동기화를 전제로 써야 합니다.'}
  ],
  today:[
   'Python 웹 서버를 gunicorn으로 띄우면 워커 프로세스 여러 개가 각자 요청을 받습니다. 프로세스로 장애를 격리하고 CPU 코어를 모두 쓰고 각 워커 안에서는 스레드나 asyncio로 입출력 대기를 겹칩니다. 실무에서는 둘 중 하나를 고르기보다 이렇게 섞는 경우가 많습니다.',
   '도커 컨테이너도 결국 리눅스 프로세스입니다. 네임스페이스로 보이는 범위를, cgroup으로 쓸 수 있는 CPU와 메모리를 제한해 프로세스 격리를 한 단계 더 강하게 만든 것입니다.',
   'Python에서 입출력을 기다리는 시간이 길다면 스레드나 asyncio를, 계산이 길다면 multiprocessing이나 free-threaded 빌드를 먼저 검토합니다. 어느 쪽이든 측정해서 정합니다.'
  ],
  sources:[
   ['Dennis & Van Horn, Programming Semantics for Multiprogrammed Computations (CACM, 1966)','https://dl.acm.org/doi/10.1145/365230.365252'],
   ['Dijkstra, Cooperating Sequential Processes (EWD123, 1965)','https://www.cs.utexas.edu/users/EWD/transcriptions/EWD01xx/EWD123.html'],
   ['Ritchie & Thompson, The UNIX Time-Sharing System (CACM, 1974)','https://dl.acm.org/doi/10.1145/361011.361061'],
   ['Ritchie, The Evolution of the Unix Time-sharing System','https://www.nokia.com/bell-labs/about/dennis-m-ritchie/hist.html'],
   ['Drepper & Molnar, The Native POSIX Thread Library for Linux (2003)','https://akkadia.org/drepper/nptl-design.pdf'],
   ['Linux man-pages · clone(2)','https://man7.org/linux/man-pages/man2/clone.2.html'],
   ['Dan Kegel, The C10K problem','http://www.kegel.com/c10k.html'],
   ['Chromium · Multi-process Architecture','https://www.chromium.org/developers/design-documents/multi-process-architecture/'],
   ['PEP 703 · Making the Global Interpreter Lock Optional','https://peps.python.org/pep-0703/'],
   ['PEP 779 · Criteria for supported status for free-threaded Python','https://peps.python.org/pep-0779/'],
   ['Wikipedia · Compatible Time-Sharing System','https://en.wikipedia.org/wiki/Compatible_Time-Sharing_System'],
   ['Wikipedia · Atlas (computer)','https://en.wikipedia.org/wiki/Atlas_(computer)']
  ]
 },
 memory:{
  intro:'메모리 관리는 늘 같은 고민에서 출발했습니다. 프로그램은 점점 커지는데 실제 메모리는 비싸고 작았습니다. 처음에는 프로그래머가 직접 조각을 바꿔 넣었고 다음에는 OS가 그 일을 대신 맡았습니다. 지금 서버에서 보는 가상 메모리, 파일 캐시, OOM은 모두 이 흐름 위에 있습니다. 메모리 사용률 숫자 하나로 누수를 판단하면 안 되는 이유도 여기서 나옵니다.',
  timeline:[
   {year:'1950년대',title:'프로그래머가 직접 갈아 끼우던 시절',body:'메인 메모리가 몇 천 단어 수준이던 시절에는 프로그램 전체가 한 번에 들어가지 않았습니다. 프로그래머가 프로그램을 조각(오버레이)으로 나누고 언제 어느 조각을 드럼이나 테이프에서 읽어 올지 직접 코드로 짰습니다. 메모리 크기가 바뀌면 이 계획도 다시 짜야 했습니다.'},
   {year:'1960',title:'쓰레기 수집의 등장',body:'존 매카시는 Lisp를 소개한 1960년 논문에서 더 이상 닿을 수 없는 메모리를 자동으로 회수하는 방법을 제시했습니다. 쓰레기 수집(GC)의 시작입니다. 어디서도 참조하지 않는 객체만 회수한다는 이 기준은 지금의 Python에도 그대로 남아 있습니다. GC가 있어도 누수가 생기는 이유가 바로 이 기준입니다.'},
   {year:'1962',title:'하나의 저장소처럼 보이게',body:'맨체스터 대학의 Atlas는 작은 코어 메모리와 큰 드럼을 묶어 프로그램에게는 하나의 큰 메모리처럼 보이게 했습니다. 메모리를 고정 크기 페이지로 나누고 없는 페이지에 접근하면 하드웨어가 알려 OS가 드럼에서 가져오는 방식입니다. 오버레이 계획을 사람 대신 기계가 세우게 된 것으로, 가상 메모리의 시작으로 꼽힙니다.'},
   {year:'1968',title:'스래싱과 작업 세트',body:'가상 메모리가 퍼지자 이상한 현상이 보고됐습니다. 프로그램을 너무 많이 올리면 CPU가 계산은 거의 못 하고 페이지를 바꿔 넣는 일만 하다가 시스템 전체가 멈춘 듯 느려졌습니다. 피터 데닝은 1968년 논문에서 프로그램이 일정 시간 동안 실제로 쓰는 페이지 묶음을 작업 세트로 정의했습니다. 작업 세트들의 합이 실제 메모리를 넘으면 스래싱이 일어난다는 설명입니다. 스왑이 심한 서버가 갑자기 느려지는 현상도 같은 원리로 이해합니다.'},
   {year:'1970년대',title:'상용 컴퓨터의 기본 기능으로',body:'IBM System/370과 DEC VAX 같은 기계에서 가상 메모리가 상용 컴퓨터의 기본 기능이 되었고 유닉스도 VAX에서 필요한 페이지만 읽어 오는 방식을 갖추었습니다. 이때부터 프로그램은 실제 메모리 크기를 거의 신경 쓰지 않고 작성할 수 있게 됐습니다.'},
   {year:'1990년대~',title:'리눅스의 overcommit과 OOM killer',body:'리눅스는 기본 설정에서 실제로 남은 메모리보다 많은 할당 요청도 대체로 받아 줍니다. 할당만 해 두고 다 쓰지 않는 프로그램이 많고 fork 뒤에는 복사가 실제로 필요할 때까지 페이지를 공유하기 때문입니다. 대신 정말로 메모리가 모자라면 커널의 OOM killer가 점수가 높은 프로세스를 골라 강제로 끝냅니다. 할당할 때가 아니라 쓰는 순간에 문제가 드러나는 이유입니다.'},
   {year:'2008~',title:'cgroup과 컨테이너의 메모리 한도',body:'2008년 리눅스에 들어온 cgroup은 프로세스 묶음별로 쓸 수 있는 메모리를 제한합니다. 도커와 쿠버네티스의 메모리 제한이 이 기능 위에 있습니다. 호스트에는 메모리가 넉넉해도 컨테이너가 자기 한도를 넘으면 그 안의 프로세스만 OOM으로 종료되고 쿠버네티스에는 OOMKilled로 표시됩니다.'}
  ],
  decisions:[
   {question:'왜 프로그램에게 진짜 주소 대신 가상 주소를 줄까?',answer:'프로그램이 실제 메모리의 크기나 위치를 몰라도 되게 하려는 것입니다. 프로세스마다 주소 번역표가 따로 있으니 서로 격리되고 필요한 페이지만 실제 메모리에 올리면 되므로 메모리보다 큰 프로그램도 돌릴 수 있습니다.',cost:'주소를 번역하는 비용이 들고 실제 메모리에 없는 페이지를 디스크에서 읽어 오면 메모리 접근보다 수천 배 이상 느립니다. 그래서 스왑이 잦아지면 서버가 급격히 느려집니다.'},
   {question:'왜 리눅스의 free 값은 늘 작아 보일까?',answer:'비어 있는 RAM은 아무 일도 하지 않는 낭비라고 보기 때문입니다. 커널은 남는 메모리를 파일 캐시로 채워 디스크 읽기를 줄이고 프로그램이 메모리를 요청하면 캐시를 바로 비워 내줍니다.',cost:'free 숫자만 보면 메모리가 부족한 것처럼 오해하기 쉽습니다. 실제로 더 쓸 수 있는 양은 available 값을 봐야 합니다.'},
   {question:'왜 할당을 넉넉히 받아 주고 나중에 프로세스를 죽일까?',answer:'모든 할당을 실제 메모리로 미리 보장하면 할당만 하고 쓰지 않는 메모리 때문에 실제보다 훨씬 적은 프로그램만 돌릴 수 있습니다. 대부분의 경우에는 넉넉히 받아 주는 쪽이 자원을 더 잘 씁니다.',cost:'메모리가 정말 바닥나면 malloc이 실패하는 대신 엉뚱한 시점에 프로세스가 SIGKILL로 끝납니다. 정리 코드도 실행되지 않습니다. 그래서 서비스마다 메모리 한도와 여유를 따로 설계합니다.'}
  ],
  today:[
   '컨테이너가 종료 코드 137로 끝났다면 128+9, 즉 SIGKILL을 받았다는 뜻이고 메모리 한도 초과가 흔한 원인입니다. 재시작만 반복하지 말고 사용량이 어떻게 늘었는지부터 봅니다.',
   'Python에서 tracemalloc은 추적을 시작한 뒤 Python이 할당한 양만 보여 줍니다. 프로세스 전체 RSS에는 네이티브 라이브러리와 버퍼도 들어가므로 두 숫자를 구별해서 봅니다.',
   '큰 파일은 한 번에 읽지 않고 나눠 읽고 메모리 캐시에는 크기 한도를 둡니다. 최고 사용량과 장기 추세를 따로 봐야 일시적인 급증과 누수를 구별할 수 있습니다.'
  ],
  sources:[
   ['McCarthy, Recursive Functions of Symbolic Expressions (CACM, 1960)','https://dl.acm.org/doi/10.1145/367177.367199'],
   ['Denning, The Working Set Model for Program Behavior (CACM, 1968)','https://dl.acm.org/doi/10.1145/363095.363141'],
   ['Linux Kernel · Overcommit Accounting','https://docs.kernel.org/mm/overcommit-accounting.html'],
   ['Linux man-pages · /proc/pid/oom_score_adj','https://man7.org/linux/man-pages/man5/proc_pid_oom_score_adj.5.html'],
   ['Linux Kernel · Control Group v2','https://docs.kernel.org/admin-guide/cgroup-v2.html'],
   ['Python · gc 모듈','https://docs.python.org/3/library/gc.html'],
   ['Wikipedia · Atlas (computer)','https://en.wikipedia.org/wiki/Atlas_(computer)']
  ]
 },
 linux:{
  intro:'컴퓨터를 한 사람만 쓸 때는 권한이라는 개념이 필요 없었습니다. 여러 사람이 컴퓨터 한 대를 나눠 쓰기 시작하자 내 파일을 남이 지우지 못하게 막아야 했습니다. 서버에서는 사람뿐 아니라 프로그램도 사용자가 됩니다. 유닉스의 단순한 권한 체계와 신호, 서비스 관리 방식은 모두 이 요구에 대한 답입니다. chmod 777이 왜 나쁜 습관인지도 여기서 설명됩니다.',
  timeline:[
   {year:'1960년대',title:'공유 컴퓨터와 파일 보호',body:'CTSS와 Multics 같은 시분할 시스템에서 여러 사용자가 같은 디스크를 쓰게 되면서 파일 보호가 필요해졌습니다. Multics는 파일마다 누가 무엇을 할 수 있는지 적은 접근 제어 목록(ACL)과 여러 단계의 보호 링을 두었습니다. 강력했지만 그만큼 복잡했습니다.'},
   {year:'1970년대 초',title:'유닉스의 rwx 9비트',body:'유닉스는 Multics의 복잡함을 덜어 내고 소유자, 그룹, 기타 사용자 세 부류에 읽기, 쓰기, 실행 권한을 주는 9비트로 줄였습니다. 작은 기계에서도 빠르게 검사할 수 있고 사람이 한눈에 읽을 수 있는 방식입니다. 지금 ls -l에서 보는 rwxr-xr-x가 그대로 이것입니다.'},
   {year:'1970~1980년대',title:'신호로 프로세스와 대화하기',body:'유닉스는 kill 명령으로 프로세스에 신호를 보냅니다. 이름과 달리 kill은 기본적으로 SIGTERM, 즉 정리하고 끝내 달라는 요청을 보냅니다. 프로세스는 이 신호를 받아 연결을 마무리하고 파일을 저장할 수 있습니다. SIGKILL은 커널이 프로세스를 바로 없애기 때문에 잡을 수도 무시할 수도 없습니다. 1988년 POSIX 표준이 이 신호들의 동작을 정리했습니다.'},
   {year:'1973',title:'setuid와 root',body:'데니스 리치는 프로그램을 실행하는 동안 그 파일 소유자의 권한을 빌려 쓰게 하는 setuid 비트를 고안했고 1973년에 특허를 출원했습니다. 일반 사용자가 passwd로 자기 비밀번호를 바꿀 수 있는 것도 이 덕분입니다. 한편 유닉스에는 모든 검사를 건너뛰는 root가 있어서, root로 도는 프로그램 하나가 뚫리면 시스템 전체가 넘어갔습니다.'},
   {year:'1975',title:'최소 권한의 원칙',body:'솔처와 슈뢰더는 1975년 논문 「컴퓨터 시스템에서 정보 보호」에서 보안 설계 원칙을 정리했습니다. 대표적인 것이 모든 프로그램과 사용자는 일에 꼭 필요한 만큼의 권한만 가져야 한다는 최소 권한의 원칙입니다. 앱을 root가 아닌 전용 계정으로 돌리라는 지금의 권고가 여기서 나옵니다.'},
   {year:'1999',title:'root의 힘을 쪼개기',body:'리눅스 2.2는 root가 한 덩어리로 가지던 특권을 capabilities라는 단위로 나눴습니다. 예를 들어 1024번 아래 포트에 바인딩하는 권한(CAP_NET_BIND_SERVICE)만 따로 줄 수 있습니다. 웹 서버가 80번 포트를 쓰려고 root 전체 권한을 받을 필요가 없어졌습니다.'},
   {year:'2010~',title:'systemd와 서비스 관리',body:'예전에는 서비스를 띄우는 셸 스크립트를 배포판마다 따로 썼습니다. 2010년에 공개된 systemd는 서비스를 유닛 파일로 선언하게 합니다. 어떤 사용자로 실행할지(User=), 죽으면 다시 띄울지(Restart=), 종료할 때 어떤 신호를 보낼지를 한곳에 적습니다. 지금 대부분의 리눅스 배포판이 이 방식을 씁니다.'}
  ],
  decisions:[
   {question:'왜 권한을 rwx 9비트처럼 단순하게 만들었을까?',answer:'Multics의 ACL은 표현력이 좋았지만 구현과 관리가 무거웠습니다. 유닉스는 작은 기계에서 빠르게 검사하고 사람이 읽기 쉬운 쪽을 택했고 실제로 대부분의 경우 소유자, 그룹, 기타의 구분으로 충분했습니다.',cost:'특정 사용자 한 명에게만 쓰기를 허락하는 식의 세밀한 제어가 어렵습니다. 그래서 나중에 POSIX ACL이 따로 추가됐고 그룹을 잘 설계하는 일이 중요해졌습니다.'},
   {question:'디렉터리의 실행 권한(x)은 무슨 뜻일까?',answer:'유닉스에서 디렉터리는 이름과 파일 번호(inode)를 적은 목록입니다. r은 이 목록을 읽어 이름을 나열하는 권한이고, x는 디렉터리 안으로 들어가 이름으로 파일을 찾아가는 권한입니다. 그래서 x 없이 r만 있으면 이름은 보여도 파일은 열 수 없습니다.',cost:'파일 하나의 권한만 맞춰서는 부족하고 경로에 있는 모든 상위 디렉터리의 x 권한도 확인해야 합니다. 권한 오류가 헷갈리는 흔한 이유입니다.'},
   {question:'왜 종료할 때 SIGTERM을 먼저 보내고 기다릴까?',answer:'서버는 처리 중인 요청을 마치고 DB 연결을 닫고 버퍼를 디스크에 쓴 다음 끝나야 데이터가 깨지지 않습니다. SIGTERM은 그럴 기회를 주는 신호이고, 정해진 시간이 지나도 끝나지 않을 때만 SIGKILL로 강제 종료합니다.',cost:'앱이 SIGTERM을 처리하지 않으면 유예 시간 동안 기다리기만 하다가 결국 강제 종료됩니다. 배포할 때마다 요청이 끊기는 원인이 되기도 합니다.'}
  ],
  today:[
   '도커의 docker stop은 컨테이너의 주 프로세스에 SIGTERM을 보내고 리눅스 컨테이너 기준 10초 뒤 SIGKILL을 보냅니다. 쿠버네티스 파드의 기본 유예 시간은 30초입니다. Python 서버라면 signal 모듈로 SIGTERM을 받아 정리하는 코드를 둡니다.',
   '업로드 폴더에 쓸 수 없다고 chmod 777을 하면 그 서버의 모든 사용자와 프로세스가 쓰고 지울 수 있게 됩니다. 앱 전용 계정을 만들고 그 계정에 업로드 폴더만 쓰기 권한을 주는 것이 맞는 해결입니다.',
   'systemd 유닛에는 User=로 실행 계정을, Restart=on-failure로 재시작 정책을 적습니다. 낮은 포트가 필요하면 root 대신 AmbientCapabilities=CAP_NET_BIND_SERVICE를 씁니다.'
  ],
  sources:[
   ['Saltzer & Schroeder, The Protection of Information in Computer Systems (1975)','https://www.cs.virginia.edu/~evans/cs551/saltzer/'],
   ['Saltzer, Protection and the Control of Information Sharing in Multics (CACM, 1974)','https://dl.acm.org/doi/10.1145/361011.361067'],
   ['Ritchie & Thompson, The UNIX Time-Sharing System (CACM, 1974)','https://dl.acm.org/doi/10.1145/361011.361061'],
   ['US Patent 4,135,240 · Protection of data file contents (setuid)','https://patents.google.com/patent/US4135240A/en'],
   ['Linux man-pages · signal(7)','https://man7.org/linux/man-pages/man7/signal.7.html'],
   ['Linux man-pages · capabilities(7)','https://man7.org/linux/man-pages/man7/capabilities.7.html'],
   ['systemd · systemd.exec','https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html'],
   ['Docker · docker container stop','https://docs.docker.com/reference/cli/docker/container/stop/'],
   ['Kubernetes · Pod Lifecycle','https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/']
  ]
 },
 diagnosis:{
  intro:'"접속이 안 돼요"라는 말 뒤에는 서로 다른 시기에 서로 다른 문제를 풀려고 만든 층이 여럿 겹쳐 있습니다. 이름을 주소로 바꾸는 DNS, 주소까지 길을 찾는 IP, 프로그램끼리 이어 주는 TCP와 포트, 그 위의 HTTP가 그렇습니다. 각 층이 언제 왜 생겼는지 알면 어느 층에서 막혔는지 순서대로 짚을 수 있습니다.',
  timeline:[
   {year:'1974',title:'네트워크와 네트워크를 잇는 약속',body:'빈트 서프와 밥 칸은 1974년 논문에서 서로 다른 네트워크를 하나로 잇는 프로토콜을 제안했습니다. 패킷은 주소만 보고 네트워크를 건너가고 순서와 재전송은 양 끝의 컴퓨터가 책임진다는 생각입니다. 이 설계가 나중에 IP와 TCP로 나뉘었습니다. 중간 장비는 단순하게, 똑똑한 일은 끝에서 하는 구조라서 문제가 생겨도 중간에서는 잘 보이지 않습니다.'},
   {year:'1981~1983',title:'IP와 TCP, 그리고 전환의 날',body:'1981년 RFC 791과 RFC 793이 IP와 TCP를 정의했습니다. ARPANET은 1983년 1월 1일을 기해 모든 컴퓨터를 TCP/IP로 옮겼습니다. 주소(IP)로 컴퓨터를 찾고 포트로 그 안의 프로그램을 찾는다는, 지금까지 쓰는 구조가 이때 자리 잡았습니다.'},
   {year:'1983',title:'호스트 파일에서 DNS로',body:'초기에는 이름과 주소의 대응을 HOSTS.TXT라는 파일 하나에 모아 두고 모든 컴퓨터가 주기적으로 내려받았습니다. 컴퓨터가 늘자 이 파일을 한 곳에서 관리하기가 불가능해졌습니다. 폴 모카페트리스가 1983년 RFC 882, 883으로 DNS를 제안했고 1987년 RFC 1034와 1035로 정리됐습니다. 이름 관리를 영역별로 위임하고 결과를 캐시하는 분산 구조입니다.'},
   {year:'1983',title:'버클리 소켓',body:'같은 해 4.2BSD 유닉스가 소켓 API를 내놓았습니다. 프로그램은 소켓을 만들고 주소와 포트에 bind한 뒤 listen하고 accept로 연결을 받습니다. 거의 모든 운영체제와 언어의 네트워크 API가 이 모양을 따릅니다. Python의 socket 모듈도 마찬가지입니다. 그래서 127.0.0.1에 bind하느냐 0.0.0.0에 bind하느냐 같은 차이가 언어와 상관없이 똑같이 나타납니다.'},
   {year:'1983~1987',title:'진단 도구의 탄생',body:'마이크 머스는 1983년 12월 네트워크의 이상한 동작을 살피려고 ping을 만들었습니다. 1987년에는 반 제이콥슨이 패킷이 지나가는 경로를 한 단계씩 보여 주는 traceroute를 만들었습니다. 둘 다 지금도 쓰는 도구이고 한 층씩 나눠 확인한다는 진단 방식의 출발점입니다.'},
   {year:'1989',title:'localhost와 안전한 기본값',body:'RFC 1122는 127.0.0.0/8을 자기 자신에게 돌아오는 루프백 주소로 못 박았습니다. 127.0.0.1에만 bind한 서버는 같은 컴퓨터 안에서만 접속할 수 있습니다. 요즘 개발 서버 대부분이 기본으로 localhost에만 열리는 것도 실수로 외부에 노출되지 않게 하려는 안전한 기본값입니다.'}
  ],
  decisions:[
   {question:'왜 이름과 주소를 따로 둘까?',answer:'서버의 주소는 이사하거나 늘어나면서 바뀌지만 사람은 이름을 기억합니다. 이름과 주소 사이에 DNS를 두면 주소가 바뀌어도 이름은 그대로 쓸 수 있습니다. 관리를 영역별로 위임하니 한 곳이 모든 이름을 책임질 필요도 없습니다.',cost:'응답을 캐시하기 때문에 주소를 바꿔도 TTL이 지날 때까지 옛 주소로 가는 사용자가 있습니다. DNS가 실패하면 서버가 멀쩡해도 전체 장애처럼 보입니다.'},
   {question:'왜 IP 말고 포트가 따로 있을까?',answer:'컴퓨터 한 대에서 웹 서버, DB, SSH 같은 프로그램 여러 개가 동시에 통신합니다. IP는 컴퓨터를, 포트는 그 안의 프로그램을 가리키고, 연결은 양쪽의 IP, 포트, 프로토콜 조합으로 구별합니다.',cost:'같은 포트를 두 프로그램이 쓰면 충돌하고 방화벽과 보안 그룹은 포트마다 따로 열어야 합니다. 서버는 떠 있는데 포트가 막혀 접속이 안 되는 일이 흔합니다.'},
   {question:'왜 통신을 층으로 나눴을까?',answer:'층마다 할 일을 나누면 한 층을 바꿔도 다른 층은 그대로 둘 수 있습니다. 유선이 무선으로 바뀌어도 TCP와 HTTP는 그대로이고, HTTP/1.1이 HTTP/2로 바뀌어도 IP는 그대로입니다.',cost:'아래층의 문제가 위층의 오류처럼 보입니다. TCP 연결이 안 되는 것을 "서버 에러"라고 부르면 정상인 앱 코드부터 고치게 됩니다. 그래서 진단도 아래층부터 순서대로 합니다.'}
  ],
  today:[
   '진단 순서는 대개 이름 해석(nslookup이나 dig), TCP 연결(Windows의 Test-NetConnection, 리눅스의 nc), HTTP 응답(curl -v) 순입니다. 서버 쪽에서는 ss -ltnp로 어떤 주소와 포트에서 listen하고 있는지 확인합니다.',
   '이 사이트의 README에 있는 휴대폰 접속 안내도 같은 원리입니다. 개발 서버를 0.0.0.0에 bind해야 같은 Wi-Fi의 휴대폰이 PC의 LAN 주소로 들어올 수 있습니다.',
   'TCP 연결은 성공했는데 HTTP가 502나 504를 준다면 문제는 그 위층, 프록시와 앱 사이에 있습니다. 어느 층까지 통과했는지를 먼저 말하면 원인을 훨씬 빨리 좁힐 수 있습니다.'
  ],
  sources:[
   ['Cerf & Kahn, A Protocol for Packet Network Intercommunication (1974)','https://doi.org/10.1109/TCOM.1974.1092259'],
   ['RFC 791 · Internet Protocol','https://www.rfc-editor.org/rfc/rfc791'],
   ['RFC 793 · Transmission Control Protocol','https://www.rfc-editor.org/rfc/rfc793'],
   ['RFC 882 · Domain Names: Concepts and Facilities (1983)','https://www.rfc-editor.org/rfc/rfc882'],
   ['RFC 1034 · Domain Names: Concepts and Facilities (1987)','https://www.rfc-editor.org/rfc/rfc1034'],
   ['RFC 1122 · Requirements for Internet Hosts','https://www.rfc-editor.org/rfc/rfc1122'],
   ['Mike Muuss, The Story of the PING Program','https://ftp.arl.army.mil/~mike/ping.html'],
   ['Linux man-pages · socket(7)','https://man7.org/linux/man-pages/man7/socket.7.html'],
   ['Wikipedia · Flag day (computing)','https://en.wikipedia.org/wiki/Flag_day_(computing)']
  ]
 },
 deadlock:{
  intro:'교착 상태는 여러 작업이 자원을 나눠 쓰기 시작한 순간부터 생긴 문제입니다. 1960년대 운영체제 연구자들이 먼저 이 현상에 이름을 붙이고 조건을 정리했고 1970년대 데이터베이스가 같은 문제를 트랜잭션에서 다시 만났습니다. 두 분야가 내린 결론은 달랐습니다. 그 차이를 알면 왜 DB가 교착 상태를 막지 않고 한쪽을 중단시키는지, 왜 앱이 재시도를 준비해야 하는지 이해됩니다.',
  timeline:[
   {year:'1965',title:'죽음의 포옹',body:'다익스트라는 1965년 무렵 쓴 글에서 서로가 가진 자원을 기다리며 영원히 멈추는 상황을 죽음의 포옹(deadly embrace)이라 불렀습니다. 그리고 각 작업이 필요한 자원의 최대량을 미리 알 때 위험한 배정을 피하는 은행가 알고리즘을 제안했습니다. 다섯 철학자가 포크를 나눠 쓰는 식사하는 철학자 문제도 그가 학생들에게 낸 문제에서 나왔습니다.'},
   {year:'1971',title:'네 가지 조건',body:'코프먼, 엘픽, 쇼샤니는 1971년 논문 「시스템 교착 상태」에서 교착 상태가 생기려면 상호 배제, 점유 대기, 비선점, 순환 대기가 모두 성립해야 한다고 정리했습니다. 네 가지가 동시에 필요하므로 하나만 깨면 교착 상태를 막을 수 있습니다. 해결책을 예방, 회피, 감지 후 복구로 나눈 것도 이 논문입니다.'},
   {year:'1976',title:'데이터베이스의 2단계 잠금',body:'IBM System R 연구진(에스와란, 그레이 등)은 1976년 논문에서 트랜잭션이 잠금을 모두 얻은 뒤에야 풀기 시작하는 2단계 잠금(2PL)이 직렬화 가능한 결과를 보장한다고 보였습니다. 정확한 결과를 얻는 대신 잠금을 오래 쥐게 되었고 서로 다른 순서로 잠그는 트랜잭션 사이에서 교착 상태가 자연스럽게 생기게 됐습니다.'},
   {year:'1981',title:'잠그지 않는 방법',body:'쿵과 로빈슨은 1981년 논문에서 낙관적 동시성 제어를 제안했습니다. 충돌이 드물다면 미리 잠그지 말고 일단 진행한 다음, 커밋할 때 다른 트랜잭션과 겹쳤는지 확인해 겹쳤으면 다시 하자는 생각입니다. 오늘날 버전 컬럼을 두고 UPDATE ... WHERE version = ? 로 확인하는 방식이 이 계열입니다.'},
   {year:'현재',title:'감지하고 한쪽을 중단',body:'PostgreSQL은 잠금을 기다린 지 deadlock_timeout(기본 1초)이 지나면 대기 관계에 원이 생겼는지 검사하고 원이 있으면 트랜잭션 하나를 deadlock detected 오류(SQLSTATE 40P01)로 중단시킵니다. 다른 주요 DB도 감지 후 한쪽을 롤백하는 방식을 씁니다. 은행가 알고리즘 같은 회피 방식은 실제 DB에서는 거의 쓰지 않습니다.'}
  ],
  decisions:[
   {question:'DB는 왜 교착 상태를 미리 막지 않고 생긴 뒤에 처리할까?',answer:'회피 방식은 트랜잭션이 앞으로 어떤 행을 잠글지 미리 알아야 하는데, SQL은 실행해 보기 전에는 어떤 행을 건드릴지 알 수 없습니다. 교착 상태는 드물게 생기니 대기 관계를 가끔 검사해서 원이 보일 때만 하나를 중단하는 편이 훨씬 쌉니다.',cost:'중단된 트랜잭션의 작업은 전부 롤백되고 다시 실행하는 책임은 애플리케이션에 있습니다. 재시도 코드가 없으면 사용자에게 그대로 오류가 보입니다.'},
   {question:'왜 잠금 순서를 통일하라고 할까?',answer:'네 조건 중 앱 코드로 가장 쉽게 깰 수 있는 것이 순환 대기입니다. 모든 코드가 계좌 ID가 작은 쪽부터 잠그면 A는 1을 쥐고 2를, B는 2를 쥐고 1을 기다리는 원이 생길 수 없습니다.',cost:'모든 경로가 규칙을 지켜야 합니다. 한 곳에서라도 송금 방향대로 잠그면 다시 교착 상태가 생깁니다. 그래서 잠금 순서를 함수 하나에 모아 두는 편이 안전합니다.'},
   {question:'왜 트랜잭션을 짧게 하라고 할까?',answer:'잠금을 쥔 시간이 길수록 다른 트랜잭션과 겹칠 확률이 커집니다. 잠금을 잡은 채 외부 API를 호출하거나 사용자 입력을 기다리면 그 시간 내내 다른 작업이 줄을 섭니다.',cost:'긴 업무를 여러 짧은 트랜잭션으로 나누면 중간 상태가 생깁니다. 중간에 실패했을 때 되돌리는 보상 처리나 상태값을 따로 설계해야 합니다.'}
  ],
  today:[
   '송금처럼 두 행을 바꾸는 트랜잭션은 SELECT ... FOR UPDATE를 할 때 ORDER BY id로 항상 같은 순서로 잠급니다.',
   'Python에서는 psycopg가 SQLSTATE 40P01을 errors.DeadlockDetected로 올려 줍니다. 이 오류를 받으면 트랜잭션 전체를 처음부터 몇 번만 다시 실행하고 그사이 이메일 발송 같은 외부 부수 효과가 두 번 일어나지 않게 합니다.',
   '충돌이 드문 수정 화면은 낙관적 잠금(버전 비교)이, 충돌이 잦은 재고 차감은 비관적 잠금이 잘 맞습니다. 어느 쪽이든 실제 충돌 빈도를 보고 고릅니다.'
  ],
  sources:[
   ['Dijkstra, Een algorithme ter voorkoming van de dodelijke omarming (EWD108)','https://www.cs.utexas.edu/users/EWD/transcriptions/EWD01xx/EWD108.html'],
   ['Coffman, Elphick & Shoshani, System Deadlocks (ACM Computing Surveys, 1971)','https://dl.acm.org/doi/10.1145/356586.356588'],
   ['Eswaran et al., The Notions of Consistency and Predicate Locks (CACM, 1976)','https://dl.acm.org/doi/10.1145/360363.360369'],
   ['Kung & Robinson, On Optimistic Methods for Concurrency Control (TODS, 1981)','https://dl.acm.org/doi/10.1145/319566.319567'],
   ['PostgreSQL · Explicit Locking','https://www.postgresql.org/docs/current/explicit-locking.html'],
   ['PostgreSQL · Error Codes','https://www.postgresql.org/docs/current/errcodes-appendix.html']
  ]
 },
 dns:{
  intro:'DNS는 이름을 주소로 바꾸는 단순한 일을 하지만 그 구조는 세계 전체에서 쓸 수 있게 하려는 고민의 결과입니다. 한 곳에서 모든 이름을 관리하던 방식이 무너지면서 위임과 캐시라는 두 기둥이 생겼습니다. 그 뒤로는 보안 문제가 하나씩 드러날 때마다 덧대는 역사였습니다. TTL과 캐시 때문에 DNS 변경이 바로 반영되지 않는 이유도 이 설계에서 나옵니다.',
  timeline:[
   {year:'1970년대',title:'파일 하나에 담긴 인터넷',body:'ARPANET 시절에는 SRI의 네트워크 정보 센터(NIC)가 모든 호스트 이름과 주소를 HOSTS.TXT 파일 하나로 관리했습니다. 새 컴퓨터를 등록하려면 NIC에 연락해야 했고 다른 컴퓨터들은 이 파일을 주기적으로 내려받았습니다. 지금도 운영체제에 남아 있는 hosts 파일이 이 방식의 흔적입니다.'},
   {year:'1983~1987',title:'위임과 캐시',body:'폴 모카페트리스의 DNS는 이름을 점으로 나눈 나무 구조로 보고 각 가지의 관리를 그 주인에게 맡깁니다. 루트는 .com이 어디 있는지만, .com은 example.com이 어디 있는지만 알면 됩니다. 한 번 얻은 답은 TTL 동안 캐시해 같은 질문이 루트까지 가지 않게 했습니다. 1987년 RFC 1034와 1035가 지금까지 쓰는 기본 규칙입니다.'},
   {year:'1984~1985',title:'BIND와 첫 .com',body:'1980년대 초 UC 버클리에서 만든 BIND가 사실상 표준 DNS 서버가 되었습니다. 1985년 3월 15일에는 symbolics.com이 첫 .com 도메인으로 등록됐습니다. 도메인이 회사 이름처럼 쓰이기 시작한 출발점입니다.'},
   {year:'2008~2010',title:'캐시 오염과 DNSSEC',body:'2008년 댄 카민스키는 리졸버의 캐시에 가짜 답을 빠르게 심을 수 있는 취약점을 공개했습니다. 대부분의 DNS 서버가 질의 포트를 무작위로 바꾸도록 서둘러 고쳤습니다. 응답에 전자 서명을 붙여 위조를 막는 DNSSEC은 오래전부터 설계돼 있었고 2010년 7월 15일 루트 영역의 신뢰 앵커가 처음 공개되면서 실제 인터넷에서 쓸 수 있게 됐습니다.'},
   {year:'2016~2018',title:'질문을 숨기기',body:'DNS 질문은 원래 암호화되지 않아서 같은 네트워크의 누구나 내가 어떤 사이트를 찾는지 볼 수 있었습니다. 2016년 DNS over TLS(RFC 7858), 2018년 DNS over HTTPS(RFC 8484)가 표준이 되었습니다. 요즘 브라우저와 운영체제의 보안 DNS 설정이 이것입니다.'},
   {year:'현재',title:'13개의 루트, 수천 개의 서버',body:'루트 서버는 A부터 M까지 13개 이름으로 운영되지만 실제로는 애니캐스트라는 방식으로 전 세계 2천 곳이 넘는 곳에 복제본이 있습니다. 같은 주소로 질문해도 가장 가까운 복제본이 답합니다. 한 곳이 공격받아도 루트 전체가 멈추지 않는 이유입니다.'}
  ],
  decisions:[
   {question:'왜 이름 관리를 나무 구조로 위임했을까?',answer:'모든 이름을 한 곳에서 관리하면 등록이 그곳을 거쳐야 하고 그곳이 멈추면 인터넷 전체가 멈춥니다. 영역마다 주인에게 맡기면 관리 부담과 장애 범위가 나뉘고 새 도메인을 만들 때 루트를 건드릴 필요가 없습니다.',cost:'답을 얻으려면 루트, TLD, 권한 서버를 차례로 물어야 해서 캐시가 없으면 느립니다. 중간의 어느 서버 설정이 틀려도 이름 전체가 풀리지 않습니다.'},
   {question:'왜 답을 캐시하고 TTL을 둘까?',answer:'이름과 주소의 대응은 자주 바뀌지 않으니 한 번 얻은 답을 재사용하면 루트와 권한 서버의 부하가 크게 줄고 응답도 빨라집니다. TTL은 그 답을 얼마 동안 믿어도 되는지를 이름의 주인이 정하게 한 것입니다.',cost:'주소를 바꿔도 이전 답을 캐시한 리졸버는 TTL이 끝날 때까지 옛 주소로 보냅니다. 서버를 옮기기 전에 TTL을 미리 줄여 두는 이유입니다.'},
   {question:'왜 기본으로 UDP를 쓸까?',answer:'DNS 질문과 답은 대부분 아주 작습니다. 연결을 맺고 끊는 TCP보다 패킷 하나를 보내고 하나를 받는 UDP가 훨씬 빠르고 서버 부담도 적습니다. RFC 1035는 UDP 메시지를 512바이트 이하로 정했습니다.',cost:'답이 커지면 UDP에 다 담기지 않아 TCP로 다시 묻거나 EDNS 확장으로 크기를 늘려야 합니다. 연결이 없으니 위조된 답을 걸러 내기도 어려워 캐시 오염 공격의 바탕이 됐습니다.'}
  ],
  today:[
   'dig +trace example.com을 실행하면 리졸버가 루트에서 권한 서버까지 따라가는 과정을 직접 볼 수 있습니다. 캐시된 답과 권한 서버의 답이 다르면 아직 TTL이 남은 것입니다.',
   '서버 이전 하루 전쯤 A 레코드의 TTL을 300초 정도로 낮춰 두면 바꾼 뒤 옛 주소로 가는 시간이 짧아집니다. 이전이 끝나면 TTL을 다시 올립니다.',
   'RFC 1034 규칙상 도메인의 맨 위(example.com 자체)에는 CNAME을 둘 수 없습니다. AWS Route 53의 별칭(Alias) 레코드처럼 DNS 서비스가 따로 제공하는 기능이 이 제약을 우회하는 방법입니다.'
  ],
  sources:[
   ['RFC 1034 · Domain Names: Concepts and Facilities','https://www.rfc-editor.org/rfc/rfc1034'],
   ['RFC 1035 · Domain Names: Implementation and Specification','https://www.rfc-editor.org/rfc/rfc1035'],
   ['RFC 7858 · DNS over TLS','https://www.rfc-editor.org/rfc/rfc7858'],
   ['RFC 8484 · DNS Queries over HTTPS','https://www.rfc-editor.org/rfc/rfc8484'],
   ['Root Server Technical Operations','https://root-servers.org/'],
   ['IANA · Root DNSSEC','https://www.iana.org/dnssec'],
   ['Wikipedia · BIND','https://en.wikipedia.org/wiki/BIND'],
   ['Wikipedia · Dan Kaminsky','https://en.wikipedia.org/wiki/Dan_Kaminsky'],
   ['Wikipedia · Symbolics','https://en.wikipedia.org/wiki/Symbolics']
  ]
 },
 tcp:{
  intro:'TCP와 UDP가 따로 있는 이유는 초기 인터넷 설계자들이 하나의 프로토콜로 모든 요구를 맞출 수 없다는 것을 깨달았기 때문입니다. 신뢰성이 필요한 파일 전송과 늦게 오느니 버리는 편이 나은 음성 통화는 원하는 것이 달랐습니다. 그 뒤 인터넷이 붕괴 직전까지 간 사건이 혼잡 제어를 낳았고 최근에는 TCP 자체를 바꾸기 어렵다는 현실이 QUIC을 낳았습니다.',
  timeline:[
   {year:'1974',title:'하나였던 TCP',body:'서프와 칸의 1974년 설계에서 TCP는 주소 지정, 경로 선택, 순서 보장, 재전송을 모두 맡는 하나의 프로토콜이었습니다. 모든 데이터가 빠짐없이 순서대로 도착하는 것을 기본으로 삼았습니다.'},
   {year:'1977~1978',title:'TCP와 IP로 나누기',body:'존 포스텔은 1977년 메모(IEN 2)에서 TCP가 두 가지 일을 한꺼번에 하는 바람에 계층 원칙을 어기고 있다고 지적했습니다. 음성처럼 재전송보다 빠른 도착이 중요한 데이터에는 순서 보장이 오히려 방해였습니다. 그래서 패킷을 목적지까지 나르는 IP와 신뢰성을 책임지는 TCP가 분리됐습니다.'},
   {year:'1980',title:'UDP, 세 쪽짜리 규격',body:'1980년 RFC 768로 정의된 UDP는 IP 위에 포트 번호와 체크섬만 얹은 아주 얇은 프로토콜입니다. 규격 문서가 세 쪽 남짓입니다. 연결도 재전송도 없고 필요한 신뢰성은 그 위의 애플리케이션이 알아서 구현하라는 선택입니다.'},
   {year:'1981',title:'3-way handshake',body:'RFC 793은 SYN, SYN/ACK, ACK 세 번의 메시지로 연결을 여는 방식을 정했습니다. 양쪽이 서로의 시작 순서 번호를 확인하고 네트워크를 떠돌던 옛 연결의 패킷을 새 연결로 착각하지 않게 하려는 장치입니다. 2022년 RFC 9293이 이 규격을 40년 만에 하나로 정리했습니다.'},
   {year:'1986~1988',title:'혼잡 붕괴와 혼잡 제어',body:'1986년 10월 LBL 연구소와 UC 버클리 사이의 처리량이 초당 32킬로비트에서 40비트로 떨어지는 일이 벌어졌습니다. 패킷이 버려지면 모두가 더 열심히 재전송했고 그 재전송이 다시 네트워크를 막았습니다. 반 제이콥슨은 1988년 논문에서 천천히 시작해 늘려 가고 손실이 보이면 크게 줄이는 혼잡 제어를 제안했습니다. 지금도 모든 TCP 구현의 바탕입니다.'},
   {year:'2012~2022',title:'UDP 위의 QUIC',body:'구글은 TCP를 고치는 대신 UDP 위에 새 전송 프로토콜 QUIC을 만들었습니다. TCP는 운영체제 커널과 수많은 중간 장비에 박혀 있어서 바꾸려면 수십 년이 걸리기 때문입니다. QUIC은 2021년 RFC 9000으로 표준이 되었고 2022년 HTTP/3(RFC 9114)이 그 위에 올라갔습니다.'}
  ],
  decisions:[
   {question:'왜 TCP와 UDP를 따로 두었을까?',answer:'파일이나 결제 요청은 하나라도 빠지면 안 되지만, 음성이나 게임 위치 정보는 늦게 온 데이터가 쓸모없습니다. 모든 데이터에 재전송과 순서를 강제하면 실시간 서비스는 오히려 나빠집니다. 그래서 신뢰성을 원하는 쪽은 TCP를, 스스로 관리하려는 쪽은 UDP를 쓰게 했습니다.',cost:'UDP를 쓰는 서비스는 손실, 순서, 혼잡 제어를 직접 구현해야 합니다. 잘못 만들면 네트워크를 혼자 차지하거나 데이터가 조용히 사라집니다.'},
   {question:'왜 연결을 열 때 세 번이나 주고받을까?',answer:'두 번만 주고받으면 서버는 자기 시작 번호를 클라이언트가 받았는지 알 수 없습니다. 세 번째 ACK가 와야 양쪽 모두 상대의 번호를 확인했다고 믿을 수 있고 늦게 도착한 옛 SYN에 속아 연결을 여는 일도 막을 수 있습니다.',cost:'데이터를 보내기 전에 왕복 한 번이 필요하고 TLS까지 더하면 더 늘어납니다. 먼 거리일수록 첫 응답이 느린 이유이며 QUIC이 연결과 암호화 협상을 한 번에 하는 이유이기도 합니다.'},
   {question:'왜 연결을 끊은 뒤에도 TIME_WAIT로 기다릴까?',answer:'마지막 ACK가 사라졌을 때 상대가 다시 보내는 종료 신호에 답할 수 있어야 합니다. 또 같은 주소와 포트로 바로 새 연결을 열면 이전 연결의 늦은 패킷이 섞일 수 있습니다. 그래서 먼저 끊은 쪽이 패킷 최대 수명의 두 배쯤 기다립니다.',cost:'짧은 연결을 아주 많이 여닫는 서버나 클라이언트에는 TIME_WAIT 소켓이 쌓여 포트가 모자랄 수 있습니다. 연결을 재사용하는 keep-alive와 커넥션 풀이 필요한 이유입니다.'}
  ],
  today:[
   'Python의 socket.SOCK_STREAM은 TCP, SOCK_DGRAM은 UDP입니다. TCP는 경계가 없는 바이트 흐름이라 recv 한 번에 메시지 하나가 온다는 보장이 없습니다. 길이 헤더나 구분자로 메시지를 나눠야 합니다.',
   'DNS 질의, 화상 통화(WebRTC), 온라인 게임은 주로 UDP를 쓰고 웹, DB, 결제 API는 TCP를 씁니다. 브라우저가 HTTP/3를 쓰면 같은 웹 요청도 UDP 위의 QUIC으로 갑니다.',
   'DB나 외부 API를 부를 때마다 새 연결을 열면 핸드셰이크 비용과 TIME_WAIT가 쌓입니다. requests.Session이나 DB 커넥션 풀로 연결을 재사용합니다.'
  ],
  sources:[
   ['Postel, IEN 2 · Comments on Internet Protocol and TCP (1977)','https://www.rfc-editor.org/ien/ien2.txt'],
   ['RFC 768 · User Datagram Protocol','https://www.rfc-editor.org/rfc/rfc768'],
   ['RFC 793 · Transmission Control Protocol (1981)','https://www.rfc-editor.org/rfc/rfc793'],
   ['RFC 9293 · Transmission Control Protocol (2022)','https://www.rfc-editor.org/rfc/rfc9293'],
   ['Jacobson, Congestion Avoidance and Control (SIGCOMM, 1988)','https://ee.lbl.gov/papers/congavoid.pdf'],
   ['RFC 9000 · QUIC','https://www.rfc-editor.org/rfc/rfc9000'],
   ['RFC 9114 · HTTP/3','https://www.rfc-editor.org/rfc/rfc9114']
  ]
 },
 http:{
  intro:'HTTP는 원래 연구소 안에서 문서를 서로 연결해 보려던 작은 실험이었습니다. 그 단순함 덕분에 빠르게 퍼졌고 퍼진 뒤에 생긴 요구가 하나씩 덧붙었습니다. 쿠키는 기억을, Host 헤더는 한 서버에 여러 사이트를, TLS는 안전을 더했습니다. 무상태성이나 인증서처럼 지금 헷갈리는 개념은 대부분 이 덧붙임의 순서로 보면 이해됩니다.',
  timeline:[
   {year:'1989~1991',title:'CERN의 제안과 HTTP/0.9',body:'팀 버너스리는 1989년 CERN에서 흩어진 연구 문서를 링크로 잇자는 제안서를 냈습니다. 1991년 무렵의 첫 HTTP는 지금 HTTP/0.9라고 부르는데, GET 한 줄을 보내면 HTML이 돌아오고 연결이 끊기는 것이 전부였습니다. 헤더도 상태 코드도 없었습니다.'},
   {year:'1994',title:'쿠키, 기억을 덧대다',body:'넷스케이프의 루 몬툴리는 1994년 쇼핑 장바구니를 만들다 쿠키를 고안했습니다. 서버가 작은 값을 브라우저에 맡기고 브라우저가 다음 요청마다 돌려주는 방식입니다. HTTP 자체는 바꾸지 않고 상태를 흉내 낸 것으로, 나중에 RFC 6265(2011)로 정리됐습니다.'},
   {year:'1995~1999',title:'SSL과 TLS',body:'같은 시기 넷스케이프는 웹에서 신용카드를 보내기 위해 SSL을 만들었습니다. 1999년 IETF가 이를 다듬어 TLS 1.0(RFC 2246)으로 표준화했습니다. HTTPS는 새 프로토콜이 아니라 HTTP를 TLS 연결 안에서 그대로 주고받는 것입니다.'},
   {year:'1996~1999',title:'HTTP/1.0과 1.1',body:'1996년 RFC 1945(HTTP/1.0)가 헤더와 상태 코드, POST를 정리했고 1997년과 1999년의 HTTP/1.1이 연결 재사용(keep-alive)과 Host 헤더를 기본으로 만들었습니다. Host 헤더 덕분에 IP 하나에 사이트 수백 개를 올릴 수 있게 됐습니다. 이 무렵 로이 필딩이 웹의 설계 원칙을 정리한 것이 REST입니다.'},
   {year:'2015~2018',title:'모든 곳에 HTTPS',body:'2015년 Let\'s Encrypt가 무료 인증서를 자동으로 발급하기 시작하면서 HTTPS의 비용 장벽이 사라졌습니다. 2018년 7월 Chrome 68은 모든 HTTP 사이트에 안전하지 않음 표시를 붙였습니다. 같은 해 TLS 1.3(RFC 8446)이 핸드셰이크를 줄이고 오래된 암호 방식을 걷어 냈습니다.'},
   {year:'2015~2022',title:'HTTP/2와 HTTP/3',body:'구글의 SPDY 실험을 바탕으로 2015년 HTTP/2(RFC 7540)가 나왔습니다. 텍스트 대신 이진 프레임을 쓰고 연결 하나에서 여러 요청을 동시에 주고받습니다. 2022년에는 QUIC 위의 HTTP/3(RFC 9114)와 버전과 상관없는 HTTP 의미를 정리한 RFC 9110이 나왔습니다. 메서드, 상태 코드, 헤더의 뜻은 그대로이고 나르는 방식만 바뀐 것입니다.'}
  ],
  decisions:[
   {question:'왜 HTTP는 이전 요청을 기억하지 않게 만들었을까?',answer:'서버가 요청마다 독립적으로 답할 수 있으면 어느 서버가 받아도 같은 답을 줄 수 있습니다. 서버를 늘리기 쉽고 중간의 캐시가 응답을 재사용하기도 쉽습니다. 처음 HTTP는 문서를 가져오기만 하면 됐으니 기억할 것도 없었습니다.',cost:'로그인이나 장바구니처럼 기억이 필요한 기능은 쿠키, 세션, 토큰으로 따로 구현해야 합니다. 세션을 서버 메모리에 두면 서버를 늘릴 때 다시 문제가 됩니다.'},
   {question:'왜 처음에는 사람이 읽을 수 있는 텍스트였을까?',answer:'텔넷으로 서버에 접속해 GET 한 줄을 직접 쳐 볼 수 있을 만큼 단순해야 누구나 서버와 브라우저를 만들 수 있었습니다. 이 단순함이 웹이 빠르게 퍼진 이유입니다.',cost:'헤더를 매번 글자로 보내니 낭비가 컸고 HTTP/1.1에서는 연결 하나에서 앞 응답이 끝나야 다음 응답이 나왔습니다. HTTP/2가 이진 프레임과 헤더 압축을 도입한 이유입니다.'},
   {question:'암호화만 하면 되지 왜 인증서가 필요할까?',answer:'암호화는 중간에서 엿보지 못하게 할 뿐 지금 대화하는 상대가 진짜 그 사이트인지는 알려 주지 않습니다. 공격자가 중간에서 가짜 서버 행세를 하면 암호화된 채로 공격자와 대화하게 됩니다. 인증서는 믿을 만한 인증 기관이 이 공개키의 주인이 이 도메인이라고 서명한 증명입니다.',cost:'브라우저에 들어 있는 수많은 인증 기관 중 하나만 잘못 발급해도 전체가 위험해집니다. 그래서 발급 내역을 공개 로그(Certificate Transparency)에 남기게 하고 유효 기간도 점점 짧게 만들고 있습니다.'}
  ],
  today:[
   'HTTPS가 보장하는 것은 전송 구간의 비밀성, 무결성, 서버 신원 확인입니다. 로그인한 사용자가 남의 주문을 볼 수 있는지 같은 권한 검사, XSS나 SQL 삽입 방어는 HTTPS와 상관없이 서버가 따로 해야 합니다.',
   'Let\'s Encrypt 인증서는 유효 기간이 짧아서 certbot 같은 도구로 자동 갱신을 걸어 둡니다. 클라우드에서는 로드 밸런서가 인증서를 맡고 안쪽 서버와는 내부망으로 통신하는 구성이 흔합니다.',
   'Python의 requests는 기본으로 인증서를 검증합니다. 오류가 난다고 verify=False로 끄면 인증서의 존재 이유가 사라지므로 원인(만료, 중간 인증서 누락, 호스트명 불일치)을 찾아 고칩니다.'
  ],
  sources:[
   ['Berners-Lee, Information Management: A Proposal (1989)','https://www.w3.org/History/1989/proposal.html'],
   ['W3C · The Original HTTP as defined in 1991','https://www.w3.org/Protocols/HTTP/AsImplemented.html'],
   ['RFC 1945 · HTTP/1.0','https://www.rfc-editor.org/rfc/rfc1945'],
   ['RFC 2616 · HTTP/1.1 (1999)','https://www.rfc-editor.org/rfc/rfc2616'],
   ['RFC 2246 · TLS 1.0','https://www.rfc-editor.org/rfc/rfc2246'],
   ['RFC 6265 · HTTP State Management Mechanism','https://www.rfc-editor.org/rfc/rfc6265'],
   ['RFC 7540 · HTTP/2','https://www.rfc-editor.org/rfc/rfc7540'],
   ['RFC 8446 · TLS 1.3','https://www.rfc-editor.org/rfc/rfc8446'],
   ['RFC 9110 · HTTP Semantics','https://www.rfc-editor.org/rfc/rfc9110'],
   ['Let\'s Encrypt · Our First Certificate Is Now Live','https://letsencrypt.org/2015/09/14/our-first-cert/'],
   ['Chromium Blog · A secure web is here to stay','https://blog.chromium.org/2018/02/a-secure-web-is-here-to-stay.html']
  ]
 },
 nat:{
  intro:'NAT는 처음부터 좋은 설계로 계획된 기술이 아닙니다. IPv4 주소가 곧 바닥난다는 위기 앞에서 IPv6가 준비될 때까지 버티려고 만든 임시방편이었습니다. 그런데 그 임시방편이 너무 잘 작동해서 30년 넘게 인터넷의 기본 구조가 되었습니다. 외부에서 내 PC로 바로 접속이 안 되는 이유, 서버가 사용자의 진짜 IP를 모르는 이유가 모두 여기서 나옵니다.',
  timeline:[
   {year:'1981',title:'43억 개면 충분할 줄 알았다',body:'1981년 RFC 791은 IP 주소를 32비트로 정했습니다. 약 43억 개입니다. 연구용 네트워크 수백 곳을 잇던 시절에는 넉넉해 보였고 초기에는 큰 기관에 1,600만 개짜리 덩어리를 통째로 나눠 주기도 했습니다.'},
   {year:'1993~1994',title:'고갈 경고와 응급 처치',body:'1990년대 초 인터넷이 상업화되면서 주소가 몇 년 안에 바닥난다는 예측이 나왔습니다. 1993년 CIDR(RFC 1519)은 주소를 필요한 크기만큼 잘라 나눠 주게 해 낭비를 줄였습니다. 1994년 RFC 1631은 내부 주소를 바깥 주소로 바꿔 주는 NAT를 단기 해결책으로 제안했습니다.'},
   {year:'1996',title:'사설 주소 대역',body:'1996년 RFC 1918은 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16을 인터넷에 내보내지 않는 사설 대역으로 정했습니다. 집집마다 192.168.0.x를 똑같이 써도 충돌하지 않는 이유입니다. 이 주소들은 공유기의 NAT를 지나야만 바깥과 통신할 수 있습니다.'},
   {year:'1998',title:'IPv6라는 본 해결책',body:'근본 해결책인 IPv6는 1998년 RFC 2460으로 나왔습니다(지금 규격은 2017년 RFC 8200). 주소가 128비트라서 사실상 고갈될 걱정이 없습니다. 하지만 모든 장비와 소프트웨어가 바뀌어야 했고 NAT로도 그럭저럭 돌아가는 상황에서 전환은 아주 느리게 진행됐습니다.'},
   {year:'2003~',title:'NAT를 뚫는 기술',body:'NAT 뒤의 기기는 바깥에서 먼저 연결을 걸 수 없어서 화상 통화나 P2P처럼 두 기기가 직접 통신하는 서비스가 어려워졌습니다. 공개 서버에 물어 내 바깥 주소를 알아내는 STUN(RFC 3489, 이후 RFC 5389)과 중계 서버를 거치는 TURN 같은 기술이 이 문제를 우회합니다. WebRTC 화상 통화가 내부적으로 쓰는 방법입니다.'},
   {year:'2011',title:'마지막 블록',body:'2011년 2월 3일 IANA는 남은 IPv4 주소 블록을 다섯 지역 인터넷 등록 기관에 모두 나눠 주었습니다. 중앙의 여유 주소가 공식적으로 바닥난 날입니다. 이후 통신사들은 가입자 여러 명이 공인 IP 하나를 나눠 쓰는 통신사급 NAT(CGNAT)까지 쓰게 됐고 2012년 RFC 6598이 이를 위한 100.64.0.0/10 대역을 따로 정했습니다.'}
  ],
  decisions:[
   {question:'왜 사설 주소를 따로 정했을까?',answer:'모든 기기에 공인 주소를 줄 수 없으니 내부에서는 같은 주소를 여러 곳이 반복해서 쓰게 한 것입니다. 사설 대역은 인터넷 라우터가 전달하지 않기로 약속했기 때문에 집집마다 같은 주소를 써도 충돌하지 않습니다.',cost:'회사 두 곳의 내부망을 VPN으로 이으면 양쪽이 같은 사설 대역을 쓰고 있어 주소가 겹치는 일이 생깁니다. 클라우드에서 VPC 대역을 처음에 신중하게 정하는 이유입니다.'},
   {question:'왜 주소뿐 아니라 포트까지 바꿀까?',answer:'공인 IP 하나 뒤에 기기가 여럿이면 IP만 바꿔서는 돌아온 응답이 어느 기기 것인지 알 수 없습니다. 출발 포트를 기기와 연결마다 다르게 바꾸고 그 대응을 표에 적어 두면 응답의 포트만 보고 원래 기기로 돌려줄 수 있습니다.',cost:'변환 표에 없는 바깥 요청은 어디로 보낼지 모르니 버려집니다. 집에서 띄운 서버에 밖에서 접속하려면 포트 포워딩을 따로 설정해야 합니다.'},
   {question:'IPv6가 있는데 왜 아직 NAT를 쓸까?',answer:'모든 서버, 장비, 소프트웨어가 IPv6를 지원해야 완전히 넘어갈 수 있는데 NAT를 쓰면 기존 IPv4 장비를 그대로 쓸 수 있습니다. 전환 비용은 당장 크고 이득은 천천히 오니 많은 곳이 둘을 함께 운영합니다.',cost:'NAT가 겹겹이 쌓이면 진단이 어려워지고 서버는 요청을 보낸 사람의 진짜 주소를 알 수 없습니다. 또 많은 사람이 공인 IP 하나를 나눠 쓰면 IP 기준 차단에 엉뚱한 사용자까지 걸립니다.'}
  ],
  today:[
   'AWS에서 사설 서브넷의 서버가 외부 API를 호출하려면 NAT 게이트웨이를 거칩니다. 상대 업체가 IP 허용 목록을 요구하면 NAT 게이트웨이의 Elastic IP를 알려 줍니다.',
   '로드 밸런서나 프록시 뒤의 서버는 연결 상대 주소로 프록시의 IP만 봅니다. 사용자 IP가 필요하면 X-Forwarded-For 헤더를 읽되, 신뢰하는 프록시가 붙인 값만 믿어야 합니다.',
   '이 사이트를 PC에서 띄우고 휴대폰으로 접속하는 것은 같은 공유기 안이라 됩니다. 밖에서 접속하려면 공유기 포트 포워딩이나 터널 서비스가 필요한 것도 NAT 때문입니다.'
  ],
  sources:[
   ['RFC 791 · Internet Protocol','https://www.rfc-editor.org/rfc/rfc791'],
   ['RFC 1519 · Classless Inter-Domain Routing (CIDR)','https://www.rfc-editor.org/rfc/rfc1519'],
   ['RFC 1631 · The IP Network Address Translator (NAT)','https://www.rfc-editor.org/rfc/rfc1631'],
   ['RFC 1918 · Address Allocation for Private Internets','https://www.rfc-editor.org/rfc/rfc1918'],
   ['RFC 8200 · Internet Protocol, Version 6','https://www.rfc-editor.org/rfc/rfc8200'],
   ['NRO · Free Pool of IPv4 Address Space Depleted (2011)','https://www.nro.net/ipv4-free-pool-depleted/'],
   ['RFC 6598 · Shared Address Space (100.64.0.0/10)','https://www.rfc-editor.org/rfc/rfc6598'],
   ['RFC 5389 · Session Traversal Utilities for NAT (STUN)','https://www.rfc-editor.org/rfc/rfc5389']
  ]
 },
 kit:{
  intro:'계산을 어디서 할지는 컴퓨터 역사 내내 오락가락했습니다. 중앙의 큰 컴퓨터가 모든 일을 하던 시절, 각자의 PC가 많은 일을 하던 시절, 다시 서버가 모든 화면을 만들던 웹 초기, 그리고 브라우저가 앱처럼 움직이는 지금까지입니다. 그런데 한 가지는 바뀌지 않았습니다. 사용자 손에 있는 쪽은 사용자가 마음대로 바꿀 수 있다는 사실입니다. 브라우저의 검사를 믿으면 안 되는 이유가 여기 있습니다.',
  timeline:[
   {year:'1960~1970년대',title:'단말기와 중앙 컴퓨터',body:'메인프레임 시절의 단말기는 글자를 보여 주고 키 입력을 보내기만 했습니다. 계산, 데이터, 규칙은 모두 중앙 컴퓨터에 있었습니다. 사용자가 단말기를 아무리 만져도 중앙의 데이터를 직접 고칠 방법이 없었습니다.'},
   {year:'1980년대',title:'클라이언트-서버',body:'PC가 보급되자 화면과 업무 규칙을 PC 프로그램이 맡고 데이터만 DB 서버에 두는 구조가 퍼졌습니다. 서버 부담은 줄었지만 PC 프로그램이 DB에 직접 접속하다 보니 DB 계정이 모든 PC에 깔렸고 프로그램을 고칠 때마다 모든 PC에 다시 설치해야 했습니다.'},
   {year:'1993',title:'웹과 CGI',body:'초기 웹 브라우저는 다시 단말기처럼 서버가 만든 HTML을 보여 주기만 했습니다. 1993년 NCSA가 정한 CGI는 요청이 올 때마다 서버가 프로그램을 실행해 그 결과를 HTML로 돌려주는 방식입니다. 규칙과 데이터가 다시 서버로 돌아왔고 배포는 서버 한 곳만 고치면 됐습니다.'},
   {year:'1995',title:'자바스크립트와 동일 출처 정책',body:'1995년 넷스케이프의 브렌던 아이크가 만든 자바스크립트로 브라우저가 입력을 미리 검사하고 화면을 바꿀 수 있게 됐습니다. 같은 시기 넷스케이프는 한 사이트의 스크립트가 다른 사이트의 데이터를 읽지 못하게 막는 동일 출처 정책을 도입했습니다. 브라우저가 여러 사이트의 쿠키를 함께 들고 있기 때문에 필요한 장치였습니다.'},
   {year:'2005',title:'Ajax와 SPA',body:'2005년 제시 제임스 개릿이 Ajax라는 이름을 붙이면서 페이지를 새로 받지 않고 자바스크립트가 서버에 데이터만 요청해 화면을 바꾸는 방식이 퍼졌습니다. 이 흐름이 지금의 SPA와 JSON API로 이어졌습니다. 화면을 만드는 일이 다시 사용자 쪽으로 넘어간 셈입니다.'},
   {year:'2021',title:'접근 제어 실패가 1위로',body:'OWASP Top 10 2021에서 접근 제어 실패(Broken Access Control)가 가장 흔한 웹 취약점 1위에 올랐습니다. 화면에서 버튼을 숨겼을 뿐 API는 그대로 열어 두거나, 주소의 ID만 바꾸면 남의 데이터가 보이는 경우가 대표적입니다. 화면은 브라우저로 옮겨 갔지만 판단은 여전히 서버가 해야 한다는 뜻입니다.'}
  ],
  decisions:[
   {question:'왜 브라우저에서 한 검사를 서버가 다시 해야 할까?',answer:'브라우저는 사용자의 컴퓨터에서 돌아갑니다. 개발자 도구로 자바스크립트를 끄거나 숨겨진 필드를 바꿀 수 있고 curl로 화면을 아예 거치지 않고 API를 부를 수도 있습니다. 서버만이 사용자가 바꿀 수 없는 곳이라서 최종 판단은 서버가 합니다.',cost:'같은 검사를 두 번 만들어야 합니다. 브라우저 검사는 빠른 안내용, 서버 검사는 진짜 규칙으로 역할을 나누고 규칙이 어긋나지 않게 관리해야 합니다.'},
   {question:'왜 비밀 키는 반드시 서버에만 둘까?',answer:'브라우저로 보낸 자바스크립트는 누구나 내려받아 읽을 수 있습니다. 압축하거나 난독화해도 결국 문자열은 들어 있습니다. 키를 브라우저에 넣는 순간 공개한 것과 같습니다.',cost:'외부 API를 부르려면 서버를 한 번 거쳐야 해서 코드와 지연이 늘어납니다. 대신 서버에서 사용량 제한과 권한 검사를 함께 할 수 있습니다.'},
   {question:'왜 API는 화면에 필요한 만큼만 돌려줘야 할까?',answer:'화면에 안 보이는 필드라도 응답에 들어 있으면 브라우저의 네트워크 탭에서 그대로 보입니다. 사용자 목록 API가 화면에는 이름만 보여 주면서 응답에는 이메일과 전화번호까지 담는 식의 유출이 흔합니다.',cost:'화면마다 응답 모양을 따로 정해야 해서 API가 늘어납니다. 응답 스키마를 명시하고 필요한 필드만 고르는 습관이 필요합니다.'}
  ],
  today:[
   'SvelteKit에서 +page.server.ts와 $lib/server 아래 코드는 서버에서만 실행되고, +page.ts와 컴포넌트 코드는 브라우저로도 보내집니다. 이 사이트의 채점 케이스 생성기가 $lib/server에 있는 이유입니다.',
   'Vite는 VITE_로 시작하는 환경 변수만 브라우저 코드에 넣습니다. 비밀 값에 이 접두어를 붙이면 빌드 결과에 그대로 들어갑니다.',
   '이 사이트의 코딩 테스트는 사용자의 브라우저에서 코드를 실행합니다. 그래서 README에도 적었듯이 비밀 테스트나 조작을 막는 성적 시스템이 아닙니다. 경계를 어디에 두느냐가 무엇을 보장할 수 있는지를 정합니다.'
  ],
  sources:[
   ['RFC 3875 · The Common Gateway Interface (CGI) 1.1','https://www.rfc-editor.org/rfc/rfc3875'],
   ['MDN · Same-origin policy','https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy'],
   ['Garrett, Ajax: A New Approach to Web Applications (2005, 보관본)','https://web.archive.org/web/20050222032831/http://www.adaptivepath.com/publications/essays/archives/000385.php'],
   ['OWASP Top 10 2021 · A01 Broken Access Control','https://owasp.org/Top10/A01_2021-Broken_Access_Control/'],
   ['SvelteKit · Server-only modules','https://svelte.dev/docs/kit/server-only-modules'],
   ['Vite · Env Variables and Modes','https://vite.dev/guide/env-and-mode'],
   ['Wikipedia · Common Gateway Interface','https://en.wikipedia.org/wiki/Common_Gateway_Interface']
  ]
 },
 async:{
  intro:'서버가 하는 일의 대부분은 사실 기다리는 일입니다. DB의 답을, 외부 API의 응답을, 느린 클라이언트의 다음 바이트를 기다립니다. 연결마다 스레드를 하나씩 두면 기다리는 스레드가 수천 개 쌓입니다. 이벤트 루프는 기다림 자체를 한곳에 모아 운영체제에 맡기자는 발상에서 나왔고 async와 await는 그 방식을 사람이 읽을 수 있는 코드로 쓰게 해 준 문법입니다.',
  timeline:[
   {year:'1983',title:'select, 여러 소켓을 한꺼번에 기다리기',body:'4.2BSD에 처음 들어간 select()는 소켓 여러 개를 넘겨 주면 그중 하나라도 읽을 준비가 되는 순간 알려 줍니다. 스레드 하나가 많은 연결을 돌볼 수 있는 길이 이때 열렸습니다. 다만 매번 감시할 소켓 목록 전체를 커널에 넘기고 다시 훑어야 해서 연결이 많아지면 느려졌습니다.'},
   {year:'1999~2002',title:'C10K와 kqueue, epoll',body:'동시 연결 1만 개를 받으려는 C10K 논의 속에서 운영체제들이 select의 한계를 고쳤습니다. FreeBSD는 2000년에 kqueue를, 리눅스는 2002년 2.5.44에서 epoll을 넣었습니다. 관심 있는 소켓을 한 번 등록해 두면 준비된 것만 돌려주는 방식이라 연결이 수만 개여도 비용이 거의 늘지 않습니다.'},
   {year:'2000년대',title:'콜백 지옥',body:'초기 이벤트 기반 코드는 이 일이 끝나면 이 함수를 불러 달라는 콜백을 겹겹이 넘기는 방식이었습니다. 순서대로 일어나는 일도 코드에서는 안쪽으로 깊게 들여 쓴 함수로 흩어졌고 오류 처리는 단계마다 따로 해야 했습니다.'},
   {year:'2004~2009',title:'이벤트 기반 서버의 확산',body:'2004년 공개된 nginx는 적은 수의 프로세스가 epoll로 수많은 연결을 처리하는 구조로 아파치보다 훨씬 적은 메모리로 많은 연결을 받았습니다. Python에서는 Twisted가 일찍부터 이 방식을 썼고 2009년 Node.js는 이벤트 루프를 언어 런타임의 기본으로 만들었습니다.'},
   {year:'2005~2015',title:'코루틴과 async/await',body:'Python은 2005년 PEP 342로 제너레이터가 값을 주고받는 코루틴이 될 수 있게 했습니다. 이를 바탕으로 2014년 Python 3.4에 표준 이벤트 루프 asyncio(PEP 3156)가 들어갔고 2015년 Python 3.5의 PEP 492가 async와 await 문법을 추가했습니다. 기다리는 지점에 await를 적으면 코드는 위에서 아래로 읽히면서도 그 지점에서 다른 작업에 차례를 넘깁니다.'}
  ],
  decisions:[
   {question:'왜 연결마다 스레드를 두지 않고 이벤트 루프를 쓸까?',answer:'연결 대부분은 대부분의 시간을 기다리며 보냅니다. 스레드를 연결마다 두면 각자 스택 메모리를 차지하고 운영체제가 수천 개 사이를 전환하느라 시간을 씁니다. 이벤트 루프는 기다림을 epoll 같은 운영체제 기능에 맡기고 준비된 일만 처리하므로 적은 자원으로 많은 연결을 다룹니다.',cost:'루프 안의 코드가 오래 계산하거나 블로킹 함수를 부르면 그동안 다른 모든 요청이 멈춥니다. 스레드 방식이라면 한 요청만 느려질 일이 서버 전체의 지연이 됩니다.'},
   {question:'왜 아무 데서나 전환하지 않고 await에서만 전환할까?',answer:'운영체제 스레드는 언제든 끊길 수 있어서 공유 데이터마다 락이 필요합니다. 코루틴은 await를 적은 곳에서만 차례를 넘기므로 await 사이의 코드는 끊기지 않습니다. 그래서 락 없이도 공유 상태를 다루기가 훨씬 쉽습니다.',cost:'async 함수는 async 함수 안에서만 await할 수 있어서 비동기가 코드 전체로 번집니다. 동기 라이브러리를 그대로 쓰면 루프가 막히므로 비동기용 라이브러리를 따로 골라야 합니다.'},
   {question:'그럼 계산이 많은 일은 어떻게 할까?',answer:'이벤트 루프는 기다림을 겹치는 도구이지 계산을 빠르게 하는 도구가 아닙니다. 계산은 run_in_executor나 asyncio.to_thread로 스레드에, 무거운 계산은 프로세스 풀이나 별도 작업 큐로 보냅니다.',cost:'작업을 다른 스레드나 프로세스로 넘기면 데이터를 주고받는 비용과 구조의 복잡도가 늘어납니다. 무엇이 기다림이고 무엇이 계산인지 측정해서 나눠야 합니다.'}
  ],
  today:[
   'FastAPI를 uvicorn으로 띄우면 async def 엔드포인트는 이벤트 루프에서 돌아갑니다. 그 안에서 requests나 time.sleep 같은 블로킹 호출을 쓰면 다른 요청까지 멈추므로 httpx.AsyncClient와 asyncio.sleep을 씁니다.',
   '기존 동기 함수를 꼭 불러야 한다면 await asyncio.to_thread(함수)로 스레드에 넘깁니다. 이벤트 루프는 그동안 다른 요청을 계속 처리합니다.',
   '외부 API 세 곳을 차례로 부르면 각 응답 시간이 더해지지만 asyncio.gather로 동시에 부르면 가장 느린 하나만큼만 기다립니다. 대신 상대 서버에 한꺼번에 몰리지 않게 동시 개수를 제한합니다.'
  ],
  sources:[
   ['Linux man-pages · select(2)','https://man7.org/linux/man-pages/man2/select.2.html'],
   ['Linux man-pages · epoll(7)','https://man7.org/linux/man-pages/man7/epoll.7.html'],
   ['FreeBSD · kqueue(2)','https://man.freebsd.org/cgi/man.cgi?query=kqueue'],
   ['Dan Kegel, The C10K problem','http://www.kegel.com/c10k.html'],
   ['PEP 342 · Coroutines via Enhanced Generators','https://peps.python.org/pep-0342/'],
   ['PEP 3156 · Asynchronous IO Support Rebooted: the asyncio Module','https://peps.python.org/pep-3156/'],
   ['PEP 492 · Coroutines with async and await syntax','https://peps.python.org/pep-0492/'],
   ['Node.js · About','https://nodejs.org/en/about'],
   ['Python · Coroutines and Tasks','https://docs.python.org/3/library/asyncio-task.html']
  ]
 },
 rest:{
  intro:'REST는 누가 새로 발명한 규칙이라기보다 웹이 왜 그렇게 잘 커졌는지를 나중에 설명한 이름입니다. 그 전에는 원격 컴퓨터의 함수를 부르듯 통신하는 방식이 주류였고 HTTP는 그 호출을 나르는 통로로만 쓰였습니다. 멱등성도 같은 맥락에서 나왔습니다. 네트워크는 실패하고 클라이언트는 다시 보내기 때문에, 다시 보내도 안전한 요청과 그렇지 않은 요청을 구분해야 했습니다.',
  timeline:[
   {year:'1990년대',title:'원격 함수 호출의 시대',body:'CORBA, 자바 RMI, 그리고 1998년 무렵의 XML-RPC와 SOAP는 원격 서버의 함수를 내 함수처럼 부르게 하는 방식이었습니다. 웹 서비스에서는 모든 요청을 한 주소로 POST하고 본문 안에 부를 함수 이름을 적었습니다. HTTP의 메서드와 상태 코드는 거의 쓰이지 않았고 중간의 캐시나 프록시는 요청의 의미를 알 수 없었습니다.'},
   {year:'1997~2022',title:'멱등성의 정의',body:'HTTP/1.1 규격부터 메서드마다 안전한가, 멱등한가가 정해져 있었습니다. 지금의 RFC 9110 기준으로 GET과 HEAD는 서버 상태를 바꾸지 않는 안전한 메서드이고, PUT과 DELETE는 여러 번 보내도 한 번 보낸 것과 결과 상태가 같은 멱등 메서드입니다. POST는 둘 다 아닙니다.'},
   {year:'2000',title:'필딩의 논문',body:'HTTP/1.1 규격을 함께 쓴 로이 필딩은 2000년 박사 논문에서 웹이 성공한 이유를 아키텍처 제약으로 정리하고 REST라고 이름 붙였습니다. 클라이언트와 서버 분리, 무상태, 캐시 가능, 일관된 인터페이스, 계층화가 핵심입니다. 주소는 자원을 가리키고 GET, PUT, DELETE 같은 정해진 메서드로 다루면 처음 보는 클라이언트와 중간 장비도 요청의 뜻을 알 수 있다는 것입니다.'},
   {year:'2006~2010',title:'웹 API의 표준이 되다',body:'2000년대 중반 Amazon S3 같은 서비스가 자원 중심 HTTP API를 내놓으면서 SOAP 대신 이 방식이 웹 API의 기본이 되었습니다. 레너드 리처드슨이 제안하고 마틴 파울러가 2010년에 정리한 성숙도 모델은 한 주소에 POST만 하는 단계부터 자원, 메서드, 링크를 다 쓰는 단계까지를 나눴습니다.'},
   {year:'2015~',title:'REST 바깥의 선택지',body:'2015년 페이스북이 공개한 GraphQL은 클라이언트가 필요한 필드를 직접 고르게 하고 같은 해 구글이 공개한 gRPC는 다시 함수 호출 방식을 빠른 이진 형식으로 되살렸습니다. REST가 모든 상황의 정답은 아니라는 뜻이지만, 공개 웹 API에서는 여전히 HTTP 의미를 따르는 방식이 가장 널리 쓰입니다.'},
   {year:'2017~',title:'Idempotency-Key',body:'결제처럼 POST로 해야 하는 일도 안전하게 다시 보낼 수 있어야 합니다. Stripe는 클라이언트가 요청마다 고유한 키를 Idempotency-Key 헤더에 담아 보내고 같은 키로 다시 오면 처음 결과를 그대로 돌려주는 방식을 공개했습니다. IETF도 이 헤더를 표준으로 만드는 작업을 하고 있습니다.'}
  ],
  decisions:[
   {question:'왜 함수 이름 대신 자원과 정해진 메서드를 쓸까?',answer:'메서드의 뜻이 미리 정해져 있으면 서버마다 문서를 읽지 않아도 캐시, 프록시, 브라우저, 재시도 로직이 요청을 다룰 수 있습니다. GET은 캐시해도 되고, PUT은 다시 보내도 되고 POST는 조심해야 한다는 것을 모두가 압니다.',cost:'모든 동작이 명사와 메서드 몇 개로 깔끔하게 나뉘지는 않습니다. 결제 승인이나 비밀번호 재설정 같은 동작은 /payments/{id}/capture처럼 동작을 자원으로 바꿔 표현하는 타협이 필요합니다.'},
   {question:'왜 GET은 상태를 바꾸면 안 될까?',answer:'브라우저의 미리 가져오기, 검색 엔진 크롤러, 링크 미리보기, 프록시의 재시도는 GET을 언제든 마음대로 보내도 된다고 가정합니다. GET 링크로 삭제를 구현하면 사용자가 누르지 않아도 데이터가 지워질 수 있습니다.',cost:'상태를 바꾸는 작업은 POST, PUT, DELETE로 나눠야 해서 단순한 링크 하나로 끝낼 수 없습니다. 폼이나 자바스크립트 요청이 필요합니다.'},
   {question:'POST 결제를 왜 그냥 다시 보내면 안 될까?',answer:'응답이 오기 전에 연결이 끊기면 클라이언트는 결제가 됐는지 안 됐는지 알 수 없습니다. 다시 보내면 두 번 결제될 수 있고 안 보내면 결제가 빠질 수 있습니다. 멱등 키가 있으면 서버가 같은 키를 보고 이미 처리한 요청임을 알아 처음 결과만 돌려줍니다.',cost:'서버는 키와 결과를 저장하고 같은 키로 동시에 두 요청이 들어오는 경우까지 처리해야 합니다. 키를 언제까지 보관할지도 정해야 합니다.'}
  ],
  today:[
   '결제 API에서는 주문 ID나 클라이언트가 만든 UUID를 멱등 키로 받고 DB에 그 키로 유일 제약을 걸어 두 번째 삽입이 실패하게 만듭니다. 실패하면 저장해 둔 첫 결과를 돌려줍니다.',
   '재시도 라이브러리는 기본적으로 GET, PUT, DELETE 같은 멱등 메서드만 다시 보내도록 설정합니다. POST를 재시도하려면 멱등 키가 있을 때만 허용합니다.',
   'PUT은 자원 전체를 그 값으로 바꾸는 것이라 여러 번 보내도 결과가 같고, PATCH는 일부만 바꾸는 것이라 연산에 따라 멱등이 아닐 수 있습니다. 재고 -1 같은 증감 연산은 PATCH로 보내더라도 멱등 키가 필요합니다.'
  ],
  sources:[
   ['Fielding, Architectural Styles and the Design of Network-based Software Architectures (2000)','https://ics.uci.edu/~fielding/pubs/dissertation/top.htm'],
   ['Fielding, Chapter 5 · Representational State Transfer','https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm'],
   ['RFC 9110 · HTTP Semantics (9.2 Common Method Properties)','https://www.rfc-editor.org/rfc/rfc9110'],
   ['Martin Fowler · Richardson Maturity Model','https://martinfowler.com/articles/richardsonMaturityModel.html'],
   ['Stripe · Designing robust and predictable APIs with idempotency','https://stripe.com/blog/idempotency'],
   ['IETF · The Idempotency-Key HTTP Header Field (draft)','https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/'],
   ['GraphQL','https://graphql.org/'],
   ['gRPC · Motivation and Design Principles','https://grpc.io/blog/principles/']
  ]
 },
 proxy:{
  intro:'처음 웹 서버는 인터넷에 직접 연결된 프로그램 하나였습니다. 사용자가 늘면서 서버 앞에 무언가를 하나 더 세우는 편이 낫다는 것을 알게 됐습니다. 느린 사용자를 대신 상대해 주고, 여러 서버로 나눠 주고, 암호화를 대신 풀어 주는 역할입니다. 그 결과 요청 하나가 여러 단계를 지나게 됐고 502와 504 같은 상태 코드는 그 단계 중 어디서 문제가 났는지를 알려 주는 표시가 되었습니다.',
  timeline:[
   {year:'1994~1996',title:'캐시 프록시',body:'초기 웹 프록시는 회사나 대학 네트워크 출구에 서서 같은 페이지를 한 번만 받아 와 여러 사람에게 나눠 주는 캐시였습니다. 1990년대 초 Harvest 프로젝트의 캐시가 Squid로 이어졌습니다. 사용자 쪽에 서는 이런 프록시를 포워드 프록시라고 부릅니다.'},
   {year:'1998',title:'CDN, 사용자 가까이의 복제본',body:'1998년 설립된 아카마이는 전 세계에 서버를 깔고 원래 서버의 콘텐츠를 사용자와 가까운 곳에서 대신 내주는 CDN을 사업으로 만들었습니다. 서버 쪽에 서서 원래 서버 대신 요청을 받는 리버스 프록시를 세계 규모로 펼친 것입니다.'},
   {year:'2001~2004',title:'HAProxy와 nginx',body:'2001년 처음 공개된 HAProxy는 여러 서버로 요청을 나눠 주는 부하 분산에 집중한 프록시입니다. 2004년 공개된 nginx는 이벤트 루프로 수많은 연결을 적은 메모리로 받으면서 정적 파일과 리버스 프록시 역할을 함께 맡았습니다. 앱 서버 앞에 nginx를 두는 구성이 이때부터 표준처럼 자리 잡았습니다.'},
   {year:'2009',title:'클라우드 로드 밸런서',body:'2009년 5월 AWS가 Elastic Load Balancing을 내놓으면서 리버스 프록시와 부하 분산을 직접 운영하지 않고 서비스로 쓰게 됐습니다. 서버가 죽으면 상태 검사로 빼고 새 서버가 뜨면 넣는 일을 클라우드가 맡게 된 것입니다.'},
   {year:'2014',title:'Forwarded 헤더',body:'프록시를 거치면 앱 서버는 프록시의 주소만 보게 됩니다. 그래서 사람들은 원래 사용자 주소를 X-Forwarded-For 같은 비공식 헤더에 담아 넘겼고 2014년 RFC 7239가 이를 Forwarded 헤더로 표준화했습니다. 실제로는 지금도 X-Forwarded-For가 더 널리 쓰입니다.'},
   {year:'2016~',title:'서비스 사이의 프록시',body:'2016년 리프트가 공개한 Envoy는 외부 요청뿐 아니라 내부 서비스끼리의 통신에도 프록시를 끼워 넣는 서비스 메시의 토대가 되었습니다. 재시도, 타임아웃, 암호화를 앱 코드 대신 프록시가 맡는 구조입니다. 요청이 지나는 단계는 더 늘어났습니다.'}
  ],
  decisions:[
   {question:'왜 앱 서버 앞에 프록시를 한 단계 더 둘까?',answer:'Python 앱 서버는 요청을 빨리 처리하는 데 맞춰져 있지 느린 휴대폰 연결을 오래 붙잡고 있는 데 맞춰져 있지 않습니다. gunicorn 문서도 기본 동기 워커를 쓸 때는 프록시가 느린 클라이언트를 버퍼링해야 하며 그렇지 않으면 서비스 거부 공격에 취약하다고 적고 있습니다. 프록시가 느린 연결을 대신 받고 TLS와 정적 파일을 맡으면 앱 서버는 계산에만 집중합니다.',cost:'요청이 지나는 단계가 늘어나 장애 지점과 설정할 타임아웃도 늘어납니다. 문제가 생기면 프록시 로그와 앱 로그를 함께 봐야 원인을 찾을 수 있습니다.'},
   {question:'왜 502와 504를 나눠 놓았을까?',answer:'둘 다 프록시가 뒤쪽 서버 때문에 제대로 답하지 못했다는 뜻이지만 실패한 방식이 다릅니다. 502는 연결이 거부되거나 이상한 응답을 받은 경우이고, 504는 기다렸는데 정해진 시간 안에 답이 오지 않은 경우입니다. 앞의 것은 앱이 꺼졌거나 죽은 경우, 뒤의 것은 앱이 너무 느린 경우를 먼저 의심하게 해 줍니다.',cost:'상태 코드는 어느 구간인지까지만 알려 줍니다. 앱이 왜 느린지(DB 잠금인지, 외부 API인지)는 앱 로그와 지표를 따로 봐야 알 수 있습니다.'},
   {question:'왜 층마다 타임아웃 길이를 맞춰야 할까?',answer:'바깥쪽 프록시가 안쪽보다 먼저 포기하면 사용자는 504를 받는데 앱은 계속 일을 끝까지 합니다. 사용자가 다시 시도하면 같은 작업이 두 번 돌아갑니다. 보통 안쪽(DB, 외부 API 호출)을 가장 짧게, 바깥쪽으로 갈수록 조금씩 길게 둡니다.',cost:'층마다 기본값이 달라서 일부러 맞추지 않으면 어긋나 있기 쉽습니다. 오래 걸리는 작업은 타임아웃을 늘리기보다 작업 큐로 빼고 결과를 나중에 확인하게 하는 편이 낫습니다.'}
  ],
  today:[
   '기본값을 보면 nginx의 proxy_read_timeout은 60초, AWS ALB의 유휴 타임아웃도 60초, gunicorn의 워커 timeout은 30초입니다. 앱 쪽 작업이 30초를 넘으면 gunicorn이 워커를 재시작해 nginx는 502를 돌려줄 수 있습니다.',
   '502가 나면 앱 프로세스가 떠 있는지, 프록시가 가리키는 주소와 포트가 맞는지부터 봅니다. 504가 나면 앱 로그에서 그 시각의 느린 요청과 DB 대기를 찾습니다.',
   '프록시 뒤의 앱에서 사용자 IP를 쓰려면 X-Forwarded-For를 읽되, 신뢰하는 프록시 수만큼만 오른쪽에서 셉니다. 사용자가 직접 보낸 헤더 값을 믿으면 IP를 위조할 수 있습니다.'
  ],
  sources:[
   ['Squid · Introduction','https://www.squid-cache.org/Intro/'],
   ['nginx · ngx_http_proxy_module','https://nginx.org/en/docs/http/ngx_http_proxy_module.html'],
   ['Gunicorn · Deploying Gunicorn','https://gunicorn.org/deploy/'],
   ['Gunicorn · Settings','https://gunicorn.org/reference/settings/'],
   ['AWS · Application Load Balancer attributes','https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-load-balancer-attributes.html'],
   ['RFC 7239 · Forwarded HTTP Extension','https://www.rfc-editor.org/rfc/rfc7239'],
   ['RFC 9110 · 502 Bad Gateway, 504 Gateway Timeout','https://www.rfc-editor.org/rfc/rfc9110'],
   ['Envoy Proxy','https://www.envoyproxy.io/'],
   ['Wikipedia · Akamai Technologies','https://en.wikipedia.org/wiki/Akamai_Technologies'],
   ['Wikipedia · HAProxy','https://en.wikipedia.org/wiki/HAProxy']
  ]
 },
 index:{
  intro:'인덱스는 디스크가 느리다는 물리적인 사실에서 나왔습니다. 원하는 행 하나를 찾으려고 테이블 전체를 읽는 일은 데이터가 작을 때는 괜찮지만 커지면 감당할 수 없습니다. 1970년대 B-tree와 관계형 DB의 옵티마이저가 차례로 등장하면서 지금의 구조가 되었습니다. 인덱스를 만들었는데도 DB가 안 쓰는 경우가 있는 이유도 이 역사에 들어 있습니다.',
  timeline:[
   {year:'1960년대',title:'길을 아는 프로그램',body:'1966년 아폴로 계획의 새턴 V 부품 목록을 관리하려고 개발이 시작된 IBM IMS 같은 초기 DB는 데이터를 나무 모양으로 연결해 두었습니다. 프로그램은 부모에서 자식으로 포인터를 따라가며 원하는 레코드를 찾았습니다. 어떤 길로 찾을지를 프로그래머가 코드에 직접 적었기 때문에 데이터 구조가 바뀌면 프로그램도 고쳐야 했습니다.'},
   {year:'1970',title:'무엇을 원하는지만 말하기',body:'에드거 코드는 1970년 논문에서 데이터를 표(관계)로 보고 어떻게 찾을지가 아니라 무엇을 원하는지만 말하는 관계형 모델을 제안했습니다. 프로그램이 저장 방식과 상관없이 같은 질의를 쓸 수 있게 하자는 것입니다. 그러려면 질의를 빠르게 실행할 방법을 DB가 스스로 골라야 했습니다.'},
   {year:'1972',title:'B-tree',body:'바이어와 맥크라이트는 1972년 논문에서 B-tree를 발표했습니다. 노드 하나를 디스크 블록 하나에 맞추고 노드마다 키를 수백 개씩 담아, 수백만 행도 세네 번의 디스크 읽기로 찾게 한 구조입니다. 키가 정렬된 채 유지되므로 같은 값 찾기뿐 아니라 범위 검색과 정렬에도 쓸 수 있습니다. 1979년 코머가 쓴 「어디에나 있는 B-tree」라는 논문 제목처럼 곧 거의 모든 DB의 기본 인덱스가 되었습니다.'},
   {year:'1979',title:'비용 기반 옵티마이저',body:'IBM System R 연구진의 셀린저 등은 1979년 논문에서 테이블 통계를 보고 여러 실행 방법의 비용을 추정해 가장 싼 것을 고르는 옵티마이저를 발표했습니다. 인덱스를 쓸지, 전체를 읽을지, 어떤 순서로 조인할지를 DB가 계산해 정합니다. 지금 쓰는 PostgreSQL, MySQL, Oracle의 옵티마이저가 모두 이 방식을 따릅니다.'},
   {year:'현재',title:'EXPLAIN으로 계획 보기',body:'요즘 DB는 B-tree 말고도 해시, 전문 검색, 공간 데이터용 인덱스를 제공합니다. 그래도 기본은 여전히 B-tree이고 옵티마이저가 고른 계획은 EXPLAIN으로 직접 볼 수 있습니다. 느린 질의를 고칠 때 추측 대신 계획부터 보는 것이 출발점입니다.'}
  ],
  decisions:[
   {question:'왜 하필 B-tree일까?',answer:'디스크는 한 바이트를 읽든 한 블록을 읽든 비용이 비슷합니다. 노드를 블록 크기에 맞추고 가지를 많이 치면 나무의 높이가 아주 낮아져 몇 번의 읽기로 끝납니다. 정렬 순서를 유지하므로 범위 조건과 ORDER BY도 같은 인덱스로 처리합니다.',cost:'행을 넣거나 키를 바꿀 때마다 인덱스도 고쳐야 해서 인덱스가 많을수록 쓰기가 느려지고 저장 공간이 늘어납니다. 자주 쓰는 조건에만 만듭니다.'},
   {question:'인덱스가 있는데 왜 DB가 안 쓸까?',answer:'조건에 맞는 행이 전체의 상당 부분이면 인덱스로 하나씩 찾아가는 것보다 테이블을 처음부터 순서대로 읽는 편이 빠릅니다. 인덱스를 거치면 디스크의 여기저기를 띄엄띄엄 읽게 되기 때문입니다. 옵티마이저는 통계로 이 비율을 추정해 더 싼 쪽을 고릅니다.',cost:'통계가 오래되면 잘못 추정해 나쁜 계획을 고릅니다. 데이터가 크게 바뀐 뒤에는 ANALYZE로 통계를 새로 모읍니다.'},
   {question:'왜 SQL은 어떻게 찾을지를 적지 않을까?',answer:'코드의 관계형 모델이 노린 것이 데이터 독립성이었습니다. 질의는 무엇을 원하는지만 말하고 실행 방법은 DB가 고르니, 인덱스를 추가하거나 데이터가 늘어도 질의 코드는 그대로 둘 수 있습니다.',cost:'같은 질의가 데이터 분포에 따라 어느 날 갑자기 느려질 수 있고 그 이유는 코드만 봐서는 보이지 않습니다. EXPLAIN을 읽는 법을 따로 익혀야 합니다.'}
  ],
  today:[
   'EXPLAIN ANALYZE를 붙여 실행하면 예상 행 수와 실제 행 수, 단계별 시간을 볼 수 있습니다. 예상과 실제가 크게 다르면 통계 문제를 의심합니다.',
   '복합 인덱스 (a, b)는 a로 시작하는 조건에 쓰입니다. b만으로 검색하면 쓰이지 않을 수 있습니다. LIKE \'%검색어\'처럼 앞이 고정되지 않은 패턴도 일반 B-tree 인덱스를 타지 못합니다.',
   '외래 키 컬럼에는 인덱스를 따로 만들어 둡니다. 부모 행을 지우거나 조인할 때 자식 테이블 전체를 읽는 일을 막을 수 있습니다.'
  ],
  sources:[
   ['Codd, A Relational Model of Data for Large Shared Data Banks (CACM, 1970)','https://dl.acm.org/doi/10.1145/362384.362685'],
   ['Bayer & McCreight, Organization and Maintenance of Large Ordered Indexes (1972)','https://doi.org/10.1007/BF00288683'],
   ['Comer, The Ubiquitous B-Tree (ACM Computing Surveys, 1979)','https://dl.acm.org/doi/10.1145/356770.356776'],
   ['Selinger et al., Access Path Selection in a Relational DBMS (SIGMOD, 1979)','https://dl.acm.org/doi/10.1145/582095.582099'],
   ['PostgreSQL · Using EXPLAIN','https://www.postgresql.org/docs/current/using-explain.html'],
   ['PostgreSQL · Index Types','https://www.postgresql.org/docs/current/indexes-types.html'],
   ['Wikipedia · IBM Information Management System','https://en.wikipedia.org/wiki/IBM_Information_Management_System']
  ]
 },
 transaction:{
  intro:'트랜잭션은 은행과 항공 예약처럼 실패하면 안 되는 업무를 컴퓨터로 옮기면서 생긴 개념입니다. 계좌에서 돈이 빠졌는데 상대 계좌에 들어가지 않은 상태가 남으면 안 됩니다. 처음에는 정확성이 목표였고 이후 동시에 많은 사람이 쓰면서 성능과의 타협이 시작됐습니다. 격리 수준이 여러 개 있는 이유, 트랜잭션을 써도 재고가 음수가 될 수 있는 이유가 이 타협에서 나옵니다.',
  timeline:[
   {year:'1970년대',title:'트랜잭션이라는 단위',body:'IBM의 짐 그레이 등은 여러 변경을 하나로 묶어 모두 반영되거나 하나도 반영되지 않게 하는 트랜잭션을 DB의 중심 개념으로 다듬었습니다. 1976년 System R 연구진은 2단계 잠금으로 동시에 실행된 트랜잭션도 차례로 실행한 것과 같은 결과를 낼 수 있음을 보였습니다. 그레이는 이 공로로 1998년 튜링상을 받았습니다.'},
   {year:'1983',title:'ACID라는 이름',body:'헤르더와 로이터는 1983년 논문에서 트랜잭션이 지켜야 할 성질을 원자성, 일관성, 격리성, 지속성으로 정리하고 ACID라는 이름을 붙였습니다. 지금도 트랜잭션을 설명할 때 쓰는 네 단어가 여기서 나왔습니다.'},
   {year:'1992',title:'로그 먼저 쓰기와 격리 수준',body:'1992년 IBM의 모한 등이 발표한 ARIES는 데이터를 바꾸기 전에 변경 기록(로그)을 먼저 디스크에 쓰고 장애가 나면 로그를 보고 복구하는 방법을 정리했습니다. 지속성과 원자성을 지키는 방식으로 지금도 거의 모든 DB가 따릅니다. 같은 해 SQL-92 표준은 더티 읽기, 반복 불가능한 읽기, 팬텀 같은 현상을 막는 정도에 따라 네 단계의 격리 수준을 정의했습니다.'},
   {year:'1995',title:'표준 정의의 구멍',body:'베렌슨, 그레이 등은 1995년 논문 「ANSI SQL 격리 수준 비판」에서 표준의 정의가 모호하고 중요한 이상 현상을 빠뜨렸다고 지적했습니다. 두 트랜잭션이 같은 값을 읽고 각자 고쳐 한쪽 변경이 사라지는 갱신 손실, 각자 조건을 확인하고 동시에 써서 규칙이 깨지는 쓰기 왜곡이 대표적입니다. 많은 DB가 쓰던 스냅숏 격리도 이 논문에서 정식으로 이름을 얻었습니다.'},
   {year:'2008~2011',title:'빠른 직렬화',body:'케이힐 등은 2008년 스냅숏 격리 위에서 위험한 패턴만 감지해 직렬화를 보장하는 SSI를 발표했습니다. PostgreSQL은 9.1부터 SERIALIZABLE 수준을 이 방식으로 구현했습니다. 잠금으로 막는 대신 충돌을 감지하면 한쪽을 실패시키고 다시 시도하게 하는 방식입니다.'}
  ],
  decisions:[
   {question:'왜 데이터보다 로그를 먼저 쓸까?',answer:'데이터 파일은 여기저기 흩어져 있어 매번 바로 고치면 느리고 고치는 도중에 전원이 나가면 반쯤 바뀐 상태가 남습니다. 변경 내용을 로그 끝에 순서대로 먼저 쓰면 빠르고 장애 뒤에도 로그를 다시 재생하거나 되돌려 정확한 상태로 복구할 수 있습니다.',cost:'커밋할 때마다 로그를 디스크에 확실히 써야 해서 디스크 동기화 시간이 커밋 지연에 그대로 더해집니다.'},
   {question:'왜 격리 수준을 하나로 정하지 않고 여러 개 둘까?',answer:'완전한 직렬화는 안전하지만 잠금 대기나 재시도가 많아 느립니다. 대부분의 작업은 약간의 이상 현상을 허용해도 문제가 없으니 DB는 선택지를 주고 기본값은 성능 쪽으로 둡니다. PostgreSQL의 기본값은 READ COMMITTED입니다.',cost:'기본 수준에서는 읽고 나서 고치는 사이에 다른 트랜잭션이 끼어들 수 있습니다. 개발자가 어떤 이상 현상이 가능한지 알고 직접 막아야 합니다.'},
   {question:'왜 읽기와 쓰기가 서로를 기다리지 않게 만들었을까?',answer:'MVCC는 행을 고칠 때 덮어쓰지 않고 새 버전을 만듭니다. 읽는 쪽은 자기가 시작한 시점의 버전을 보고 쓰는 쪽은 새 버전을 만드니, 긴 조회가 쓰기를 막거나 쓰기가 조회를 막지 않습니다.',cost:'옛 버전이 쌓이므로 정리하는 작업(PostgreSQL의 VACUUM)이 필요합니다. 오래 열어 둔 트랜잭션이 있으면 옛 버전을 지우지 못해 테이블이 부풀어 오릅니다.'}
  ],
  today:[
   '재고 차감은 SELECT로 읽고 계산해서 UPDATE하지 말고 UPDATE stock SET qty = qty - 1 WHERE id = ? AND qty > 0처럼 조건과 변경을 한 문장으로 씁니다. 바뀐 행 수가 0이면 재고가 없는 것입니다.',
   '읽은 값을 바탕으로 복잡한 판단을 해야 하면 SELECT ... FOR UPDATE로 그 행을 잠그거나 SERIALIZABLE을 쓰고 serialization_failure(40001) 오류가 나면 트랜잭션 전체를 다시 실행합니다.',
   '트랜잭션 안에서 외부 API를 부르지 않습니다. 잠금을 쥔 시간이 길어질 뿐 아니라 DB는 롤백돼도 외부 호출은 되돌릴 수 없습니다.'
  ],
  sources:[
   ['Härder & Reuter, Principles of Transaction-Oriented Database Recovery (1983)','https://dl.acm.org/doi/10.1145/289.291'],
   ['Eswaran et al., The Notions of Consistency and Predicate Locks (CACM, 1976)','https://dl.acm.org/doi/10.1145/360363.360369'],
   ['Mohan et al., ARIES (TODS, 1992)','https://dl.acm.org/doi/10.1145/128765.128770'],
   ['Berenson et al., A Critique of ANSI SQL Isolation Levels (SIGMOD, 1995)','https://dl.acm.org/doi/10.1145/223784.223785'],
   ['Cahill et al., Serializable Isolation for Snapshot Databases (SIGMOD, 2008)','https://dl.acm.org/doi/10.1145/1376616.1376690'],
   ['PostgreSQL · Transaction Isolation','https://www.postgresql.org/docs/current/transaction-iso.html'],
   ['PostgreSQL · Write-Ahead Logging','https://www.postgresql.org/docs/current/wal-intro.html'],
   ['PostgreSQL Wiki · SSI','https://wiki.postgresql.org/wiki/SSI']
  ]
 },
 cache:{
  intro:'캐시는 컴퓨터 안의 거의 모든 층에 있습니다. CPU와 메모리 사이, 디스크와 메모리 사이, 브라우저와 서버 사이, 앱과 DB 사이에 모두 있습니다. 출발점은 같습니다. 방금 쓴 것은 곧 또 쓰고 가까운 것은 함께 쓴다는 관찰입니다. 그리고 어느 층에서든 같은 문제를 만납니다. 원본이 바뀌었을 때 복사본을 언제 버릴 것인가입니다.',
  timeline:[
   {year:'1965~1969',title:'노예 메모리',body:'모리스 윌크스는 1965년 논문에서 느리고 큰 주 메모리 앞에 빠르고 작은 메모리를 두고 최근에 쓴 내용을 복사해 두자고 제안했습니다. 그는 이를 노예 메모리라고 불렀습니다. 1960년대 말 IBM System/360 Model 85에 이 생각이 CPU 캐시로 들어갔고 지금은 모든 CPU에 여러 단계의 캐시가 있습니다.'},
   {year:'1990년대',title:'웹 캐시와 Cache-Control',body:'웹이 커지면서 같은 이미지와 페이지를 매번 원본 서버에서 받는 것이 낭비가 되었습니다. 브라우저와 프록시가 응답을 저장해 두기 시작했고 1997년 HTTP/1.1은 Cache-Control 헤더로 서버가 얼마 동안 캐시해도 되는지, 누가 캐시해도 되는지를 지정하게 했습니다. 지금 규격은 2022년 RFC 9111입니다.'},
   {year:'2003',title:'memcached',body:'블로그 서비스 LiveJournal을 운영하던 브래드 피츠패트릭은 DB 앞에 둘 분산 메모리 캐시 memcached를 만들었습니다. 여러 서버의 남는 메모리를 하나의 큰 캐시처럼 쓰는 방식으로, 이후 페이스북 같은 대형 서비스가 널리 썼습니다. 앱이 캐시를 먼저 보고 없으면 DB에서 읽어 채우는 cache-aside 방식이 이때부터 일반화되었습니다.'},
   {year:'2009',title:'Redis',body:'2009년 공개된 Redis는 단순한 키값을 넘어 리스트, 집합, 정렬 집합 같은 자료구조를 메모리에서 다룹니다. 캐시뿐 아니라 세션 저장소, 순위표, 간단한 큐로도 쓰이게 되었습니다.'},
   {year:'2013',title:'대규모 캐시의 문제들',body:'페이스북은 2013년 논문 「페이스북의 memcache 확장」에서 캐시가 비는 순간 수많은 요청이 한꺼번에 DB로 몰리는 문제와, 갱신과 캐시 채우기가 엇갈려 옛 값이 캐시에 남는 문제를 다뤘습니다. 이를 막으려고 캐시 서버가 한 요청에만 DB 조회를 허락하는 리스(lease) 같은 장치를 썼습니다.'}
  ],
  decisions:[
   {question:'왜 캐시는 거의 언제나 효과가 있을까?',answer:'프로그램과 사용자는 최근에 쓴 데이터를 다시 쓰고 가까이 있는 데이터를 함께 쓰는 경향이 있습니다. 인기 상품 몇 개가 조회의 대부분을 차지하는 것처럼, 작은 캐시로도 요청의 상당 부분을 원본까지 가지 않고 처리할 수 있습니다.',cost:'캐시 적중률이 낮은 데이터에 캐시를 두면 메모리와 코드만 늘고 효과는 없습니다. 적중률을 측정해야 합니다.'},
   {question:'왜 정확한 무효화 대신 TTL을 쓸까?',answer:'원본이 바뀔 때마다 모든 복사본을 정확히 찾아 지우려면 누가 어디에 복사해 두었는지 다 알아야 합니다. 브라우저, CDN, 앱 캐시까지 흩어져 있으면 사실상 불가능합니다. TTL은 이 값은 최대 몇 초 동안만 믿으라는 약속으로 문제를 단순하게 만듭니다. "컴퓨터 과학에서 어려운 것은 캐시 무효화와 이름 짓기 두 가지뿐"이라는 필 칼튼의 말이 자주 인용되는 이유입니다.',cost:'TTL 동안은 옛 값이 보일 수 있습니다. 가격이나 재고처럼 틀리면 안 되는 값은 TTL을 짧게 하거나 결제 직전에 원본에서 다시 확인합니다.'},
   {question:'왜 값을 고칠 때 캐시를 갱신하지 않고 지울까?',answer:'DB를 고친 뒤 캐시에도 새 값을 쓰면, 동시에 일어난 두 갱신의 순서가 DB와 캐시에서 뒤바뀔 때 캐시에 옛 값이 남습니다. 캐시를 지우면 다음 조회가 DB의 최신 값으로 다시 채우므로 엇갈릴 여지가 줄어듭니다.',cost:'지운 직전에 인기 키 조회가 몰리면 모두 DB로 갑니다. TTL에 약간의 무작위 값을 더하거나 한 요청만 DB를 조회하게 하는 잠금을 둡니다.'}
  ],
  today:[
   'cache-aside에서 캐시는 원본이 아닙니다. Redis가 비거나 꺼져도 DB에서 읽어 정상 동작해야 하고 캐시에만 있는 데이터가 생기면 안 됩니다.',
   '로그인한 사용자의 개인 정보가 담긴 응답에는 Cache-Control: private 또는 no-store를 붙입니다. 실수로 CDN이 캐시하면 다른 사용자에게 남의 화면이 보일 수 있습니다.',
   '캐시 키에는 사용자, 언어, 버전처럼 응답을 바꾸는 값을 모두 넣습니다. 키가 너무 단순하면 서로 다른 응답이 같은 키를 덮어씁니다.'
  ],
  sources:[
   ['Wilkes, Slave Memories and Dynamic Storage Allocation (1965)','https://doi.org/10.1109/PGEC.1965.264263'],
   ['RFC 9111 · HTTP Caching','https://www.rfc-editor.org/rfc/rfc9111'],
   ['memcached · About','https://memcached.org/about'],
   ['Redis · About','https://redis.io/about/'],
   ['Nishtala et al., Scaling Memcache at Facebook (NSDI, 2013)','https://www.usenix.org/conference/nsdi13/technical-sessions/presentation/nishtala'],
   ['Martin Fowler · TwoHardThings','https://martinfowler.com/bliki/TwoHardThings.html'],
   ['Wikipedia · IBM System/360 Model 85','https://en.wikipedia.org/wiki/IBM_System/360_Model_85']
  ]
 },
 queue:{
  intro:'메시지 큐는 보내는 쪽과 받는 쪽이 같은 시간에 살아 있지 않아도 일이 전달되게 하려는 장치입니다. 금융과 기업 시스템에서 먼저 쓰였고 웹 서비스가 커지면서 요청은 빨리 받고 무거운 일은 나중에 처리하는 기본 도구가 되었습니다. 그런데 네트워크로 무언가를 정확히 한 번만 전달하는 일은 이론적으로 보장할 수 없습니다. 큐를 쓰는 코드가 중복을 견디게 짜야 하는 이유입니다.',
  timeline:[
   {year:'1975',title:'두 장군 문제',body:'1975년 아쿄을루 등은 믿을 수 없는 통신로로 확인 메시지를 주고받는 두 쪽이 서로 합의했다는 확신에 도달할 수 없음을 보였습니다. 나중에 짐 그레이가 두 장군 문제라고 부른 이 결과는 메시지 시스템의 한계를 정합니다. 보낸 쪽은 받은 쪽이 처리했는지 끝내 확신할 수 없고 그래서 다시 보내거나 포기하는 것 중 하나를 골라야 합니다.'},
   {year:'1993',title:'기업용 메시지 미들웨어',body:'1993년 12월 IBM이 MQSeries(지금의 IBM MQ)를 내놓으면서 서로 다른 시스템 사이에 메시지를 안전하게 저장하고 전달하는 미들웨어가 기업 전산의 표준이 되었습니다. 은행의 계정계와 다른 시스템이 동시에 살아 있지 않아도 거래가 넘어갈 수 있게 된 것입니다.'},
   {year:'2003~2007',title:'AMQP와 RabbitMQ',body:'제품마다 프로토콜이 달라 서로 연결하기 어려웠던 문제를 풀려고 2003년 JP모건 체이스에서 개방형 메시지 프로토콜 AMQP가 시작됐습니다. 이를 구현한 RabbitMQ가 2007년에 나오면서 오픈소스 메시지 브로커가 널리 쓰이게 되었습니다.'},
   {year:'2004~2006',title:'클라우드의 큐',body:'아마존은 2004년 말 SQS를 베타로 공개하고 2006년에 정식 서비스로 내놓았습니다. 서버를 직접 운영하지 않고 API 호출만으로 큐를 쓰게 된 것입니다. SQS는 꺼낸 메시지를 잠시 다른 소비자에게 숨겨 두었다가 삭제되지 않으면 다시 보이게 하는 방식으로 적어도 한 번 전달을 보장합니다.'},
   {year:'2011',title:'로그로서의 큐, Kafka',body:'링크드인이 2011년 오픈소스로 공개한 Kafka는 메시지를 꺼내면 사라지는 큐가 아니라 순서대로 쌓이는 로그로 다룹니다. 소비자마다 어디까지 읽었는지만 기억하므로 같은 데이터를 여러 시스템이 각자 읽고 필요하면 처음부터 다시 읽을 수도 있습니다.'}
  ],
  decisions:[
   {question:'왜 요청을 큐로 나눠 받을까?',answer:'주문 접수와 이메일 발송을 한 요청에서 다 하면 메일 서버가 느릴 때 주문 응답도 느려지고 메일 서버가 죽으면 주문까지 실패합니다. 큐에 일을 넣고 바로 응답하면 접수와 처리가 분리되어 갑자기 몰린 요청도 큐에 쌓였다가 처리됩니다.',cost:'일이 언제 끝날지 사용자에게 바로 알려 줄 수 없고 큐가 쌓이는지 실패가 반복되는지 따로 감시해야 합니다.'},
   {question:'왜 많은 큐가 적어도 한 번 전달을 기본으로 할까?',answer:'소비자가 일을 끝낸 뒤에 완료를 알리게 하면, 처리 도중 죽은 경우에도 메시지가 다시 전달되어 일이 사라지지 않습니다. 두 장군 문제 때문에 정확히 한 번은 보장할 수 없으니 잃어버리는 쪽 대신 중복 쪽을 택한 것입니다.',cost:'같은 메시지가 두 번 처리될 수 있습니다. 소비자는 주문 ID 같은 키로 이미 처리했는지 확인하는 멱등한 처리를 해야 합니다.'},
   {question:'계속 실패하는 메시지는 어떻게 할까?',answer:'데이터가 잘못되어 몇 번을 해도 실패하는 메시지가 큐 맨 앞에서 계속 재시도되면 뒤의 정상 메시지까지 막힙니다. 정해진 횟수만큼 실패하면 데드 레터 큐로 옮겨 따로 살펴보게 합니다.',cost:'데드 레터 큐에 쌓인 메시지를 누군가 확인하고 고쳐 다시 넣는 절차가 없으면 일이 조용히 사라진 것과 다르지 않습니다.'}
  ],
  today:[
   'Python의 Celery에서 acks_late=True를 쓰면 작업이 끝난 뒤에 완료를 알립니다. 워커가 도중에 죽어도 작업이 다시 실행되는 대신 두 번 실행될 수 있으니 작업 함수를 멱등하게 만듭니다.',
   'DB에 주문을 저장하고 큐에 이벤트를 넣는 두 동작은 한 트랜잭션으로 묶이지 않습니다. 주문과 같은 트랜잭션으로 아웃박스 테이블에 이벤트를 쓰고 별도 프로세스가 그 테이블을 읽어 큐로 보내는 트랜잭셔널 아웃박스 패턴이 이를 해결합니다.',
   'SQS의 가시성 타임아웃은 작업 처리 시간보다 넉넉하게 잡습니다. 너무 짧으면 아직 처리 중인 메시지가 다른 워커에게 다시 전달됩니다.'
  ],
  sources:[
   ['Wikipedia · Two Generals\' Problem','https://en.wikipedia.org/wiki/Two_Generals%27_Problem'],
   ['Wikipedia · IBM MQ','https://en.wikipedia.org/wiki/IBM_MQ'],
   ['Wikipedia · Advanced Message Queuing Protocol','https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol'],
   ['AWS · Amazon SQS visibility timeout','https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html'],
   ['AWS · Amazon SQS dead-letter queues','https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html'],
   ['Apache Kafka · Message Delivery Semantics','https://kafka.apache.org/documentation/#semantics'],
   ['RabbitMQ · Reliability Guide','https://www.rabbitmq.com/docs/reliability'],
   ['microservices.io · Transactional outbox','https://microservices.io/patterns/data/transactional-outbox.html'],
   ['Celery · Tasks','https://docs.celeryq.dev/en/stable/userguide/tasks.html']
  ]
 },
 normalization:{
  intro:'정규화는 같은 사실이 여러 곳에 적혀 있으면 언젠가 서로 달라진다는 아주 현실적인 문제에서 출발했습니다. 코드가 관계형 모델을 내놓은 직후 그 문제를 수학적으로 다루는 규칙으로 정리한 것이 정규형입니다. 이후 성능 때문에 일부러 중복을 두는 반정규화와 NoSQL의 문서 모델이 나왔지만 무엇을 왜 중복하는지 아는 것이 출발점이라는 점은 같습니다.',
  timeline:[
   {year:'1960년대',title:'중복이거나 포인터이거나',body:'계층형 DB(IMS)와 네트워크형 DB(CODASYL)에서는 데이터를 미리 정한 연결 구조에 맞춰 저장했습니다. 고객 정보를 주문마다 복사해 두면 고객이 이사할 때 모든 사본을 고쳐야 했고, 포인터로 연결해 두면 구조가 바뀔 때마다 프로그램을 고쳐야 했습니다.'},
   {year:'1970~1971',title:'제1, 2, 3정규형',body:'코드는 1970년 관계형 모델 논문에서 한 칸에 하나의 값만 두는 제1정규형을 정의했습니다. 이듬해 「데이터베이스 관계형 모델의 추가 정규화」에서 제2정규형과 제3정규형을 제시했습니다. 핵심 도구는 함수적 종속, 즉 X가 정해지면 Y가 하나로 정해진다는 관계입니다. 이 관계를 보고 표를 나누면 삽입, 수정, 삭제 때의 이상 현상을 막을 수 있습니다.'},
   {year:'1974~1977',title:'BCNF와 제4정규형',body:'1974년 보이스와 코드는 제3정규형으로도 남는 이상 현상을 막는 보이스-코드 정규형(BCNF)을 정리했습니다. 1977년 페이긴은 한 키에 서로 무관한 여러 값 목록이 붙는 다치 종속을 다루는 제4정규형을 발표했습니다. 실무에서는 보통 제3정규형이나 BCNF까지를 목표로 합니다.'},
   {year:'1976',title:'개체-관계 모델',body:'피터 첸은 1976년 개체와 그 사이의 관계로 데이터를 그리는 ER 모델을 발표했습니다. 정규형이 이미 있는 표를 검사하는 규칙이라면, ER 모델은 처음 설계할 때 업무를 개체와 관계로 나눠 생각하게 하는 도구입니다. 지금 쓰는 ERD가 여기서 나왔습니다.'},
   {year:'1990년대~',title:'일부러 중복하기',body:'분석용 데이터 웨어하우스에서는 조인을 줄이려고 사실 테이블 하나에 여러 차원 테이블을 붙이는 스타 스키마처럼 일부러 중복을 둔 설계가 퍼졌습니다. 2000년대 후반 문서형 NoSQL도 함께 읽는 데이터를 한 문서에 넣는 반정규화를 기본으로 삼았습니다. 다만 둘 다 중복된 사본을 어떻게 맞출지 계획한 위에서의 선택입니다.'}
  ],
  decisions:[
   {question:'왜 같은 사실을 한 곳에만 두라고 할까?',answer:'고객 주소를 주문마다 복사해 두면 주소를 바꿀 때 어떤 사본은 고치고 어떤 사본은 빠뜨리기 쉽습니다. 사실 하나를 한 곳에만 두면 고칠 곳도 하나라서 데이터끼리 어긋날 수가 없습니다.',cost:'화면 하나를 그리려면 여러 표를 조인해야 합니다. 조인이 많아지면 질의가 복잡해지고 데이터가 아주 크면 느려질 수 있습니다.'},
   {question:'주문 당시 가격을 주문에 따로 적는 것은 중복일까?',answer:'아닙니다. 상품의 현재 가격과 주문할 때 낸 가격은 서로 다른 사실입니다. 주문 당시 가격은 상품이 아니라 주문 항목에 함수적으로 종속되므로 주문 항목 표에 두는 것이 정규화 원칙에도 맞습니다. 상품 가격이 바뀌어도 지난 주문 금액은 바뀌면 안 됩니다.',cost:'무엇이 같은 사실이고 무엇이 그 시점의 기록인지 설계할 때 업무를 정확히 이해해야 합니다. 이 구분을 놓치면 지난 영수증 금액이 바뀌는 사고가 납니다.'},
   {question:'그러면 왜 반정규화를 할까?',answer:'읽기가 쓰기보다 훨씬 많고 같은 조인을 계속 반복한다면, 결과를 미리 합쳐 두는 편이 빠릅니다. 집계 테이블, 머티리얼라이즈드 뷰, 검색용 문서가 모두 이런 선택입니다.',cost:'원본이 바뀔 때 사본도 갱신해야 하고 갱신이 늦거나 빠지면 둘이 어긋납니다. 어느 쪽이 원본인지 분명히 정해 둡니다.'}
  ],
  today:[
   '주문 항목 테이블에는 product_id와 함께 unit_price와 상품명 사본을 둡니다. 배송 테이블에도 그 시점의 배송 주소를 따로 저장합니다. 고객이 이사해도 지난 배송 기록은 그대로여야 합니다.',
   '목록 화면이 조인 때문에 느리다면 먼저 인덱스와 실행 계획을 보고 그래도 부족할 때 머티리얼라이즈드 뷰나 캐시처럼 원본을 그대로 두는 방법부터 검토합니다.',
   '같은 값을 여러 표에 복사해야 한다면 어느 표가 원본인지, 사본은 언제 무엇으로 갱신하는지를 코드나 문서에 적어 둡니다.'
  ],
  sources:[
   ['Codd, A Relational Model of Data for Large Shared Data Banks (CACM, 1970)','https://dl.acm.org/doi/10.1145/362384.362685'],
   ['Fagin, Multivalued Dependencies and a New Normal Form (TODS, 1977)','https://dl.acm.org/doi/10.1145/320557.320571'],
   ['Chen, The Entity-Relationship Model (TODS, 1976)','https://dl.acm.org/doi/10.1145/320434.320440'],
   ['Wikipedia · Third normal form','https://en.wikipedia.org/wiki/Third_normal_form'],
   ['Wikipedia · Boyce–Codd normal form','https://en.wikipedia.org/wiki/Boyce%E2%80%93Codd_normal_form']
  ]
 },
 join:{
  intro:'JOIN은 정규화의 짝입니다. 데이터를 여러 표로 나눠 두었으니 필요할 때 다시 합쳐야 합니다. 관계형 모델에서 조인은 처음부터 핵심 연산이었지만 일부 행이 짝을 못 찾을 때 어떻게 할지, 값이 없다는 것을 어떻게 표현할지는 오래 논쟁거리였습니다. LEFT JOIN에서 ON과 WHERE의 차이, NULL 비교가 헷갈리는 이유가 여기서 나옵니다.',
  timeline:[
   {year:'1970',title:'관계 대수의 조인',body:'코드는 1970년 논문에서 표를 다루는 연산을 정의했고 그중 하나가 두 관계를 공통 값으로 이어 붙이는 조인입니다. 수학적으로 조인은 두 표의 모든 조합 중 조건을 만족하는 것만 남기는 연산입니다. 그래서 한 고객에 주문이 세 개면 결과도 세 행이 됩니다.'},
   {year:'1970~1980년대',title:'조인을 빠르게 하는 방법',body:'DB가 조인을 실행하는 방법도 발전했습니다. 한쪽 행마다 다른 쪽을 찾는 중첩 루프, 두 쪽을 정렬해 나란히 훑는 정렬 병합, 한쪽으로 해시 표를 만들어 다른 쪽을 대조하는 해시 조인입니다. 옵티마이저는 표 크기와 인덱스를 보고 이 중 하나를 고르고 EXPLAIN에서 어떤 방법을 골랐는지 볼 수 있습니다.'},
   {year:'1970년대 중반',title:'SEQUEL에서 SQL로',body:'IBM의 체임벌린과 보이스는 관계 대수를 영어 문장처럼 쓸 수 있는 질의 언어 SEQUEL을 발표했습니다. 상표 문제로 이름이 SQL로 바뀌었고 1979년 지금의 Oracle인 Relational Software가 첫 상용 SQL 데이터베이스를 내놓았습니다. 초기 SQL에서는 조인 조건을 WHERE 절에 다른 필터와 섞어 썼습니다.'},
   {year:'1979~',title:'값이 없다는 것을 어떻게 적을까',body:'코드는 값이 아직 모르거나 해당되지 않는 경우를 나타내는 NULL을 관계형 모델에 넣었습니다. NULL이 들어간 비교는 참도 거짓도 아닌 알 수 없음이 되는 3값 논리가 함께 따라왔습니다. NULL = NULL조차 참이 아니라는 이 규칙은 지금도 가장 흔한 SQL 실수의 원인입니다.'},
   {year:'1992',title:'SQL-92의 명시적 JOIN',body:'짝이 없는 행도 남기는 외부 조인은 제품마다 문법이 달랐습니다. Oracle은 (+)를, Sybase와 SQL Server는 *=를 썼습니다. SQL-92 표준은 INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN과 ON 절을 정식 문법으로 만들어 조인 조건과 필터를 분리했습니다.'}
  ],
  decisions:[
   {question:'왜 값이 없을 때 0이나 빈 문자열 대신 NULL을 쓸까?',answer:'재고 0개와 재고를 모름은 다른 뜻입니다. 0이나 빈 문자열로 대신하면 실제로 0인 것과 구별할 수 없습니다. NULL은 값이 없다는 사실 자체를 표현합니다.',cost:'NULL이 섞이면 비교가 3값 논리가 됩니다. WHERE col = NULL은 아무 행도 돌려주지 않고 IS NULL을 써야 합니다. NOT IN 목록에 NULL이 하나라도 있으면 결과가 통째로 비는 함정도 있습니다.'},
   {question:'왜 LEFT JOIN에서는 ON과 WHERE가 다르게 동작할까?',answer:'ON은 짝을 찾는 조건이고 짝이 없어도 왼쪽 행은 NULL을 채워 남깁니다. WHERE는 조인이 끝난 결과를 거르는 조건입니다. 오른쪽 표의 조건을 WHERE에 쓰면 NULL로 채워진 행이 그 조건에서 걸러져 결국 INNER JOIN과 같아집니다.',cost:'SQL-92가 둘을 분리한 덕분에 정확히 표현할 수 있게 됐지만 그만큼 어느 절에 조건을 둘지 매번 의식해야 합니다.'},
   {question:'왜 조인하면 행 수가 늘어날까?',answer:'조인은 조건을 만족하는 모든 조합을 만드는 연산입니다. 고객 한 명에 주문이 셋이면 그 고객은 결과에 세 번 나옵니다. 관계형 모델이 표를 행의 집합으로 다루는 이상 자연스러운 결과입니다.',cost:'일대다 조인 결과에 SUM이나 COUNT를 하면 같은 값이 여러 번 더해집니다. 두 개 이상의 일대다 관계를 한 번에 조인하면 조합이 곱으로 늘어 금액이 몇 배로 부풀기도 합니다.'}
  ],
  today:[
   '주문하지 않은 고객까지 세려면 LEFT JOIN 뒤에 COUNT(*) 대신 COUNT(o.id)를 씁니다. COUNT(*)는 NULL로 채운 행도 1로 세기 때문입니다.',
   '주문이 하나도 없는 고객을 찾을 때는 LEFT JOIN ... WHERE o.id IS NULL이나 NOT EXISTS를 씁니다. NOT IN은 하위 질의에 NULL이 섞이면 결과가 비어 버릴 수 있습니다.',
   '합계가 이상하게 크다면 집계 전에 조인 결과의 행 수부터 확인합니다. 일대다 관계마다 먼저 집계한 뒤 조인하면 중복 합산을 피할 수 있습니다.'
  ],
  sources:[
   ['Codd, A Relational Model of Data for Large Shared Data Banks (CACM, 1970)','https://dl.acm.org/doi/10.1145/362384.362685'],
   ['Chamberlin & Boyce, SEQUEL: A Structured English Query Language','https://dl.acm.org/doi/10.1145/800296.811515'],
   ['Wikipedia · SQL-92','https://en.wikipedia.org/wiki/SQL-92'],
   ['Wikipedia · Oracle Database','https://en.wikipedia.org/wiki/Oracle_Database'],
   ['PostgreSQL · Joins Between Tables','https://www.postgresql.org/docs/current/tutorial-join.html'],
   ['PostgreSQL · Using EXPLAIN','https://www.postgresql.org/docs/current/using-explain.html']
  ]
 },
 'database-choice':{
  intro:'관계형 DB와 NoSQL은 서로 다른 시대의 문제에서 나왔습니다. 관계형 DB는 프로그램마다 데이터 구조를 따로 알아야 했던 불편을 없애려고 나왔고, NoSQL은 서버 한 대로 감당할 수 없는 규모의 웹 서비스에서 나왔습니다. 그리고 지난 15년 동안 둘은 서로의 장점을 빌려 오며 가까워졌습니다. 그래서 지금은 제품 이름보다 데이터를 어떻게 읽고 쓰는지가 선택 기준이 됩니다.',
  timeline:[
   {year:'1960년대',title:'계층형과 네트워크형',body:'IBM IMS 같은 계층형 DB와 CODASYL 표준의 네트워크형 DB는 데이터를 미리 정한 연결 구조로 저장했습니다. 정해진 경로로 읽는 것은 빨랐지만 새로운 질문을 하려면 프로그램을 새로 짜야 했습니다.'},
   {year:'1970~1979',title:'관계형의 등장과 상용화',body:'1970년 코드의 논문 이후 IBM의 System R과 버클리의 Ingres가 관계형 DB를 실제로 구현할 수 있음을 보였습니다. 1979년 첫 상용 SQL DB가 나왔고 이후 30년 동안 관계형 DB가 거의 모든 업무 시스템의 기본이 되었습니다.'},
   {year:'2000~2002',title:'CAP 정리',body:'에릭 브루어는 2000년 강연에서 네트워크가 끊길 수 있는 분산 시스템은 일관성과 가용성을 동시에 완전히 보장할 수 없다고 추측했습니다. 2002년 길버트와 린치가 이를 증명했습니다. 서버를 여러 대로 나누는 순간 무엇을 포기할지 골라야 한다는 뜻입니다.'},
   {year:'2006~2009',title:'Bigtable, Dynamo, 그리고 NoSQL',body:'구글은 2006년 Bigtable 논문을, 아마존은 2007년 Dynamo 논문을 발표했습니다. 둘 다 조인과 복잡한 트랜잭션을 포기하는 대신 수천 대 서버로 나눠 저장하고 장애에도 계속 응답하는 설계였습니다. 2009년 무렵 이런 시스템을 묶어 NoSQL이라고 부르기 시작했고 같은 해 MongoDB와 Redis가 나왔습니다.'},
   {year:'2012~2018',title:'다시 가까워지는 두 진영',body:'구글은 2012년 전 세계에 분산되면서도 SQL과 트랜잭션을 지원하는 Spanner를 발표했고 같은 해 아마존은 DynamoDB를 서비스로 내놓았습니다. 2014년 PostgreSQL 9.4는 JSON을 효율적으로 저장하는 jsonb를 넣었고 2018년 DynamoDB와 MongoDB는 여러 항목에 걸친 트랜잭션을 지원하기 시작했습니다.'}
  ],
  decisions:[
   {question:'관계형 DB는 왜 그렇게 오래 기본값이었을까?',answer:'SQL로 미리 생각하지 못한 질문도 할 수 있고, 외래 키와 유일 제약이 잘못된 데이터를 DB 단계에서 막아 주고, 트랜잭션이 여러 변경을 안전하게 묶어 줍니다. 대부분의 업무 시스템에 필요한 것이 바로 이것이었습니다.',cost:'서버 한 대의 한계를 넘어 쓰기를 여러 대로 나누기가 어렵습니다. 스키마를 바꿀 때 큰 테이블이면 이전 작업이 부담스럽습니다.'},
   {question:'NoSQL은 무엇을 얻으려고 무엇을 포기했을까?',answer:'데이터를 키로 쪼개 수많은 서버에 나누고 일부 서버가 죽어도 계속 응답하는 확장성과 가용성을 얻었습니다. 함께 읽는 데이터를 한 문서나 한 키에 모아 두면 조인 없이 빠르게 읽을 수 있습니다.',cost:'조인, 임의의 질의, 여러 항목에 걸친 제약을 DB가 덜 도와주므로 앱이 떠맡습니다. 특히 DynamoDB 같은 키값 저장소는 어떻게 읽을지를 미리 정하고 그에 맞춰 키를 설계해야 하고 나중에 새로운 질문이 생기면 대응하기 어렵습니다.'},
   {question:'둘이 가까워졌다면 무엇을 기준으로 고를까?',answer:'제품 범주보다 대표적인 읽기·쓰기 패턴, 트랜잭션이 필요한 범위, 예상 규모, 팀의 운영 경험이 중요합니다. 관계형 DB에도 JSON 컬럼이 있고 NoSQL에도 트랜잭션이 있으니 무엇을 기본으로 두고 무엇을 덧붙일지의 문제입니다.',cost:'여러 저장소를 섞어 쓰면 각각을 운영하고 백업하고 데이터를 맞추는 비용이 늘어납니다. 하나로 충분한데 늘리지 않도록 주의합니다.'}
  ],
  today:[
   '새 서비스에서 특별한 이유가 없다면 PostgreSQL 같은 관계형 DB로 시작하고 형태가 자주 바뀌는 부분은 jsonb 컬럼에 둡니다. 실제 병목이 확인된 뒤 일부를 다른 저장소로 옮겨도 늦지 않습니다.',
   '장바구니, 세션, 조회수처럼 키 하나로 읽고 쓰며 잠깐 틀려도 되는 데이터는 Redis나 DynamoDB가 잘 맞습니다. 주문과 결제처럼 여러 행을 함께 맞춰야 하는 데이터는 관계형 DB의 트랜잭션이 편합니다.',
   'DynamoDB를 고른다면 화면과 API가 어떤 키로 데이터를 읽을지 먼저 목록으로 적고 그에 맞춰 파티션 키와 정렬 키를 설계합니다.'
  ],
  sources:[
   ['Codd, A Relational Model of Data for Large Shared Data Banks (CACM, 1970)','https://dl.acm.org/doi/10.1145/362384.362685'],
   ['Gilbert & Lynch, Brewer\'s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services (2002)','https://dl.acm.org/doi/10.1145/564585.564601'],
   ['Google · Bigtable (OSDI, 2006)','https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/'],
   ['DeCandia et al., Dynamo: Amazon\'s Highly Available Key-value Store (SOSP, 2007)','https://dl.acm.org/doi/10.1145/1294261.1294281'],
   ['Google · Spanner (OSDI, 2012)','https://research.google/pubs/spanner-googles-globally-distributed-database-2/'],
   ['AWS Blog · Amazon DynamoDB (2012)','https://aws.amazon.com/blogs/aws/amazon-dynamodb-internet-scale-data-storage-the-nosql-way/'],
   ['AWS Blog · Amazon DynamoDB Transactions (2018)','https://aws.amazon.com/blogs/aws/new-amazon-dynamodb-transactions/'],
   ['PostgreSQL 9.4 Release Notes (jsonb)','https://www.postgresql.org/docs/release/9.4.0/'],
   ['Wikipedia · NoSQL','https://en.wikipedia.org/wiki/NoSQL']
  ]
 },
 session:{
  intro:'로그인은 컴퓨터를 여러 사람이 나눠 쓰면서 시작됐고 웹에서는 기억하지 못하는 HTTP 위에 기억을 덧대면서 복잡해졌습니다. 비밀번호, 세션, 토큰은 각각 그 시점의 문제를 풀려고 나왔고 공격이 하나 알려질 때마다 쿠키 속성과 표준이 하나씩 늘었습니다. 인증과 인가를 나눠 생각해야 하는 이유, JWT가 세션을 그냥 대신할 수 없는 이유가 이 흐름에 있습니다.',
  timeline:[
   {year:'1961',title:'첫 비밀번호',body:'MIT의 CTSS는 여러 사용자가 한 컴퓨터를 나눠 쓰면서 각자의 파일과 사용 시간을 구분하려고 사용자마다 비밀번호를 두었습니다. 컴퓨터 로그인의 시작으로 꼽힙니다. 당시 비밀번호는 평문 파일에 저장되어 있었습니다.'},
   {year:'1979',title:'해시와 솔트',body:'로버트 모리스와 켄 톰프슨은 1979년 논문 「비밀번호 보안: 사례 연구」에서 유닉스가 비밀번호를 그대로 저장하지 않고 일방향 함수의 결과만 저장하는 방식과, 사용자마다 무작위 값(솔트)을 섞어 같은 비밀번호라도 다른 결과가 나오게 하는 방법을 정리했습니다. 저장된 값이 새어 나가도 원래 비밀번호를 바로 알 수 없게 한 것입니다.'},
   {year:'1994~2002',title:'쿠키 속 세션 ID',body:'1994년 쿠키가 생기자 서버는 로그인한 사용자에게 무작위 세션 ID를 쿠키로 주고 서버 쪽에 그 ID의 사용자 정보를 저장했습니다. 곧 페이지에 심은 스크립트로 쿠키를 훔치는 공격이 퍼졌고 2002년 무렵 마이크로소프트가 IE6 SP1에 스크립트가 쿠키를 읽지 못하게 하는 HttpOnly 속성을 넣었습니다.'},
   {year:'2012~2015',title:'OAuth 2.0, OpenID Connect, JWT',body:'다른 서비스에 내 비밀번호를 주지 않고 권한만 위임하는 OAuth 2.0이 2012년 RFC 6749로 표준이 되었습니다. 2014년 OpenID Connect가 그 위에 로그인(신원 확인)을 얹었고 2015년 RFC 7519가 서명된 클레임 묶음인 JWT를 정의했습니다. 같은 해 여러 JWT 라이브러리가 서명 알고리즘을 none으로 바꾼 토큰을 그대로 믿는 취약점이 공개됐습니다.'},
   {year:'2017',title:'비밀번호 규칙의 재검토',body:'미국 NIST의 SP 800-63B는 정기적인 비밀번호 강제 변경을 요구하지 말라고 권고했습니다. 사용자가 규칙에 맞춰 뻔한 변형만 만들기 때문입니다. 대신 이미 유출된 비밀번호 목록과 대조하고 침해 흔적이 있을 때만 바꾸게 하라고 했습니다.'},
   {year:'2019~2020',title:'SameSite와 패스키',body:'2019년 3월 공개키로 로그인하는 WebAuthn이 W3C 권고안이 되었고 지금의 패스키가 이 위에 있습니다. 2020년 Chrome 80부터는 SameSite 속성이 없는 쿠키를 Lax로 취급해 다른 사이트에서 보낸 요청에 쿠키가 자동으로 붙지 않게 했습니다.'}
  ],
  decisions:[
   {question:'왜 인증과 인가를 나눠 생각할까?',answer:'누구인지 확인하는 일과 그 사람이 이 주문을 볼 수 있는지 판단하는 일은 다른 질문입니다. 로그인은 한 번 하지만 권한 검사는 요청마다, 데이터마다 해야 합니다. 둘을 섞으면 로그인만 하면 다 볼 수 있는 시스템이 되기 쉽습니다.',cost:'모든 API에서 권한을 따로 검사하는 코드가 필요합니다. 빠뜨린 곳 하나가 접근 제어 실패 취약점이 됩니다.'},
   {question:'세션과 JWT는 무엇을 맞바꾼 것일까?',answer:'세션은 서버에 상태를 두므로 언제든 지워서 즉시 로그아웃시킬 수 있습니다. JWT는 서명만 확인하면 되므로 서버가 저장소를 조회하지 않아도 되고 여러 서비스가 같은 토큰을 검증할 수 있습니다.',cost:'JWT는 만료 전에 무효화하기 어렵습니다. 그래서 수명을 짧게 하고 갱신 토큰을 따로 두거나, 결국 차단 목록을 서버에 두게 됩니다. 본문은 암호화가 아니라 인코딩이라 누구나 읽을 수 있으니 비밀을 넣으면 안 됩니다.'},
   {question:'왜 비밀번호를 느린 해시로 저장할까?',answer:'DB는 언젠가 유출될 수 있다는 전제로 설계합니다. 해시를 저장하면 원래 비밀번호를 바로 알 수 없고, 솔트를 섞으면 미리 계산한 표로 한꺼번에 풀 수 없으며, 일부러 느린 함수를 쓰면 하나하나 대입해 보는 비용이 커집니다.',cost:'로그인 한 번에 수십에서 수백 밀리초의 계산이 듭니다. 너무 느리게 설정하면 로그인 요청이 몰릴 때 서버 부담이 커지므로 작업 인자를 측정해서 정합니다.'}
  ],
  today:[
   '세션 쿠키에는 HttpOnly, Secure, SameSite=Lax를 기본으로 붙입니다. 스크립트가 읽지 못하고, HTTPS로만 가고, 다른 사이트의 요청에는 붙지 않게 하는 것입니다.',
   'JWT를 검증할 때는 허용할 알고리즘을 서버에서 고정하고 서명, 만료 시각(exp), 발급자(iss), 대상(aud)을 모두 확인합니다. 토큰이 말하는 알고리즘을 그대로 믿으면 안 됩니다.',
   'Python에서 비밀번호는 argon2-cffi나 bcrypt 같은 전용 라이브러리로 저장합니다. hashlib.sha256 한 번으로는 너무 빨라서 대입 공격을 막지 못합니다. 세션 ID 같은 무작위 값은 random이 아니라 secrets 모듈로 만듭니다.'
  ],
  sources:[
   ['Morris & Thompson, Password Security: A Case History (CACM, 1979)','https://dl.acm.org/doi/10.1145/359168.359172'],
   ['OWASP · HttpOnly','https://owasp.org/www-community/HttpOnly'],
   ['RFC 6749 · The OAuth 2.0 Authorization Framework','https://www.rfc-editor.org/rfc/rfc6749'],
   ['OpenID Connect Core 1.0','https://openid.net/specs/openid-connect-core-1_0.html'],
   ['RFC 7519 · JSON Web Token (JWT)','https://www.rfc-editor.org/rfc/rfc7519'],
   ['Auth0 · Critical vulnerabilities in JSON Web Token libraries (2015)','https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/'],
   ['NIST SP 800-63B · Digital Identity Guidelines','https://pages.nist.gov/800-63-3/sp800-63b.html'],
   ['W3C · Web Authentication Level 1 (2019)','https://www.w3.org/TR/webauthn-1/'],
   ['Chromium · SameSite Updates','https://www.chromium.org/updates/same-site/'],
   ['OWASP · Password Storage Cheat Sheet','https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html']
  ]
 },
 cors:{
  intro:'CORS와 CSRF는 같은 뿌리에서 나온 두 갈래입니다. 웹은 처음부터 다른 사이트의 이미지와 폼을 자유롭게 섞어 쓰도록 만들어졌고 브라우저는 여러 사이트의 쿠키를 한꺼번에 들고 다닙니다. 동일 출처 정책은 남의 응답을 읽는 것은 막았지만 요청을 보내는 것까지 막지는 않았습니다. 그 틈에서 CSRF가 생겼고, 반대로 정당하게 다른 출처의 응답을 읽어야 하는 요구에서 CORS가 나왔습니다.',
  timeline:[
   {year:'1995',title:'동일 출처 정책',body:'넷스케이프는 자바스크립트를 도입하면서 한 출처의 스크립트가 다른 출처의 문서와 응답을 읽지 못하게 했습니다. 출처는 스킴, 호스트, 포트의 조합입니다. 다만 이미 웹에서 흔하던 다른 사이트의 이미지 불러오기나 다른 사이트로 폼 보내기는 그대로 허용했습니다.'},
   {year:'2001',title:'CSRF라는 이름',body:'2001년 무렵부터 사용자가 로그인해 둔 사이트로, 다른 사이트가 몰래 요청을 보내게 하는 공격이 보고되고 CSRF라는 이름을 얻었습니다. 공격 사이트에 숨겨 둔 폼이 은행 사이트로 송금 요청을 보내면 브라우저는 은행 쿠키를 자동으로 붙여 보냅니다. 응답은 읽지 못해도 요청 자체가 피해를 만듭니다.'},
   {year:'2005',title:'JSONP라는 우회로',body:'Ajax가 퍼지면서 다른 도메인의 API 데이터를 읽고 싶은 요구가 커졌습니다. 2005년 밥 이폴리토가 제안한 JSONP는 script 태그는 다른 출처도 불러올 수 있다는 점을 이용해 데이터를 함수 호출로 감싸 받는 꼼수였습니다. GET만 되고 상대 서버가 보낸 스크립트를 통째로 실행해야 하는 위험이 있었습니다.'},
   {year:'2006~2014',title:'CORS 표준',body:'이 꼼수 대신 서버가 이 출처는 내 응답을 읽어도 된다고 헤더로 허락하는 방식이 논의되기 시작했고 2014년 1월 W3C 권고안이 되었습니다. 지금은 WHATWG Fetch 표준의 일부입니다. 오래된 서버를 보호하려고 브라우저가 예전에는 다른 출처로 보낼 수 없던 종류의 요청은 실제 요청 전에 OPTIONS로 먼저 묻는 preflight를 하게 했습니다.'},
   {year:'2016~2020',title:'SameSite 쿠키',body:'CSRF의 근본 원인인 쿠키의 자동 전송을 쿠키 쪽에서 막는 SameSite 속성이 2016년 무렵부터 브라우저에 들어왔습니다. 2020년 Chrome 80은 이 속성이 없는 쿠키를 Lax로 다루기 시작해, 다른 사이트에서 시작된 POST 요청에는 쿠키가 붙지 않게 했습니다.'}
  ],
  decisions:[
   {question:'동일 출처 정책은 왜 요청은 막지 않고 응답 읽기만 막을까?',answer:'다른 사이트의 이미지, 스크립트, 폼 전송은 동일 출처 정책이 생기기 전부터 웹의 기본 동작이었습니다. 이것까지 막으면 수많은 사이트가 깨집니다. 그래서 새로 생긴 위험, 즉 스크립트가 남의 데이터를 읽어 가는 것만 막았습니다.',cost:'요청을 보내는 것은 여전히 가능하므로 상태를 바꾸는 요청은 서버가 CSRF를 따로 막아야 합니다. CORS 설정만으로는 이 공격이 막히지 않습니다.'},
   {question:'왜 어떤 요청은 preflight를 먼저 보낼까?',answer:'CORS 이전의 서버들은 브라우저가 다른 출처에서 PUT이나 JSON 본문, 사용자 정의 헤더가 달린 요청을 보낼 수 없다고 가정하고 만들어졌습니다. 그 가정을 깨지 않으려고 이런 요청은 서버가 허락하는지 먼저 OPTIONS로 묻습니다.',cost:'요청 한 번에 왕복이 하나 더 생깁니다. Access-Control-Max-Age로 preflight 결과를 캐시해 줄일 수 있습니다.'},
   {question:'왜 CORS를 인증이나 방화벽처럼 쓰면 안 될까?',answer:'CORS는 브라우저가 지키는 규칙입니다. curl이나 서버 프로그램은 CORS 헤더를 신경 쓰지 않고 요청을 보내고 응답을 읽습니다. CORS는 사용자의 브라우저에서 다른 사이트의 스크립트가 내 응답을 읽는 것을 허락하거나 막을 뿐입니다.',cost:'API 보호는 인증과 권한 검사로 따로 해야 합니다. Access-Control-Allow-Origin: *에 자격 증명을 함께 허용하는 식의 설정은 브라우저가 거부하므로 허용할 출처를 명시해야 합니다.'}
  ],
  today:[
   '쿠키로 로그인하는 서비스는 SameSite=Lax 쿠키에 더해, 상태를 바꾸는 요청마다 CSRF 토큰을 확인하거나 Origin 헤더가 내 사이트인지 검사합니다. 대부분의 웹 프레임워크가 이 기능을 기본 제공합니다.',
   'FastAPI나 Flask에서 CORS를 열 때 allow_origins=["*"]로 두지 말고 실제 프런트엔드 주소만 적습니다. 쿠키를 보내야 하면 allow_credentials를 켜고 출처를 명시해야 합니다.',
   '개발 중 CORS 오류는 대개 프런트와 API의 포트가 달라 출처가 달라졌기 때문입니다. 개발 서버의 프록시 기능으로 같은 출처처럼 만들면 운영 설정과 섞이지 않습니다.'
  ],
  sources:[
   ['MDN · Same-origin policy','https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy'],
   ['MDN · Cross-Origin Resource Sharing (CORS)','https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS'],
   ['W3C · Cross-Origin Resource Sharing (Recommendation, 2014)','https://www.w3.org/TR/2014/REC-cors-20140116/'],
   ['WHATWG · Fetch Standard','https://fetch.spec.whatwg.org/'],
   ['OWASP · CSRF Prevention Cheat Sheet','https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html'],
   ['Chromium · SameSite Updates','https://www.chromium.org/updates/same-site/'],
   ['Wikipedia · Cross-site request forgery','https://en.wikipedia.org/wiki/Cross-site_request_forgery'],
   ['Wikipedia · JSONP','https://en.wikipedia.org/wiki/JSONP']
  ]
 },
 iam:{
  intro:'누가 무엇을 할 수 있는지 정하는 문제는 시분할 컴퓨터 시절부터 있었습니다. 처음에는 사용자와 파일의 문제였고, 조직이 커지면서 역할의 문제가 되었고, 클라우드에서는 사람보다 프로그램이 더 많은 권한을 쥐는 문제가 되었습니다. 클라우드 IAM이 역할과 임시 자격 증명을 권하는 이유는 오래된 원칙에 실제 사고의 교훈이 더해진 결과입니다.',
  timeline:[
   {year:'1971~1975',title:'접근 행렬과 최소 권한',body:'버틀러 램슨은 1971년 「보호」에서 주체와 객체를 행과 열로 놓고 칸마다 허용된 동작을 적는 접근 행렬로 권한을 설명했습니다. 1975년 솔처와 슈뢰더는 모든 주체가 일에 필요한 만큼의 권한만 가져야 한다는 최소 권한의 원칙을 정리했습니다. 지금의 IAM 정책도 결국 이 행렬의 칸을 채우는 일입니다.'},
   {year:'1992',title:'역할 기반 접근 제어',body:'사람마다 권한을 하나하나 주면 직원이 수천 명인 조직에서는 관리가 불가능합니다. 1992년 NIST의 페라이올로와 쿤은 권한을 역할에 붙이고 사람에게는 역할을 주는 역할 기반 접근 제어(RBAC)를 제안했습니다. 부서를 옮기면 역할만 바꾸면 됩니다.'},
   {year:'2011~2012',title:'AWS IAM과 인스턴스 역할',body:'클라우드 초기에는 계정의 루트 키 하나로 모든 API를 불렀습니다. 2011년 정식 출시된 AWS IAM은 사용자와 그룹, 정책으로 권한을 나눴고 2012년 6월에는 EC2 인스턴스에 역할을 붙여 키를 코드에 넣지 않고도 자동으로 교체되는 임시 자격 증명을 받게 했습니다.'},
   {year:'2014',title:'경계보다 신원',body:'구글은 2014년 BeyondCorp 논문에서 사내망 안에 있으면 믿는다는 방식을 버리고 요청마다 사용자와 기기의 신원과 상태를 확인하는 방식을 소개했습니다. 네트워크 위치가 아니라 신원과 권한으로 접근을 정하는 제로 트러스트의 대표 사례입니다.'},
   {year:'2019',title:'메타데이터와 과한 권한',body:'2019년에는 웹 앱의 SSRF 취약점으로 서버가 EC2 메타데이터 주소에 요청하게 만든 뒤, 인스턴스 역할의 임시 자격 증명을 빼내 대량의 데이터에 접근한 사고들이 알려졌습니다. AWS는 2019년 11월 세션 토큰을 먼저 받아야 하는 IMDSv2를 내놓았습니다. 역할에 필요 이상의 권한이 있으면 키를 안 써도 피해가 커진다는 교훈입니다.'}
  ],
  decisions:[
   {question:'왜 오래 쓰는 접근 키 대신 역할과 임시 자격 증명을 쓸까?',answer:'코드나 설정 파일에 넣은 접근 키는 저장소에 올라가거나 로그에 찍혀 새어 나가기 쉽고 한 번 새면 누가 지울 때까지 계속 유효합니다. 역할은 실행 환경이 자동으로 짧은 수명의 자격 증명을 받고 주기적으로 바꾸므로 새어 나가도 피해 시간이 짧습니다.',cost:'로컬 개발 환경에서는 역할을 쓰기 어려워 별도의 로그인 절차(SSO 같은)가 필요합니다. 자격 증명이 어디서 오는지 이해해야 문제를 진단할 수 있습니다.'},
   {question:'왜 기본은 거부이고 명시적 거부가 허용보다 셀까?',answer:'AWS 정책 평가는 아무 정책도 허용하지 않으면 거부하고 어디선가 명시적으로 거부하면 다른 곳의 허용보다 우선합니다. 실수로 권한을 빠뜨리면 기능이 안 될 뿐이지만, 실수로 권한을 더 주면 사고가 나기 때문입니다.',cost:'처음 설정할 때 AccessDenied를 자주 만납니다. 필요한 동작을 하나씩 찾아 추가하는 수고가 들고 귀찮아서 *를 주고 싶은 유혹이 생깁니다.'},
   {question:'보안 그룹이 있는데 왜 IAM도 필요할까?',answer:'보안 그룹은 어느 주소와 포트로 연결할 수 있는지를, IAM은 서비스 API에 어떤 작업을 할 수 있는지를 다룹니다. S3나 DynamoDB 같은 서비스는 네트워크 위치와 상관없이 API로 접근하므로 IAM이 없으면 막을 방법이 없습니다.',cost:'두 체계를 함께 설계하고 따로 점검해야 합니다. 하나만 맞추고 다른 하나를 열어 두면 그쪽이 구멍이 됩니다.'}
  ],
  today:[
   'S3 버킷 하나에서 파일을 읽기만 하는 앱이라면 정책에 s3:GetObject와 그 버킷의 경로만 적습니다. AdministratorAccess나 s3:*는 편하지만 앱이 뚫리면 계정 전체가 위험해집니다.',
   'EC2에서는 IMDSv2만 허용하도록 설정하고 ECS나 Lambda에서는 작업이나 함수마다 다른 역할을 줍니다. 서비스마다 역할을 나누면 한 곳이 뚫려도 다른 곳은 안전합니다.',
   '사람 계정은 루트 대신 SSO로 로그인하고 MFA를 켭니다. Python 코드에서는 boto3가 환경의 역할 자격 증명을 자동으로 찾으니 코드에 키를 적지 않습니다.'
  ],
  sources:[
   ['Lampson, Protection (1971, reprinted in SIGOPS OSR 1974)','https://dl.acm.org/doi/10.1145/775265.775268'],
   ['Saltzer & Schroeder, The Protection of Information in Computer Systems (1975)','https://www.cs.virginia.edu/~evans/cs551/saltzer/'],
   ['Ferraiolo & Kuhn, Role-Based Access Controls (NIST, 1992)','https://csrc.nist.gov/pubs/conference/1992/10/13/rolebased-access-controls/final'],
   ['AWS Blog · IAM roles for EC2 instances (2012)','https://aws.amazon.com/blogs/aws/iam-roles-for-ec2-instances-simplified-secure-access-to-aws-service-apis-from-ec2/'],
   ['Google · BeyondCorp: A New Approach to Enterprise Security (2014)','https://research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security/'],
   ['AWS Security Blog · Defense in depth: SSRF and EC2 instance metadata (2019)','https://aws.amazon.com/blogs/security/defense-in-depth-open-firewalls-reverse-proxies-ssrf-vulnerabilities-ec2-instance-metadata-service/'],
   ['AWS · Configure the instance metadata service (IMDSv2)','https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html'],
   ['AWS · IAM policy evaluation logic','https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html'],
   ['AWS · Security best practices in IAM','https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html']
  ]
 },
 validation:{
  intro:'입력 검증의 역사는 프로그램이 받은 데이터를 명령으로 착각한 사고의 역사입니다. 길이를 확인하지 않은 입력이 메모리를 덮어썼고, 문자열로 이어 붙인 입력이 SQL 명령이 되었습니다. 비밀번호와 키를 다루는 방식도 유출 사고가 반복되면서 바뀌었습니다. 결론은 늘 같습니다. 데이터와 코드를 섞지 말고, 비밀은 코드 밖에 두라는 것입니다.',
  timeline:[
   {year:'1988',title:'모리스 웜',body:'1988년 11월 모리스 웜은 당시 인터넷에 연결된 컴퓨터 상당수를 감염시켰습니다. 사용한 구멍 중 하나가 finger 서비스의 버퍼 오버플로였습니다. 입력의 길이를 확인하지 않아 정해진 공간을 넘어선 데이터가 프로그램의 실행 흐름을 바꿨습니다. 입력을 믿으면 안 된다는 교훈이 인터넷 전체에 각인된 사건입니다.'},
   {year:'1998',title:'SQL 삽입의 공개',body:'1998년 해커 잡지 Phrack에 웹 애플리케이션이 사용자 입력을 SQL 문자열에 그대로 이어 붙이면 입력으로 SQL 명령을 끼워 넣을 수 있다는 글이 실렸습니다. SQL 삽입이 널리 알려진 출발점입니다. 따옴표 하나로 질의의 구조가 바뀌는 문제였습니다.'},
   {year:'1999~2015',title:'느린 해시의 계보',body:'1999년 프로보스와 마지에르는 컴퓨터가 빨라지면 작업량을 늘릴 수 있는 비밀번호 해시 bcrypt를 발표했습니다. 2009년 메모리까지 많이 쓰게 해 전용 하드웨어 공격을 어렵게 한 scrypt가 나왔고 2015년 공개 경진 대회인 Password Hashing Competition에서 Argon2가 우승했습니다. OWASP는 지금 Argon2id를 먼저 권합니다.'},
   {year:'2003~',title:'OWASP Top 10',body:'2003년 OWASP가 처음 Top 10을 발표한 이래 삽입 공격은 거의 매번 상위권에 있었습니다. 2021년판에서는 XSS까지 삽입 항목으로 묶여 3위에 올랐습니다. 수십 년 된 공격이 여전히 흔한 이유는 문자열을 이어 붙이는 코드가 여전히 쉽게 쓰이기 때문입니다.'},
   {year:'2010년대~',title:'저장소에 남은 비밀',body:'코드 저장소가 공개되는 일이 늘면서 커밋에 섞여 들어간 클라우드 키가 몇 분 만에 악용되는 사고가 반복되었습니다. GitHub는 커밋에서 알려진 형식의 키를 찾아 알리는 비밀 스캐닝을 도입했고 이후 푸시 단계에서 막는 기능까지 더했습니다. 한 번 커밋된 비밀은 지워도 기록에 남는다는 점이 문제의 핵심입니다.'}
  ],
  decisions:[
   {question:'왜 SQL에 값을 이어 붙이지 말고 파라미터로 넘길까?',answer:'문자열을 이어 붙이면 DB는 사용자 입력과 개발자가 쓴 명령을 구별할 수 없습니다. 파라미터로 넘기면 DB가 먼저 질의의 구조를 해석하고 값은 나중에 값으로만 끼워 넣으므로, 입력에 따옴표나 SQL 명령이 들어 있어도 구조가 바뀌지 않습니다.',cost:'테이블 이름이나 정렬 컬럼처럼 질의 구조 자체를 바꾸는 부분은 파라미터로 넘길 수 없습니다. 이런 곳은 허용 목록에서 고른 값만 쓰도록 따로 막아야 합니다.'},
   {question:'왜 나쁜 입력을 거르기보다 좋은 입력만 받으라고 할까?',answer:'위험한 문자나 단어를 막는 차단 목록은 공격자가 인코딩이나 대소문자를 바꾸는 식으로 언제든 우회할 수 있습니다. 허용할 형식, 타입, 길이, 값의 범위를 정해 그 밖은 모두 거부하면 생각하지 못한 공격도 막힙니다.',cost:'정상적인 입력의 범위를 정확히 정의해야 합니다. 이름에 하이픈이나 외국 문자가 들어가는 경우처럼 너무 좁게 잡으면 정상 사용자가 막힙니다.'},
   {question:'왜 비밀 키를 코드나 저장소에 두면 안 될까?',answer:'코드는 여러 사람과 시스템에 복사되고 저장소의 기록은 영원히 남습니다. 비밀을 코드 밖의 비밀 관리 서비스나 실행 환경에 두면 코드를 공유해도 비밀은 퍼지지 않고 새어 나갔을 때 코드 수정 없이 비밀만 바꿀 수 있습니다.',cost:'비밀을 어디서 어떻게 주입할지, 로컬 개발에서는 어떻게 쓸지 구성이 필요합니다. 이미 커밋된 비밀은 기록을 지우는 것보다 즉시 폐기하고 새로 발급하는 것이 먼저입니다.'}
  ],
  today:[
   'Python의 sqlite3나 psycopg에서 cursor.execute("SELECT * FROM users WHERE email = ?", (email,))처럼 자리 표시자를 씁니다. f-string으로 SQL을 만들지 않습니다.',
   '요청 본문은 Pydantic 같은 스키마로 타입, 길이, 허용 값을 먼저 검증하고 그다음 이 사용자가 이 자원에 접근할 수 있는지 권한을 따로 확인합니다.',
   '.env 파일은 .gitignore에 넣고 운영 환경에서는 AWS Secrets Manager 같은 비밀 관리 서비스나 플랫폼의 환경 변수를 씁니다. 실수로 커밋했다면 바로 키를 폐기합니다.'
  ],
  sources:[
   ['Wikipedia · Morris worm','https://en.wikipedia.org/wiki/Morris_worm'],
   ['Wikipedia · SQL injection','https://en.wikipedia.org/wiki/SQL_injection'],
   ['Provos & Mazières, A Future-Adaptable Password Scheme (USENIX, 1999)','https://www.usenix.org/legacy/events/usenix99/provos.html'],
   ['Password Hashing Competition','https://www.password-hashing.net/'],
   ['OWASP Top Ten','https://owasp.org/www-project-top-ten/'],
   ['OWASP · Query Parameterization Cheat Sheet','https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html'],
   ['OWASP · Password Storage Cheat Sheet','https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html'],
   ['GitHub Docs · About secret scanning','https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning'],
   ['Python · sqlite3','https://docs.python.org/3/library/sqlite3.html']
  ]
 },
 vpc:{
  intro:'VPC는 회사 전산실에서 오래 써 온 네트워크 설계를 클라우드로 옮겨 온 것입니다. 사내망을 구역으로 나누고 외부에 보일 서버와 숨길 서버를 구분하던 방식이 있었고, 초기 클라우드는 오히려 모든 서버가 한 공용 네트워크에 놓이는 단순한 구조였습니다. 고객들이 자기 네트워크를 원하면서 VPC가 생겼고 공개와 비공개를 이름이 아니라 경로로 정하는 지금의 방식이 자리 잡았습니다.',
  timeline:[
   {year:'1990년대',title:'사내망과 DMZ',body:'기업들은 사내망을 구역으로 나누고 외부에 공개할 웹 서버만 방화벽 사이의 DMZ라는 구역에 두었습니다. 1998년 IEEE 802.1Q 표준은 스위치 하나 위에서 여러 개의 논리적인 네트워크(VLAN)를 나누는 방법을 정했습니다. 물리적인 선이 아니라 설정으로 네트워크를 나누는 생각의 출발점입니다.'},
   {year:'1993~1996',title:'CIDR과 사설 대역',body:'1993년 CIDR은 주소를 /24, /16처럼 필요한 크기만큼 자르는 표기와 할당 방식을 도입했습니다. 1996년 RFC 1918은 10.0.0.0/8 같은 사설 대역을 정했습니다. 지금 VPC를 만들 때 적는 10.0.0.0/16과 서브넷의 10.0.1.0/24가 이 두 규칙 위에 있습니다.'},
   {year:'2006',title:'모두가 한 네트워크에',body:'2006년 8월 베타로 시작한 EC2에서는 모든 고객의 인스턴스가 아마존이 관리하는 하나의 넓은 네트워크에 놓였습니다. 나중에 EC2-Classic이라 불린 방식입니다. 주소를 고를 수 없었고 보안 그룹만으로 서버를 보호했습니다. 회사 전산실처럼 구역을 나누고 싶은 기업에게는 부족했습니다.'},
   {year:'2009~2013',title:'VPC의 등장과 기본값',body:'2009년 8월 아마존은 고객이 직접 주소 범위를 정하고 서브넷과 경로를 구성하는 VPC를 내놓았습니다. 처음에는 회사 데이터센터와 VPN으로 잇는 용도가 중심이었습니다. 2013년 12월부터 새 계정은 VPC만 쓸 수 있게 되었고 EC2-Classic은 2023년에 완전히 종료됐습니다.'},
   {year:'2015',title:'관리형 NAT 게이트웨이',body:'사설 서브넷의 서버가 인터넷으로 나가려면 NAT가 필요한데, 예전에는 NAT용 인스턴스를 직접 띄우고 관리해야 했습니다. 2015년 12월 AWS는 관리형 NAT 게이트웨이를 내놓아 이 일을 서비스로 바꿨습니다. 공개 서브넷에 NAT를 두고 사설 서브넷의 기본 경로를 거기로 보내는 지금의 표준 구성이 이렇게 완성됐습니다.'}
  ],
  decisions:[
   {question:'왜 같은 하드웨어 위에서 고객마다 논리적인 네트워크를 따로 줄까?',answer:'클라우드에서는 여러 고객이 같은 물리 장비를 씁니다. 고객마다 독립된 주소 공간과 경로표를 주면 다른 고객의 서버와 섞이지 않고 회사 내부망과 같은 주소 체계로 설계해 VPN으로 이을 수도 있습니다.',cost:'주소 범위와 서브넷, 경로를 처음부터 직접 설계해야 합니다. 나중에 다른 VPC나 사내망과 이을 때 범위가 겹치면 바꾸기가 매우 어렵습니다.'},
   {question:'공개 서브넷과 사설 서브넷은 무엇이 다를까?',answer:'서브넷 이름에 public이라고 적는다고 공개되지 않습니다. 그 서브넷의 경로표에 인터넷 게이트웨이로 가는 경로가 있고 인스턴스에 공인 주소가 있어야 인터넷과 직접 통신할 수 있습니다. 경로가 NAT로 가면 밖으로 나갈 수만 있고 밖에서 먼저 들어올 수는 없습니다.',cost:'공개 여부를 경로표, 주소, 보안 그룹, 네트워크 ACL을 함께 봐야 판단할 수 있습니다. 하나만 보고 안심하면 구멍을 놓칩니다.'},
   {question:'왜 /24 서브넷에서 256개를 다 쓰지 못할까?',answer:'AWS는 서브넷마다 처음 네 개와 마지막 한 개 주소를 예약합니다. 네트워크 주소, VPC 라우터, DNS, 예비용, 브로드캐스트 주소입니다. 그래서 /24에서는 251개만 쓸 수 있습니다.',cost:'작은 서브넷을 잘게 많이 나누면 예약 주소 비율이 커지고 오토스케일링이나 컨테이너처럼 주소를 많이 쓰는 구성에서 금방 모자랄 수 있습니다.'}
  ],
  today:[
   '흔한 3계층 구성은 로드 밸런서를 공개 서브넷에, 앱 서버와 DB를 사설 서브넷에 두고 가용 영역 두 곳 이상에 같은 구성을 반복합니다. DB 보안 그룹은 앱 서버의 보안 그룹에서 오는 연결만 허용합니다.',
   '보안 그룹은 상태를 기억해 나간 요청의 응답을 자동으로 허용하고, 네트워크 ACL은 상태를 기억하지 않아 들어오고 나가는 규칙을 모두 적어야 합니다. 보통 보안 그룹을 주로 쓰고 ACL은 넓은 차단에만 씁니다.',
   '사설 서브넷에서 S3를 많이 쓴다면 NAT 게이트웨이를 거치지 말고 S3용 VPC 엔드포인트를 둡니다. NAT 데이터 처리 비용이 줄고 트래픽이 인터넷으로 나가지 않습니다.'
  ],
  sources:[
   ['AWS Blog · Introducing Amazon Virtual Private Cloud (2009)','https://aws.amazon.com/blogs/aws/introducing-amazon-virtual-private-cloud-vpc/'],
   ['AWS Blog · EC2-Classic Networking is Retiring','https://aws.amazon.com/blogs/aws/ec2-classic-is-retiring-heres-how-to-prepare/'],
   ['AWS Blog · New Managed NAT Gateway (2015)','https://aws.amazon.com/blogs/aws/new-managed-nat-network-address-translation-gateway-for-aws/'],
   ['AWS · Subnet CIDR blocks (reserved addresses)','https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html'],
   ['AWS · Security groups','https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html'],
   ['AWS · Network ACLs','https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html'],
   ['AWS · Gateway endpoints for Amazon S3','https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html'],
   ['RFC 1519 · CIDR','https://www.rfc-editor.org/rfc/rfc1519'],
   ['RFC 1918 · Address Allocation for Private Internets','https://www.rfc-editor.org/rfc/rfc1918'],
   ['Wikipedia · IEEE 802.1Q','https://en.wikipedia.org/wiki/IEEE_802.1Q']
  ]
 },
 lb:{
  intro:'서버 한 대로 감당할 수 없을 때 가장 쉬운 방법은 서버를 늘리는 것입니다. 그러려면 들어오는 요청을 누군가 나눠 줘야 하고 고장 난 서버에는 보내지 않아야 합니다. 로드 밸런서는 DNS를 이용한 단순한 분산에서 시작해 전용 장비를 거쳐 클라우드 서비스가 되었습니다. 그 과정에서 서버를 여러 대 두는 것만으로는 부족하고 함께 고장 날 수 있는 범위를 나눠야 한다는 교훈이 쌓였습니다.',
  timeline:[
   {year:'1990년대 초',title:'DNS 라운드 로빈',body:'가장 오래된 분산 방법은 한 도메인에 여러 IP 주소를 등록하고 DNS가 순서를 돌려 가며 알려 주는 라운드 로빈입니다. 설정은 쉽지만 DNS는 서버가 죽었는지 모르고 클라이언트와 리졸버가 답을 캐시하므로 죽은 서버로 계속 요청이 갑니다.'},
   {year:'1997',title:'전용 로드 밸런서 장비',body:'1990년대 후반 F5의 BIG-IP(1997) 같은 전용 장비가 나왔습니다. 하나의 가상 IP로 요청을 받아 뒤의 서버들로 나누고 서버의 상태를 주기적으로 확인해 응답하지 않는 서버를 자동으로 뺐습니다. 상태 확인이 로드 밸런서의 핵심 기능이 된 것이 이때입니다.'},
   {year:'1997',title:'일관된 해싱',body:'같은 해 카거 등은 서버가 추가되거나 빠질 때 키의 대부분이 원래 서버에 그대로 남도록 나누는 일관된 해싱을 발표했습니다. 이 연구를 바탕으로 아카마이가 세워졌고 지금도 캐시 서버와 분산 DB가 키를 나눌 때 이 방식을 씁니다.'},
   {year:'2009~2017',title:'클라우드 로드 밸런서',body:'2009년 AWS의 ELB로 로드 밸런서를 직접 운영하지 않고 서비스로 쓰게 됐습니다. 2016년 8월에는 HTTP 경로와 호스트로 나누는 L7 로드 밸런서 ALB가, 2017년 9월에는 TCP와 UDP를 아주 빠르게 처리하는 L4 로드 밸런서 NLB가 나왔습니다.'},
   {year:'2011',title:'한 영역에 몰린 서버들',body:'2011년 4월 AWS 미국 동부 리전의 한 가용 영역에서 EBS 볼륨 일부가 읽기와 쓰기를 멈췄습니다. 서버를 여러 대 두었어도 모두 그 영역에 있던 서비스는 함께 멈췄습니다. 서버 수보다 장애가 함께 번지는 범위를 나누는 것이 중요하다는 교훈을 남긴 사건입니다.'}
  ],
  decisions:[
   {question:'로드 밸런서는 왜 상태 확인을 할까?',answer:'서버는 프로세스가 죽거나 디스크가 차거나 DB 연결을 잃는 식으로 언제든 고장 날 수 있습니다. 주기적으로 상태 확인 주소를 불러 정해진 횟수만큼 실패한 서버는 대상에서 빼야 사용자 요청이 죽은 서버로 가지 않습니다.',cost:'상태 확인이 너무 얕으면 프로세스만 살아 있고 일은 못 하는 서버를 놓치고, 너무 깊으면 DB가 잠깐 느린 것만으로 모든 서버가 한꺼번에 빠지는 일이 생깁니다.'},
   {question:'L4와 L7은 무엇이 다를까?',answer:'L4는 IP와 포트만 보고 연결을 나누므로 빠르고 HTTP가 아닌 프로토콜도 다룹니다. L7은 HTTP 요청을 해석하므로 /api는 이쪽, /images는 저쪽처럼 경로나 호스트로 나누고 TLS 종료나 헤더 추가도 할 수 있습니다.',cost:'L7은 요청을 해석하는 만큼 처리 비용과 지연이 조금 더 들고 웹소켓이나 긴 연결은 타임아웃 설정에 주의해야 합니다.'},
   {question:'왜 서버를 가용 영역 여러 곳에 나눠 둘까?',answer:'가용 영역은 전원, 냉각, 네트워크가 분리된 데이터센터 묶음입니다. 같은 영역의 서버는 같은 원인으로 함께 멈출 수 있습니다. 영역을 나누면 한 영역이 멈춰도 다른 영역의 서버가 요청을 받습니다.',cost:'영역 사이 트래픽에는 비용과 약간의 지연이 붙고 DB처럼 상태를 가진 부분은 복제 구성을 따로 해야 합니다. 앱 서버만 나누고 DB가 한 영역에 있으면 결국 같은 범위에 묶입니다.'}
  ],
  today:[
   '앱에는 /health 같은 상태 확인 주소를 두되, 앱이 요청을 처리할 수 있는지를 가볍게 확인합니다. 외부 API까지 확인하면 그쪽 장애로 모든 서버가 빠질 수 있습니다.',
   'ALB는 대상을 뺄 때 기본 300초 동안 새 요청을 보내지 않고 처리 중인 요청이 끝나기를 기다립니다. 배포 시 앱이 SIGTERM을 받으면 새 요청을 거절하고 진행 중인 요청을 마치게 만들면 끊김이 없어집니다.',
   '세션을 서버 메모리에 두면 같은 사용자가 다른 서버로 가는 순간 로그아웃됩니다. 고정 세션(sticky session)보다 세션을 Redis나 DB에 두는 편이 서버를 자유롭게 늘리고 줄이기 좋습니다.'
  ],
  sources:[
   ['Wikipedia · Round-robin DNS','https://en.wikipedia.org/wiki/Round-robin_DNS'],
   ['Wikipedia · F5, Inc. (BIG-IP)','https://en.wikipedia.org/wiki/F5,_Inc.'],
   ['Karger et al., Consistent Hashing and Random Trees (STOC, 1997)','https://dl.acm.org/doi/10.1145/258533.258660'],
   ['AWS Blog · New AWS Application Load Balancer (2016)','https://aws.amazon.com/blogs/aws/new-aws-application-load-balancer/'],
   ['AWS Blog · New Network Load Balancer (2017)','https://aws.amazon.com/blogs/aws/new-network-load-balancer-effortless-scaling-to-millions-of-requests-per-second/'],
   ['AWS · Summary of the Amazon EC2 and RDS Service Disruption (2011)','https://aws.amazon.com/message/65648/'],
   ['AWS · Health checks for ALB target groups','https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html'],
   ['AWS · Target group attributes (deregistration delay)','https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html'],
   ['Google SRE Book · Availability Table','https://sre.google/sre-book/availability-table/']
  ]
 },
 storage:{
  intro:'저장소는 컴퓨터에 붙은 디스크에서 시작해 네트워크 너머의 서비스가 되었습니다. 디스크를 여러 서버가 나눠 쓰려는 요구가 파일 공유를 낳았고 인터넷 규모로 수없이 많은 파일을 저장하려는 요구가 객체 스토리지를 낳았습니다. 업로드한 사진을 앱 서버 디스크에 두면 안 되는 이유는 서버가 언제든 사라지고 늘어나는 클라우드의 성질에서 나옵니다.',
  timeline:[
   {year:'1956~',title:'컴퓨터에 붙은 디스크',body:'1956년 IBM RAMAC 이후 디스크는 오랫동안 컴퓨터 한 대에 붙어 블록 단위로 읽고 쓰는 장치였습니다. 운영체제가 그 위에 파일 시스템을 만들어 폴더와 파일로 보여 줍니다. 지금 클라우드의 블록 스토리지도 이 모델을 네트워크 너머로 옮긴 것입니다.'},
   {year:'1984',title:'NFS, 디스크를 나눠 쓰기',body:'1984년 썬 마이크로시스템즈가 발표한 NFS는 다른 컴퓨터의 디렉터리를 내 컴퓨터의 폴더처럼 쓰게 했습니다. 여러 서버가 같은 파일을 나눠 쓰는 파일 스토리지의 시작입니다. 다만 여러 곳에서 같은 파일을 동시에 고칠 때의 잠금과 일관성이 늘 어려운 문제였습니다.'},
   {year:'2006',title:'S3, HTTP로 다루는 저장소',body:'2006년 3월 아마존은 S3를 내놓았습니다. 폴더와 파일 대신 버킷과 키로 객체를 저장하고 HTTP의 PUT과 GET으로 다룹니다. 파일 시스템의 복잡한 기능을 버리고 단순한 API만 남긴 대신 사실상 무한히 늘릴 수 있고 설계상 99.999999999%의 내구성을 내세웁니다.'},
   {year:'2008',title:'EBS와 CloudFront',body:'2008년 AWS는 EC2에 네트워크 디스크를 붙이는 블록 스토리지 EBS와, S3 같은 원본의 내용을 전 세계 엣지에서 대신 내주는 CDN인 CloudFront를 내놓았습니다. 블록, 객체, CDN이라는 지금의 기본 조합이 이때 갖춰졌습니다.'},
   {year:'2020',title:'강한 일관성',body:'S3는 처음에 객체를 덮어쓰거나 지운 직후 다른 요청이 옛 내용을 볼 수 있는 최종 일관성 모델이었습니다. 2020년 12월부터는 쓰기 직후 읽기를 포함해 강한 일관성을 기본으로 제공합니다. 앱에서 이 차이를 보정하던 코드가 필요 없어졌습니다.'}
  ],
  decisions:[
   {question:'왜 업로드 파일을 앱 서버 디스크가 아닌 객체 스토리지에 둘까?',answer:'클라우드의 앱 서버는 언제든 교체되고 오토스케일링으로 늘었다 줄어듭니다. 서버 디스크에 저장하면 그 서버가 사라질 때 파일도 사라지고 다른 서버로 간 요청은 그 파일을 찾지 못합니다. 객체 스토리지는 서버와 상관없이 남고 모든 서버가 같은 곳을 봅니다.',cost:'파일을 읽고 쓸 때마다 네트워크를 거치고 일반 파일처럼 open으로 열 수 없어 SDK나 HTTP로 다뤄야 합니다.'},
   {question:'객체 스토리지는 왜 파일 시스템처럼 동작하지 않을까?',answer:'파일 시스템의 부분 수정, 이름 바꾸기, 잠금 같은 기능은 여러 서버에 흩어진 수십억 개의 객체에서 지키기 어렵습니다. S3는 객체를 통째로 쓰고 통째로 읽는 단순한 모델만 제공하는 대신 규모와 내구성을 얻었습니다.',cost:'파일 일부만 고칠 수 없고 폴더 이름 바꾸기는 사실상 모든 객체를 복사하고 지우는 작업입니다. 폴더처럼 보이는 것도 키 이름의 접두어일 뿐입니다.'},
   {question:'원본이 있는데 왜 CDN을 또 둘까?',answer:'빛의 속도에도 한계가 있어서 서울의 사용자가 미국의 원본에서 이미지를 받으면 왕복마다 시간이 걸립니다. CDN은 가까운 엣지에 복사본을 두어 지연을 줄이고 같은 파일을 원본이 반복해서 보내지 않게 해 부담과 비용도 줄입니다.',cost:'캐시된 파일을 바꾸면 무효화하거나 파일 이름에 버전을 넣어야 합니다. 개인 파일을 실수로 공용 캐시에 두면 다른 사람에게 보일 수 있습니다.'}
  ],
  today:[
   '사진 업로드는 서버가 S3 미리 서명된 URL을 만들어 주고 브라우저가 그 URL로 S3에 직접 올리는 방식을 많이 씁니다. 큰 파일이 앱 서버를 거치지 않고 DB에는 객체 키만 저장합니다.',
   'S3 버킷은 공개하지 않고 CloudFront로만 읽게 설정합니다. 정적 파일은 이름에 해시를 넣어 오래 캐시하고 바뀌면 새 이름으로 배포합니다.',
   'DB나 검색 엔진처럼 파일 시스템이 필요한 프로그램의 데이터는 블록 스토리지(EBS)에 두고 스냅숏으로 백업합니다. 여러 서버가 같은 폴더를 나눠 써야 하면 EFS 같은 파일 스토리지를 씁니다.'
  ],
  sources:[
   ['AWS · Announcing Amazon S3 (2006)','https://aws.amazon.com/about-aws/whats-new/2006/03/13/announcing-amazon-s3---simple-storage-service/'],
   ['AWS Blog · Amazon S3 Strong Read-After-Write Consistency (2020)','https://aws.amazon.com/blogs/aws/amazon-s3-update-strong-read-after-write-consistency/'],
   ['AWS · Data durability in Amazon S3','https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html'],
   ['AWS · Uploading objects with presigned URLs','https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html'],
   ['Wikipedia · Network File System','https://en.wikipedia.org/wiki/Network_File_System'],
   ['Wikipedia · Amazon Elastic Block Store','https://en.wikipedia.org/wiki/Amazon_Elastic_Block_Store'],
   ['Wikipedia · Amazon CloudFront','https://en.wikipedia.org/wiki/Amazon_CloudFront']
  ]
 },
 docker:{
  intro:'컨테이너는 하루아침에 나온 기술이 아닙니다. 한 컴퓨터를 여러 독립된 환경으로 나누려는 시도는 1970년대의 가상 머신과 chroot까지 거슬러 올라갑니다. 리눅스 커널에 격리 기능이 하나씩 쌓였고 도커는 그것을 누구나 쓸 수 있는 이미지와 명령어로 묶었습니다. 컨테이너가 가상 머신보다 가볍지만 격리는 약한 이유, 이미지를 층으로 쌓는 이유가 이 흐름에서 나옵니다.',
  timeline:[
   {year:'1972',title:'가상 머신',body:'IBM은 1972년 VM/370으로 메인프레임 한 대 위에 여러 개의 가상 컴퓨터를 만들어 각자 다른 운영체제를 돌리게 했습니다. 하드웨어 전체를 흉내 내므로 격리가 강했습니다. 2003년 공개된 Xen 같은 x86용 가상화가 이 생각을 일반 서버로 가져왔고 초기 EC2도 가상 머신 위에서 돌아갔습니다.'},
   {year:'1979~2004',title:'chroot에서 jail과 zone으로',body:'1979년 유닉스 7판의 chroot는 프로세스가 보는 파일 시스템의 루트를 바꿔 다른 디렉터리를 못 보게 했습니다. 2000년 FreeBSD 4.0의 jail은 파일 시스템뿐 아니라 프로세스와 네트워크까지 나눴고 2004년 Solaris Zones도 비슷한 격리를 제공했습니다. 커널은 하나인데 프로세스마다 보이는 세계를 다르게 만드는 방식입니다.'},
   {year:'2002~2008',title:'리눅스 네임스페이스와 cgroup',body:'리눅스는 2002년 마운트 네임스페이스를 시작으로 프로세스 ID, 네트워크, 사용자 등의 네임스페이스를 차례로 넣어 프로세스가 보는 범위를 나눴습니다. 2008년에는 CPU와 메모리 사용량을 제한하는 cgroup이 들어왔고 같은 해 이 둘을 묶어 쓰는 LXC가 나왔습니다. 컨테이너의 재료가 모두 갖춰진 셈입니다.'},
   {year:'2013',title:'도커',body:'2013년 솔로몬 하익스가 PyCon에서 도커를 공개했습니다. 새로운 격리 기술보다 사용법이 혁신이었습니다. Dockerfile로 환경을 코드처럼 적고 층으로 쌓은 이미지를 저장소에 올렸다가 어디서든 같은 모습으로 실행할 수 있게 했습니다.'},
   {year:'2014~2015',title:'표준과 오케스트레이션',body:'구글은 2014년 사내 시스템 Borg의 경험을 바탕으로 컨테이너 여러 개를 여러 서버에 배치하고 관리하는 쿠버네티스를 공개했고 2015년 Borg 논문도 발표했습니다. 같은 해 6월 도커와 여러 회사가 OCI를 만들어 이미지와 런타임 형식을 표준으로 정했습니다. 지금은 도커가 아닌 도구로 만든 이미지도 같은 방식으로 실행됩니다.'}
  ],
  decisions:[
   {question:'컨테이너는 왜 가상 머신 대신 커널을 공유할까?',answer:'가상 머신은 운영체제 전체를 부팅하므로 시작이 느리고 메모리를 많이 씁니다. 컨테이너는 호스트 커널 위의 격리된 프로세스라서 1초 안에 뜨고 한 서버에 훨씬 많이 띄울 수 있습니다.',cost:'커널을 공유하므로 커널 취약점은 모든 컨테이너에 영향을 줄 수 있고 격리는 가상 머신보다 약합니다. 리눅스 컨테이너는 리눅스 커널이 필요해서 맥과 윈도우의 도커 데스크톱은 안에서 작은 가상 머신을 돌립니다.'},
   {question:'이미지는 왜 바꿀 수 없는 층으로 쌓을까?',answer:'Dockerfile의 명령마다 층이 생기고 한 번 만든 층은 바뀌지 않습니다. 그래서 바뀌지 않은 층은 다시 만들지 않고 재사용하며 같은 이미지는 어디서 실행해도 같은 내용입니다.',cost:'보안 패치 하나를 반영하려 해도 이미지를 다시 빌드해야 합니다. 명령 순서를 잘못 두면 작은 코드 변경에도 의존성 설치 층부터 다시 만들어 빌드가 느려집니다.'},
   {question:'컨테이너 안에 데이터를 저장하면 왜 안 될까?',answer:'컨테이너는 언제든 지우고 새로 띄우는 것을 전제로 설계됐습니다. 컨테이너 안에 쓴 파일은 컨테이너가 지워지면 함께 사라집니다. 이렇게 일회용으로 다뤄야 같은 이미지로 몇 개든 늘리고 문제가 생기면 바로 교체할 수 있습니다.',cost:'DB 파일이나 업로드처럼 남아야 하는 데이터는 볼륨이나 외부 저장소로 따로 빼야 하고 그 저장소의 백업과 권한도 따로 관리해야 합니다.'}
  ],
  today:[
   'Python 이미지의 Dockerfile은 requirements.txt만 먼저 복사해 pip install을 하고 그 뒤에 소스 코드를 복사합니다. 코드만 바뀌면 설치 층을 재사용해 빌드가 빨라집니다.',
   'CMD는 ["gunicorn", "app:app"]처럼 배열(exec) 형식으로 씁니다. 셸 형식으로 쓰면 셸이 PID 1이 되어 SIGTERM이 앱에 전달되지 않을 수 있습니다. USER로 root가 아닌 사용자를 지정합니다.',
   '비밀 값은 이미지에 넣지 않고 실행할 때 환경 변수나 비밀 관리 서비스로 주입합니다. 이미지 층에 한 번 들어간 파일은 다음 층에서 지워도 이미지 안에 남습니다.'
  ],
  sources:[
   ['Wikipedia · VM (operating system)','https://en.wikipedia.org/wiki/VM_(operating_system)'],
   ['Wikipedia · Xen','https://en.wikipedia.org/wiki/Xen'],
   ['Wikipedia · chroot','https://en.wikipedia.org/wiki/Chroot'],
   ['Wikipedia · FreeBSD jail','https://en.wikipedia.org/wiki/FreeBSD_jail'],
   ['Linux man-pages · namespaces(7)','https://man7.org/linux/man-pages/man7/namespaces.7.html'],
   ['Linux Kernel · Control Group v2','https://docs.kernel.org/admin-guide/cgroup-v2.html'],
   ['Solomon Hykes, The future of Linux Containers (PyCon 2013)','https://www.youtube.com/watch?v=wW9CAH9nSLs'],
   ['Verma et al., Large-scale Cluster Management at Google with Borg (EuroSys, 2015)','https://dl.acm.org/doi/10.1145/2741948.2741964'],
   ['Open Container Initiative · About','https://opencontainers.org/about/overview/'],
   ['Docker · Building best practices','https://docs.docker.com/build/building/best-practices/']
  ]
 },
 scale:{
  intro:'더 많은 요청을 처리하는 방법은 두 가지뿐입니다. 더 큰 기계를 사거나 기계를 더 사는 것입니다. 오랫동안은 앞의 방법이 기본이었고 2000년대 인터넷 서비스가 커지면서 값싼 서버를 많이 쓰는 뒤의 방법이 주류가 되었습니다. 그런데 서버를 늘려도 모두가 함께 쓰는 부분이 있으면 그곳이 병목이 됩니다. 이 한계는 1960년대에 이미 수식으로 정리되어 있었습니다.',
  timeline:[
   {year:'1961',title:'리틀의 법칙',body:'존 리틀은 1961년 시스템 안에 머무는 평균 작업 수는 도착률과 평균 체류 시간의 곱이라는 L = λW를 증명했습니다. 처리 속도보다 요청이 빨리 들어오면 대기열이 계속 길어지고 대기열이 길어지면 체류 시간도 함께 늘어납니다. 과부하에서 응답 시간이 갑자기 폭발하는 이유를 설명하는 식입니다.'},
   {year:'1967',title:'암달의 법칙',body:'진 암달은 1967년 발표에서 작업의 일부가 병렬로 나눌 수 없다면 프로세서를 아무리 늘려도 전체 속도는 그 부분에 묶인다고 지적했습니다. 서버를 열 배로 늘려도 모든 요청이 한 DB를 거친다면 전체 처리량은 그 DB를 넘을 수 없습니다.'},
   {year:'1990년대',title:'더 큰 기계',body:'1990년대 기업 시스템은 주로 더 크고 비싼 서버나 메인프레임으로 성능을 높였습니다. 프로그램을 고치지 않아도 되는 장점이 있었지만 가격이 성능보다 훨씬 빠르게 올랐고 그 한 대가 멈추면 서비스 전체가 멈췄습니다.'},
   {year:'2003',title:'값싼 서버 여러 대',body:'구글은 2003년 논문 「행성을 위한 웹 검색」에서 고성능 서버 대신 값싼 일반 PC 수천 대를 묶어 쓰고 고장은 소프트웨어가 견디게 하는 설계를 소개했습니다. 서버 한 대는 언제든 고장 날 수 있다고 보고 요청을 여러 대에 나누는 방식이 대규모 서비스의 표준이 되었습니다.'},
   {year:'2009~2013',title:'자동 확장과 꼬리 지연',body:'2009년 AWS의 오토스케일링으로 부하에 따라 서버 수를 자동으로 늘리고 줄이게 됐습니다. 2013년 딘과 바로소는 「규모에서의 꼬리」에서 서버가 많아질수록 가장 느린 한 대가 전체 응답 시간을 결정하게 된다는 문제를 정리했습니다. 평균보다 p99를 봐야 하는 이유입니다.'}
  ],
  decisions:[
   {question:'왜 처음에는 스케일 업이 편할까?',answer:'서버 하나의 CPU와 메모리를 키우면 코드를 고칠 필요가 없고 세션이나 파일 같은 상태도 그대로 둘 수 있습니다. 작은 서비스에서는 가장 빠르고 덜 위험한 방법입니다.',cost:'한 대의 크기에는 상한이 있고 클수록 비싸집니다. 무엇보다 그 한 대가 멈추면 전부 멈추므로 가용성 문제는 해결되지 않습니다.'},
   {question:'스케일 아웃을 하려면 무엇이 먼저 필요할까?',answer:'요청이 어느 서버로 가도 같은 결과가 나와야 합니다. 세션, 업로드 파일, 캐시처럼 서버 안에 쌓이던 상태를 Redis, DB, 객체 스토리지 같은 바깥으로 빼서 앱 서버를 상태 없는 프로세스로 만들어야 합니다.',cost:'상태를 밖으로 뺀 만큼 그 저장소가 새로운 공유 지점이 됩니다. 암달의 법칙대로 앱 서버를 늘릴수록 그 저장소가 먼저 한계에 닿습니다.'},
   {question:'왜 처리할 수 없는 요청은 일찍 거절할까?',answer:'리틀의 법칙대로 처리 능력보다 많은 요청을 받아 두면 대기열과 응답 시간이 끝없이 늘어나고 결국 모든 요청이 타임아웃으로 실패합니다. 일부 요청을 바로 429나 503으로 거절하면 나머지는 제시간에 처리됩니다. 이것이 백프레셔입니다.',cost:'거절당한 사용자는 오류를 봅니다. 클라이언트가 바로 재시도하면 부하가 더 커지므로 재시도 간격을 점점 늘리고 무작위성을 섞게 해야 합니다.'}
  ],
  today:[
   '앱 서버를 늘리기 전에 계산합니다. 서버 10대 × 워커 4개 × 연결 풀 20개면 DB 연결이 800개인데, PostgreSQL의 max_connections 기본값은 보통 100입니다. PgBouncer나 RDS Proxy 같은 연결 풀러를 두거나 풀 크기를 줄입니다.',
   '오토스케일링 기준은 CPU만 보지 말고 실제 병목에 맞춥니다. 작업 큐 워커라면 큐 길이, 웹 서버라면 요청 지연이 더 정확한 신호일 때가 많습니다.',
   '외부 API가 느려지면 그 호출을 기다리는 워커가 모두 묶입니다. 타임아웃을 짧게 두고 실패가 계속되면 한동안 호출을 멈추는 서킷 브레이커를 둡니다.'
  ],
  sources:[
   ['Little, A Proof for the Queuing Formula: L = λW (1961)','https://doi.org/10.1287/opre.9.3.383'],
   ['Amdahl, Validity of the Single Processor Approach (AFIPS, 1967)','https://dl.acm.org/doi/10.1145/1465482.1465560'],
   ['Barroso, Dean & Hölzle, Web Search for a Planet (IEEE Micro, 2003)','https://doi.org/10.1109/MM.2003.1196112'],
   ['Dean & Barroso, The Tail at Scale (CACM, 2013)','https://dl.acm.org/doi/10.1145/2408776.2408794'],
   ['PostgreSQL · Connections and Authentication (max_connections)','https://www.postgresql.org/docs/current/runtime-config-connection.html'],
   ['PgBouncer','https://www.pgbouncer.org/'],
   ['Martin Fowler · CircuitBreaker','https://martinfowler.com/bliki/CircuitBreaker.html'],
   ['MDN · 429 Too Many Requests','https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429']
  ]
 },
 cicd:{
  intro:'예전에는 몇 달 동안 각자 개발한 코드를 출시 직전에 한꺼번에 합쳤습니다. 합치는 데만 몇 주가 걸렸고 배포는 밤샘 작업이었습니다. CI는 자주 합쳐서 그 고통을 작게 나누자는 생각에서, CD는 배포를 드물고 큰 사건이 아니라 자주 하는 평범한 일로 만들자는 생각에서 나왔습니다. 그 과정에서 배포 실수 하나가 회사를 무너뜨린 사건도 있었습니다.',
  timeline:[
   {year:'1990년대 말',title:'자주 합치기',body:'켄트 벡이 정리한 익스트림 프로그래밍은 하루에도 여러 번 코드를 합치고 그때마다 전체를 빌드하고 테스트하는 지속적 통합을 핵심 실천법으로 삼았습니다. 마틴 파울러의 글 「지속적 통합」이 이 방식을 널리 알렸습니다. 늦게 합칠수록 충돌이 커진다는 경험에서 나온 원칙입니다.'},
   {year:'2001~2011',title:'CI 서버',body:'2001년 3월 ThoughtWorks의 CruiseControl이 커밋마다 자동으로 빌드하고 테스트하는 CI 서버를 오픈소스로 내놓았습니다. 이후 Hudson이 널리 쓰였고 2011년 Jenkins로 이름을 바꿔 이어졌습니다. 사람이 기억해서 하던 검사를 서버가 빠짐없이 하게 된 것입니다.'},
   {year:'2009~2010',title:'하루 10번 배포와 DevOps',body:'2009년 플리커의 존 올스포와 폴 해먼드는 하루 10번 이상 배포한다는 발표로 개발과 운영의 협력을 보여 줬습니다. 같은 해 벨기에 겐트에서 첫 DevOpsDays가 열리며 DevOps라는 말이 퍼졌고 2010년 험블과 팔리의 책 『지속적 배포』가 언제든 배포할 수 있는 상태를 유지하는 방법을 정리했습니다.'},
   {year:'2012',title:'45분 만의 사고',body:'2012년 8월 미국 증권사 나이트 캐피털은 새 코드를 배포하면서 서버 일부에 예전 코드가 남은 상태로 거래를 시작했습니다. 약 45분 동안 의도하지 않은 주문이 쏟아졌고 4억 4천만 달러의 손실을 입었습니다. 수작업 배포, 서버마다 다른 버전, 빠른 중단 수단의 부재가 겹친 사고로, 자동화되고 검증된 배포가 왜 필요한지 보여 주는 사례로 남았습니다.'},
   {year:'2019',title:'저장소 안의 파이프라인',body:'2019년 GitHub Actions가 CI/CD를 지원하면서 별도 서버 없이 저장소 안의 YAML 파일로 테스트와 배포를 정의하는 방식이 흔해졌습니다. 파이프라인 자체가 코드와 함께 버전 관리되고 리뷰됩니다.'}
  ],
  decisions:[
   {question:'왜 작은 변경을 자주 합칠까?',answer:'변경이 클수록 다른 사람의 변경과 부딪히는 곳이 많아지고 문제가 생겼을 때 원인을 찾기도 어렵습니다. 작게 자주 합치고 매번 자동 테스트를 돌리면 충돌과 버그를 생긴 직후에 발견해 바로 고칠 수 있습니다.',cost:'자동 테스트가 믿을 만해야 의미가 있습니다. 테스트가 느리거나 자주 이유 없이 실패하면 사람들이 결과를 무시하게 됩니다.'},
   {question:'왜 한꺼번에 바꾸지 않고 조금씩 배포할까?',answer:'블루그린 배포는 새 버전을 옆에 띄워 두고 트래픽을 한 번에 넘겼다가 문제가 있으면 바로 되돌립니다. 카나리 배포는 일부 사용자에게만 먼저 보내 지표를 확인합니다. 둘 다 문제가 생겼을 때 영향받는 범위를 줄이고 되돌릴 길을 남겨 둡니다.',cost:'두 버전이 동시에 돌아가는 시간이 생기므로 API와 DB가 두 버전 모두와 호환되어야 합니다. 인프라 비용도 잠시 늘어납니다.'},
   {question:'왜 DB 변경은 앱과 따로 나눠 배포할까?',answer:'앱은 이전 이미지로 되돌리면 그만이지만 DB 컬럼을 지우거나 이름을 바꾼 변경은 되돌리기 어렵습니다. 먼저 새 컬럼을 추가하고, 앱이 둘 다 쓰게 바꾸고 데이터를 옮긴 뒤, 마지막에 옛 컬럼을 지우는 확장-축소 방식이면 어느 단계에서든 앱을 되돌릴 수 있습니다.',cost:'하나의 변경이 여러 번의 배포로 나뉘고 중간 단계 동안 두 형태를 함께 유지하는 코드가 필요합니다.'}
  ],
  today:[
   'GitHub Actions에서 풀 리퀘스트마다 테스트와 린트를 돌리고 통과해야 병합되게 합니다. 이 저장소의 npm run check와 test:lessons도 그런 검사로 넣을 수 있습니다.',
   '배포할 이미지에는 latest 대신 커밋 해시를 태그로 붙입니다. 어느 코드가 운영 중인지 정확히 알 수 있고 롤백은 이전 태그로 되돌리는 것으로 끝납니다.',
   '파이프라인 성공은 배포가 끝났다는 뜻이지 서비스가 정상이라는 뜻이 아닙니다. 배포 직후 오류율과 지연을 확인하고 나빠지면 자동으로 되돌리는 단계를 둡니다.'
  ],
  sources:[
   ['Martin Fowler · Continuous Integration','https://martinfowler.com/articles/continuousIntegration.html'],
   ['Wikipedia · CruiseControl','https://en.wikipedia.org/wiki/CruiseControl'],
   ['Wikipedia · Jenkins','https://en.wikipedia.org/wiki/Jenkins_(software)'],
   ['Allspaw & Hammond, 10+ Deploys Per Day (Velocity 2009)','https://www.slideshare.net/jallspaw/10-deploys-per-day-dev-and-ops-cooperation-at-flickr'],
   ['Wikipedia · DevOps','https://en.wikipedia.org/wiki/DevOps'],
   ['Continuous Delivery (Humble & Farley)','https://continuousdelivery.com/'],
   ['Wikipedia · Knight Capital Group','https://en.wikipedia.org/wiki/Knight_Capital_Group'],
   ['Martin Fowler · BlueGreenDeployment','https://martinfowler.com/bliki/BlueGreenDeployment.html'],
   ['Martin Fowler · CanaryRelease','https://martinfowler.com/bliki/CanaryRelease.html'],
   ['Martin Fowler · ParallelChange (expand-contract)','https://martinfowler.com/bliki/ParallelChange.html'],
   ['GitHub Blog · GitHub Actions now supports CI/CD (2019)','https://github.blog/news-insights/product-news/github-actions-now-supports-ci-cd/']
  ]
 },
 observability:{
  intro:'서버 한 대를 운영할 때는 로그 파일 하나를 보면 됐습니다. 서버가 수십 대가 되고 요청 하나가 여러 서비스를 거치게 되자, 무슨 일이 일어났는지 아는 것 자체가 어려운 문제가 되었습니다. 로그, 메트릭, 트레이스는 각각 다른 질문에 답하려고 다른 시기에 나왔습니다. 관측 가능성이라는 말은 원래 제어 공학에서 왔습니다. 바깥으로 나오는 신호만 보고 시스템 내부 상태를 알아낼 수 있는가라는 뜻입니다.',
  timeline:[
   {year:'1960',title:'제어 이론의 관측 가능성',body:'루돌프 칼만은 1960년 제어 시스템 논문에서 출력만 보고 내부 상태를 추정할 수 있는 성질을 관측 가능성이라고 정의했습니다. 소프트웨어에서 이 말을 빌려 쓰는 이유도 같습니다. 서버 안을 직접 들여다볼 수 없으니 밖으로 내보내는 기록으로 상태를 알아내야 합니다.'},
   {year:'1980년대~2009',title:'syslog와 로그',body:'1980년대 sendmail과 함께 만들어진 syslog는 여러 프로그램의 로그를 한곳으로 모으는 사실상의 표준이 되었고 나중에 RFC 3164(2001)와 RFC 5424(2009)로 정리되었습니다. 로그는 개별 사건을 자세히 남기지만 양이 많아지면 사람이 읽어서는 전체 상태를 알 수 없습니다.'},
   {year:'2010',title:'Dapper, 요청을 따라가기',body:'구글은 2010년 Dapper 논문에서 요청 하나가 수많은 서비스를 거치는 경로와 각 구간의 시간을 기록하는 분산 트레이싱을 소개했습니다. 트위터의 Zipkin이 이 논문을 바탕으로 만들어졌고 어느 서비스에서 시간이 걸렸는지를 한 화면에서 볼 수 있게 됐습니다.'},
   {year:'2012~2016',title:'메트릭과 골든 시그널',body:'2012년 SoundCloud에서 시작된 Prometheus는 서버가 내보내는 수치를 주기적으로 모아 저장하고 질의하는 메트릭 시스템입니다. 2016년 구글의 SRE 책은 사용자에게 보이는 서비스를 볼 때 지연, 트래픽, 오류, 포화 네 가지를 먼저 보라는 네 가지 골든 시그널을 제시했습니다.'},
   {year:'2019',title:'OpenTelemetry',body:'트레이싱 표준이 OpenTracing과 OpenCensus로 갈라져 있던 것을 2019년 OpenTelemetry로 합쳤습니다. 로그, 메트릭, 트레이스를 같은 방식으로 수집해 원하는 도구로 보낼 수 있게 하는 것이 목표입니다.'}
  ],
  decisions:[
   {question:'왜 로그, 메트릭, 트레이스를 따로 둘까?',answer:'메트릭은 지금 오류율이 몇 퍼센트인가처럼 전체 상태를 싸고 빠르게 보여 줍니다. 로그는 이 요청이 왜 실패했는가를 자세히 알려 줍니다. 트레이스는 이 요청이 어느 서비스에서 오래 걸렸는가를 보여 줍니다. 질문이 다르니 저장 방식과 비용도 다릅니다.',cost:'세 가지를 따로 수집하고 저장하는 비용이 듭니다. 서로 이어 볼 수 있도록 요청 ID나 트레이스 ID를 모든 기록에 넣어야 합니다.'},
   {question:'왜 평균 응답 시간 대신 p95나 p99를 볼까?',answer:'요청 대부분이 50ms이고 1%가 5초라면 평균은 100ms 남짓으로 괜찮아 보입니다. 하지만 그 1%의 사용자는 매번 5초를 기다리고 페이지 하나가 여러 요청으로 이루어지면 느린 요청을 만날 확률은 훨씬 커집니다. 백분위수는 이 꼬리를 드러냅니다.',cost:'백분위수는 여러 서버의 값을 단순히 평균 낼 수 없어서 히스토그램으로 수집해야 하고 저장 비용이 늡니다.'},
   {question:'알림은 왜 원인보다 증상에 걸까?',answer:'CPU가 90%여도 사용자가 불편하지 않다면 한밤중에 사람을 깨울 이유가 없습니다. 오류율이 오르거나 지연이 목표를 넘는 것처럼 사용자가 실제로 겪는 증상에 알림을 걸고 원인 지표는 조사할 때 봅니다.',cost:'증상만으로는 원인을 바로 알 수 없으니 대시보드와 로그, 트레이스가 잘 갖춰져 있어야 알림을 받은 뒤 빨리 좁혀 갈 수 있습니다.'}
  ],
  today:[
   '요청이 들어올 때 요청 ID를 만들어 모든 로그에 넣고 다른 서비스를 부를 때도 헤더로 넘깁니다. 사용자가 오류 화면의 ID를 알려 주면 바로 그 요청의 기록을 찾을 수 있습니다.',
   '로그는 문장보다 JSON 같은 구조화된 형식으로 남기면 검색과 집계가 쉽습니다. 비밀번호, 토큰, 개인정보는 로그에 남기지 않습니다.',
   'Python에서는 prometheus_client로 요청 수와 처리 시간 히스토그램을 내보내고 OpenTelemetry로 트레이스를 붙일 수 있습니다. 대시보드는 골든 시그널 네 가지부터 만듭니다.'
  ],
  sources:[
   ['Wikipedia · Observability (Kalman, 1960)','https://en.wikipedia.org/wiki/Observability'],
   ['RFC 3164 · The BSD syslog Protocol','https://www.rfc-editor.org/rfc/rfc3164'],
   ['RFC 5424 · The Syslog Protocol','https://www.rfc-editor.org/rfc/rfc5424'],
   ['Sigelman et al., Dapper (Google, 2010)','https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/'],
   ['Zipkin','https://zipkin.io/'],
   ['Prometheus · Overview','https://prometheus.io/docs/introduction/overview/'],
   ['Google SRE Book · Monitoring Distributed Systems','https://sre.google/sre-book/monitoring-distributed-systems/'],
   ['CNCF · A Brief History of OpenTelemetry (2019)','https://www.cncf.io/blog/2019/05/21/a-brief-history-of-opentelemetry-so-far/'],
   ['Brendan Gregg · The USE Method','https://www.brendangregg.com/usemethod.html'],
   ['Dean & Barroso, The Tail at Scale (CACM, 2013)','https://dl.acm.org/doi/10.1145/2408776.2408794']
  ]
 },
 recovery:{
  intro:'장애 대응과 백업의 역사는 사실 실패의 역사입니다. 디스크를 여러 개 두면 안전할 줄 알았고, 복제를 하면 백업이 필요 없을 줄 알았고 백업을 매일 하면 복구할 수 있을 줄 알았습니다. 큰 사고가 날 때마다 그 믿음 하나씩이 깨졌습니다. 그래서 지금의 원칙은 복구해 봤는가, 그리고 사고에서 배웠는가로 요약됩니다.',
  timeline:[
   {year:'1988',title:'RAID, 고장을 견디는 디스크',body:'패터슨, 깁슨, 카츠는 1988년 논문에서 값싼 디스크 여러 개를 묶어 성능을 높이고 한두 개가 고장 나도 데이터를 잃지 않게 하는 RAID를 제안했습니다. 하드웨어 고장에는 강해졌지만, 실수로 지운 파일은 모든 디스크에서 함께 지워진다는 점은 그대로였습니다. 중복이 곧 백업은 아니라는 첫 교훈입니다.'},
   {year:'2000년대',title:'3-2-1 규칙',body:'흔히 3-2-1 규칙이라고 부르는 원칙은 데이터 사본을 세 개 두고, 두 가지 다른 매체에 저장하고 하나는 다른 장소에 두라는 것입니다. 한 가지 원인으로 모든 사본이 함께 사라지지 않게 하려는 원칙으로 지금도 백업 설계의 출발점입니다.'},
   {year:'2011~2018',title:'고장을 연습하고 지울 수 없게 막기',body:'넷플릭스는 2011년 운영 환경의 서버를 무작위로 종료하는 Chaos Monkey를 만들었고 2012년 오픈소스로 공개했습니다. 장애가 날 때까지 기다리지 말고 평소에 일부러 일으켜 대비하자는 것입니다. 2018년 AWS는 일정 기간 객체를 지우거나 덮어쓸 수 없게 하는 S3 Object Lock을 내놓아, 랜섬웨어나 실수로부터 백업을 보호할 수 있게 했습니다.'},
   {year:'2012',title:'비난 없는 사후 분석',body:'엣시의 존 올스포는 2012년 장애의 원인을 개인의 실수로 돌리지 않는 비난 없는 사후 분석을 소개했습니다. 사람들이 처벌을 두려워하면 무슨 일이 있었는지 정직하게 말하지 않고 그러면 같은 사고가 반복된다는 것입니다. 2016년 구글 SRE 책도 이 문화를 핵심으로 다뤘습니다.'},
   {year:'2017',title:'두 번의 큰 교훈',body:'2017년 1월 GitLab.com은 엔지니어가 복제를 고치다 운영 DB의 데이터 디렉터리를 지웠고 복구하려 보니 S3 백업 버킷은 비어 있었으며 백업 절차는 오래전부터 동작하지 않고 있었습니다. 결국 약 6시간 분량의 데이터를 잃었습니다. 같은 해 2월 AWS S3 미국 동부 장애는 명령어 입력값 하나를 잘못 넣어 예상보다 많은 서버를 내린 것이 원인이었습니다. 두 회사 모두 사후 분석을 공개했습니다.'}
  ],
  decisions:[
   {question:'복제가 있는데 왜 백업이 따로 필요할까?',answer:'복제는 원본의 변경을 거의 실시간으로 따라가므로 서버 고장에는 강합니다. 하지만 잘못 실행한 DELETE나 버그로 망가진 데이터도 똑같이 복제됩니다. 백업은 과거의 특정 시점으로 돌아갈 수 있게 해 줍니다.',cost:'백업 저장 비용이 들고 백업 시점과 장애 시점 사이의 데이터는 잃을 수 있습니다. 시점 복구(PITR)로 이 간격을 줄입니다.'},
   {question:'백업 파일이 있는데 왜 복원을 따로 연습할까?',answer:'GitLab 사고처럼 백업 작업이 오래전부터 조용히 실패하고 있을 수 있고 백업은 있어도 암호화 키나 권한이 없거나 복원에 예상보다 몇 배의 시간이 걸릴 수 있습니다. 실제로 복원해 봐야 RTO와 RPO를 지킬 수 있는지 알 수 있습니다.',cost:'복원 연습에는 시간과 별도 환경이 필요합니다. 그래도 장애가 난 뒤에 처음 시도하는 것보다 훨씬 쌉니다.'},
   {question:'RTO와 RPO는 왜 기술이 아니라 업무 기준으로 정할까?',answer:'몇 분 안에 복구하고 데이터를 한 건도 잃지 않으려면 비용이 아주 커집니다. 결제처럼 몇 초의 손실도 안 되는 데이터와 통계처럼 하루치를 다시 만들면 되는 데이터는 요구가 다릅니다. 업무가 감당할 수 있는 시간과 손실을 먼저 정하고 그에 맞는 기술을 고릅니다.',cost:'업무 담당자와 기준을 합의하는 과정이 필요하고 목표를 높게 잡을수록 다중 리전 같은 비싼 구성이 따라옵니다.'}
  ],
  today:[
   'RDS는 자동 백업과 시점 복구를 켜고 보존 기간을 정합니다. 한 달에 한 번쯤은 실제로 새 인스턴스에 복원해 걸린 시간과 데이터를 확인합니다.',
   '백업은 운영 계정과 다른 계정이나 리전에 복사하고 지울 수 없게 잠금을 겁니다. 운영 계정이 뚫려도 백업까지 함께 지워지지 않게 하려는 것입니다.',
   '장애가 끝나면 무슨 일이 언제 일어났는지, 왜 빨리 알지 못했는지, 무엇을 바꿀지를 사후 분석으로 남기고 개인이 아니라 절차와 시스템을 고칩니다. 자주 쓰는 복구 절차는 런북으로 적어 둡니다.'
  ],
  sources:[
   ['Patterson, Gibson & Katz, A Case for RAID (SIGMOD, 1988)','https://dl.acm.org/doi/10.1145/50202.50214'],
   ['Wikipedia · Backup (3-2-1 rule)','https://en.wikipedia.org/wiki/Backup'],
   ['Google SRE Book · Postmortem Culture','https://sre.google/sre-book/postmortem-culture/'],
   ['GitLab · Postmortem of database outage of January 31 (2017)','https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/'],
   ['AWS · Summary of the Amazon S3 Service Disruption (2017)','https://aws.amazon.com/message/41926/'],
   ['Netflix · Chaos Monkey','https://github.com/Netflix/chaosmonkey'],
   ['AWS · Amazon S3 Object Lock (2018)','https://aws.amazon.com/about-aws/whats-new/2018/11/s3-object-lock/'],
   ['AWS · Restoring a DB instance to a specified time (PITR)','https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html']
  ]
 },
 sync:{
  intro:'여러 실행 흐름이 같은 자원을 쓸 때 생기는 문제는 컴퓨터가 동시에 여러 일을 하기 시작하면서 바로 나타났습니다. 처음에는 장치를 나눠 쓰는 운영체제의 문제였고 지금은 거의 모든 서버 코드의 문제입니다. 해법도 몇 가지 생각에서 크게 벗어나지 않았습니다. 들어갈 수 있는 수를 세고, 하나만 들어가게 하고, 조건이 될 때까지 기다리게 하는 것입니다.',
  timeline:[
   {year:'1965',title:'다익스트라의 세마포어',body:'다익스트라는 EWD 123 「Cooperating Sequential Processes」에서 정수 하나와 두 연산 P(기다리며 1 빼기)와 V(1 더하고 깨우기)로 상호 배제와 생산자·소비자 문제를 푸는 세마포어를 제안했습니다. 철도의 신호기에서 이름을 빌렸습니다. 같은 글에서 식사하는 철학자 문제의 원형도 다뤘습니다.'},
   {year:'1974',title:'호어의 모니터',body:'세마포어는 P와 V를 한 번만 빼먹어도 시스템 전체가 멈추는 위험한 도구였습니다. 호어는 데이터와 그 데이터를 다루는 연산을 묶고 한 번에 한 스레드만 그 안에 들어가게 하는 모니터를 제안했습니다. 조건이 맞지 않으면 모니터 안에서 기다리는 조건 변수도 함께 정리했습니다. Java의 synchronized와 wait/notify가 이 생각을 따릅니다.'},
   {year:'1997',title:'화성의 우선순위 역전',body:'화성 탐사선 패스파인더가 착륙 후 반복해서 재부팅됐습니다. 낮은 우선순위 작업이 공유 버스의 뮤텍스를 잡은 사이 중간 우선순위 작업이 CPU를 차지해 높은 우선순위 작업이 끝없이 기다렸기 때문입니다. JPL은 지구에서 VxWorks 뮤텍스의 우선순위 상속 옵션을 켜는 패치를 보내 문제를 고쳤습니다.'},
   {year:'2023',title:'GIL 없는 Python',body:'Python은 오랫동안 GIL 덕분에 한 번에 한 스레드만 바이트코드를 실행했습니다. PEP 703이 승인되어 Python 3.13부터 GIL을 끈 실험적 빌드가 나왔습니다. 스레드가 진짜로 동시에 실행되면 그동안 우연히 숨어 있던 경쟁 상태가 더 자주 드러나므로 락의 중요성이 오히려 커졌습니다.'}
  ],
  decisions:[
   {question:'왜 하드웨어의 원자적 명령이 필요할까?',answer:'락을 잡는 동작 자체도 "비어 있는지 확인하고 차지하기" 두 단계라서 그 사이에 끼어들면 둘 다 락을 잡았다고 믿게 됩니다. 그래서 CPU는 확인과 변경을 한 번에 하는 compare-and-swap 같은 명령을 제공하고 모든 락은 이 위에 만들어집니다.',cost:'원자적 명령은 다른 코어의 캐시를 무효화하므로 많은 코어가 같은 락을 다투면 생각보다 훨씬 느려집니다.'},
   {question:'왜 기다릴 때 계속 확인하지 않고 잠들까?',answer:'락이 풀렸는지 반복해서 확인하는 스핀 락은 대기가 아주 짧을 때 빠르지만 길어지면 아무 일도 안 하면서 CPU를 태웁니다. 그래서 대부분의 락은 잠깐 돌아 본 뒤 운영체제에 재워 달라고 하고 락이 풀리면 깨웁니다.',cost:'잠들고 깨는 데 문맥 교환 비용이 들어 아주 짧은 임계 구역에는 오히려 느릴 수 있습니다.'},
   {question:'왜 락을 여러 개 잡을 때 순서를 정할까?',answer:'스레드 1이 A를 잡고 B를 기다리고 스레드 2가 B를 잡고 A를 기다리면 둘 다 영원히 멈춥니다. 모든 코드가 A 다음 B 순서로만 잡으면 이런 순환이 생길 수 없습니다.',cost:'코드 전체가 순서 규칙을 지켜야 해서 라이브러리끼리 섞이면 지키기 어렵습니다. 그래서 락을 잡은 채 모르는 코드를 호출하지 않는 습관이 중요합니다.'}
  ],
  today:[
   '서버 코드에서는 직접 락을 잡을 일보다 공유 상태를 없애는 설계가 먼저입니다. 요청마다 독립된 데이터를 쓰고 공유가 필요하면 큐나 DB에 맡깁니다.',
   'Python에서는 threading.Lock과 with 문을 쓰고 락을 잡은 채 네트워크 호출이나 sleep을 하지 않습니다. 동시 연결 수 제한에는 threading.Semaphore나 asyncio.Semaphore를 씁니다.',
   '서버가 여러 대인 순간 프로세스 안의 락은 의미가 없어집니다. DB의 행 잠금과 조건부 UPDATE, Redis의 원자 명령으로 옮깁니다.'
  ],
  sources:[
   ['Dijkstra, EWD 123 · Cooperating Sequential Processes','https://www.cs.utexas.edu/~EWD/transcriptions/EWD01xx/EWD123.html'],
   ['Hoare, Monitors: An Operating System Structuring Concept (CACM, 1974)','https://doi.org/10.1145/355620.361161'],
   ['Reeves, What Really Happened on Mars? (1997)','https://web.archive.org/web/20240421112140/https://www.cs.cornell.edu/courses/cs614/1999sp/papers/pathfinder.html'],
   ['PEP 703 · Making the Global Interpreter Lock Optional','https://peps.python.org/pep-0703/'],
   ['Python · threading','https://docs.python.org/3/library/threading.html']
  ]
 },
 scheduling:{
  intro:'스케줄러는 사용자 눈에 보이지 않지만 컴퓨터가 빠르다고 느끼게 하는 핵심입니다. 무엇을 먼저 실행할지에 대한 답은 시대마다 달랐습니다. 한 대를 여러 사람이 나눠 쓰던 시절에는 공정성이, 대화형 컴퓨터에서는 반응성이, 지금 클라우드에서는 컨테이너 사이의 격리가 중요해졌습니다.',
  timeline:[
   {year:'1962',title:'CTSS와 시분할',body:'MIT의 코르바토 팀은 CTSS에서 CPU 시간을 짧게 나눠 여러 사용자가 동시에 쓰는 것처럼 보이게 했습니다. CPU를 오래 쓰는 작업은 우선순위를 낮추고 짧게 쓰고 입력을 기다리는 대화형 작업은 앞에 두는 다단계 피드백 큐의 원형을 만들었습니다.'},
   {year:'1973',title:'실시간 스케줄링 이론',body:'리우와 레이랜드는 주기적으로 반복되는 작업이 마감 시간을 지킬 수 있는 조건을 증명했습니다. 주기가 짧은 작업에 높은 우선순위를 주는 rate monotonic 방식과 마감이 가까운 작업부터 실행하는 EDF가 이때 정리되었고 지금도 임베디드와 실시간 시스템의 기본입니다.'},
   {year:'2007',title:'Linux CFS',body:'잉고 몰나르가 만든 Completely Fair Scheduler가 Linux 2.6.23에 들어갔습니다. 우선순위별 큐 대신 각 스레드의 가상 실행 시간을 레드-블랙 트리에 넣고 가장 작은 것을 실행합니다. 대화형 작업을 골라내는 복잡한 추측 규칙을 없애고 "적게 실행된 쪽이 다음"이라는 하나의 규칙으로 바꿨습니다.'},
   {year:'2008',title:'cgroup과 컨테이너',body:'Linux 2.6.24에 들어간 cgroup은 프로세스 묶음에 CPU와 메모리 한도를 걸 수 있게 했습니다. Docker와 Kubernetes의 CPU 제한은 모두 이 기능으로 구현됩니다. cgroup v2에서는 cpu.max 파일에 "주기 안에 쓸 수 있는 시간"을 적습니다.'},
   {year:'2023',title:'EEVDF',body:'Linux 6.6부터 피터 지일스트라가 제안한 EEVDF가 CFS를 대신하기 시작했습니다. 1995년 논문에서 나온 방식으로, 받을 몫보다 덜 받은 작업 중 가상 마감 시간이 가장 이른 것을 고릅니다. 공정성은 유지하면서 지연에 민감한 작업이 더 빨리 차례를 받게 합니다.'}
  ],
  decisions:[
   {question:'왜 작업을 끝까지 실행하지 않고 중간에 바꿀까?',answer:'긴 계산 작업이 CPU를 붙들고 있으면 키보드 입력이나 짧은 웹 요청이 그만큼 기다립니다. 정해진 시간이 지나면 강제로 바꾸는 선점 덕분에 긴 작업이 있어도 짧은 작업이 빨리 끝납니다.',cost:'바꿀 때마다 레지스터 저장과 캐시 손실이 생깁니다. 너무 자주 바꾸면 실제 일보다 교체에 시간을 씁니다.'},
   {question:'왜 우선순위 대신 "공정함"을 기준으로 했을까?',answer:'고정 우선순위는 높은 작업이 계속 있으면 낮은 작업이 영원히 실행되지 못하는 기아를 만듭니다. CFS는 모두가 가중치만큼의 몫을 받게 해서 낮은 작업도 결국 차례를 받습니다.',cost:'공정함만으로는 마감이 있는 작업을 보장하지 못합니다. 실시간 작업에는 SCHED_FIFO나 SCHED_DEADLINE 같은 별도 정책을 씁니다.'},
   {question:'왜 컨테이너 CPU 제한이 지연을 만들까?',answer:'cgroup은 기본 100ms 주기마다 할당량을 줍니다. 여러 스레드가 동시에 일하면 할당량을 주기 초반에 다 써 버리고 남은 시간 동안 그룹 전체가 멈춥니다. 평균 사용률은 낮게 보여도 순간적인 정지가 생깁니다.',cost:'제한을 풀면 이웃 컨테이너를 보호하지 못합니다. 지연 민감 서비스는 requests를 넉넉히 주고 limit을 높이거나 스레드 수를 코어 수에 맞춥니다.'}
  ],
  today:[
   '컨테이너 안에서 os.cpu_count()는 노드 전체 코어 수를 돌려줄 수 있습니다. 워커 수를 정할 때는 cgroup의 CPU 제한을 기준으로 합니다.',
   '지연이 튀면 CPU 사용률과 함께 스로틀링 횟수, 실행 큐 대기 시간, 로드 애버리지를 봅니다.',
   'nice와 cgroup 가중치로 배치 작업의 몫을 줄이면 같은 서버에서 온라인 요청을 덜 방해합니다.'
  ],
  sources:[
   ['Corbató et al., An Experimental Time-Sharing System (1962)','https://doi.org/10.1145/1460833.1460871'],
   ['Liu & Layland, Scheduling Algorithms for Multiprogramming in a Hard-Real-Time Environment (JACM, 1973)','https://doi.org/10.1145/321738.321743'],
   ['Linux Kernel · CFS Scheduler','https://docs.kernel.org/scheduler/sched-design-CFS.html'],
   ['Linux Kernel · EEVDF Scheduler','https://docs.kernel.org/scheduler/sched-eevdf.html'],
   ['Linux Kernel · Control Group v2','https://docs.kernel.org/admin-guide/cgroup-v2.html']
  ]
 },
 tls:{
  intro:'웹이 처음 만들어졌을 때 모든 통신은 평문이었습니다. 온라인 결제가 등장하자 카드 번호를 숨길 방법이 필요했고 넷스케이프가 SSL을 만들었습니다. 그 뒤 30년은 결함을 찾고 고치고 오래된 버전을 버리는 역사였습니다. 동시에 인증서를 얻는 일이 비싸고 번거로운 일에서 자동화된 무료 서비스로 바뀌며 HTTPS가 기본이 되었습니다.',
  timeline:[
   {year:'1995',title:'SSL',body:'넷스케이프는 브라우저와 서버 사이를 암호화하는 SSL 2.0을 공개했습니다. 설계 결함이 많아 1996년 SSL 3.0으로 다시 만들었고 이것이 이후 TLS의 바탕이 되었습니다.'},
   {year:'1999',title:'TLS 1.0',body:'IETF가 SSL 3.0을 이어받아 RFC 2246으로 TLS 1.0을 표준화했습니다. 2008년 TLS 1.2(RFC 5246)는 더 안전한 해시와 암호 방식을 쓸 수 있게 했습니다.'},
   {year:'2011',title:'DigiNotar 사건',body:'네덜란드의 인증 기관 DigiNotar가 해킹당해 google.com 등에 대한 가짜 인증서가 발급되었고 실제 감청에 쓰였습니다. 브라우저들은 DigiNotar를 신뢰 목록에서 지웠고 회사는 파산했습니다. 루트 CA 하나의 실수가 전체를 무너뜨릴 수 있다는 교훈은 모든 발급 기록을 공개 로그에 남기는 Certificate Transparency(RFC 6962, 2013)로 이어졌습니다.'},
   {year:'2014',title:'Heartbleed와 POODLE',body:'OpenSSL의 버그 Heartbleed는 서버 메모리의 일부를 읽어 가게 해서 개인키까지 유출될 수 있었습니다. 같은 해 POODLE 공격이 발표되며 SSL 3.0은 RFC 7568로 사용 금지되었습니다. 많은 서비스가 인증서를 재발급하고 키를 교체했습니다.'},
   {year:'2015~2016',title:'Let’s Encrypt',body:'인증서를 무료로, 자동으로 발급하는 Let’s Encrypt가 공개되었습니다. ACME 프로토콜로 서버가 스스로 도메인 소유를 증명하고 90일짜리 인증서를 받아 갱신합니다. 이후 HTTPS 비율이 빠르게 늘었습니다.'},
   {year:'2018~2021',title:'TLS 1.3과 옛 버전 퇴출',body:'2018년 TLS 1.3(RFC 8446)은 왕복 한 번으로 핸드셰이크를 끝내고 약한 암호 방식을 모두 뺐습니다. 2021년 RFC 8996은 TLS 1.0과 1.1의 사용을 공식적으로 금지했습니다.'}
  ],
  decisions:[
   {question:'왜 서버가 중간 CA 인증서까지 보내야 할까?',answer:'루트 CA의 개인키는 유출되면 대체가 매우 어렵기 때문에 오프라인 금고에 두고 거의 쓰지 않습니다. 실제 발급은 루트가 서명한 중간 CA가 합니다. 클라이언트의 신뢰 저장소에는 루트만 있으므로 서버가 중간 인증서를 함께 보내야 체인이 이어집니다.',cost:'중간 인증서를 빠뜨리면 일부 클라이언트에서만 실패해서 원인을 찾기 어렵습니다.'},
   {question:'왜 인증서 수명을 점점 짧게 할까?',answer:'유출된 키나 잘못 발급된 인증서를 폐기 목록으로 막는 방법은 실제로 잘 동작하지 않습니다. 수명이 짧으면 문제가 있는 인증서도 금방 만료되어 피해 기간이 줄어듭니다.',cost:'갱신을 자동화하지 않으면 만료 사고가 자주 납니다. 그래서 짧은 수명과 ACME 자동화는 함께 갑니다.'},
   {question:'왜 TLS 1.3은 선택지를 줄였을까?',answer:'옛 TLS는 수많은 암호 방식 조합을 허용했고 공격자는 양쪽을 속여 가장 약한 조합으로 협상하게 만드는 다운그레이드 공격을 썼습니다. TLS 1.3은 안전한 소수의 방식만 남기고 전방 비밀성을 필수로 만들었습니다.',cost:'오래된 클라이언트는 TLS 1.3으로 접속하지 못합니다. 서비스는 지원할 최소 버전을 정해야 합니다.'}
  ],
  today:[
   '서버에는 중간 인증서를 포함한 fullchain을 배포하고 openssl s_client -showcerts로 실제 체인을 확인합니다.',
   '인증서 갱신은 ACM, cert-manager, certbot 같은 도구로 자동화하고 만료 일수를 따로 감시합니다.',
   '내부 서비스 사이에도 TLS를 쓰고 필요하면 클라이언트도 인증서를 내는 mTLS로 서로를 확인합니다. HSTS 헤더로 브라우저가 HTTP로 접속하지 않게 합니다.'
  ],
  sources:[
   ['RFC 8446 · TLS 1.3','https://www.rfc-editor.org/rfc/rfc8446'],
   ['RFC 8996 · Deprecating TLS 1.0 and 1.1','https://www.rfc-editor.org/rfc/rfc8996'],
   ['RFC 7568 · Deprecating SSL 3.0','https://www.rfc-editor.org/rfc/rfc7568'],
   ['RFC 6962 · Certificate Transparency','https://www.rfc-editor.org/rfc/rfc6962'],
   ['Let’s Encrypt · About','https://letsencrypt.org/about/'],
   ['MDN · Strict-Transport-Security','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security']
  ]
 },
 websocket:{
  intro:'웹은 문서를 요청하고 받는 구조로 시작했습니다. 웹 메일과 채팅, 주식 시세처럼 서버의 변화를 바로 보여 주는 화면이 생기자 개발자들은 HTTP를 비틀어 쓰는 여러 기법을 만들었습니다. WebSocket은 그 우회로들을 정리해 처음부터 양방향 통신을 위해 만든 표준입니다.',
  timeline:[
   {year:'2000년대 초',title:'폴링',body:'브라우저가 몇 초마다 "새 메시지 있나요?"를 묻는 방식입니다. 구현은 쉽지만 대부분의 요청이 빈 응답이고 사용자가 많으면 서버가 쓸모없는 요청을 계속 처리합니다.'},
   {year:'2006',title:'Comet과 롱 폴링',body:'서버가 요청을 바로 답하지 않고 새 소식이 생길 때까지 붙잡아 두는 롱 폴링이 퍼졌고 이런 기법들을 Comet이라고 불렀습니다. 지연은 줄었지만 메시지마다 새 요청과 헤더가 필요했고 프록시가 오래 열린 요청을 끊는 문제가 있었습니다.'},
   {year:'2011',title:'RFC 6455',body:'IETF가 WebSocket 프로토콜을 표준화했습니다. HTTP의 Upgrade로 시작하므로 기존 80·443 포트와 프록시를 지나갈 수 있고 그 뒤에는 작은 프레임 헤더만 붙여 메시지를 보냅니다. 클라이언트가 보내는 프레임은 마스킹하도록 정해 중간 캐시를 속이는 공격을 막았습니다.'},
   {year:'2010년대',title:'Server-Sent Events',body:'HTML 표준에 서버에서 클라이언트로 한 방향 이벤트를 흘려보내는 EventSource가 들어갔습니다. 평범한 HTTP 응답이라 프록시와 인증을 그대로 쓰고 끊기면 브라우저가 자동으로 다시 연결합니다. 알림과 진행률에는 이쪽이 더 단순합니다.'},
   {year:'2018',title:'HTTP/2 위의 WebSocket',body:'RFC 8441은 HTTP/2 연결 하나에서 여러 WebSocket을 스트림으로 열 수 있게 했습니다. 연결 수를 줄일 수 있지만 지원 여부는 서버와 프록시마다 확인해야 합니다.'}
  ],
  decisions:[
   {question:'왜 별도 포트 대신 HTTP Upgrade로 시작할까?',answer:'회사와 학교 네트워크는 80과 443 외의 포트를 막는 경우가 많습니다. HTTP 요청으로 시작하면 기존 방화벽과 프록시, TLS 설정을 그대로 지나갈 수 있고 쿠키로 인증할 수도 있습니다.',cost:'프록시가 Upgrade를 이해하지 못하거나 헤더를 버리면 연결이 실패합니다. nginx 같은 프록시에 별도 설정이 필요합니다.'},
   {question:'왜 ping과 pong이 필요할까?',answer:'TCP는 상대가 사라져도 한동안 알아채지 못하고 중간의 로드 밸런서와 NAT는 오래 조용한 연결을 정리해 버립니다. 주기적인 ping은 연결이 살아 있음을 확인하고 중간 장비의 유휴 타이머를 초기화합니다.',cost:'연결 수가 많으면 ping 트래픽도 무시할 수 없습니다. 주기는 중간 장비의 제한 시간보다 조금 짧게 잡습니다.'},
   {question:'왜 서버가 여러 대면 중계가 필요할까?',answer:'사용자 A는 서버 1에, B는 서버 2에 연결되어 있을 수 있습니다. A가 보낸 메시지를 B에게 전달하려면 서버 1이 서버 2에게 알려야 합니다. Redis Pub/Sub이나 메시지 브로커가 이 역할을 합니다.',cost:'중계 계층이 새 장애 지점이 되고 메시지 순서와 유실을 따로 고민해야 합니다.'}
  ],
  today:[
   '한 방향 알림이면 SSE를, 양방향이고 지연이 중요하면 WebSocket을, 업데이트가 드물면 폴링을 먼저 검토합니다.',
   'nginx에는 proxy_http_version 1.1과 Upgrade, Connection 헤더를 설정하고 proxy_read_timeout보다 짧은 주기로 ping을 보냅니다.',
   '클라이언트는 끊기면 지수 백오프와 무작위 지연으로 재연결하고 마지막으로 받은 메시지 ID를 보내 빠진 메시지를 다시 받습니다.'
  ],
  sources:[
   ['RFC 6455 · The WebSocket Protocol','https://www.rfc-editor.org/rfc/rfc6455'],
   ['RFC 8441 · Bootstrapping WebSockets with HTTP/2','https://www.rfc-editor.org/rfc/rfc8441'],
   ['HTML Standard · Server-sent events','https://html.spec.whatwg.org/multipage/server-sent-events.html'],
   ['nginx · WebSocket proxying','https://nginx.org/en/docs/http/websocket.html'],
   ['MDN · WebSocket API','https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API']
  ]
 },
 ratelimit:{
  intro:'속도 제한은 네트워크 장비에서 먼저 쓰였습니다. 회선이 감당할 수 있는 만큼만 내보내고 넘치는 것은 버리거나 늦추는 장치였습니다. 웹 API가 공개되고 누구나 프로그램으로 호출하게 되자 같은 장치가 API 앞에 붙었습니다. 그리고 장애가 날 때마다 문제는 공격자보다 선의의 재시도인 경우가 많다는 것을 배웠습니다.',
  timeline:[
   {year:'1980년대',title:'리키 버킷과 토큰 버킷',body:'통신망에서는 들쭉날쭉한 트래픽을 일정한 속도로 다듬기 위해 바닥에 구멍 뚫린 양동이처럼 일정 속도로만 내보내는 리키 버킷과, 일정 속도로 채워지는 허용량을 꺼내 쓰는 토큰 버킷을 썼습니다. ATM 망의 트래픽 계약과 이후 인터넷의 서비스 품질 규격이 이 방식을 정리했습니다.'},
   {year:'2012',title:'429 Too Many Requests',body:'API마다 제각각이던 한도 초과 응답을 RFC 6585가 429 상태 코드로 정했습니다. 서버는 Retry-After 헤더로 언제 다시 시도하면 되는지 알려 줄 수 있습니다.'},
   {year:'2015',title:'지수 백오프와 지터',body:'AWS 아키텍처 블로그의 마크 브루커는 여러 클라이언트가 같은 간격으로 재시도하면 경합이 줄지 않고 백오프 간격에 무작위 값을 섞어야 전체 작업이 빨리 끝난다는 시뮬레이션 결과를 발표했습니다. 이후 AWS SDK를 비롯한 많은 클라이언트가 기본으로 지터를 넣었습니다.'},
   {year:'2017',title:'대규모 서비스의 속도 제한',body:'Stripe는 토큰 버킷 기반의 요청 제한기와 동시 요청 제한기, 부하가 높을 때 중요하지 않은 요청부터 버리는 부하 차단기를 함께 쓰는 방법을 공개했습니다. 같은 해 Cloudflare는 전 세계 서버에서 근사한 슬라이딩 윈도로 요청을 세는 방법을 설명했습니다.'},
   {year:'2020년대',title:'RateLimit 헤더 표준화',body:'IETF HTTP API 작업 그룹이 남은 한도와 초기화 시각을 응답 헤더로 알려 주는 RateLimit 헤더를 표준으로 만드는 작업을 하고 있습니다. 클라이언트가 한도에 닿기 전에 스스로 속도를 줄일 수 있게 하려는 것입니다.'}
  ],
  decisions:[
   {question:'왜 고정 윈도 대신 토큰 버킷을 많이 쓸까?',answer:'1분마다 카운터를 0으로 되돌리는 고정 윈도는 구현이 쉽지만 59초에 100번, 61초에 100번을 보내면 2초 사이에 한도의 두 배가 통과합니다. 토큰 버킷은 버킷 크기만큼만 몰림을 허용하고 그 뒤로는 채우는 속도를 넘지 못합니다.',cost:'대상마다 토큰 수와 마지막 시각 두 값을 저장하고 매번 계산해야 합니다. 서버가 여러 대면 이 상태를 공유 저장소에 둬야 합니다.'},
   {question:'왜 거절할 때 429와 Retry-After를 돌려줄까?',answer:'500처럼 보이면 클라이언트는 서버가 고장 났다고 보고 바로 재시도합니다. 429는 "너무 많이 보냈다"는 뜻이라 클라이언트가 속도를 줄이고 Retry-After는 언제 다시 와도 되는지 정확히 알려 줍니다.',cost:'클라이언트가 헤더를 무시하면 소용이 없습니다. 반복해서 무시하는 키는 더 강하게 차단하는 단계가 필요합니다.'},
   {question:'왜 재시도에 무작위 값을 섞을까?',answer:'장애 순간 실패한 수만 개의 클라이언트가 모두 1초, 2초, 4초 뒤에 재시도하면 같은 순간에 몰려 복구된 서버를 다시 쓰러뜨립니다. 0부터 백오프 값 사이의 무작위 시간을 기다리면 재시도가 고르게 흩어집니다.',cost:'개별 요청의 재시도가 운 나쁘게 늦어질 수 있습니다. 최대 대기 시간과 최대 횟수를 함께 둡니다.'}
  ],
  today:[
   'API 앞에서는 API Gateway나 nginx의 limit_req, 앱 안에서는 Redis 카운터로 대상별 한도를 겁니다. 서버별로 따로 세면 전체 한도가 서버 수만큼 늘어난다는 점을 기억합니다.',
   '거절은 429와 Retry-After로 하고 남은 한도를 헤더로 알려 주면 클라이언트가 미리 속도를 줄일 수 있습니다.',
   '클라이언트 재시도는 멱등한 요청에만 하고 지수 백오프, 지터, 최대 횟수, 전체 제한 시간을 둡니다. 여러 층이 각자 재시도하면 시도 횟수가 곱으로 늘어납니다.'
  ],
  sources:[
   ['RFC 6585 · Additional HTTP Status Codes (429)','https://www.rfc-editor.org/rfc/rfc6585'],
   ['AWS Architecture Blog · Exponential Backoff And Jitter','https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/'],
   ['AWS Builders’ Library · Timeouts, retries, and backoff with jitter','https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/'],
   ['Stripe · Scaling your API with rate limiters','https://stripe.com/blog/rate-limiters'],
   ['Cloudflare · How we built rate limiting capable of scaling to millions of domains','https://blog.cloudflare.com/counting-things-a-lot-of-different-things/'],
   ['IETF · RateLimit header fields for HTTP (draft)','https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/']
  ]
 },
 replication:{
  intro:'데이터를 복사해 두는 일은 백업만큼 오래되었지만 복사본을 실시간으로 따라오게 하고 읽기에 쓰는 일은 웹 서비스가 커지면서 일상이 되었습니다. 한 대로 버티다가 읽기를 복제본으로 나누고 그래도 부족하면 데이터를 나누는 순서는 수많은 서비스가 똑같이 밟은 길입니다. 그 길에서 배운 것은 복사본은 늦을 수 있고 나누는 기준은 바꾸기 어렵다는 점입니다.',
  timeline:[
   {year:'2000',title:'MySQL 복제',body:'MySQL 3.23이 binlog를 이용한 주·복제본 복제를 넣었습니다. 쓰기는 한 서버에, 읽기는 여러 복제본에 보내는 구성이 LAMP 시대 웹 서비스의 표준이 되었습니다.'},
   {year:'2007',title:'Amazon Dynamo',body:'아마존은 장바구니가 절대 쓰기를 거절하지 않도록 일관 해싱으로 데이터를 나누고 여러 노드에 복제하는 Dynamo를 발표했습니다. 잠깐 서로 다른 값이 있어도 나중에 맞추는 최종 일관성을 택했고 Cassandra와 DynamoDB에 큰 영향을 줬습니다. 일관 해싱 자체는 1997년 카거 등의 논문에서 나왔습니다.'},
   {year:'2000~2002',title:'CAP 정리',body:'에릭 브루어는 2000년 강연에서 네트워크가 갈라질 때 일관성과 가용성을 동시에 가질 수 없다고 주장했고 2002년 길버트와 린치가 이를 증명했습니다. 복제 시스템을 설계할 때 갈라짐이 생기면 어느 쪽을 포기할지 먼저 정하라는 뜻으로 쓰입니다.'},
   {year:'2010',title:'PostgreSQL 스트리밍 복제',body:'PostgreSQL 9.0이 WAL을 실시간으로 보내는 스트리밍 복제와 복제본에서 읽기를 받는 핫 스탠바이를 넣었습니다. 기본은 비동기이고 9.1부터 동기 복제를 고를 수 있습니다.'},
   {year:'2018',title:'GitHub의 24시간 장애',body:'GitHub의 미국 동부 데이터센터와 네트워크 허브 사이 연결이 43초 동안 끊기자 자동 장애 조치가 서부의 복제본을 주 DB로 승격했습니다. 동부에는 서부로 복제되지 않은 쓰기가 남아 있었고 두 곳의 데이터를 맞추느라 24시간 11분 동안 서비스가 저하됐습니다. 비동기 복제의 장애 조치가 데이터 일관성 문제를 만들 수 있음을 보여 준 사례입니다.'}
  ],
  decisions:[
   {question:'왜 대부분 비동기 복제가 기본일까?',answer:'동기 복제는 커밋마다 복제본이 받아 적을 때까지 기다리므로 쓰기 지연이 네트워크 왕복만큼 늘어납니다. 복제본이 느리거나 죽으면 주 DB의 쓰기도 멈춥니다. 비동기는 주 DB가 기다리지 않아 빠르고 복제본 장애가 쓰기에 영향을 주지 않습니다.',cost:'장애 조치 순간 아직 복제되지 않은 쓰기가 사라질 수 있습니다. 결제처럼 잃으면 안 되는 데이터는 동기나 반동기 복제, 또는 쿼럼 기반 저장소를 씁니다.'},
   {question:'왜 샤딩은 가능한 한 미룰까?',answer:'샤딩하면 샤드를 넘는 조인, 트랜잭션, 고유 제약을 DB가 해 주지 않아 앱이 직접 해야 합니다. 샤드 키를 잘못 고르면 바꾸기도 매우 어렵습니다. 인덱스, 캐시, 읽기 복제본, 더 큰 서버로 버틸 수 있으면 그쪽이 훨씬 단순합니다.',cost:'너무 늦게 시작하면 데이터가 커진 상태에서 옮기느라 더 위험합니다. 쓰기량 추세를 보고 한계에 닿기 전에 계획합니다.'},
   {question:'왜 해시 나머지 대신 일관 해싱을 쓸까?',answer:'hash(key) % N으로 나누면 서버를 하나 늘릴 때 거의 모든 키의 자리가 바뀌어 데이터를 대부분 옮겨야 합니다. 일관 해싱은 키와 서버를 같은 원 위에 놓아 새 서버가 맡게 된 구간의 키만 옮기면 됩니다.',cost:'서버 수가 적으면 구간 크기가 고르지 않아 가상 노드를 여러 개 둬야 하고 구현이 복잡해집니다.'}
  ],
  today:[
   '읽기 복제본을 쓰면 쓰기 직후 읽기, 재고 확인, 결제 직전 확인은 주 DB로 보내고 나머지 목록 조회를 복제본으로 보냅니다.',
   '복제 지연(ReplicaLag, pg_stat_replication의 replay_lag)을 지표와 알림에 넣습니다. 지연이 길어지면 읽기를 주 DB로 되돌리는 장치도 둡니다.',
   '샤딩이 필요하면 대부분의 쿼리가 한 샤드에서 끝나는 키(예: 사용자 ID, 테넌트 ID)를 고르고 DynamoDB처럼 샤딩을 대신해 주는 저장소도 함께 검토합니다.'
  ],
  sources:[
   ['DeCandia et al., Dynamo: Amazon’s Highly Available Key-value Store (SOSP, 2007)','https://doi.org/10.1145/1323293.1294281'],
   ['Karger et al., Consistent Hashing and Random Trees (STOC, 1997)','https://doi.org/10.1145/258533.258660'],
   ['Gilbert & Lynch, Brewer’s Conjecture … (SIGACT News, 2002)','https://doi.org/10.1145/564585.564601'],
   ['PostgreSQL · Log-Shipping Standby Servers','https://www.postgresql.org/docs/current/warm-standby.html'],
   ['GitHub · October 21 post-incident analysis (2018)','https://github.blog/news-insights/company-news/oct21-post-incident-analysis/'],
   ['AWS · RDS read replicas','https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html']
  ]
 },
 raft:{
  intro:'여러 컴퓨터가 하나의 결정에 동의하게 만드는 문제는 분산 시스템의 가장 깊은 문제입니다. 이론은 일찍부터 이 문제가 얼마나 어려운지 보여 줬고 실용적인 해법인 Paxos는 정확했지만 이해하기 어려웠습니다. Raft는 정확성보다 이해하기 쉬움을 설계 목표로 내세운 드문 알고리즘이고 그 덕분에 지금 많은 인프라의 바닥에서 돌아갑니다.',
  timeline:[
   {year:'1985',title:'FLP 불가능성',body:'피셔, 린치, 패터슨은 메시지 지연에 상한이 없는 비동기 시스템에서는 서버 하나만 멈출 수 있어도 항상 합의에 도달하는 결정적 알고리즘이 없다는 것을 증명했습니다. 이후 실제 알고리즘들은 타임아웃 같은 시간 가정을 써서 이 벽을 피해 갑니다.'},
   {year:'1989~1998',title:'Paxos',body:'램포트는 그리스 섬의 가상의 의회 이야기로 합의 알고리즘 Paxos를 설명한 논문을 썼습니다. 1990년에 제출했지만 비유가 어렵다는 이유로 오래 미뤄져 1998년에야 출판됐습니다. 정확성은 인정받았지만 실제 시스템으로 옮기기 어렵다는 평이 따라다녔습니다.'},
   {year:'2006',title:'Chubby와 ZooKeeper',body:'구글은 Paxos 위에 분산 잠금 서비스 Chubby를 만들어 리더 선출과 설정 저장에 썼습니다. 비슷한 역할의 오픈소스 ZooKeeper가 뒤따랐고 Hadoop과 Kafka가 이를 썼습니다. 논문은 Paxos를 실제로 구현하며 겪은 어려움을 자세히 적었습니다.'},
   {year:'2014',title:'Raft',body:'스탠퍼드의 온가로와 오스터하우트는 「이해할 수 있는 합의 알고리즘을 찾아서」에서 Raft를 발표했습니다. 리더 선출, 로그 복제, 안전성을 따로 설명하고 학생 실험에서 Paxos보다 이해도가 높다는 결과도 실었습니다. 같은 시기 CoreOS의 etcd가 Raft를 채택했고 etcd는 Kubernetes의 상태 저장소가 되었습니다.'},
   {year:'2020~2025',title:'Kafka의 KRaft',body:'Kafka는 메타데이터 관리를 ZooKeeper에 맡기던 구조를 Raft 기반의 자체 쿼럼 KRaft로 바꾸는 작업(KIP-500)을 시작했고 Kafka 4.0부터는 ZooKeeper 없이 KRaft만 지원합니다. 운영해야 할 시스템이 하나 줄었습니다.'}
  ],
  decisions:[
   {question:'왜 리더를 하나 두는 구조일까?',answer:'모든 서버가 동시에 쓰기를 받으면 같은 위치에 서로 다른 값을 넣으려 해서 충돌 해결이 복잡해집니다. 리더 하나가 순서를 정하면 팔로워는 그대로 따라 적기만 하면 되어 이해하고 구현하기 쉽습니다.',cost:'모든 쓰기가 리더를 거치므로 리더가 병목이 되고 리더가 죽으면 새 리더가 뽑힐 때까지 짧게 쓰기가 멈춥니다.'},
   {question:'왜 과반수일까?',answer:'과반수 두 집합은 반드시 한 서버 이상 겹칩니다. 그래서 커밋된 항목은 다음 선거의 과반수 안에 반드시 있는 서버가 알고 있고 로그가 뒤처진 후보는 표를 받지 못해 커밋된 항목이 사라지지 않습니다. 네트워크가 갈라져도 과반수를 가진 쪽은 하나뿐이라 리더가 둘이 되어 서로 다른 결정을 내리지 않습니다.',cost:'과반수가 살아 있지 않으면 시스템 전체가 쓰기를 멈춥니다. 가용성보다 일관성을 택한 설계입니다.'},
   {question:'왜 임기 번호를 붙일까?',answer:'네트워크가 끊겼다 돌아온 옛 리더는 자기가 아직 리더라고 믿을 수 있습니다. 모든 메시지에 임기 번호를 붙이면 더 높은 임기를 본 서버는 즉시 팔로워로 물러나고 낮은 임기의 메시지는 거절됩니다.',cost:'임기와 투표 기록을 디스크에 안전하게 저장해야 해서 디스크가 느리면 하트비트와 선거가 흔들립니다. etcd가 빠른 디스크를 요구하는 이유입니다.'}
  ],
  today:[
   'Kubernetes의 모든 상태는 etcd에 저장되고 etcd는 Raft로 복제됩니다. 직접 운영한다면 서로 다른 영역에 3대나 5대를 두고 디스크 fsync 지연을 감시합니다.',
   '분산 잠금이나 리더 선출이 필요할 때 직접 구현하지 말고 etcd, Consul, ZooKeeper 같은 검증된 합의 시스템이나 관리형 서비스를 씁니다.',
   '합의 시스템은 설정, 메타데이터, 리더 정보처럼 작고 중요한 데이터에 맞습니다. 대량의 업무 데이터를 넣으면 과반수 왕복 때문에 느려집니다.'
  ],
  sources:[
   ['Ongaro & Ousterhout, In Search of an Understandable Consensus Algorithm (USENIX ATC, 2014)','https://www.usenix.org/conference/atc14/technical-sessions/presentation/ongaro'],
   ['Raft 공식 사이트','https://raft.github.io/'],
   ['Lamport, The Part-Time Parliament (TOCS, 1998)','https://doi.org/10.1145/279227.279229'],
   ['Fischer, Lynch & Paterson, Impossibility of Distributed Consensus with One Faulty Process (JACM, 1985)','https://doi.org/10.1145/3149.214121'],
   ['Burrows, The Chubby Lock Service (OSDI, 2006)','https://www.usenix.org/legacy/event/osdi06/tech/burrows.html'],
   ['Apache Kafka · KIP-500','https://cwiki.apache.org/confluence/display/KAFKA/KIP-500%3A+Replace+ZooKeeper+with+a+Self-Managed+Metadata+Quorum']
  ]
 },
 pytest:{
  intro:'개발자가 직접 테스트 코드를 쓰는 습관은 생각보다 새롭습니다. 오랫동안 테스트는 개발이 끝난 뒤 다른 사람이 하는 일이었습니다. 작은 테스트를 자주 돌리면 설계까지 좋아진다는 생각이 1990년대에 퍼지면서 테스트 도구는 언어마다 기본 장비가 되었습니다. Python에서는 그 도구를 얼마나 덜 번거롭게 만들 수 있는가가 경쟁의 축이었습니다.',
  timeline:[
   {year:'1989~1997',title:'SUnit과 JUnit',body:'켄트 벡은 Smalltalk용 테스트 도구 SUnit을 만들었고 1997년 에리히 감마와 함께 Java용 JUnit을 만들었습니다. 테스트 클래스, setUp과 tearDown, assert 메서드라는 틀은 이후 수많은 언어의 xUnit 도구로 복제되었습니다.'},
   {year:'2001',title:'Python unittest',body:'JUnit을 본뜬 PyUnit이 Python 2.1 표준 라이브러리에 unittest로 들어갔습니다. 클래스를 만들고 self.assertEqual 같은 메서드를 써야 했습니다. 공식 문서도 JUnit에서 영감을 받았다고 적고 있습니다.'},
   {year:'2002',title:'테스트 주도 개발',body:'켄트 벡의 책 『테스트 주도 개발』은 실패하는 테스트를 먼저 쓰고, 통과할 만큼만 코드를 쓰고, 다시 다듬는 짧은 순환을 제안했습니다. 테스트를 검증 도구가 아니라 설계 도구로 보게 만든 책입니다.'},
   {year:'2004',title:'py.test의 시작',body:'PyPy 프로젝트의 홀거 크레켈은 unittest가 Java 같은 문체라 번거롭다고 보고 평범한 assert와 함수만으로 테스트하는 도구를 만들기 시작했습니다. assert 문을 다시 해석해 실패한 값을 보여 주는 기능이 이때부터 있었고 이것이 py.test를 거쳐 지금의 pytest가 되었습니다.'},
   {year:'2000~2010년대',title:'속성 기반 테스트와 테스트 피라미드',body:'2000년 Haskell의 QuickCheck는 예시 몇 개 대신 무작위 입력 수백 개로 성질을 확인하는 방식을 보여 줬고 Python에서는 Hypothesis가 이어받았습니다. 마이크 콘이 제안하고 마틴 파울러가 정리한 테스트 피라미드는 빠른 단위 테스트를 많이, 느린 UI 테스트를 적게 두라는 기준이 되었습니다.'}
  ],
  decisions:[
   {question:'왜 pytest는 평범한 assert를 쓸까?',answer:'self.assertEqual(a, b), assertIn, assertTrue처럼 수십 개의 메서드를 외우는 대신 Python 문법 그대로 assert a == b를 쓰게 했습니다. pytest는 테스트 파일을 불러올 때 assert 문을 고쳐 써서 실패하면 양쪽 값과 차이를 보여 줍니다.',cost:'assert를 다시 쓰는 마법은 테스트 파일과 등록된 플러그인에만 적용됩니다. 일반 모듈의 assert는 python -O로 실행하면 사라지므로 업무 검증에는 쓰지 않습니다.'},
   {question:'왜 setUp 대신 픽스처를 쓸까?',answer:'setUp은 클래스의 모든 테스트가 같은 준비를 공유해 필요 없는 준비까지 합니다. 픽스처는 테스트가 매개변수 이름으로 필요한 것만 요청하고 픽스처끼리 조합할 수 있으며 범위(함수, 모듈, 세션)를 골라 비싼 준비를 재사용합니다.',cost:'픽스처가 여러 파일의 conftest.py에 흩어지면 어디서 오는지 찾기 어렵습니다. pytest --fixtures로 목록을 확인합니다.'},
   {question:'왜 가짜 객체를 쓰되 아껴 써야 할까?',answer:'외부 결제 API나 이메일 서버를 매번 실제로 부르면 느리고 돈이 들고 상대 서버 상태에 따라 테스트가 흔들립니다. 가짜 객체로 바꾸면 빠르고 결과가 일정합니다.',cost:'가짜는 실제와 다를 수 있어 테스트는 통과하는데 실제로는 깨질 수 있습니다. 중요한 연결은 테스트 환경의 실제 서비스나 계약 테스트로 따로 확인합니다.'}
  ],
  today:[
   '버그를 고칠 때는 그 버그를 재현하는 테스트를 먼저 써서 실패를 확인한 뒤 고칩니다.',
   '경계값(빈 입력, 0, 최댓값, 음수)을 parametrize로 묶어 두고 외부 의존성은 monkeypatch나 가짜 객체로 바꿉니다.',
   'CI에서 pytest를 돌려 실패하면 병합을 막고 느린 통합 테스트에는 마커를 붙여 따로 돌릴 수 있게 합니다.'
  ],
  sources:[
   ['pytest · History','https://docs.pytest.org/en/stable/history.html'],
   ['pytest · Fixtures','https://docs.pytest.org/en/stable/how-to/fixtures.html'],
   ['Python · unittest','https://docs.python.org/3/library/unittest.html'],
   ['Claessen & Hughes, QuickCheck (ICFP, 2000)','https://doi.org/10.1145/351240.351266'],
   ['Martin Fowler · TestPyramid','https://martinfowler.com/bliki/TestPyramid.html'],
   ['Hypothesis','https://hypothesis.readthedocs.io/']
  ]
 },
 git:{
  intro:'Git은 기술보다 사건에서 태어났습니다. 리눅스 커널 개발자들이 쓰던 상용 도구를 쓸 수 없게 되자 리누스 토르발스가 몇 주 만에 직접 만들었습니다. 빠르고, 분산되어 있고, 브랜치가 가벼워야 한다는 처음의 목표는 이후 개발자들이 협업하는 방식 자체를 바꿨습니다.',
  timeline:[
   {year:'1990년대',title:'중앙 집중식 버전 관리',body:'CVS와 2000년에 나온 Subversion은 서버 하나에 이력을 두고 개발자가 거기서 파일을 받아 고친 뒤 다시 올렸습니다. 서버에 연결해야 이력을 볼 수 있었고 브랜치를 만들고 합치는 일이 무겁고 위험해서 잘 쓰지 않았습니다.'},
   {year:'2005',title:'BitKeeper 사태와 Git의 탄생',body:'리눅스 커널은 2002년부터 분산 버전 관리 도구 BitKeeper를 무료로 썼습니다. 2005년 개발 회사와의 관계가 깨져 무료 사용이 철회되자 리누스 토르발스는 속도, 단순한 설계, 수천 개의 병렬 브랜치, 완전한 분산을 목표로 Git을 만들었습니다. 첫 커밋은 2005년 4월이고 몇 달 뒤 커널 개발이 Git으로 옮겨졌습니다.'},
   {year:'2008',title:'GitHub',body:'GitHub이 문을 열고 풀 리퀘스트로 변경을 제안하고 리뷰하는 방식을 대중화했습니다. 저장소를 포크하고 풀 리퀘스트를 보내는 흐름이 오픈소스와 회사 개발 모두의 기본이 되었습니다.'},
   {year:'2010',title:'git-flow와 트렁크 기반 개발',body:'빈센트 드리센이 develop, feature, release, hotfix 브랜치를 나누는 git-flow 모델을 발표해 널리 쓰였습니다. 지속적 배포가 흔해지면서 수명이 짧은 브랜치를 main에 자주 병합하는 트렁크 기반 개발이 다시 주목받았고 드리센도 나중에 웹 앱에는 더 단순한 흐름이 맞다는 메모를 덧붙였습니다.'},
   {year:'2020',title:'기본 브랜치 이름',body:'Git 2.28은 git init이 만드는 첫 브랜치 이름을 init.defaultBranch 설정으로 바꿀 수 있게 했습니다. 같은 해 GitHub은 새 저장소의 기본 브랜치를 main으로 바꿨습니다.'}
  ],
  decisions:[
   {question:'왜 차이 대신 스냅샷을 저장할까?',answer:'Git은 각 커밋에서 프로젝트 전체의 상태를 가리킵니다. 바뀌지 않은 파일은 같은 해시의 객체를 그대로 다시 가리키므로 실제로 공간을 거의 쓰지 않습니다. 어떤 커밋으로 가든 차이를 차례로 적용할 필요 없이 바로 그 상태를 꺼낼 수 있어 브랜치 전환이 빠릅니다.',cost:'큰 바이너리 파일을 자주 바꾸면 버전마다 새 객체가 쌓여 저장소가 커집니다. 이런 파일은 Git LFS로 따로 관리합니다.'},
   {question:'왜 내용의 해시를 이름으로 쓸까?',answer:'같은 내용은 어디서나 같은 이름을 가지므로 중복 저장이 없고 두 저장소를 비교하기 쉽습니다. 커밋 해시에는 부모 커밋의 해시가 들어가서 과거 이력을 몰래 바꾸면 그 뒤의 모든 해시가 달라져 바로 드러납니다.',cost:'SHA-1의 충돌 공격이 현실이 되면서 Git은 SHA-256 저장소 형식을 추가했지만 생태계 전환은 아직 진행 중입니다.'},
   {question:'왜 브랜치를 그렇게 가볍게 만들었을까?',answer:'브랜치는 커밋 해시 하나를 적은 작은 파일일 뿐입니다. 만들고 지우는 데 비용이 거의 없으니 실험이나 작은 작업마다 브랜치를 만들 수 있고 이것이 풀 리퀘스트 중심의 협업을 가능하게 했습니다.',cost:'브랜치를 쉽게 만들 수 있는 만큼 오래 방치된 브랜치가 쌓이고 늦게 합칠수록 충돌이 커집니다.'}
  ],
  today:[
   'main은 항상 배포 가능한 상태로 두고 작업은 수명이 짧은 브랜치에서 하며 풀 리퀘스트로 리뷰와 CI를 거친 뒤 병합합니다.',
   '커밋은 하나의 의도만 담고 메시지 첫 줄에 무엇을 왜 바꿨는지 적습니다. 비밀 키를 커밋했다면 이력에서 지우는 것보다 키를 먼저 폐기합니다.',
   '공유 브랜치에서는 되돌릴 때 revert를 쓰고 강제 push가 필요하면 --force-with-lease를 씁니다.'
  ],
  sources:[
   ['Pro Git · A Short History of Git','https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git'],
   ['Pro Git · Git Objects','https://git-scm.com/book/en/v2/Git-Internals-Git-Objects'],
   ['Git 첫 커밋 (2005)','https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290'],
   ['Driessen · A successful Git branching model (2010)','https://nvie.com/posts/a-successful-git-branching-model/'],
   ['Trunk Based Development','https://trunkbaseddevelopment.com/'],
   ['GitHub Blog · Highlights from Git 2.28','https://github.blog/news-insights/the-library/highlights-from-git-2-28/']
  ]
 },
 kubernetes:{
  intro:'Kubernetes는 구글이 10년 넘게 쓴 내부 클러스터 관리 경험을 바탕으로 2014년 공개한 오픈소스입니다. 핵심 생각은 오래되었습니다. 서버를 하나하나 관리하지 말고 원하는 상태를 적어 두면 시스템이 계속 맞춘다는 것입니다. 컨테이너가 대중화된 시점에 이 생각이 표준 API로 나오면서 클라우드에서 앱을 운영하는 공통 언어가 되었습니다.',
  timeline:[
   {year:'2003~2015',title:'Borg',body:'구글은 2000년대 초부터 Borg로 검색, Gmail 같은 서비스와 배치 작업을 수만 대 서버에 함께 배치했습니다. 2015년 EuroSys 논문에서 그 설계와 교훈을 공개했습니다. 작업을 선언하고 시스템이 배치와 재시작을 맡는 방식, 여러 작업을 한 서버에 촘촘히 채우는 방식이 여기서 나왔습니다.'},
   {year:'2013',title:'Docker',body:'Docker는 Linux의 namespace와 cgroup 위에 이미지 형식과 쉬운 도구를 얹어 컨테이너를 누구나 쓰게 만들었습니다. 컨테이너 하나는 쉬워졌지만 수백 개를 여러 서버에서 운영하는 문제가 남았습니다.'},
   {year:'2014~2015',title:'Kubernetes 공개와 CNCF',body:'구글은 2014년 Borg의 교훈을 담은 Kubernetes를 오픈소스로 공개했고 2015년 1.0을 내며 리눅스 재단 산하에 새로 만든 CNCF에 기증했습니다. 특정 회사의 제품이 아니라 여러 클라우드가 함께 지원하는 표준이 된 계기입니다.'},
   {year:'2017~2018',title:'관리형 Kubernetes',body:'구글 GKE에 이어 Azure AKS, AWS EKS가 나오며 컨트롤 플레인을 클라우드가 운영해 주는 방식이 일반화되었습니다. 사용자는 etcd와 API 서버를 직접 운영하지 않아도 되었습니다.'},
   {year:'2022',title:'dockershim 제거',body:'Kubernetes 1.24는 Docker 엔진을 직접 쓰기 위한 중간 계층 dockershim을 제거했습니다. 컨테이너 실행은 표준 인터페이스(CRI)를 지원하는 containerd나 CRI-O가 맡습니다. Docker로 만든 이미지는 표준 형식이라 그대로 실행됩니다.'}
  ],
  decisions:[
   {question:'왜 명령 대신 원하는 상태를 선언할까?',answer:'"파드 하나 더 만들어"라는 명령은 중간에 실패하거나 놓치면 상태가 어긋납니다. "파드는 3개여야 한다"는 선언은 컨트롤러가 계속 실제와 비교하므로 무엇이 실패했든 다음 확인에서 바로잡습니다. 같은 YAML을 여러 번 적용해도 결과가 같아 Git에 두고 관리하기도 좋습니다.',cost:'원하는 상태와 실제 상태가 맞춰지기까지 시간이 걸리고 왜 아직 맞지 않는지 이벤트와 상태 필드를 읽는 법을 익혀야 합니다.'},
   {question:'왜 컨테이너 대신 파드가 기본 단위일까?',answer:'로그 수집기나 프록시처럼 앱 컨테이너와 항상 함께 붙어 다니며 네트워크와 저장 공간을 공유해야 하는 보조 컨테이너가 있습니다. 파드로 묶으면 같은 노드에 함께 배치되고 localhost로 통신합니다.',cost:'파드는 언제든 사라지고 새 IP로 다시 만들어지는 일회용입니다. 파드 IP를 직접 쓰지 말고 Service를 통해 접근해야 합니다.'},
   {question:'왜 상태를 etcd 하나에 모을까?',answer:'모든 컨트롤러가 API 서버를 통해 하나의 저장소를 보고 고치므로 구성 요소끼리 직접 대화할 필요가 없습니다. 컨트롤러가 죽었다 살아나도 etcd의 상태를 다시 읽으면 이어서 일할 수 있습니다.',cost:'etcd가 클러스터의 심장이 되어 백업과 성능 관리가 중요해집니다. 관리형 서비스를 쓰는 큰 이유입니다.'}
  ],
  today:[
   '모든 컨테이너에 CPU와 메모리 requests를 주고 readiness probe로 준비된 파드만 트래픽을 받게 합니다. liveness probe는 외부 의존성을 보지 않습니다.',
   '앱은 SIGTERM을 받으면 새 요청을 거절하고 진행 중인 요청을 마친 뒤 종료합니다. 설정과 비밀은 ConfigMap과 Secret으로 이미지 밖에 둡니다.',
   '서비스가 적고 팀이 작다면 ECS, Cloud Run, App Runner 같은 더 단순한 관리형 컨테이너 서비스도 먼저 비교합니다.'
  ],
  sources:[
   ['Verma et al., Large-scale cluster management at Google with Borg (EuroSys, 2015)','https://doi.org/10.1145/2741948.2741964'],
   ['Kubernetes Blog · Borg: The Predecessor to Kubernetes','https://kubernetes.io/blog/2015/04/borg-predecessor-to-kubernetes/'],
   ['Kubernetes Blog · Dockershim FAQ','https://kubernetes.io/blog/2022/02/17/dockershim-faq/'],
   ['Kubernetes · Controllers','https://kubernetes.io/docs/concepts/architecture/controller/'],
   ['CNCF · Who we are','https://www.cncf.io/about/who-we-are/']
  ]
 },
 machine:{
  intro:'지금 우리가 쓰는 컴퓨터는 거의 모두 1940년대에 정해진 한 가지 구조를 따릅니다. 프로그램을 데이터처럼 메모리에 넣어 두고 CPU가 그것을 한 줄씩 꺼내 실행하는 구조입니다. 그 뒤 80년 동안 바뀐 것은 속도와 크기, 그리고 사람이 쓴 코드를 그 명령으로 바꾸는 방법이었습니다.',
  timeline:[
   {year:'1936',title:'튜링의 보편 기계',body:'앨런 튜링은 논문 「On Computable Numbers」에서 테이프에 적힌 기호를 읽고 쓰는 단순한 가상의 기계를 정의했습니다. 그리고 다른 기계의 동작 규칙을 테이프에 적어 주면 그 기계를 흉내 낼 수 있는 보편 기계가 있음을 보였습니다. 프로그램도 데이터처럼 적어 넣을 수 있다는 생각의 이론적 뿌리입니다.'},
   {year:'1945',title:'ENIAC과 EDVAC 보고서',body:'1945년 완성된 ENIAC은 초당 수천 번 덧셈을 했지만 프로그램을 바꾸려면 케이블과 스위치를 며칠씩 다시 꽂아야 했습니다. 같은 해 존 폰 노이만은 다음 기계 EDVAC의 설계 초안에서 명령도 숫자로 바꿔 메모리에 저장하자고 정리했습니다. 이것이 저장 프로그램 방식이고 흔히 폰 노이만 구조라고 부릅니다. 아이디어에는 에커트와 모클리 등 ENIAC 팀의 기여도 컸다는 평가가 있습니다.'},
   {year:'1948~1949',title:'처음 실행된 저장 프로그램',body:'1948년 6월 맨체스터 대학의 작은 실험 기계(Baby)가 메모리에 저장된 프로그램을 처음 실행했습니다. 1949년에는 케임브리지의 모리스 윌크스 팀이 만든 EDSAC이 실제 계산 업무에 쓰이는 첫 저장 프로그램 컴퓨터가 되었습니다. EDSAC 팀은 자주 쓰는 명령 묶음을 서브루틴으로 재사용하는 방법도 만들었습니다.'},
   {year:'1952~1957',title:'컴파일러의 등장',body:'그레이스 호퍼는 1952년 A-0 시스템으로 사람이 쓴 짧은 코드를 기계 명령으로 바꾸는 프로그램을 만들었습니다. 1957년 IBM의 존 배커스 팀이 내놓은 FORTRAN 컴파일러는 수식처럼 쓴 코드를 사람이 직접 짠 기계어만큼 빠른 코드로 바꿔 보이며 고급 언어 시대를 열었습니다.'},
   {year:'1960',title:'해석하며 실행하기: LISP',body:'존 매카시는 1960년 논문에서 LISP을 정의하며 LISP 코드를 해석해 실행하는 함수 eval을 LISP으로 직접 적었습니다. 이를 실제로 기계어로 옮긴 것이 최초의 인터프리터 중 하나가 되었습니다. 미리 번역하지 않고 실행하면서 해석하는 방식의 출발점입니다.'},
   {year:'1971~현재',title:'마이크로프로세서와 Python',body:'1971년 인텔 4004는 CPU 전체를 손톱만 한 칩 하나에 담았습니다. 1991년 귀도 반 로섬이 공개한 Python은 소스를 바이트코드로 바꾸고 인터프리터가 실행하는 방식을 택했습니다. Python 3.13부터는 자주 실행되는 부분을 기계어로 바꾸는 실험적인 JIT 컴파일러가 들어갔습니다.'}
  ],
  decisions:[
   {question:'왜 프로그램을 메모리에 데이터처럼 넣었을까?',answer:'프로그램이 배선에 묶여 있으면 바꿀 때마다 기계를 다시 조립해야 합니다. 명령을 숫자로 바꿔 메모리에 두면 다른 숫자를 넣는 것만으로 다른 프로그램이 됩니다. 프로그램이 데이터라면 프로그램이 다른 프로그램을 만들고 바꿀 수도 있으니 컴파일러, 인터프리터, 운영체제가 모두 이 위에서 가능해졌습니다.',cost:'명령과 데이터가 같은 메모리 통로를 쓰므로 CPU가 빨라질수록 메모리를 기다리는 시간이 병목이 됩니다. 이 병목을 줄이려고 캐시가 생겼습니다.'},
   {question:'왜 CPU 안에 레지스터를 따로 둘까?',answer:'메모리는 CPU보다 훨씬 느려서 매 계산마다 메모리를 오가면 CPU가 대부분 기다리게 됩니다. 지금 계산 중인 몇 개의 값을 CPU 안의 레지스터에 두면 한 사이클 안에 읽고 씁니다.',cost:'레지스터는 수가 적어서 컴파일러가 어떤 값을 레지스터에 둘지 정교하게 골라야 하고 문맥 교환 때마다 레지스터 값을 모두 저장하고 복원해야 합니다.'},
   {question:'왜 Python은 기계어 대신 바이트코드로 바꿀까?',answer:'기계어는 CPU 종류마다 다르지만 바이트코드는 Python 인터프리터만 있으면 어디서든 실행됩니다. 소스를 매번 처음부터 해석하는 것보다 한 번 바이트코드로 바꿔 두면 빠르고 인터프리터를 단순하게 만들 수 있습니다.',cost:'바이트코드 하나를 실행할 때마다 인터프리터가 해석하고 타입을 확인하므로 같은 일을 하는 기계어보다 느립니다. 계산이 많은 부분은 C로 만든 라이브러리나 JIT로 보완합니다.'}
  ],
  today:[
   'dis 모듈로 내 Python 코드가 어떤 바이트코드가 되는지 직접 볼 수 있습니다. 한 줄이 여러 명령으로 나뉘는 것을 보면 동시성 문제를 이해하기 쉽습니다.',
   '서버를 고를 때 x86과 ARM 같은 CPU 아키텍처를 확인합니다. 순수 Python은 어디서든 돌지만 C 확장 라이브러리와 컨테이너 이미지는 아키텍처에 맞아야 합니다.',
   '느린 Python 반복문은 인터프리터의 해석 비용 때문인 경우가 많습니다. NumPy처럼 반복을 C 쪽으로 넘기는 라이브러리를 쓰면 크게 빨라집니다.'
  ],
  sources:[
   ['Turing, On Computable Numbers (1936)','https://doi.org/10.1112/plms/s2-42.1.230'],
   ['von Neumann, First Draft of a Report on the EDVAC (1945, 1993 재수록)','https://doi.org/10.1109/85.238389'],
   ['Backus et al., The FORTRAN Automatic Coding System (1957)','https://doi.org/10.1145/1455567.1455599'],
   ['McCarthy, Recursive Functions of Symbolic Expressions (1960)','https://doi.org/10.1145/367177.367199'],
   ['Computer History Museum · 1971 Intel 4004','https://www.computerhistory.org/timeline/1971/'],
   ['PEP 744 · JIT Compilation','https://peps.python.org/pep-0744/']
  ]
 }
};
