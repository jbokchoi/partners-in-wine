var Partner = require('../models/partner');

module.exports = {
    index,
};

function index (req, res, next) {
    res.render('partners/myDashboard', 
    { partner : req.user} 
)}