const express = require('express');
const { userController } = require('./controller/userController');
const app = express();
const port = 3000;

app.use( express.json() );

app.get( '/user', userController.getAllUsers );

app.get( '/user/:id', userController.getUser );

app.post( '/user', userController.create );

app.put( '/user/:id', userController.update );

app.delete( '/user/:id', userController.delete );

app.listen( port, () => console.log( `App listening on port ${port}!` ) );