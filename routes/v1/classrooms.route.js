const express = require("express");

const classroomsController = require("../../controller/classrooms.controller");
const classroomsRouter = express.Router()

classroomsRouter
  .route('/')
  .get(classroomsController.getAllClassrooms)
  .post(classroomsController.createClassroom)

classroomsRouter
  .route('/find/:uid')
  .get(classroomsController.getClassroomsByUid)
  
classroomsRouter
  .route('/joinedClassrooms')
  .get(classroomsController.getJoinedClassrooms)

classroomsRouter
  .route('/:id([0-9a-fA-F]{24})')
  .get(classroomsController.getClassroomById)
  .put(classroomsController.updateClassroomPosts)

classroomsRouter
  .route('/join/:code')
  .put(classroomsController.joinClassroom)

classroomsRouter
  .route('/leave/:id([0-9a-fA-F]{24})')
  .put(classroomsController.leaveClassroom)
classroomsRouter
  .route('/archive/:id([0-9a-fA-F]{24})')
  .put(classroomsController.archiveClassroom)



module.exports = classroomsRouter;