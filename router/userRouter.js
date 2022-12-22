const express = require('express');
const router = express.Router();
const { userController } = require('../controller/userController');

router.get( '/', userController.getAllUsers );

router.get( '/:id', userController.getUser );

router.post( '/', userController.create );

router.put( '/:id', userController.update );

router.delete( '/:id', userController.delete );

module.exports = router ;