const Hotel = require('../models/Hotel');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Category = require('../models/Category');

module.exports = {
    createHotelGet: (req, res) => {
        Category.find().then((categories) => {
            res.render('hotels/generateHotel', {categories: categories});
            
        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    createHotelPost: (req, res) => {
        let input = req.body;
        let userId = req.user._id;

        let hotelObj = {
            title: input.title,
            description: input.textArea,
            location: input.location,
            image: input.image,
            comments: [],
            creator: req.user._id,
            category: input.type,
            viewCounter: 0,
            creationDate: Date.now()
        };

        Hotel.create(hotelObj).then((hotel) => {

            User.findById(userId).then((user) => {
                user.hotels.push(hotel._id);
                user.save().then(() => {
                    res.render('hotels/generateHotel', { successMessage: `${hotel.title} created!` });

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
    },
    getDetails: (req, res) => {
        let hotelId = req.query.id;
        Hotel.findById(hotelId)
        .populate('comments.creator')
        .then((hotel) => {
            let comments = [];
            for (let comment of hotel.comments) {
                let commentObj = {
                    username: comment.creator.username,
                    userComment: comment.content,
                    datePosted: comment.creationDate,
                    _id: comment.id
                };

                comments.push(commentObj);
            }
            comments.forEach(c => c.user = req.user);
            hotel.user = req.user;
            hotel.viewCounter++;
            hotel.save().then(() => {
                let data = {
                    selectedHotel: hotel,
                    user: req.user,
                    comments: comments
                };
    
                res.render('hotels/details', data);

            }).catch((err) => {
                console.log(err);
                return;
            });

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    list: (req, res) => {
        let page = Number(req.query.page) || 1;
        let limit = 2;
        let queryObj = {};

        Hotel.count().then((hotelCount) => {
            let maxPages = Math.ceil(hotelCount / limit);

            if (page > maxPages) {
                page = maxPages;
            }

            if (page < 0) {
                page = 1;
            }

            let pages = {
                prevPage: page - 1 < 1 ? 1 : page - 1,
                nextPage: page + 1 > maxPages ? maxPages : page + 1
            };

            Hotel.find()
            .sort({'creationDate': -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .then((hotels) => {
                hotels.forEach(h => h.user = req.user);
                res.render('hotels/hotelList', {hotels: hotels, pages: pages});

            }).catch((err) => {
                console.log(err);
                return;
            });
        }).catch((err) => {
            console.log(err);
            return;
        });

    },
    editHotelGet: (req, res) => {
        let hotelId = req.params.id;
        
        Hotel.findById(hotelId).then((hotel) => {
            Category.find().then((categories) => {
                res.render('hotels/editHotel', {hotel: hotel, categories: categories});

            }).catch((err) => {
                console.log(err);
                return;
            });
        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    editHotelPost: (req, res) => {
        let input = req.body;
        let hotelId = req.params.id;

        Hotel.findById(hotelId).then((hotel) => {
            hotel.title = input.title;
            hotel.location = input.location;
            hotel.description = input.textArea;
            hotel.image = input.image;
            hotel.category = input.type;

            hotel.save().then(() => {
                res.redirect('/');

            }).catch((err) => {
                console.log(err);
                return;
            });
        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    deleteHotelGet: (req, res) => {
        let hotelId = req.params.id;
        
        Hotel.findById(hotelId).then((hotel) => {
            Category.find().then((categories) => {
                res.render('hotels/deleteHotel', {hotel: hotel, categories: categories});

            }).catch((err) => {
                console.log(err);
                return;
            });
        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    deleteHotelPost: (req, res) => {
        let hotelId = req.params.id;

        Hotel.findByIdAndRemove(hotelId).then(() => {
            res.redirect('/');

        }).catch((err) => {
            console.log(err);
            return;
        });
    }
}