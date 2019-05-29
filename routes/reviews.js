var express = require('express');
var router = express.Router();
var reviewsController = require('../controllers/reviews');

router.post('/wines/:id/reviews', reviewsController.create);
router.delete('/:wineId/:reviewId', reviewsController.deleteReview);

module.exports = router;