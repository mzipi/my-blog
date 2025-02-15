import { NextRequest, NextResponse } from 'next/server';
import clientPromise from 'app/lib/mongo';

type Props = {
    params: Promise<{
        tag: string
    }>
}

export async function GET(req: NextRequest, props: Props) {
    const params = await props.params;
    const { tag } = params;

    const client = await clientPromise;
    const db = client.db("my-blog");

    const posts = await db.collection("entries").find({ tags: { $in: [tag] } }).toArray();

    return NextResponse.json(posts);
}
