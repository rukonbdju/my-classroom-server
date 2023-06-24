const database = require("../utilities/dbConnect");

const userCollection = database.collection('users')
module.exports=userCollection;

module.exports.getAllUsers = async (req, res) => {
    const result = await userCollection.find({}).toArray();
    res.send(result)
}

module.exports.postUser = async (req, res) => {
    let user = req.body;
    const result = await userCollection.updateOne(
        { email: user.email }, // Check if email exists
        { $setOnInsert: user }, // Set email and other user data
        { upsert: true } // Insert the document if it doesn't exist
     )
    //const result = await userCollection.insertOne(user)
    res.send(result)
}

module.exports.getUserByUid = async (req, res) => {
    const { uid } = req.params;
    const filter = { firebaseId: uid };
    const result = await userCollection.findOne(filter);
    res.json(result)
}

module.exports.updateUserByClassId = async (req, res) => {
    const { uid } = req.params;
    const id = req.body.id;
    const filter = { firebaseId: uid }
    const updateQuery = { $addToSet: { created: id } };
    const option = { upsert: false }
    // Perform the update operation
    const result = await userCollection.updateOne(filter, updateQuery, option);
    res.send(result)
}