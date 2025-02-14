import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongo';

type Props = {
    params: Promise<{
        id: string
    }>
}

export async function GET(req: NextRequest, props: Props) {
    try {
        const client = await clientPromise;
        const db = client.db("my-blog");
        const params = await props.params

        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ error: "Invalid ObjectId format" }, { status: 400 });
        }

        const post = await db.collection("entries").findOne({ _id: new ObjectId(params.id) });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}