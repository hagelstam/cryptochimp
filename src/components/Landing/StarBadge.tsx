import { getStarCount } from '@/lib/api';
import { cacheLife } from 'next/cache';
import Link from 'next/link';

export const StarBadge = async ({ repoLink }: { repoLink: string }) => {
  'use cache';
  cacheLife('hours');

  const starCount = await getStarCount();

  return (
    <Link
      href={repoLink}
      className="rounded-2xl bg-tremor-brand/20 px-4 py-1.5 text-sm font-medium"
      target="_blank"
    >
      {`${starCount} stars on GitHub`}
    </Link>
  );
};
