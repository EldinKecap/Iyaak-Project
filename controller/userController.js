const {userModel} = require('../model/userModel')

let userController = {}

userController.getAllUsers = async(req,res)=>{
    let results = await userModel.getAllUsers();
    res.status(200).json(results);
}

userController.create = async( req, res )=>{
    console.log(req.body);
    let result = await userModel.create(req.body);
    res.status(200).json(result);
}

module.exports = {userController}