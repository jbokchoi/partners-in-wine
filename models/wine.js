var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5}, 
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'Partner' }
  }, {
    timestamps: true    
})

var wineSchema = new Schema({
    name: {type: String, required: true, unique: true},
    style: {type: String, required: true, enum: ["Red", "White", "Rose", "Sparkling", "Dessert"]},
    sweetness: {type: String, enum: ["Dry", "Semi-Sweet", "Sweet", "Not Sure"]},
    type: String,
    country: String,
    addedBy: { type: Schema.Types.ObjectId, ref: 'Partner' },
    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Wine', wineSchema);