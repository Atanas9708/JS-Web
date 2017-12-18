const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    text: { type: mongoose.Schema.Types.String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    author: { type: mongoose.Schema.Types.String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    createdOn: { type: mongoose.Schema.Types.Date }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;