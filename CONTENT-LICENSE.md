# 추가 학습 설명의 출처와 이용 조건

`src/lib/practical-deepening.ts`의 보충 설명·예제는
[anjeongkyun/backend-interview-questions](https://github.com/anjeongkyun/backend-interview-questions)의
질문 주제를 참고하여 Python 예시, 생활 비유, 실행 검증, 구현별 주의점을 추가하고 재구성했습니다.
원문 문서를 그대로 수록하지 않았습니다.

해당 파일과 화면에 표시되는 해당 보충 설명·예제는 원문과 같은
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.ko)으로 제공합니다.
재배포·변경 시 원저작자와 저장소, 이 프로젝트에서의 변경 사실을 표시하고
변경한 콘텐츠에도 같은 라이선스를 적용하세요.
이 표시는 프로젝트 전체의 코드나 다른 출처의 콘텐츠에 새로운 라이선스를 부여하지 않습니다.

기존 32개 단원을 중복 생성하지 않고 다음 위치에 연결했습니다.

| 기존 단원 | 보완 내용 | 참고 문서 |
| --- | --- | --- |
| 프로세스와 스레드 | 컨텍스트 스위칭·모드 전환·캐시 비용 | operating-system/context-switching.md |
| 교착 상태와 잠금 순서 | 임계 구역·락·세마포어·Python 소유권 차이 | operating-system/mutex-vs-semaphore.md |
| 비동기 처리 | 숨은 블로킹·이벤트 루프 양보 | operating-system/sync-async-blocking.md |
| 캐시 | 스탬피드·갱신 병합·TTL 지터의 한계 | cache/cache-stampede.md |
| 트랜잭션 | 버전 검사·조건부 재고 차감 | database/optimistic-vs-pessimistic.md |
| REST API | 멱등 키·내용 검사·외부 결제의 경계 | api-design/idempotency-and-retry.md |

일반적인 설명을 Python과 실제 구현에 적용할 때는 Python, PostgreSQL,
Linux Kernel, AWS 공식 문서도 함께 확인했습니다. 각 보충 단원의 참고 자료에 연결되어 있습니다.

## backtony 저장소를 통한 추가 주제 선정

[backtony/Backend_Interview_for_Beginner](https://github.com/backtony/Backend_Interview_for_Beginner)의
Network.md, Database.md, Kafka.md, Spring & JPA.md에서 기존 단원에 부족한 질문 주제를 확인했습니다.
원문의 문장·표·이미지·예시 코드를 복제하지 않고 공식 문서와 공통 원리를 바탕으로
`src/lib/backtony-deepening.ts`의 설명·생활 비유·Python 실험을 별도로 작성했습니다.
앞 절의 CC BY-SA 표시는 `practical-deepening.ts`에 적용되며 이 파일을 가리키지는 않습니다.

| 기존 단원 | 추가 내용 |
| --- | --- |
| VPC | CIDR·/26 분할·클라우드 예약 주소 |
| JOIN | ORM 없이 재현하는 N+1·일대다 페이징 주의 |
| 인덱스 | 커버링 인덱스·SQLite 실행 계획·PostgreSQL 가시성 조건 |
| 메시지 큐 | Kafka 파티션·다음 읽을 오프셋·커밋 전 장애와 중복 |
| 확장 | 복제 지연·샤딩 재분배·백업과 복제의 차이 |
| 브라우저와 서버의 경계 | 서버 역할 분리·DI·업무 규칙과 저장소 경계 |
