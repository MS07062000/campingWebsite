import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
// Connection URI
const uri =
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
// Create a new MongoClient
const client = new MongoClient(uri);
export let db;

export async function connectToDatabase () {
  try {
    console.log(uri);
    await client.connect();
    console.log('Connected');
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
    db = client.db('test');
  } finally {
    // await client.close();
  }
}
