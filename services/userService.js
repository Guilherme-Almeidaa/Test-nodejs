const { Op } = require('sequelize');
const { User } = require('../models');
const statusMessages = require('../utilities/listStatusMessages');

const findById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return statusMessages.UserNotFound;
  return user;
};

const deleteById = async (id) => {
  const checkUserExists = await findById(id);
  if (checkUserExists.errorMessage) return statusMessages.UserNotFound;
  await User.destroy({ where: { id } });
  return true;
};

const findByNickName = async (nickname) => {
  const [user] = await User.findAll({
    where: { nickname },
  });
  if (!user) return statusMessages.nicknameNotExists;

  return {
    name: user.name,
    lastname: user.lastname,
    nickname: user.nickname,
  };
};

const updateNickName = async (nickname, id) => {
  const [userUpdate] = await User.update(
    { nickname },
    { where: { id } },
  );
  if (!userUpdate) return statusMessages.UserNotFound;
  const result = await User.findByPk(id);
  return result;
};

const updateLastNameAndAddress = async (lastname, address, id) => {
  const [userUpdate] = await User.update({
    lastname, address, updateAt: new Date(),
  },
  {
    where: { id },
  });

  if (!userUpdate) return statusMessages.UserNotFound;
  const result = await User.findByPk(id);
  return result;
};

const findByNameOrLastName = async (search) => {
  const result = await User.findAll({
    where: {
      [Op.or]: [
        { name: search },
        { lastname: search },
      ],
    },
  });
  if (result.length === 0) return statusMessages.UserNotFound;
  return result;
};

const createUser = async (name, lastname, nickname, address, bio) => {
  const dateNow = new Date();
  const result = await User.create(
    {
      name,
      lastname,
      nickname,
      address,
      bio,
      createdAt: dateNow,
      updateAt: dateNow,
    },
  );

  return result;
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
