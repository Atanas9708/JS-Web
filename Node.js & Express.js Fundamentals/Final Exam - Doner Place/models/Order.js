const mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    date: { type: mongoose.Schema.Types.Date },
    toppings: [{ type: mongoose.Schema.Types.String }],
    status: { type: mongoose.Schema.Types.String }
});

let Order = mongoose.model('Order', orderSchema);

module.exports = Order;