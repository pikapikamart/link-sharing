import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";


export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          ...credentials,
          name: "",
        }

        return user;
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
  },
  pages: {
    signIn: "/auth/credentials-signin"
  },
}


const handler = NextAuth(nextAuthOptions)

export { 
  handler as GET,
  handler as POST
}