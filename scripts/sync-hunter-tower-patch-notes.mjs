#!/usr/bin/env node
/**
 * Sync Hunter Tower in-game patch notes into this website.
 *
 * Sources (override with env vars):
 *   HT_UI_CSV          — Localization UI.csv
 *   HT_PATCH_NOTE_TABLE — PatchNoteTable.asset
 *
 * Output:
 *   lib/games/hunter-tower/patch-notes.generated.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const defaultCsv = path.resolve(
  root,
  '../Hunter_Tower/Assets/Project/Localization/Tables/UI.csv',
);
const defaultTable = path.resolve(
  root,
  '../Hunter_Tower/Assets/Project/ScriptableObjects/Data/PatchNoteTable.asset',
);

const csvPath = process.env.HT_UI_CSV || defaultCsv;
const tablePath = process.env.HT_PATCH_NOTE_TABLE || defaultTable;
const outPath = path.join(root, 'lib/games/hunter-tower/patch-notes.generated.ts');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let i = 0;
  let inQuotes = false;

  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      cell += ch;
      i += 1;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (ch === ',') {
      row.push(cell);
      cell = '';
      i += 1;
      continue;
    }
    if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
      if (ch === '\r') i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      i += 1;
      continue;
    }
    if (ch === '\r') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      i += 1;
      continue;
    }
    cell += ch;
    i += 1;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function unescapeBody(s) {
  return String(s ?? '')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .trim();
}

function parsePatchNoteTable(yaml) {
  const entries = [];
  const re = /-\s+version:\s*([^\n]+)\n\s+bodyKey:\s*([^\n]+)/g;
  let m;
  while ((m = re.exec(yaml)) !== null) {
    entries.push({
      version: m[1].trim(),
      bodyKey: m[2].trim(),
    });
  }
  if (!entries.length) {
    throw new Error(`No entries found in PatchNoteTable: ${tablePath}`);
  }
  return entries;
}

function loadCsvMap(csvText) {
  const rows = parseCsv(csvText);
  if (!rows.length) throw new Error('UI.csv is empty');

  const header = rows[0].map((h) => h.trim());
  const keyIdx = header.indexOf('key');
  const koIdx = header.indexOf('ko');
  const enIdx = header.indexOf('en');
  if (keyIdx < 0 || koIdx < 0 || enIdx < 0) {
    throw new Error('UI.csv must have key, ko, en columns');
  }

  /** @type {Map<string, { ko: string, en: string }>} */
  const map = new Map();
  for (let r = 1; r < rows.length; r += 1) {
    const cols = rows[r];
    if (!cols.length) continue;
    const key = (cols[keyIdx] || '').trim();
    if (!key || key.startsWith('#')) continue;
    map.set(key, {
      ko: unescapeBody(cols[koIdx]),
      en: unescapeBody(cols[enIdx]),
    });
  }
  return map;
}

function jsString(s) {
  return JSON.stringify(s);
}

function main() {
  if (!fs.existsSync(csvPath)) {
    console.error(`UI.csv not found: ${csvPath}`);
    console.error('Set HT_UI_CSV to the Hunter Tower Localization UI.csv path.');
    process.exit(1);
  }
  if (!fs.existsSync(tablePath)) {
    console.error(`PatchNoteTable not found: ${tablePath}`);
    console.error('Set HT_PATCH_NOTE_TABLE to the PatchNoteTable.asset path.');
    process.exit(1);
  }

  const csvMap = loadCsvMap(fs.readFileSync(csvPath, 'utf8'));
  const tableEntries = parsePatchNoteTable(fs.readFileSync(tablePath, 'utf8'));

  const title = csvMap.get('ui.patchnote.title') || {
    ko: '업데이트 내역',
    en: 'Update History',
  };

  const entries = tableEntries.map(({ version, bodyKey }) => {
    const body = csvMap.get(bodyKey);
    if (!body) {
      throw new Error(`Missing localization key: ${bodyKey}`);
    }
    return { version, body };
  });

  const generatedAt = new Date().toISOString();
  const lines = [
    '/* AUTO-GENERATED — do not edit by hand.',
    ` * Run: npm run sync:patch-notes`,
    ` * Generated: ${generatedAt}`,
    ` * Sources:`,
    ` *   ${path.relative(root, csvPath)}`,
    ` *   ${path.relative(root, tablePath)}`,
    ' */',
    `import type { GamePatchNotes } from '@/lib/games/types';`,
    '',
    `export const hunterTowerPatchNotes: GamePatchNotes = {`,
    `  title: { ko: ${jsString(title.ko)}, en: ${jsString(title.en)} },`,
    `  entries: [`,
  ];

  for (const e of entries) {
    lines.push(`    {`);
    lines.push(`      version: ${jsString(e.version)},`);
    lines.push(`      body: {`);
    lines.push(`        ko: ${jsString(e.body.ko)},`);
    lines.push(`        en: ${jsString(e.body.en)},`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  lines.push(`  ],`);
  lines.push(`};`);
  lines.push('');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(
    `Wrote ${path.relative(root, outPath)} (${entries.length} versions: ${entries
      .map((e) => e.version)
      .join(', ')})`,
  );
}

main();
