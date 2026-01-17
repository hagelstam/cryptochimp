import { Skeleton } from '@/components/Skeleton';
import { Col, Grid } from '@tremor/react';

export default function Loading() {
  return (
    <>
      <Grid numItemsSm={3} className="gap-6">
        <Skeleton className="h-[112px] w-full" />
        <Skeleton className="h-[112px] w-full" />
        <Skeleton className="h-[112px] w-full" />
      </Grid>
      <div className="mt-6">
        <Grid numItemsLg={6} className="mt-6 gap-6">
          <Col numColSpanLg={4}>
            <Skeleton className="h-[388px] w-full" />
          </Col>
          <Col numColSpanLg={2}>
            <Skeleton className="size-full" />
          </Col>
        </Grid>
      </div>
      <div className="mt-6">
        <Skeleton className="h-[340px] w-full" />
      </div>
    </>
  );
}
