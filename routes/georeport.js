var express = require('express');
var router = express.Router();
var config = require('./dbconfig');
var sql = require('mssql');

/* GET insert product page. */
router.get('/', function(req, res, next) {
    var query = "SELECT state FROM [dbo].[users] GROUP BY state;";
    sql.connect(config, function(err) {
        if(err) console.log(err);
        var request = new sql.Request();
        request.query(query, function(err, rows) {
            if(err) {
                res.redirect('mainAdmin');
            }
            if(rows.length2 == 0) {
                req.flash('message', 'No Data in Inventory');
                res.redirect('mainAdmin');
            }
            else {
                res.render('geoReport', {data: rows.recordsets[0], userID: req.session.userID, isAdmin: req.session.isAdmin});
            }
        })
    })
});

module.exports = router;