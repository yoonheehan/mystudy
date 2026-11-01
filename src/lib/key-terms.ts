// Foundational terms and the lesson whose story first explains them (in **bold**).
// test:content checks that each term is bolded in its home lesson, and that any earlier lesson
// mentioning it either explains it there or points ahead to where it is explained.
export const keyTerms: Record<string, string> = {
 'CPU': 'machine', '레지스터': 'machine', '프로그램 카운터': 'machine', '컴파일러': 'machine', '인터프리터': 'machine', '바이트코드': 'machine',
 '스레드': 'process', '커널': 'process', '시스템 콜': 'process', '문맥 교환': 'process',
 '스케줄러': 'scheduling', '경쟁 상태': 'sync', '세마포어': 'sync', '교착 상태': 'deadlock',
 '가상 메모리': 'memory', '페이지 캐시': 'memory', '파일 디스크립터': 'filesystem', 'inode': 'filesystem', 'fsync': 'filesystem',
 '소켓': 'diagnosis', '포트': 'diagnosis',
 '패킷': 'internet', 'IP 주소': 'internet', '라우터': 'internet', 'DNS': 'dns', 'UDP': 'tcp', 'NAT': 'nat', '인증서': 'tls',
 'JSON': 'webserver', '직렬화': 'webserver', '멱등': 'rest', '이벤트 루프': 'async', '리버스 프록시': 'proxy', '타임아웃': 'proxy',
 '기본 키': 'sqlbasics', '외래 키': 'sqlbasics', '인덱스': 'index', '트랜잭션': 'transaction', '샤딩': 'replication',
 '솔트': 'password', '쿠키': 'session', '가상 머신': 'cloud', '가용 영역': 'cloud', '컨테이너': 'docker', '로드 밸런서': 'lb'
};
