import { getProblem, type Data } from '$lib/practice/problems';
export type Case = { label:string; input:Data; expected:any; kind:'예시'|'경계'|'무작위'|'큰 입력' };
class Heap {
 a:number[][]=[];
 push(x:number[]){let i=this.a.length;this.a.push(x);while(i){const p=(i-1)>>1;if(this.a[p][0]<=x[0])break;this.a[i]=this.a[p];i=p;}this.a[i]=x;}
 pop(){const first=this.a[0],last=this.a.pop()!;if(this.a.length){let i=0;while(2*i+1<this.a.length){let c=2*i+1;if(c+1<this.a.length&&this.a[c+1][0]<this.a[c][0])c++;if(this.a[c][0]>=last[0])break;this.a[i]=this.a[c];i=c;}this.a[i]=last;}return first;}
}
export const references:Record<string,(d:Data)=>any> = {
 maximum:({nums})=>nums.length?nums.reduce((a:number,b:number)=>Math.max(a,b)):null,
 'range-sum':({nums,queries})=>{const ps=[0];for(const v of nums)ps.push(ps.at(-1)!+v);return queries.map(([l,r]:number[])=>ps[r+1]-ps[l]);},
 unique:({nums})=>[...new Set(nums)],
 palindrome:({text})=>{const s=text.toLowerCase().replace(/[^a-z0-9]/g,'');return s===[...s].reverse().join('');},
 brackets:({text})=>{const st=[];const pairs:Record<string,string>={')':'(',']':'[','}':'{'};for(const ch of text){if('([{'.includes(ch))st.push(ch);else if(st.pop()!==pairs[ch])return false;}return !st.length;},
 frequency:({nums})=>{const m=new Map<number,number>();let ans:number|null=null,best=0;for(const v of nums){const count=(m.get(v)||0)+1;m.set(v,count);if(count>best||count===best&&(ans===null||v<ans)){ans=v;best=count;}}return ans;},
 merge:({a,b})=>{let i=0,j=0;const out=[];while(i<a.length||j<b.length)out.push(j>=b.length||i<a.length&&a[i]<=b[j]?a[i++]:b[j++]);return out;},
 'lower-bound':({nums,target})=>{let l=0,r=nums.length;while(l<r){const m=(l+r)>>1;if(nums[m]<target)l=m+1;else r=m;}return l;},
 'pair-count':({nums,target})=>{let out=0;const m=new Map();for(const v of nums){out+=m.get(target-v)||0;m.set(v,(m.get(v)||0)+1);}return out;},
 'short-window':({nums,target})=>{let l=0,sum=0,best=Infinity;for(let r=0;r<nums.length;r++){sum+=nums[r];while(sum>=target){best=Math.min(best,r-l+1);sum-=nums[l++];}}return best===Infinity?0:best;},
 warmer:({temps})=>{const out=Array(temps.length).fill(0),st:number[]=[];for(let i=0;i<temps.length;i++){while(st.length&&temps[i]>temps[st.at(-1)!]){const j=st.pop()!;out[j]=i-j;}st.push(i);}return out;},
 maze:({grid})=>{const R=grid.length,C=grid[0]?.length||0;if(!R||!C||grid[0][0]||grid[R-1][C-1])return -1;const dist=Array.from({length:R},()=>Array(C).fill(-1));dist[0][0]=0;const q=[[0,0]];for(let h=0;h<q.length;h++){const [r,c]=q[h];if(r===R-1&&c===C-1)return dist[r][c];for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=r+dr,y=c+dc;if(x>=0&&x<R&&y>=0&&y<C&&!grid[x][y]&&dist[x][y]<0){dist[x][y]=dist[r][c]+1;q.push([x,y]);}}}return -1;},
 islands:({grid})=>{const R=grid.length,C=grid[0]?.length||0;const seen=new Set();let groups=0;for(let r=0;r<R;r++)for(let c=0;c<C;c++){const key=r*C+c;if(!grid[r][c]||seen.has(key))continue;groups++;seen.add(key);const q=[[r,c]];for(let h=0;h<q.length;h++){const [x,y]=q[h];for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const a=x+dx,b=y+dy,k=a*C+b;if(a>=0&&a<R&&b>=0&&b<C&&grid[a][b]&&!seen.has(k)){seen.add(k);q.push([a,b]);}}}}return groups;},
 coins:({coins,amount})=>{const dp=Array(amount+1).fill(Infinity);dp[0]=0;for(let a=1;a<=amount;a++)for(const c of coins)if(c<=a)dp[a]=Math.min(dp[a],dp[a-c]+1);return dp[amount]===Infinity?-1:dp[amount];},
 schedule:({intervals})=>{let end=-Infinity,count=0;for(const [s,e] of [...intervals].sort((a,b)=>a[1]-b[1]))if(s>=end){count++;end=e;}return count;},
 'subarray-k':({nums,k})=>{let sum=0,out=0;const m=new Map([[0,1]]);for(const v of nums){sum+=v;out+=m.get(sum-k)||0;m.set(sum,(m.get(sum)||0)+1);}return out;},
 lis:({nums})=>{const tails:number[]=[];for(const v of nums){let l=0,r=tails.length;while(l<r){const m=(l+r)>>1;if(tails[m]<v)l=m+1;else r=m;}tails[l]=v;}return tails.length;},
 dijkstra:({n,edges,start})=>{const adj:number[][][]=Array.from({length:n},()=>[]);for(const [a,b,c] of edges)adj[a].push([b,c]);const dist=Array(n).fill(Infinity),heap=new Heap();dist[start]=0;heap.push([0,start]);while(heap.a.length){const [d,u]=heap.pop();if(d!==dist[u])continue;for(const [v,w] of adj[u])if(d+w<dist[v]){dist[v]=d+w;heap.push([dist[v],v]);}}return dist.map(v=>v===Infinity?-1:v);},
 cycle:({n,edges})=>{const adj:number[][]=Array.from({length:n},()=>[]),degree=Array(n).fill(0),q:number[]=[];for(const [a,b] of edges){adj[a].push(b);degree[b]++;}for(let i=0;i<n;i++)if(!degree[i])q.push(i);for(let h=0;h<q.length;h++)for(const v of adj[q[h]])if(--degree[v]===0)q.push(v);return q.length===n;},
 knapsack:({weights,values,capacity})=>{const dp=Array(capacity+1).fill(0);for(let i=0;i<weights.length;i++)for(let c=capacity;c>=weights[i];c--)dp[c]=Math.max(dp[c],dp[c-weights[i]]+values[i]);return dp[capacity];},
 'edit-distance':({a,b})=>{let prev=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const row=[i];for(let j=1;j<=b.length;j++)row[j]=a[i-1]===b[j-1]?prev[j-1]:1+Math.min(prev[j],row[j-1],prev[j-1]);prev=row;}return prev[b.length];},
 rooms:({intervals})=>{const events:number[][]=[];for(const [s,e] of intervals)events.push([s,1],[e,-1]);events.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);let now=0,out=0;for(const [,v]of events){now+=v;out=Math.max(out,now);}return out;},
 'window-max':({nums,k})=>{if(!k)return [];const q:number[]=[],out:number[]=[];let head=0;for(let i=0;i<nums.length;i++){while(head<q.length&&q[head]<=i-k)head++;while(q.length>head&&nums[q.at(-1)!]<=nums[i])q.pop();q.push(i);if(i>=k-1)out.push(nums[q[head]]);}return out;},
 components:({n,edges})=>{const parent=Array.from({length:n},(_,i)=>i),size=Array(n).fill(1);const find=(x:number):number=>{while(x!==parent[x]){parent[x]=parent[parent[x]];x=parent[x];}return x;};let groups=n;for(const [u,v]of edges){let a=find(u),b=find(v);if(a===b)continue;if(size[a]<size[b])[a,b]=[b,a];parent[b]=a;size[a]+=size[b];groups--;}return groups;}
};
const boundaries:Record<string,Data[]>={
 maximum:[{nums:[]},{nums:[-1000000]},{nums:[-5,-8,-1]},{nums:[3,3,3]}],
 'range-sum':[{nums:[-3],queries:[[0,0],[0,0]]},{nums:[1,-1],queries:[]}],unique:[{nums:[]},{nums:[1,1,1]},{nums:[-1,0,-1]}],palindrome:[{text:''},{text:'!!!'},{text:'0A0'},{text:'ab'}],brackets:[{text:''},{text:')('},{text:'((('},{text:'{[()]}'},{text:'([)]'}],frequency:[{nums:[]},{nums:[-1,-2,-1,-2]},{nums:[0]}],merge:[{a:[],b:[]},{a:[1],b:[]},{a:[-1,2,2],b:[-1,2]}],
 'lower-bound':[{nums:[],target:1},{nums:[3,3,3],target:3},{nums:[1,2],target:7}],
 'pair-count':[{nums:[],target:0},{nums:[0,0,0,0],target:0},{nums:[-2,2,0],target:0}],
 'short-window':[{nums:[],target:1},{nums:[1,1],target:3},{nums:[8],target:8}],warmer:[{temps:[]},{temps:[3,3,3]},{temps:[5,4,3]},{temps:[-3,-2]}],
 maze:[{grid:[]},{grid:[[]]},{grid:[[1]]},{grid:[[0]]},{grid:[[0,1,0]]}],islands:[{grid:[]},{grid:[[0]]},{grid:[[1,0],[0,1]]}],coins:[{coins:[2],amount:0},{coins:[2],amount:3},{coins:[1,3,4],amount:6}],schedule:[{intervals:[]},{intervals:[[0,1],[1,2],[2,3]]},{intervals:[[-3,-1],[-2,0]]}],
 'subarray-k':[{nums:[],k:0},{nums:[0,0,0],k:0},{nums:[-1,-1,1],k:-1}],lis:[{nums:[]},{nums:[1,1,1]},{nums:[9,8,7]}],dijkstra:[{n:1,edges:[],start:0},{n:3,edges:[[0,1,0],[1,0,0]],start:0},{n:2,edges:[[0,1,5],[0,1,2]],start:0}],cycle:[{n:0,edges:[]},{n:1,edges:[[0,0]]},{n:2,edges:[[0,1],[0,1]]}],knapsack:[{weights:[],values:[],capacity:3},{weights:[2],values:[3],capacity:4},{weights:[1],values:[5],capacity:0}],
 'edit-distance':[{a:'',b:''},{a:'',b:'abc'},{a:'a',b:'a'},{a:'abc',b:'cba'}],rooms:[{intervals:[]},{intervals:[[0,1],[1,2]]},{intervals:[[1,5],[1,5],[1,5]]}],
 'window-max':[{nums:[],k:0},{nums:[2,2,2],k:2},{nums:[1,2,3],k:1},{nums:[3,2,1],k:3}],components:[{n:0,edges:[]},{n:3,edges:[]},{n:3,edges:[[0,0],[0,1],[0,1]]}]
};
export function casesFor(id:string,mode:string,seed:number):Case[]{
 const p=getProblem(id);if(!p)throw Error('unknown problem');const solve=references[id];
 const cases:Case[]=p.examples.map((e,i)=>({label:`예시 ${i+1}`,input:structuredClone(e.input),expected:e.output,kind:'예시'}));
 if(mode==='samples')return cases;
 let state=seed|0;const rnd=(n:number)=>{state^=state<<13;state^=state>>>17;state^=state<<5;return (state>>>0)%n;};
 const add=(input:Data,kind:Case['kind'],label:string)=>cases.push({input,kind,label,expected:solve(structuredClone(input))});
 boundaries[id].forEach((input,i)=>add(structuredClone(input),'경계',`경계 ${i+1}`));
 for(let i=0;i<10;i++)add(generate(id,10+rnd(25),rnd),'무작위',`무작위 ${i+1}`);
 const size=['maze','islands'].includes(id)?120:['dijkstra'].includes(id)?2000:['cycle','components'].includes(id)?10000:['coins'].includes(id)?5000:['knapsack'].includes(id)?60:['edit-distance'].includes(id)?180:50000;
 add(generate(id,size,rnd),'큰 입력','규모 검사');return cases;
}
function generate(id:string,n:number,rnd:(n:number)=>number):Data{
 const arr=(length=n)=>Array.from({length},()=>rnd(201)-100);
 const intervals=()=>Array.from({length:n},()=>{const a=rnd(n*2+1)-n;return [a,a+1+rnd(20)];});
 switch(id){
 case 'maximum':case 'unique':case 'frequency':case 'lis':return {nums:arr()};
 case 'range-sum':return {nums:arr(),queries:Array.from({length:n},()=>{const a=rnd(n),b=rnd(n);return [Math.min(a,b),Math.max(a,b)];})};
 case 'palindrome':{let text=Array.from({length:Math.ceil(n/2)},()=> 'abc12 !?'[rnd(8)]).join('');if(rnd(2))text+=[...text].reverse().join('');return {text};}
 case 'brackets':return {text:rnd(2)?'('.repeat(n)+')'.repeat(n):Array.from({length:n},()=>'()[]{}'[rnd(6)]).join('')};
 case 'merge':return {a:arr().sort((a,b)=>a-b),b:arr().sort((a,b)=>a-b)};
 case 'lower-bound':return {nums:arr().sort((a,b)=>a-b),target:rnd(301)-150};
 case 'pair-count':return {nums:arr(),target:rnd(101)-50};
 case 'short-window':return {nums:Array.from({length:n},()=>1+rnd(10)),target:1+rnd(n*10)};
 case 'warmer':return {temps:arr()};
 case 'maze':case 'islands':{const R=Math.min(120,n),C=n>=120?120:Math.max(1,Math.floor(n/2));return {grid:Array.from({length:R},()=>Array.from({length:C},()=>rnd(4)?(id==='maze'?0:1):(id==='maze'?1:0)))};}
 case 'coins':return {coins:[1,3,7,11,19],amount:n};
 case 'schedule':case 'rooms':return {intervals:intervals()};
 case 'subarray-k':return {nums:arr(),k:rnd(21)-10};
 case 'dijkstra':return {n,edges:Array.from({length:n*3},()=>[rnd(n),rnd(n),rnd(30)]),start:rnd(n)};
 case 'cycle':{const edges=Array.from({length:n*2},()=>{const a=rnd(n),b=rnd(n);return [Math.min(a,b),Math.max(a,b)];}).filter(([a,b])=>a!==b);if(rnd(2)&&n>1)edges.push([0,1],[1,0]);return {n,edges};}
 case 'knapsack':return {weights:Array.from({length:n},()=>1+rnd(30)),values:Array.from({length:n},()=>rnd(100)),capacity:n===60?1000:50};
 case 'edit-distance':return {a:Array.from({length:n},()=>'abc'[rnd(3)]).join(''),b:Array.from({length:n},()=>'abc'[rnd(3)]).join('')};
 case 'window-max':return {nums:arr(),k:1+rnd(Math.min(n,1000))};
 case 'components':return {n,edges:Array.from({length:n*3},()=>[rnd(n),rnd(n)])};
 default:throw Error('missing generator');
 }
}
