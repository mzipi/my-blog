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
        const db = client.db('my-blog');
        const collection = await db.collection('post').find().toArray();
        return collection.map(({ _id, title, post, tag }) => ({
            _id: _id.toString(),
            title,
            post,
            tag,
        }));
    } catch (e) {
        console.error(e);
    } 
}