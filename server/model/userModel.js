const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min:2,
        max:20
    },
    lastName: {
        type: String,
        required: true,
        min:2,
        max:20
    },
    email: {
        type: String,
        unique: true,
        validate:{
            validator: v => ( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v)),
            message: props => 'Email is not formatted correctly'
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min:2,
        max:40
    },
    password: {
        type: String,
        required: true,
        min:8,
        validate:{
            validator: v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g.test(v),
            message: props => 'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
        } 
    }
}, { collection : 'user'});

userSchema.methods.updateUser = function(updateInfo){
    for (const key in updateInfo) {
        if (Object.keys(this._doc).includes(key)) {
            if(updateInfo[key] != '') this._doc[key] = updateInfo[key];
        }
    }
}

userSchema.methods.login = function( { username, password } ) {
    let passwordCheck = bcrypt.compareSync( password, this.password );
    
    if ( !passwordCheck ) {
        let error = {};
        error.wrongPassword = "Wrong Password";
        throw error;
    }
}

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash( this.password, 10 );
    next();
});

module.exports = mongoose.model('User', userSchema);