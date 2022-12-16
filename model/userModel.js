const {client} = require('./db')

let userModel = {};
userModel.getAllUsers = async function () {
    try {
        await client.connect();
        let db =  client.db("IiyakProject");
        let result = await db.collection('user').find().toArray();
        
        return result;
    } catch (err) {
        console.log(err);
    }
}

userModel.create = async function (user) {
    await client.connect();
    let result = await client.db("IiyakProject").collection('user').insertOne(user);
    return result;
}

module.exports = {userModel}