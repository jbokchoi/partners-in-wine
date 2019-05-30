var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var partnerSchema = new Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    currentDrink: {type: String, default: "wine"},
    wineLists: [{type: Schema.Types.ObjectId, ref: 'WineList'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'Partner'}], 
}, {
    timestamps: true
});

module.exports = mongoose.model('Partner', partnerSchema);