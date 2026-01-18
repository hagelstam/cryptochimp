'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ElementType } from 'react';

interface SignInButtonProps {
  size?: 'sm' | 'xl';
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  xl: 'px-6 py-3 text-base',
};

export const SignInButton = ({ size = 'sm' }: SignInButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        const data = await signIn('google', {
          redirect: false,
          callbackUrl: '/dashboard',
        });
        router.push(data?.url ?? '/');
      }}
      className={`inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 ${sizeClasses[size]}`}
    >
      <GoogleIcon />
      Sign in with Google
    </button>
  );
};

const GoogleIcon: ElementType = () => {
  return (
    <svg
      className="mr-2 size-4"
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  );
};
