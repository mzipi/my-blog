import { NextRequest, NextResponse } from "next/server";
import clientPromise from "app/lib/mongo";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Faltan credenciales" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("my-blog");

        const user = await db.collection("users").findOne({ email });
        const secret = process.env.SECRET_KEY || "default_secret";

        if (!user) {
            return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: "1h" });

        return NextResponse.json({ token });
    } catch (error) {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}