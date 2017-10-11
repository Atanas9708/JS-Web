const mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
    description: { type: mongoose.Schema.Types.String, required: true },
    imageTitle: { type: mongoose.Schema.Types.String, required: true },
    imageUrl: { type: mongoose.Schema.Types.String, required: true},
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] ,
    date: { type: mongoose.Schema.Types.Date, default: Date.now() }
});

let Image = mongoose.model('Image', imageSchema);

module.exports = Image;