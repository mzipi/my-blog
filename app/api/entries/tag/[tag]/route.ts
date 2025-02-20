import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import { Entry } from "@/models/entries";

export async function GET(req: NextRequest, { params }: { params: { tag: string } }) {
    await connectToDatabase();

    const posts = await Entry.find({ tags: params.tag });
    if (!posts.length) {
        return NextResponse.json({ error: "No hay posts con esta etiqueta" }, { status: 404 });
    }

    return NextResponse.json(posts, { status: 200 });
}