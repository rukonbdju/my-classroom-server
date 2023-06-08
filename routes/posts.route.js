const express = require("express");
const database = require("../utilities/dbConnect");
const postsRouter=express.Router()

const postCollection = database.collection('posts')

postsRouter.post('/', async (req, res) => {
    const post = req.body;
    const result = await postCollection.insertOne(post)
    res.send(result)
  })

postsRouter.get('/', async (req, res) => {
    const result = await postCollection.find({}).toArray()
    res.json(result)
})

module.exports=postsRouter;