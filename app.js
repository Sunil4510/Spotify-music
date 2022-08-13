const dotenv = require("dotenv");
dotenv.config({path: './config.env'});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db/conn');
const port = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(require('./router/auth'));


app.listen(port,() => {
console.log(`connected to the port ${port}`);
})