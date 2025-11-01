import { INITIAL_CAPITAL } from '@/lib/constants';
import { getLatest, getMetadata, getPrice, getWallet } from '@/lib/crypto';
import { prisma } from '@/lib/db';
import { Coin, DashboardData, TradeDetails } from '@/types';
import { Transaction, TransactionType } from '@prisma/client';
import { cache } from 'react';

export const getTopCoins = async (limit: number): Promise<Coin[]> => {
  const data = await getLatest(limit);
  const symbols = data.map((coin) => coin.symbol);
  const metadata = await getMetadata(symbols);

  return data.map((coin) => {
    const coinMetadata = metadata[coin.symbol]?.[0];
    return {
      name: coin.name,
      symbol: coin.symbol,
      rank: coin.cmc_rank,
      price: coin.quote.EUR.price,
      percentChange1h: coin.quote.EUR.percent_change_1h,
      percentChange24h: coin.quote.EUR.percent_change_24h,
      percentChange7d: coin.quote.EUR.percent_change_7d,
      marketCap: coin.quote.EUR.market_cap,
      volume24h: coin.quote.EUR.volume_24h,
      circulatingSupply: coin.circulating_supply,
      metadata: {
        logo: coinMetadata?.logo,
      },
    };
  });
};

export const getTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  return await prisma.transaction.findMany({
    orderBy: { createdAt: 'desc' },
    where: { userId },
  });
};

export const getDashboardData = cache(
  async (userId: string): Promise<DashboardData> => {
    const { balance } = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
    const transactions = await prisma.transaction.findMany({
      where: { userId },
    });

    const ownedCoins = await getWallet(transactions);
    const portfolioValue = ownedCoins.reduce((total, coin) => {
      return total + coin.currentPrice * coin.quantity;
    }, 0);

    const capital = portfolioValue + balance;
    const percentageChange =
      ((capital - INITIAL_CAPITAL) / INITIAL_CAPITAL) * 100;

    const capitalDataPoints = await prisma.capitalDataPoint.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    const capitalYesterday =
      capitalDataPoints.length === 0
        ? INITIAL_CAPITAL
        : capitalDataPoints[capitalDataPoints.length - 1].capital;
    const capitalChangeToday = capital - capitalYesterday;
    const capitalChangeTodayPercentage =
      (capitalChangeToday / capitalYesterday) * 100;

    const parsedCapitalData = capitalDataPoints.map((dataPoint) => ({
      ...dataPoint,
      createdAt: new Date(dataPoint.createdAt),
    }));

    return {
      balance,
      capital: {
        value: capital,
        percentageChange: percentageChange,
      },
      capitalToday: {
        value: capitalChangeToday,
        percentageChange: capitalChangeTodayPercentage,
      },
      ownedCoins,
      capitalDataPoints: parsedCapitalData,
      coinCapitalValue: capital - balance,
    };
  }
);

export const createTransaction = async (
  userId: string,
  symbol: string,
  quantity: number,
  type: TransactionType
): Promise<Transaction> => {
  const pricePerCoin = await getPrice(symbol);
  const total = quantity * pricePerCoin;

  if (type === 'BUY') {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    if (user.balance < total) throw new Error('Cannot afford purchase');

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          decrement: total,
        },
      },
    });
  }

  if (type === 'SELL') {
    const transactionsForCoin = await prisma.transaction.findMany({
      where: {
        userId,
        symbol,
      },
      select: {
        quantity: true,
        type: true,
      },
    });

    const totalCoinsOwned = transactionsForCoin.reduce((total, transaction) => {
      if (transaction.type === 'BUY') {
        return total + transaction.quantity;
      }
      return total - transaction.quantity;
    }, 0);

    if (totalCoinsOwned < quantity) throw new Error('Not enough coins to sell');

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          increment: total,
        },
      },
    });
  }

  const transaction = await prisma.transaction.create({
    data: {
      type,
      quantity,
      symbol,
      pricePerCoin,
      userId,
    },
  });

  return transaction;
};

export const getTradeDetails = async (
  userId: string,
  symbol: string,
  quantity: number,
  type: TransactionType
): Promise<TradeDetails> => {
  const pricePerCoin = await getPrice(symbol);
  const total = quantity * pricePerCoin;
  const { balance } = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
  const balanceAfter = type === 'BUY' ? balance - total : balance + total;

  return { balance, balanceAfter, pricePerCoin, total };
};

export const getStarCount = cache(async () => {
  const res = await fetch('https://api.github.com/repos/hagelstam/cryptochimp');
  if (!res.ok) throw new Error('Error getting star count');
  const data = (await res.json()) as { stargazers_count: number };
  return data.stargazers_count;
});
