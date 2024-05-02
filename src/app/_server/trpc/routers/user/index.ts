import { 
  procedure, 
  router } from "../..";
import { 
  profileHandler, 
  updateHandler } from "../../controllers/user";
import { isAuthenticatedUser } from "../../middlewares/user";
import { profileSchema } from "./schema";


const authProcedure = procedure.use(isAuthenticatedUser)

export const userRouter = router({
  profile: authProcedure
    .query(({ ctx }) => profileHandler(ctx)),
  update: authProcedure
    .input(profileSchema)
    .mutation(({ input, ctx }) => updateHandler)
})