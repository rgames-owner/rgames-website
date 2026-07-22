'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from './LangProvider';
import { CONTACT, HT_ICON, SCREENSHOTS } from '@/lib/i18n';
import { getGame } from '@/lib/games';

export default function Home() {
  const { t } = useLang();
  const ht = getGame('hunter-tower')!;

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-badge">{t.heroBadge}</span>
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-desc">{t.heroDesc}</p>
            <a href="#games" className="btn-primary">
              {t.heroCta}
            </a>
          </div>
          <div className="hero-egg">
            <Image src="/logo.png" alt="R GAMES egg logo" width={280} height={280} priority />
          </div>
        </div>
      </section>

      {/* Games */}
      <section id="games" className="container section">
        <h2 className="section-title">{t.gamesTitle}</h2>

        <div className="card">
          <div className="game-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="game-icon" src={HT_ICON} alt="Hunter Tower icon" />
            <div className="game-info">
              <span className="game-genre">{t.htGenre}</span>
              <h3 className="game-title">Hunter Tower</h3>
              <p className="game-desc">{t.htDesc}</p>
              <div className="game-policy-links">
                <Link href={`/games/${ht.slug}/privacy`}>{t.footPrivacy}</Link>
                <Link href={`/games/${ht.slug}/terms`}>{t.footTerms}</Link>
                <Link href={`/games/${ht.slug}/patch-notes`}>{t.footPatchNotes}</Link>
                <Link href={`/games/${ht.slug}/support`}>{t.footSupport}</Link>
              </div>
            </div>
          </div>

          <div className="features">
            {t.features.map((f) => (
              <div className="feature" key={f.t}>
                <strong>{f.t}</strong>
                <span>{f.d}</span>
              </div>
            ))}
          </div>

          <div className="shots">
            {SCREENSHOTS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={`Hunter Tower screenshot ${i + 1}`} />
            ))}
          </div>

          <div className="stores">
            <a className="store-btn" href={CONTACT.googlePlay} target="_blank" rel="noopener noreferrer">
              <small>{t.getItOn}</small>
              <b>Google Play</b>
            </a>
            <a className="store-btn" href={CONTACT.oneStore} target="_blank" rel="noopener noreferrer">
              <small>{t.getItOn}</small>
              <b>ONE store</b>
            </a>
            <div className="store-btn disabled">
              <small>{t.comingSoon}</small>
              <b>App Store</b>
            </div>
          </div>
        </div>

        <div className="upcoming">
          <div className="upcoming-egg">?</div>
          <div className="upcoming-info">
            <span className="upcoming-badge">{t.upBadge}</span>
            <h3 className="upcoming-title">{t.upTitle}</h3>
            <p className="upcoming-desc">{t.upDesc}</p>
          </div>
        </div>
      </section>

      {/* Company */}
      <section id="company" className="container section">
        <h2 className="section-title">{t.companyTitle}</h2>
        <p className="section-desc">{t.companyDesc}</p>
        <div className="card company-table">
          <dl style={{ margin: 0 }}>
            {t.companyRows.map((row) => (
              <div className="company-row" key={row.k}>
                <dt>{row.k}</dt>
                <dd>{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container section contact-section">
        <div className="contact-card">
          <div className="contact-copy">
            <h2>{t.contactTitle}</h2>
            <p>{t.contactDesc}</p>
          </div>
          <dl className="contact-list" style={{ margin: 0 }}>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${CONTACT.csEmail}`}>{CONTACT.csEmail}</a>
              </dd>
            </div>
            <div>
              <dt>Tel</dt>
              <dd>{CONTACT.tel}</dd>
            </div>
            <div>
              <dt>{t.addrLabel}</dt>
              <dd>{t.address}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
