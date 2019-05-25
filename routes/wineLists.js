var express = require('express');
var router = express.Router();
var wineListsController = require('../controllers/wineLists');

router.get('/index', wineListsController.index);

module.exports = router;