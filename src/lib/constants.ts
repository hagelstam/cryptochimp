import {
  ArrowPathRoundedSquareIcon,
  ArrowTrendingUpIcon,
  Cog6ToothIcon,
  RectangleGroupIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

export const INITIAL_CAPITAL = 10_000;

export const LOGIN_URL = '/login';

export const IS_PROD = process.env.NODE_ENV === 'production';

export const Icons = {
  market: ArrowTrendingUpIcon,
  dashboard: RectangleGroupIcon,
  transactions: ArrowPathRoundedSquareIcon,
  trade: ShoppingCartIcon,
  settings: Cog6ToothIcon,
};

type NavLink = { label: string; href: string; icon: keyof typeof Icons };

export const navLinks: NavLink[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  {
    label: 'Transactions',
    href: '/dashboard/transactions',
    icon: 'transactions',
  },
  { label: 'Market', href: '/dashboard/market', icon: 'market' },
  { label: 'Trade', href: '/dashboard/trade', icon: 'trade' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'settings' },
];
