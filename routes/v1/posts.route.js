const express = require("express");
const postsRouter=express.Router()
const postController = require("../../controller/posts.controller");


postsRouter
.route('/')
.get(postController.getAllPosts)
.post(postController.createUserPost)

postsRouter
.route('/query')
.get(postController.getPostByQuery)

postsRouter
.route('/:id([0-9a-fA-F]{24})')
.get(postController.getPostById)

postsRouter
.route('/comment/:id([0-9a-fA-F]{24})')
.put(postController.updatePostByComment)

postsRouter
.route('/like/:id([0-9a-fA-F]{24})')
.put(postController.updatePostLike)

postsRouter
.route('/unlike/:id([0-9a-fA-F]{24})')
.delete(postController.deletePostLike)

module.exports=postsRouter;