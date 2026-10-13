<script lang="ts">
 import {onMount} from 'svelte';
 import {lessons} from '$lib/lessons';
 let solved=$state(0),csDone=$state(0),algDone=$state(0),last=$state('process');
 let warning=$state(false);
 onMount(()=>{try{
  const backend=JSON.parse(localStorage.getItem('serverNotebook.v1')||'{}');
  csDone=new Set((backend.completed||[]).filter((id:string)=>lessons.some(l=>l.id===id))).size;
  if(lessons.some(l=>l.id===backend.lastLesson))last=backend.lastLesson;
  const coding=JSON.parse(localStorage.getItem('csLabPractice.v1')||'{}');
  solved=Math.min(24,Object.values(coding.records||{}).filter((r:any)=>r?.accepted===true).length);
  const algorithm=JSON.parse(localStorage.getItem('oneStepAlgorithmV1')||'{}');
  algDone=new Set((algorithm.completed||[]).filter((i:number)=>Number.isInteger(i)&&i>=0&&i<12)).size;
 }catch{warning=true;}});
</script>
<svelte:head><title>CS 노트 · 개발 공부방</title><meta name="description" content="Python 코딩 테스트와 백엔드·CS. 설명을 읽고, 그림으로 이해하고, 직접 코드로 확인하는 개발 공부방."/></svelte:head>
<div class="journal-home">
 <header class="journal-header"><a class="journal-brand" href="/">CS 노트<span>개발 공부방</span></a><nav aria-label="학습 분야"><a href="/" aria-current="page">홈</a><a href="/backend">백엔드·CS</a><a href="/practice">Python 코딩 테스트</a><a href="/algorithm.html" data-sveltekit-reload>알고리즘 그림</a></nav></header>
 <main class="journal-main">
  <div class="journal-intro"><span>나의 개발 공부 기록</span><h1>읽고 이해하고,<br/>직접 풀어보는 공부.</h1><p>서버가 움직이는 이유부터 Python 문제 풀이까지.<br/>필요한 내용을 찾아 읽거나, 첫 단원부터 순서대로 시작하세요.</p></div>
  {#if warning}<p class="journal-notice">저장된 기록을 읽지 못했습니다. 각 학습 화면에서 기록을 확인해 주세요.</p>{/if}
  <section class="journal-tracks" aria-label="두 가지 학습 분야">
   <article><div class="journal-category">01 · 알고리즘 / 문제 풀이</div><h2><a href="/practice">Python 코딩 테스트</a></h2><p>코드를 직접 쓰고 여러 입력으로 확인합니다. 입문부터 도전까지 24개 문제, 하나씩 열어 보는 힌트, 시간·공간 복잡도와 재도전 기록을 제공합니다.</p><div class="journal-topics">배열 · 자료구조 · 탐색 · 그래프 · DP</div><div class="journal-track-bottom"><a class="journal-start" href="/practice">문제 풀러 가기 →</a><span>해결 {solved} / 24</span></div><div class="journal-related"><a href="/algorithm.html" data-sveltekit-reload>먼저 원리가 궁금하다면: 알고리즘 그림 12개 단원 →</a><span>학습 {algDone} / 12</span></div></article>
   <article><div class="journal-category">02 · 백엔드 / 컴퓨터 과학</div><h2><a href="/backend">백엔드·CS 공부 노트</a></h2><p>용어의 정의에서 멈추지 않고, 왜 필요한지와 어떻게 동작하는지를 연결합니다. 생활 속 비유, 단계별 그림, Python 예제와 면접 질문으로 32개 단원을 읽어갑니다.</p><div class="journal-topics">운영체제 · 네트워크 · 데이터베이스 · 클라우드 · 보안</div><div class="journal-track-bottom"><a class="journal-start" href="/backend">전체 학습 목차 →</a><span>학습 {csDone} / 32</span></div><div class="journal-related"><a href={'/backend?lesson='+last}>마지막 단원 이어 읽기 →</a><span>진도·북마크·메모 저장</span></div></article>
  </section>
  <aside class="journal-note"><strong>공부하는 순서</strong><p>정의와 비유를 읽고 → 그림의 다음 상태를 예측하고 → Python 코드를 확인하고 → 내 말로 설명해 보세요. 진도와 메모는 사용 중인 브라우저에 저장됩니다.</p></aside>
  <footer class="journal-footer"><span>CS 노트 · Python과 서버 공부</span><details><summary>디자인 참고</summary><p><a href="https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-JWTjson-web-token-%EB%9E%80-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC" target="_blank" rel="noreferrer">인파 · 개발 글의 읽기 흐름</a>을 참고해 새로 구성했습니다. 원문의 글·이미지·스타일 코드는 복제하지 않았습니다. 기존 UI 기반의 <a href="/licenses/tabler.txt">Tabler 라이선스</a>도 유지합니다.</p></details></footer>
 </main>
</div>
