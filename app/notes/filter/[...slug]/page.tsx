import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesByTagClient from './Notes.client';
import type { Metadata } from 'next';

type GenerateMetadataProps = {
  params: {
    slug?: string[];
  };
};

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] ?? 'all';

  const title = `Notes — ${filter} | NoteHub`;
  const description = `Notes filtered by "${filter}" category.`;

  const url = `https://notehub.com/notes/filter/${filter}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${filter}`,
        },
      ],
      type: 'website',
    },
  };
}

interface NotesByTagProps {
  params: Promise<{ slug: string[] }>;
}

async function NotesByTag({ params }: NotesByTagProps) {
  const { slug } = await params;
  const tag = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByTagClient tag={tag} />
    </HydrationBoundary>
  );
}

export default NotesByTag;
