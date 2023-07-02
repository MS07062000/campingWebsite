import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
// Create a new MongoClient
const client = new MongoClient(process.env.MONGODB_URI);
export let db;

export async function connectToDatabase () {
  try {
    await client.connect();
    console.log('Connected');
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
    db = client.db('test');
  } finally {
    // await client.close();
  }
}
