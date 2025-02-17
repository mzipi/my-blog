import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "app/lib/auth";
import { User } from "app/models/users";

export async function GET(req: NextRequest) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    
    if (!token) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const decodedToken = verifyToken(token);
        if (!decodedToken || typeof decodedToken === "string") {
            return NextResponse.json({ error: "Token inválido" }, { status: 403 });
        }

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ role: user.role });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
