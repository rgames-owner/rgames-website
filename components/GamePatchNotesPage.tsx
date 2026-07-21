'use client';

import { useLang } from './LangProvider';
import type { Game } from '@/lib/games/types';

function Body({ text }: { text: string }) {
  const lines = text
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const bulletish = lines.length > 0 && lines.every((l) => /^[•\-\*]\s+/.test(l));
  if (bulletish) {
    return (
      <ul className="policy-list">
        {lines.map((l, i) => (
          <li key={i}>{l.replace(/^[•\-\*]\s+/, '')}</li>
        ))}
      </ul>
    );
  }

  return <p className="policy-p patch-note-body">{text}</p>;
}

export default function GamePatchNotesPage({ game }: { game: Game }) {
  const { lang } = useLang();
  const notes = game.patchNotes;
  if (!notes) return null;

  return (
    <div className="policy">
      <p className="policy-game-label">{game.title}</p>
      <h1>{notes.title[lang]}</h1>
      <div className="policy-body patch-notes-body">
        {notes.entries.map((entry) => (
          <section className="patch-note-entry" key={entry.version}>
            <h2 className="policy-h2">v{entry.version}</h2>
            <Body text={entry.body[lang]} />
          </section>
        ))}
      </div>
    </div>
  );
}
