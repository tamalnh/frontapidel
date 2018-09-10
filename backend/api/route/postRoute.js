const express = require('express');
const route = express.Router();
const postController = require('./../controller/postController');
const Authenticate = require('./../middelware/postRouteProtector')


route.get('/', postController.getAllPosts)

route.post('/', Authenticate, postController.createNewPost)

route.get('/:id', postController.getSinglePost)

route.patch('/:id', postController.updateSinglePost)

route.delete('/:id', postController.deletePost)

module.exports = route;
