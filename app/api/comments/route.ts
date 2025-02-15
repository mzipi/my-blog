import { NextRequest, NextResponse } from "next/server";
import clientPromise from "app/lib/mongo";
import { verifyToken } from "app/lib/auth";

export async function POST(req: NextRequest) {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const userId = await verifyToken(token);
        
        const { postId, content } = await req.json();
        if (!postId || !content) {
            return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("my-blog");

        const newComment = { postId, content, userId, createdAt: new Date() };
        await db.collection("comments").insertOne(newComment);

        return NextResponse.json({ message: "Comentario agregado" }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 403 });
        }
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return NextResponse.json({ error: "Falta postId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("my-blog");

    const comments = await db.collection("comments").find({ postId }).toArray();

    return NextResponse.json(comments);
}