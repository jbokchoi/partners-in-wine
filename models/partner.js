var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var partnerSchema = new Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    wineLists: [{type: Schema.Types.ObjectId, ref: 'WineList'}] 
}, {
    timestamps: true
});

module.exports = mongoose.model('Partner', partnerSchema);