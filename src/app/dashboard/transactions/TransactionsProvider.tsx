import { getTransactions } from '@/lib/api';
import { TransactionsTable } from './TransactionsTable';

export const TransactionsProvider = async ({ userId }: { userId: string }) => {
  const transactions = await getTransactions(userId);
  return <TransactionsTable transactions={transactions} />;
};
