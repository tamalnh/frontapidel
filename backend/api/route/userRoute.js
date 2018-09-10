const express = require('express');
const route = express.Router();
const userController = require('./../controller/userController');
const Authenticate = require('./../middelware/postRouteProtector')


route.get('/', Authenticate, userController.getAllUser)

route.post('/signup',  userController.signupUser)
route.post('/signin', userController.signinUser)


module.exports = route;

