const user = require('../services/userService');
const statusMessages = require('../utilities/listStatusMessages');

const returnStatusCodeError = (result, res) => res.status(result.statusCode).json({
  error: {
    message: result.error.message,
  },
});

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = user.findById(id);
    return res.status(statusMessages.sucess).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(statusMessages.internalError).json({
      message: error.message,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await user.deleteById(id);
    if (result.error) return returnStatusCodeError(result, res);
    return res.status(statusMessages.sucess).end();
  } catch (error) {
    console.log(error.message);
    return res.status(statusMessages.internalError).json({
      message: error.message,
    });
  }
};

const findByNickName = async (req, res) => {
  try {
    const { nick } = req.query;
    const result = await user.findByNickName(nick);
    if (result.error) return returnStatusCodeError(result, res);
    return res.status(statusMessages.sucess).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(statusMessages.internalError).json({
      message: error.message,
    });
  }
};

const updateNickName = async (req, res) => {
  try {
    const { nickname } = req.body;
    const { id } = req.params;
    const result = await user.updateNickName(nickname, id);
    if (result.error) return returnStatusCodeError(result, res);
    return res.status(statusMessages.update).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(statusMessages.internalError).json({
      message: error.message,
    });
  }
};

const updateLastNameAndAddress = async (req, res) => {
  try {
    const { lastname, address } = req.body;

    const { id } = req.params;

    const result = await user.updateLastNameAndAddress(lastname, address, id);
    if (result.error) return returnStatusCodeError(result, res);
    return res.status(statusMessages.update).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(statusMessages.internalError).json({
      message: error.message,
    });
  }
};

const findByNameOrLastName = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await user.findByNameOrLastName(q);
    if (result.error) return returnStatusCodeError(result, res);
    return res.status(statusMessages.sucess)
      .json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(statusMessages.internalError).json({
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name, lastname, nickname, address, bio,
    } = req.body;
    const result = await user.createUser(name, lastname, nickname, address, bio);
    return res.status(statusMessages.update).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(statusMessages.internalError).json({
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  findByNickName,
  findByNameOrLastName,
  updateLastNameAndAddress,
  findById,
  updateNickName,
  deleteById,
};
