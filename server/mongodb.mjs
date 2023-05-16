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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log('Connected');

    // Establish and verify connection
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
    // user and password collections
    db = client.db('test');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
