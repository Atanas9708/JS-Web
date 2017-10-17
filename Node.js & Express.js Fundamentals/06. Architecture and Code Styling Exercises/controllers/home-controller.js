const Car = require('../models/Car');

module.exports = {
    index: (req, res) => {
        
        Car
        .find({isRented: false})
        .sort({creationDate: -1})
        .limit(3)
        .then((cars) => {

            cars.forEach(c => c.logged = req.user);
            res.render('home/index', {cars: cars});

        }).catch((err) => {
            console.log(err);
            return;
        });
    }
};