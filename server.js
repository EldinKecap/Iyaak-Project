const express = require('express');
const mongoose = require('mongoose');
const { userController } = require('./controller/userController');
const app = express();
const port = 3000;
const uri = "mongodb+srv://root:root@cluster0.ze2oyhf.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { dbName:'IiyakProject'});

app.use( express.json() );

app.get( '/user', userController.getAllUsers );

app.get( '/user/:id', userController.getUser );

app.post( '/user', userController.create );

app.put( '/user/:id', userController.update );

app.delete( '/user/:id', userController.delete );

app.listen( port, () => console.log( `App listening on port ${port}!` ) );