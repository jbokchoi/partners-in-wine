var Partner = require('../models/partner');

module.exports = {
    index,
    getAllPartners
};

function getAllPartners(req, res, next) {
    let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i')} : {};
    let sortKey = req.query.sort || 'name';
    Partner.find(modelQuery)
    .sort(sortKey).exec(function(err, partners) {
        if (err) return next (err);
        res.render('partners/allPartners', {
            partners,
            partner: req.user,
            name: req.query.name,
            sortKey
        });
    });
}

function index (req, res, next) {
    if (req.user) {
        Partner.find({}).exec(function(err, partners) {
            Partner.findById(req.user._id).exec(function(err, loggedInPartner) {
                res.render('partners/myDashboard', 
                { partner: req.user, partners, loggedInPartner }); 
            });
        });
    } else {
        Partner.find({}).exec(function(err, partners) {
            res.render('partners/dashboard', {partners, loggedInPartner: null });
        });
    } 
}