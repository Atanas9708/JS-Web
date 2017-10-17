const Car = require('../models/Car');

function capitalize (str) {
    return str[0].toUpperCase() + str.slice(1);
}


module.exports = {
    addCarGet: (req, res) => {
        res.render('car/add');
    },
    addCarPost: (req, res) => {
        let inputBody = req.body;
        let image = req.files.image;
        let imagePath = `./static/images/${image.name}`;

        let carObj = {
            brand: inputBody.brand.toLowerCase(),
            model: inputBody.model,
            image: imagePath,
            pricePerDay: inputBody.pricePerDay,
            year: inputBody.year,
            creationDate: Date.now(),
            isRented: false,
        }

        Car.create(carObj).then((car) => {
            image.mv(imagePath, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });

            res.redirect('/');

        }).catch((err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    },
    allCarsGet: (req, res) => {

        let page = Number(req.query.page);

        let prevPage = page - 1;
        let nextPage = page + 1;

        Car
        .find({ isRented: false })
        .sort({ creationDate: -1 })
        .skip(page * 10)
        .limit(10)
        .then((cars) => {

            if (prevPage < 0) {
                prevPage = 0;
            }

            let pages = {
                prevPage,
                nextPage
            };
            
            cars.forEach(c => c.logged = req.user);
            cars.forEach(c => c.brand = capitalize(c.brand));

            res.render('car/all', { cars, pages });

        }).catch((err) => {
            console.log(err);
            return;
        });
    },

    editCarGet: (req, res) => {
        let id = req.params.id;

        Car.findById(id).then((car) => {
            res.render('car/edit', {car: car});

        }).catch((err) => {
            console.log(err);
            return;
        });
    },

    editCarPost: (req, res) => {
        let id = req.params.id;
        let input = req.body;
        
        Car.findById(id).then((car) => {
            car.brand = input.brand;
            car.model = input.model;
            car.pricePerDay = input.pricePerDay;
            car.year = input.year;
            car.save().then(() => {
                
            res.redirect('/');        

            }).catch((err) => {
                console.log(err);
                return;
            });

        }).catch((err) => {
            console.log(err);
            return;
        });
    }
}