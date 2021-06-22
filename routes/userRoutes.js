const express = require('express');

const route = express.Router();

const user = require('../controllers/userController');

route.get('/', user.findById);
route.post('/', user.createUser);
route.get('/search', user.findByNameOrLastName);
route.put('/:id', user.updateLastNameAndAddress);
route.put('/updatenick/:id', user.updateNickName);
route.get('/searchnick', user.findByNickName);
route.delete('/:id', user.deleteById);

module.exports = route;
