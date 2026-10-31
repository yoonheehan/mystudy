<script lang="ts">
 import {onMount} from 'svelte';
 import {csScenes} from '$lib/cs-scenes';
 let {id}:{id:string}=$props();
 const scene=$derived(csScenes[id]);
 let step=$state(0),playing=$state(false),delay=$state(2600),reduced=$state(false),mode=$state('threads');
 const frame=$derived(scene.frames[step]);
 const processCaptions={
  threads:['프로세스 A 안에 스레드 1·2가 있습니다. 힙은 공유하고 스택과 실행 위치는 각자 가집니다.','스레드 1이 공유 힙의 count를 1로 바꿉니다.','스레드 2도 같은 힙의 count = 1을 읽습니다. 스레드 1의 지역 변수는 자기 스택에 있습니다.','스레드 2가 count를 2로 바꿉니다. 실제 동시 갱신에는 락 등 동기화가 필요합니다.'],
  processes:['프로세스 A와 B는 각각의 주소 공간을 가집니다. 같은 변수 이름이어도 자동 공유되지 않습니다.','A의 count만 1로 바꿉니다. B의 count는 아직 0입니다.','A가 Queue에 숫자 1을 보냅니다. 이 전달은 명시적인 통신입니다.','B가 받은 값으로 자신의 count를 1로 바꿉니다. A의 메모리를 직접 읽은 것이 아닙니다.']
 };
 const caption=$derived(id==='process'?processCaptions[mode as keyof typeof processCaptions][step]:frame.caption);
 function move(value:number){playing=false;step=Math.max(0,Math.min(scene.frames.length-1,value));}
 function play(){if(playing){playing=false;return;}if(step===scene.frames.length-1)step=0;playing=true;}
 $effect(()=>{if(!playing)return;const timer=setInterval(()=>{if(step<scene.frames.length-1)step++;if(step===scene.frames.length-1)playing=false;},delay);return()=>clearInterval(timer);});
 onMount(()=>{const preference=matchMedia('(prefers-reduced-motion: reduce)');reduced=preference.matches;const change=()=>{reduced=preference.matches;playing=false;};const hide=()=>{if(document.hidden)playing=false;};preference.addEventListener('change',change);document.addEventListener('visibilitychange',hide);return()=>{preference.removeEventListener('change',change);document.removeEventListener('visibilitychange',hide);};});
</script>
{#if scene}
<div class="concept-animation" class:reduce-motion={reduced}>
 <div class="animation-heading"><strong>{scene.title}</strong></div>
 {#if id==='process'}
  <div class="animation-modes" aria-label="실행 구조 비교"><button class:selected={mode==='threads'} aria-pressed={mode==='threads'} onclick={()=>{mode='threads';move(0);}}>같은 프로세스의 스레드</button><button class:selected={mode==='processes'} aria-pressed={mode==='processes'} onclick={()=>{mode='processes';move(0);}}>서로 다른 프로세스</button></div>
  <div class="cpu-box"><strong>CPU 실행 흐름</strong><span>{step===0?'실행 준비':mode==='threads'?(step===1?'스레드 1 진행':'스레드 2 진행'):(step<3?'프로세스 A 진행':'프로세스 B 진행')}</span><p>하나의 실행 흐름을 따라가는 모형입니다. 실제 병렬 실행 수는 코어·런타임에 따라 다릅니다.</p></div>
  {#if mode==='threads'}
   <div class="process-boundary"><strong class="boundary-label">프로세스 A · 하나의 주소 공간</strong><div class="shared-heap" class:changing={step>0}><span>공유 힙 · 두 스레드가 같은 데이터를 봅니다</span><b>count = {step===0?0:step===3?2:1}</b></div><div class="thread-pair">{#each [1,2] as thread}<div class="thread-box" class:running={step>0&&(step===1?thread===1:thread===2)}><strong>스레드 {thread}</strong><span>{step>0&&(step===1?thread===1:thread===2)?'현재 진행':'진행 준비 / 대기'}</span><div>자기 스택<br/>지역 변수 · 호출 상태</div><div>자기 실행 위치</div></div>{/each}</div></div>
  {:else}
   <div class="process-pair">{#each ['A','B'] as name}<div class="process-boundary" class:running={step>0&&(step<3?name==='A':name==='B')}><strong class="boundary-label">프로세스 {name}</strong><div class="shared-heap"><span>독립된 힙 {name}</span><b>count = {name==='A'?(step>0?1:0):(step===3?1:0)}</b></div><div class="thread-box"><strong>자기 스레드</strong><span>자기 스택 · 실행 위치</span></div></div>{/each}</div><div class="ipc-channel" class:changing={step>=2}><strong>A → Queue → B</strong><span>{step<2?'전달 전':step===2?'값 1 전달 중':'B가 1 수신 · 자기 메모리에 저장'}</span></div>
  {/if}
 {:else}
  <ol class="scene-nodes" aria-label="구성 요소와 현재 상태">{#each scene.nodes as name,i}<li class:node-active={frame.active.includes(i)}><div class="node-title"><strong>{name}</strong></div><div class="node-value">{frame.values[i]}</div><span class="node-status">{frame.active.includes(i)?'이번 단계의 동작':'상태 유지 / 대기'}</span></li>{/each}</ol>
 {/if}
 <div class="animation-caption" aria-live={playing?'off':'polite'}><strong>{step+1} / {scene.frames.length} 단계</strong><p>{caption}</p></div>
 <div class="animation-timeline"><label for={'timeline-'+id}>단계 직접 선택</label><input id={'timeline-'+id} type="range" min="0" max={scene.frames.length-1} value={step} aria-valuetext={`${step+1}단계: ${caption}`} oninput={e=>move(Number(e.currentTarget.value))}/></div>
 <div class="animation-controls"><button disabled={step===0} onclick={()=>move(step-1)}>← 이전</button><button onclick={play} aria-pressed={playing}>{playing?'일시 정지':'자동 재생'}</button><button disabled={step===scene.frames.length-1} onclick={()=>move(step+1)}>다음 →</button><button onclick={()=>move(0)}>처음</button><label>속도<select aria-label="그림 재생 속도" bind:value={delay} onchange={()=>playing=false}><option value={4000}>천천히 · 4초</option><option value={2600}>보통 · 2.6초</option><option value={1400}>빠르게 · 1.4초</option></select></label></div>
 <p class="animation-footnote">{scene.note}{reduced?' 움직임 줄이기 설정을 적용했습니다.':''}</p>
</div>
{/if}
<style>
 .concept-animation{margin:40px 0;padding:32px;background:var(--surface,#f3f3f3);color:var(--ink,#0a0a0a);container-type:inline-size}
 .animation-heading{margin-bottom:24px}
 .animation-heading>strong{display:block;font-size:var(--step-lead,1.5rem);letter-spacing:-.02em;line-height:1.3}
 .animation-modes{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px}
 .animation-modes button,.animation-controls button{min-height:44px;padding:0 16px;border:0;background:var(--bg,#fff);transition:background-color .2s,color .2s,transform .2s}
 .animation-modes button{flex:1}
 .animation-modes button:hover,.animation-controls button:hover:not(:disabled){background:var(--surface-2,#e8e8e8)}
 .animation-modes button.selected{background:var(--ink,#0a0a0a);color:var(--bg,#fff)}
 .animation-controls button:active{transform:scale(.97)}
 .cpu-box{padding:18px 20px;background:var(--bg,#fff);margin-bottom:12px;display:grid;gap:4px}
 .cpu-box>span{font-size:var(--step-lead,1.4rem);font-weight:700;letter-spacing:-.02em}
 .cpu-box p,.animation-footnote{margin:0;font-size:var(--step-small,.9rem);color:var(--muted,#5f5f5f);line-height:1.55}
 .process-boundary{padding:18px 20px;background:var(--bg,#fff);display:grid;gap:12px;transition:background-color .4s,color .4s}
 .process-boundary.running{background:var(--ink,#0a0a0a);color:var(--bg,#fff)}
 .boundary-label{font-size:var(--step-body,1.1rem)}
 .process-pair,.thread-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}
 .shared-heap{padding:14px 16px;background:var(--surface,#f3f3f3);color:var(--ink,#0a0a0a);display:grid;gap:6px;transition:background-color .4s,color .4s}
 .shared-heap.changing{background:var(--accent,#2436ff);color:var(--accent-ink,#fff)}
 .shared-heap span{font-size:var(--step-small,.9rem)}
 .shared-heap b{font-family:ui-monospace,Consolas,monospace;font-size:var(--step-lead,1.4rem)}
 .thread-box{padding:14px 16px;background:var(--surface,#f3f3f3);color:var(--ink,#0a0a0a);display:grid;gap:6px;transition:background-color .4s,color .4s}
 .thread-box.running{background:var(--accent,#2436ff);color:var(--accent-ink,#fff)}
 .thread-box span,.thread-box>div{font-size:var(--step-small,.9rem);line-height:1.5}
 .ipc-channel{margin-top:12px;padding:14px 16px;background:var(--bg,#fff);display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;transition:background-color .4s,color .4s}
 .ipc-channel.changing{background:var(--accent,#2436ff);color:var(--accent-ink,#fff)}
 .scene-nodes{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
 .scene-nodes li{padding:18px;background:var(--bg,#fff);display:grid;gap:10px;align-content:start;transition:background-color .4s,color .4s,transform .4s}
 .scene-nodes li.node-active{background:var(--accent,#2436ff);color:var(--accent-ink,#fff);transform:translateY(-4px)}
 .node-title{display:flex;gap:10px;align-items:baseline}
 .node-value{font-size:var(--step-body,1.1rem);font-weight:600;line-height:1.45}
 .node-status{font-size:var(--step-small,.9rem);opacity:.8}
 .animation-caption{margin:24px 0 16px;display:grid;gap:6px}
 .animation-caption>strong{font-size:var(--step-small,.9rem);color:var(--muted,#5f5f5f)}
 .animation-caption p{margin:0;font-size:var(--step-body,1.1rem);line-height:1.65}
 .animation-timeline{display:grid;gap:6px;margin-bottom:16px;font-size:var(--step-small,.9rem);color:var(--muted,#5f5f5f)}
 .animation-timeline input{width:100%;accent-color:var(--accent,#2436ff)}
 .animation-controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:16px}
 .animation-controls label{display:flex;gap:8px;align-items:center;margin-left:auto;font-size:var(--step-small,.9rem)}
 .animation-controls select{min-height:44px;border:0;background:var(--bg,#fff);padding:0 10px}
 @container (max-width:500px){.process-pair,.thread-pair{grid-template-columns:1fr}.animation-controls label{margin-left:0}}
 @media (max-width:720px){.concept-animation{padding:22px 18px;margin-inline:calc(var(--margin,16px) * -1)}}
 @media (prefers-reduced-motion:reduce){.reduce-motion *{transition:none!important;transform:none!important}}
</style>
