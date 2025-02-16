import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "tu_uri_de_mongodb_aqui";

if (!MONGODB_URI) {
    throw new Error("Por favor define la variable de entorno MONGODB_URI");
}

interface GlobalWithMongo extends globalThis.Global {
    mongo: { conn: mongoose.Connection | null, promise: Promise<mongoose.Connection> | null };
}

declare const global: GlobalWithMongo;

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 20000,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;
