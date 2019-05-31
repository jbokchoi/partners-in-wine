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
    Partner.findByIdAndUpdate(req.user.id, req.body, { new: true }, function (err, partner) {
        if (err) {
            console.log(err)
        }
        res.redirect(`/partners/myDashboard`)
    });
}


function addFriend(req, res, next) {
    if (req.user) {
        req.user.friends.push(req.params.id);
        req.user.save(function (err) {
            res.redirect('/partners/myDashboard')
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

function index(req, res, next) {
    if (req.user) {
        Partner.find({}).exec(function (err, partners) {
            Partner.findById(req.user._id)
                .populate('friends')
                .exec(function (err, loggedInPartner) {
                    WineList.find({}, function (err, wineLists) {
                        var wineList = wineLists.filter(function (wineList) {
                            if (wineList.createdBy == req.user.id) {
                                return true;
                            }
                        })
                        Partner.find({'_id': { $in: loggedInPartner.friends } })
                            .exec(function (err, friends) {
                                res.render('partners/myDashboard',
                                    { partner: req.user, friends, loggedInPartner, wineList });
                            });
                    })
                });
        });
    }                  
}