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