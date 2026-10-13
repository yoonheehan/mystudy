import { json, error } from '@sveltejs/kit';
import { getProblem } from '$lib/practice/problems';
import { casesFor } from '$lib/server/practice-cases';
export function GET({params,url}) {
 if(!getProblem(params.id))error(404,'문제를 찾을 수 없습니다.');
 const mode=url.searchParams.get('mode')||'samples';
 if(!['samples','submit'].includes(mode))error(400,'올바른 실행 모드를 선택하세요.');
 const seed=(crypto.getRandomValues(new Uint32Array(1))[0] & 0x7fffffff)||1;
 return json({seed,cases:casesFor(params.id,mode,seed)},{headers:{'Cache-Control':'no-store'}});
}
