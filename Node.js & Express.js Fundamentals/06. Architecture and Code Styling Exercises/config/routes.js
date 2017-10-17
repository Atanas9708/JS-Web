const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/profile', restrictedPages.isAuthed, controllers.user.profile);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    app.get('/addCar', restrictedPages.hasRole('Admin'),  controllers.car.addCarGet);
    app.post('/addCar', restrictedPages.hasRole('Admin'), controllers.car.addCarPost);
    app.get('/edit/:id', restrictedPages.hasRole('Admin'), controllers.car.editCarGet);
    app.post('/edit/:id', restrictedPages.hasRole('Admin'), controllers.car.editCarPost);

    app.get('/allCars', controllers.car.allCarsGet);
    app.get('/searchBrand', controllers.search.searchBrandGet);

    app.get('/rent/:id', restrictedPages.isAuthed, controllers.rentCar.rentCarGet);
    app.post('/rent/:id', restrictedPages.isAuthed, controllers.rentCar.rentCarPost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};