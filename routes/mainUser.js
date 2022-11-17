var express = require('express');
var router = express.Router();


/* GET login page. */
router.get('/', function(req, res, next) {
    var userID = req.session.user
    res.render('mainUser', { title: 'Home Page', userID: req.session.userID, isAdmin: req.session.isAdmin});
});

module.exports = router;