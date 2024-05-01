import { 
  procedure, 
  router } from "../..";
import { 
  getHandler, 
  setHandler } from "../../controllers/links";
import { isAuthenticatedUser } from "../../middlewares/user";
import { linksSchema } from "./schema";


const authProcedure = procedure.use(isAuthenticatedUser)

export const linksRouter = router({
  set: authProcedure
    .input(linksSchema)
    .mutation(({input, ctx}) => setHandler(input, ctx)),
  get: authProcedure
    .query(({ ctx }) => getHandler(ctx))
})