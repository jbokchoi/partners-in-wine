var WineList = require('../models/wineList');
var Wine = require('../models/wine');

module.exports = {
    index,
    new: newWineList,
    create,
};

function create(req, res, next) {
    var wineList = new WineList(req.body);
        // var listOfWines = req.body.wines;
        // var wines = {};
        //     for (var i = 0; i < listOfWines.length; i++) {
        // var wine = [];
        // wine.push(listOfWines);
        // wines[i] = wine;
        // }
        // wineList.name = req.body.name;
        // wineList.description = req.body.description;
        // wineList.wines = wines;
        // wineList.createdBy = req.user.name;

        wineList.save(function (err) {
            err ?
                res.render('wineLists/new') : res.redirect('wineLists/index', {wine});
    });
}

function newWineList(req, res, next) {
    Wine.find({}, function(err, wine) {
        res.render('wineLists/new', { wine });
    });
}
 
function index (req, res, next) {
    Wine.find({}, function(err, wines) {
    res.render('wineLists/index', { wines, partner: req.user })
    });
}