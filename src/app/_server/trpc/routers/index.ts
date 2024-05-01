import { router } from "..";
import { authRouter } from "./auth";
import { linksRouter } from "./links";


export const appRouter = router({
  auth: authRouter,
  links: linksRouter
})

export type AppRouter = typeof appRouter