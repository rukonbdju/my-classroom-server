
const { MongoClient, ServerApiVersion, ObjectId } =require('mongodb') ;
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

const database = client.db('my_classroom');

module.exports=database;
