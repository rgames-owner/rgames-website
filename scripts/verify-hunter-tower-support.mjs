import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const routePath = 'app/games/[slug]/support/page.tsx';
assert.ok(existsSync(routePath), `${routePath} must exist`);

const read = (path) => readFileSync(path, 'utf8');
const route = read(routePath);
const component = read('components/GameSupportPage.tsx');
const support = read('lib/games/hunter-tower/support.ts');
const game = read('lib/games/hunter-tower/index.ts');
const home = read('components/Home.tsx');
const i18n = read('lib/i18n.ts');
const css = read('app/globals.css');

assert.match(route, /GameSupportPage/);
assert.match(route, /generateStaticParams/);
assert.match(component, /mailto:\$\{CONTACT\.csEmail\}/);
assert.match(component, /games\/\$\{game\.slug\}\/privacy/);
assert.match(component, /games\/\$\{game\.slug\}\/terms/);
assert.match(support, /Hunter Tower 고객지원/);
assert.match(support, /Hunter Tower Support/);
assert.match(support, /Player ID/);
assert.match(support, /passwords or full payment-card details/i);
assert.match(game, /support: hunterTowerSupport/);
assert.match(home, /games\/\$\{ht\.slug\}\/support/);
assert.match(home, /t\.footSupport/);
assert.match(i18n, /footSupport: '고객지원'/);
assert.match(i18n, /footSupport: 'Support'/);

const declaredCssTokens = new Set(
  [...css.matchAll(/--([a-zA-Z0-9-]+)\s*:/g)].map((match) => match[1]),
);
const externallyProvidedCssTokens = new Set(['font-jua', 'font-noto']);
const usedCssTokens = new Set(
  [...css.matchAll(/var\(--([a-zA-Z0-9-]+)/g)].map((match) => match[1]),
);
const undefinedCssTokens = [...usedCssTokens]
  .filter((token) => !declaredCssTokens.has(token) && !externallyProvidedCssTokens.has(token))
  .sort();
assert.deepEqual(
  undefinedCssTokens,
  [],
  `undefined CSS custom properties: ${undefinedCssTokens.join(', ')}`,
);

console.log('Hunter Tower support verification passed.');
