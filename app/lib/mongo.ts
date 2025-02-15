import { MongoClient } from "mongodb";

const uri = process.env.DB_URL;

if (!uri) {
    throw new Error("Por favor, añade la variable DB_URL a tu archivo .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
        maxPoolSize: 10,
    });
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;
export default clientPromise;
