var Partner = require('../models/partner');
var Wine = require('../models/wine');
var WineList = require('../models/wineList');

module.exports = {
    index,
    getAllPartners, 
    addFriend,
    editDrink
};

function editDrink(req, res, next) {
    Partner.findByIdAndUpdate(req.user.id, req.body, {new: true}, function(err, partner) {
        if (err) {
            console.log(err)
            }
            res.redirect(`/partners/myDashboard`)
        });
}


function addFriend(req, res, next) {
    if (req.user) {
        Partner.findById(req.user.id, function (err, partner) {
            console.log(req.user.id)
            console.log("lemons", req.body, "lemons");
            console.log("apples", req.params.id, "apples");
            partner.friends.push(req.params.id);
            console.log(req.params.id)
            partner.save(function (err) {
                res.redirect('/partners/myDashboard')
            });
        });
    }
}

function getAllPartners(req, res, next) {
    Partner.find({}, function (err, partner) {
    res.render('partners/allPartners', {
        partner,
        loggedInPartner: req.user,
        name: req.query.name,
        });
    });
}

function index (req, res, next) {
    if (req.user) {
        Partner.find({}).exec(function(err, partners) {
            Partner.findById(req.user._id)
            .populate('friends')
            .exec(function(err, loggedInPartner) {
                WineList.find({}, function(err, wineLists) {
                var wineList = wineLists.filter(function(wineList) {
                    if (wineList.createdBy == req.user.id){
                        return true;
                    }
                })
                res.render('partners/myDashboard', 
                { partner: req.user, partners, loggedInPartner , wineList}); 
                });
            });
        });
    } else {
        Partner.find({}).exec(function(err, partners) {
            res.render('partners/dashboard', {partners, loggedInPartner: null });
        });
    } 
}              