import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { journalId: string, userId: string, } }
) {
    try {
        const { userId } = auth();

        console.log(params)

        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

        if(!params.journalId) return new NextResponse("Journal ID is required", { status: 400 });

        const journal = await db.journal.delete({
            where: {
                id: params.journalId,
            },
        })

        return NextResponse.json(journal);
    } catch (error) {
        console.log('[JOURNAL_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { journalId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

        if(!params.journalId) return new NextResponse("Journal ID is required", { status: 400 });

        const journal = await db.journal.findUnique({
            where: {
                id: params.journalId,
            },
        })

        return NextResponse.json(journal);
    } catch (error) {
        console.log('[JOURNAL_GET]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: { journalId: string }, }
) {
    try {
        const { userId } = auth();
        const data = await req.json();

        if(!data.title) return new NextResponse("Title is required", { status: 400 });

        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

        if(!params.journalId) return new NextResponse("Journal ID is required", { status: 400 });

        const journal = await db.journal.updateMany({
            where: {
                id: params.journalId,
            },
            data: {
                title: data.title,
                content: data.content,
            },
        })

        return NextResponse.json(journal);
    } catch (error) {
        console.log('[JOURNAL_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}