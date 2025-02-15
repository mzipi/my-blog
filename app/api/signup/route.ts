import { NextRequest, NextResponse } from "next/server";
import clientPromise from "app/lib/mongo";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const client = await clientPromise;
        const db = client.db("my-blog");

        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        await db.collection("users").insertOne({ email, password: hashedPassword });

        return NextResponse.json({ message: "Usuario registrado con éxito" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}