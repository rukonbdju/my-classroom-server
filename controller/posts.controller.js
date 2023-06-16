const { ObjectId } = require("mongodb");
const database = require("../utilities/dbConnect");
const postCollection = database.collection('posts')

module.exports.getAllPosts = async (req, res) => {
    const result = await postCollection.find({}).toArray()
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

module.exports.createUserPost = async (req, res) => {
    const post = req.body;
    const result = await postCollection.insertOne(post)
    res.json(result)
}

module.exports.updatePostByComment=async(req,res)=>{
    const { id } = req.params;
    const {commentId} = req.body;
    const objectId = new ObjectId(id);
    const filter = { _id: objectId }
    const updateQuery = { $push: { comments: commentId } };
    const option = { upsert: false }
    let result = await postCollection.updateOne(filter, updateQuery, option);
    res.send(result);
}


module.exports.updatePostLike = async (req, res) => {
    const {id} = req.params;
    const {userId}=req.body;
    const objectId = new ObjectId(id);
    const filter = { _id: objectId }
    const updateQuery = { $addToSet: { likes: userId } };
    const option = { upsert: false }
    const result = await postCollection.updateOne(filter, updateQuery, option)
    res.json(result);
}

module.exports.deletePostLike = async (req, res) => {
    const {id} = req.params;
    const {userId}=req.body;
    const objectId = new ObjectId(id);
    const filter = { _id: objectId }
    const deleteQuery = { $pull: { likes: userId } };
    const result = await postCollection.updateOne(filter, deleteQuery);
    res.json(result)
}