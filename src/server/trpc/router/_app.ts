import { router } from "../trpc";
import { userRouter } from "./user";
import { campaignRouter } from "./campaign";

export const appRouter = router({
  user: userRouter,
  campaign: campaignRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
