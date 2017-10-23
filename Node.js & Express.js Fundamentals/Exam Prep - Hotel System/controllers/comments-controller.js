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
                if (comment.content.trim() === content.trim()) {
                    commentToEdit.title = comment.title;
                    commentToEdit.content = comment.content;
                    commentToEdit._id = hotel._id;
                }
            }
            res.render('comments/editComment', {commentToEdit: commentToEdit});
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
                if (comment.content.trim() === content.trim()) {
                    comment.title = input.title;
                    comment.content = input.content;
                }
            }
            hotel.save().then(() => {
                Comment.findOneAndUpdate({content: content}, {$set: {content: input.content}})
                .then(() => {
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
    },
    deleteComment: (req, res) => {
        let hotelId = req.query.id;
        let content = req.query.content;

        Hotel.findById(hotelId)
        .populate('comments')
        .then((hotel) => {
            for (let comment of hotel.comments) {
                if (comment.content.trim() === content.trim()) {
                    hotel.comments.splice(comment._id, 1);
                    hotel.save().then(() => {
                        Comment.findOneAndRemove({content: content})
                        .then((comment) => {
                            comment.save().then(() => {
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
                }
            }
        }).catch((err) => {
            console.log(err);
            return;
        });
    }
}