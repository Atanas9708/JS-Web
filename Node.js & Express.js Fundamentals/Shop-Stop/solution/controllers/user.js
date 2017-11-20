const User = require('../models/User');
const Product = require('../models/Product');
const encryption = require('../utilities/encryption');
const fs = require('fs');
const path = require('path');

module.exports.registerGet = (req, res) => {
    res.render('user/register');
}

module.exports.registerPost = (req, res) => {
    let user = req.body;

    if (user.password && user.password !== user.confirmedPassword) {
        user.error = 'Passwords do not match.';
        res.render('user/register', user);
        return;
    }

    let salt = encryption.generateSlat();
    user.salt = salt;

    if (user.password) {
        let hashedPassword = encryption.generateHashedPassword(salt, user.password);
        user.password = hashedPassword;
    }

    User.create(user).then((user) => {
        req.logIn(user, (error, user) => {
            if (error) {
                res.render('user/register', { error: 'Authentication not workin!' });
                return;
            }

            res.redirect('/');
        });
    }).catch((err) => {
        user.error = err;
        res.render('user/register', user);
    });
}

module.exports.loginGet = (req, res) => {
    res.render('user/login');
}

module.exports.loginPost = (req, res) => {
    let userToLogIn = req.body;

    User.findOne({ username: userToLogIn.username }).then((user) => {
        if (!user || !user.authenticate(userToLogIn.password)) {
            res.render('user/login', { error: 'Invalid crendetials!' });
        } else {
            req.logIn(user, (err, user) => {
                if (err) {
                    res.render('user/login', { error: 'Authentication not working!' });
                    return;
                }

                res.redirect('/');
            });
        }
    }).catch((err) => {
        console.log(err);
        return;
    });
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports.discardGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id).then((product) => {
        if (!product) {
            res.sendStatus(404);
            return;
        }
        let userId = req.user.id;

        User.findById(userId).then((user) => {
            let isValid = false;
            let products = [];
            for (let product of user.boughtProducts) {
                products.push(product.toHexString());
            }

            if (req.user.roles.indexOf('Admin') > -1 || products.includes(id)) {
                res.render('user/discard', { product: product });
            } else {
                res.render('error');
                return;
            }
        }).catch((err) => {
            res.render('error');
            console.log(err);
            return;
        });
    }).catch((err) => {
        res.render('error');
        console.log(err);
        return;
    });
}

module.exports.discardPost = (req, res) => {
    let id = req.params.id;
    
        Product.findByIdAndRemove(id).then((product) => {
            if (!product) {
                res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
                return;
            }

            let userId = req.user.id;

            User.findById(userId).then((user) => {
                let isValid = false;
                let products = [];
                for (let product of user.boughtProducts) {
                    products.push(product.toHexString());
                }
    
                fs.unlink(path.normalize(path.join('.', product.image)), () => {
                    res.redirect(`/?success= ${encodeURIComponent('Item was discarded successfully!')}`);
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

module.exports.cart = (req, res) => {
    let userToCheck = req.user.username;

    User.findOne({ username: userToCheck }).then((user) => {
        let productsToCheck = user.boughtProducts;
        let productIds = [];
        for (let productToCheck of productsToCheck) {
            productIds.push(productToCheck.toHexString());
        }

        Product.find({ _id: { $in: productIds } }).then((products) => {
            res.render('user/cart', { products: products, user: req.user });
        });
    }).catch((err) => {
        console.log(err);
        return;
    });
}
