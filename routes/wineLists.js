var express = require('express');
var router = express.Router();
var wineListsController = require('../controllers/wineLists');

router.get('/index', isLoggedIn, wineListsController.index);
router.get('/new', isLoggedIn, wineListsController.new);
router.post('/', isLoggedIn, wineListsController.create);
router.get('/:id', wineListsController.show);
router.post('/:id/wines', isLoggedIn, wineListsController.addWinesToList);
router.delete('/:id', isLoggedIn, wineListsController.delete);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;