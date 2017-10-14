const mongoose = require('mongoose');

let genreSchema = mongoose.Schema({
    genreName: { type: mongoose.Schema.Types.String, required: true, unique: true},
    memeList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }]
});

module.exports = mongoose.model('Genre', genreSchema);