'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DICT, Dict, Lang } from '@/lib/i18n';

interface LangContextValue {
  lang: Lang;
  t: Dict;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: 'ko',
  t: DICT.ko,
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');

  useEffect(() => {
    const saved = window.localStorage.getItem('rg-lang');
    if (saved === 'en' || saved === 'ko') setLang(saved);
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next = prev === 'ko' ? 'en' : 'ko';
      window.localStorage.setItem('rg-lang', next);
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, t: DICT[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
