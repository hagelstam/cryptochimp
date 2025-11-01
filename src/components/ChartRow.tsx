import {
  getCapitalDataPoints,
  getOwnedCoins,
  getPortfolioMetrics,
} from '@/lib/api';
import { Col, Grid } from '@tremor/react';
import { cacheLife } from 'next/cache';
import { CapitalChart } from './CapitalChart';
import { PortfolioChart } from './PortfolioChart';

export const ChartRow = async ({ userId }: { userId: string }) => {
  'use cache';
  cacheLife('minutes');

  const [capitalDataPoints, ownedCoins, { coinCapitalValue }] =
    await Promise.all([
      getCapitalDataPoints(userId),
      getOwnedCoins(userId),
      getPortfolioMetrics(userId),
    ]);

  return (
    <Grid numItemsLg={6} className="mt-6 gap-6">
      <Col numColSpanLg={4}>
        <CapitalChart chartData={capitalDataPoints} />
      </Col>
      <Col numColSpanLg={2}>
        <PortfolioChart
          chartData={ownedCoins}
          portfolioValue={coinCapitalValue}
        />
      </Col>
    </Grid>
  );
};
