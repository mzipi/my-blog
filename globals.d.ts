import { MongoClient } from "mongodb";

declare global {
    namespace NodeJS {
        interface Global {
            mongoClientPromise: Promise<MongoClient> | undefined;
        }
    }
}

export {};
