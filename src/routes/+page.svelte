<script lang="ts">
 import {onMount} from 'svelte';
 import {lessons} from '$lib/lessons';
 import {chapterOrder,chapterNames,chapterGoals} from '$lib/lesson-context';
 import {problems} from '$lib/practice/problems';
 import {homePictures} from '$lib/home-pictures';
 import {rise} from '$lib/rise';
 import {techMap} from '$lib/tech-map';
 import '$lib/styles/notebook.css';
 import './home.css';
 let last=$state<string|null>(null);
 const lastLesson=$derived(lessons.find(l=>l.id===last));
 const route=['먼저 컴퓨터가 실행하고','요청은 네트워크를 건너','서버가 받아 처리하고','데이터를 읽고 씁니다','누구인지 확인하고','클라우드에 배치해','배포하고 지켜봅니다','그리고 Python으로 다시 봅니다'];
 const levels=['입문','중급','도전'] as const;
 const contents=homePictures.servers,routeMap=homePictures['internet-map'];
 const history=['harvard-mark-i','card-deck','teletype','altair'].map(id=>homePictures[id]);
 function chapterLessons(ci:number){return lessons.filter(l=>l.category===chapterOrder[ci]);}
 onMount(()=>{try{
  const backend=JSON.parse(localStorage.getItem('serverNotebook.v1')||'{}');
  if(lessons.some(l=>l.id===backend.lastLesson))last=backend.lastLesson;
 }catch{}});
</script>
<svelte:head><title>CS 노트 · 개발 공부방</title><meta name="description" content="백엔드·CS {lessons.length}단원과 Python 코딩 테스트 24문제. 요청 하나가 지나는 순서대로 읽는 공부 노트."/></svelte:head>

<div class="home">
<header class="hero">
 <div class="hero-corners">
  <a class="wordmark" href="/">CS 노트</a>
  <nav aria-label="학습 분야"><a href="/backend">백엔드·CS</a><a href="/practice">코딩 테스트</a><a href="/algorithm.html" data-sveltekit-reload>알고리즘 그림</a></nav>
 </div>
 <h1 class="hero-title"><span>요청 하나를</span><span>끝까지 따라가기</span></h1>
 <div class="hero-foot">
  <p>백엔드·CS {lessons.length}단원과 Python 코딩 테스트 24문제를 담은 공부 노트입니다. 프로그램 실행부터 운영까지, 요청이 지나는 순서대로 읽습니다.</p>
  <div class="hero-actions">
   {#if lastLesson}<a class="btn light" href={'/backend?lesson='+lastLesson.id}>이어 읽기 · {lastLesson.title}</a>{:else}<a class="btn light" href={'/backend?lesson='+chapterLessons(0)[0].id}>첫 단원부터 읽기 · {chapterLessons(0)[0].title}</a>{/if}
   <a class="text-link" href="/practice">코딩 테스트 풀기</a>
  </div>
 </div>
</header>

<main>
 <section class="contents" use:rise aria-labelledby="contents-title">
  <div class="contents-top">
   <h2 id="contents-title" data-rise>노트에 담긴 것</h2>
   <p data-rise>단원마다 정의, 그렇게 만들어진 이유, 동작 순서, Python 예제, 면접 질문을 한 페이지에 모았습니다. 진도와 메모는 이 브라우저에만 저장됩니다.</p>
  </div>
  <dl class="facts">
   <div data-rise><dt><a href="/backend">{lessons.length}단원</a></dt><dd>백엔드·CS</dd></div>
   <div data-rise><dt><a href="/practice">24문제</a></dt><dd>Python 코딩 테스트</dd></div>
   <div data-rise><dt><a href="/algorithm.html" data-sveltekit-reload>12단원</a></dt><dd>알고리즘 그림</dd></div>
   <div data-rise><dt>8장</dt><dd>실행에서 운영, 그리고 Python까지</dd></div>
  </dl>
  <figure class="archive contents-figure" data-rise><img src={contents.src} width={contents.width} height={contents.height} alt={contents.alt} loading="lazy" decoding="async"/><figcaption>{contents.caption}</figcaption></figure>
 </section>

 <section class="route" use:rise aria-labelledby="route-title">
  <h2 id="route-title" class="visually-hidden">요청이 지나는 일곱 장과 Python</h2>
  <ol>
   {#each route as line,ci}
    {@const items=chapterLessons(ci)}
    <li style={'--n:'+ci} data-rise>
     <a href={'/backend#chapter-'+(ci+1)}><span class="route-line">{line}</span>
      <span class="route-note">{chapterNames[ci].slice(3)} · {chapterGoals[ci]} · {items.length}단원</span></a>
    </li>
   {/each}
  </ol>
  <figure class="archive route-figure" data-rise><img src={routeMap.src} width={routeMap.width} height={routeMap.height} alt={routeMap.alt} loading="lazy" decoding="async"/><figcaption><b>{routeMap.year}</b>{routeMap.caption}</figcaption></figure>
 </section>

 <section class="techmap" id="tech-map" use:rise aria-labelledby="techmap-title">
  <div class="techmap-intro">
   <h2 id="techmap-title" data-rise>백엔드 기술 지도</h2>
   <p data-rise>Redis, Kafka, Elasticsearch, Grafana. 이름은 많지만 저마다 어떤 불편에서 태어나 어떤 한 가지 일을 맡습니다. 맡은 일별로 묶고, 쓰지 말아야 할 때와 자세히 설명하는 단원을 함께 적었습니다.</p>
  </div>
  <div class="techmap-layers">
   {#each techMap as layer}
    <div class="techmap-layer" data-rise>
     <h3>{layer.title}<span>{layer.question}</span></h3>
     <ul>
      {#each layer.tools as tool}
       {@const home=lessons.find(l=>l.id===tool.lesson)}
       <li><a href={'/backend?lesson='+tool.lesson}>
        <span class="tool-name">{tool.name}</span>
        <span class="tool-role">{tool.role}</span>
        <span class="tool-meta"><b>왜 생겼나</b> {tool.born} · <b>맞지 않는 일</b> {tool.notFor}</span>
        <span class="tool-lesson">{home?.title} →</span>
       </a></li>
      {/each}
     </ul>
    </div>
   {/each}
  </div>
 </section>

 <section class="history" use:rise aria-labelledby="history-title">
  <div class="history-top">
   <h2 id="history-title" data-rise>기술은 불편에서 나왔습니다</h2>
   <p data-rise>단원마다 그 기술이 왜 생겼는지부터 이야기합니다. 릴레이로 돌던 계산기, 카드 한 장이 한 줄이던 프로그램, 종이에 찍히던 터미널, 스위치로 명령을 넣던 개인용 컴퓨터도 모두 어떤 불편을 풀려고 나왔습니다.</p>
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
   <a class="btn" href="/practice" data-rise>첫 문제 풀기</a>
  </div>
  <div class="problem-list">
   {#each levels as level}
    <div class="problem-group" data-rise>
     <h3>{level}</h3>
     <ul>
      {#each problems.filter(p=>p.level===level) as problem}
       <li><a href={'/practice?problem='+problem.id}><span class="dot" aria-hidden="true"></span><span class="name">{problem.title}</span><span class="value">{problem.topic}</span></a></li>
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
  <nav aria-label="학습 분야 바로가기"><a href="/backend">백엔드·CS</a><a href="/practice">코딩 테스트</a><a href="/algorithm.html" data-sveltekit-reload>알고리즘 그림</a></nav>
  <div class="close-credits">
   <h2>사진 출처</h2>
   <ul>{#each Object.values(homePictures) as picture}<li><a href={picture.page} target="_blank" rel="noreferrer">{picture.year} · {picture.credit}</a> · {picture.license}</li>{/each}</ul>
   <p>Python 실행기 <a href="/licenses/pyodide.txt">Pyodide</a></p>
  </div>
 </div>
 <div class="close-legal"><a href="#top" onclick={(e)=>{e.preventDefault();window.scrollTo({top:0});}}>맨 위로</a></div>
</footer>
</div>
