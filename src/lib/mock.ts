import { CoinMetadata } from "@/types";

export const getLatest = async (limit: number) => {
  return new Array(limit).fill(null).map((_, index) => ({
    name: "Bitcoin",
    symbol: "BTC",
    cmc_rank: index,
    circulating_supply: 19_000_000,
    quote: {
      EUR: {
        price: 40_000,
        percent_change_1h: 2,
        percent_change_24h: 5,
        percent_change_7d: 10,
        volume_24h: 8_000_000,
        market_cap: 700_000_000_000,
      },
    },
  }));
};

export const getPrice = async (symbol: string = "") => {
  if (symbol === "BTC") return 40_000;
  return 100;
};

export const getMetadata = async (symbols: string[]) => {
  return symbols.reduce(
    (acc, symbol) => ({
      ...acc,
      [symbol]: [
        {
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
        },
      ],
    }),
    {} as Record<string, Array<CoinMetadata>>
  );
};
