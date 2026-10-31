<script lang="ts">
 import {onMount} from 'svelte';
 import {lessons} from '$lib/lessons';
 import {chapterOrder,chapterNames,chapterGoals} from '$lib/lesson-context';
 import {problems} from '$lib/practice/problems';
 import {chapterPictures} from '$lib/archive';
 import {rise} from '$lib/rise';
 import '$lib/styles/notebook.css';
 import './home.css';
 let csDone=$state<string[]>([]),solvedIds=$state<string[]>([]),algDone=$state(0),last=$state<string|null>(null);
 let warning=$state(false);
 const lastLesson=$derived(lessons.find(l=>l.id===last));
 const route=['먼저 컴퓨터가 실행하고','요청은 네트워크를 건너','서버가 받아 처리하고','데이터를 읽고 씁니다','누구인지 확인하고','클라우드에 배치해','배포하고 지켜봅니다'];
 const levels=['입문','중급','도전'] as const;
 const history=[0,1,3,6].map(i=>chapterPictures[i]);
 function chapterLessons(ci:number){return lessons.filter(l=>l.category===chapterOrder[ci]);}
 onMount(()=>{try{
  const backend=JSON.parse(localStorage.getItem('serverNotebook.v1')||'{}');
  csDone=[...new Set<string>((backend.completed||[]).filter((id:string)=>lessons.some(l=>l.id===id)))];
  if(lessons.some(l=>l.id===backend.lastLesson))last=backend.lastLesson;
  const coding=JSON.parse(localStorage.getItem('csLabPractice.v1')||'{}');
  solvedIds=Object.entries(coding.records||{}).filter(([,r]:[string,any])=>r?.accepted===true).map(([id])=>id);
  const algorithm=JSON.parse(localStorage.getItem('oneStepAlgorithmV1')||'{}');
  algDone=new Set((algorithm.completed||[]).filter((i:number)=>Number.isInteger(i)&&i>=0&&i<12)).size;
 }catch{warning=true;}});
</script>
<svelte:head><title>CS 노트 · 개발 공부방</title><meta name="description" content="백엔드·CS 32단원과 Python 코딩 테스트 24문제. 요청 하나가 지나는 순서대로 읽는 공부 노트."/></svelte:head>

<header class="hero">
 <div class="hero-corners">
  <a class="wordmark" href="/">CS 노트</a>
  <nav aria-label="학습 분야"><a href="/backend">백엔드·CS</a><a href="/practice" data-sveltekit-reload>코딩 테스트</a><a href="/algorithm.html" data-sveltekit-reload>알고리즘 그림</a></nav>
 </div>
 <h1 class="hero-title"><span>요청 하나를</span><span>끝까지 따라가기</span></h1>
 <div class="hero-foot">
  <p>백엔드·CS 32단원과 Python 코딩 테스트 24문제를 담은 공부 노트입니다. 프로그램 실행부터 운영까지, 요청이 지나는 순서대로 읽습니다.</p>
  <div class="hero-actions">
   {#if lastLesson}<a class="btn light" href={'/backend?lesson='+lastLesson.id}>이어 읽기 · {lastLesson.title}</a>{:else}<a class="btn light" href="/backend?lesson=process">첫 단원부터 읽기</a>{/if}
   <a class="text-link" href="/practice" data-sveltekit-reload>코딩 테스트 풀기</a>
  </div>
 </div>
</header>

<main>
 <section class="contents" use:rise aria-labelledby="contents-title">
  <div class="contents-top">
   <h2 id="contents-title" data-rise>노트에 담긴 것</h2>
   <p data-rise>단원마다 정의, 그렇게 만들어진 이유, 동작 순서, Python 예제, 면접 질문을 한 페이지에 모았습니다. 진도와 메모는 이 브라우저에만 저장됩니다.</p>
  </div>
  {#if warning}<p class="notice">저장된 기록을 읽지 못했습니다. 각 학습 화면에서 기록을 확인해 주세요.</p>{/if}
  <dl class="facts">
   <div data-rise><dt><a href="/backend">32단원</a></dt><dd>백엔드·CS · {csDone.length}개 완료</dd></div>
   <div data-rise><dt><a href="/practice" data-sveltekit-reload>24문제</a></dt><dd>Python 코딩 테스트 · {solvedIds.length}개 해결</dd></div>
   <div data-rise><dt><a href="/algorithm.html" data-sveltekit-reload>12단원</a></dt><dd>알고리즘 그림 · {algDone}개 학습</dd></div>
   <div data-rise><dt>7장</dt><dd>실행에서 운영까지</dd></div>
  </dl>
  <figure class="archive contents-figure" data-rise><img src={chapterPictures[2].src} width={chapterPictures[2].width} height={chapterPictures[2].height} alt={chapterPictures[2].alt} loading="lazy" decoding="async"/><figcaption>{chapterPictures[2].caption}</figcaption></figure>
 </section>

 <section class="route" use:rise aria-labelledby="route-title">
  <h2 id="route-title" class="visually-hidden">요청이 지나는 일곱 장</h2>
  <ol>
   {#each route as line,ci}
    {@const items=chapterLessons(ci)}
    <li style={'--n:'+ci} data-rise>
     <a href={'/backend#chapter-'+(ci+1)}><span class="route-line">{line}</span>
      <span class="route-note">{chapterNames[ci].slice(3)} · {chapterGoals[ci]} · {items.filter(l=>csDone.includes(l.id)).length}/{items.length} 완료</span></a>
    </li>
   {/each}
  </ol>
  <figure class="archive route-figure" data-rise><img src={chapterPictures[5].src} width={chapterPictures[5].width} height={chapterPictures[5].height} alt={chapterPictures[5].alt} loading="lazy" decoding="async"/><figcaption><b>{chapterPictures[5].year}</b>{chapterPictures[5].caption}</figcaption></figure>
 </section>

 <section class="history" use:rise aria-labelledby="history-title">
  <div class="history-top">
   <h2 id="history-title" data-rise>기술은 불편에서 나왔습니다</h2>
   <p data-rise>각 장은 그 기술이 왜 생겼는지 보여 주는 장면으로 시작합니다. 배선을 다시 꽂던 컴퓨터, 손으로 그린 네트워크 지도, 냉장고만 한 디스크, 숫자로 가득한 관제실.</p>
  </div>
  <div class="history-row">
   {#each history as picture}
    <figure class="archive" data-rise>
     <img src={picture.src} width={picture.width} height={picture.height} alt={picture.alt} loading="lazy" decoding="async"/>
     <figcaption><b>{picture.year}</b>{picture.caption.split('. ')[0]}.</figcaption>
    </figure>
   {/each}
  </div>
 </section>

 <section class="problems" use:rise aria-labelledby="problems-title">
  <div class="problems-intro">
   <h2 id="problems-title" data-rise>코딩 테스트 24문제</h2>
   <p data-rise>Python으로 풀고 브라우저 안에서 바로 채점합니다. 예시 실행은 횟수 제한이 없고, 제출하면 경계값과 무작위 입력, 큰 입력까지 검사합니다.</p>
   <a class="btn" href="/practice" data-sveltekit-reload data-rise>첫 문제 풀기</a>
  </div>
  <div class="problem-list">
   {#each levels as level}
    <div class="problem-group" data-rise>
     <h3>{level}</h3>
     <ul>
      {#each problems.filter(p=>p.level===level) as problem}
       {@const solved=solvedIds.includes(problem.id)}
       <li class:solved><a href={'/practice?problem='+problem.id} data-sveltekit-reload><span class="dot" aria-hidden="true"></span><span class="name">{problem.title}</span><span class="value">{solved?'해결':problem.topic}</span></a></li>
      {/each}
     </ul>
    </div>
   {/each}
  </div>
 </section>
</main>

<footer class="close">
 <p class="close-name" aria-hidden="true">CS 노트</p>
 <div class="close-row">
  <nav aria-label="학습 분야 바로가기"><a href="/backend">백엔드·CS</a><a href="/practice" data-sveltekit-reload>코딩 테스트</a><a href="/algorithm.html" data-sveltekit-reload>알고리즘 그림</a></nav>
  <div class="close-credits">
   <h2>사진 출처</h2>
   <ul>{#each chapterPictures as picture}<li><a href={picture.page} target="_blank" rel="noreferrer">{picture.year} · {picture.credit}</a> · {picture.license}</li>{/each}</ul>
   <p>Python 실행기 <a href="/licenses/pyodide.txt">Pyodide</a></p>
  </div>
 </div>
 <div class="close-legal"><span>학습 기록은 이 브라우저에만 저장됩니다.</span><a href="#top" onclick={(e)=>{e.preventDefault();window.scrollTo({top:0});}}>맨 위로</a></div>
</footer>
