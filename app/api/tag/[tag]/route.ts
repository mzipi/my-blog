import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "app/lib/mongo";
import { Entry } from "@/app/models/entries";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tag = searchParams.get('tag');

        await connectToDatabase();

        const posts = await Entry.find({ tags: tag });

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}