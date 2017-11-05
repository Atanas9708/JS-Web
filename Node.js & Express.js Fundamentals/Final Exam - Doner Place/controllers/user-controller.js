const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Product = require('../models/Product');
const Order = require('../models/Order');

module.exports = {
    registerGet: (req, res) => {
        res.render('register');
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
                    res.render('register', user);
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
        res.render('login');
    },
    loginPost: (req, res) => {
        const reqUser = req.body;

        User.findOne({ username: reqUser.username })
            .then((user) => {
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
            res.render('login');
        }
    }
};