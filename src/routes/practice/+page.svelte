<script lang="ts">
 import { onMount, onDestroy } from 'svelte';
 import { problems, getProblem, starter, type Problem } from '$lib/practice/problems';
 import { HINT_COST, RETRY_DELAY, scoreSubmission, updateBest, grade } from '$lib/practice/scoring';
 import './practice.css';
 type History={time:number;score:number;passed:number;total:number;hints:number;round:number;accepted:boolean;language:string};
 type RecordData={drafts:Record<string,string>;hints:number;attempts:number;round:number;best:number;accepted:boolean;lastAcceptedAt:number;history:History[]};
 type Test={label:string;kind:string;input:any;expected:any};
 type Result={pass:boolean;ms:number;memory:number|null;actual:any;error:string;log:string};
 let records=$state<Record<string,RecordData>>({});
 let current=$state(problems[0].id); const language='python';let code=$state('');let level=$state('전체');let search=$state('');let mobileTab=$state('문제');
 let running=$state(false),phase=$state(''),active=$state(-1),results=$state<Result[]>([]),tests=$state<Test[]>([]),mode=$state(''),message=$state(''),storageWarning=$state('');
 let score=$state<ReturnType<typeof scoreSubmission>|null>(null);let bestChange=$state('');let timeChoice=$state(''),spaceChoice=$state('');let worker:Worker|null=null;let timer:ReturnType<typeof setTimeout>|null=null;let ready=false;let runToken=0;let countedSubmission=false;
 const problem=$derived(getProblem(current)!);
 const record=$derived(records[current]);
 const filtered=$derived(problems.filter(p=>(level==='전체'||p.level===level)&&(p.title+' '+p.topic).toLowerCase().includes(search.toLowerCase())));
 const solved=$derived(problems.filter(p=>records[p.id]?.accepted).length);
 const totalScore=$derived(problems.reduce((s,p)=>s+(records[p.id]?.best||0),0));
 const passed=$derived(results.filter(r=>r.pass).length);
 const peakMemory=$derived(Math.max(0,...results.map(r=>r.memory||0)));
 const maxTime=$derived(Math.max(0,...results.map(r=>r.ms)));
 const progress=$derived(problems.findIndex(p=>p.id===current)+1);
 function blank():RecordData{return {drafts:{},hints:0,attempts:0,round:1,best:0,accepted:false,lastAcceptedAt:0,history:[]};}
 function ensure(){records[current]??=blank();}
 function persist(){if(!ready)return;try{localStorage.setItem('csLabPractice.v1',JSON.stringify({records,last:current,language}));}catch{storageWarning='저장 공간이 부족하거나 브라우저 저장소가 꺼져 있어 기록을 저장하지 못했습니다.';}}
 function saveDraft(){ensure();records[current].drafts[language]=code;persist();}
 function choose(id:string,push=true){if(running)return;if(ready)saveDraft();current=id;ensure();code=records[current].drafts[language]??starter(getProblem(id)!);results=[];tests=[];score=null;message='';bestChange='';timeChoice='';spaceChoice='';mobileTab='문제';if(ready&&push){const url=new URL(location.href);url.searchParams.set('problem',id);history.pushState({},'',url);}persist();}
 function revealHint(){if(running||record.hints>=3)return;record.hints++;persist();}
 function retry(){if(running)return;saveDraft();record.round++;record.hints=0;record.attempts=0;record.drafts={};code=starter(problem);results=[];tests=[];score=null;message='새 회차를 시작했습니다. 코드를 기억에서 다시 작성해 보세요.';bestChange='';persist();mobileTab='코드';}
 function stop(){runToken++;worker?.terminate();worker=null;if(timer)clearTimeout(timer);timer=null;running=false;phase='';}
 function cancel(){if(countedSubmission){record.attempts=Math.max(0,record.attempts-1);countedSubmission=false;persist();}stop();message='실행을 중지했습니다. 중단한 실행은 성적에 반영하지 않습니다.';}
 function watchdog(ms:number,token:number){if(timer)clearTimeout(timer);timer=setTimeout(()=>{if(token!==runToken)return;const error=phase.includes('준비')?'Python 준비 시간이 초과됐습니다. 서버 연결을 확인하고 다시 실행하세요.':'시간 초과: 한 테스트 또는 초기 코드 실행이 4초를 넘었습니다. 무한 반복과 입력 크기를 확인하세요.';if(active>=0)results[active]={pass:false,ms:4000,memory:null,actual:null,error,log:''};message=error;finish(token);},ms);}
 function finish(token:number){if(token!==runToken)return;const submitted=mode==='submit';countedSubmission=false;stop();if(submitted){const r=records[current],s=scoreSubmission(results.filter(x=>x?.pass).length,tests.length,r.hints,r.attempts);score=s;const eligible=Date.now()-r.lastAcceptedAt>=RETRY_DELAY;const previous=r.best;r.best=updateBest(r.best,s.score,s.accepted,r.accepted,r.hints,eligible);if(s.accepted){bestChange=r.accepted?(r.best>previous?`최고 점수 +${r.best-previous} 보정`:'최고 점수 유지 · 24시간 뒤 무힌트 재도전에서 최대 +10점 보정'):'첫 전체 통과 기록';r.accepted=true;r.lastAcceptedAt=Date.now();}r.history.unshift({time:Date.now(),score:s.score,passed:results.filter(x=>x?.pass).length,total:tests.length,hints:r.hints,round:r.round,accepted:s.accepted,language});r.history=r.history.slice(0,20);persist();}}
 async function run(runMode:string){
  if(running)return;saveDraft();const token=++runToken;running=true;mode=runMode;score=null;results=[];message='';bestChange='';active=-1;mobileTab='결과';phase='테스트 준비 중';watchdog(20000,token);
  try{
   const response=await fetch(`/api/practice/${current}?mode=${runMode}`);if(!response.ok)throw Error('테스트 케이스를 가져오지 못했습니다. 서버가 실행 중인지 확인하세요.');const payload=await response.json();if(token!==runToken)return;tests=payload.cases;
   if(runMode==='submit'){record.attempts++;countedSubmission=true;persist();}
   worker=new Worker('/judge-worker.mjs',{type:'module'});
   phase='Python 실행기 준비 중 · 첫 실행은 잠시 걸립니다.';watchdog(60000,token);
   worker.onerror=e=>{if(token!==runToken)return;message='실행기 오류: '+e.message;finish(token);};
   worker.onmessage=({data})=>{if(token!==runToken)return;
    if(data.type==='loading'){phase='Python 실행기 준비 중 · 첫 실행은 잠시 걸립니다.';watchdog(60000,token);}
    if(data.type==='ready'){phase='코드 초기화 중';watchdog(4000,token);}
    if(data.type==='start'){active=data.index;phase=`테스트 ${active+1} / ${tests.length}`;watchdog(4000,token);}
    if(data.type==='case'){const pass=!data.error&&JSON.stringify(data.result)===JSON.stringify(tests[data.index].expected);results[data.index]={pass,ms:data.ms,memory:data.memory,actual:data.result,error:data.error,log:data.log};}
    if(data.type==='fatal'){message=data.error;finish(token);}
    if(data.type==='done')finish(token);
   };
   worker.postMessage({language,code,cases:payload.cases});
  }catch(e){if(token!==runToken)return;message=e instanceof Error?e.message:String(e);stop();}
 }
 function editorKey(e:KeyboardEvent){if(e.key==='Tab'){e.preventDefault();const t=e.currentTarget as HTMLTextAreaElement;const start=t.selectionStart,end=t.selectionEnd;code=code.slice(0,start)+'    '+code.slice(end);saveDraft();requestAnimationFrame(()=>{t.selectionStart=t.selectionEnd=start+4;});}if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();run('samples');}}
 function format(value:any){const text=JSON.stringify(value);return text===undefined?'반환 없음':text.length>600?text.slice(0,600)+'… (긴 값 생략)':text;}
 onMount(()=>{
  try{const saved=JSON.parse(localStorage.getItem('csLabPractice.v1')||'{}');for(const p of problems){const r=saved.records?.[p.id];if(r&&typeof r==='object')records[p.id]={drafts:typeof r.drafts==='object'&&r.drafts?r.drafts:{},hints:Math.min(3,Math.max(0,Number(r.hints)||0)),attempts:Math.max(0,Number(r.attempts)||0),round:Math.max(1,Number(r.round)||1),best:Math.min(100,Math.max(0,Number(r.best)||0)),accepted:r.accepted===true,lastAcceptedAt:Number(r.lastAcceptedAt)||0,history:Array.isArray(r.history)?r.history.slice(0,20):[]};}const id=new URL(location.href).searchParams.get('problem')||saved.last;if(getProblem(id))current=id;}catch{storageWarning='이전에 저장한 연습 기록을 읽지 못했습니다. 이번 방문의 기록은 새로 저장됩니다.';}
  choose(current,false);ready=true;persist();const pop=()=>{const id=new URL(location.href).searchParams.get('problem');if(id&&getProblem(id))choose(id,false);};window.addEventListener('popstate',pop);return()=>window.removeEventListener('popstate',pop);
 });
 onDestroy(()=>stop());
</script>

<svelte:head><title>{problem.title} · 코딩 실전 · CS 노트</title><meta name="description" content="24개 난이도별 문제를 Python로 직접 풀고 예시·경계값·무작위·큰 입력을 검사하세요."/></svelte:head>
<div class="arena">
 <header class="arena-header"><a class="arena-logo" href="/">CS 노트<span>코딩 실전</span></a><nav aria-label="학습 메뉴"><a href="/">학습 홈</a><a href="/algorithm.html" data-sveltekit-reload>그림으로 배우기</a><a href="/backend">백엔드·CS</a></nav><span class="arena-summary">{solved}/24 해결 · {totalScore}점</span></header>
 {#if storageWarning}<p class="arena-notice" role="status">{storageWarning}</p>{/if}
 <div class="arena-workspace">
  <aside class="problem-list"><div class="list-title"><h1>문제 목록</h1><span>24 problems</span></div><label class="arena-search">문제 검색<input aria-label="코딩 문제 검색" placeholder="배열, DP, 최단 경로…" bind:value={search}/></label><div class="level-filters" aria-label="문제 난이도">{#each ['전체','입문','중급','도전'] as item}<button class:selected={level===item} onclick={()=>level=item}>{item}{#if item!=='전체'} <small>8</small>{/if}</button>{/each}</div><nav aria-label="코딩 문제 목록">{#each filtered as item}<button disabled={running} class:selected={current===item.id} onclick={()=>choose(item.id)}><span class="problem-number">{String(problems.indexOf(item)+1).padStart(2,'0')}</span><span>{item.title}<small>{item.level} · {item.topic}</small></span><span class="problem-mark">{records[item.id]?.accepted?'✓':'·'}</span></button>{/each}{#if !filtered.length}<p>검색 결과가 없습니다.</p>{/if}</nav><details class="score-rules"><summary>점수·재도전 규칙</summary><p>통과율 100점에서 힌트 1/2/3개는 누적 8/18/30점 차감. 같은 회차의 제출 2회째부터 2점씩, 최대 10점 차감합니다.</p><p>전체 통과한 점수만 최고 기록에 반영합니다. S ≥ 90, A ≥ 80, B ≥ 65, 나머지는 C. 일부 통과는 ‘연습 중’입니다.</p><p>첫 전체 통과 뒤에는 마지막 전체 통과로부터 24시간이 지난 무힌트 재도전만 최고 점수를 최대 +10점 보정합니다. 실패하거나 낮은 점수를 받아도 최고 기록은 유지됩니다. 예시 실행은 감점하지 않습니다.</p><p>개인 연습 기록이며 기기·브라우저별 저장입니다. 공식 순위나 변조 방지 성적표는 아닙니다.</p></details></aside>
  <main class="solve-workspace">
   <div class="solve-title"><div><span class={'difficulty '+problem.level}>{problem.level}</span><span class="problem-topic">{problem.topic} · 문제 {progress}/24</span><h1>{problem.title}</h1></div><div class="best-score"><b>{record?.best||0}</b><span>최고 점수 · {record?.accepted?grade(record.best):'미해결'}</span></div></div>
   <nav class="mobile-panels" aria-label="풀이 화면">{#each ['문제','코드','결과'] as item}<button class:selected={mobileTab===item} onclick={()=>mobileTab=item}>{item}</button>{/each}</nav>
   <div class="solve-columns">
    <section class="description-panel" class:mobile-visible={mobileTab==='문제'} aria-label="문제 설명"><h2>문제 설명</h2><p>{problem.statement}</p><h3>입력과 반환값</h3><p><code>solution(data)</code>에 객체(Python dict)가 전달됩니다. 필드: <code>{problem.fields.join(', ')}</code>. 결과를 <strong>return</strong>하세요.</p><h3>제한 사항</h3><p>{problem.constraints}</p><h3>입출력 예</h3>{#each problem.examples as example,i}<div class="sample-box"><b>예시 {i+1}</b><pre>입력: {JSON.stringify(example.input,null,2)}
출력: {JSON.stringify(example.output)}</pre><p>{example.explanation}</p></div>{/each}<div class="hint-header"><h3>단계별 힌트</h3><span>{record?.hints||0}/3 · 누적 −{HINT_COST[record?.hints||0]}점</span></div>{#each problem.hints as hint,i}{#if i<(record?.hints||0)}<div class="hint-box"><b>힌트 {i+1}</b><p>{hint}</p></div>{/if}{/each}<button class="hint-button" disabled={running||!record||record.hints>=3} onclick={revealHint}>{record?.hints===3?'힌트 3개를 모두 열었습니다':`힌트 ${(record?.hints||0)+1} 열기 · 추가 −${HINT_COST[(record?.hints||0)+1]-HINT_COST[record?.hints||0]}점`}</button><p class="arena-small">힌트를 열면 이 회차에 저장됩니다. 새로고침해도 사용 기록이 유지됩니다.</p>{#if problem.theory}<a class="theory-link" href={"/algorithm.html?lesson="+encodeURIComponent(problem.theory)} data-sveltekit-reload>그림으로 원리 복습 · {problem.theory} ↗</a>{/if}</section>
    <section class="editor-panel" class:mobile-visible={mobileTab==='코드'} aria-label="코드 작성"><div class="editor-toolbar"><strong>Python 3</strong><span>solution(data) → 반환값</span></div><label class="editor-label" for="solution-code">내 풀이 코드</label><textarea id="solution-code" aria-label="풀이 코드" class="code-editor" bind:value={code} oninput={(e)=>{code=e.currentTarget.value;saveDraft();}} onkeydown={editorKey} spellcheck="false" autocapitalize="off" autocomplete="off" disabled={running}></textarea><div class="editor-actions"><button class="run-button" disabled={running} onclick={()=>run('samples')}>예시 실행</button><button class="submit-button" disabled={running} onclick={()=>run('submit')}>전체 테스트 제출</button>{#if running}<button class="stop-button" onclick={cancel}>중지</button>{/if}</div><p class="arena-small">Ctrl/⌘ + Enter: 예시 실행 · 서버에 코드를 실행시키지 않고 내 브라우저에서 실행합니다.</p><div class="complexity-entry"><h3>복잡도도 생각해 보기</h3><label>내 시간 복잡도<input bind:value={timeChoice} placeholder="예: O(n), O(n log n)"/></label><label>내 추가 공간 복잡도<input bind:value={spaceChoice} placeholder="출력 배열을 제외하고 생각해 보세요."/></label><p class="arena-small">실행 시간만으로 Big-O를 자동 판정하지 않습니다. 제출 뒤 기준 풀이와 스스로 비교하세요.</p></div><div class="round-info"><span>회차 {record?.round||1} · 제출 {record?.attempts||0}회</span><button disabled={running||!record} onclick={retry}>새 회차로 다시 풀기</button></div><p class="arena-small">새 회차는 코드를 비우고 힌트를 닫습니다. 이전 최고 기록과 제출 이력은 유지됩니다.</p></section>
   </div>
   <section class="results-panel" class:mobile-visible={mobileTab==='결과'} aria-label="채점 결과" aria-live="polite"><div class="result-heading"><h2>실행 결과</h2>{#if running}<span class="running-state">{phase}</span><button class="stop-button" onclick={cancel}>실행 중지</button>{:else if tests.length}<span class:all-pass={passed===tests.length}>{passed}/{tests.length} 통과</span>{:else}<span>코드를 작성하고 실행해 보세요.</span>{/if}</div>{#if message}<pre class="error-message">{message}</pre>{/if}{#if score}<div class="submission-score"><b>{score.score}<small>점</small></b><span class="grade">{grade(score.score,score.accepted)}</span><div><strong>{score.accepted?'전체 테스트 통과':'아직 통과하지 못한 테스트가 있습니다.'}</strong><p>통과율 {score.accuracy} − 힌트 {score.hintCost} − 재제출 {score.retryCost}</p><p>{bestChange}</p></div></div>{/if}{#if results.length}<div class="metric-strip"><span>가장 느린 케이스 <b>{maxTime.toFixed(2)}ms</b></span><span>Python 추가 할당 최고치 <b>{(peakMemory/1024).toFixed(1)}KiB</b></span></div><p class="arena-small">내 기기의 측정값입니다. Python 메모리는 tracemalloc의 추가 Python 할당량이며 전체 브라우저/WASM 메모리가 아닙니다.</p>{/if}<div class="test-results">{#each tests as test,i}<details class="test-result" class:failed={results[i]&&!results[i].pass}><summary><span class="test-status">{results[i]?(results[i].pass?'✓':'×'):running&&active===i?'…':'·'}</span><span>{test.label}<small>{test.kind}</small></span><b>{results[i]?(results[i].pass?'통과':results[i].error?'실행 오류':'오답'):running?'대기':'미실행'}</b><span>{results[i]?.ms.toFixed(2)||'—'}ms</span></summary>{#if results[i]}<pre>입력: {format(test.input)}
예상: {format(test.expected)}
실제: {format(results[i].actual)}{results[i].error?'\n오류: '+results[i].error:''}</pre>{#if results[i].log}<pre>출력 로그 (최대 4,000자):
{results[i].log}</pre>{/if}{/if}</details>{/each}</div>{#if score}<details class="complexity-review"><summary>기준 풀이의 시간·공간 복잡도와 비교</summary><p><strong>시간 {problem.time} · 추가 공간 {problem.space}</strong></p><p>{problem.reasoning}</p><p>내 예상: 시간 {timeChoice||'미작성'} · 공간 {spaceChoice||'미작성'}</p><p class="arena-small">큰 입력 통과는 이 테스트에서 제한 시간 내 결과가 맞았다는 뜻입니다. 모든 입력의 정확성이나 특정 Big-O를 증명하지 않습니다.</p></details>{/if}<p class="arena-small">제출은 예시 + 경계 + 무작위 10개 + 큰 입력을 검사합니다. 무작위 입력은 제출마다 바뀝니다. 학습용 테스트는 브라우저로 전달되며 기업 코테의 비밀 테스트 보안과 같지는 않습니다.</p></section>
   {#if record?.history.length}<section class="submission-history"><h2>최근 제출 이력</h2>{#each record.history.slice(0,5) as item}<div><span>{new Date(item.time).toLocaleString('ko-KR')}</span><span>회차 {item.round} · {item.language==='python'?'Python':'이전 기록'}</span><span>{item.passed}/{item.total} · 힌트 {item.hints}</span><b>{item.score}점 · {grade(item.score,item.accepted)}</b></div>{/each}</section>{/if}
   <footer class="practice-footer"><p>문제는 CS Lab에서 직접 작성했습니다. 풀이 흐름 참고: <a href="https://leetcode.com/problems/two-sum/" target="_blank" rel="noreferrer">LeetCode</a> · <a href="https://school.programmers.co.kr/learn/courses/30/lessons/42576" target="_blank" rel="noreferrer">프로그래머스</a>. 원문 문제를 복제하지 않았습니다.</p><p>Python 실행: <a href="https://pyodide.org/" target="_blank" rel="noreferrer">Pyodide</a> · <a href="/licenses/pyodide-mpl.txt" target="_blank" rel="noreferrer">MPL-2.0 라이선스</a> · 처음에는 PC에서 실행기 파일을 내려받습니다. 큰 입력과 코드는 내 기기의 자원을 사용합니다.</p></footer>
  </main>
 </div>
</div>
