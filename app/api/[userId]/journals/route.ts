import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import {db} from "@/lib/db";

export async function POST(req:Request) {
    try {
        const {userId} = auth();
        const body = await req.json();

        const {title, content} = body;

        if (!userId) return new NextResponse("Unauthorized", {status: 401});

        if (!title || !content) return new NextResponse("Missing title or content", {status: 400});

        const journal = await db.journal.create({
            data: {
                title,
                content,
                userId
            }
        });

        return NextResponse.json(journal);
    } catch (error) {
        console.error("JOURNAL_POST", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}

export async function GET(req:Request) {
    try {
        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthorized", {status: 401});

        const journals = await db.journal.findMany({
            where: {
                userId
            }
        });

        return NextResponse.json(journals);
    } catch (error) {
        console.error("JOURNAL_GET", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}