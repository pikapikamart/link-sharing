import { middleware } from "..";
import { trpcError } from "../utils";


export const isAuthenticatedUser = middleware(async({ ctx, next }) =>{
  
  if ( ctx.session===null ) {

    return trpcError("UNAUTHORIZED", "Please login first")
  }

  return next({
    ctx: {
      ...ctx
    }
  })
})