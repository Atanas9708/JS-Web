const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/loginRegister', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/loginRegister', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);
    app.get('/profile/:name', restrictedPages.isAuthed, controllers.user.profile);

    app.get('/addHotel', restrictedPages.isAuthed, restrictedPages.isNotBlocked ,controllers.hotel.createHotelGet);
    app.post('/addHotel', restrictedPages.isAuthed, controllers.hotel.createHotelPost);
    app.get('/hotel/edit/:id', restrictedPages.hasRole('Admin'), controllers.hotel.editHotelGet);
    app.post('/hotel/edit/:id', restrictedPages.hasRole('Admin'), controllers.hotel.editHotelPost);
    app.get('/hotel/delete/:id', restrictedPages.hasRole('Admin'), controllers.hotel.deleteHotelGet);
    app.post('/hotel/delete/:id', restrictedPages.hasRole('Admin'), controllers.hotel.deleteHotelPost);
    app.get('/like/:hotelId', restrictedPages.isAuthed, controllers.user.likeAndUnlike);
    

    app.get('/addCategory', restrictedPages.hasRole('Admin'), controllers.category.addCategoryGet);
    app.post('/addCategory', restrictedPages.hasRole('Admin'), controllers.category.addCategoryPost);
    app.post('/delCategory/:id', restrictedPages.hasRole('Admin'), controllers.category.deleteCategory);
    app.get('/categories', controllers.category.listAllCategories);
    app.get('/category/:categoryName', controllers.category.hotelByCategory);

    app.get('/list', controllers.hotel.list);
    app.get('/details', controllers.hotel.getDetails);

    app.post('/comment/:id', restrictedPages.isAuthed, restrictedPages.isNotBlocked ,controllers.comment.createComment);
    app.get('/comment/edit', restrictedPages.hasRole('Admin'), controllers.comment.editCommentGet);
    app.post('/edit/comment', restrictedPages.hasRole('Admin'), controllers.comment.editCommentPost);

    app.get('/users', restrictedPages.hasRole('Admin'), controllers.user.listUsers);
    app.get('/make/admin/:id', restrictedPages.hasRole('Admin'), controllers.user.promote);
    app.get('/user/block/:id', restrictedPages.hasRole('Admin'), controllers.user.block);
    app.get('/user/unblock/:id', restrictedPages.hasRole('Admin'), controllers.user.unblock);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};