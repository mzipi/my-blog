import { NextResponse } from 'next/server';
import clientPromise from 'app/lib/mongo';

export async function POST(req: Request) {
    const client = await clientPromise;
    const db = client.db("my-blog");
    const { postId, comment } = await req.json();

    await db.collection('comments').insertOne({ postId, comment });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const client = await clientPromise;
    const db = client.db("my-blog");

    if (!postId) return NextResponse.json({ error: "postId es requerido" }, { status: 400 });

    const comments = await db.collection("comments").find({ postId }).toArray();

    return NextResponse.json(comments);
}