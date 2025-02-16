import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "app/lib/mongo";
import { verifyToken } from "app/lib/auth";
import { Comment } from "@/app/models/comments";
import { User } from "@/app/models/users";

export async function POST(req: NextRequest) {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        await connectToDatabase();
        const decodedToken = await verifyToken(token);

        if (!decodedToken || typeof decodedToken === "string") {
            return NextResponse.json({ error: "Token inválido" }, { status: 401 });
        }

        const userId = decodedToken.userId;
        const { postId, content } = await req.json();

        if (!postId || !content) {
            return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
        }

        const newComment = new Comment({ postId, content, userId, createdAt: new Date() });
        await newComment.save();

        return NextResponse.json({ message: "Comentario agregado" }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 403 });
        }
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return NextResponse.json({ error: "Falta postId" }, { status: 400 });
    }

    try {
        await connectToDatabase();
        const comments = await Comment.find({ postId }).exec();

        const commentsWithUsername = await Promise.all(
            comments.map(async (comment) => {
                const user = await User.findById(comment.userId).exec();
                return {
                    ...comment.toObject(),
                    username: user ? user.username : "Desconocido",
                };
            })
        );

        return NextResponse.json(commentsWithUsername);
    } catch (error) {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
