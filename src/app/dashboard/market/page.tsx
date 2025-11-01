import { Skeleton } from '@/components/Skeleton';
import { Suspense } from 'react';
import { MarketTable } from './MarketTable';

export default async function Market() {
  return (
    <Suspense fallback={<Skeleton className="h-[800px] w-full" />}>
      <MarketTable limit={25} />
    </Suspense>
  );
}
