import { getCollection, type CollectionEntry } from 'astro:content';
export type Entry = CollectionEntry<'entries'>;
export async function allEntries() {
  return (await getCollection('entries', ({ data }) => !data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export const entryUrl = (entry: Entry) => `/${entry.data.kind}/${entry.id}/`;
export const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
export const labels = { articles: 'Article', signals: 'Signal', books: 'Book note' };
