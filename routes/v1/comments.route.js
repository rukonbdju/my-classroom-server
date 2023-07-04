const express=require('express')
const commentRouter=express.Router()
const commentController =require('../../controller/comments.controller')

commentRouter
.route('/')
.get(commentController.getComments)
.post(commentController.saveComment)

commentRouter
.route('/:id([0-9a-fA-F]{24})')
.put(commentController.replyComment)
.delete(commentController.deleteComment)

module.exports=commentRouter;