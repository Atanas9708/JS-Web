const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    app.get('/createProduct', restrictedPages.hasRole('Admin'), controllers.product.productCreateGet);
    app.post('/createProduct', restrictedPages.hasRole('Admin'), controllers.product.productCreatePost);

    app.get('/customize-order/:id', restrictedPages.isAuthed, controllers.order.customizeOrder);
    app.get('/order-status', restrictedPages.isAuthed, controllers.order.orderStatus);
    app.get('/order-details/:id', restrictedPages.isAuthed, controllers.order.orderDetailsGet);
    app.post('/orderDetails/:id', restrictedPages.isAuthed, controllers.order.orderDetailsPost);

    app.get('/allOrders', restrictedPages.hasRole('Admin'), controllers.order.allOrdersGet);
    app.post('/all-orders', restrictedPages.hasRole('Admin'), controllers.order.allOrdersPost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};