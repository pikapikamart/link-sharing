import { 
  procedure, 
  router } from "../..";
import { 
  registerHandler, 
  validateHandler } from "../../controllers/auth";
import { linksSchema } from "./schema";


export const linksRouter = router({
  set: procedure
    .input(linksSchema)
    .mutation(() => {})
})