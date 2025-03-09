import { createTRPCRouter, privateProcedure } from '../trpc';
import { db } from '@/server/db';
import { TRPCError } from '@trpc/server';
import { journalSchema } from '@/schema';
import { z } from 'zod';

export const journalRouter = createTRPCRouter({
  create: privateProcedure
    .input(journalSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;

      try {
        const res = await db.journal.create({
          data: {
            userId,
            entries: {
              create: input.entries?.map((entry) => {
                return { ...entry, userId };
              }),
            },
          },
          include: { entries: true },
        });

        return { res };
      } catch (err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: (err as Error).message,
        });
      }
    }),
  fetchAll: privateProcedure
    .input(z.object({ entries: z.boolean() }).default({ entries: true }))
    .query(async ({ ctx, input }) => {
      try {
        const res = await ctx.db.journal.findMany({
          where: { userId: ctx.session.userId },
          include: { entries: input.entries },
        });
        return { res };
      } catch (err) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: (err as Error).message,
        });
      }
    }),

  fetchById: privateProcedure
    .input(z.object({ id: z.number(), entries: z.boolean().default(true) }))
    .query(async ({ ctx, input }) => {
      try {
        const res = await ctx.db.journal.findUnique({
          where: { id: input.id, userId: ctx.session.userId },
          include: {
            entries: true,
          },
        });
        return { res };
      } catch (err) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: (err as Error).message,
        });
      }
    }),
  fetchInfinite: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.number(),
        entries: z.boolean().default(true),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, entries } = input;
      try {
        const res = await ctx.db.journal.findMany({
          where: {
            userId: ctx.session.userId,
          },
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            createdAt: 'desc',
          },
          include: { entries },
        });

        let nextCursor: number | undefined = undefined;

        if (res.length > limit) {
          const nextItem = res.pop();
          nextCursor = nextItem!.id;
        }

        return { res, nextCursor };
      } catch (err) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: (err as Error).message,
        });
      }
    }),
});
