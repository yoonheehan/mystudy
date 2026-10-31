<script lang="ts">
 import { onMount, onDestroy } from 'svelte';
 import { problems, getProblem, starter, type Problem } from '$lib/practice/problems';
 import { HINT_COST, RETRY_DELAY, scoreSubmission, updateBest, grade } from '$lib/practice/scoring';
 import '$lib/styles/notebook.css';
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

<svelte:head><title>{problem.title} · 코딩 테스트 · CS 노트</title><meta name="description" content="24개 난이도별 문제를 Python으로 직접 풀고 예시·경계값·무작위·큰 입력을 검사하세요."/></svelte:head>
<div class="ws">
 <header class="ws-top">
  <a class="ws-mark" href="/"><span class="ws-logo" aria-hidden="true">CS</span>CS 노트</a>
  <span class="ws-scope">Python 코딩 테스트</span>
  <nav class="ws-nav" aria-label="학습 분야"><a href="/">홈</a><a href="/backend">백엔드·CS</a><a href="/algorithm.html" data-sveltekit-reload>알고리즘 그림</a></nav>
  <p class="ws-summary"><span>해결 <b>{solved}</b>/24</span><span>총점 <b>{totalScore}</b></span></p>
 </header>
 <aside class="ws-side" aria-label="문제 목록">
  <h2 class="visually-hidden">문제 목록</h2>
  <label class="ws-search"><span>문제 찾기</span><input aria-label="코딩 문제 검색" placeholder="배열, DP, 최단 경로…" bind:value={search}/></label>
  <div class="ws-tabs" role="tablist" aria-label="문제 난이도">{#each ['전체','입문','중급','도전'] as item}<button role="tab" aria-selected={level===item} class:selected={level===item} onclick={()=>level=item}>{item}</button>{/each}</div>
  <nav class="ws-list" aria-label="코딩 문제">{#each filtered as item}{@const r=records[item.id]}<button disabled={running} class:selected={current===item.id} aria-current={current===item.id?'true':undefined} onclick={()=>choose(item.id)}><span class="ws-item"><span class="ws-item-title">{item.title}</span><span class="ws-item-meta">{item.level} · {item.topic}</span></span><span class="ws-item-state" class:done={r?.accepted}>{r?.accepted?r.best+'점':r?.history?.length?'시도':'—'}</span></button>{/each}{#if !filtered.length}<p class="ws-empty">'{search}'에 맞는 문제가 없습니다.</p>{/if}</nav>
  <details class="ws-rules"><summary>점수와 재도전 규칙</summary><p>통과율 100점에서 힌트 1/2/3개는 누적 8/18/30점 차감. 같은 회차의 제출 2회째부터 2점씩, 최대 10점 차감합니다.</p><p>전체 통과한 점수만 최고 기록에 반영합니다. S ≥ 90, A ≥ 80, B ≥ 65, 나머지는 C. 일부 통과는 ‘연습 중’입니다.</p><p>첫 전체 통과 뒤에는 마지막 전체 통과로부터 24시간이 지난 무힌트 재도전만 최고 점수를 최대 +10점 보정합니다. 실패하거나 낮은 점수를 받아도 최고 기록은 유지됩니다. 예시 실행은 감점하지 않습니다.</p><p>개인 연습 기록이며 기기·브라우저별 저장입니다. 공식 순위나 변조 방지 성적표는 아닙니다.</p></details>
 </aside>
 <main class="ws-sheet">
  {#if storageWarning}<p class="ws-notice" role="status">{storageWarning}</p>{/if}
  <div class="ws-title">
   <div><h1>{problem.title}</h1><p class="ws-meta">{problem.level} · {problem.topic} · 문제 {progress}/24 · 회차 {record?.round||1} · 제출 {record?.attempts||0}회</p></div>
   <div class="ws-best"><span>최고 점수</span><b>{record?.best||0}<small>점</small></b><span class:done={record?.accepted}>{record?.accepted?grade(record.best)+' 등급':'미해결'}</span></div>
  </div>
  <div class="ws-tabs ws-phone-tabs" role="tablist" aria-label="풀이 화면">{#each ['문제','코드','결과'] as item}<button role="tab" aria-selected={mobileTab===item} class:selected={mobileTab===item} onclick={()=>mobileTab=item}>{item}{#if item==='결과'&&tests.length}{' '+passed+'/'+tests.length}{/if}</button>{/each}</div>
  <div class="ws-grid">
   <section class="ws-desc" class:shown={mobileTab==='문제'} aria-labelledby="desc-title">
    <h2 id="desc-title">문제</h2><p>{problem.statement}</p>
    <h3>입력과 반환값</h3><p><code>solution(data)</code>에 dict가 전달됩니다. 필드: <code>{problem.fields.join(', ')}</code>. 결과를 <strong>return</strong>하세요.</p>
    <h3>제한 사항</h3><p>{problem.constraints}</p>
    <h3>입출력 예</h3>{#each problem.examples as example,i}<div class="ws-sample"><p class="ws-sample-title">예시 {i+1}</p><pre>입력: {JSON.stringify(example.input,null,2)}
출력: {JSON.stringify(example.output)}</pre><p>{example.explanation}</p></div>{/each}
    <div class="ws-hints"><div class="ws-row"><h3>단계별 힌트</h3><span class="ws-figure">{record?.hints||0}/3 · 누적 −{HINT_COST[record?.hints||0]}점</span></div>{#each problem.hints as hint,i}{#if i<(record?.hints||0)}<div class="ws-hint"><p class="ws-sample-title">힌트 {i+1}</p><p>{hint}</p></div>{/if}{/each}<button class="ws-btn" disabled={running||!record||record.hints>=3} onclick={revealHint}>{record?.hints===3?'힌트를 모두 열었습니다':`힌트 ${(record?.hints||0)+1} 열기 · 추가 −${HINT_COST[(record?.hints||0)+1]-HINT_COST[record?.hints||0]}점`}</button><p class="ws-note">연 힌트는 이 회차에 저장되어 새로고침해도 남습니다.</p></div>
    {#if problem.theory}<a class="ws-link" href={"/algorithm.html?lesson="+encodeURIComponent(problem.theory)} data-sveltekit-reload>그림으로 원리 복습 · {problem.theory}</a>{/if}
   </section>
   <div class="ws-work">
    <section class="ws-editor" class:shown={mobileTab==='코드'} aria-labelledby="editor-title">
     <div class="ws-row"><h2 id="editor-title">풀이 <span class="ws-muted">Python 3 · solution(data)</span></h2><div class="ws-actions">{#if running}<button class="ws-btn" onclick={cancel}>중지</button>{/if}<button class="ws-btn" disabled={running} onclick={()=>run('samples')}>예시 실행</button><button class="ws-btn primary" disabled={running} onclick={()=>run('submit')}>제출</button></div></div>
     <label class="visually-hidden" for="solution-code">풀이 코드</label><textarea id="solution-code" class="ws-code" bind:value={code} oninput={(e)=>{code=e.currentTarget.value;saveDraft();}} onkeydown={editorKey} spellcheck="false" autocapitalize="off" autocomplete="off" disabled={running}></textarea>
     <p class="ws-note">Ctrl/⌘ + Enter로 예시 실행. 코드는 서버가 아니라 이 브라우저에서 실행됩니다.</p>
     <details class="ws-more"><summary>복잡도 예상 적기</summary><div class="ws-fields"><label>시간 복잡도<input bind:value={timeChoice} placeholder="예: O(n), O(n log n)"/></label><label>추가 공간 복잡도<input bind:value={spaceChoice} placeholder="출력은 빼고 생각해 보세요"/></label></div><p class="ws-note">실행 시간으로 Big-O를 판정하지 않습니다. 제출 뒤 기준 풀이와 비교해 보세요.</p></details>
     <div class="ws-row ws-round"><span class="ws-muted">새 회차는 코드와 힌트를 비우고, 최고 기록과 이력은 남깁니다.</span><button class="ws-btn" disabled={running||!record} onclick={retry}>새 회차로 다시 풀기</button></div>
    </section>
    <section class="ws-results" class:shown={mobileTab==='결과'} aria-labelledby="results-title" aria-live="polite">
     <div class="ws-row"><h2 id="results-title">채점</h2>{#if running}<span class="ws-muted">{phase}</span>{:else if tests.length}<span class="ws-figure" class:all={passed===tests.length}>{passed}/{tests.length} 통과</span>{:else}<span class="ws-muted">아직 실행하지 않았습니다</span>{/if}</div>
     {#if tests.length}<ol class="ws-strip" aria-label="테스트별 결과">{#each tests as test,i}<li class:pass={results[i]?.pass} class:fail={results[i]&&!results[i].pass} class:now={running&&active===i} title={test.label+' · '+(results[i]?(results[i].pass?'통과':'실패'):'대기')}><span class="visually-hidden">{test.label} {results[i]?(results[i].pass?'통과':'실패'):'대기'}</span></li>{/each}</ol>{/if}
     {#if message}<pre class="ws-error">{message}</pre>{/if}
     {#if score}<div class="ws-score"><b>{score.score}<small>점</small></b><div><p><strong>{grade(score.score,score.accepted)}{score.accepted?' · 전체 테스트 통과':' · 통과하지 못한 테스트가 있습니다'}</strong></p><p class="ws-figure">통과율 {score.accuracy} − 힌트 {score.hintCost} − 재제출 {score.retryCost}</p>{#if bestChange}<p class="ws-muted">{bestChange}</p>{/if}</div></div>{/if}
     {#if results.length}<p class="ws-metrics"><span>가장 느린 케이스 <b>{maxTime.toFixed(2)}</b> ms</span><span>Python 추가 할당 최고 <b>{(peakMemory/1024).toFixed(1)}</b> KiB</span></p>{/if}
     {#if tests.length}<div class="ws-cases">{#each tests as test,i}<details class:fail={results[i]&&!results[i].pass}><summary><span class="ws-case-name">{test.label}{#if !test.label.startsWith(test.kind)}<span class="ws-muted">{test.kind}</span>{/if}</span><span class="ws-case-state" class:pass={results[i]?.pass} class:fail={results[i]&&!results[i].pass}>{results[i]?(results[i].pass?'통과':results[i].error?'실행 오류':'오답'):running&&active===i?'실행 중':running?'대기':'—'}</span><span class="ws-figure">{results[i]?results[i].ms.toFixed(2)+' ms':'—'}</span></summary>{#if results[i]}<pre>입력: {format(test.input)}
예상: {format(test.expected)}
실제: {format(results[i].actual)}{results[i].error?'\n오류: '+results[i].error:''}</pre>{#if results[i].log}<pre>출력 로그 (최대 4,000자)
{results[i].log}</pre>{/if}{/if}</details>{/each}</div>{:else if !running}<p class="ws-empty">예시 실행은 감점 없이 문제의 예시만 검사합니다. 제출하면 예시, 경계값, 무작위 10개, 큰 입력까지 채점합니다.</p>{/if}
     {#if score}<details class="ws-more"><summary>기준 풀이의 복잡도와 비교</summary><p><strong>시간 {problem.time} · 추가 공간 {problem.space}</strong></p><p>{problem.reasoning}</p><p class="ws-muted">내 예상: 시간 {timeChoice||'—'} · 공간 {spaceChoice||'—'}</p></details>{/if}
     {#if record?.history.length}<div class="ws-history"><h3>최근 제출</h3><table><thead><tr><th scope="col">시각</th><th scope="col">회차</th><th scope="col" class="num">통과</th><th scope="col" class="num">힌트</th><th scope="col" class="num">점수</th></tr></thead><tbody>{#each record.history.slice(0,5) as item}<tr><td>{new Date(item.time).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</td><td>{item.round}</td><td class="num">{item.passed}/{item.total}</td><td class="num">{item.hints}</td><td class="num">{item.score} · {grade(item.score,item.accepted)}</td></tr>{/each}</tbody></table></div>{/if}
     <p class="ws-note">측정값은 이 기기 기준입니다. 메모리는 tracemalloc의 Python 추가 할당량이며 브라우저 전체 메모리가 아닙니다. 테스트는 브라우저로 전달되므로 비밀 테스트는 아닙니다.</p>
    </section>
   </div>
  </div>
  <footer class="ws-foot"><p>문제는 직접 작성했고 풀이 흐름은 <a href="https://leetcode.com/problems/two-sum/" target="_blank" rel="noreferrer">LeetCode</a>, <a href="https://school.programmers.co.kr/learn/courses/30/lessons/42576" target="_blank" rel="noreferrer">프로그래머스</a>를 참고했습니다. Python 실행: <a href="https://pyodide.org/" target="_blank" rel="noreferrer">Pyodide</a> · <a href="/licenses/pyodide-mpl.txt" target="_blank" rel="noreferrer">MPL-2.0</a></p></footer>
 </main>
</div>
