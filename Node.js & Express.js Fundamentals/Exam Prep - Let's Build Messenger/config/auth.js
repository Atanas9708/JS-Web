const User = require('../models/User')

module.exports = {
  isAuthed: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/user/login')
    }
  },
  hasRole: role => (req, res, next) => {
    if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
      next()
    } else {
      res.redirect('/user/login')
    }
  },
  isNotBlocked: (req, res, next) => {
    let otherUser = req.params.username

    User.findOne({ username: otherUser }).then(otherUser => {
      if (otherUser.blockedUsers.indexOf(req.user._id) !== -1) {
        res.redirect(
          `/?error=${otherUser.username} has blocked you, and I restritect the post method :)`
        )
      } else {
        next()
      }
    })
  }
}
