const Product = require('../models/Product');

module.exports = {
    index: (req, res) => {
        Product.find().then((products) => {
            let chickenProducts = [];
            let beefProducts = [];
            let lambProducts = [];

            for (let product of products) {
                if (product.category === 'chicken') {
                    chickenProducts.push(product);
                } else if (product.category === 'beef') {
                    beefProducts.push(product);
                } else {
                    lambProducts.push(product);
                }
            }

            res.render('index', {chickenProducts, beefProducts, lambProducts});

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    about: (req, res) => {
        res.render('home/about');
    }
};