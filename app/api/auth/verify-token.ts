import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "app/lib/auth";

export async function POST(req: NextRequest) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken || typeof decodedToken === "string") {
        return NextResponse.json({ error: "Token inválido" }, { status: 403 });
    }

    return NextResponse.json({ username: decodedToken.username });
}
