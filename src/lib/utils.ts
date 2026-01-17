import { Transaction, TransactionType } from '@/generated/client';

export const formatCurrency = (value: number) =>
  value.toLocaleString('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

export const getDeltaType = (percentChange: number) => {
  if (percentChange >= -0.1 && percentChange <= 0.1) return 'unchanged';
  return percentChange < 0 ? 'moderateDecrease' : 'moderateIncrease';
};

export const calculateCoinShare = (
  coinValue: number,
  portfolioValue: number
) => {
  if (portfolioValue === 0) return 0;
  return (coinValue / portfolioValue) * 100;
};

export const getOwnedCoins = (transactions: Transaction[]) => {
  const uniqueSymbols = [
    ...new Set(transactions.map((transaction) => transaction.symbol)),
  ];

  const ownedCoins: { symbol: string; quantity: number }[] = [];

  uniqueSymbols.forEach((symbol) => {
    const symbolTransactions = transactions.filter(
      (transaction) => transaction.symbol === symbol
    );
    const totalQuantity = symbolTransactions.reduce((total, transaction) => {
      if (transaction.type === 'BUY') {
        return total + transaction.quantity;
      }
      return total - transaction.quantity;
    }, 0);

    if (totalQuantity > 0) {
      ownedCoins.push({
        symbol,
        quantity: totalQuantity,
      });
    }
  });

  return ownedCoins;
};

export const parseTradeFormData = (formData: FormData) => {
  const symbol =
    formData.get('symbol')?.toString().trim().toLocaleUpperCase() ?? '';
  const quantity = Number(formData.get('quantity'));
  const type = formData.get('type')?.toString() as TransactionType;

  return { symbol, quantity, type };
};
