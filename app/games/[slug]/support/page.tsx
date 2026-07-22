import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GameSupportPage from '@/components/GameSupportPage';
import { getAllGameSlugs, getGame } from '@/lib/games';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGameSlugs()
    .map((slug) => getGame(slug))
    .filter((game): game is NonNullable<typeof game> => Boolean(game?.support))
    .map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game?.support) return { title: 'Not Found | R GAMES' };
  return {
    title: `${game.support.en.title} | ${game.title} | R GAMES`,
    description: game.support.en.intro,
  };
}

export default async function GameSupportRoute({ params }: Props) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game?.support) notFound();
  return <GameSupportPage game={game} />;
}
