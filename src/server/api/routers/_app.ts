import { db } from "@/server/db";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(async (opts) => {
    console.log(opts.ctx.userId);
    return {message:'hello'}
  }),

  protectedHello:privateProcedure.query(async(opts)=>{
    console.log(opts.ctx.userId)
    const res = await db.entries.findMany();
    return { status: "success", res };
  })
});
