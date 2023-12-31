import { MongoClient, ObjectId } from "mongodb";
import { DB_URL } from "../config";

export const client = new MongoClient(DB_URL);

export async function getSortedPostsData(): Promise<any> {
    try {
        await client.connect();
        const db = client.db('my-blog');
        const collection = db.collection('post').find();
        return collection.toArray();
    } catch(e) {
        console.error(e);
    }
}

export async function postData(data: {title: string; post: string; tag: string}): Promise<void> {
    try {
        await client.connect();
        const db = client.db('my-blog');
        const collection = db.collection('post');
        await collection.insertOne(data);
    } catch (e) {
        console.error(e);
    } 
}

export async function getPost(id: string): Promise<any> {
    try {
        await client.connect();
        const db = client.db('my-blog');
        const collection = db.collection('post').findOne({_id: new ObjectId(id)});
        return collection;
    } catch (e) {
        console.error(e);
    }
}