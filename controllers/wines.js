var Wine = require('../models/wine');
var Partner = require('../models/partner');

module.exports = {
    index,
    new: newWine,
    create,
    show,
    delete: deleteWine,
    edit,
    update
};

function update(req, res) {
        Wine.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, wine) {
            if (err) {
                console.log(err)
            }
            res.redirect(`/wines/index`)
        });
}

function edit(req, res, next) {
    Wine.findById(req.params.id).exec(function (err, wine) {
        res.render(`wines/edit`, { wine, wineId: req.params.id, partner: req.user})
    });
}

function deleteWine(req, res, next) {
    Wine.findByIdAndDelete(req.params.id, function (err) {
        res.redirect('/wines/index');
    })
}

function show(req, res, next) {
    Wine.findById(req.params.id)
    .populate('addedBy').exec(function(err, wine) {
        res.render('wines/show', { wine });
    });
};

function create(req, res, next) {
    var wine = new Wine(req.body);    
    wine.save(function (err) {
        err ?
            res.render('wines/new') : 
            Partner.find({}).exec(function(err) {
                Partner.findById(req.user._id).exec(function(err) {
                    wine.addedBy = req.user;
                    wine.save(function (err) {
                        err ?
                            res.render('wines/new') : res.redirect('wines/index');
                    });
                });
            });
    });
}

function newWine(req, res, next) {
    res.render('wines/new');
}

function index (req, res, next) {
    var sort = {};
    var sortBy = req.query.sortBy;
    var sortDir = req.query.sortDir;
    sort[sortBy] = 1 * sortDir;
    Wine.find({}).sort(sort).exec(function (err, wines) {
        res.render('wines/index', { wines });
    });
}