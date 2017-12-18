const user = require('./user-controller');
const post = require('./post-controller');
const comment = require('./comment-controller');
const search = require('./search-controller');

module.exports = {
    user,
    post,
    comment,
    search
};