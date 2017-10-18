const Message = require('../models/Message');
const Thread = require('../models/Thread');
const User = require('../models/User');
const messageChecker = require('../util/imageChecker');

module.exports = {
    chatRoomGet: (req, res) => {
        let currentUser = req.user.username;
        let otherUser = req.params.username;

        Thread.findOne({ users: { $all: [currentUser, otherUser] } })
            .then((currentThread) => {
                if (!currentThread) {
                    return res.redirect('/?error=Thread no longer exists!');
                }

                let data = { currentThread };

                User.findOne({ username: otherUser }).then((secondUser) => {
                    if (!secondUser) {
                        return res.redirect('/?error=User no longer exists');
                    }

                    if (secondUser.blockedUsers.indexOf(req.user._id) !== -1) {
                        data.blocked = true;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return;
                });
                

                Message.find({ thread: currentThread._id })
                    .sort({ dateCreated: 1 })
                    .populate('user')
                    .then(messages => {

                        for (let msg of messages) {
                            if (messageChecker.isLink(msg.content)) {
                                msg.isLink = true;
                            }

                            if (messageChecker.isImage(msg.content)) {
                                msg.isImage = true;
                            }
                        }


                        data.messages = messages;
                        res.render('thread/chat-room', data);
                    })
                    .catch((err) => {
                        console.log(err);
                        return;
                    });

            }).catch((err) => {
                console.log(err);
                return;
            });
    },

    chatRoomPost: (req, res) => {
        let content = req.body.content;
        let currentUser = req.user.username;
        let otherUser = req.params.username;

        Thread.findOne({ users: { $all: [currentUser, otherUser] } })
            .then((currentThread) => {
                if (!currentThread) {
                    return res.redirect('/?error=Thread no longer exists!');
                }

                let messageData = {
                    thread: currentThread._id,
                    user: req.user._id,
                    content: content
                };

                Message.create(messageData)
                    .then((message) => {

                        res.redirect(`/thread/${otherUser}`);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.redirect(`/thread/${otherUser}?error=${err.error.content.message}`);
                    });

            }).catch((err) => {
                console.log(err);
                return;
            });

    }
}