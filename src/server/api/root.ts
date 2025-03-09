import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';
import { entriesRouter } from './routers/entries';
import { journalRouter } from './routers/journal';

export const appRouter = createTRPCRouter({
  entries: entriesRouter,
  journal: journalRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
