const express = require("express");
const database = require("../utilities/dbConnect");
const { ObjectId } = require("mongodb");
const classroomsRouter= express.Router()

const classroomCollection = database.collection('classrooms')


classroomsRouter.get('/', async (req, res) => {
    const cursor = await classroomCollection.find({}).toArray()
    res.json(cursor)
  })

  classroomsRouter.get('/:id([0-9a-fA-F]{24})', async (req, res) => {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const query = { _id: objectId };
    const cursor = await classroomCollection.findOne(query);
    res.json(cursor)
  })

  classroomsRouter.put('/:code', async (req, res) => {
      const { code } = req.params;
      console.log(code)
      const userInfo = req.body;
      const updateQuery = { $addToSet: { students: userInfo } };
      const option={upsert:false}
      // Perform the update operation
      let result = await classroomCollection.updateOne({code}, updateQuery,option);
      let document;
      if(result){
        document= await classroomCollection.findOne({code})
        result.classroomId=document._id;
      }
      res.json(result)

  })

  classroomsRouter.get('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const filter = { uid: uid }
    const cursor = await classroomCollection.find(filter).toArray()
    res.json(cursor)
  })

  classroomsRouter.post('/', async (req, res) => {
    const classroom = req.body
    const randomCode = Math.floor(Math.random() * 9000) + 1000;
    classroom.code = randomCode.toString();
    const result = await classroomCollection.insertOne(classroom)
    result.classCode = randomCode;
    res.send(result);
  })

  module.exports=classroomsRouter;