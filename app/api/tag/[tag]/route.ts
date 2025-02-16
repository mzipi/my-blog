import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "app/lib/mongo";
import { Entry } from "@/app/models/entries";

type Props = {
    params: {
        tag: string;
    };
};

export async function GET(req: NextRequest, { params }: Props) {
    try {
        await connectToDatabase();

        const posts = await Entry.find({ tags: params.tag });

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}