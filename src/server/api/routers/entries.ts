import { createTRPCRouter, privateProcedure } from '../trpc';
import { entriesSchema } from '@/schema';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const entriesRouter = createTRPCRouter({
  create: privateProcedure
    .input(entriesSchema.merge(z.object({ journalId: z.number() })))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
      try {
        const res = await ctx.db.entries.create({ data: { ...input, userId } });

        return { res };
      } catch (err) {
        if (err instanceof Error)
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),
  fetchByJournalId: privateProcedure
    .input(z.object({ journalId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const res = await ctx.db.entries.findMany({
          where: { journalId: input.journalId },
        });

        return { res };
      } catch (err) {
        if (err instanceof Error) throw new TRPCError({ code: 'NOT_FOUND' });
      }
    }),
  fetchAll: privateProcedure.query(async ({ ctx }) => {
    try {
      const res = await ctx.db.entries.findMany({
        where: { userId: ctx.session.userId },
      });
      return { res };
    } catch (err) {
      if (err instanceof Error) throw new TRPCError({ code: 'NOT_FOUND' });
    }
  }),
});
