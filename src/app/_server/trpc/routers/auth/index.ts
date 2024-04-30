import { 
  procedure, 
  router } from "../..";
import { 
  registerHandler, 
  validateHandler } from "../../controllers/auth";
import { registerSchema } from "./schema";


export const authRouter = router({
  register: procedure
    .input(registerSchema)
    .mutation(({ input }) => registerHandler(input)),
  validate: procedure
    .input(registerSchema)
    .query(({ input }) => validateHandler(input))
})