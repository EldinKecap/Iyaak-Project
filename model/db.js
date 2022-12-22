const mongoose = require("mongoose");
const User = require('./userModel')

const uri = "mongodb+srv://root:root@cluster0.ze2oyhf.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { dbName:'IiyakProject'})

async function run(){
    // const user = await User.deleteOne( {name : 'Eldin'})
    try {
        const user = await User.where('firstName').lt('eld').limit(2).select('firstName')
        // user.password = 'asdfasdf4A$'
        // await user.save();
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
    
}

run()



