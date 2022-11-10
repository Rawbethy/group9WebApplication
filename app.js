var express = require('express');
var dboperation = require('./dboperation');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./dbconfig');
var sql = require('mssql');
var session = require('express-session');
var flash = require('connect-flash');
var app = express();

var index = require('./routes/index')
var insertForm = require('./routes/insertForm')
var viewInventory = require('./routes/viewInventory');
var mainAdmin = require('./routes/mainAdmin');
var mainUser = require('./routes/mainUser');
var logout = require('./routes/logout');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: 'secret',
    cookie: {maxAge : 60000},
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.use('/', index)
app.use('/mainAdmin', mainAdmin)
app.use('/mainUser', mainUser);
app.use('/insertForm', insertForm);
app.use('/viewInventory', viewInventory);
app.use('/logout', logout);
app.use(express.static("public"));


app.post('/', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    var query = "SELECT * FROM [dbo].[users] WHERE username = \'"+username+"\' AND pword = \'"+password+"\';"
    sql.connect(config, function(err) {
        if(err) console.log(err);
        var request = new sql.Request();
        request.query(query, function(err, row) {
            if(err) {
                req.flash('message', 'Something went wrong, please try again');
                res.redirect('/');
            }
            if(row.recordsets[0].length == 0) {
                req.flash('message', 'Username and/or Password is incorrect. Please try again');
                res.redirect('/');
            }
            else {
                var session = req.session;
                session.user = row.recordsets[0][0].userID;
                if(row.recordsets[0][0].isAdmin == 1) {
                    res.render('mainAdmin', {userID: session.user});
                }
                else {
                    res.render('mainUser', {userID: session.user});
                }
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