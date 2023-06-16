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
    .route('/created/:uid')
    .put(usersController.updateUserByClassId)
usersRouter
    .route('/joined/:uid')
    .put(usersController.updateJoinedUserByClassId)

module.exports = usersRouter;
