import { NextResponse } from 'next/server';
import clientPromise from "@/app/lib/mongo";
import { ObjectId } from "mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Desestructuramos el id del objeto params
    try {
        const client = await clientPromise; // Esperamos a que se resuelva la promesa del cliente
        const db = client.db('my-blog'); // Nombre de tu base de datos
        const collection = await db.collection('post').findOne({ _id: new ObjectId(id) });
        
        if (!collection) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(collection, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
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
*/


                
/*
export async function POST(req: Request): Promise<NextResponse> {
    const res = await req.json();
    await postData(res);
    return NextResponse.json({ res: 200 });
}

export async function PUT(): Promise<NextResponse> {
    // editar post
    return NextResponse.json({ res: 200 });
}

export async function DELETE(): Promise<NextResponse> {
    // eliminar post
    return NextResponse.json({ res: 200 });
}
    */