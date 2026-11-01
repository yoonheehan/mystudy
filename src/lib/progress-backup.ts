// Export and import of the study progress that each page keeps in localStorage.
// A backup is a JSON file the learner downloads and can load again in another browser or device.
export const progressKeys = ['serverNotebook.v1', 'csLabPractice.v1', 'oneStepAlgorithmV1'] as const;
export type ProgressKey = typeof progressKeys[number];
export type Backup = { app: 'cs-note'; version: 1; exportedAt: string; data: Partial<Record<ProgressKey, unknown>> };

type Store = Pick<Storage, 'getItem' | 'setItem'>;
const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

export function buildBackup(store: Store, now = new Date()): Backup {
  const data: Backup['data'] = {};
  for (const key of progressKeys) {
    const raw = store.getItem(key);
    if (!raw) continue;
    try { data[key] = JSON.parse(raw); } catch { /* an unreadable entry is left out rather than breaking the export */ }
  }
  return { app: 'cs-note', version: 1, exportedAt: now.toISOString(), data };
}

// Throws an Error with a message fit to show the learner when the file is not a backup from this site.
export function parseBackup(text: string): Backup {
  let value: unknown;
  try { value = JSON.parse(text); } catch { throw new Error('JSON 파일이 아닙니다.'); }
  if (!isRecord(value) || value.app !== 'cs-note' || !isRecord(value.data)) throw new Error('CS 노트에서 내보낸 기록 파일이 아닙니다.');
  if (value.version !== 1) throw new Error('지원하지 않는 기록 파일 버전입니다.');
  const data: Backup['data'] = {};
  for (const [key, entry] of Object.entries(value.data)) {
    if (!(progressKeys as readonly string[]).includes(key)) continue; // ignore anything this site does not own
    if (!isRecord(entry)) throw new Error(`'${key}' 기록의 형식이 올바르지 않습니다.`);
    data[key as ProgressKey] = entry;
  }
  if (!Object.keys(data).length) throw new Error('파일에 가져올 학습 기록이 없습니다.');
  return { app: 'cs-note', version: 1, exportedAt: String(value.exportedAt ?? ''), data };
}

// Replaces only the keys present in the backup; returns how many were written.
export function applyBackup(store: Store, backup: Backup): number {
  let written = 0;
  for (const key of progressKeys) {
    if (backup.data[key] === undefined) continue;
    store.setItem(key, JSON.stringify(backup.data[key]));
    written++;
  }
  return written;
}
