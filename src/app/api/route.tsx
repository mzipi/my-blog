import { NextResponse } from 'next/server';
import { getSortedPostsData, postData } from "../lib/db-connection";

export async function GET(): Promise<NextResponse> {
    const res = await getSortedPostsData();
    return NextResponse.json(res);
}

export async function POST(req: Request): Promise<NextResponse> {
    const res = await req.json();
    await postData(res);
    return NextResponse.json({ res: 200 });
}

export async function PUT(): Promise<NextResponse> {
    return NextResponse.json({ res: 200 });
}

export async function DELETE(): Promise<NextResponse> {
    return NextResponse.json({ res: 200 });
}