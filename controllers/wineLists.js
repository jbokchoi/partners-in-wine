var WineList = require('../models/wineList');
var Wine = require('../models/wine');

module.exports = {
    index,
    new: newWineList,
    create,
};

function create(req, res, next) {
    var wineList = new WineList(req.body);
    wineList.save(function (err) {
        err ?
            res.render('wineLists/new') : res.redirect('wineLists/index');
    })
}

function newWineList(req, res, next) {
    Wine.find({}, function(err, wines) {
        res.render('wineLists/new', { wines });
    });
}
 
function index (req, res, next) {
    res.render('wineLists/index')
}
