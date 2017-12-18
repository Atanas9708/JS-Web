const Comment = require('./../models/Comment');
const Post = require('./../models/Post');
const User = require('./../models/User');

module.exports = {
    createComment: (req, res) => {
        let payload = req.body;
        let postId = payload.postId;

        if (!payload.text || payload.text.length > 400) {
            return res.status(200).json({
                success: false,
                message: 'Comment should be between 1 and 400 characters'
            });
        }

        Comment.create(payload).then(comment => {
            Post.findById(postId).then(post => {
                post.comments.push(comment);
                post.save().then(() => {
                    return res.status(200).json({
                        success: true,
                        comment
                    })

                }).catch(err => {
                    console.log(err);
                    return;
                })
            }).catch(err => {
                console.log(err);
                return;
            })
        })

    },

    deleteComment: (req, res) => {
        let { commentId, postId, username, userId } = req.body;

        Post.findById(postId)
            .populate('comments')
            .then(post => {
                if (!post) {
                    return res.status(200).json({
                        success: false,
                        error: 'Post was not found.'
                    });
                }

                User.findById(userId).then(user => {
                    if (!post) {
                        return res.status(200).json({
                            success: false,
                            error: 'User was not found.'
                        });
                    }

                    Comment.findById(commentId).then(comment => {
                        if (!comment) {
                            return res.status(200).json({
                                success: false,
                                message: 'Comment was not found.'
                            });
                        }

                        if (user.isAdmin || user['_id'].toHexString() === comment['authorId'].toHexString()) {
                            post['comments'].splice(post['comments'].indexOf(comment), 1);
                            post.save().then(() => {
                                Comment.remove({ _id: commentId }).then(() => {
                                    return res.status(200).json({
                                        success: true,
                                        message: 'Comment was deleted successfully!',
                                        comments: post['comments']
                                    });
                                })
                            })
                        } else {
                            return res.status(401).json({
                                success: false,
                                message: 'Unauthorized'
                            })
                        }
                    })
                }).catch(err => {
                    console.log(err);
                    return;
                })
            })

    }
}