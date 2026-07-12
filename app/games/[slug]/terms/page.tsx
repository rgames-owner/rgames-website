import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GamePolicyPage from '@/components/GamePolicyPage';
import { getAllGameSlugs, getGame } from '@/lib/games';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: 'Not Found | R GAMES' };
  return {
    title: `${game.terms.en.title} | ${game.title} | R GAMES`,
  };
}

export default async function GameTermsPage({ params }: Props) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();
  return <GamePolicyPage game={game} kind="terms" />;
}
