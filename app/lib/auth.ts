import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret_key";

export function generateToken(userId: string, role: string) {
    return jwt.sign({ userId, role }, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET) as JwtPayload;
    } catch {
        return null;
    }
}