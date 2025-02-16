import { NextResponse } from 'next/server';
import connectToDatabase from 'app/lib/mongo';
import { Entry } from "@/app/models/entries";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();

        if (!body.title || !body.content || !body.tags) {
            return NextResponse.json({ error: "Faltan campos requeridos (title, content o tags)" }, { status: 400 });
        }


        const newEntry = new Entry(body);
        await newEntry.save();

        return NextResponse.json({ message: "Post creado", id: newEntry._id }, { status: 201 });
    } catch (error) {
        console.log("Error al insertar:", error);
        return NextResponse.json({ error: "Error al crear el post" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDatabase();

        const posts = await Entry.find({});

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.log("Error al obtener posts:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}