import {flushSync} from 'svelte';

// Holds a stepped figure's body at the height of its tallest step, so the page does not jump while the steps change.
// Measures again when the body's width changes (text rewraps) or when `remeasure` is called.
export function steadyHeight(body:HTMLElement,count:()=>number,show:(i:number)=>void,current:()=>number){
 let width=-1;
 const remeasure=()=>{
  const keep=current();
  body.style.minHeight='';
  let tallest=0;
  for(let i=0;i<count();i++){flushSync(()=>show(i));tallest=Math.max(tallest,body.getBoundingClientRect().height);}
  flushSync(()=>show(keep));
  body.style.minHeight=Math.ceil(tallest)+'px';
 };
 const observer=new ResizeObserver(([entry])=>{const w=Math.round(entry.contentRect.width);if(w!==width){width=w;remeasure();}});
 observer.observe(body);
 document.fonts?.ready.then(()=>{if(body.isConnected)remeasure();});
 return {remeasure,stop:()=>observer.disconnect()};
}
