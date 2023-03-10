const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter')
const app = express();
const port = 5000;
const uri = "mongodb+srv://root:root@cluster0.ze2oyhf.mongodb.net/?retryWrites=true&w=majority";
const cors = require('cors')


mongoose.connect(uri, { dbName: 'IiyakProject' });

app.use( express.json() );

app.use(cors());

app.use( '/user', userRouter );

app.all( '*', ( req, res ) => {
    res.status(404).send('Page not found');
})

app.listen( port, () => console.log( `App listening on port ${port}!` ) );