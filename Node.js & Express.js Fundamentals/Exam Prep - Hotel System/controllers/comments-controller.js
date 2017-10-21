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
    editCommentGet: (req, res) => {
        let hotelId = req.query.id;
        let content = req.query.content;

        Hotel.findById(hotelId)
        .populate('comments')
        .then((hotel) => {
            let commentToEdit = {};
            for (let comment of hotel.comments){
                if (comment.content === content) {
                    commentToEdit.title = comment.title;
                    commentToEdit.content = comment.content;
                    commentToEdit._id = hotel._id;
                }
            }
            res.render('comments/editComment', {comment: commentToEdit});
        }).catch((err) => {
            console.log(err);
            return;
        });
       
    },
    editCommentPost: (req, res) => {
        let input = req.body;
        let hotelId = req.query.id;
        let content = req.query.content;

        Hotel.findById(hotelId)
        .populate('comments')
        .then((hotel) => {
            for (let comment of hotel.comments) {
                if (comment.content === content) {
                    comment.title = input.title;
                    comment.content = input.comment;
                }
            }
            hotel.save().then(() => {
                res.redirect(`/details?id=${hotelId}`);
            }).catch((err) => {
                console.log(err);
                return;
            });
        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    //TODO DELETE COMMENT
    // deleteComment: (req, res) => {
    //     let hotelId = req.query.id;
    //     let content = req.query.content;

    //     Hotel.findById(hotelId)
    //     .populate('comments')
    //     .then((hotel) => {
    //         for (let comment of hotel.comments) {
    //             if (comment.content === content) {

    //             }
    //         }
    //     })
    // }
}