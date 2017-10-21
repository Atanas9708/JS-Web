const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Comment = require('../models/Comment');
const Hotel = require('../models/Hotel');
const Category = require('../models/Category');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/loginRegister');
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
        res.render('users/loginRegister');
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
            res.render('users/loginRegister');
        }
    },
    profile: (req, res) => {
        let username = req.params.name;

        User.findOne({ username: username })
            .populate({ path: 'hotels' })
            .populate({ path: 'comments' })
            .then((user) => {

                let userHotels = user.hotels;
                let userComments = user.comments;

                let hotels = [];

                for (let hotel of userHotels) {
                    let hotelObj = {
                        title: hotel.title,
                        location: hotel.location,
                        image: hotel.image,
                        description: hotel.description,
                        _id: hotel.id
                    };

                    hotels.push(hotelObj);
                }

                let comments = [];

                for (let comment of userComments) {
                    let commentObj = {
                        title: comment.title,
                        userComment: comment.content,
                        datePosted: comment.creationDate
                    };

                    comments.push(commentObj);
                }

                let data = {
                    hotels: hotels,
                    comments: comments
                };

                res.render('users/profile', data);

            }).catch((e) => {
                errorHandler(e);
            });
    },
    likeAndUnlike: (req, res) => {
        let hotelId = req.params.hotelId;
        let userId = req.user._id;

        Hotel.findById(hotelId).then((hotel) => {
            let likedHotel = hotel.likeCounter.indexOf(userId);

            if (likedHotel >= 0) {
                hotel.likeCounter.splice(likedHotel, 1);
            } else {
                hotel.likeCounter.push(userId);
            }

            hotel.save().then(() => {

                res.redirect('back');

            }).catch((err) => {
                console.log(err);
                return;
            });
        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    listUsers: (req, res) => {
        User.find().then((users) => {
            users = users.filter(u => u.username !== req.user.username && u.isAdmin === false);
            res.render('users/allUsers', { users: users });

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    promote: (req, res) => {
        let userId = req.params.id;

        User.findById(userId).then((user) => {
            user.isAdmin = true;
            user.save().then(() => {
                res.redirect('/');

            }).catch((err) => {
                console.log(err);
                return;
            });
        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    block: (req, res) => {
        let userId = req.params.id;

        User.findById(userId).then((user) => {
            user.isBlocked = true;
            user.save().then(() => {
                res.redirect('/users');

            }).catch((err) => {
                console.log(err);
                return;
            });
        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    unblock: (req, res) => {
        let userId = req.params.id;

        User.findById(userId).then((user) => {
            user.isBlocked = false;
            user.save().then(() => {
                res.redirect('/users');

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