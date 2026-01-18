'use client';

import { SignInButton } from '@/components/SigninButton';
import { User } from '@/types';
import dynamic from 'next/dynamic';

const UserMenu = dynamic(
  () =>
    import('@/components/UserMenu').then((mod) => ({ default: mod.UserMenu })),
  { ssr: false }
);

export const HeaderUserSection = ({ user }: { user: User | undefined }) => {
  return (
    <nav
      className="ml-auto flex items-center gap-4"
      aria-label="Main navigation"
    >
      {user ? <UserMenu user={user} /> : <SignInButton size="sm" />}
    </nav>
  );
};
