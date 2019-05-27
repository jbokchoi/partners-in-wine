var Wine = require('../models/wine');

module.exports = {
  create
};

function create(req, res) {
  Wine.findById(req.params.id, function(err, wine) {
    wine.reviews.push(req.body);
    wine.save(function(err) {
      res.redirect(`/wines/${wine._id}`);
    });
  });
}