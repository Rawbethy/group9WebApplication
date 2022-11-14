var express = require('express');
var router = express.Router();
var config = require('./dbconfig');
var sql = require('mssql');

router.get('/', function(req, res, next) {
    var query = "SELECT * FROM [dbo].[visitors] WHERE sessionID = '"+req.sessionID+"';";
    sql.connect(config, function(err) {
        if(err) console.log(err);
        var request = new sql.Request();
        request.query(query, function(err, rows) {
            if(err) {
                res.send(err);
            }
            if(rows.recordsets[0].length == 0) {
                var query = "INSERT INTO [dbo].[visitors] (sessionID) VALUES('"+req.sessionID+"');"
                request.query(query, function(err) {
                    if(err) {
                        res.send(err);
                    }
                    else {
                        var query = "SELECT * FROM [dbo].[visitors] WHERE sessionID = '"+req.sessionID+"';";
                        request.query(query, function(err, rows) {
                            if(err) res.send(err);
                            res.render('index', {userID: rows.recordsets[0][0].customerID, isAdmin: null});
                        })
                    }
                })
            }
            else {
                res.render('index', {userID: rows.recordsets[0][0].customerID, isAdmin: null});
            }
        })
    })
});

module.exports = router;