"use server"
import { db } from "@/app/_server/database"
import { user } from "@/app/_server/database/schema"
import { profileSchema } from "@/app/_server/trpc/routers/user/schema"
import { eq } from "drizzle-orm"
import { Session } from "next-auth"


export const updateProfile = async(userSession: Session, form: FormData) =>{
  const input: {[k: string]: any} = {}
  
  for ( const [k, v] of form.entries()) {
    input[k] = v
  }

  if ( !userSession.user ) {

    return {
      error: true,
      data: "user:Login first"
    }
  }

  const validatedFields = profileSchema.safeParse(input)

  if ( !validatedFields.success ) {

    return {
      error: true,
      data: validatedFields.error.flatten().fieldErrors
    }
  }

  const foundUser = await db.query.user.findFirst({
    where: eq(user.email, userSession.user?.email as string)
  })

  if ( !foundUser ) {

    return {
      error: true,
      data: "user:Login first"
    }
  }
  
  await db.update(user).set({
    firstName: validatedFields.data.firstname,
    lastName: validatedFields.data.lastname
  }).where(eq(user.id, foundUser.id))

  return {
    success: true,
    message: "Updated profile"
  }
}