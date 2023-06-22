const express = require("express");
const usersController = require("../../controller/users.controller");
const usersRouter = express.Router();

usersRouter
    .route('/')
    .get(usersController.getAllUsers)
    .post(usersController.postUser)

usersRouter
    .route('/:uid')
    .get(usersController.getUserByUid)
usersRouter
    .route('/create/:uid')
    .put(usersController.updateUserByClassId)

module.exports = usersRouter;
