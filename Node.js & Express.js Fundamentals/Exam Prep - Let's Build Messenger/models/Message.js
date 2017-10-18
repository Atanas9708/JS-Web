const mongoose = require('mongoose');

let messageSchmea = new mongoose.Schema({
    content: { type: mongoose.Schema.Types.String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
    dateCreated: { type: mongoose.Schema.Types.Date, dafault: Date.now() },
    isLink: { type: mongoose.Schema.Types.Boolean, default: false },
    isImage: { type: mongoose.Schema.Types.Boolean, default: false },
    isLiked: { type: mongoose.Schema.Types.Boolean, dafault: false },
    userLiked: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

messageSchmea.path('content').validate(function () {
    return this.content.length <= 1000;
});

let Message = mongoose.model('Message', messageSchmea);

module.exports = Message;