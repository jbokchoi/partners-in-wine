var Wine = require('../models/wine');
var Partner = require('../models/partner');

module.exports = {
  create
};

function create(req, res) {
  Wine.findById(req.params.id, function (err, wine) {
    wine.reviews.unshift(req.body);
    wine.save(function (err) {
      res.redirect('/wines/index');
    });
  });
}