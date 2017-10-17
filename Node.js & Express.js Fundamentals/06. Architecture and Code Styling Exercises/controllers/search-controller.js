const Car = require('../models/Car');

function capitalize (str) {
    return str[0].toUpperCase() + str.slice(1);
}

module.exports = {
    searchBrandGet: (req, res) => {
        let brandName = req.query.brandName.toLowerCase();

        Car.find({brand: brandName}).then((cars) => {
            for (let car of cars) {
                if (car.isRented === false) {
                    car.isNotRented = true;
                }
            }
            cars.forEach(car => car.logged = req.user);
            cars.forEach(c => c.brand = capitalize(c.brand));
            res.render('car/search', {cars: cars, brand: req.query.brandName});

        }).catch((err) => {
            console.log(err);
            return;
        });
    }
}