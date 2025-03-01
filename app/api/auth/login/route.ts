import { NextRequest, NextResponse } from "next/server"; 
import connectToDatabase from "@/lib/mongo";
import { User } from "@/models/users";
import { compare } from "bcrypt";
import { generateToken } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Faltan credenciales" }, { status: 400 });
        }

        const user = await User.findOne({ email }) as { _id: string, password: string, role: string };

        if (!user) {
            return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
        }

        const token = generateToken(user._id, user.role);

        const tokenCookie = serialize("token", token, {
            // httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600,
            path: "/",
            sameSite: "strict",
        });

        return new NextResponse(JSON.stringify({ message: "Login exitoso", role: user.role }), {
            status: 200,
            headers: { "Set-Cookie": `${tokenCookie}` },
        });
    } catch (error) {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}