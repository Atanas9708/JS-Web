const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/User');

module.exports = config => {
    mongoose.connect(config.dbPath, {
        useMongoClient: true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Database ready');
    });

    require('../models/User').seedAdminUser();
    require('../models/Comment');
    require('../models/Hotel');
    require('../models/Category');
    
    db.on('error', reason => {
        console.log(reason);
    });
};