import { NextRequest, NextResponse } from "next/server"; 
import connectToDatabase from "app/lib/mongo";
import { User } from "@/app/models/users";
import { compare } from "bcrypt";
import { generateToken } from "app/lib/auth";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Faltan credenciales" }, { status: 400 });
        }

        const user = await User.findOne({ email }) as { _id: string, password: string, role: string }; // Asegúrate de que el rol esté incluido

        if (!user) {
            return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
        }

        const token = generateToken(user.role);

        return NextResponse.json({ token, role: user.role });
    } catch (error) {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}