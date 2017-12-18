const Post = require('./../models/Post');

module.exports = {
    searchTerm: (req, res) => {
        let searchTerm = req.params.term;

        Post.find().then(posts => {

            if (!posts) {
                return res.status(200).json({
                    success: false,
                    message: 'There are no posts at the moment.'
                })
            }

            posts = posts.filter(p => 
                p['class'].toLowerCase().includes(searchTerm.toLowerCase()) ||
                p['category'].toLowerCase().includes(searchTerm.toLowerCase())
            )

            if (posts.length !== 0) {
                return res.status(200).json({
                    success: true,
                    posts
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: 'Nothing found.'
                })
            }
        }).catch(err => {
            console.log(err);
            return;
        })
    }
}