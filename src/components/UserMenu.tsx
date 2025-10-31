'use client';

import { Skeleton } from '@/components/Skeleton';
import { User } from '@/types';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { ChevronDownIcon, PowerIcon } from '@heroicons/react/24/solid';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export const UserMenu = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex max-w-xs items-center space-x-1 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
        {user.image ? (
          <Image
            className="size-7 rounded-full"
            src={user.image}
            alt="User"
            width={28}
            height={28}
          />
        ) : (
          <Skeleton className="size-7 rounded-full" />
        )}
        <ChevronDownIcon className="size-5" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 text-sm shadow dark:divide-gray-800 dark:border dark:border-gray-800 dark:bg-gray-900">
          <MenuItem>
            <div className="px-4 py-2">
              <p className="block truncate">{user.name}</p>
              <p className="block truncate font-medium">{user.email}</p>
            </div>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              onClick={async () => {
                const data = await signOut({
                  redirect: false,
                  callbackUrl: '/',
                });
                router.push(data.url);
              }}
              className="w-full px-2 py-1"
            >
              <div className="group flex items-center rounded-md px-2 py-1 text-red-500 hover:bg-red-500/10">
                <PowerIcon className="mr-2 size-5" />
                Logout
              </div>
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
