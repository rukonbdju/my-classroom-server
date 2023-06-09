const express = require("express");
const database = require("../utilities/dbConnect");
const usersRouter = express.Router()

const userCollection = database.collection('users')

usersRouter.get("/", async(req, res) => {
    const result = await userCollection.find({}).toArray();
    res.send(result)
})

usersRouter.post('/', async (req, res) => {
    const user = req.body;
    const result = await userCollection.insertOne(user)
    res.send(result)
})

usersRouter.get('/:uid', async (req, res) => {
    const { uid } = req.params;
    console.log(uid)
    const result = await userCollection.findOne({ uid });
    res.send(result)
});

usersRouter.put('/:uid', async (req, res) => {
    const { uid } = req.params;
    const id = req.body.id;
    console.log({ id, uid })
    const filter = { uid: uid }
    const updateQuery = { $addToSet: { classroomList: id } };
    const option = { upsert: false }
    // Perform the update operation
    const result = await userCollection.updateOne(filter, updateQuery, option);
    console.log(result)
    res.send(result)
})

module.exports = usersRouter;
