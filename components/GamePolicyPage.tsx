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
  const { lang } = useLang();
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
        {lang === 'ko' ? '시행일' : 'Effective date'}: {policy.effectiveDate}
        {' · '}
        {lang === 'ko' ? '최종 수정일' : 'Last updated'}: {policy.lastUpdated}
      </p>
      <PolicyBlocks blocks={blocks} />
    </div>
  );
}
