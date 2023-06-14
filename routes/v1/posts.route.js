const express = require("express");
const postsRouter=express.Router()
const postController = require("../../controller/posts.controller");


postsRouter
.route('/')
.get(postController.getAllPosts)
.post(postController.postUserPost)

postsRouter
.route('/query')
.get(postController.getPostByQuery)

postsRouter
.route('/:id([0-9a-fA-F]{24})')
.put(postController.addComments)

postsRouter
.route('/likes')
.put(postController.countPostLike)
.delete(postController.deletePostLike)

module.exports=postsRouter;