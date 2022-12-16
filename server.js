const express = require('express')
const {userController} = require('./controller/userController')
const app = express()
const port = 3000

app.use(express.json())

app.get('/user', userController.getAllUsers);

app.post('/user',userController.create);

app.listen(port, () => console.log(`App listening on port ${port}!`))