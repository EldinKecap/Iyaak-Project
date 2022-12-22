function removeEmptyUserPropertiesAndTrimEmptySpaces( user ) {
    for ( const key in user ) {
        user[key] = user[key].trim()
        if( user[key] == '' ) delete user[key];
    }
    return user;
}

async function generateUserErrorMessage(errorMessage, user) {

    let checkUsername = await client.db('IiyakProject').collection('user').find({ username : user.username }).toArray();
    if(checkUsername[0]) errorMessage.username = 'Username already exists';
    
    if ( ! ( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(user.email) ) ) {
        errorMessage.emailFormat = 'Email is not formatted correctly';
    }

    let checkEmail = await client.db('IiyakProject').collection('user').find({ email : user.email }).toArray();
    if(checkEmail[0]) errorMessage.email = 'Email already exists';

    return errorMessage;
}

async function generateUserIdErrorMessage( errorMessage, id ) {
    if ( ! ObjectId.isValid(id) ) {
        errorMessage.id = "Id is not Valid";
        return errorMessage
    }
    let checkId = await client.db('IiyakProject').collection('user').find({ _id : ObjectId(id) }).toArray();
    if(! checkId[0]) errorMessage.id = "Id doesn't exists";
    return errorMessage;
}

module.exports = { removeEmptyUserPropertiesAndTrimEmptySpaces ,
                generateUserErrorMessage ,
                generateUserErrorMessage}