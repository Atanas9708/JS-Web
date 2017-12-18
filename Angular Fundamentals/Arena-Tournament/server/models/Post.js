const mongoose = require('mongoose');
const commentSchema = mongoose.model('Comment').schema;

const postSchema = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
    image: { type: mongoose.Schema.Types.String, required: true },
    class: { type: mongoose.Schema.Types.String, required: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    category: { type: mongoose.Schema.Types.String, required: true },
    comments: [commentSchema],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    author: { type: mongoose.Schema.Types.String, required: true },
    createdOn: { type: mongoose.Schema.Types.Date }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;