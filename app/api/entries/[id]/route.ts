import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import { Entry } from "@/models/entries";
import { ObjectId } from 'mongodb';

type Props = {
    params: Promise<{
        id: string
    }>
}

export async function GET(req: NextRequest, props: Props) {
    try {
        await connectToDatabase();
        const params = await props.params;

        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ error: "Invalid ObjectId format" }, { status: 400 });
        }

        const post = await Entry.findById(params.id);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}