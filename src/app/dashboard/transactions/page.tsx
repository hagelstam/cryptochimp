import { Skeleton } from '@/components/Skeleton';
import { getCurrentUser } from '@/lib/auth';
import { Suspense } from 'react';
import { TransactionsProvider } from './TransactionsProvider';

export const metadata = {
  title: 'Transactions',
};

export default async function Transactions() {
  const user = await getCurrentUser();

  return (
    <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
      <TransactionsProvider userId={user!.id} />
    </Suspense>
  );
}
