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
                return res.send(err);
            }
            if(rows.recordsets[0].length == 0) {
                var query = "INSERT INTO [dbo].[visitors] (sessionID) VALUES('"+req.sessionID+"');"
                request.query(query, function(err) {
                    if(err) {
                        return res.send(err);
                    }
                    else {
                        var query = "SELECT * FROM [dbo].[visitors] WHERE sessionID = '"+req.sessionID+"';";
                        request.query(query, function(err, rows) {
                            if(err) return res.send(err);
                            return res.render('index', {customerID: rows.recordsets[0][0].customerID, userID: null, isAdmin: null});
                        })
                    }
                })
            }
            else {
                return res.render('index', {customerID: rows.recordsets[0][0].customerID, userID: null, isAdmin: null});
            }
        })
    })
});

module.exports = router;