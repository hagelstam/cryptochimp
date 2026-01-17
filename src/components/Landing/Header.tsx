import { SignInButton } from '@/components/SigninButton';
import { UserMenu } from '@/components/UserMenu';
import { getCurrentUser } from '@/lib/auth';
import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-950">
      <div className="container flex h-14 items-center">
        <HeaderLogo />
        <HeaderUserSection />
      </div>
    </header>
  );
};

const HeaderLogo = async () => {
  'use cache';
  cacheLife('weeks');

  return (
    <div className="flex gap-4">
      <Link
        href="/"
        className="flex items-center justify-start"
        aria-label="CryptoChimp home"
      >
        <Image
          src="/text-logo.svg"
          alt="CryptoChimp"
          width={190}
          height={32}
          priority
        />
      </Link>
    </div>
  );
};

const HeaderUserSection = async () => {
  const user = await getCurrentUser();

  return (
    <nav
      className="ml-auto flex items-center gap-4"
      aria-label="Main navigation"
    >
      {user ? <UserMenu user={user} /> : <SignInButton size="sm" />}
    </nav>
  );
};
