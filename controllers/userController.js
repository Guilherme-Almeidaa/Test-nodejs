const user = require('../services/userService');
const statusMessages = require('../utilities/listStatusMessages');

const findByNameOrLastName = async (req,res) => {
    try {
        const { search } = req.query;
        const result = await user.findByNameOrLastName(search);
        if (result.error) return res.status(result.statusCode).json({
            error:{
                message:result.error.message
            }
        });
        return res.status(statusMessages.sucess)
        .json(result);
        
    } catch (error) {
        console.log(error.message);
        res.status(statusMessages.internalError).json({
            message: error.message,
        });
    }
}

const findByNickName = async (req, res) => {
    try {
        const { nick } = req.query;
        const result = await user.findByNickName(nick);
        if (result.error) return res.status(result.statusCode).json({
            error:{
                message:result.error.message
            }
        });
        return res.status(statusMessages.sucess).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(statusMessages.internalError).json({
            message: error.message,
        });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, lastname, nickname, address, bio } = req.body;
        const result = await user.createUser(name, lastname, nickname, address, bio)
        return res.status(statusMessages.update).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(statusMessages.internalError).json({
            message: error.message,
        });
    }
}

module.exports = {
    createUser,
    findByNickName,
    findByNameOrLastName,
}