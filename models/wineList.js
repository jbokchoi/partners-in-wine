var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var wineListSchema = new Schema({
    name: String,
    description: String,
    wines: [{ type: Schema.Types.ObjectId, ref: 'Wine' }],
    createdBy: {type: Schema.Types.ObjectId, ref: 'Partner'}
}, {
    timestamps: true
});

module.exports = mongoose.model('WineList', wineListSchema);