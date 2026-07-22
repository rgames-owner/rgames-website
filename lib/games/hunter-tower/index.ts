import type { Game } from '@/lib/games/types';
import { hunterTowerPrivacyEn } from './privacy-en';
import { hunterTowerPrivacyKo } from './privacy-ko';
import { hunterTowerTermsEn } from './terms-en';
import { hunterTowerTermsKo } from './terms-ko';
import { hunterTowerPatchNotes } from './patch-notes.generated';
import { hunterTowerSupport } from './support';

export const hunterTower: Game = {
  slug: 'hunter-tower',
  title: 'Hunter Tower',
  privacy: { en: hunterTowerPrivacyEn, ko: hunterTowerPrivacyKo },
  terms: { en: hunterTowerTermsEn, ko: hunterTowerTermsKo },
  patchNotes: hunterTowerPatchNotes,
  support: hunterTowerSupport,
};
