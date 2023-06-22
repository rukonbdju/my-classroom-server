const { ObjectId } = require("mongodb");
const database = require("../utilities/dbConnect");
const postCollection = database.collection('posts')
const classroomCollection=database.collection('classrooms')

module.exports.getAllPosts = async (req, res) => {
    if (req.query.classId) {
        const filter = { classId: req.query.classId }
        const filteredResult = await postCollection.find(filter).toArray()
        res.json(filteredResult.reverse())
    }
    else {
        const result = await postCollection.find({}).toArray()
        res.json(result.reverse())
    }

}

module.exports.getPostsByClassId = async (req, res) => {
    const { classId } = req.params;
    const filter = { classId: classId }
    const result = await postCollection.find(filter).toArray();
    res.json(result)
}

module.exports.getPostById = async (req, res) => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const query = { _id: objectId };
    const result = await postCollection.findOne(query);
    res.send(result);
}

module.exports.getPostByQuery = async (req, res) => {
    const { id, class_id } = req.query;
    if (id) {
        const objectId = new ObjectId(id);
        const query = { _id: objectId };
        const result = await postCollection.findOne(query);
        res.send(result);
    }
    if (class_id) {
        const filter = { classId: class_id }
        const result = await postCollection.find(filter).toArray()
        res.json(result.reverse())
    }
}

module.exports.deletePost = async (req, res) => {
    const { id, classId } = req.query;
    const postQuery = { _id: new ObjectId(id) };
    await postCollection.deleteOne(postQuery);
    const update = { $pull: { posts: id } }
    const classroomQuery = { _id: new ObjectId(classId) };
    const result =await classroomCollection.updateOne(classroomQuery,update)
    res.json(result)

}

module.exports.createUserPost = async (req, res) => {
    const postData = req.body;
    postData.file = Buffer.from(postData.file, 'base64');
    const result = await postCollection.insertOne(postData)
    res.json(result)
}

module.exports.updatePostByComment = async (req, res) => {
    const { id } = req.params;
    const { commentId } = req.body;
    const objectId = new ObjectId(id);
    const filter = { _id: objectId }
    const updateQuery = { $push: { comments: commentId } };
    const option = { upsert: false }
    const result = await postCollection.updateOne(filter, updateQuery, option);
    res.send(result);
}


module.exports.updatePostLike = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    if (data.like == 'true') {
        const objectId = new ObjectId(id);
        const filter = { _id: objectId }
        const userId = data.userId;
        const updateQuery = { $addToSet: { likes: userId } };
        const option = { upsert: false }
        const result = await postCollection.updateOne(filter, updateQuery, option)
        res.json(result);
    }
    if (data.like == 'false') {
        const objectId = new ObjectId(id);
        const filter = { _id: objectId }
        const userId = data.userId;
        const updateQuery = { $pull: { likes: userId } };
        const option = { upsert: false }
        const result = await postCollection.updateOne(filter, updateQuery, option)
        res.json(result);
    }

}
