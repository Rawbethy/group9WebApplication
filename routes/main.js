var express = require('express');
var router = express.Router();
var config = require('./dbconfig');
var sql = require('mssql');

/* GET contact page. */
router.get('/', function(req, res, next) {
  var query = "SELECT * FROM [dbo].[products];";
  sql.connect(config, function(err) {
      if(err) console.log(err);
      var request = new sql.Request();
      request.query(query, function(err, rows) {
          if(err) {
              res.redirect('mainAdmin');
          }
          if(rows.length == 0) {
              req.flash('message', 'No Data in Inventory');
              res.redirect('main');
          }
          else {
              res.render('main', {data: rows.recordsets[0], userID: req.session.userID, isAdmin: req.session.isAdmin});
          }
      })
  })
});

module.exports = router;