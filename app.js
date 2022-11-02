const express = require('express');
const dboperation = require('./dboperation');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

const port = 3000;

dboperation.getUsers().then(res=> {
    console.log(res);
})

app.use(bodyParser.json());


app.listen(port, () => console.log("Listening on port " + port));