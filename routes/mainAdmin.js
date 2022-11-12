var express = require('express');
var router = express.Router();


/* GET login page. */
router.get('/', function(req, res, next) {
    var userID = req.session.user
    res.render('mainAdmin', { title: 'Home Page', userID: userID});
});

module.exports = router;