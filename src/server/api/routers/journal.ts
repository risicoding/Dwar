import { createTRPCRouter, privateProcedure } from '../trpc';
import { db } from '@/server/db';
import { TRPCError } from '@trpc/server';
import { journalSchema } from '@/schema';

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
        if (err instanceof Error)
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: err.message,
          });
      }
    }),
});
