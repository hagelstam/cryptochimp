import { IS_PROD } from '@/lib/constants';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: IS_PROD ? ['error'] : ['error', 'warn'],
  });

if (IS_PROD) globalForPrisma.prisma = prisma;
