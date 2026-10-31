// Reveals [data-rise] children of a section once it scrolls into view. Without script nothing is hidden.
export function rise(node:HTMLElement){
 document.documentElement.classList.add('js');
 const items=[...node.querySelectorAll<HTMLElement>('[data-rise]')];
 items.forEach((el,i)=>{el.classList.add('rise');el.style.setProperty('--i',String(i%8));});
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('seen');observer.unobserve(entry.target);}},{rootMargin:'0px 0px -8% 0px'});
 items.forEach(el=>observer.observe(el));
 return {destroy(){observer.disconnect();}};
}
