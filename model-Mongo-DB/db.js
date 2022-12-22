const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://root:root@cluster0.ze2oyhf.mongodb.net/?retryWrites=true&w=majority";

let client = new MongoClient(uri);

module.exports = {client}

