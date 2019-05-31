var Wine = require('../models/wine');
var Partner = require('../models/partner');

module.exports = {
  create,
  deleteReview
};

function deleteReview(req, res, next) {
  Wine.findById(req.params.wineId, function (err, wine) {
    wine.reviews.id(req.params.reviewId).remove();
    wine.save(function (err) {
      res.redirect(`/wines/${wine._id}`)
    });
  });
}


function create(req, res) {
  Wine.findById(req.params.id, function (err, wine) {
    wine.reviews.unshift(req.body);
    wine.save(function (err) {
      res.redirect('/wines/index');
    });
  });
}