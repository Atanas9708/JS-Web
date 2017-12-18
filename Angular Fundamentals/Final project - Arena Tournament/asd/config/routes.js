const controllers = require('../controllers');

module.exports = app => {
    app.post('/register', controllers.user.registerPost);
    app.post('/login', controllers.user.loginPost);
    app.get('/getUser/:id', controllers.user.getCurrentUser);

    app.get('/allPosts', controllers.post.getAllPosts);
    app.get('/user/:username', controllers.post.getUserPosts);
    app.get('/post/:id', controllers.post.getPostById);
    app.post('/create', controllers.post.createPost);
    app.post('/edit/:id', controllers.post.editPost);
    app.post('/delete/:id', controllers.post.deletePost);
    app.post('/like', controllers.post.likeAndUnlike);

    app.post('/createComment', controllers.comment.createComment);
    app.post('/deleteComment', controllers.comment.deleteComment);

    app.get('/search/:term', controllers.search.searchTerm);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};