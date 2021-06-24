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
  if (!check.errorMessage) return res.status(statusCode).json(errorMessage);
  return next();
};

const checkSizeNickNameMiddleware = (req, res, next) => {
  const { nickname } = req.body;
  const { statusCode, errorMessage } = invalidSizeNick;
  if (nickname.length > 30) return res.status(statusCode).json(errorMessage);
  return next();
};

const checkSizeBioMiddleware = (req, res, next) => {
  const { bio } = req.body;
  if (!bio) return next();
  const { statusCode, errorMessage } = invalidSizeBio;
  if (bio.length > 100) return res.status(statusCode).json(errorMessage);
  return next();
};

const checkNickNameMiddleware = (req, res, next) => {
  const { nickname } = req.body;
  if (!nickname) {
    const mesageReturnIfNull = fieldNull('nickname');
    return res.status(mesageReturnIfNull.statusCode)
      .json(mesageReturnIfNull.errorMessage);
  }
  if (nickname === '') {
    const messageReturnIfInvalid = fieldInvalid('nickname');
    return res.status(messageReturnIfInvalid.statusCode)
      .json(messageReturnIfInvalid.errorMessage);
  }
  return next();
};

const checkNameMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    const mesageReturnIfNull = fieldNull('name');
    return res.status(mesageReturnIfNull.statusCode).json(mesageReturnIfNull.errorMessage);
  }
  if (name === '') {
    const messageReturnIfInvalid = fieldInvalid('name');
    return res.status(messageReturnIfInvalid.statusCode)
      .json(messageReturnIfInvalid.errorMessage);
  }
  return next();
};

const checkLastNameMiddleware = (req, res, next) => {
  const { lastname } = req.body;
  if (!lastname) {
    const mesageReturn = fieldNull('lastname');
    return res.status(mesageReturn.statusCode).json(mesageReturn.errorMessage);
  }
  if (lastname === '') {
    const messageReturnIfInvalid = fieldInvalid('lastname');
    return res.status(messageReturnIfInvalid.statusCode)
      .json(messageReturnIfInvalid.errorMessage);
  }
  return next();
};

const checkAddressMiddleare = (req, res, next) => {
  const { address } = req.body;
  if (!address) {
    const mesageReturn = fieldNull('address');
    return res.status(mesageReturn.statusCode).json(mesageReturn.errorMessage);
  }
  if (address === '') {
    const messageReturnIfInvalid = fieldInvalid('address');
    return res.status(messageReturnIfInvalid.statusCode)
      .json(messageReturnIfInvalid.errorMessage);
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
