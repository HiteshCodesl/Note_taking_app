import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "../../../../prisma/src/index";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { noteId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
    }
    const note = await prismaClient.notes.findUnique({
        where: {
            userId: session.user.id,
            noteId: params.noteId
        }
    })
    if (!note) {
        return NextResponse.json({ error: "note not find" }, { status: 401 })
    }
    return NextResponse.json(note);
}

export async function PUT(req: Request, { params }: { params: { noteId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { title, completed } = await req.json()
    const updatedNote = await prismaClient.notes.update({
        where: {
            noteId: params.noteId,
        },
        data: {
            title: title,
            completed: completed
        }
    })
    return NextResponse.json(updatedNote);
}

export async function DELETE(_: Request, { params }: { params: { noteId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await prismaClient.notes.delete({
        where: {
            noteId: params.noteId
        }
    })
    return NextResponse.json({ success: true })
}