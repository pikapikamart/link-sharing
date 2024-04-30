import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { db } from "@/app/_server/database";
import { eq } from "drizzle-orm";
import { users } from "@/app/_server/database/schema";
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
        
        const foundUser = await db.query.users.findFirst({
          where: eq(users.email, email)
        })

        if ( !foundUser || ( foundUser && await bcrypt.compare(foundUser.password, password) ) ) {
          
          return Promise.reject(new Error("Authentication failed. Invalid credentials"))
        }
        
        const user = {
          email: foundUser.email,
          id: `${ foundUser.id }`,
          name: ""
        }

        return user
      }
    })
  ],
  callbacks: {
    jwt: async({ token, user }) => {

      if ( user ) {
        token.name = user.name;
        token.email = user.email;
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