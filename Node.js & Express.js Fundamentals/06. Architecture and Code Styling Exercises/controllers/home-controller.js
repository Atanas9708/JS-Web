const Car = require('../models/Car');

function capitalize (str) {
    return str[0].toUpperCase() + str.slice(1);
}

module.exports = {
    index: (req, res) => {
        
        Car
        .find({isRented: false})
        .sort({creationDate: -1})
        .limit(3)
        .then((cars) => {

            cars.forEach(c => c.brand = capitalize(c.brand));
            cars.forEach(c => c.logged = req.user);
            res.render('home/index', {cars: cars});

        }).catch((err) => {
            console.log(err);
            return;
        });
    }
};