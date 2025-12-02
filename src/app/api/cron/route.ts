import { getPrices } from '@/lib/crypto';
import { prisma } from '@/lib/db';
import { getOwnedCoins } from '@/lib/utils';
import { Transaction, User } from '@/generated/client';

const getUniqueCryptoSymbols = (users: User[], transactions: Transaction[]) => {
  const ownedCoins = users.map((user) => {
    const transactionsForUser = transactions.filter(
      (transaction) => transaction.userId === user.id
    );
    return getOwnedCoins(transactionsForUser);
  });

  const flatOwnedCoins = ownedCoins.flat();
  const uniqueSymbols = Array.from(
    new Set(flatOwnedCoins.map((c) => c.symbol))
  );

  return uniqueSymbols;
};

const calculatePortfolioValue = (
  userId: string,
  transactions: Transaction[],
  priceRecord: Record<string, number>
) => {
  const transactionsForUser = transactions.filter(
    (transaction) => transaction.userId === userId
  );
  const ownedCoins = getOwnedCoins(transactionsForUser);

  return ownedCoins.reduce((total, coin) => {
    const price = priceRecord[coin.symbol];
    if (!price) return total;
    return total + price * coin.quantity;
  }, 0);
};

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    const users = await prisma.user.findMany();
    const transactions = await prisma.transaction.findMany();
    const uniqueSymbols = getUniqueCryptoSymbols(users, transactions);
    const prices = await getPrices(uniqueSymbols);

    await Promise.all(
      users.map(async (user, idx) => {
        console.log(`Processing user ${idx + 1}/${users.length}`);

        try {
          const portfolioValue = calculatePortfolioValue(
            user.id,
            transactions,
            prices
          );
          const capital = portfolioValue + user.balance;

          await prisma.capitalDataPoint.create({
            data: {
              capital,
              userId: user.id,
            },
          });

          console.info(`Created data point for user ${user.id}: ${capital}`);
        } catch (error) {
          console.error(`Error processing user ${user.id}:`, error);
        }
      })
    );

    return new Response('Success', {
      status: 200,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    return new Response('Error', {
      status: 500,
    });
  }
}
