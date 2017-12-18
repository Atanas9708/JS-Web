const User = require('./../../models/User');
const PassportLocalStrategy = require('passport-local').Strategy;
const encryption = require('./../../util/encryption');
const jwt = require('jsonwebtoken');

module.exports = new PassportLocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, username, password, done) => {
    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, password).trim();
    const user = {
        username: username.trim(),
        email: req.body.email.trim(),
        hashedPass,
        repeatPass: req.body.repeatPass.trim(),
        salt
    };

    User.create(user)
        .then((user) => {
            const payload = {
                sub: user._id
            };

            const token = jwt.sign(payload, 's0m3 r4nd0m string');
            const data = {
                username: user.username,
                userId: user._id,
                isAdmin: user.isAdmin
            };
            return done(null, token, data);
        })
        .catch(err => {
            if (err['message'].includes('email')) {
                return done('Email already exist!');
            }

            if (err['message'].includes('username')) {
                return done('Userame already exist!');
            }
            
        })
})