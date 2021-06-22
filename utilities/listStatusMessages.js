const notProcessed = 422;
const update = 201;
const sucess = 200;
const notFound = 404;
const conflict = 409;
const badRequest = 400;
const unauthorized = 401;
const notContent = 204;
const forbidden = 403;
const internalError = 500;

const nicknameExists = {
  statusCode: conflict,
  error: {
    message: 'nickname already exists',
  },
};
const nicknameNotExists = {
  statusCode: notFound,
  error: {
    message: 'nickname does not exist',
  },
};

const UserNotFound = {
  statusCode: notFound,
  error: {
    message: 'user not found',
  },
};

module.exports = {
  internalError,
  update,
  sucess,
  nicknameExists,
  nicknameNotExists,
  UserNotFound,
};
