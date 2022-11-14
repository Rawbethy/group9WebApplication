var express = require('express');
var router = express.Router();


/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'About' , isAdmin: req.session.isAdmin});
});

module.exports = router;
