import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "app/lib/mongo";
import { Entry } from "@/app/models/entries";
import { Types } from "mongoose";

type Props = {
    params: {
        id: string;
    };
};

export async function GET(req: NextRequest, { params }: Props) {
    try {
        await connectToDatabase();

        if (!Types.ObjectId.isValid(params.id)) {
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