<script lang="ts">
 import {onMount} from 'svelte';
 import type {Diagram,Tone} from '$lib/cs-diagrams';
 import {steadyHeight} from '$lib/steady-height';
 let {diagram,id}:{diagram:Diagram;id:string}=$props();
 let step=$state(0),playing=$state(false),delay=$state(2600),reduced=$state(false);
 const total=$derived(diagram.steps.length);
 const caption=$derived(diagram.steps[step].caption);
 const toneLabel:Record<Tone,string>={ok:'통과',fail:'실패',wait:'대기',note:'해당 없음'};
 function move(value:number){playing=false;step=Math.max(0,Math.min(total-1,value));}
 function play(){if(playing){playing=false;return;}if(step===total-1)step=0;playing=true;}
 $effect(()=>{if(!playing)return;const timer=setInterval(()=>{if(step<total-1)step++;if(step===total-1)playing=false;},delay);return()=>clearInterval(timer);});
 let body=$state<HTMLElement>();
 onMount(()=>{const steady=steadyHeight(body!,()=>total,i=>step=i,()=>step);return steady.stop;});
 onMount(()=>{const pref=matchMedia('(prefers-reduced-motion: reduce)');reduced=pref.matches;const change=()=>{reduced=pref.matches;playing=false;};const hide=()=>{if(document.hidden)playing=false;};pref.addEventListener('change',change);document.addEventListener('visibilitychange',hide);return()=>{pref.removeEventListener('change',change);document.removeEventListener('visibilitychange',hide);};});
</script>

<figure class="diagram" class:reduce-motion={reduced} aria-labelledby={'diagram-title-'+id}>
 <figcaption class="diagram-title" id={'diagram-title-'+id}>{diagram.title}</figcaption>
 <div class="diagram-body" bind:this={body}>

 {#if diagram.kind==='sequence'}
  {@const d=diagram}
  <div class="seq" style={'--lanes:'+d.lanes.length}>
   <div class="seq-head">{#each d.lanes as lane}<span>{lane}</span>{/each}</div>
   <ol class="seq-body">
    {#each d.steps.slice(0,step+1) as msg,i}
     {@const left=Math.min(msg.from,msg.to)}{@const right=Math.max(msg.from,msg.to)}
     <li class="seq-row" class:current={i===step}>
      {#if msg.from===msg.to}
       <span class={'seq-self tone-'+(msg.tone||'ok')} style={'grid-column:'+(left+1)}>{msg.label}</span>
      {:else}
       <span class={'seq-arrow tone-'+(msg.tone||'ok')} class:reverse={msg.to<msg.from} style={'grid-column:'+(left+1)+' / '+(right+2)+';--span:'+(right-left+1)}><span class="seq-label">{msg.label}</span></span>
      {/if}
     </li>
    {/each}
   </ol>
  </div>
 {:else if diagram.kind==='table'}
  {@const d=diagram}{@const s=d.steps[step]}
  {#if s.packet}<p class="table-packet"><span>{d.packetLabel||'지금 지나가는 패킷'}</span><b>{s.packet}</b></p>{/if}
  <div class="table-wrap"><table><thead><tr>{#each d.columns as col}<th scope="col">{col}</th>{/each}</tr></thead>
   <tbody>{#each s.rows as row,i}<tr class:hot={s.highlight?.includes(i)}>{#each row as cell}<td>{cell}</td>{/each}</tr>{:else}<tr><td colspan={d.columns.length} class="table-empty">아직 비어 있습니다</td></tr>{/each}</tbody></table></div>
 {:else if diagram.kind==='timeline'}
  {@const d=diagram}
  <div class="tl" style={'--lanes:'+d.lanes.length}>
   <div class="tl-head"><span class="tl-t">순서</span>{#each d.lanes as lane}<span>{lane}</span>{/each}{#if d.stateLabel}<span>{d.stateLabel}</span>{/if}</div>
   <ol class="tl-body">
    {#each d.steps.slice(0,step+1) as ev,i}
     <li class:current={i===step}><span class="tl-t">{i+1}</span>{#each d.lanes as _,lane}<span class="tl-cell">{#if lane===ev.lane}<b class={'tone-'+(ev.tone||'ok')}>{ev.text}</b>{/if}</span>{/each}{#if d.stateLabel}<span class="tl-state">{ev.state||''}</span>{/if}</li>
    {/each}
   </ol>
  </div>
 {:else}
  {@const d=diagram}{@const s=d.steps[step]}
  <ol class="flow">
   {#each d.nodes as node,i}
    {@const tone=s.status[i]}
    <li class:active={i===s.active} class={tone?'tone-'+tone:'idle'}>
     <span class="flow-mark" aria-hidden="true"></span>
     <span class="flow-text"><strong>{node.label}</strong>{#if node.sub}<small>{node.sub}</small>{/if}</span>
     <span class="flow-status">{tone?toneLabel[tone]:'—'}</span>
    </li>
   {/each}
  </ol>
  {#if s.result}<p class="flow-result">{s.result}</p>{/if}
 {/if}

 <div class="diagram-caption" aria-live={playing?'off':'polite'}><span>{step+1} / {total} 단계</span><p>{caption}</p></div>
 </div>
 <div class="diagram-controls">
  <div><button onclick={()=>move(0)} disabled={step===0}>처음</button><button onclick={()=>move(step-1)} disabled={step===0}>이전</button></div>
  <input aria-label="단계 선택" type="range" min="0" max={total-1} value={step} aria-valuetext={`${step+1}단계: ${caption}`} oninput={e=>move(Number(e.currentTarget.value))}/>
  <div><button onclick={play} aria-pressed={playing}>{playing?'일시 정지':'자동 재생'}</button><button class="primary" onclick={()=>move(step+1)} disabled={step===total-1}>다음</button></div>
 </div>
 <label class="diagram-speed">재생 속도<select bind:value={delay} onchange={()=>playing=false}><option value={4000}>천천히 · 4초</option><option value={2600}>보통 · 2.6초</option><option value={1400}>빠르게 · 1.4초</option></select></label>
 <p class="diagram-note">고정된 예제로 개념을 설명하는 그림입니다. 실제 시스템을 실행하거나 측정한 결과가 아닙니다.</p>
</figure>

<style>
 .diagram-body{display:flow-root}
 .diagram{margin:40px 0;padding:28px;background:var(--surface,#f3f3f3);color:var(--ink,#0a0a0a)}
 .diagram-title{font-size:var(--step-lead,1.4rem);font-weight:700;letter-spacing:-.02em;margin-bottom:20px}
 .tone-ok{--tone:var(--accent,#2436ff)}.tone-fail{--tone:#c4271b}.tone-wait{--tone:#8a6d00}.tone-note{--tone:#8a8a8a}

 /* Sequence: lanes as columns, messages accumulate downward */
 .seq{background:var(--bg,#fff);padding:16px;overflow-x:auto}
 .seq-head,.seq-row{display:grid;grid-template-columns:repeat(var(--lanes),minmax(96px,1fr));min-width:calc(var(--lanes) * 104px)}
 .seq-head span{text-align:center;font-weight:700;font-size:14px;padding:8px 4px;border-bottom:2px solid var(--ink,#0a0a0a)}
 .seq-body{list-style:none;margin:0;padding:8px 0 0;background:repeating-linear-gradient(to right,transparent 0,transparent calc(100% / var(--lanes) / 2 - 1px),#d4d7e3 calc(100% / var(--lanes) / 2 - 1px),#d4d7e3 calc(100% / var(--lanes) / 2),transparent calc(100% / var(--lanes) / 2),transparent calc(100% / var(--lanes)))}
 .seq-row{min-height:46px;align-items:center;opacity:.72;transition:opacity .3s}
 .seq-row.current{opacity:1}
 .seq-arrow{position:relative;display:block;align-self:end;padding:6px 0 10px;margin-inline:calc(100% / (2 * var(--span)))}
 .seq-arrow::before{content:'';position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--tone)}
 .seq-arrow::after{content:'';position:absolute;right:-1px;bottom:-5px;border:6px solid transparent;border-left:9px solid var(--tone);border-right:0}
 .seq-arrow.reverse::after{right:auto;left:-1px;border-left:0;border-right:9px solid var(--tone)}
 .seq-label{display:block;margin:0 -48px;text-align:center;font-size:13px;font-weight:600;line-height:1.4;color:var(--ink,#0a0a0a);overflow-wrap:anywhere}
 .seq-self{justify-self:center;font-size:13px;font-weight:600;padding:4px 8px;border-left:3px solid var(--tone);background:var(--surface,#f3f3f3)}

 /* Table */
 .table-packet{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:baseline;margin:0 0 12px;padding:12px 16px;background:var(--bg,#fff)}
 .table-packet span{font-size:13px;color:var(--muted,#5f5f5f)}
 .table-packet b{font-variant-numeric:tabular-nums}
 .table-wrap{overflow-x:auto;background:var(--bg,#fff)}
 .table-wrap table{width:100%;border-collapse:collapse;font-size:14px;font-variant-numeric:tabular-nums}
 .table-wrap th{text-align:left;font-weight:500;color:var(--muted,#5f5f5f);padding:10px 12px;border-bottom:1px solid #e4e6ec}
 .table-wrap td{padding:10px 12px;border-bottom:1px solid #eceef2;transition:background-color .3s}
 .table-wrap tr.hot td{background:#e8ebff;font-weight:600}
 .table-empty{color:var(--muted,#5f5f5f);text-align:center}

 /* Timeline: one row per step, one column per lane */
 .tl{background:var(--bg,#fff);padding:12px 16px;overflow-x:auto}
 .tl-head,.tl-body li{display:grid;grid-template-columns:40px repeat(var(--lanes),minmax(140px,1fr)) minmax(150px,1.1fr);gap:12px;align-items:center;min-width:calc(var(--lanes) * 152px + 220px)}
 .tl-head{font-size:13px;font-weight:700;padding-bottom:8px;border-bottom:2px solid var(--ink,#0a0a0a)}
 .tl-body{list-style:none;margin:0;padding:0}
 .tl-body li{min-height:44px;border-bottom:1px solid #eceef2;opacity:.72;transition:opacity .3s}
 .tl-body li.current{opacity:1}
 .tl-t{font-size:13px;color:var(--muted,#5f5f5f);font-variant-numeric:tabular-nums}
 .tl-cell b{display:inline-block;padding:4px 10px;font-size:14px;font-weight:600;border-left:3px solid var(--tone);background:var(--surface,#f3f3f3)}
 .tl-state{font-size:13px;color:var(--ink,#0a0a0a);font-variant-numeric:tabular-nums}

 /* Flow: checkpoints in order */
 .flow{list-style:none;margin:0;padding:0;display:grid;gap:6px}
 .flow li{display:grid;grid-template-columns:14px minmax(0,1fr) auto;gap:14px;align-items:center;padding:12px 16px;background:var(--bg,#fff);transition:background-color .3s,transform .3s}
 .flow li.active{transform:translateX(6px);box-shadow:inset 3px 0 0 var(--tone,var(--ink,#0a0a0a))}
 .flow-mark{width:12px;height:12px;border-radius:50%;background:var(--tone,#d4d7e3)}
 .flow li.idle .flow-mark{background:#e3e5ec}
 .flow-text{display:grid;gap:2px}
 .flow-text strong{font-size:15px}
 .flow-text small{font-size:13px;color:var(--muted,#5f5f5f)}
 .flow-status{font-size:13px;font-weight:600;color:var(--tone,var(--muted,#5f5f5f))}
 .flow li.idle .flow-status{color:#9a9a9a;font-weight:400}
 .flow-result{margin:12px 0 0;padding:10px 16px;background:var(--ink,#0a0a0a);color:#fff;font-weight:600;font-variant-numeric:tabular-nums}

 /* Caption and controls */
 .diagram-caption{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:baseline;margin:20px 0 16px}
 .diagram-caption span{font-size:13px;font-weight:700;color:var(--accent,#2436ff);white-space:nowrap;font-variant-numeric:tabular-nums}
 .diagram-caption p{margin:0;font-size:var(--step-body,1.1rem);line-height:1.6}
 .diagram-controls{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center}
 .diagram-controls div{display:flex;gap:8px}
 .diagram-controls button{min-height:44px;padding:0 16px;border:0;background:var(--bg,#fff);transition:background-color .2s,transform .2s}
 .diagram-controls button:hover:not(:disabled){background:var(--surface-2,#e8e8e8)}
 .diagram-controls button:active:not(:disabled){transform:scale(.97)}
 .diagram-controls button.primary{background:var(--accent,#2436ff);color:#fff;font-weight:600}
 .diagram-controls input{width:100%;accent-color:var(--accent,#2436ff)}
 .diagram-speed{display:flex;gap:8px;align-items:center;margin-top:12px;font-size:13px;color:var(--muted,#5f5f5f)}
 .diagram-speed select{min-height:40px;border:0;background:var(--bg,#fff);padding:0 10px}
 .diagram-note{margin:12px 0 0;font-size:13px;color:var(--muted,#5f5f5f)}
 @media (max-width:720px){
  .seq{padding:12px 8px}
  .seq-head,.seq-row{grid-template-columns:repeat(var(--lanes),minmax(0,1fr));min-width:0}
  .seq-head span{font-size:12px;padding:8px 2px}
  .seq-label{margin:0 -20px;font-size:12px}
  .seq-self{font-size:12px;padding:4px 6px;max-width:100%}
  .diagram{padding:20px 16px;margin-inline:calc(var(--margin,16px) * -1)}
  .diagram-controls{grid-template-columns:1fr 1fr}
  .diagram-controls input{grid-column:1/-1;grid-row:1}
  .diagram-controls div:last-child{justify-content:flex-end}
  .flow li.active{transform:none}
 }
 @media (prefers-reduced-motion:reduce){.reduce-motion *{transition:none!important;transform:none!important}}
</style>
