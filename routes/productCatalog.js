var express = require('express');
var router = express.Router();
var config = require('./dbconfig');
var sql = require('mssql');

/* GET insert product page. */
router.get('/', function(req, res, next) {
    var query = "SELECT * FROM [dbo].[products];";
    var userID = req.session.user;
    sql.connect(config, function(err) {
        if(err) console.log(err);
        var request = new sql.Request();
        request.query(query, function(err, rows) {
            if(err) {
                res.redirect('/mainAdmin');
            }
            if(rows.length == 0) {
                req.flash('message', 'No Data in Inventory');
            }
            else {
                console.log(req.session.user);
                res.render('productCatalog', {data: rows.recordsets[0], userID: userID});
            }
        })
    })
});

module.exports = router;