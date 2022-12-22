const { client } = require('./db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');


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
        return {err};
    }
}

userModel.getUser = async function (id){
    try {
        await client.connect();
        let errorMessage = {};
        errorMessage = await generateUserIdErrorMessage(errorMessage, id);
        if (Object.keys(errorMessage).length) {
            return {errorMessage, user};
        }
        let result = await client.db('IiyakProject').collection('user').find({ _id: ObjectId(id) }).toArray();
        await client.close();
        return result;
    } catch (error) {
        return { error }
    }
    
}

userModel.create = async function (user) {
    try {
        await client.connect();
        user = removeEmptyUserPropertiesAndTrimEmptySpaces(user); 
        let errorMessage = {};
        errorMessage = await generateUserErrorMessage(errorMessage, user);
    
        if( Object.keys(user).length < 5 ){
            errorMessage.empty = 'Left empty fields';
        }
    
        if (Object.keys(errorMessage).length) {
            return { errorMessage, user };
        }
    
        user.password = await bcrypt.hash( user.password, 10 );
        let result = await client.db('IiyakProject').collection('user').insertOne(user);
        await client.close();
        return result;     
    } catch (error) {
        console.log(error);
        return error;
    }
}

userModel.update = async function ( id , user ) {
    try {
        await client.connect();
        let errorMessage = {};
        errorMessage = await generateUserErrorMessage(errorMessage, user);
        errorMessage = await generateUserIdErrorMessage(errorMessage, id);
        
        if (Object.keys(errorMessage).length) {
            return {errorMessage, user};
        }
    
        let result = await client.db('IiyakProject').collection('user').updateOne( { _id : ObjectId(id) }, { $set : user } );
        await client.close();
        return result;     
    } catch (error) {
        console.log(error);
        return (error);
    }
}

userModel.delete = async function ( id ){
    try {
        await client.connect();
        let errorMessage = {};
        errorMessage = await generateUserIdErrorMessage(errorMessage, id);
        if (Object.keys(errorMessage).length) {
            return {errorMessage, user};
        }
        let result = await client.db('IiyakProject').collection('user').deleteOne( { _id : ObjectId(id) } );
        await client.close();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}


module.exports = { userModel }