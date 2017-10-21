const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
    content: { type: mongoose.Schema.Types.String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true},
    creationDate: { type: mongoose.Schema.Types.Date, required: true }
});

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;