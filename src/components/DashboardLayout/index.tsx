import { UserMenu } from '@/components/UserMenu';
import { User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { MobileNav } from './MobileNav';
import { Sidebar } from './Sidebar';

export const DashboardLayout = ({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) => {
  return (
    <>
      <Sidebar />
      <main className="ml-0 min-h-full md:ml-64">
        <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="container flex h-14 items-center">
            <div className="flex gap-4">
              <MobileNav />
              <Link
                href="/dashboard"
                className="flex items-center justify-start"
              >
                <Image src="/logo.svg" alt="Logo" width={28} height={28} />
              </Link>
            </div>
            <nav className="ml-auto flex items-center">
              <UserMenu user={user} />
            </nav>
          </div>
        </header>
        <div className="container p-4 sm:p-6">{children}</div>
      </main>
    </>
  );
};
