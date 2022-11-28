var express = require('express');
var router = express.Router();


/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('mainUser', { title: 'Home Page', userID: req.session.userID, isAdmin: req.session.isAdmin});
});

module.exports = router;