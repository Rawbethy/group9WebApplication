var express = require('express');
var router = express.Router();


/* GET insert product page. */
router.get('/', function(req, res, next) {
    res.render('insertForm', { title: 'Insert Products', userID: req.session.userID, isAdmin: req.session.isAdmin, message: req.flash('message')});
});

module.exports = router;