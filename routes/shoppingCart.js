var express = require('express');
var router = express.Router();


/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('shoppingCart', { title: 'Shopping Cart', userID: req.session.userID, isAdmin: req.session.isAdmin});
});

module.exports = router;