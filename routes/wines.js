var express = require('express');
var router = express.Router();
var winesController = require('../controllers/wines');


router.get('/index', winesController.index);
router.get('/new', isLoggedIn, winesController.new);
router.get('/:id', winesController.show);
router.get('/:id/edit', isLoggedIn, winesController.edit);
router.put('/:id', isLoggedIn, winesController.update);
router.post('/', isLoggedIn, winesController.create);
router.delete('/:id', isLoggedIn, winesController.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;