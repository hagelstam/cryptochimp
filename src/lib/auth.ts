import { LOGIN_URL } from '@/lib/constants';
import { prisma } from '@/lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cache } from 'react';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: LOGIN_URL,
  },
  theme: {
    colorScheme: 'light',
    brandColor: '#3b82f6',
    logo: '/logo.svg',
  },
};

export const getCurrentUser = cache(async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
});
