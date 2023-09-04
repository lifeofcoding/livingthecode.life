import jwt from "jsonwebtoken";
import { publicProcedure, router } from "./trpc";
import { env } from "@/env.mjs";

export const appRouter = router({
  getChatToken: publicProcedure.query(async () => {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 10, // 10min
      },
      env.JWT_SECRET
    );
    return token;
  }),
});

export type AppRouter = typeof appRouter;
