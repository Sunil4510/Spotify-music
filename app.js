const dotenv = require("dotenv");
dotenv.config({path: './config.env'});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db/conn');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(require('./router/auth'));


app.listen(5000,() => {
console.log("connected to the port 5000");
})