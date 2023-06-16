const { ObjectId } = require("mongodb");
const database = require("../utilities/dbConnect")
const classroomCollection= database.collection('classrooms')


module.exports.getAllClassrooms=async (req, res) => {
    const cursor = await classroomCollection.find({}).toArray()
    res.json(cursor)
}

module.exports.createClassroom=async (req, res) => {
    const classroom = req.body
    const randomCode = Math.floor(Math.random() * 9000) + 1000;
    classroom.code = randomCode.toString();
    const result = await classroomCollection.insertOne(classroom)
    result.classCode = randomCode;
    res.send(result);
}

module.exports.getClassroomsByUid=async (req, res) => {
    const uid = req.params.uid;
    const filter = { creator: uid }
    const cursor = await classroomCollection.find(filter).toArray()
    res.json(cursor)
}

module.exports.getClassroomById=async (req, res) => {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const query = { _id: objectId };
    const cursor = await classroomCollection.findOne(query);
    res.json(cursor)
}

module.exports.updateClassroomPosts=async (req,res)=>{
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const filter = { _id: objectId };
    const postId = req.body.postId;
    const updateQuery = { $addToSet: { posts: postId } };
    const option={upsert:false}
    // Perform the update operation
    let result = await classroomCollection.updateOne(filter, updateQuery,option);
    res.json(result)
}

module.exports.updateClassroomByUserId=async (req, res) => {
    const { code } = req.params;
    const userInfo = req.body;
    const updateQuery = { $addToSet: { members: userInfo } };
    const option={upsert:false}
    // Perform the update operation
    let result = await classroomCollection.updateOne({code}, updateQuery,option);
    const classroom=await classroomCollection.findOne({code})
    result.classroomId=classroom._id
    res.json(result)
}