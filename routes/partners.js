var express = require('express');
var router = express.Router();
var partnersController = require('../controllers/partners');

/* GET users listing. */
router.get('/myDashboard', isLoggedIn, partnersController.index);
router.get('/allPartners', isLoggedIn, partnersController.getAllPartners);
router.post('/:id/addFriend', isLoggedIn, partnersController.addFriend);
router.put('/:id', isLoggedIn, partnersController.editDrink);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;
