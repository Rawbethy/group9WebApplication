const express = require('express');
const dboperation = require('./dboperation');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.post('/insertForm', (req, res) => {
    console.log("INSERT INTO [dbo].[products] VALUES("+req.body.productID+", \""+req.body.productName+"\", \""+req.body.productType+"\", \""+req.body.productDesc+"\", "+req.body.price+", "+req.body.productQuantity+", "+req.body.discount+");");
});

dboperation.getUsers().then(res => {
    console.log(res);
});

const port = 5500;

app.listen(port, () => console.log("Listening on port " + port));