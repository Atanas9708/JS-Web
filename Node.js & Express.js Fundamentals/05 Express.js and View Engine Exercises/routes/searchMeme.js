const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');
const Genre = require('../models/Genre');

router
    .get('/', function (req, res, next) {
        Genre.find().then((genres) => {
            res.render('searchMeme/search', {genres: genres});
        });
    })
    .post('/', function(req, res, next) {
        let input = req.body;
        let memeName = input.memeTitle.toLowerCase();
        let selectedGenre = input.genreSelect;

        Meme.findOne({memeName: memeName}).then((meme) => {
            if (meme.status !== 'on') {
                res.render('searchMeme/notFoundMeme');
                return;
            }

            let memeId= meme.id;
        
            Genre.findOne({genreName: selectedGenre}).then((genre) => {
                let arr = genre.memeList.map(el => el.toHexString());
                
                if (arr.includes(memeId)) {
                    res.render('searchMeme/foundMeme', {meme: meme});
                } else {
                    res.render('searchMeme/notFoundMeme');
                }

            }).catch((err) => {
                res.render('searchMeme/notFoundMeme');
                console.log(err);
                return;
            });
            
        }).catch((err) => {
            res.render('searchMeme/notFoundMeme');
            console.log(err);
            return;
        });
    });

module.exports = router;