import { getTopCoins } from '@/lib/api';
import { formatCurrency, formatPercentage, getDeltaType } from '@/lib/utils';
import {
  BadgeDelta,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react';
import { cacheLife } from 'next/cache';
import Image from 'next/image';

export const MarketTable = async ({ limit }: { limit: number }) => {
  'use cache';
  cacheLife('hours');

  const coins = await getTopCoins(limit);

  return (
    <Card className="w-full">
      <Title>Top {limit} Coins by Market Cap</Title>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell className="flex text-left">Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Price</TableHeaderCell>
            <TableHeaderCell className="text-right">1h %</TableHeaderCell>
            <TableHeaderCell className="text-right">24h %</TableHeaderCell>
            <TableHeaderCell className="text-right">7d %</TableHeaderCell>
            <TableHeaderCell className="text-right">Market Cap</TableHeaderCell>
            <TableHeaderCell className="text-right">
              Volume(24h)
            </TableHeaderCell>
            <TableHeaderCell className="text-right">
              Circulating Supply
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.name}>
              <TableCell>{coin.rank}</TableCell>
              <TableCell className="flex flex-row items-center gap-2">
                {coin.metadata?.logo && (
                  <Image
                    alt={`${coin.name} logo`}
                    height={24}
                    width={24}
                    src={coin.metadata.logo}
                  />
                )}
                <span>{`${coin.name} ${coin.symbol}`}</span>
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.price)}
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={getDeltaType(coin.percentChange1h)}
                  size="xs"
                >
                  {formatPercentage(coin.percentChange1h)}
                </BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={getDeltaType(coin.percentChange24h)}
                  size="xs"
                >
                  {formatPercentage(coin.percentChange24h)}
                </BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={getDeltaType(coin.percentChange7d)}
                  size="xs"
                >
                  {formatPercentage(coin.percentChange7d)}
                </BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.marketCap)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.volume24h)}
              </TableCell>
              <TableCell className="text-right">
                {`${coin.circulatingSupply.toLocaleString('fi-FI')} ${coin.symbol}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
