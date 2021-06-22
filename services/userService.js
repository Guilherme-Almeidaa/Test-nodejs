const user = require('../models/userModel');

const statusMessages = require('../utilities/listStatusMessages');


const findByNameOrLastName = async (search)  => {
   const result = await user.findByNameOrLastName(search);
   if(result.length === 0) return statusMessages.UserNotFound;
   return result;
}

const findByNickName = async (nickname) => {
    const result = await user.findByNickName(nickname);
    if(!result) return statusMessages.nicknameNotExists;
    return result;
}

const createUser = async (name, lastname, nickname, address, bio) => {
   const result = await user.createUser(name, lastname, nickname, address, bio);
    return result;
};

module.exports = {
    createUser,
    findByNickName,
    findByNameOrLastName,
}
