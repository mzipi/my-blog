import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import { Entry } from "@/models/entries";

type Props = {
    params: Promise<{
        tag: string
    }>
}

export async function GET(req: NextRequest, props: Props) {
    await connectToDatabase();

    const params = await props.params;
    const posts = await Entry.find({ tags: params.tag });
    
    if (!posts.length) {
        return NextResponse.json({ error: "No hay posts con esta etiqueta" }, { status: 404 });
    }

    return NextResponse.json(posts, { status: 200 });
}