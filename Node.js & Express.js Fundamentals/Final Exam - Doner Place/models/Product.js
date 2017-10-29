const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.String, required: true },
    size: { 
        type: mongoose.Schema.Types.Number,
        required: true,
        min: 17,
        max: 24, 
    },
    image: { type: mongoose.Schema.Types.String },
    toppings: [{ type: mongoose.Schema.Types.String }]
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;