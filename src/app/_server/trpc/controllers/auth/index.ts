import { db } from "@/app/_server/database";
import { RegisterSchema } from "../../routers/auth/schema";
import { user } from "@/app/_server/database/schema";
import { eq, like } from "drizzle-orm";
import bcrypt from "bcrypt"
import { 
  trpcError, 
  trpcSuccess } from "../../utils";


export const registerHandler = async(input: RegisterSchema) =>{
  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, input.email)
  })
  const usersWithTheSameUsername = await db.query.user.findMany({
    where: like(user.username, `%${ input.email.split("@")[0] }%`)
  })

  if ( !existingUser ) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(input.password, salt);

    await db.insert(user).values({
      email: input.email,
      password: hash,
      username: `${ input.email.split("@")[0] }${ usersWithTheSameUsername.length>=1? usersWithTheSameUsername.length : "" }`
    })

    return trpcSuccess("Successfully created account", {})
  }
  
  return trpcError("BAD_REQUEST", "email:Email already exist")
}

export const validateHandler = async(input: RegisterSchema) =>{
  const foundUser = await db.query.user.findFirst({
    where: eq(user.email, input.email)
  })
  
  if ( !foundUser ) {

    return trpcError("NOT_FOUND", "email:No email found")
  }

  if ( !(await bcrypt.compare(input.password, foundUser.password)) ) {

    return trpcError("BAD_REQUEST", "password:Password does not match")
  }

  return trpcSuccess("Authenticated", {})
}