import { Footer } from '@/components/Landing/Footer';
import { Header, HeaderSkeleton } from '@/components/Landing/Header';
import { LinkButton } from '@/components/Landing/LinkButton';
import { StarBadge } from '@/components/Landing/StarBadge';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';

const GITHUB_REPO_LINK = 'https://github.com/hagelstam/cryptochimp';
const GITHUB_PROFILE_LINK = 'https://github.com/hagelstam';

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <Hero />
      <Footer profileLink={GITHUB_PROFILE_LINK} repoLink={GITHUB_REPO_LINK} />
    </div>
  );
}

const Hero = async () => {
  'use cache';
  cacheLife('days');

  return (
    <main id="main-content" className="flex-1">
      <section
        className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32"
        aria-labelledby="hero-heading"
      >
        <div className="container flex max-w-5xl flex-col items-center gap-8 text-center">
          <Suspense
            fallback={
              <div className="rounded-2xl bg-tremor-brand/20 px-4 py-1.5 text-sm font-medium">
                Loading...
              </div>
            }
          >
            <StarBadge repoLink={GITHUB_REPO_LINK} />
          </Suspense>
          <h1
            id="hero-heading"
            className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Mock cryptocurrency trading platform
          </h1>
          <p className="max-w-2xl leading-normal text-gray-600 dark:text-gray-400 sm:text-xl sm:leading-8">
            Start with a balance of 10 000 € and learn as you buy, sell, and
            manage digital assets. Master the market and elevate your trading
            expertise.
          </p>
          <div className="mt-2 space-x-4">
            <LinkButton
              href="/dashboard"
              className="bg-tremor-brand text-gray-50 hover:bg-blue-500/90 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-gray-100/90"
            >
              Get started
            </LinkButton>
            <LinkButton
              href={GITHUB_REPO_LINK}
              className="border border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900"
              newTab
            >
              GitHub
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
};
