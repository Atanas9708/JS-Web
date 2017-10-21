const Comment = require('../models/Comment');
const Hotel = require('../models/Hotel');
const User = require('../models/User');

module.exports = {
    createComment: (req, res) => {
        let input = req.body;
        let hotelId = req.params.id;
        let userId = req.user._id;

        let commentObj = {
            title: input.title,
            content: input.comment,
            creator: req.user._id,
            hotelId: hotelId,
            creationDate: Date.now()
        };

        Comment.create(commentObj).then((comment) => {

            Hotel.findById(hotelId).then((hotel) => {
                hotel.comments.push(commentObj);

                hotel.save().then(() => {
                    User.findById(userId).then((user) => {
                        
                        user.comments.push(comment._id);
                        user.save().then(() => {
                            res.redirect(`/details?id=${hotelId}`);

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
            }).catch((err) => {
                console.log(err);
                return;
            });
        }).catch((err) => {
            console.log(err);
            return;
        });
    },

    //TODO ..... fml
    editCommentGet: (req, res) => {
        // let commentId = req.params.id;
        
        // Hotel
        // .where({comments: {$in: ['comments']}})
        // .then((neznam) => {
        //     console.log(neznam);
        // })
        // .catch((err) => {
        //     console.log(err);
        //     return;
        // });
    }
}