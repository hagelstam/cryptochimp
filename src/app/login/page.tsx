import { SignInButton } from '@/components/SigninButton';
import { getCurrentUser } from '@/lib/auth';
import { Card } from '@tremor/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login',
};

export default async function Login() {
  const user = await getCurrentUser();
  if (user) {
    redirect('/dashboard');
  }

  return (
    <main
      id="main-content"
      className="flex h-screen w-full items-center justify-center px-6"
    >
      <Card className="flex max-w-xl flex-col items-center justify-center">
        <Image src="/logo.svg" alt="CryptoChimp logo" width={48} height={48} />
        <h1 className="mt-6 text-center text-2xl font-bold">Welcome</h1>
        <p className="mb-10 mt-3 text-center text-sm text-gray-500">
          Sign in to your account with Google.
        </p>
        <SignInButton size="xl" />
      </Card>
    </main>
  );
}
