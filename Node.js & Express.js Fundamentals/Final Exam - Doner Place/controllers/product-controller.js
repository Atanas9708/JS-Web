const Product = require('../models/Product');

module.exports = {
    productCreateGet: (req, res) => {
        let toppings = [
            'pickle', 'tomato', 'onion', 'lettuce', 'hot sauce', 'extra souce'
        ];
        res.render('create-product', {toppings: toppings});
    },
    productCreatePost: (req, res) => {
        let input = req.body;
        let toppings = [];

        if (input.size < 17 || input.size > 24) {
            res.redirect('/');
            return;
        }
        if (input.topping && typeof input.topping === 'object') {
            for (let topping of input.topping) {
                toppings.push(topping);
            }
        } else if (typeof input.topping === 'string') {
            toppings.push(input.topping);
        }

        let productObj = {
            category: input.category,
            image: input.imageUrl,
            size: input.size,
            toppings: toppings
        };

        Product.create(productObj).then((product) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return;
        });
    }
}