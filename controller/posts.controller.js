const { ObjectId } = require("mongodb");
const { classroomCollection, postCollection, commentCollection } = require("../utilities/dbCollection")

//get all posts
module.exports.getAllPosts = async (req, res) => {
    try {
        const { classId } = req.query;
        console.log(req.query)
        if (classId) {
            const filteredResult = (await postCollection.find({ classId }).toArray()).reverse()
            const totalData=filteredResult.length;
            console.log(totalData)
            const page = parseInt(req.query.page) || 1;
            const pageSize = 5;
            const startIndex = (page - 1) * pageSize;
            let endIndex = startIndex + pageSize;
            if (endIndex >= totalData) {
                endIndex = totalData;
            }
            const results = filteredResult.slice(startIndex, endIndex);
            res.json(results)
        }
        else {
            const result = await postCollection.find({}).toArray()
            res.json(result)
        }
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
        await commentCollection.deleteMany({ postId: id })
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

//create a new post
module.exports.createUserPost = async (req, res) => {
    try {
        const postData = req.body;
        const postResult = await postCollection.insertOne(postData)
        const postId = postResult.insertedId.toString();
        const classId = postData.classId;
        const objectId = new ObjectId(classId);
        const filter = { _id: objectId };
        const updateQuery = { $addToSet: { posts: postId } };
        const option = { upsert: false }
        let result = await classroomCollection.updateOne(filter, updateQuery, option);
        result.postId = postId;
        res.json(result)
    } catch (error) {
        res.json({ error: 'Error' })
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
