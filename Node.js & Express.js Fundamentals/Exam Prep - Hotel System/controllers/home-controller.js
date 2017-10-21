const Hotel = require('../models/Hotel');

module.exports = {
    index: (req, res) => {
        
        Hotel.find({})
        .sort({creationDate: -1})
        .limit(20)
        .then(hotels => {
            hotels.forEach(h => h.user = req.user);
            res.render('home/index', {hotels: hotels});
        })
        .catch((err) => {
            console.log(err);
            return;
        });
    }
};