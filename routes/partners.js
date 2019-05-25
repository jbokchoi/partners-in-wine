var express = require('express');
var router = express.Router();
var partnersController = require('../controllers/partners');

/* GET users listing. */
router.get('/myDashboard', partnersController.index);

module.exports = router;
