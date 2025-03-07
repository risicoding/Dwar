import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { appRouter as _appRouter } from "./routers/_app";

export const appRouter = createTRPCRouter({
  post: _appRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
