var WineList = require('../models/wineList');
var Wine = require('../models/wine');
var Partner = require('../models/partner');

module.exports = {
    index,
    create,
    show,
    addWinesToList,
    delete: deleteWineList, 
    deleteWineFromList
};

function deleteWineFromList (req, res, next) {
    WineList.findById(req.params.id, function (err, wineList) {
        wineList.wines.remove(req.body.wine);
        wineList.save(function (err) {
            res.redirect(`/wineLists/${wineList._id}`);
        });
    });
}


function deleteWineList(req, res, next) {
    WineList.findByIdAndDelete(req.params.id, function (err) {
        res.redirect('/wineLists/index');
    })
}

function addWinesToList(req, res, next) {
    WineList.findById(req.params.id, function (err, wineList) {
        wineList.wines.push(req.body.wineId);
        wineList.save(function (err) {
            res.redirect(`/wineLists/${wineList._id}`);
        });
    });
}

function show(req, res, next) {
    WineList.findById(req.params.id)
        .populate('wines')
        .populate('createdBy')
        .exec(function (err, wineList) {
            Wine.find({ _id: { $nin: wineList.wines } })
                .exec(function (err, wines) {
                    res.render('wineLists/show', { wineList, wines, partner: req.user });
                });
        });
}


function create(req, res, next) {
    var wineList = new WineList(req.body);
    wineList.save(function (err) {
        Partner.find({}).exec(function (err) {
            wineList.createdBy = req.user;
            wineList.save(function (err) {
                    res.redirect('/wineLists/index')
            });
        });
    });
}

function index(req, res, next) {
    WineList.find({}).populate('createdBy').exec(function (err, wineList) {
        Wine.find({}, function (err, wines) {
            res.render('wineLists/index', { partner: req.user, wineList, wines })
        });
    });
}

