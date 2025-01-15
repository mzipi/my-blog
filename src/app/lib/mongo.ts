import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGO_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error("Por favor, añade la variable MONGO_URI a tu archivo .env.local");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;