const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');

router.get('/', function (req, res, next) {

    Meme.find({'status': 'on'}).then((memes) => {
        //memes = memes.filter(m => m.status === "on");
        res.render('viewAll/allMemes', {memes: memes});
    });
});

module.exports = router;