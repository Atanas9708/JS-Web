const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const localSignupStrategy = require('./../config/passport/local-signup');
const localLoginStrategy = require('./../config/passport/local-login');
const cors = require('cors');

module.exports = app => {
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors());

    passport.use('local-signup', localSignupStrategy)
    passport.use('local-login', localLoginStrategy)

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }
        next();
    });
};