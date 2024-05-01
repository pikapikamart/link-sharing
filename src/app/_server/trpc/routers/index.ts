import { router } from "..";
import { authRouter } from "./auth";
import { linksRouter } from "./links";
import { userRouter } from "./user";


export const appRouter = router({
  auth: authRouter,
  links: linksRouter,
  user: userRouter
})

export type AppRouter = typeof appRouter