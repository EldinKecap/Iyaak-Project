function generateErrorMessage(error) {
let errorMessage = {}
    for (const key in error.errors) {
            errorMessage[key] = error.errors[key]['properties']['message'];
    }

    for (const key in error.keyValue) {
        errorMessage[key] = `${error.keyValue[key]} already exists`;
    }
    
    if (error.kind == "ObjectId") {
        errorMessage[ 'id' ] = 'Must be a string of 12 bytes or a string of 24 hex characters or an integer'
    }

    if (error.hasOwnProperty('wrongPassword')) errorMessage.password = "Wrong Password";

    if(error.message === 'User does not exist') errorMessage.username = "User does not exist";

    return errorMessage;
}

module.exports = { generateErrorMessage };