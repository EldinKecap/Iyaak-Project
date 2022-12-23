const { isValidObjectId } = require('mongoose');
const User = require('../model/userModel')
const { generateErrorMessage } = require('./userErrorMessageGenerator');

let userController = {};

userController.getAllUsers = async( req,res ) => {
    try {
        let results = await User.find();
        res.status( 200 ).json( results );
    } catch (error) {
        res.status( 500 ).json({ errorMessage : error.message })
    }
}

userController.getUser = async( req, res ) => {
    try {
        let result = await User.findById(req.params.id);
        if ( result == null ) {
            res.status( 404 ).json({ errorMessage : "User does not exist" })
        }
        else
        res.status(200).json(result);
    } catch (error) {
        res.status( 500 ).json({ errorMessage : error.message , user : req.body})
    } 
}

userController.create = async( req, res ) => {
    try {
        let result = await User.create( req.body );
        res.status(200).json( result );
    } catch (error) {
        let errorMessage = generateErrorMessage(error);
        res.status( 500 ).json({ errorMessage : errorMessage , user : req.body})
    }
}

userController.update = async ( req, res ) => {
    try {
        let result = await User.findById( req.params.id );
        if ( result == null ) {
            res.status( 404 ).json({ errorMessage : "User does not exist" })
        }else{
        result.updateUser( req.body );
        await result.save();
        res.status( 200 ).json( result );
        }
    } catch (error) {
        let errorMessage = generateErrorMessage(error);
        res.status( 500 ).json({ errorMessage : errorMessage , user : req.body });
    }
}

userController.delete = async ( req, res ) => {
    try {
        let result = await User.findById(req.params.id);
        if ( result == null ) {
            res.status( 404 ).json({ errorMessage : "User does not exist" })
        }else{
            result = await User.deleteOne({ _id: result._id });
            res.status( 200 ).json( result );
        }
    } catch (error) {
        let errorMessage = generateErrorMessage(error);
        res.status(500).json({ errorMessage : errorMessage });
    }
}

userController.login = async ( req, res ) => {
    try {
        let result = await User.findOne( { username: req.body.username } );
        console.log('ye');
        await result.login( req.body );
        res.status(200).json({ login: true, user: result })
    } catch (error) {
        console.log(Object.keys(error));
        let errorMessage = generateErrorMessage(error);
        res.status(500).json({ errorMessage : errorMessage, user: req.body });
    }
}

module.exports = { userController }