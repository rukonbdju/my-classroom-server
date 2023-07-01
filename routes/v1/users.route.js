const express = require("express");
const usersController = require("../../controller/users.controller");
const verifyJWT = require("../../midleware/verifyJWT");
const usersRouter = express.Router();

usersRouter
    .route('/')
    .get(verifyJWT,usersController.getAllUsers)
    .post(usersController.postUser)

usersRouter
    .route('/:uid')
    .get(usersController.getUserByUid)
usersRouter
    .route('/create/:uid')
    .put(usersController.updateUserByClassId)

module.exports = usersRouter;
