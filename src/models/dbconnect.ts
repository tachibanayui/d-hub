import { MongoClient } from "mongodb";
export const MONGODB_URI = process.env.MONGODB!;
let client = MongoClient.connect(MONGODB_URI);
export default client;

