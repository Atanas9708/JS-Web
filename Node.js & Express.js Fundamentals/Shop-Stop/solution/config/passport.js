const passport= require('passport');
const localPassport = require('passport-local');
const User = require('mongoose').model('User');

module.exports = () => {
    passport.use(new localPassport((username, password, done) => {
        User.findOne({username: username}).then((user) => {
            if (!user) { return done(null, false) }
            if (!user.authenticate(password)) { return done(null, false) }
            return done(null, user);
        }).catch((err) => {
            console.log(err);
            return;
        });
    }));

    passport.serializeUser((user, done) => {
        if (user) { return done(null, user._id) }
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            if (!user) { return done(null, false) }
            return done(null, user);
        }).catch((err) => {
            console.log(err);
            return;
        });
    });
}