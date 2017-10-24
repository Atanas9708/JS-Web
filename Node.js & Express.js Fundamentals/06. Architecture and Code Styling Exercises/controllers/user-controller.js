const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Car = require('mongoose').model('Car');

function capitalize (str) {
    return str[0].toUpperCase() + str.slice(1);
}

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);

        User.create({
            username: reqUser.username,
            hashedPass,
            salt,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            roles: []
        }).then((user) => {
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        }).catch((e) => {
            errorHandler(e);
        });

    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: (req, res) => {
        const reqUser = req.body;

        User.findOne({ username: reqUser.username }).then((user) => {
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        }).catch((e) => {
            errorHandler(e);
        });


        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    },

    profile: (req, res) => {
        let username = req.user.username;

        User.findOne({username: username})
        .populate('rentedCars')
        .then((user) => {
            let rentedCars = user.rentedCars;
            
            Car.find({_id: {$in: rentedCars }}).then((resultCars) => {
                for (let car of resultCars) {
                    car.parsedDate = car.rentDate.toDateString();
                    car.totalPrice = car.pricePerDay * car.rentDays;
                    car.brand = capitalize(car.brand);
                }
                res.render('users/profile', {cars: resultCars});

            }).catch((err) => {
                console.log(err);
                return;
            });
            
        }).catch((err) => {
            console.log(err);
            return;
        });
    }
};