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
  title: 'R GAMES',
  description:
    'R Games is a small mobile game studio. Developers of Hunter Tower: Offline IDLE RPG.',
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'R GAMES',
    description: 'R Games — the mobile game studio behind Hunter Tower.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jua.variable} ${notoSansKr.variable}`}>
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
