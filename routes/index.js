var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home Page', isAdmin: null});
});

module.exports = router;