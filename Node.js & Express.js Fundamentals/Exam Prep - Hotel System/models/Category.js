const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    categoryName: { type: mongoose.Schema.Types.String, required: true, unique: true }
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;