const {userCollection}=require("../utilities/dbCollection")

//get all user
module.exports.getAllUsers = async (req, res) => {
    try {
        const result = await userCollection.find({}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}

//create new user
module.exports.postUser = async (req, res) => {
    try {

        let user = req.body;
        const result = await userCollection.updateOne(
            { email: user.email },
            { $setOnInsert: user },
            { upsert: true }
        )
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}

//get user by specific firebase user id
module.exports.getUserByUid = async (req, res) => {
    try {
        const { uid } = req.params;
        const filter = { firebaseId: uid };
        const result = await userCollection.findOne(filter);
        res.json(result)
    } catch (error) {
        console.log(error)
    }

}

//create an array named "created" and store user id
module.exports.updateUserByClassId = async (req, res) => {
    try {
        const { uid } = req.params;
        const id = req.body.id;
        const filter = { firebaseId: uid }
        const updateQuery = { $addToSet: { created: id } };
        const option = { upsert: false }
        const result = await userCollection.updateOne(filter, updateQuery, option);
        res.send(result)
    } catch (error) {
        console.log(error)
    }

}