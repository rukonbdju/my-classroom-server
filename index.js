import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

import {MongoClient,ServerApiVersion}from 'mongodb';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT|| 3000;
const userName=process.env.USER_NAME;
const password=process.env.PASSWORD;

const uri = `mongodb+srv://${userName}:${password}@my-classroom.qwaidzh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database=client.db('my_classroom');
    const userCollection=database.collection('users')

    app.get('/', async(req, res) => {
        res.send('Server is running')
      });

    app.post('/users',async(req,res)=>{
        const result=await userCollection.insertOne(user)
        res.send(result)
        console.log(user)
    })
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
