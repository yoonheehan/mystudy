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

// Book-style stories: every lesson opens with one, and each hands off to the next in reading order.
const {stories}=load('src/lib/lesson-story.ts');
for(const [id,story] of Object.entries(stories)){
 check(ids.has(id),`stories: '${id}' has no matching lesson`);
 check(story.parts.length>=3,`${id}: story needs at least 3 parts`);
 for(const part of story.parts){
  check(filled(part.heading)&&part.paragraphs.length>=1,`${id}: story part '${part.heading}' is empty`);
  for(const para of part.paragraphs){
   check(filled(para,40),`${id}: short paragraph in '${part.heading}'`);
   check((para.match(/\*\*/g)||[]).length%2===0,`${id}: unmatched ** in '${part.heading}'`);
  }
 }
 if(story.question!==undefined)check(filled(story.question,10)&&story.question.trim().endsWith('?'),`${id}: key question should be one question ending with ?`);
 for(const m of story.misconceptions||[])check(filled(m.belief,8)&&filled(m.truth,20),`${id}: incomplete misconception`);
 check(story.books.length>=1,`${id}: story needs at least one textbook`);
 for(const r of [...story.books,...story.papers])check(filled(r.title)&&filled(r.by)&&filled(r.note,10)&&(!r.url||isUrl(r.url)),`${id}: incomplete reading '${r.title}'`);
}
// A story that hands off to the next lesson should sit right before it in reading order.
const {chapterOrder}=load('src/lib/lesson-context.ts');
const order=chapterOrder.flatMap(c=>lessons.filter(l=>l.category===c).map(l=>l.id)); // reading order across chapters
for(const id of ids)check(stories[id],`${id}: missing story`);
for(const [id,story] of Object.entries(stories))if(story.from){const prev=order[order.indexOf(id)-1];check(stories[prev]?.to,`${id}: story starts from the previous lesson, but '${prev}' has no closing hand-off`);}

// Chapter references: "N장에서 본" only looks back, "N장에서 볼" only ahead, and "N장 X 단원" names a lesson in chapter N.
const chapterOf=id=>chapterOrder.indexOf(lessons.find(l=>l.id===id).category)+1;
const allText=(o,out=[])=>{if(typeof o==='string')out.push(o);else if(o&&typeof o==='object')Object.values(o).forEach(x=>allText(x,out));return out;};
const squash=s=>s.replace(/[\s·:,()]/g,'').toLowerCase();
for(const id of ids){
 const n=chapterOf(id);
 for(const t of allText([lessons.find(l=>l.id===id),histories[id],deeps[id],diagrams[id],stories[id]])){
  for(const m of t.matchAll(/(\d)장에서 (본|볼)/g))check(m[2]==='본'?+m[1]<=n:+m[1]>=n,`${id} (${n}장): '${m[0]}' points the wrong way`);
  for(const m of t.matchAll(/(\d)장 ((?:[^\s.,'"]+ ){1,3})단원/g)){
   const words=m[2].trim().split(' ').filter(w=>!/^(뒤의|앞의|첫|마지막)$/.test(w));
   if(!words.length)continue;
   const named=lessons.filter(l=>words.every(w=>squash(l.title+l.english+l.id).includes(squash(w))));
   check(!named.length||named.some(l=>chapterOf(l.id)===+m[1]),`${id}: '${m[0]}' but that lesson is in ${named.map(l=>chapterOf(l.id)+'장').join(', ')}`);
  }
 }
}

// Each lesson has its own credited picture, and no two lessons share a sentence of their own text.
const {lessonPictures}=load('src/lib/lesson-pictures.ts');
const {chapterPictures}=load('src/lib/archive.ts');
const credited=new Set(JSON.parse(fs.readFileSync('static/archive/credits.json','utf8')).map(c=>c.file.replace(/^static/,'')));
const pictureSrcs=Object.values(lessonPictures).map(p=>p.src);
check(new Set(pictureSrcs).size===pictureSrcs.length&&!chapterPictures.some(p=>pictureSrcs.includes(p.src)),'lesson pictures must all differ from each other and from the chapter pictures');
for(const id of ids){
 const p=lessonPictures[id];
 check(p,`${id}: missing lesson picture`);
 if(!p)continue;
 check(fs.existsSync('static'+p.src)&&credited.has(p.src),`${id}: picture file or credit missing (${p.src})`);
 check(filled(p.caption,40)&&filled(p.alt)&&filled(p.credit)&&filled(p.license),`${id}: picture needs caption, alt text, credit and licence`);
}
const ownSentences=new Map();
for(const id of ids){
 const l=lessons.find(x=>x.id===id);
 const own=allText([l,histories[id]?.timeline,histories[id]?.decisions,deeps[id]?.sections,stories[id]?.parts,stories[id]?.misconceptions]);
 for(const t of own)for(const s of t.split(/(?<=[다요])\.\s+/).map(x=>x.trim()).filter(x=>x.length>=30)){
  const seen=ownSentences.get(s);
  if(seen&&seen!==id)check(false,`${id}: repeats a sentence from '${seen}': ${s.slice(0,50)}…`);else ownSentences.set(s,id);
 }
}

// Every story opens with a key question and closes with misconceptions to correct.
for(const id of ids)if(stories[id])check(stories[id].question&&(stories[id].misconceptions||[]).length>=2,`${id}: story needs a key question and at least 2 misconceptions`);

// Key terms: bolded in their home lesson; earlier lessons that use one explain it or point ahead in the same paragraph.
const {keyTerms}=load('src/lib/key-terms.ts');
const storyParas=id=>stories[id].parts.flatMap(p=>p.paragraphs);
const pointsAhead=/단원|장에서|장의|다음|뒤에서|뒤의|앞에서|앞의/;
const escapeRe=t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
for(const [term,home] of Object.entries(keyTerms)){
 check(ids.has(home),`keyTerms: '${term}' points at unknown lesson '${home}'`);
 if(!ids.has(home))continue;
 const used=new RegExp('(^|[^가-힣])'+escapeRe(term)),bolded=new RegExp('\\*\\*[^*]*'+escapeRe(term)+'[^*]*\\*\\*');
 check(storyParas(home).some(p=>bolded.test(p)),`keyTerms: '${term}' is not bolded in its home lesson '${home}'`);
 for(const id of order.slice(0,order.indexOf(home)))for(const p of storyParas(id))
  check(!used.test(p)||bolded.test(p)||pointsAhead.test(p),`keyTerms: '${term}' is used in '${id}' before '${home}' explains it: ${p.slice(0,50)}…`);
}

// Chapter openers line up with chapters and are complete when written.
const {chapterIntros,chapterNames}=load('src/lib/lesson-context.ts');
check(chapterIntros.length===chapterNames.length,'chapterIntros must have one slot per chapter');
for(const intro of chapterIntros.filter(Boolean))check(filled(intro.title)&&intro.paragraphs.length>=2&&intro.paragraphs.every(p=>filled(p,40)),`chapter intro '${intro.title}' is incomplete`);

// Progress backup: a round trip keeps every page's record, and foreign or broken files are refused.
const {techMap}=load('src/lib/tech-map.ts');
for(const layer of techMap)for(const tool of layer.tools){
 check(ids.has(tool.lesson),'techMap: '+tool.name+' points at unknown lesson '+tool.lesson);
 check(tool.born&&tool.role&&tool.notFor,'techMap: '+tool.name+' needs born, role and notFor');
}

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
console.log(`${lessons.length} lessons: history, deep notes and ${withDiagram} diagrams valid; ${pageTitles.length} algorithm notes, ${Object.keys(stories).length} stories, practice links and progress backup valid.`);
