import { DashboardLayout } from '@/components/DashboardLayout';
import { getCurrentUser } from '@/lib/auth';
import { LOGIN_URL } from '@/lib/constants';
import { redirect } from 'next/navigation';

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect(LOGIN_URL);
  }

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
