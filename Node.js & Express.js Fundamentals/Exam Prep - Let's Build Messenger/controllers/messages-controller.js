const Message = require('../models/Message');
const User = require('../models/User');

let toggle = (req, res, action) => {
    let messageId = req.params.id;

    Message.findById(messageId).then((msg) => {
        if (action === 'like') {
            msg.isLiked = true;
            msg.userLiked = req.user._id;

        } else if (action === 'unlike') {
            if (msg.isLiked && msg.userLiked.equals(req.user._id)) {
                msg.isLiked = false;
                msg.userLiked = null;
            }
        }

        msg.save().then(() => {
            res.redirect('back');
        }).catch((err) => {
            console.log(err);
            return;
        });

    }).catch((err) => {
        console.log(err);
        return;
    });

};

module.exports = {
    like: (req, res) => {
        toggle(req, res, 'like');
    },
    unlike: (req, res) => {
        toggle(req, res, 'unlike');
    }
}