import type { Metadata } from 'next';
import { Jua, Noto_Sans_KR } from 'next/font/google';
import { LangProvider } from '@/components/LangProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const jua = Jua({ weight: '400', subsets: ['latin'], variable: '--font-jua' });
const notoSansKr = Noto_Sans_KR({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto',
});

export const metadata: Metadata = {
  title: 'R GAMES | 알 게임즈',
  description:
    '알 게임즈(R Games)는 소규모 팀의 모바일 게임 스튜디오입니다. Hunter Tower: Offline IDLE RPG 개발사.',
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'R GAMES | 알 게임즈',
    description: 'Hunter Tower를 만든 모바일 게임 스튜디오, 알 게임즈(R Games).',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${jua.variable} ${notoSansKr.variable}`}>
      <body>
        <LangProvider>
          <div className="page">
            <Header />
            <main className="page-main">{children}</main>
            <Footer />
          </div>
        </LangProvider>
      </body>
    </html>
  );
}
