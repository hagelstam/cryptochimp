import { HeaderUserSection } from '@/components/Landing/HeaderUserSection';
import { getCurrentUser } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

export const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-950">
      <div className="container flex h-14 items-center">
        <HeaderLogo />
        <HeaderUserSection user={user} />
      </div>
    </header>
  );
};

export const HeaderSkeleton = () => (
  <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-950">
    <div className="container flex h-14 items-center">
      <HeaderLogo />
      <nav className="ml-auto flex items-center gap-4">
        <div className="h-8 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
      </nav>
    </div>
  </header>
);

const HeaderLogo = () => (
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
