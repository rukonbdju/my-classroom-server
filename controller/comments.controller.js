const { ObjectId } = require("mongodb");
const {commentCollection,postCollection}=require("../utilities/dbCollection")

//save new comment
module.exports.saveComment = async (req, res) => {
    try {
        const data = req.body;
        const postId = data.postId;
        const result = await commentCollection.insertOne(data)
        const commentId = result.insertedId.toString()
        const objectId = new ObjectId(postId);
        const filter = { _id: objectId }
        const updateQuery = { $push: { comments: commentId } };
        const option = { upsert: false }
        let result2 = await postCollection.updateOne(filter, updateQuery, option);
        result2.commentId=commentId
        res.json(result2)
    } catch (error) {
        console.log(error)
    }
}

//get comments by post id
module.exports.getComments = async (req, res) => {
    try {
        const { postId } = req.query;
        const result = await commentCollection.find({postId}).toArray();
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteComment = async (req,resp)=>{
    try{
        const { id } = req.params;
        const {postId}=req.body;
        const objectId = new ObjectId(id);
        const filter = { _id: objectId };
        const res= await commentCollection.deleteOne(filter)
        const update = { $pull: { comments: id } }
        const postQuery = { _id: new ObjectId(postId) };
        let result = await postCollection.updateOne(postQuery, update)
        result.commentId=id;
        resp.send(result)
    }catch (error){
        console.log(error)
    }
}