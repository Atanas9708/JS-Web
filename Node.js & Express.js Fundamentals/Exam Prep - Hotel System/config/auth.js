module.exports = {
    isAuthed: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/loginRegister');
        }
    },
    hasRole: (role) => (req, res, next) => {
        if (req.isAuthenticated() &&
            req.user.isAdmin) {
            next();
        } else {
            res.redirect('/loginRegister');
        }
    },
    isNotBlocked: (req, res, next) => {
        if (req.isAuthenticated() &&
            req.user.isBlocked === false) {
            next();
        } else {
            res.render('home/index', { globalError: 'You are blocked! You cannot post new hotels or comments' });
        }
    }
}