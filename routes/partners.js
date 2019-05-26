var express = require('express');
var router = express.Router();
var partnersController = require('../controllers/partners');

/* GET users listing. */
router.get('/myDashboard', isLoggedIn, partnersController.index);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;
