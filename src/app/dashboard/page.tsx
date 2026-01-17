import { ChartRow } from '@/components/ChartRow';
import { HoldingsTable } from '@/components/HoldingsTable';
import { IndicatorRow } from '@/components/IndicatorRow';
import { Skeleton } from '@/components/Skeleton';
import { getCurrentUser } from '@/lib/auth';
import { Col, Grid } from '@tremor/react';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard',
};

export default async function Dashboard() {
  const user = await getCurrentUser();
  const userId = user!.id;

  return (
    <>
      <Suspense
        fallback={
          <Grid numItemsSm={3} className="gap-6">
            <Skeleton className="h-[112px] w-full" />
            <Skeleton className="h-[112px] w-full" />
            <Skeleton className="h-[112px] w-full" />
          </Grid>
        }
      >
        <IndicatorRow userId={userId} />
      </Suspense>
      <div className="mt-6">
        <Suspense
          fallback={
            <Grid numItemsLg={6} className="mt-6 gap-6">
              <Col numColSpanLg={4}>
                <Skeleton className="h-[388px] w-full" />
              </Col>
              <Col numColSpanLg={2}>
                <Skeleton className="size-full" />
              </Col>
            </Grid>
          }
        >
          <ChartRow userId={userId} />
        </Suspense>
      </div>
      <div className="mt-6">
        <Suspense fallback={<Skeleton className="h-[340px] w-full" />}>
          <HoldingsTable userId={userId} />
        </Suspense>
      </div>
    </>
  );
}
