import NextAuth from "next-auth/next"
import { nextAuthOptions } from "@/app/_server/utils/auth"


const handler = NextAuth(nextAuthOptions)

export { 
  handler as GET,
  handler as POST
}