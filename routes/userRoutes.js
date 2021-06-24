const express = require('express');

const route = express.Router();

const user = require('../controllers/userController');

const {
  checkNickNameMiddleware,
  checkNameMiddleware,
  checkLastNameMiddleware,
  checkAddressMiddleare,
  checkNickNameExitsMiddleware,
  checkSizeBioMiddleware,
  checkSizeNickNameMiddleware,
} = require('../middlewares/userMiddleware');

route.get('/', user.getAll);
route.get('/search', user.findByNameOrLastName);
route.get('/searchnick', user.findByNickName);
route.get('/:id', user.findById);
route.post('/register',
  checkNameMiddleware,
  checkLastNameMiddleware,
  checkAddressMiddleare,
  checkNickNameMiddleware,
  checkSizeBioMiddleware,
  checkNickNameExitsMiddleware,
  checkSizeNickNameMiddleware,
  user.createUser);
route.put('/updatenick/:id',
  checkNickNameMiddleware,
  checkNickNameExitsMiddleware,
  checkSizeNickNameMiddleware,
  user.updateNickName);
route.put('/:id',
  checkLastNameMiddleware,
  checkAddressMiddleare,
  user.updateLastNameAndAddress);
route.delete('/:id', user.deleteById);

module.exports = route;
