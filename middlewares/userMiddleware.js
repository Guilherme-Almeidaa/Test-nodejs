const user = require('../services/userService');
const {
  nicknameExists,
  invalidSizeBio,
  invalidSizeNick,
  fieldNull,
  fieldInvalid,
} = require('../utilities/listStatusMessages');

const checkNickNameExitsMiddleware = async (req, res, next) => {
  const { nickname } = req.body;
  const check = await user.findByNickName(nickname);
  const { statusCode, errorMessage } = nicknameExists;
  if (!check.errorMessage) {
    res.status(statusCode);
    return res.json(errorMessage);
  }
  return next();
};

const checkSizeNickNameMiddleware = (req, res, next) => {
  const { nickname } = req.body;
  const { statusCode, errorMessage } = invalidSizeNick;
  if (nickname.length > 30) {
    res.status(statusCode);
    return res.json(errorMessage);
  }
  return next();
};

const checkSizeBioMiddleware = (req, res, next) => {
  const { bio } = req.body;
  if (!bio) return next();
  const { statusCode, errorMessage } = invalidSizeBio;
  if (bio.length > 100) {
    res.status(statusCode);
    return res.json(errorMessage);
  }
  return next();
};

const checkNickNameMiddleware = (req, res, next) => {
  const { nickname } = req.body;
  if (nickname === undefined) {
    const mesageReturnIfNull = fieldNull('nickname');
    res.status(mesageReturnIfNull.statusCode);
    return res.json(mesageReturnIfNull.errorMessage);
  }
  if (nickname.length === 0) {
    const messageReturnIfInvalid = fieldInvalid('nickname');
    res.status(messageReturnIfInvalid.statusCode);
    return res.json(messageReturnIfInvalid.errorMessage);
  }
  return next();
};

const checkNameMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) {
    const mesageReturnIfNull = fieldNull('name');
    res.status(mesageReturnIfNull.statusCode);
    return res.json(mesageReturnIfNull.errorMessage);
  }
  if (name.length === 0) {
    const messageReturnIfInvalid = fieldInvalid('name');
    res.status(messageReturnIfInvalid.statusCode);
    return res.json(messageReturnIfInvalid.errorMessage);
  }
  return next();
};

const checkLastNameMiddleware = (req, res, next) => {
  const { lastname } = req.body;
  if (lastname === undefined) {
    const mesageReturn = fieldNull('lastname');
    res.status(mesageReturn.statusCode);
    return res.json(mesageReturn.errorMessage);
  }
  if (lastname.length === 0) {
    const messageReturnIfInvalid = fieldInvalid('lastname');
    res.status(messageReturnIfInvalid.statusCode);
    return res.json(messageReturnIfInvalid.errorMessage);
  }
  return next();
};

const checkAddressMiddleare = (req, res, next) => {
  const { address } = req.body;
  if (address === undefined) {
    const mesageReturn = fieldNull('address');
    res.status(mesageReturn.statusCode);
    return res.json(mesageReturn.errorMessage);
  }
  if (address.length === 0) {
    const messageReturnIfInvalid = fieldInvalid('address');
    res.status(messageReturnIfInvalid.statusCode);
    return res.json(messageReturnIfInvalid.errorMessage);
  }
  return next();
};

module.exports = {
  checkNickNameMiddleware,
  checkNameMiddleware,
  checkLastNameMiddleware,
  checkAddressMiddleare,
  checkNickNameExitsMiddleware,
  checkSizeBioMiddleware,
  checkSizeNickNameMiddleware,
};
