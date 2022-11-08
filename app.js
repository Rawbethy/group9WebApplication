var express = require('express');
var dboperation = require('./dboperation');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./dbconfig');
const sql = require('mssql');
var app = express();


var index = require('./routes/index')
var insertForm = require('./routes/insertForm')
var main = require('./routes/main');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));


app.use('/', index)
app.use('/main', main)
app.use('/insertForm', insertForm);
app.use(express.static("public"));


app.post('/', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    var query = "SELECT * FROM [dbo].[users] WHERE username = \'"+username+"\' AND pword = \'"+password+"\';"
    sql.connect(config, function(err) {
        if(err) console.log(err);
        var request = new sql.Request();
        request.query(query, function(err, recordset) {
            if(err) console.log(err);
            if(recordset.recordsets[0].length == 0) {
                res.send("Username and/or Password is incorrect");
            }
            else {
                res.redirect('/main');
            }
        })
    })
});

app.post('/insertForm', (req, res) => {
    console.log("INSERT INTO [dbo].[products] VALUES(\'"+req.body.productName+"\', \'"+req.body.productType+"\', \'"+req.body.productDesc+"\', "+req.body.price+", "+req.body.productQuantity+", "+req.body.discount+");");
    var query = "INSERT INTO [dbo].[products] VALUES(\'"+req.body.productName+"\', \'"+req.body.productType+"\', \'"+req.body.productDesc+"\', "+req.body.price+", "+req.body.productQuantity+", "+req.body.discount+");";
    dboperation.insertQuery(query);
});

dboperation.getUsers().then(res => {
    console.log(res);
});


const port = 5500;

app.listen(port, () => console.log("Listening on port " + port));

module.exports = app;