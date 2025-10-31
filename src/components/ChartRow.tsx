import { getDashboardData } from '@/lib/api';
import { Col, Grid } from '@tremor/react';
import { CapitalChart } from './CapitalChart';
import { PortfolioChart } from './PortfolioChart';

export const ChartRow = async ({ userId }: { userId: string }) => {
  const data = await getDashboardData(userId);

  return (
    <Grid numItemsLg={6} className="mt-6 gap-6">
      <Col numColSpanLg={4}>
        <CapitalChart chartData={data.capitalDataPoints} />
      </Col>
      <Col numColSpanLg={2}>
        <PortfolioChart
          chartData={data.ownedCoins}
          portfolioValue={data.coinCapitalValue}
        />
      </Col>
    </Grid>
  );
};
