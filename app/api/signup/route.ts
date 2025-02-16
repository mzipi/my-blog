import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "app/lib/mongo";
import { hash } from "bcrypt";
import { User } from "@/app/models/users";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        
        const { username, email, password, role = "user" } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();

        return NextResponse.json({ message: "Usuario registrado con éxito" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}