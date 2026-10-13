import { json } from '@sveltejs/kit';
export function GET() { return json({ status: 'ok', service: 'server-notebook' }, { headers: { 'cache-control': 'no-store' } }); }
