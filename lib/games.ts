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

export type {
  Game,
  GameSlug,
  GamePolicy,
  GamePatchNotes,
  PolicyBlock,
} from '@/lib/games/types';
