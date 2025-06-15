import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import  {prismaClient}  from "../../../../prisma/src/index"
import { compare } from "bcrypt";

const handler = NextAuth({
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
        async authorize(credentials){
         if(!credentials?.email || !credentials?.password)return null;
           const user = await prismaClient.user.findUnique({
               where :{
                  email: credentials.email
               },
               })

             if(!user || !user?.password) return null;

             const isValidPassword = await compare(credentials.password, user?.password)

             if(!isValidPassword) return null;

             return user;
             }
          })
       ],
})

export const GET = handler;
export const POST = handler;