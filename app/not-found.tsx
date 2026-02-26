import Link from 'next/link';
import { Metadata } from 'next';

import css from './page.module.css';

export const metadata: Metadata = {
  title: '404 — Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: '404 — Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: 'https://notehub.com/not-found',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub – 404 page not found',
      },
    ],
    type: 'website',
  },
};

function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className={css.description}>
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
