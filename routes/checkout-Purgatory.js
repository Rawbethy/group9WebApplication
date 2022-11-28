var express = require('express');
var router = express.Router();
var config = require('./dbconfig');
var sql = require('mssql');

/* GET insert product page. */
router.get('/', function(req, res, next) {
    sql.connect(config, function(err) {
        if(err) console.log(err);
        if(!req.session.isAdmin) {
            var request = new sql.Request();
            var query = "SELECT * FROM [dbo].[visitors] WHERE sessionID = '"+req.sessionID+"';";
            request.query(query, function(err, rows1) {
                if(err) {
                    res.send(err);
                }
                else {
                    var query = "SELECT shoppingCart.customerID, shoppingCart.productID, shoppingCart.numItems, products.fullName, products.price FROM shoppingCart INNER JOIN products ON shoppingCart.productID = products.productID WHERE customerID = "+rows1.recordsets[0][0].customerID+";";
                    request.query(query, function(err, rows2) {
                        if(err) {
                            res.send(err);
                        }
                        if(rows2.recordsets[0].length == 0) {
                            req.flash('message', 'There is nothing in your shopping cart');
                            res.render('checkout', { title: 'Checkout', data: rows2.recordsets[0], isAdmin: req.session.isAdmin});
                        }
                        else {
                            res.render('checkout', { title: 'Checkout', data: rows2.recordsets[0], isAdmin: req.session.isAdmin});
                        }
                    })
                }
            })
        }
        else{
            var request = new sql.Request();
            var query = "SELECT shoppingCart.userID, shoppingCart.productID, shoppingCart.numItems, products.fullName, products.price FROM shoppingCart INNER JOIN products ON shoppingCart.productID = products.productID WHERE userID = "+req.session.userID+";";
            request.query(query, function(err, rows1) {
                if(err) {
                    res.send(err);
                }
                if(rows1.recordsets[0].length == 0) {
                    req.flash('message', 'Nothing in shopping cart');
                }
                else {
                    if(err) res.send(err);
                    res.render('checkout', { title: 'Checkout', data: rows1.recordsets[0], userID: req.session.userID, isAdmin: req.session.isAdmin});
                }
            })
        }
    })
});

module.exports = router;