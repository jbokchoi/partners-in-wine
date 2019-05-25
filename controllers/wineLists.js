var WineLists = require('../models/wineList');

module.exports = {
    index,
};

function index (req, res, next) {
    res.render('wineLists/index')
}
