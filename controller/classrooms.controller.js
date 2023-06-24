const { ObjectId } = require("mongodb");
const database = require("../utilities/dbConnect");
const classroomCollection = database.collection('classrooms')
const userCollection= database.collection('users')

module.exports.getAllClassrooms = async (req, res) => {
    const cursor = await classroomCollection.find({}).toArray()
    res.json(cursor)
}

module.exports.createClassroom = async (req, res) => {
    const classroom = req.body
    const randomCode = Math.floor(Math.random() * 9000) + 1000;
    classroom.code = randomCode.toString();
    const result = await classroomCollection.insertOne(classroom)
    result.classCode = randomCode;
    res.send(result);
}

module.exports.getClassroomsByUid = async (req, res) => {
    const uid = req.params.uid;
    const filter = { creator: uid }
    const cursor = await classroomCollection.find(filter).toArray()
    res.json(cursor)
}

module.exports.getClassroomById = async (req, res) => {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const query = { _id: objectId };
    const cursor = await classroomCollection.findOne(query);
    res.json(cursor)
}

module.exports.updateClassroomPosts = async (req, res) => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const filter = { _id: objectId };
    const postId = req.body.postId;
    const updateQuery = { $addToSet: { posts: postId } };
    const option = { upsert: false }
    // Perform the update operation
    let result = await classroomCollection.updateOne(filter, updateQuery, option);
    res.json(result)
}

module.exports.joinClassroom = async (req,res)=>{
    const { code } = req.params;
    const userInfo = req.body;
    const updateQuery = { $addToSet: { members: userInfo } };
    //find the classroom
    const classroom = await classroomCollection.findOne({ code })
    if (classroom) {
        let fid = classroom._id.toString()     
        // Perform the update operation
        let result = await classroomCollection.updateOne({ code }, updateQuery);
        const userFilter = {firebaseId:userInfo.userId};
        const userUpdateQuery = {$addToSet:{joined:fid}}
        const result2 = await userCollection.updateOne(userFilter, userUpdateQuery);
        res.json(result2)
    }
    else{
        res.json(classroom)
    }
}

module.exports.updateClassroomByUserId = async (req, res) => {
    const { code } = req.params;
    const userInfo = req.body;
    const updateQuery = { $addToSet: { members: userInfo } };
    const option = { upsert: true }
    //find the classroom
    const classroom = await classroomCollection.findOne({ code })
    if (classroom) {
        // Perform the update operation
        let result = await classroomCollection.updateOne({ code }, updateQuery, option);
        result.id=classroom._id;
        res.json(result)
    }
    else{
        res.json(classroom)
    }
}

module.exports.leaveClassroom=async(req,res)=>{
    const {id}=req.params;
    const {userId}=req.body;
    //delete user info from classroom
    const objectId = new ObjectId(id);
    const filter = { _id: objectId };
    const deleteQuery={$pull:{members:{userId:userId}}}
    const deleteMemberInfo = await classroomCollection.updateOne(filter,deleteQuery)
    //delete classroom id from user
    const deleteClassroomId=await userCollection.updateOne({firebaseId:userId},{$pull:{joined:id}})
    const result={
        deleteMemberInfo:deleteMemberInfo,
        deleteClassroomId:deleteClassroomId
    }
    res.send(result)
}

module.exports.archiveClassroom= async(req,res)=>{
    const {id}=req.params;
    const data=req.body;
    //delete user info from classroom
    const objectId = new ObjectId(id);
    const filter = { _id: objectId };
    const updateQuery={$addToSet:{archived:data.userId}}
    const result = await classroomCollection.updateOne(filter,updateQuery)
    res.json(result)
}