const express = require('express');

const route = express.Router();

const user = require('../controllers/userController');

route.get('/search', user.findByNameOrLastName);
route.get('/searchnick', user.findByNickName);
route.get('/:id', user.findById);
route.post('/register', user.createUser);
route.put('/updatenick/:id', user.updateNickName);
route.put('/:id', user.updateLastNameAndAddress);
route.delete('/:id', user.deleteById);

module.exports = route;
