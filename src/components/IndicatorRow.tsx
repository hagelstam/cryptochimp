import { IndicatorCard } from '@/components/IndicatorCard';
import { getPortfolioMetrics } from '@/lib/api';
import { INITIAL_CAPITAL } from '@/lib/constants';
import { Grid } from '@tremor/react';
import { cacheLife, cacheTag } from 'next/cache';

export const IndicatorRow = async ({ userId }: { userId: string }) => {
  'use cache';
  cacheLife('minutes');
  cacheTag(`user-${userId}-metrics`);

  const { capital, capitalToday, balance } = await getPortfolioMetrics(userId);

  return (
    <Grid numItemsSm={3} className="gap-6">
      <IndicatorCard
        title="Portfolio value"
        value={capital.value}
        percentage={capital.percentageChange}
        from={INITIAL_CAPITAL}
      />
      <IndicatorCard
        title="Portfolio value 24h"
        value={capitalToday.value}
        percentage={capitalToday.percentageChange}
      />
      <IndicatorCard title="Cash balance" value={balance} />
    </Grid>
  );
};
