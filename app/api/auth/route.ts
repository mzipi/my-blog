import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { User } from "@/models/users";

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

        return NextResponse.json({ role: decodedToken.role });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
