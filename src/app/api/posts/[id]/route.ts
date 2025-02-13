import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: Record<string, string> }) {
    try {
        const client = await clientPromise;
        const db = client.db("my-blog");

        const { id } = params;
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        const post = await db.collection("entries").findOne({ _id: new ObjectId(id) });

        if (!post) {
            return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error al obtener el post:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

/*
export async function getSortedPostsData(): Promise<any> {
    try {
        await client.connect();
        const db = client.db('my-blog');
        const collection = db.collection('post').find();
        return collection.toArray();
    } catch(e) {
        console.error(e);
    }
}

export async function postData(data: {title: string; post: string; tag: string}): Promise<void> {
    try {
        await client.connect();
        const db = client.db('my-blog');
        const collection = db.collection('post');
        await collection.insertOne(data);
    } catch (e) {
        console.error(e);
    } 
}

export async function getPost(id: string) {
    try {
        await client.connect();
        const db = client.db('my-blog');
        const collection = await db.collection('post').findOne({_id: new ObjectId(id)});
        return collection;
    } catch (e) {
        console.error(e);
    }
}

export default getPost;


// ----------------------------------------------------------------------------


export async function PUT(): Promise<NextResponse> {
    // editar post
    return NextResponse.json({ res: 200 });
}

export async function DELETE(): Promise<NextResponse> {
    // eliminar post
    return NextResponse.json({ res: 200 });
}
    */