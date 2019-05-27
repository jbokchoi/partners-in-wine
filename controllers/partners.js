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
    res.render('partners/myDashboard', 
    { partner : req.user} 
)}