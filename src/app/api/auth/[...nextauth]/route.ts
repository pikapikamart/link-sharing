import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { db } from "@/app/_server/database";
import { eq } from "drizzle-orm";
import { user } from "@/app/_server/database/schema";
import bcrypt from "bcrypt"


export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { 
          label: "email", 
          type: "text" 
        },
        password: { 
          label: "password", 
          type: "password" 
        },
      },
      async authorize(credentials, req) {
        if ( !credentials || !credentials.email || !credentials.password ) {

          return Promise.reject(new Error("Invalid credentials. Make sure to have values"))
        }

        const { email, password } = credentials
        
        const foundUser = await db.query.user.findFirst({
          where: eq(user.email, email)
        })

        if ( !foundUser || ( foundUser && await bcrypt.compare(foundUser.password, password) ) ) {
          
          return Promise.reject(new Error("Authentication failed. Invalid credentials"))
        }
        
        const authUser = {
          email: foundUser.email,
          id: `${ foundUser.id }`,
          name: ""
        }

        return authUser
      }
    })
  ],
  callbacks: {
    jwt: async({ token, user }) => {

      if ( user ) {
        token.name = user.name
        token.email = user.email
        token.id = user.id
      }

      return token;
    },
    session: async({ session, token }) => {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
          id: token.id
        }
      }

      return newSession;
    }
  }
}

const handler = NextAuth(nextAuthOptions)

export { 
  handler as GET,
  handler as POST
}