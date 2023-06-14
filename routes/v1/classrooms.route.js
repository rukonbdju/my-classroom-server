const express = require("express");

const classroomsController = require("../../controller/classrooms.controller");
const classroomsRouter = express.Router()

classroomsRouter
  .route('/')
  .get(classroomsController.getAllClassrooms)
  .post(classroomsController.createClassroom)

classroomsRouter
  .route('/:id([0-9a-fA-F]{24})')
  .get(classroomsController.getClassroomById)

classroomsRouter
  .route('/:code')
  .put(classroomsController.updateClassroomByUserId)

classroomsRouter
  .route('/:uid')
  .get(classroomsController.getClassroomsByUid)

module.exports = classroomsRouter;