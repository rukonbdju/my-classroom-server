const database = require("../utilities/dbConnect")

const classroomCollection = database.collection('classrooms')
const userCollection = database.collection('users')
const commentCollection = database.collection('comments')
const postCollection = database.collection('posts')

module.exports = { userCollection, classroomCollection, postCollection, commentCollection }