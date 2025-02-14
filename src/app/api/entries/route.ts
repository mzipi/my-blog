import { NextResponse } from 'next/server';
import clientPromise from "@/app/lib/mongo";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.title || !body.post) {
            return NextResponse.json({ error: "Faltan campos requeridos (title o post)" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("my-blog");
        const result = await db.collection("entries").insertOne(body);

        return NextResponse.json({ message: "Post creado", id: result.insertedId }, { status: 201 });
    } catch (error) {
        console.log("Error al insertar:", error);
        return NextResponse.json({ error: "Error al crear el post" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("my-blog");
        const posts = await db.collection("entries").find({}).toArray();

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}