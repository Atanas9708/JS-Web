const mongoose = require('mongoose');

let memeSchema = mongoose.Schema({
    memeUrl: {type: mongoose.Schema.Types.String, required: true},
    genreSelect: { type: mongoose.Schema.Types.String, required: true},
    memeName: { type: mongoose.Schema.Types.String, required: true},
    memeDescription: { type: mongoose.Schema.Types.String, required: true},
    status: { type: mongoose.Schema.Types.String, required: true},
    date: { type: mongoose.Schema.Types.Date, default: Date.now() }
});

module.exports = mongoose.model('Meme', memeSchema);