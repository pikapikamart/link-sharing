import { db } from "@/app/_server/database";
import { Context } from "../../context";
import { eq } from "drizzle-orm";
import { user } from "@/app/_server/database/schema";
import { 
  trpcError, 
  trpcSuccess } from "../../utils";
import { ProfileSchema } from "../../routers/user/schema";


export const profileHandler = async(ctx: Context) =>{
  const foundUser = await db.query.user.findFirst({
    where: eq(user.email, ctx.token?.email as string),
    columns: {
      password: false
    },
    with: {
      links: true
    }
  })

  if ( !foundUser ) {

    return trpcError("FORBIDDEN", "Make sure to login first")
  }

  return trpcSuccess("Successfully queried profile", foundUser)
}

export const updateHandler = async(input: ProfileSchema, ctx: Context) =>{

  console.log(input)
}