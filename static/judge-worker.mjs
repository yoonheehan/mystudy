// Personal practice runner. Worker termination is a timeout mechanism, not a security sandbox.
let python;
const post=self.postMessage.bind(self);
self.onmessage=async ({data})=>{
 const {code,cases}=data;let log='';
 const capture=(...args)=>{if(log.length<4000)log+=(args.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(' ')+'\n').slice(0,4000-log.length);};
 try {
  post({type:'loading'});
  const {loadPyodide}=await import('/vendor/python/pyodide.mjs');
  python=await loadPyodide({indexURL:'/vendor/python/',stdout:capture,stderr:capture});
  post({type:'ready'});
  python.globals.set('_source',code);
  python.runPython(`import json, time, tracemalloc\n_namespace = {}\nexec(_source, _namespace)\nif not callable(_namespace.get('solution')): raise ValueError('solution(data) 함수를 작성하세요.')`);
  for(let i=0;i<cases.length;i++){
   post({type:'start',index:i});log='';let result,ms,memory=null,error='';
   try{
     python.globals.set('_input_json',JSON.stringify(cases[i].input));
     const payload=python.runPython(`_data = json.loads(_input_json)\ntracemalloc.start()\n_t0 = time.perf_counter()\ntry:\n    _answer = _namespace['solution'](_data)\n    _elapsed = (time.perf_counter() - _t0) * 1000\n    _peak = tracemalloc.get_traced_memory()[1]\n    _payload = json.dumps({'result': _answer, 'ms': _elapsed, 'memory': _peak}, allow_nan=False)\nfinally:\n    tracemalloc.stop()\n_payload`);
     ({result,ms,memory}=JSON.parse(payload));
   }catch(e){error=String(e?.message||e).slice(-1800);}
   post({type:'case',index:i,result,ms:ms||0,memory,error,log});
  }
  post({type:'done'});
 }catch(e){post({type:'fatal',error:String(e?.message||e).slice(-1800)});}
};
