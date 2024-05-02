import { 
  procedure, 
  router } from "../..";
import { profileHandler } from "../../controllers/user";
import { isAuthenticatedUser } from "../../middlewares/user";


const authProcedure = procedure.use(isAuthenticatedUser)

export const userRouter = router({
  profile: authProcedure
    .query(({ ctx }) => profileHandler(ctx))
})