const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    categoryName: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }]
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;