import { mkdir, copyFile } from 'node:fs/promises';
const destination=new URL('../static/vendor/python/',import.meta.url);
await mkdir(destination,{recursive:true});
for(const name of ['pyodide.mjs','pyodide.asm.mjs','pyodide.asm.wasm','python_stdlib.zip','pyodide-lock.json']) {
 await copyFile(new URL('../node_modules/pyodide/'+name,import.meta.url),new URL(name,destination));
}
console.log('Local Python runtime ready.');
