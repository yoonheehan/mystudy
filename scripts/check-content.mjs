// Checks the supplementary lesson content: history, deep notes, step diagrams, and the algorithm page's notes.
// Runs offline. Use scripts/check-links.mjs to check that source URLs still open.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
const cache=new Map();
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file);const module={exports:{}};cache.set(file,module.exports);const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;new Function('require','exports','module',source)(name=>load(path.resolve(path.dirname(file),name+'.ts')),module.exports,module);return module.exports;}

const {lessons}=load('src/lib/lessons.ts');
const {histories}=load('src/lib/lesson-history.ts');
const {deeps}=load('src/lib/lesson-deep.ts');
const {diagrams}=load('src/lib/cs-diagrams.ts');
const {problems}=load('src/lib/practice/problems.ts');
const {algorithmLessons}=load('src/lib/algorithm-meta.ts');

// The process lesson keeps its hand-built ConceptAnimation instead of a data diagram.
const animationOnly=new Set(['process']);
const ids=new Set(lessons.map(l=>l.id));
const errors=[];
const check=(ok,message)=>{if(!ok)errors.push(message);};
// A few older sources (e.g. kegel.com) only serve plain HTTP, so http is allowed alongside https.
const isUrl=u=>{try{return ['https:','http:'].includes(new URL(u).protocol);}catch{return false;}};
const filled=(s,min=1)=>typeof s==='string'&&s.trim().length>=min;

for(const [name,record] of Object.entries({histories,deeps,diagrams}))
 for(const id of Object.keys(record))check(ids.has(id),`${name}: '${id}' has no matching lesson`);

for(const {id} of lessons){
 const h=histories[id];
 if(!h){check(false,`${id}: missing history`);}
 else{
  check(filled(h.intro,80),`${id}: history intro too short`);
  check(h.timeline.length>=3,`${id}: history needs at least 3 timeline events`);
  for(const e of h.timeline)check(filled(e.year)&&filled(e.title)&&filled(e.body,40),`${id}: incomplete timeline event '${e.title}'`);
  check(h.decisions.length>=2,`${id}: history needs at least 2 design decisions`);
  for(const d of h.decisions)check(filled(d.question)&&filled(d.answer,40)&&filled(d.cost,20),`${id}: incomplete decision '${d.question}'`);
  check(h.today.length>=2,`${id}: history needs at least 2 present-day notes`);
  check(h.sources.length>=2,`${id}: history needs at least 2 sources`);
  for(const [label,url] of h.sources)check(filled(label)&&isUrl(url),`${id}: bad history source '${label}' ${url}`);
 }
 const d=deeps[id];
 if(!d){check(false,`${id}: missing deep notes`);}
 else{
  check(filled(d.definition,80),`${id}: deep definition too short`);
  check(d.terms.length>=4,`${id}: deep notes need at least 4 terms`);
  for(const [term,meaning] of d.terms)check(filled(term)&&filled(meaning,10),`${id}: incomplete term '${term}'`);
  check(d.sections.length>=3,`${id}: deep notes need at least 3 sections`);
  for(const s of d.sections)check(filled(s.title)&&(s.list?filled(s.body,8)&&s.list.length>=2&&s.list.every(x=>filled(x,4)):filled(s.body,40)),`${id}: incomplete section '${s.title}'`);
  check(d.sources.length>=2,`${id}: deep notes need at least 2 sources`);
  for(const [label,url] of d.sources)check(filled(label)&&isUrl(url),`${id}: bad deep source '${label}' ${url}`);
 }
 const g=diagrams[id];
 if(!g){check(animationOnly.has(id),`${id}: missing diagram`);continue;}
 check(filled(g.title)&&g.steps.length>=3,`${id}: diagram needs a title and at least 3 steps`);
 g.steps.forEach((s,i)=>{
  const at=`${id}: diagram step ${i+1}`;
  check(filled(s.caption,10),`${at} caption too short`);
  if(g.kind==='sequence'){check(s.from>=0&&s.from<g.lanes.length&&s.to>=0&&s.to<g.lanes.length,`${at} lane out of range`);check(filled(s.label),`${at} empty label`);}
  else if(g.kind==='timeline'){check(s.lane>=0&&s.lane<g.lanes.length,`${at} lane out of range`);check(filled(s.text),`${at} empty text`);}
  else if(g.kind==='table'){for(const r of s.rows)check(r.length===g.columns.length,`${at} row has ${r.length} cells, expected ${g.columns.length}`);for(const k of s.highlight||[])check(k>=0&&k<s.rows.length,`${at} highlight out of range`);}
  else if(g.kind==='flow'){check(s.active>=0&&s.active<g.nodes.length,`${at} active node out of range`);for(const k of Object.keys(s.status))check(+k>=0&&+k<g.nodes.length,`${at} status node out of range`);}
  else check(false,`${id}: unknown diagram kind '${g.kind}'`);
 });
}

// Algorithm page notes live in a browser script; evaluate it in a sandbox with a stand-in window.
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync('static/algorithm-deep.js','utf8'),sandbox);
const {algorithmDeep,practiceTitles}=sandbox.window;
const page=fs.readFileSync('static/algorithm.html','utf8');
const pageTitles=[...page.matchAll(/\{title:'([^']+)',sub:/g)].map(m=>m[1]);
check(pageTitles.length===algorithmLessons.length,`algorithm.html has ${pageTitles.length} lessons, algorithm-meta.ts has ${algorithmLessons.length}`);
algorithmLessons.forEach((l,i)=>check(pageTitles[i]===l.title,`algorithm lesson ${i+1}: '${pageTitles[i]}' in algorithm.html vs '${l.title}' in algorithm-meta.ts`));
for(const title of pageTitles){
 const a=algorithmDeep[title];
 if(!a){check(false,`algorithm '${title}': missing deep notes`);continue;}
 check(filled(a.why,60)&&filled(a.cost,40),`algorithm '${title}': why/cost too short`);
 check(a.history.length>=1&&a.history.every(x=>filled(x.year)&&filled(x.text,30)&&(!x.source||isUrl(x.source.url))),`algorithm '${title}': bad history entry`);
 check(a.use.length>=2,`algorithm '${title}': needs at least 2 usage notes`);
 check(a.problems.length>=1,`algorithm '${title}': needs at least 1 related problem`);
 for(const p of a.problems)check(practiceTitles[p],`algorithm '${title}': unknown practice problem '${p}'`);
}
for(const t of Object.keys(algorithmDeep))check(pageTitles.includes(t),`algorithm-deep.js: '${t}' is not a lesson on the page`);
// The copied practice titles must stay in step with problems.ts.
check(Object.keys(practiceTitles).length===problems.length,'algorithm-deep.js: practiceTitles count differs from problems.ts');
for(const p of problems){
 const copy=practiceTitles[p.id];
 check(copy&&copy[0]===p.title&&copy[1]===p.level,`algorithm-deep.js: practiceTitles['${p.id}'] is out of date (expected ${p.title} · ${p.level})`);
 if(p.theory)check(pageTitles.some(t=>t===p.theory||t.startsWith(p.theory+' ·')),`practice '${p.id}': theory link '${p.theory}' matches no algorithm lesson`);
}

// Progress backup: a round trip keeps every page's record, and foreign or broken files are refused.
const {buildBackup,parseBackup,applyBackup,progressKeys}=load('src/lib/progress-backup.ts');
const memory=entries=>{const m=new Map(Object.entries(entries));return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),map:m};};
const source=memory({'serverNotebook.v1':'{"completed":["dns"],"lastLesson":"dns"}','csLabPractice.v1':'{"records":{"maximum":{"accepted":true}}}','oneStepAlgorithmV1':'{"completed":[0,3]}','unrelated':'x'});
const backup=buildBackup(source,new Date('2026-01-02T03:04:05Z'));
assert.deepEqual(Object.keys(backup.data).sort(),[...progressKeys].sort());
const target=memory({'serverNotebook.v1':'{"completed":[]}'});
assert.equal(applyBackup(target,parseBackup(JSON.stringify(backup))),3);
for(const key of progressKeys)assert.deepEqual(JSON.parse(target.map.get(key)),JSON.parse(source.getItem(key)),key+' restored');
assert.ok(!target.map.has('unrelated'));
for(const bad of ['not json','{"app":"other","version":1,"data":{}}','{"app":"cs-note","version":2,"data":{"csLabPractice.v1":{}}}','{"app":"cs-note","version":1,"data":{"csLabPractice.v1":[1]}}','{"app":"cs-note","version":1,"data":{"unrelated":{}}}'])
 assert.throws(()=>parseBackup(bad),Error,'should refuse '+bad);

if(errors.length){console.error(errors.map(e=>'✗ '+e).join('\n'));console.error(`\n${errors.length} content problem(s).`);process.exit(1);}
const withDiagram=lessons.filter(l=>diagrams[l.id]).length;
console.log(`${lessons.length} lessons: history, deep notes and ${withDiagram} diagrams valid; ${pageTitles.length} algorithm notes, practice links and progress backup valid.`);
