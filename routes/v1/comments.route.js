const express=require('express')
const commentRouter=express.Router()
const commentController =require('../../controller/comments.controller')

commentRouter
.route('/')
.post(commentController.saveComment)

commentRouter
.route('/:id([0-9a-fA-F]{24})')
.get(commentController.getComment)
.delete(commentController.deleteComment)

module.exports=commentRouter;