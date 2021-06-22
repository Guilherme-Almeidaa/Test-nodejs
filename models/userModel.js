const connection = require('../config/connection');
const { ObjectId } = require('mongodb');




const findById = async (id) => {
    const result = await connection()
        .then((db) => db.collection('Users').findOne(ObjectId(id)));
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

const updateNickName = async (nickname, id) => {
    await connection()
        .then((db) => db.collection('Users').updateOne({ _id: ObjectId(id) },
            { $set: { nickname } }))
            const result = await findById(id);
            return result;
}

const updateLastNameAndAddress = async (lastname, address, id) => {
    await connection()
        .then((db) => db.collection('Users').updateOne({ _id: ObjectId(id) },
            { $set: { lastname, address } }))
    const result = await findById(id);

    return result;
}

const findByNameOrLastName = async (search) => {
    const result = await connection()
        .then((db) => db.collection('Users').find({
            $or: [
                { name: search },
                { lastname: search },
            ]
        }).toArray());

    return result;
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
    updateLastNameAndAddress,
    findById,
    updateNickName,
};
