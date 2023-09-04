import { initTRPC, TRPCError } from "@trpc/server";
import { authOptions } from "@/lib/auth";
import { type Session } from "next-auth";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth/next";
import { TRPCLink } from "@trpc/client";
import { AnyRouter } from "@trpc/server";
import { db } from "@/lib/db";

type CreateContextOptions = {
  session: Session | null;
};

export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  type Context = {
    session?: Session | null;
    db?: typeof db;
    links: TRPCLink<AnyRouter>[];
  };
  return {
    session: opts.session,
    db,
  } as Context;
};

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  //   const { req, res } = opts;

  // Get the session from the server using the getServerSession wrapper function
  const session = await getServerAuthSession();

  return createInnerTRPCContext({
    session,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create();

// const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
