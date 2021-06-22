const user = require('../models/userModel');

const statusMessages = require('../utilities/listStatusMessages');


const findById = async (id) => {
    const result = await user.findById(id);
    return result;
}

const findByNickName = async (nickname) => {
    const result = await user.findByNickName(nickname);
    if(!result) return statusMessages.nicknameNotExists;
    return result;
}

const updateNickName = async (nickname,id) => {
    const result = await user.updateNickName(nickname,id);
    if(!result) return statusMessages.UserNotFound;
    return result;
}

const updateLastNameAndAddress = async (lastname, address, id) => {
    const result = await user.updateLastNameAndAddress(lastname, address, id);
    if(!result) return statusMessages.UserNotFound;
    return result;
}

const findByNameOrLastName = async (search)  => {
   const result = await user.findByNameOrLastName(search);
   if(result.length === 0) return statusMessages.UserNotFound;
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
    updateLastNameAndAddress,
    findById,
    updateNickName,
}
