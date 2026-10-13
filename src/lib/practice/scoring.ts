export const HINT_COST=[0,8,18,30];
export const RETRY_DELAY=24*60*60*1000;
export function grade(score:number,accepted=true){return !accepted?'연습 중':score>=90?'S':score>=80?'A':score>=65?'B':'C';}
export function scoreSubmission(passed:number,total:number,hints:number,attempt:number){const accuracy=Math.round(passed/Math.max(1,total)*100);const hintCost=HINT_COST[Math.min(3,Math.max(0,hints))];const retryCost=Math.min(10,Math.max(0,attempt-1)*2);return {accuracy,hintCost,retryCost,score:Math.max(0,accuracy-hintCost-retryCost),accepted:passed===total&&total>0};}
export function updateBest(previous:number,raw:number,accepted:boolean,replay:boolean,hints:number,eligible:boolean){
 if(!accepted)return previous;
 if(!replay)return Math.max(previous,raw);
 // Only an independent, spaced replay can correct an assisted score, by at most 10.
 if(!eligible||hints>0)return previous;
 return Math.max(previous,Math.min(raw,previous+10));
}
