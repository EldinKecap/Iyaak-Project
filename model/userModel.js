const { client } = require('./db');
const { ObjectId } = require('mongodb')

let userModel = {};
userModel.getAllUsers = async function () {
    try {
        await client.connect();
        let db =  client.db('IiyakProject');
        let result = await db.collection('user').find().toArray();
        await client.close();
        return result;
    } catch (err) {
        console.log(err);
    }
}

userModel.getUser = async function (id){
    await client.connect();
    let result = await client.db('IiyakProject').collection('user').find({ _id: ObjectId(id) }).toArray();
    return result;
}

userModel.create = async function (user) {
    await client.connect();
    let result = await client.db('IiyakProject').collection('user').insertOne(user);
    await client.close();
    return result;
}

userModel.update = async function (id , user) {
    await client.connect();
    let result = await client.db('IiyakProject').collection('user').updateOne({_id : ObjectId(id)},{$set:user});
    await client.close();
    return result;
}

userModel.delete = async function (id){
    await client.connect();
    let result = await client.db('IiyakProject').collection('user').deleteOne({ _id: ObjectId(id)});
    await client.close();
    return result;
}

module.exports = {userModel}