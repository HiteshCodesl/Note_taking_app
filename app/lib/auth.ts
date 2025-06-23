import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prismaClient } from "../../prisma/src/index"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "email",
            credentials: {
                email: {
                    label: "email",
                    type: "email"
                },
                password: {
                    label: "password",
                    type: "password"
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await prismaClient.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                })

                if (!user || !user?.password) return null;

                const isValidPassword = await compare(credentials.password, user?.password)

                if (!isValidPassword) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name
                };
            }
        })
    ],
    session: {
        strategy: "jwt"
    },

    callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id; 
      return token;
    },
    async session({ session, token }){
      if (session.user && token.id) {
        session.user.id = token.id as string; 
      }
      return session;
    },
  },

   secret: process.env.NEXTAUTH_SECRET,
}
