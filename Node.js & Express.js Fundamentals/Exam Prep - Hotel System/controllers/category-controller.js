const Category = require('../models/Category');
const Hotel = require('../models/Hotel');
const User = require('../models/User');

module.exports = {
    addCategoryGet: (req, res) => {
        res.render('category/addCategory');
    },
    addCategoryPost: (req, res) => {
        
        Category
        .create({categoryName: req.body.category})
        .then((category) => {
            res.redirect('/');

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    listAllCategories: (req, res) => {
        //let isAdmin = req.user.roles.length > 0;
        
        Category.find().then((categories) => {
            categories.forEach(c => c.user = req.user);
            res.render('category/allCategories', {categories: categories});
            
        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    deleteCategory: (req, res) => {
        let categoryId = req.params.id;
        
        Category.findByIdAndRemove(categoryId).then(() => {
            res.redirect('/');

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    hotelByCategory: (req, res) => {
        let selectedCategory = req.params.categoryName;

        Hotel.find({category: selectedCategory}).then((hotels) => {
            res.render('category/hotelsByCategory', {hotels: hotels});

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
}