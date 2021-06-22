const express = require('express');

const route = express.Router();

const user = require('../controllers/userController');

route.post('/' , user.createUser);
route.get('/searchnick' , user.findByNickName);
route.get('/search' , user.findByNameOrLastName);

module.exports = route;