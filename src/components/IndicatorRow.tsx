import { IndicatorCard } from "@/components/IndicatorCard";
import { getDashboardData } from "@/lib/api";
import { INITIAL_CAPITAL } from "@/lib/constants";
import { Grid } from "@tremor/react";

export const IndicatorRow = async ({ userId }: { userId: string }) => {
  const data = await getDashboardData(userId);

  return (
    <Grid numItemsSm={3} className="gap-6">
      <IndicatorCard
        title="Portfolio value"
        value={data.capital.value}
        percentage={data.capital.percentageChange}
        from={INITIAL_CAPITAL}
      />
      <IndicatorCard
        title="Portfolio value 24h"
        value={data.capitalToday.value}
        percentage={data.capitalToday.percentageChange}
      />
      <IndicatorCard title="Cash balance" value={data.balance} />
    </Grid>
  );
};
