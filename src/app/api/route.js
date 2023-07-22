import { NextResponse } from 'next/server'
import { getSortedPostsData, postData } from "../../lib/db-connection";
 
export async function GET() {

    const res = await getSortedPostsData()
 
    return NextResponse.json(res)
}

export async function POST(req) {
    const res = await req.json()
    await postData(res)
    return NextResponse.json({res: 200})
}

export async function PUT(req) {
    return NextResponse.json({res: 200})
}

export async function DELETE(req) {
    return NextResponse.json({res: 200})
}