'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from './LangProvider';

export default function Header() {
  const { lang, t, toggle } = useLang();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="header-logo">
          <Image src="/logo.png" alt="R GAMES" width={42} height={42} />
          <span>R GAMES</span>
        </Link>
        <nav className="header-nav">
          <Link href="/#games">{t.navGames}</Link>
          <Link href="/#company">{t.navCompany}</Link>
          <Link href="/#contact">{t.navContact}</Link>
          <button className="lang-btn" onClick={toggle}>
            {lang === 'ko' ? 'EN' : '한국어'}
          </button>
        </nav>
      </div>
    </header>
  );
}
