const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const passport = require('passport')
const authValidation = require('./../util/authValidation');

module.exports = {
    registerPost: (req, res, next) => {
        const validationResut = authValidation.validateSignupForm(req.body);
        if (!validationResut.success) {
            return res.status(200).json({
                success: false,
                message: validationResut.message,
                errors: validationResut.errors
            })
        }

        return passport.authenticate('local-signup', (err, token, userDdata) => {
            if (err) {
                console.log(err);
                return res.status(200).json({
                    success: false,
                    message: err
                })
            }

            return res.status(200).json({
                success: true,
                message: 'You have successfully signed up!',
                token,
                user: userDdata
            })
        })(req, res, next)
    },

    loginPost: (req, res, next) => {
        const validationResut = authValidation.validateLoginForm(req.body);
        if (!validationResut.success) {
            return res.status(200).json({
                success: false,
                message: validationResut.message,
                errors: validationResut.errors
            });
        }

        return passport.authenticate('local-login', (err, token, userData) => {
            if (err) {
                if (err.username === 'IncorrectCredentialsError') {
                    return res.status(200).json({
                        success: false,
                        message: err.message
                    })
                }

                return res.status(200).json({
                    success: false,
                    message: 'Could not process the form.'
                  })
            }

            return res.status(200).json({
                success: true,
                message: 'You have successfully logged in!',
                token,
                user: userData
            })
        })(req, res, next)
    },

    getCurrentUser: (req, res) => {
        let userId = req.params.id;

        User.findById(userId).then(user => {
            if (!user) {
                return res.status(200).json({
                    success: false,
                    message: 'User was not found!'
                });
            }

            return res.status(200).json({
                success: true,
                user
            })
        }).catch(err => {
            return res.status(200).json({
                success: false,
                message: 'Not found'
            })
        })
    }
};