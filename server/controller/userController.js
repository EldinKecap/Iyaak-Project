const User = require('../model/userModel')
const { generateErrorMessage } = require('./userErrorMessageGenerator');
const bcrypt = require('bcrypt');

let userController = {};

userController.getAllUsers = async (req, res) => {
    try {
        let results = await User.find();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

userController.getUser = async (req, res) => {
    try {
        let result = await User.findById(req.params.id);
        if (result == null) {
            res.status(404).json({ errorMessage: "User does not exist" })
        }
        else
            res.status(200).json(result);
    } catch (error) {
        let errorMessage = generateErrorMessage(error);
        res.status(500).json({ errorMessage: errorMessage, user: req.body })
    }
}

userController.create = async (req, res) => {

    try {
        let result = await User.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        let errorMessage = generateErrorMessage(error);
        res.status(500).json({ errorMessage: errorMessage, user: req.body })
    }
}

userController.update = async (req, res) => {

    try {
        let result = await User.findById(req.params.id);
        if (result == null) {
            res.status(404).json({ errorMessage: "User does not exist" })
        } else {
            for (const key in req.body) {
                if (req.body[key] == '') {
                    delete req.body[key]
                }
            }

            if (Object.keys(req.body).includes('username')) {
                const doesUserExist = await User.find({ username: req.body.username });
                console.log(doesUserExist);
                if (doesUserExist.length > 0 ) {
                    const error = {
                        keyValue: {
                            username: 'Username'
                        }
                    }
                    throw error;
                }

                if (req.body.username.length < 2 || req.body.username.length > 40) {
                    const error = {
                        username: 'Username must have between 2 and 40 characters'
                    }
                    throw error;
                }
            }

            if (Object.keys(req.body).includes('email')) {
                const doesEmailExist = await User.find({ username: req.body.email });
                console.log(doesEmailExist);
                if (doesEmailExist.length > 0 ) {
                    const error = {
                        keyValue: {
                            email: 'Email'
                        }
                    }
                    throw error;
                }
                if (req.body.email.trim() == '' || !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.email))) {
                    const error = {
                        email: 'Email is not formatted correctly'
                    }
                    throw error;
                }
            }

            if (Object.keys(req.body).includes('firstName')) {
                if (req.body.firstName.length < 2 || req.body.firstName.length > 20) {
                    const error = {
                        firstName: 'First name must have between 2 and 20 characters'
                    }
                    throw error;
                }
            }

            if (Object.keys(req.body).includes('lastName')) {
                if (req.body.lastName.length < 2 || req.body.lastName.length > 20) {
                    const error = {
                        lastName: 'Last name must have between 2 and 20 characters'
                    }
                    throw error;
                }
            }

            if (Object.keys(req.body).includes('password')) {
                if (req.body.password.trim() == '' || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g.test(req.body.password))) {
                    const error = {
                        password: 'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
                    }
                    throw error;
                } else {
                    req.body.password = await bcrypt.hash(req.body.password, 10);
                }
            }

            Object.assign(result, req.body)
            console.log(result);

            await User.findOneAndUpdate({ username: result.username }, result)
            res.status(200).json(result);
        }
    } catch (error) {
        let errorMessage = generateErrorMessage(error);
        console.log(errorMessage);
        res.status(500).json({ errorMessage: errorMessage, user: req.body });
    }
}

userController.delete = async (req, res) => {
    try {
        let result = await User.findById(req.params.id);
        if (result == null) {
            res.status(404).json({ errorMessage: "User does not exist" })
        } else {
            result = await User.deleteOne({ _id: result._id });
            res.status(200).json(result);
        }
    } catch (error) {
        let errorMessage = generateErrorMessage(error);
        res.status(500).json({ errorMessage: errorMessage });
    }
}

userController.login = async (req, res) => {
    try {
        let result = await User.findOne({ username: req.body.username });
        if (result) {
            await result.login(req.body);
            res.status(200).json({ login: true, user: result })
        } else {
            throw Error('User does not exist');
        }
    } catch (error) {
        console.log(error.message);
        let errorMessage = generateErrorMessage(error);
        res.status(500).json({ errorMessage: errorMessage, user: req.body });
    }
}

module.exports = { userController }