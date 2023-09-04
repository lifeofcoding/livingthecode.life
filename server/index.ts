import jwt from "jsonwebtoken";
import { publicProcedure, router } from "./trpc";
import { env } from "@/env.mjs";

export const appRouter = router({
  getChatToken: publicProcedure.query(async () => {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour - 1681946664
      },
      env.JWT_SECRET
    );
    return token;
  }),
});

export type AppRouter = typeof appRouter;
