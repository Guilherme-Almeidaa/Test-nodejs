module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    address: DataTypes.STRING,
    bio: DataTypes.TEXT,
  });
  return Users;
};
