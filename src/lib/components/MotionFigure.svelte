<script lang="ts">
 import {onMount,tick} from 'svelte';
 import type {Motion,Place} from '$lib/lesson-motions';
 let {motion,id}:{motion:Motion;id:string}=$props();
 let step=$state(0),playing=$state(false),delay=$state(2600),reduced=$state(false);
 const total=$derived(motion.frames.length);
 const frame=$derived(motion.frames[step]);
 const boxOf=(name:string)=>motion.boxes.find(b=>b.id===name)!;
 function point(place:Place):[number,number]{
  const [name,dx,dy]=typeof place==='string'?[place,0,0]:place;
  const b=boxOf(name);
  return [b.x+b.w/2+dx,b.y+b.h/2+dy];
 }
 // A chip keeps its last place while hidden, so it fades in and out where it was instead of jumping.
 // A chip with a `from` place is first drawn there without a transition, then released to fly to its `at` place.
 let settled=$state(true);
 let stage=$state<SVGSVGElement>();
 $effect(()=>{
  if(!motion.frames[step].from||reduced){settled=true;return;}
  settled=false;let live=true;
  // Reading layout after the DOM update commits the start place, so the release below is animated.
  tick().then(()=>{if(!live)return;stage?.getBoundingClientRect();settled=true;});
  return()=>{live=false;};
 });
 function chipState(chip:string,at:number){
  const start=motion.frames[at].from?.[chip];
  if(!settled&&start&&chip in motion.frames[at].at)return {pos:point(start),shown:true};
  let place:Place|undefined;
  for(let i=at;i>=0&&!place;i--)place=motion.frames[i].at[chip];
  for(let i=at+1;i<total&&!place;i++)place=motion.frames[i].at[chip];
  return {pos:point(place!),shown:chip in motion.frames[at].at};
 }
 const chipWidth=(text:string)=>[...text].reduce((w,c)=>w+(c.charCodeAt(0)>0x1100?13.5:7.6),0)+22;
 function edge(from:string,to:string):[number,number,number,number]{
  const a=boxOf(from),b=boxOf(to);
  const [ax,ay]=[a.x+a.w/2,a.y+a.h/2],[bx,by]=[b.x+b.w/2,b.y+b.h/2];
  const clip=(r:typeof a,cx:number,cy:number,dx:number,dy:number)=>{const t=Math.min(Math.abs((r.w/2+6)/(dx||1e-9)),Math.abs((r.h/2+6)/(dy||1e-9)));return [cx+dx*t,cy+dy*t];};
  const [x1,y1]=clip(a,ax,ay,bx-ax,by-ay),[x2,y2]=clip(b,bx,by,ax-bx,ay-by);
  return [x1,y1,x2,y2];
 }
 function move(value:number){playing=false;step=Math.max(0,Math.min(total-1,value));}
 function play(){if(playing){playing=false;return;}if(step===total-1)step=0;playing=true;}
 $effect(()=>{if(!playing)return;const timer=setInterval(()=>{if(step<total-1)step++;if(step===total-1)playing=false;},delay);return()=>clearInterval(timer);});
 onMount(()=>{const pref=matchMedia('(prefers-reduced-motion: reduce)');reduced=pref.matches;const change=()=>{reduced=pref.matches;playing=false;};const hide=()=>{if(document.hidden)playing=false;};pref.addEventListener('change',change);document.addEventListener('visibilitychange',hide);return()=>{pref.removeEventListener('change',change);document.removeEventListener('visibilitychange',hide);};});
</script>

<figure class="motion" class:reduce-motion={reduced} aria-labelledby={'motion-title-'+id}>
 <figcaption class="motion-title" id={'motion-title-'+id}><span>움직이는 그림</span>{motion.title}</figcaption>
 <div class="motion-stage">
  <svg bind:this={stage} viewBox={`0 0 ${motion.width} ${motion.height}`} role="img" aria-label={`${motion.title}. ${step+1}단계: ${frame.caption}`}>
   <defs><marker id={'arrow-'+id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="arrow-head"/></marker></defs>
   {#each frame.link||[] as [from,to] (from+to+step)}
    {@const [x1,y1,x2,y2]=edge(from,to)}
    <line class="link" {x1} {y1} {x2} {y2} marker-end={`url(#arrow-${id})`}/>
   {/each}
   {#each motion.boxes as box (box.id)}
    {@const on=frame.on?.includes(box.id)}
    <g class="box" class:on class:store={box.kind==='store'}>
     <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="6"/>
     <text class="box-label" x={box.x+box.w/2} y={box.y+24}>{box.label}</text>
     {#if frame.sub?.[box.id]??box.sub}<text class="box-sub" x={box.x+box.w/2} y={box.y+44}>{frame.sub?.[box.id]??box.sub}</text>{/if}
    </g>
   {/each}
   {#each motion.chips as chip (chip.id)}
    {@const s=chipState(chip.id,step)}
    {@const text=frame.labels?.[chip.id]??chip.label}
    {@const w=chipWidth(text)}
    <g class={'chip tone-'+(frame.tone?.[chip.id]??chip.tone??'ok')} class:shown={s.shown} class:jump={!settled&&!!frame.from?.[chip.id]} style={`transform:translate(${s.pos[0]}px,${s.pos[1]}px)`}>
     <rect x={-w/2} y="-14" width={w} height="28" rx="14"/>
     <text y="5">{text}</text>
    </g>
   {/each}
  </svg>
 </div>
 <div class="motion-caption" aria-live={playing?'off':'polite'}><span>{step+1} / {total} 단계</span><p>{frame.caption}</p></div>
 <div class="motion-controls">
  <div><button onclick={()=>move(0)} disabled={step===0}>처음</button><button onclick={()=>move(step-1)} disabled={step===0}>이전</button></div>
  <input aria-label="단계 선택" type="range" min="0" max={total-1} value={step} aria-valuetext={`${step+1}단계: ${frame.caption}`} oninput={e=>move(Number(e.currentTarget.value))}/>
  <div><button onclick={play} aria-pressed={playing}>{playing?'일시 정지':'자동 재생'}</button><button class="primary" onclick={()=>move(step+1)} disabled={step===total-1}>다음</button></div>
 </div>
 <label class="motion-speed">재생 속도<select bind:value={delay} onchange={()=>playing=false}><option value={4000}>천천히 · 4초</option><option value={2600}>보통 · 2.6초</option><option value={1400}>빠르게 · 1.4초</option></select></label>
 <p class="motion-note">개념을 보여 주려고 단순하게 그린 장면입니다. 값과 주소는 예시이며 실제 시스템을 실행한 결과가 아닙니다.</p>
</figure>

<style>
 .motion{margin:40px 0;padding:28px;background:var(--surface,#f3f3f3);color:var(--ink,#0a0a0a)}
 .motion-title{display:grid;gap:6px;font-size:var(--step-lead,1.4rem);font-weight:700;letter-spacing:-.02em;margin-bottom:20px}
 .motion-title span{font-size:13px;font-weight:700;letter-spacing:0;color:var(--accent,#2436ff)}
 .motion-stage{overflow-x:auto;background:var(--bg,#fff)}
 svg{display:block;width:100%;min-width:600px;height:auto}
 .box rect{fill:var(--bg,#fff);stroke:#c9ccd6;stroke-width:1.5;transition:stroke .4s,fill .4s}
 .box.store rect{stroke-dasharray:5 4}
 .box.on rect{stroke:var(--accent,#2436ff);stroke-width:2.5;fill:color-mix(in srgb,var(--accent,#2436ff) 7%,var(--bg,#fff))}
 .box-label{font-size:15px;font-weight:700;text-anchor:middle;fill:var(--ink,#0a0a0a)}
 .box-sub{font-size:12.5px;text-anchor:middle;fill:var(--muted,#5f5f5f);font-variant-numeric:tabular-nums}
 .link{stroke:var(--accent,#2436ff);stroke-width:1.5;stroke-dasharray:6 5;animation:dash 1s linear infinite}
 .arrow-head{fill:var(--accent,#2436ff)}
 @keyframes dash{to{stroke-dashoffset:-22}}
 .chip{opacity:0;transition:transform .8s cubic-bezier(.65,0,.35,1),opacity .35s}
 .chip.shown{opacity:1}
 .chip.jump{transition:none}
 .chip rect{fill:var(--tone)}
 .chip text{font-size:13px;font-weight:600;text-anchor:middle;fill:#fff;font-variant-numeric:tabular-nums}
 .tone-ok{--tone:var(--accent,#2436ff)}.tone-fail{--tone:#c4271b}.tone-wait{--tone:#8a6d00}.tone-note{--tone:#5f6470}
 .motion-caption{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:baseline;margin:20px 0 16px}
 .motion-caption span{font-size:13px;font-weight:700;color:var(--accent,#2436ff);white-space:nowrap;font-variant-numeric:tabular-nums}
 .motion-caption p{margin:0;font-size:var(--step-body,1.1rem);line-height:1.6}
 .motion-controls{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center}
 .motion-controls div{display:flex;gap:8px}
 .motion-controls button{min-height:44px;padding:0 16px;border:0;background:var(--bg,#fff);transition:background-color .2s,transform .2s}
 .motion-controls button:hover:not(:disabled){background:var(--surface-2,#e8e8e8)}
 .motion-controls button:active:not(:disabled){transform:scale(.97)}
 .motion-controls button.primary{background:var(--accent,#2436ff);color:#fff;font-weight:600}
 .motion-controls input{width:100%;accent-color:var(--accent,#2436ff)}
 .motion-speed{display:flex;gap:8px;align-items:center;margin-top:12px;font-size:13px;color:var(--muted,#5f5f5f)}
 .motion-speed select{min-height:40px;border:0;background:var(--bg,#fff);padding:0 10px}
 .motion-note{margin:12px 0 0;font-size:13px;color:var(--muted,#5f5f5f)}
 @media (max-width:720px){
  .motion{padding:20px 16px;margin-inline:calc(var(--margin,16px) * -1)}
  .motion-controls{grid-template-columns:1fr 1fr}
  .motion-controls input{grid-column:1/-1;grid-row:1}
  .motion-controls div:last-child{justify-content:flex-end}
 }
 @media (prefers-reduced-motion:reduce){.reduce-motion .chip,.reduce-motion .box rect{transition:opacity .2s}.reduce-motion .link{animation:none}}
</style>
