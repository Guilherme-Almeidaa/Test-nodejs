const connection = require('../config/connection');



const findByNameOrLastName = async (search) => {
    const result = await connection()
        .then((db) => db.collection('Users').find({
            $or: [
                { name: search },
                { lastname: search },
            ]
        }).toArray());
        console.log(result)
        return result;
}

const findByNickName = async (nickname) => {
    const result = await connection()
        .then((db) => db.collection('Users').findOne({ nickname: nickname }));
    return {
        name: result.name,
        lastname: result.lastname,
        nickname: result.nickname,
    };
}

const createUser = async (name, lastname, nickname, address, bio) => {
    const dateNow = new Date();
    const result = await connection()
        .then((db) => db.collection('Users').insertOne({
            name,
            lastname,
            nickname,
            address,
            bio,
            createdAt: dateNow,
            updatedAt: dateNow,
        }));
    return {
        id: result.insertedId,
        name,
        lastname,
        address,
        bio,
    };
};

module.exports = {
    createUser,
    findByNickName,
    findByNameOrLastName,
};
