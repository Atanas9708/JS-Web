const Post = require('./../models/Post');
const User = require('./../models/User');
const postValidation = require('./../util/postValidation');

module.exports = {
    getAllPosts: (req, res) => {
        Post.find()
            .then((posts) => {
                return res.status(200).json({
                    success: true,
                    posts
                })
            })
            .catch(err => {
                return res.status(200).json({
                    success: false,
                    err
                })
            })
    },

    getUserPosts: (req, res) => {
        const username = req.params.username;

        Post.find({ author: username })
            .sort('-createdOn')
            .then(posts => {
                if (!posts) {
                    return res.status(200).json({
                        success: false,
                        message: 'No posts were found'
                    })
                }

                return res.status(200).json({
                    success: true,
                    posts
                })

            })
            .catch(err => {
                console.log(err);
                return;
            })
    },

    getPostById: (req, res) => {
        let searchedPost = req.params.id;
        Post.findById(searchedPost)
            .populate('comments')
            .then(post => {
                if (!post) {
                    return res.status(200).json({
                        success: false,
                        error: 'Post was not found.'
                    });
                }
                return res.status(200).json({
                    success: true,
                    post,
                    comments: post['comments']
                })
            })
            .catch(err => {
                return res.status(200).json({
                    success: false,
                    message: 'Post was not found!'
                })
            })
    },

    createPost: (req, res) => {
        let payload = req.body;
        let validationResult = postValidation.validatePost(payload);
        if (!validationResult) {
            return res.status(200).json({
                success: false,
                errors: validationResut.errors
            })
        }

        let postToCreate = {
            title: payload.title,
            image: payload.image,
            class: payload.class,
            category: payload.category,
            description: payload.description,
            authorId: payload.authorId,
            author: payload.author,
            likes: payload.likes,
            createdOn: Date.now()
        }

        Post.create(postToCreate).then(post => {
            if (post) {
                return res.status(200).json({
                    success: true,
                    post
                })
            }
        }).catch(err => {
            return res.status(200).json({
                success: false,
                err
            })
        })
    },


    editPost: (req, res) => {
        let postId = req.params.id;

        Post.findById(postId).then(post => {
            if (!post) {
                return res.status(200).json({
                    success: false,
                    error: 'Post was not found.'
                });
            }

            let payload = req.body;
            let userId = payload.userId;
            
            User.findById(userId).then(user => {
                if (user.isAdmin || user['_id'].toHexString() === post['authorId'].toHexString()) {

                    let validationResult = postValidation.validatePost(payload);
                    if (!validationResult.success) {
                        return res.status(200).json({
                            success: false,
                            errors: validationResult.errors
                        });
                    }

                    post.title = payload.title;
                    post.category = payload.category;
                    post.class = payload.class;
                    post.description = payload.description;
                    post.image = payload.image;

                    post.save().then(() => {
                        return res.status(200).json({
                            success: true,
                            post
                        })
                    }).catch(err => {
                        console.log(err);
                        return;
                    })

                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized'
                    })
                }
            })

        })
    },

    deletePost: (req, res) => {
        let postId = req.params.id;

        Post.findById(postId).then(post => {
            if (!post) {
                return res.status(200).json({
                    success: false,
                    error: 'Post was not found.'
                });
            }

            let userId = req.body.userId;

            User.findById(userId).then(user => {
                if (user.isAdmin || user['_id'].toHexString() === post['authorId'].toHexString()) {
                    Post.remove({ _id: postId }).then(() => {
                        return res.status(200).json({
                            success: true,
                            message: 'Post was deleted successfully!'
                        })
                    })
                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'Unaouthoraized'
                    })
                }
            })
        })
    },

    likeAndUnlike: (req, res) => {
        let postId = req.body.postId;

        Post.findById(postId).then(post => {
            if (!post) {
                return res.status(200).json({
                    success: false,
                    error: 'Post was not found.'
                });
            }

            let userId = req.body.userId;

            let userLike = post.likes.indexOf(userId);
            if (userLike >= 0) {
                post.likes.splice(userLike, 1);
            }
            else {
                post.likes.push(userId);
            }

            post.save().then(() => {
                return res.status(200).json({
                    success: true,
                    likes: post.likes
                })

            }).catch(err => {
                console.log(err);
                return;
            })
        })
            .catch(err => {
                return res.status(200).json({
                    success: false,
                    message: 'User not found.'
                })
            })
    }

}