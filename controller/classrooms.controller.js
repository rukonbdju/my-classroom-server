const { ObjectId } = require("mongodb");
const {userCollection, classroomCollection}=require("../utilities/dbCollection");

//get all classroom
module.exports.getAllClassrooms = async (req, res) => {
    try {
        const cursor = await classroomCollection.find({}).toArray()
        res.json(cursor)
    } catch (error) {
        console.log(error)
    }
}

//create new classroom
module.exports.createClassroom = async (req, res) => {
    try {
        const classroom = req.body
        console.log(classroom)
        const randomCode = Math.floor(Math.random() * 9000) + 1000;
        classroom.code = randomCode.toString();
        const result = await classroomCollection.insertOne(classroom)
        result.classCode = randomCode;
        res.send(result);
    } catch (error) {
        console.log(error)
    }
}

//get a specific classroom by user id
module.exports.getClassroomsByUid = async (req, res) => {
    try {
        const uid = req.params.uid;
        const filter = { "author.id":uid }
        const cursor = await classroomCollection.find(filter).toArray()
        res.json(cursor)
    } catch (error) {
        console.log(error)
    }
}

//get specific classroom by id
module.exports.getClassroomById = async (req, res) => {
    try {
        const id = req.params.id;
        const objectId = new ObjectId(id);
        const query = { _id: objectId };
        const cursor = await classroomCollection.findOne(query);
        res.json(cursor)
    } catch (error) {
        console.log(error)
    }
}

//store post id in classroom as reference
module.exports.updateClassroomPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const objectId = new ObjectId(id);
        const filter = { _id: objectId };
        const postId = req.body.postId;
        const updateQuery = { $addToSet: { posts: postId } };
        const option = { upsert: false }
        let result = await classroomCollection.updateOne(filter, updateQuery, option);
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

//join classroom
module.exports.joinClassroom = async (req, res) => {
    try {
        const { code } = req.params;
        const userInfo = req.body;
        const updateQuery = { $addToSet: { members: userInfo } };
        //find the classroom
        const classroom = await classroomCollection.findOne({ code })
        if (classroom) {
            let fid = classroom._id.toString()
            // Perform the update operation
            let result = await classroomCollection.updateOne({ code }, updateQuery);
            const userFilter = { firebaseId: userInfo.userId };
            const userUpdateQuery = { $addToSet: { joined: fid } }
            const result2 = await userCollection.updateOne(userFilter, userUpdateQuery);
            res.json(result2)
        }
        else {
            res.json(classroom)
        }
    } catch (error) {
        console.log(error)
    }
}

//leave a classroom
module.exports.leaveClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        //delete user info from classroom
        const objectId = new ObjectId(id);
        const filter = { _id: objectId };
        const deleteQuery = { $pull: { members: { userId: userId } } }
        const deleteMemberInfo = await classroomCollection.updateOne(filter, deleteQuery)
        //delete classroom id from user
        const deleteClassroomId = await userCollection.updateOne({ firebaseId: userId }, { $pull: { joined: id } })
        const result = {
            deleteMemberInfo: deleteMemberInfo,
            deleteClassroomId: deleteClassroomId
        }
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}

//archive classroom
module.exports.archiveClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        //delete user info from classroom
        const objectId = new ObjectId(id);
        const filter = { _id: objectId };
        const updateQuery = { $addToSet: { archived: data.userId } }
        const result = await classroomCollection.updateOne(filter, updateQuery)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}