var express = require('express');
var router = express.Router();


/* GET login page. */
router.get('/', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;