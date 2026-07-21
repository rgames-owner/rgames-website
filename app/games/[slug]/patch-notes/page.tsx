import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GamePatchNotesPage from '@/components/GamePatchNotesPage';
import { getAllGameSlugs, getGame } from '@/lib/games';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGameSlugs()
    .map((slug) => getGame(slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g?.patchNotes))
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game?.patchNotes) return { title: 'Not Found | R GAMES' };
  return {
    title: `${game.patchNotes.title.en} | ${game.title} | R GAMES`,
  };
}

export default async function GamePatchNotesRoute({ params }: Props) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game?.patchNotes) notFound();
  return <GamePatchNotesPage game={game} />;
}
