import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "../../../prisma/src/index";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({error: "unauthorized"}, {status: 401});

    const notes = await prismaClient.notes.findMany({
        where: {
            userId: session.user.id
        },
    })
    return NextResponse.json(notes);
}

export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({error: "unauthorized"}, {status: 401})

    const {title, completed} = await req.json();

    const note = await prismaClient.notes.create({
        data: {
            title,
            completed,
            userId: session.user.id
        }
    })
     return NextResponse.json(note, {status: 201})    
}