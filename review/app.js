const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
require('dotenv').config()
process.env.TOKEN_SECRET;


var mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true}).then(function() {
        console.log("Successfully connected to the database");    
    }).catch(function(err) {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
});
const indexUser = require("./routes/index")

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use('/', indexUser)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});