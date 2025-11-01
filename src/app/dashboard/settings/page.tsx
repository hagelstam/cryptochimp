import { Skeleton } from '@/components/Skeleton';
import { getCurrentUser } from '@/lib/auth';
import { Bold, Card, Title } from '@tremor/react';
import { Suspense } from 'react';
import { ThemeSelect } from './ThemeSelect';
import { UserProfile } from './UserProfile';

export default async function Settings() {
  const user = await getCurrentUser();

  return (
    <Card className="flex w-full justify-center lg:py-12">
      <div className="flex w-full max-w-xl flex-col justify-center gap-6">
        <Title>Account settings</Title>
        <div className="flex flex-col gap-4">
          <Suspense
            fallback={
              <>
                <Skeleton className="h-[72px] w-full" />
                <Skeleton className="h-[72px] w-full" />
              </>
            }
          >
            <UserProfile name={user?.name ?? ''} email={user?.email ?? ''} />
          </Suspense>
          <div className="flex flex-col gap-2">
            <Bold className="font-medium">Theme</Bold>
            <ThemeSelect />
          </div>
        </div>
      </div>
    </Card>
  );
}
