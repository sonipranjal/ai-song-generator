import { authRouter } from "./router/auth";
import { replicateRouter } from "./router/replicate";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  replicate: replicateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
