import { getTransactions } from '@/lib/api';
import { cacheLife } from 'next/cache';
import { TransactionsTable } from './TransactionsTable';

export const TransactionsProvider = async ({ userId }: { userId: string }) => {
  'use cache';
  cacheLife('minutes');

  const transactions = await getTransactions(userId);

  return <TransactionsTable transactions={transactions} />;
};
