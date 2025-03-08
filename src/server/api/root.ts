import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { entriesRouter } from "./routers/entries";

export const appRouter = createTRPCRouter({
  entries:entriesRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
