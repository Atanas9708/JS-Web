const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
    res.render('category/add');
}

module.exports.addPost = (req, res) => {
    let category = req.body;
    category.creator = req.user_id;
    Category.create(category).then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return;
    });
}

module.exports.productByCategory = (req, res) => {
    let categoryName = req.params.category;

    Category
        .findOne({ name: categoryName })
        .populate('products')
        .then((category) => {
            if (!category) {
                res.sendStatus(404);
                return;
            }
           
            category.products = category.products.filter(x => x.buyer === undefined);
            res.render('category/products', {category: category, user: req.user});
        }).catch((err) => {
            console.log(err);
            return;
        });
}