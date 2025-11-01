import { EmptyPlaceholder } from '@/components/EmptyPlaceholder';
import { getOwnedCoins } from '@/lib/api';
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

export const HoldingsTable = async ({ userId }: { userId: string }) => {
  'use cache';
  cacheLife('minutes');

  const ownedCoins = await getOwnedCoins(userId);
  if (ownedCoins.length === 0) {
    return <EmptyPlaceholder className="h-[340px]" />;
  }

  return (
    <Card>
      <Title>Holdings</Title>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Symbol</TableHeaderCell>
            <TableHeaderCell className="text-right">Quantity</TableHeaderCell>
            <TableHeaderCell className="text-right">Price</TableHeaderCell>
            <TableHeaderCell className="text-right">1h %</TableHeaderCell>
            <TableHeaderCell className="text-right">24h %</TableHeaderCell>
            <TableHeaderCell className="text-right">7d %</TableHeaderCell>
            <TableHeaderCell className="text-right">
              Total Value
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ownedCoins.map((coin) => (
            <TableRow key={coin.symbol}>
              <TableCell>{coin.name}</TableCell>
              <TableCell className="text-right">{coin.symbol}</TableCell>
              <TableCell className="text-right">
                {coin.quantity.toLocaleString('fi-FI')}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.currentPrice)}
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
                {formatCurrency(coin.totalValue)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
