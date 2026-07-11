'use client';

import { useLang } from './LangProvider';

export default function PolicyPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { t } = useLang();
  const sections = kind === 'privacy' ? t.privacySections : t.termsSections;
  const title = kind === 'privacy' ? t.privacyTitle : t.termsTitle;

  return (
    <div className="policy">
      <h1>{title}</h1>
      <p className="policy-date">{t.effectiveDate}</p>
      <div className="policy-body">
        {sections.map((sec) => (
          <section className="policy-section" key={sec.h}>
            <h2>{sec.h}</h2>
            <p>{sec.b}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
