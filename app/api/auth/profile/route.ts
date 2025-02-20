import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "app/lib/mongo";
import { User } from "@/app/models/users";
import { verifyToken } from "app/lib/auth";
import { hash } from "bcrypt";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const token = req.cookies.get("token")?.value;
        if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const decoded = verifyToken(token);
        if (!decoded) return NextResponse.json({ error: "Token inválido" }, { status: 401 });
        const user = await User.findById(decoded.userId).select("username email");

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener perfil" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectToDatabase();
        const token = req.cookies.get("token")?.value;
        if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const decoded = verifyToken(token);
        if (!decoded) return NextResponse.json({ error: "Token inválido" }, { status: 401 });
        const { username, email, password } = await req.json();

        const updateData: any = { username, email };
        if (password) {
            updateData.password = await hash(password, 10);
        }

        await User.findByIdAndUpdate(decoded.userId, updateData);

        return NextResponse.json({ message: "Perfil actualizado" });
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 });
    }
}