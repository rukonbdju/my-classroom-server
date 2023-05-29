import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;

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
    const database = client.db('my_classroom');
    const userCollection = database.collection('users')
    const classroomCollection = database.collection('classrooms')
    const postCollection = database.collection('posts')

    app.get('/', async (req, res) => {
      res.send('Server is running')
    });
    
    app.get('/users', async (req, res) => {
      const result= await userCollection.find({}).toArray();
      res.send(result)
    });

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user)
      res.send(result)
    })
    app.post('/posts', async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post)
      res.send(result)
    })
    app.get('/posts', async (req, res) => {
      const result = await postCollection.find({}).toArray()
      res.json(result)
    })
    app.put('/users/:uid', async (req, res) => {
      const { uid } = req.params;
      const id = req.body.id;
      const filter = { uid: uid }
      const updateQuery = { $addToSet: { classroomList: id } };
      const option = { upsert: true }

      // Perform the update operation
      const result = await userCollection.updateOne(filter, updateQuery, option);
      res.send(result)
    })
    app.put('/classrooms/:id([0-9a-fA-F]{24})', async (req, res) => {
      const { id } = req.params;
      const userInfo = req.body;
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const updateQuery = { $addToSet: { students: userInfo } };
      const option = { upsert: true }
      // Perform the update operation
      const result = await classroomCollection.updateOne(filter, updateQuery, option);
      res.send(result)
    })
    
    app.get('/classrooms/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const query = { _id: objectId };
      const cursor = await classroomCollection.findOne(query);
      res.json(cursor)
    })
    app.get('/users/:uid', async (req, res) => {
      const uid = req.params.uid;
      const query = { uid: uid }
      const cursor = await userCollection.findOne(query);
      res.json(cursor)
    })
    
    app.get('/classrooms', async (req, res) => {
      const cursor = await classroomCollection.find({}).toArray()
      res.json(cursor)
    })

    app.get('/classrooms/:uid', async (req, res) => {
      const uid = req.params.uid;
      const filter = { uid: uid }
      const cursor = await classroomCollection.find(filter).toArray()
      res.json(cursor)
    })
    app.post('/classrooms', async (req, res) => {
      const classroom = req.body
      const randomCode = Math.floor(Math.random() * 9000) + 1000;
      classroom.code = randomCode;
      const result = await classroomCollection.insertOne(classroom)
      result.classCode = randomCode;
      res.send(result);
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
