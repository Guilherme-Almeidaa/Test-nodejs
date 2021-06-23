const user = require('../services/userService');
const { nicknameExists, fieldNull, fieldInvalid } = require('../utilities/listStatusMessages');

const checkNickNameMiddleware = async (req, res, next) => {
  const { nickname } = req.body;
  if (!nickname) {
    const mesageReturnIfNull = fieldNull('nickname');
    return res.status(mesageReturnIfNull.statusCode)
      .json(mesageReturnIfNull.error);
  }
  if (nickname === '') {
    const messageReturnIfInvalid = fieldInvalid('nickname');
    return res.status(messageReturnIfInvalid.statusCode)
      .json(messageReturnIfInvalid.error);
  }
  const check = await user.findByNickName(nickname);
  const { statusCode, error } = nicknameExists;
  if (!check.error) return res.status(statusCode).json(error);
  return next();
};

const checkNameMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    const mesageReturnIfNull = fieldNull('name');
    return res.status(mesageReturnIfNull.statusCode).json(mesageReturnIfNull.error);
  }
  if (name === '') {
    const messageReturnIfInvalid = fieldInvalid('name');
    return res.status(messageReturnIfInvalid.statusCode)
      .json(messageReturnIfInvalid.error);
  }
  return next();
};

const checkLastNameMiddleware = (req, res, next) => {
  const { lastname } = req.body;
  if (!lastname) {
    const mesageReturn = fieldNull('lastname');
    return res.status(mesageReturn.statusCode).json(mesageReturn.error);
  }
  if (lastname === '') {
    const messageReturnIfInvalid = fieldInvalid('lastname');
    return res.status(messageReturnIfInvalid.statusCode)
      .json(messageReturnIfInvalid.error);
  }
  return next();
};

const checkAddressMiddleare = (req, res, next) => {
  const { address } = req.body;
  if (!address) {
    const mesageReturn = fieldNull('address');
    return res.status(mesageReturn.statusCode).json(mesageReturn.error);
  }
  if (address === '') {
    const messageReturnIfInvalid = fieldInvalid('address');
    return res.status(messageReturnIfInvalid.statusCode)
      .json(messageReturnIfInvalid.error);
  }
  return next();
};

module.exports = {
  checkNickNameMiddleware,
  checkNameMiddleware,
  checkLastNameMiddleware,
  checkAddressMiddleare,
};
