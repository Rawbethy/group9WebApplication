var express = require('express');
var router = express.Router();


/* GET insert product page. */
router.get('/', function(req, res, next) {
    var userID = req.session.user
    res.render('insertForm', { title: 'Insert Products', userID: userID});
});

module.exports = router;