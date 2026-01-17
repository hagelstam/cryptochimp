'use client';

import { Icons, navLinks } from '@/lib/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const path = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 z-20 hidden h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:block"
      aria-label="Sidebar navigation"
    >
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4">
        <Link
          href="/dashboard"
          className="whitespace-nowrap text-lg font-bold"
          aria-label="Go to dashboard home"
        >
          CryptoChimp
        </Link>
        <nav className="mt-8 size-full" aria-label="Dashboard navigation">
          <ul className="flex min-h-full flex-col items-start space-y-1 px-2">
            {navLinks.map(({ label, href, icon }) => {
              const Icon = Icons[icon];
              const isActive = path === href;

              return (
                <li key={label} className="w-full">
                  <Link
                    href={href}
                    className={clsx(
                      isActive
                        ? 'bg-blue-100 text-gray-950 dark:bg-blue-950 dark:text-gray-50'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'flex w-full flex-row items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
