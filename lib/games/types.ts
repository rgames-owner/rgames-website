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

export interface PatchNoteEntry {
  version: string;
  body: Record<Lang, string>;
}

export interface GamePatchNotes {
  title: Record<Lang, string>;
  entries: PatchNoteEntry[];
}

export interface Game {
  slug: GameSlug;
  title: string;
  privacy: Record<Lang, GamePolicy>;
  terms: Record<Lang, GamePolicy>;
  patchNotes?: GamePatchNotes;
}

export function p(text: string): PolicyBlock {
  return { type: 'p', spans: [{ type: 'text', text }] };
}

export function h2(text: string): PolicyBlock {
  return { type: 'h2', text };
}

export function h3(text: string): PolicyBlock {
  return { type: 'h3', text };
}
