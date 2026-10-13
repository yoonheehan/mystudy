import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {spawnSync} from 'node:child_process';
const cache=new Map();
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file);const module={exports:{}};cache.set(file,module.exports);const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;new Function('require','exports','module',source)(name=>load(path.resolve(path.dirname(file),name+'.ts')),module.exports,module);return module.exports;}
const {lessons,sources}=load('src/lib/lessons.ts');
const {contexts,chapterOrder}=load('src/lib/lesson-context.ts');
const {deepening}=load('src/lib/practical-deepening.ts');
const {backtonyDeepening}=load('src/lib/backtony-deepening.ts');
const {csScenes}=load('src/lib/cs-scenes.ts');
assert.equal(Object.keys(csScenes).length,lessons.length);
for(const lesson of lessons){
 const scene=csScenes[lesson.id];assert.ok(scene,lesson.id+' visualization');
 assert.ok(scene.frames.length>=3,lesson.id+' animation steps');
 for(const frame of scene.frames){
  assert.equal(frame.values.length,scene.nodes.length,lesson.id+' diagram state');
  assert.ok(frame.active.every(index=>index>=0&&index<scene.nodes.length),lesson.id+' highlights');
  assert.ok(frame.caption.length>10,lesson.id+' step explanation');
 }
}
assert.ok(Object.keys(backtonyDeepening).every(id=>!deepening[id]),'duplicate supplementary topic');
assert.equal(lessons.length,32);
assert.equal(Object.keys(contexts).length,32);
const examples=[];
for(const lesson of lessons){
 const context=contexts[lesson.id];assert.ok(context,lesson.id);
 for(const key of ['why','background','before','after'])assert.ok(context[key]?.length>30,lesson.id+' '+key);
 assert.ok(context.roles.length>=3,lesson.id+' roles');
 const python=context.python||(lesson.language.startsWith('Python')?lesson.code:'');
 assert.ok(python.trim(),lesson.id+' missing Python example');
 examples.push({id:lesson.id,code:python});
 assert.ok(lesson.refs.every(ref=>sources[ref]),lesson.id+' source');
 assert.ok(chapterOrder.includes(lesson.category),lesson.id+' chapter');
}
const result=spawnSync('python',['-c','import json,ast,sys\nfor example in json.loads(sys.stdin.buffer.read().decode("utf-8")): ast.parse(example["code"], filename=example["id"])\nprint("32 lessons: context, roles, Python syntax and source coverage passed.")'],{input:JSON.stringify(examples),encoding:'utf8'});
assert.equal(result.status,0,result.stderr);console.log(result.stdout.trim());
for(const [id,extra] of Object.entries({...deepening,...backtonyDeepening})){
 assert.ok(lessons.some(lesson=>lesson.id===id),'unknown supplement '+id);
 assert.ok(extra.steps.length>=3 && extra.refs.length && extra.question && extra.mistake,id);
 const run=spawnSync('python',['-X','utf8','-c',extra.code],{encoding:'utf8',timeout:10000});
 assert.equal(run.status,0,id+' supplementary example: '+run.stderr);
 console.log(id+': supplementary Python example executed with assertions passed.');
}
fs.writeFileSync('artifacts/process_demo.py',contexts.process.python);

