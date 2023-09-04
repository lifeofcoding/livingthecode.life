import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server";
import { env } from "@/env.mjs";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: env.NEXT_PUBLIC_APP_URL + "/api/trpc",
    }),
  ],
});
