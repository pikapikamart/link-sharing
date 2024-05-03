import { db } from "@/app/_server/database"
import { user } from "@/app/_server/database/schema"
import { eq } from "drizzle-orm"


export const getUserDevlink = async(username: string) =>{
  const foundUser = await db.query.user.findFirst({
    where: eq(user.username, username),
    columns: {
      password: false
    },
    with: {
      links: true
    }
  })

  if ( !foundUser ) return false
   
  return foundUser
}
