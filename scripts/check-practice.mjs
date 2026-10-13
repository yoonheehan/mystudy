import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import ts from 'typescript';
const root=path.resolve('src/lib'),cache=new Map();
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file);const module={exports:{}};cache.set(file,module.exports);const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;new Function('require','exports','module',source)(name=>load(name.startsWith('$lib/')?path.join(root,name.slice(5)+'.ts'):path.resolve(path.dirname(file),name+'.ts')),module.exports,module);return module.exports;}
const {problems}=load(path.join(root,'practice/problems.ts'));
const {casesFor,references}=load(path.join(root,'server/practice-cases.ts'));
const {scoreSubmission,updateBest,grade}=load(path.join(root,'practice/scoring.ts'));
assert.equal(problems.length,24);assert.equal(new Set(problems.map(p=>p.id)).size,24);
for(const level of ['입문','중급','도전'])assert.equal(problems.filter(p=>p.level===level).length,8);
const oracles={
 maximum:({nums})=>nums.length?[...nums].sort((a,b)=>b-a)[0]:null,
 'range-sum':({nums,queries})=>queries.map(([l,r])=>nums.slice(l,r+1).reduce((a,b)=>a+b,0)),
 unique:({nums})=>nums.filter((v,i)=>nums.indexOf(v)===i),
 frequency:({nums})=>nums.length?[...new Set(nums)].sort((a,b)=>nums.filter(v=>v===b).length-nums.filter(v=>v===a).length||a-b)[0]:null,
 merge:({a,b})=>[...a,...b].sort((a,b)=>a-b),
 'lower-bound':({nums,target})=>{const i=nums.findIndex(v=>v>=target);return i<0?nums.length:i;},
 'pair-count':({nums,target})=>{let n=0;for(let i=0;i<nums.length;i++)for(let j=i+1;j<nums.length;j++)n+=nums[i]+nums[j]===target;return n;},
 'short-window':({nums,target})=>{let best=Infinity;for(let i=0;i<nums.length;i++){let sum=0;for(let j=i;j<nums.length;j++){sum+=nums[j];if(sum>=target)best=Math.min(best,j-i+1);}}return best===Infinity?0:best;},
 warmer:({temps})=>temps.map((v,i)=>{for(let j=i+1;j<temps.length;j++)if(temps[j]>v)return j-i;return 0;}),
 'subarray-k':({nums,k})=>{let count=0;for(let i=0;i<nums.length;i++){let sum=0;for(let j=i;j<nums.length;j++){sum+=nums[j];count+=sum===k;}}return count;},
 lis:({nums})=>{const dp=nums.map(()=>1);for(let i=0;i<nums.length;i++)for(let j=0;j<i;j++)if(nums[j]<nums[i])dp[i]=Math.max(dp[i],dp[j]+1);return Math.max(0,...dp);},
 dijkstra:({n,edges,start})=>{const dist=Array(n).fill(Infinity);dist[start]=0;for(let i=0;i<n-1;i++)for(const [a,b,w]of edges)dist[b]=Math.min(dist[b],dist[a]+w);return dist.map(v=>v===Infinity?-1:v);},
 knapsack:({weights,values,capacity})=>{let prev=Array(capacity+1).fill(0);for(let i=0;i<weights.length;i++){const next=[...prev];for(let c=weights[i];c<=capacity;c++)next[c]=Math.max(next[c],prev[c-weights[i]]+values[i]);prev=next;}return prev[capacity];},
 'edit-distance':({a,b})=>{const dp=Array.from({length:a.length+1},(_,i)=>Array.from({length:b.length+1},(_,j)=>i?j?0:i:j));for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);return dp[a.length][b.length];},
 rooms:({intervals})=>Math.max(0,...intervals.map(([s])=>intervals.filter(([a,b])=>a<=s&&s<b).length)),
 'window-max':({nums,k})=>k?Array.from({length:nums.length-k+1},(_,i)=>Math.max(...nums.slice(i,i+k))):[],
 components:({n,edges})=>{const adj=Array.from({length:n},()=>[]),seen=new Set();for(const[a,b]of edges){adj[a].push(b);adj[b].push(a);}let groups=0;for(let i=0;i<n;i++)if(!seen.has(i)){groups++;const q=[i];seen.add(i);for(const u of q)for(const v of adj[u])if(!seen.has(v)){seen.add(v);q.push(v);}}return groups;}
};
let compared=0,totalCases=0;
for(const p of problems){
 assert.equal(p.hints.length,3);
 for(const example of p.examples)assert.deepEqual(references[p.id](structuredClone(example.input)),example.output,p.id+' example');
 for(const seed of [12345,98765,42]){
  const cases=casesFor(p.id,'submit',seed);assert.ok(cases.length>=15);assert.ok(cases.some(c=>c.kind==='큰 입력'));totalCases+=cases.length;
  for(const test of cases){assert.doesNotThrow(()=>JSON.stringify(test));if(oracles[p.id]&&test.kind!=='큰 입력'){assert.deepEqual(oracles[p.id](structuredClone(test.input)),test.expected,p.id+' '+test.label);compared++;}}
 }
}
assert.deepEqual(scoreSubmission(20,20,3,1),{accuracy:100,hintCost:30,retryCost:0,score:70,accepted:true});
assert.equal(scoreSubmission(10,20,0,2).score,48);
assert.equal(scoreSubmission(20,20,0,30).score,90);
assert.equal(updateBest(70,100,true,true,0,false),70,'same day cannot farm');
assert.equal(updateBest(70,100,true,true,0,true),80,'spaced retry limited to +10');
assert.equal(updateBest(90,100,true,true,1,true),90,'assisted retry cannot correct');
assert.equal(updateBest(90,0,false,true,0,true),90,'failed retry preserves best');
assert.equal(updateBest(0,82,true,false,2,false),82);
assert.equal(grade(100,false),'연습 중');assert.equal(grade(90),'S');assert.equal(grade(80),'A');assert.equal(grade(65),'B');assert.equal(grade(64),'C');
console.log(`24 problems validated; ${totalCases} generated cases; ${compared} independent oracle comparisons; scoring and replay checks passed.`);
