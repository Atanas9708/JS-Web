const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');
const Meme = require('../models/Meme');

router
  .get('/', function (req, res, next) {
    Genre.find().then((genres) => {
      res.render('addMeme/add', {genres: genres});
    });
  })
  .post('/', function(req, res, next) {
    let memeObj = req.body;
    let picture = req.files.meme;
    let path = `./public/images/${picture.name}`;
    memeObj.memeUrl = path;
    memeObj.memeName = memeObj.memeName.toLowerCase();
    if (memeObj.status === undefined){
      memeObj.status = 'off';
    }
    
    picture.mv(path, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });

    Meme.create(memeObj).then((createdMeme) => {
      let targetedGenre = createdMeme.genreSelect;
      Genre.findOne({genreName: targetedGenre}).then((genres) => {
    
        genres.memeList.push(createdMeme.id);
        genres.save().then(() => {
          res.render('home/index');
        }).catch((err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
      }).catch((err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }).catch((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });


module.exports = router;
