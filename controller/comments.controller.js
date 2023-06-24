const { ObjectId } = require("mongodb");
const database = require("../utilities/dbConnect");

const commentCollection = database.collection('comments')
const postCollection = database.collection('posts')

module.exports.saveComment = async (req, res) => {
    try {
        const data = req.body;
        const postId=data.postId;
        const result = await commentCollection.insertOne(data)
        const commentId = result.insertedId.toString()
        console.log(commentId)
        const objectId = new ObjectId(postId);
        const filter = { _id: objectId }
        const updateQuery = { $push: { comments: commentId } };
        const option = { upsert: false }
        const result2 = await postCollection.updateOne(filter, updateQuery, option);
        res.json(result2)
    } catch (error) {
        console.log(error)
    }

}

module.exports.getComment = async (req, res) => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const filter = { _id: objectId };
    const result = await commentCollection.findOne(filter);
    res.json(result)
}