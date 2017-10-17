const mongoose = require('mongoose');

let carSchema = mongoose.Schema({
    brand: { type: mongoose.Schema.Types.String, required: true },
    model: { type: mongoose.Schema.Types.String, required: true },
    image: { type: mongoose.Schema.Types.String, required: true },
    pricePerDay: { type: mongoose.Schema.Types.Number, required: true },
    year: { type: mongoose.Schema.Types.Number, required: true },
    creationDate: { type: mongoose.Schema.Types.Date, required: true },
    rentDate: { type: mongoose.Schema.Types.Date },
    isRented: { type: mongoose.Schema.Types.Boolean, required: true },
    rentDays: { type:mongoose.Schema.Types.Number, default: 0}
});


let Car = mongoose.model('Car', carSchema);

module.exports = Car;
