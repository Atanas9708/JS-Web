const mongoose = require('mongoose');
const commentSchema = mongoose.model('Comment').schema;

let hotelSchema = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    location: { type: mongoose.Schema.Types.String, required: true },
    image: { type: mongoose.Schema.Types.String, required: true },
    comments: [commentSchema],
    category: { type: mongoose.Schema.Types.String, required: true },
    viewCounter: { type: mongoose.Schema.Types.Number, dafault: 0 },
    likeCounter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    creationDate: { type: mongoose.Schema.Types.Date, required: true }
});

let Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;