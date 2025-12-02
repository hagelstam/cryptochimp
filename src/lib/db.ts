import { IS_PROD } from '@/lib/constants';
import { PrismaClient } from '@/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: IS_PROD ? ['error'] : ['error', 'warn'],
  });

if (IS_PROD) globalForPrisma.prisma = prisma;
