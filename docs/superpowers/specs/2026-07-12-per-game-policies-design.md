# Per-Game Privacy & Terms Pages — Design

**Date:** 2026-07-12  
**Status:** Approved for planning  
**Scope:** Game-card links + extensible per-game policy routes; Hunter Tower content from Notion

## Goal

- From each game card (starting with Hunter Tower), users can open that game’s **Privacy Policy** and **Terms of Service**.
- Links sit at the **bottom-right of the game description** area.
- Structure supports additional games without new route files per game.
- Company-wide footer policies (`/privacy`, `/terms`) stay unchanged.

## Non-goals

- Live sync from Notion at runtime/build time
- Changing or removing company footer policy pages
- Redesigning the home page beyond the game-card policy links
- Multi-game UI for games that do not exist yet (only data/route shape is prepared)

## Decisions

| Topic | Choice |
| --- | --- |
| Company vs game policies | Separated (footer = company; game card = per-game) |
| URL shape | `/games/[slug]/privacy`, `/games/[slug]/terms` |
| Content source | Static copy of Notion docs into the repo |
| Languages | Site lang toggle (`en` / `ko`); show matching language body only |
| Initial game | `hunter-tower` |

## Architecture

### 1. Game registry

New module (e.g. `lib/games.ts`) exports a list/map of games:

```ts
type GameSlug = 'hunter-tower'; // extend as games are added

interface Game {
  slug: GameSlug;
  title: string; // display name, e.g. "Hunter Tower"
  // policy content keyed by lang
  privacy: Record<Lang, GamePolicy>;
  terms: Record<Lang, GamePolicy>;
}

interface GamePolicy {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  introNote?: string; // channel applicability blurb
  sections: PolicyBlock[];
}

// PolicyBlock supports headings, paragraphs, lists, and simple tables
```

- Lookup by `slug`; unknown slug → `notFound()`.
- Home card reads registry (or a thin home-facing subset) for links: `/games/${slug}/privacy`, `/games/${slug}/terms`.

### 2. Routes

- `app/games/[slug]/privacy/page.tsx`
- `app/games/[slug]/terms/page.tsx`

Shared presentation via an extended policy component (reuse existing `PolicyPage` patterns, or a `GamePolicyPage` that accepts registry content).

Metadata: `"${policyTitle} | ${gameTitle} | R GAMES"`.

### 3. Home UI

In `components/Home.tsx`, inside the game head/info block (description area):

- Keep genre, title, description as today.
- Add a row of text links aligned to the **bottom-right** of that description block:
  - Privacy label → `/games/hunter-tower/privacy`
  - Terms label → `/games/hunter-tower/terms`
- Labels come from i18n (`footPrivacy` / `footTerms` or dedicated keys).
- Style: subtle text links consistent with footer links; no new card chrome.

### 4. Content import (Hunter Tower)

Source Notion pages (static snapshot at implementation time):

- Terms: [Hunter Tower Terms of Service](https://app.notion.com/p/rgames-team/Hunter-Tower-Terms-of-Service-3a6e93c864014937becd719fbe42cbea)
- Privacy: [Hunter Tower Privacy Policy](https://app.notion.com/p/rgames-team/Hunter-Tower-Privacy-Policy-bfd849b1c4c2414e9f448f72ee971488)

Rules:

- Split each Notion page into **English** and **Korean** bodies for `en` / `ko`.
- Preserve structure: numbered articles/sections, lists, links, appendices.
- Render privacy **tables** (third-party processors, store disclosure mapping).
- Show effective date and last updated.
- Do not auto-update from Notion later; edits are manual repo updates (or a future sync project).

Preferred storage for large bilingual legal text: dedicated files under e.g. `lib/games/hunter-tower/` (privacy/terms per lang or structured TS/JSON), imported by the registry — keep `lib/i18n.ts` focused on site chrome + company policies.

### 5. Policy rendering

Extend rendering beyond today’s `{ h, b }` paragraphs:

- Section headings
- Multi-paragraph / list bodies
- Markdown-like links in text (or explicit link nodes)
- Simple HTML tables for privacy appendices

Company `PolicyPage` can remain as-is; game pages use the richer renderer.

## Data flow

```
Home card → Link /games/{slug}/privacy|terms
                ↓
         [slug] page → getGame(slug) → GamePolicyPage(lang, kind)
                ↓
         DICT/lang toggle only affects which Record<Lang, …> entry is shown
```

Footer continues to use company `t.privacySections` / `t.termsSections` only.

## Error handling

- Unknown `slug`: Next.js `notFound()`
- Missing policy for a registered game: treat as authoring error (should not ship); fail loudly in dev if content missing

## Testing / verification

- Home: English and Korean — links visible bottom-right of Hunter Tower description; navigate correctly
- `/games/hunter-tower/privacy` and `/terms` render full content for both languages
- Tables and external links work
- Footer company policies unchanged
- Invalid slug (e.g. `/games/foo/privacy`) → 404
- Mobile: links readable and tappable without breaking game card layout

## Extending to a second game

1. Add content under `lib/games/<slug>/`
2. Register in `lib/games.ts`
3. Add a home card (or upcoming card) that links with the same pattern  
No new route files required.

## Out of scope follow-ups

- Notion → repo sync script
- Redirecting old Notion public URLs to the website
- App deep links / store listing URL checklist (ops, not site code)
