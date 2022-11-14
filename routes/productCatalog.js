var express = require('express');
var router = express.Router();
var config = require('./dbconfig');
var sql = require('mssql');

/* GET insert product page. */
router.get('/', function(req, res, next) {
    var query = "SELECT * FROM [dbo].[products];";
    sql.connect(config, function(err) {
        if(err) console.log(err);
        var request = new sql.Request();
        request.query(query, function(err, rows1) {
            if(err) {
                res.send(err);
            }
            if(rows1.length == 0) {
                req.flash('message', 'No Data in Inventory');
            }
            else {
                if(!req.session.userID) {
                    var query = "SELECT * FROM [dbo].[visitors] WHERE sessionID = '"+req.sessionID+"';";
                    request.query(query, function(err, rows2) {
                        if(err) {
                            res.send(err);
                        }
                        var userID = rows2.recordsets[0][0].customerID;
                        res.render('productCatalog', {data: rows1.recordsets[0], userID: userID, isAdmin: null});
                    })
                }  
                else{
                    res.render('productCatalog', {data: rows1.recordsets[0], userID: req.session.userID, isAdmin: req.session.isAdmin})
                } 
            }
        })
    })
});

module.exports = router;