import { prismaClient } from "../../../../prisma/src/index";
import { NextRequest, NextResponse } from "next/server";
import {hash} from "bcrypt"
 
export async function POST(req: NextRequest){
    const {name, email, password} = await req.json();

    const userExists = await prismaClient.user.findUnique({
         where: {
            email: email
         }
    })
    if(userExists){
        return NextResponse.json("already user, try signin")
    }
    const hashedPassword = await hash(password, 10)
    const user = await prismaClient.user.create({
       data: 
       {
        name: name,
        email: email,
        password: hashedPassword
       }
    })
    if(user){
        return NextResponse.json(user)
    }
}