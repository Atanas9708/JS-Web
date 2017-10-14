const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

router.get('/', function(req, res, next) {
    
    let baseUrl = req.baseUrl;
    let id = baseUrl.substr(baseUrl.lastIndexOf('/') + 1);

    Meme.findById(id).then((meme) => {
        meme.memeName = capitalize(meme.memeName);
        res.render('details/getDetails', {meme: meme});  

    }).catch((err) => {
        console.log(err);
        return;
    });
});

module.exports = router;