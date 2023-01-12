function generateUserError(user){
    const errorMessage = {}

        for (const key in user) {
            if (user[key].trim() === '') {
                errorMessage[key] = key.charAt(0).toUpperCase() + key.slice(1) + ' is empty';
            }
        }

        return errorMessage
}

export default generateUserError;