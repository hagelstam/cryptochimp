import { SignInButton } from '@/components/SigninButton';
import { UserMenu } from '@/components/UserMenu';
import { getCurrentUser } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

export const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-950">
      <div className="container flex h-14 items-center">
        <div className="flex gap-4">
          <Link href="/" className="flex items-center justify-start">
            <Image src="/text-logo.png" alt="Logo" width={193} height={32} />
          </Link>
        </div>
        <nav className="ml-auto flex items-center gap-4">
          {user ? <UserMenu user={user} /> : <SignInButton size="sm" />}
        </nav>
      </div>
    </header>
  );
};
