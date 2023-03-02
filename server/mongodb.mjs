import { MongoClient } from 'mongodb';
import process from 'process';
// Connection URI
const uri =
  `mongodb://user123:99605510-a7c8-11ed-8134-028b791895a5@139.59.63.151:27017/test`;

// Create a new MongoClient
const client = new MongoClient(uri);
export var db;


export async function connectToDatabase() {
  try {
    console.log(uri);
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Connected");

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    //user and password collections
    db=client.db("test");
    

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

