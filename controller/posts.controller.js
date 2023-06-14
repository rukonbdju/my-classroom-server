const { ObjectId } = require("mongodb");
const database = require("../utilities/dbConnect");
const { response } = require("express");
const postCollection = database.collection('posts')

module.exports.getAllPosts = async (req, res) => {
    const result = await postCollection.find({}).toArray()
    res.json(result)
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


module.exports.postUserPost = async (req, res) => {
    const post = req.body;
    const result = await postCollection.insertOne(post)
    res.json(result)
}

module.exports.addComments = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const objectId = new ObjectId(id);
    const filter = { _id: objectId }
    const updateQuery = { $push: { comments: data } };
    const option = { upsert: false }
    // Perform the update operation
    let result = await postCollection.updateOne(filter, updateQuery, option);
    res.send(result);
}

module.exports.countPostLike = async (req, res) => {
    const  info  = req.query;
    const objectId = new ObjectId(info.class_id);
    const filter = { _id: objectId }
    const updateQuery = { $addToSet: { likes: info.user_id } };
    const option = { upsert: false }
    const result=await postCollection.updateOne(filter,updateQuery,option) 
    res.json(result);
} 

module.exports.deletePostLike=async(req,res)=>{
    const  info  = req.query;
    const objectId = new ObjectId(info.class_id);
    const filter = { _id: objectId }
    const deleteQuery = { $pull: { likes: info.user_id } };
    const result = await postCollection.updateOne(filter,deleteQuery);
    res.json(result)
}