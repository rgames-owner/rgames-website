'use client';

import Link from 'next/link';
import { CONTACT } from '@/lib/i18n';
import type { Game } from '@/lib/games/types';
import { useLang } from './LangProvider';

export default function GameSupportPage({ game }: { game: Game }) {
  const { lang, t } = useLang();
  const copy = game.support?.[lang];
  if (!copy) return null;

  const emailHref = `mailto:${CONTACT.csEmail}?subject=${encodeURIComponent(copy.emailSubject)}`;

  return (
    <div className="policy support-page">
      <p className="policy-game-label">{game.title}</p>
      <h1>{copy.title}</h1>
      <p className="support-intro">{copy.intro}</p>

      <section className="support-section">
        <h2 className="policy-h2">{copy.categoriesTitle}</h2>
        <div className="support-grid">
          {copy.categories.map((category) => (
            <article className="support-card" key={category.title}>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="support-section support-checklist">
        <h2 className="policy-h2">{copy.includeTitle}</h2>
        <ul className="policy-list">
          {copy.includeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="support-warning">{copy.privacyWarning}</p>
      </section>

      <section className="contact-card support-contact">
        <div className="contact-copy">
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactDescription}</p>
          <a className="btn-primary support-email-button" href={emailHref}>
            {copy.emailAction}
          </a>
        </div>
        <dl className="contact-list">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={emailHref}>{CONTACT.csEmail}</a>
            </dd>
          </div>
          <div>
            <dt>Tel</dt>
            <dd>{lang === 'ko' ? CONTACT.tel : CONTACT.telIntl}</dd>
          </div>
          <div>
            <dt>{t.addrLabel}</dt>
            <dd>{t.address}</dd>
          </div>
        </dl>
      </section>

      <nav className="support-policy-links" aria-label="Legal">
        <Link href={`/games/${game.slug}/privacy`}>{copy.privacyLink}</Link>
        <Link href={`/games/${game.slug}/terms`}>{copy.termsLink}</Link>
      </nav>
    </div>
  );
}
