import test from 'node:test';
import assert from 'node:assert/strict';
import { filterEntries } from '../src/lib/search.ts';
const entries = [
  { id: 'older', text: 'Statistics introduction', kind: 'articles', date: '2024-01-10' },
  { id: 'start', text: 'Statistics and probability', kind: 'articles', date: '2025-01-10' },
  { id: 'end', text: 'STATISTICS in practice', kind: 'articles', date: '2025-01-31' },
  { id: 'book', text: 'Statistics reading', kind: 'books', date: '2025-02-01' },
  { id: 'signal', text: 'Attention', kind: 'signals', date: '2026-01-10' },
];
const defaults = { query: '', kind: 'all', mode: 'calendar', year: '', month: '', start: '', end: '' };
const ids = (overrides = {}) => filterEntries(entries,{...defaults,...overrides}).map(e => e.id);
test('empty query returns all entries newest first without mutating input',() => { assert.deepEqual(ids(),['signal','book','end','start','older']); assert.equal(entries[0].id,'older'); });
test('case insensitive keyword and multiple words',() => assert.deepEqual(ids({query:'sTaTiStIcS PRACTICE'}),['end']));
test('content types independently',() => { assert.deepEqual(ids({kind:'books'}),['book']); assert.deepEqual(ids({kind:'signals'}),['signal']); assert.equal(ids({kind:'articles'}).length,3); });
test('year independently',() => assert.deepEqual(ids({year:'2025'}),['book','end','start']));
test('month across years',() => assert.deepEqual(ids({month:'01'}),['signal','end','start','older']));
test('year and month together',() => assert.deepEqual(ids({year:'2025',month:'01'}),['end','start']));
test('keyword, type, year and month combine',() => assert.deepEqual(ids({query:'statistics',kind:'articles',year:'2025',month:'01'}),['end','start']));
test('inclusive range includes both endpoints, excluding adjacent dates',() => assert.deepEqual(ids({mode:'range',start:'2025-01-10',end:'2025-01-31'}),['end','start']));
test('same-day range includes that day',() => assert.deepEqual(ids({mode:'range',start:'2025-02-01',end:'2025-02-01'}),['book']));
test('range combines with keyword and type, ignoring calendar values',() => assert.deepEqual(ids({query:'statistics',kind:'books',mode:'range',start:'2025-01-31',end:'2025-02-01',year:'2024',month:'12'}),['book']));
test('calendar mode ignores range values',() => assert.deepEqual(ids({year:'2025',month:'02',start:'2024-01-01',end:'2024-01-02'}),['book']));
test('one-sided ranges',() => { assert.deepEqual(ids({mode:'range',start:'2025-02-01'}),['signal','book']); assert.deepEqual(ids({mode:'range',end:'2024-01-10'}),['older']); });
test('no matches and reversed ranges',() => { assert.deepEqual(ids({query:'missing'}),[]); assert.deepEqual(ids({mode:'range',start:'2025-02-02',end:'2025-01-01'}),[]); });
test('cleared values restore all results',() => assert.equal(ids({...defaults}).length,entries.length));

