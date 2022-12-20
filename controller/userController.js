const {userModel} = require('../model/userModel')

let userController = {}

userController.getAllUsers = async( req,res ) => {
    let results = await userModel.getAllUsers();
    res.status( 200 ).json( results );
}

userController.getUser = async( req, res ) => {
    let result = await userModel.getUser(req.params.id);
    res.status(200).json(result);
}

userController.create = async( req, res ) => {
    let result = await userModel.create(req.body);
    res.status(200).json( result );
}

userController.update = async ( req, res ) => {
    let result = await userModel.update( req.params.id, req.body );
    res.status(200).json( result );
}

userController.delete = async ( req, res ) => {
    let result = await userModel.delete(req.params.id);
    res.status(200).json(result);
}

module.exports = {userController}