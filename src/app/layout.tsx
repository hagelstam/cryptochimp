import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from 'react';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://cryptochimp.vercel.app'),
  title: {
    default: 'CryptoChimp - Cryptocurrency trading platform',
    template: '%s | CryptoChimp',
  },
  description: 'Practice cryptocurrency trading with virtual currency.',
  keywords: [
    'Crypto',
    'Cryptocurrency',
    'Crypto trading',
    'Bitcoin',
    'Ethereum',
    'Next.js',
    'React',
    'TailwindCSS',
  ],
  authors: [
    {
      name: 'Maximilian Hagelstam',
      url: 'https://maximilianhagelstam.com',
    },
  ],
  creator: 'Maximilian Hagelstam',
  publisher: 'Maximilian Hagelstam',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://cryptochimp.vercel.app',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-950 antialiased dark:bg-gray-950 dark:text-gray-50">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Suspense>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
