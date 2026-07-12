# Per-Game Privacy & Terms Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Commits:** Do **not** create git commits unless the user explicitly asks. Skip all commit steps by default.

**Goal:** Add extensible `/games/[slug]/privacy` and `/games/[slug]/terms` pages with Hunter Tower content from Notion, plus bottom-right policy links on the game card.

**Architecture:** A game registry (`lib/games.ts`) maps slugs to bilingual policy data. Dynamic App Router pages look up the game and render via `GamePolicyPage`. Home links into those routes. Company `/privacy` and `/terms` stay untouched.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, existing `LangProvider` / CSS (no new npm deps).

**Spec:** `docs/superpowers/specs/2026-07-12-per-game-policies-design.md`

**Notion sources (fetch at content-import time):**
- Terms: `https://app.notion.com/p/rgames-team/Hunter-Tower-Terms-of-Service-3a6e93c864014937becd719fbe42cbea`
- Privacy: `https://app.notion.com/p/rgames-team/Hunter-Tower-Privacy-Policy-bfd849b1c4c2414e9f448f72ee971488`

---

## File map

| Path | Responsibility |
| --- | --- |
| `lib/games/types.ts` | `GameSlug`, `PolicyBlock`, `GamePolicy`, `Game` types |
| `lib/games/hunter-tower/privacy-en.ts` | EN privacy `GamePolicy` |
| `lib/games/hunter-tower/privacy-ko.ts` | KO privacy `GamePolicy` |
| `lib/games/hunter-tower/terms-en.ts` | EN terms `GamePolicy` |
| `lib/games/hunter-tower/terms-ko.ts` | KO terms `GamePolicy` |
| `lib/games/hunter-tower/index.ts` | Assemble Hunter Tower `Game` object |
| `lib/games.ts` | Registry + `getGame(slug)` + `getAllGameSlugs()` |
| `components/GamePolicyPage.tsx` | Client renderer for game policies (lang-aware) |
| `components/PolicyBlocks.tsx` | Renders `PolicyBlock[]` (p, list, table, links) |
| `app/games/[slug]/privacy/page.tsx` | Privacy route |
| `app/games/[slug]/terms/page.tsx` | Terms route |
| `components/Home.tsx` | Game-card policy links |
| `app/globals.css` | `.game-policy-links` + policy table/list styles |
| `lib/i18n.ts` | Optional: only if new label keys needed (prefer reuse `footPrivacy` / `footTerms`) |

**Do not modify:** `app/privacy/page.tsx`, `app/terms/page.tsx`, `components/PolicyPage.tsx`, `components/Footer.tsx` (company policies remain).

---

### Task 1: Policy content types

**Files:**
- Create: `lib/games/types.ts`

- [ ] **Step 1: Create types**

```ts
import type { Lang } from '@/lib/i18n';

export type GameSlug = 'hunter-tower';

export type InlineSpan =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'code'; text: string };

export type PolicyBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; spans: InlineSpan[] }
  | { type: 'ul'; items: InlineSpan[][] }
  | { type: 'ol'; items: InlineSpan[][] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'note'; spans: InlineSpan[] };

export interface GamePolicy {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  introNote?: InlineSpan[];
  blocks: PolicyBlock[];
}

export interface Game {
  slug: GameSlug;
  title: string;
  privacy: Record<Lang, GamePolicy>;
  terms: Record<Lang, GamePolicy>;
}
```

Helper for plain paragraphs (use in content files):

```ts
export function p(text: string): PolicyBlock {
  return { type: 'p', spans: [{ type: 'text', text }] };
}

export function h2(text: string): PolicyBlock {
  return { type: 'h2', text };
}

export function h3(text: string): PolicyBlock {
  return { type: 'h3', text };
}
```

Put helpers in the same `types.ts` file.

- [ ] **Step 2: Verify TypeScript sees the module**

Run: `npx tsc --noEmit`
Expected: exit 0 (or only pre-existing errors unrelated to this file).

---

### Task 2: Policy block renderer + GamePolicyPage

**Files:**
- Create: `components/PolicyBlocks.tsx`
- Create: `components/GamePolicyPage.tsx`
- Modify: `app/globals.css` (append styles at end of policy section)

- [ ] **Step 1: Create `PolicyBlocks.tsx`**

```tsx
import type { InlineSpan, PolicyBlock } from '@/lib/games/types';

function Spans({ spans }: { spans: InlineSpan[] }) {
  return (
    <>
      {spans.map((s, i) => {
        if (s.type === 'text') return <span key={i}>{s.text}</span>;
        if (s.type === 'bold') return <strong key={i}>{s.text}</strong>;
        if (s.type === 'code') return <code key={i}>{s.text}</code>;
        return (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.text}
          </a>
        );
      })}
    </>
  );
}

export default function PolicyBlocks({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <div className="policy-body">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 className="policy-h2" key={i}>
                {b.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 className="policy-h3" key={i}>
                {b.text}
              </h3>
            );
          case 'p':
            return (
              <p className="policy-p" key={i}>
                <Spans spans={b.spans} />
              </p>
            );
          case 'note':
            return (
              <p className="policy-note" key={i}>
                <Spans spans={b.spans} />
              </p>
            );
          case 'ul':
            return (
              <ul className="policy-list" key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Spans spans={item} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol className="policy-list" key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Spans spans={item} />
                  </li>
                ))}
              </ol>
            );
          case 'table':
            return (
              <div className="policy-table-wrap" key={i}>
                <table className="policy-table">
                  <thead>
                    <tr>
                      {b.headers.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
```

- [ ] **Step 2: Create `GamePolicyPage.tsx`**

```tsx
'use client';

import { useLang } from './LangProvider';
import type { Game } from '@/lib/games/types';
import PolicyBlocks from './PolicyBlocks';

export default function GamePolicyPage({
  game,
  kind,
}: {
  game: Game;
  kind: 'privacy' | 'terms';
}) {
  const { lang, t } = useLang();
  const policy = kind === 'privacy' ? game.privacy[lang] : game.terms[lang];

  return (
    <div className="policy">
      <p className="policy-game-label">{game.title}</p>
      <h1>{policy.title}</h1>
      <p className="policy-date">
        {t.effectiveDate}: {policy.effectiveDate}
        <br />
        {lang === 'ko' ? '최종 수정일' : 'Last updated'}: {policy.lastUpdated}
      </p>
      {policy.introNote ? (
        <p className="policy-note">
          {/* reuse Spans via a tiny export or inline note block */}
        </p>
      ) : null}
      <PolicyBlocks
        blocks={[
          ...(policy.introNote
            ? [{ type: 'note' as const, spans: policy.introNote }]
            : []),
          ...policy.blocks,
        ]}
      />
    </div>
  );
}
```

Simplify: do **not** duplicate intro rendering. Prefer:

```tsx
'use client';

import { useLang } from './LangProvider';
import type { Game } from '@/lib/games/types';
import PolicyBlocks from './PolicyBlocks';

export default function GamePolicyPage({
  game,
  kind,
}: {
  game: Game;
  kind: 'privacy' | 'terms';
}) {
  const { lang, t } = useLang();
  const policy = kind === 'privacy' ? game.privacy[lang] : game.terms[lang];
  const blocks = [
    ...(policy.introNote ? [{ type: 'note' as const, spans: policy.introNote }] : []),
    ...policy.blocks,
  ];

  return (
    <div className="policy">
      <p className="policy-game-label">{game.title}</p>
      <h1>{policy.title}</h1>
      <p className="policy-date">
        {t.effectiveDate}: {policy.effectiveDate}
        {' · '}
        {lang === 'ko' ? '최종 수정일' : 'Last updated'}: {policy.lastUpdated}
      </p>
      <PolicyBlocks blocks={blocks} />
    </div>
  );
}
```

- [ ] **Step 3: Append CSS** (after existing `.policy-section p` rules in `app/globals.css`)

```css
.policy-game-label {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--gold);
  text-transform: uppercase;
}

.policy-h2 {
  margin: 28px 0 10px;
  font-size: 21px;
}

.policy-h3 {
  margin: 20px 0 8px;
  font-size: 17px;
}

.policy-p,
.policy-note,
.policy-list {
  margin: 0 0 12px;
  font-size: 15px;
  line-height: 1.8;
  text-wrap: pretty;
}

.policy-note {
  padding: 12px 14px;
  background: color-mix(in srgb, var(--yellow) 22%, transparent);
  border-left: 3px solid var(--ink);
}

.policy-list {
  padding-left: 1.25rem;
}

.policy-list li {
  margin-bottom: 6px;
}

.policy-table-wrap {
  overflow-x: auto;
  margin: 0 0 16px;
}

.policy-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  line-height: 1.5;
}

.policy-table th,
.policy-table td {
  border: 1px solid color-mix(in srgb, var(--ink) 18%, transparent);
  padding: 8px 10px;
  text-align: left;
  vertical-align: top;
}

.policy-table th {
  background: color-mix(in srgb, var(--ink) 6%, transparent);
  font-weight: 700;
}

.game-policy-links {
  margin-top: 4px;
  align-self: flex-end;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.game-policy-links a {
  font-size: 13px;
  font-weight: 700;
  color: var(--gold);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.game-policy-links a:hover {
  color: var(--ink);
}
```

---

### Task 3: Game registry (stub content first)

**Files:**
- Create: `lib/games/hunter-tower/privacy-en.ts` (minimal stub)
- Create: `lib/games/hunter-tower/privacy-ko.ts` (minimal stub)
- Create: `lib/games/hunter-tower/terms-en.ts` (minimal stub)
- Create: `lib/games/hunter-tower/terms-ko.ts` (minimal stub)
- Create: `lib/games/hunter-tower/index.ts`
- Create: `lib/games.ts`

- [ ] **Step 1: Create minimal stubs** so routes compile before full Notion import.

`lib/games/hunter-tower/privacy-en.ts`:

```ts
import type { GamePolicy } from '@/lib/games/types';
import { h2, p } from '@/lib/games/types';

export const hunterTowerPrivacyEn: GamePolicy = {
  title: 'Hunter Tower Privacy Policy',
  effectiveDate: '2026-05-06',
  lastUpdated: '2026-07-09',
  introNote: [
    {
      type: 'text',
      text: 'This Privacy Policy applies to all distribution channels including Google Play, the Apple App Store, and ONE store.',
    },
  ],
  blocks: [h2('1. Introduction'), p('Content pending full import.')],
};
```

Mirror for `privacy-ko.ts`, `terms-en.ts`, `terms-ko.ts` with matching titles:
- EN terms title: `Hunter Tower Terms of Service`
- KO privacy title: `Hunter Tower 개인정보처리방침`
- KO terms title: `Hunter Tower 이용약관`
- KO intro notes from Notion Korean callout lines.

- [ ] **Step 2: Assemble game + registry**

`lib/games/hunter-tower/index.ts`:

```ts
import type { Game } from '@/lib/games/types';
import { hunterTowerPrivacyEn } from './privacy-en';
import { hunterTowerPrivacyKo } from './privacy-ko';
import { hunterTowerTermsEn } from './terms-en';
import { hunterTowerTermsKo } from './terms-ko';

export const hunterTower: Game = {
  slug: 'hunter-tower',
  title: 'Hunter Tower',
  privacy: { en: hunterTowerPrivacyEn, ko: hunterTowerPrivacyKo },
  terms: { en: hunterTowerTermsEn, ko: hunterTowerTermsKo },
};
```

`lib/games.ts`:

```ts
import type { Game, GameSlug } from '@/lib/games/types';
import { hunterTower } from '@/lib/games/hunter-tower';

const GAMES: Record<GameSlug, Game> = {
  'hunter-tower': hunterTower,
};

export function getAllGameSlugs(): GameSlug[] {
  return Object.keys(GAMES) as GameSlug[];
}

export function getGame(slug: string): Game | undefined {
  if (slug in GAMES) return GAMES[slug as GameSlug];
  return undefined;
}

export type { Game, GameSlug, GamePolicy, PolicyBlock } from '@/lib/games/types';
```

---

### Task 4: Dynamic routes

**Files:**
- Create: `app/games/[slug]/privacy/page.tsx`
- Create: `app/games/[slug]/terms/page.tsx`

- [ ] **Step 1: Privacy page**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GamePolicyPage from '@/components/GamePolicyPage';
import { getAllGameSlugs, getGame } from '@/lib/games';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: 'Not Found | R GAMES' };
  return {
    title: `${game.privacy.en.title} | ${game.title} | R GAMES`,
  };
}

export default async function GamePrivacyPage({ params }: Props) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();
  return <GamePolicyPage game={game} kind="privacy" />;
}
```

- [ ] **Step 2: Terms page** — same pattern with `kind="terms"` and `game.terms.en.title`.

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: success; routes include `/games/hunter-tower/privacy` and `/games/hunter-tower/terms`. Visiting an unknown slug should 404.

---

### Task 5: Home game-card links

**Files:**
- Modify: `components/Home.tsx`
- CSS already added in Task 2 (`.game-policy-links`)

- [ ] **Step 1: Update game-info block in `Home.tsx`**

Import `Link` from `next/link` and use existing `t.footPrivacy` / `t.footTerms`.

Inside `.game-info`, after `.game-desc`:

```tsx
<div className="game-policy-links">
  <Link href="/games/hunter-tower/privacy">{t.footPrivacy}</Link>
  <Link href="/games/hunter-tower/terms">{t.footTerms}</Link>
</div>
```

Prefer deriving paths from registry:

```tsx
import { getGame } from '@/lib/games';

// inside component:
const ht = getGame('hunter-tower')!;
// ...
<Link href={`/games/${ht.slug}/privacy`}>{t.footPrivacy}</Link>
<Link href={`/games/${ht.slug}/terms`}>{t.footTerms}</Link>
```

- [ ] **Step 2: Visual check**

Run: `npm run dev`
Open home — links at bottom-right of description (because `.game-info` is column flex and `.game-policy-links` has `align-self: flex-end`). Toggle language; labels switch. Click through to both pages.

---

### Task 6: Import full Notion content

**Files:**
- Replace contents of the four `lib/games/hunter-tower/*-{en,ko}.ts` files

- [ ] **Step 1: Fetch Notion**

Use Notion MCP `notion-fetch` on both page URLs listed in the plan header. Split each page at `## English` / `## 한국어 (Korean)` (or equivalent).

- [ ] **Step 2: Convert to `PolicyBlock[]`**

Rules:
- `###` headings → `h2` (or `h3` for nested like `2.1`)
- Paragraphs → `p` with `spans` (split bold/`code`/links)
- Numbered lists → `ol`; bullets → `ul`
- Notion `<table>` → `table` with string headers/rows (strip markdown bold markers in cells to plain text or keep as text)
- Callout after metadata → `introNote`
- Dates: `effectiveDate: '2026-05-06'`, `lastUpdated: '2026-07-09'` (or as stated on page)
- Cross-links between Privacy and Terms on the website should point to `/games/hunter-tower/privacy` and `/games/hunter-tower/terms` (not Notion URLs) when mentioning the sibling policy in Appendix

**Terms checklist (EN + KO each must include):**
Articles 1–17 + Appendix (Purpose through Contact, plus Privacy Policy pointer).

**Privacy checklist (EN + KO each must include):**
Sections 1–12, subsections 2.1–2.6, Appendix A table, Appendix B.

- [ ] **Step 3: Build + smoke**

Run: `npm run build`
Expected: success.

Manual: open both game policy pages in `en` and `ko`; confirm tables scroll on mobile; external links open in new tab.

---

### Task 7: Verification (no commit unless asked)

- [ ] **Step 1: Checklist**

| Check | Expected |
| --- | --- |
| Home EN/KO policy links | Bottom-right of Hunter Tower description |
| `/games/hunter-tower/privacy` | Full Notion privacy content for active lang |
| `/games/hunter-tower/terms` | Full Notion terms content for active lang |
| `/privacy`, `/terms` | Company policies unchanged |
| `/games/nope/privacy` | 404 |
| Footer links | Still company `/privacy` `/terms` |
| Mobile | Links tappable; tables scroll |

- [ ] **Step 2: Commit only if user requests**

If asked, stage only feature files (not unrelated dirty files) and use a message like:

```
feat: add per-game privacy and terms pages for Hunter Tower
```

---

## Spec coverage self-review

| Spec requirement | Task |
| --- | --- |
| Footer company policies unchanged | Explicit non-touch list + Task 7 |
| `/games/[slug]/privacy\|terms` | Task 4 |
| Registry extensible by slug | Tasks 1, 3 |
| Bottom-right game description links | Task 5 |
| Static Notion copy, EN/KO split | Task 6 |
| Tables / lists / links | Tasks 2, 6 |
| Effective + last updated dates | Tasks 2, 6 |
| Unknown slug → 404 | Task 4 |
| No live Notion sync | Out of scope |

## Type consistency

- `Game.privacy` / `Game.terms`: `Record<Lang, GamePolicy>`
- `GamePolicy.blocks`: `PolicyBlock[]`
- `getGame(slug: string): Game | undefined`
- `GamePolicyPage` props: `{ game: Game; kind: 'privacy' | 'terms' }`
