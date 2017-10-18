const Car = require('../models/Car');
const User = require('../models/User');

module.exports = {
    rentCarGet: (req, res) => {
        let id = req.params.id;

        Car.findById(id).then((car) => {
            if (car.isRented) {
                res.send('Car is already rented.');
                return;
            }
            car.brand = car.brand[0].toUpperCase() + car.brand.slice(1);
            res.render('car/rent', { car: car });

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    rentCarPost: (req, res) => {
        let id = req.params.id;
        let daysToRent = req.body.daysToRent;

        Car.findById(id).then((car) => {
            car.isRented = true;
            car.rentDays = daysToRent;
            car.rentDate = Date.now();
            car.save();

            let username = req.user.username;

            User.findOne({ username: username }).then((user) => {
                user.rentedCars.push(car._id);
                user.save().then(() => {
                    res.redirect('/');

                }).catch((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
            }).catch((err) => {
                console.log(err);
                return;
            });

        }).catch((err) => {
            console.log(err);
            return;
        });
    }
}