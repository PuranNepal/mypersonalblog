export interface SearchItem { text: string; kind: string; date: string }
export interface SearchFilters { query: string; kind: string; mode: string; year: string; month: string; start: string; end: string }
// ISO calendar dates avoid timezone shifts and include both range endpoints.
export function filterEntries<T extends SearchItem>(entries: T[], f: SearchFilters): T[] {
  const words = f.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return entries.filter(e => {
    if (!words.every(w => e.text.toLowerCase().includes(w))) return false;
    if (f.kind !== 'all' && e.kind !== f.kind) return false;
    if (f.mode === 'range') return (!f.start || e.date >= f.start) && (!f.end || e.date <= f.end);
    return (!f.year || e.date.slice(0,4) === f.year) && (!f.month || e.date.slice(5,7) === f.month);
  }).sort((a,b) => b.date.localeCompare(a.date));
}
