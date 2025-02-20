import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from 'app/lib/mongo';
import { Entry } from "@/app/models/entries";
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ObjectId format" }, { status: 400 });
        }

        const post = await Entry.findById(id);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}