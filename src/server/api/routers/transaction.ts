import type { Transaction } from "@prisma/client";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";
import { getPrice } from "@/server/common/getPrice";

export const transactionRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }): Promise<Transaction[]> => {
    const transactions = await ctx.prisma.transaction.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: ctx.session.user.id,
      },
    });
    return transactions;
  }),

  create: protectedProcedure
    .input(
      z.object({
        type: z.enum(["BUY", "SELL"]),
        quantity: z.number().optional(),
        symbol: z.string(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<Transaction> => {
      const { type, quantity } = input;
      const symbol = input.symbol.trim().toUpperCase();
      const userId = ctx.session.user.id;

      if (!quantity || quantity <= 0)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Quantity must be greater than 0",
        });

      const pricePerCoin = await getPrice(symbol);
      const total = quantity * pricePerCoin;

      if (type === "BUY") {
        const user = await ctx.prisma.user.findUniqueOrThrow({
          where: {
            id: userId,
          },
        });

        if (user.balance < total)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cannot afford purchase",
          });

        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            balance: {
              decrement: total,
            },
          },
        });
      }

      if (type === "SELL") {
        const transactionsForCoin = await ctx.prisma.transaction.findMany({
          where: {
            userId,
            symbol,
          },
          select: {
            quantity: true,
            type: true,
          },
        });

        const totalCoinsOwned = transactionsForCoin.reduce(
          (total, transaction) => {
            if (transaction.type === "BUY") {
              return total + transaction.quantity;
            }
            return total - transaction.quantity;
          },
          0
        );

        if (totalCoinsOwned < quantity)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not enough coins to sell",
          });

        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            balance: {
              increment: total,
            },
          },
        });
      }

      const transaction = await ctx.prisma.transaction.create({
        data: {
          type,
          quantity,
          symbol,
          pricePerCoin,
          userId,
        },
      });

      return transaction;
    }),
});
