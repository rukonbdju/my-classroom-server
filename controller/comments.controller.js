const { ObjectId } = require("mongodb");
const database = require("../utilities/dbConnect");

const commentCollection = database.collection('comments')

module.exports.saveComment=(async(req,res)=>{
    const data=req.body;
    const result= await commentCollection.insertOne(data)
    res.json(result)
})

module.exports.getComment = (async(req,res)=>{
    const {id}=req.params;
    const objectId = new ObjectId(id);
    const filter = { _id: objectId };
    const result = await commentCollection.findOne(filter);
    res.json(result)
})