var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var wineSchema = new Schema({
    name: String,
    color: String,
    type: String,
    country: String,
    addedBy: { type: Schema.Types.ObjectId, ref: 'Partner' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Wine', wineSchema);