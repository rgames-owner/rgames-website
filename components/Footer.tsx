'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from './LangProvider';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <Image src="/logo.png" alt="R GAMES" width={34} height={34} />
          <span>R GAMES</span>
          <div className="footer-links">
            <Link href="/privacy">{t.footPrivacy}</Link>
            <Link href="/terms">{t.footTerms}</Link>
          </div>
        </div>
        <div className="footer-legal">
          <div>{t.footLegal1}</div>
          <div>{t.footLegal2}</div>
          <div>{t.footLegal3}</div>
        </div>
        <div className="footer-copy">© 2026 R Games. All rights reserved.</div>
      </div>
    </footer>
  );
}
