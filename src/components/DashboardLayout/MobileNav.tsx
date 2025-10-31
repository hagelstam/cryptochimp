'use client';

import { Icons, navLinks } from '@/lib/constants';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const MobileNav = () => {
  const path = usePathname();

  return (
    <div className="relative">
      <Menu>
        <MenuButton className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden">
          {({ active }) => (
            <>
              <XMarkIcon className={clsx(active ? 'block size-6' : 'hidden')} />
              <Bars2Icon className={clsx(active ? 'hidden' : 'block size-6')} />
            </>
          )}
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom"
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right space-y-1 rounded-md bg-white px-2 pb-3 pt-2 shadow dark:bg-gray-900 sm:px-3"
        >
          {navLinks.map(({ label, href, icon }) => {
            const Icon = Icons[icon];

            return (
              <MenuItem key={label}>
                <Link
                  href={href}
                  className={clsx(
                    path === href
                      ? 'bg-blue-100 text-gray-950 dark:bg-blue-950 dark:text-gray-50'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                    'flex w-full flex-row items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200'
                  )}
                >
                  <Icon className="size-5" />
                  <span>{label}</span>
                </Link>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
};
