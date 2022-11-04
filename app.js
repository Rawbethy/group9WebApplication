const express = require('express');
const dboperation = require('./dboperation');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const sql = require('mssql');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.post('/insertForm', (req, res) => {
    console.log("INSERT INTO [dbo].[products] (productID,fullname,productType,prodDesc,price,productQuantity,discount) VALUES("+req.body.productID+", \'"+req.body.productName+"\', \'"+req.body.productType+"\', \'"+req.body.productDesc+"\', "+req.body.price+", "+req.body.productQuantity+", "+req.body.discount+");");
    var query = "INSERT INTO [dbo].[products] (productID,fullname,productType,prodDesc,price,productQuantity,discount) VALUES("+req.body.productID+", \'"+req.body.productName+"\', \'"+req.body.productType+"\', \'"+req.body.productDesc+"\', "+req.body.price+", "+req.body.productQuantity+", "+req.body.discount+");";
    dboperation.insertQuery(query);
});

dboperation.getUsers().then(res => {
    console.log(res);
});


const port = 5500;

app.listen(port, () => console.log("Listening on port " + port));