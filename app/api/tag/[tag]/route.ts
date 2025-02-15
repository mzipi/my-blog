import { NextRequest, NextResponse } from 'next/server';
import clientPromise from 'app/lib/mongo';

export async function GET(req: NextRequest, { params }: { params: { tag: string } }) {
    const { tag } = params;

    const client = await clientPromise;
    const db = client.db("my-blog");

    const posts = await db.collection("entries").find({ tags: { $in: [tag] } }).toArray();

    return NextResponse.json(posts);
}
