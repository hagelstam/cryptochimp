import { getOwnedCoins } from '@/lib/utils';
import { CoinMetadata } from '@/types';
import type { Transaction } from '@/generated/client';

const fetchCrypto = async <T>(url: string): Promise<T> => {
  const res = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/${url}&convert=EUR`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
        Accept: 'application/json',
      },
    }
  );
  if (!res.ok) throw new Error('Error fetching crypto data');
  const json = (await res.json()) as { data: T };
  return json.data;
};

export const getLatest = async (limit: number) => {
  return await fetchCrypto<
    {
      name: string;
      symbol: string;
      cmc_rank: number;
      circulating_supply: number;
      quote: {
        EUR: {
          price: number;
          percent_change_1h: number;
          percent_change_24h: number;
          percent_change_7d: number;
          volume_24h: number;
          market_cap: number;
        };
      };
    }[]
  >(`listings/latest?limit=${limit}`);
};

export const getPrice = async (symbol: string) => {
  const data = await fetchCrypto<{
    [key: string]: {
      quote: {
        EUR: {
          price: number;
        };
      };
    };
  }>(`quotes/latest?symbol=${symbol}`);

  const price = data[symbol]?.quote.EUR.price;
  if (!price) throw new Error(`Invalid symbol: ${symbol}`);

  return price;
};

export const getPrices = async (symbols: string[]) => {
  const data = await fetchCrypto<{
    [key: string]: {
      quote: {
        EUR: {
          price: number;
        };
      };
    };
  }>(`quotes/latest?symbol=${symbols.join(',')}`);

  const priceRecord: Record<string, number> = {};

  symbols.forEach((symbol) => {
    const price = data[symbol]?.quote.EUR.price;
    if (!price) throw new Error(`Invalid symbol: ${symbol}`);
    priceRecord[symbol] = price;
  });

  return priceRecord;
};

export const getMetadata = async (
  symbols: string[]
): Promise<{ [key: string]: CoinMetadata[] }> => {
  const res = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbols.join(',')}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
        Accept: 'application/json',
      },
    }
  );
  if (!res.ok) throw new Error('CoinMarketCap rate limited us');
  const json = (await res.json()) as {
    data: { [key: string]: CoinMetadata[] };
  };
  return json.data;
};

export const getWallet = async (transactions: Transaction[]) => {
  if (transactions.length === 0) return [];

  const ownedCoins = getOwnedCoins(transactions);

  const ownedCoinSymbols = ownedCoins.map((coin) => coin.symbol).join(',');
  const data = await fetchCrypto<{
    [key: string]: {
      name: string;
      quote: {
        EUR: {
          price: number;
          percent_change_1h: number;
          percent_change_24h: number;
          percent_change_7d: number;
        };
      };
    };
  }>(`quotes/latest?symbol=${ownedCoinSymbols}`);

  const ownedCoinsWithAPIData = ownedCoins.map((coin) => {
    const { symbol, quantity } = coin;
    const currentPrice = data[symbol]?.quote.EUR.price;
    const name = data[symbol]?.name;
    const percentChange1h = data[symbol]?.quote.EUR.percent_change_1h;
    const percentChange24h = data[symbol]?.quote.EUR.percent_change_24h;
    const percentChange7d = data[symbol]?.quote.EUR.percent_change_7d;

    if (!currentPrice || !name || !percentChange24h) {
      throw new Error(`Invalid symbol: ${symbol}`);
    }

    return {
      symbol,
      quantity,
      currentPrice,
      name,
      totalValue: quantity * currentPrice,
      percentChange1h,
      percentChange24h,
      percentChange7d,
    };
  });

  return ownedCoinsWithAPIData;
};
