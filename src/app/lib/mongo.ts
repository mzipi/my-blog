import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.DB_URL;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error("Por favor, añade la variable DB_URL a tu archivo .env.local");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;