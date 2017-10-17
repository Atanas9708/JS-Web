const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/User');

module.exports = config => {
    mongoose.connect(config.dbPath, {
        useMongoClient: true
    });
    const db = mongoose.connection;


    db.once('open', (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Connected!');

    });


    require('../models/User').seedAdminUser();
    require('../models/Car');
    
    db.on('error', (err) => {
        console.log(err);
    });
};