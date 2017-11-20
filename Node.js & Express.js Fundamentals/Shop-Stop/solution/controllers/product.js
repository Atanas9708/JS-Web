const fs = require('fs');
const path = require('path');

const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');

module.exports.addGet = (req, res) => {
    Category.find({}).then((categories) => {
        res.render('product/add', { categories: categories });
    });
    
}

module.exports.addPost = (req, res) => {
    let productObj = req.body;
    productObj.image = '\\' + req.file.path;
    productObj.creator = req.user._id.toString();

    Product.create(productObj).then((product) => {
        User.findOne({username: req.user.username}).then((user) => {
            user.createdProducts.push(product._id);
            user.save().then(() => {
                Category.findById(product.category).then((category) => {
                    category.products.push(product._id);
                    category.save().then(() => {
                        res.redirect('/');
        
                    }).catch((err) => {
                        console.log(err);
                        return;
                    });
                }).catch((err) => {
                    console.log(err);
                    return;
                });
            });
        });
    }).catch((err) => {
        console.log(err);
        return;
    });
}

module.exports.editGet = (req, res) => {
    let id = req.params.id;
    Product.findById(id).then((product) => {
        if (!product) {
            res.sendStatus(404);
            return;
        }
        if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') > -1) {
            Category.find().then((categories) => {
                res.render('product/edit', {
                    product: product,
                    categories: categories
                });
            }).catch((err) => {
                console.log(err);
                return;
            });
        } else {
            res.render('error');
            return;
        }
    }).catch((err) => {
        res.render('error');
        console.log(err);
        return;
    });
}

module.exports.editPost = (req, res) => {
    let id = req.params.id;
    let editedProduct = req.body;

    Product.findById(id).then((product) => {
        if (!product) {
            res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
            return;
        }

        product.name = editedProduct.name;
        product.description = editedProduct.description;
        product.price = editedProduct.price;

        if (req.file) {
            product.image = '\\' + req.file.path;
        }

        if (product.category.toString() !== editedProduct.category) {
            Category.findById(product.category).then((currentCategory) => {
                Category.findById(editedProduct.category).then((nextCategory) => {
                    let index = currentCategory.products.indexOf(product._id);
                    if (index > 0) {
                        currentCategory.product.splice(index, 1);
                    }

                    currentCategory.save();

                    nextCategory.products.push(product._id);
                    nextCategory.save();

                    product.category = editedProduct.category;
                    product.save().then(() => {
                        res.redirect(`/?success= ${encodeURIComponent('Product was edited successfully!')}`);

                    }).catch((err) => {
                        console.log(err);
                        return;
                    });
                }).catch((err) => {
                    console.log(err);
                    return;
                });
            });
        } else {
            product.save().then(() => {
                res.redirect(`/?success= ${encodeURIComponent('Product was edited successfully!')}`);

            }).catch((err) => {
                console.log(err);
                return;
            });
        }
    }).catch((err) => {
        console.log(err);
        return;
    });
}

module.exports.deleteGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id).then((product) => {
        if (!product) {
            res.sendStatus(404);
            return;
        }
        if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') > -1) {
            res.render('product/delete', { product: product });
        } else {
            res.render('error');
            return;
        }
    }).catch((err) => {
        res.render('error');
        console.log(err);
        return;
    });
}

module.exports.deletePost = (req, res) => {
    let id = req.params.id;

    Product.findByIdAndRemove(id).then((product) => {
        if (!product) {
            res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
            return;
        }
        if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') > -1) {

            fs.unlink(path.normalize(path.join('.', product.image)), () => {
                res.redirect(`/?success= ${encodeURIComponent('Product was deleted successfully!')}`);
            });
        }
    }).catch((err) => {
        console.log(err);
        return;
    });
}

module.exports.buyGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id).then((product) => {
        if (!product) {
            res.sendStatus(404);
            return;
        }

        res.render('product/buy', { product: product });
    });
}

module.exports.buyPost = (req, res) => {
    let productId = req.params.id;

    Product.findById(productId).then((product) => {

        product.buyer = req.user._id;
        product.save().then(() => {
            req.user.boughtProducts.push(productId);
            req.user.save().then(() => {
                res.redirect('/');
            }).catch((err) => {
                console.log(err);
                return;
            });
        }).catch((err) => {
            console.log(err);
            return;
        });
    }).catch((err) => {
        console.log(err);
        return;
    });
}