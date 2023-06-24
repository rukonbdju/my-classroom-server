const { ObjectId } = require("mongodb");
const database = require("../utilities/dbConnect");
const postCollection = database.collection('posts')
const classroomCollection = database.collection('classrooms')

//get all posts
module.exports.getAllPosts = async (req, res) => {
    try {
        if (req.query.classId) {
            const filter = { classId: req.query.classId }
            const filteredResult = await postCollection.find(filter).toArray()
            res.json(filteredResult.reverse())
        }
        else {
            const result = await postCollection.find({}).toArray()
            res.json(result.reverse())
        }
    } catch (error) {
        console.log(error)
    }
}

//get posts filter by specific classroom id
module.exports.getPostsByClassId = async (req, res) => {
    try {
        const { classId } = req.params;
        const filter = { classId: classId }
        const result = await postCollection.find(filter).toArray();
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

//get post by specific post id
module.exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const objectId = new ObjectId(id);
        const query = { _id: objectId };
        const result = await postCollection.findOne(query);
        res.send(result);
    } catch (error) {
        console.log(error)
    }
}

//get post by two queries post id and classroom id
module.exports.getPostByQuery = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error)
    }
}

//delete a specific post
module.exports.deletePost = async (req, res) => {
    try {
        const { id, classId } = req.query;
        const postQuery = { _id: new ObjectId(id) };
        await postCollection.deleteOne(postQuery);
        const update = { $pull: { posts: id } }
        const classroomQuery = { _id: new ObjectId(classId) };
        const result = await classroomCollection.updateOne(classroomQuery, update)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

//create a new post
module.exports.createUserPost = async (req, res) => {
    try {
        const postData = req.body;
        const result = await postCollection.insertOne(postData)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

//update a an array field named comments by comment id
module.exports.updatePostByComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { commentId } = req.body;
        const objectId = new ObjectId(id);
        const filter = { _id: objectId }
        const updateQuery = { $push: { comments: commentId } };
        const option = { upsert: false }
        const result = await postCollection.updateOne(filter, updateQuery, option);
        res.send(result);
    } catch (error) {
        console.log(error)
    }
}

//update like and dislike
module.exports.updatePostLike = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error)
    }
}
