const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');
const session = require('express-session');
const pagination = require('express-paginate');
const passport = require('passport');

module.exports = app => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(fileUploader());
    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }
        next();
    });

    app.set('view engine', '.hbs');

    app.use((req, res, next) => {
        if (req.url.startsWith('/static')) {
            req.url = req.url.replace('/static', '');
        }

        if (req.url.startsWith('/rent/static')) {
            req.url = req.url.replace('/rent/static', '');
        }

        if (req.url.startsWith('/edit/static')) {
            req.url = req.url.replace('/edit/static', '');
        }

        next();
    }, express.static('./static'));

    //app.use(express.static('./static'));
    //app.use(express.static('./images'));
};