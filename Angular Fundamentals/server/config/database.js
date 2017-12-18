const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//const User = require('../models/User');

module.exports = config => {
    mongoose.connect(config.dbPath, {
        useMongoClient: true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) throw err;
        // User.seedAdminUser().then(() => {
        //     
        // }).catch((reason) => {
        //     console.log('Something went wrong');
        //     console.log(reason);
        // });
        console.log('Database ready');
    });

    require('../models/User');
    require('../models/Comment');
    require('../models/Post');

    db.on('error', reason => {
        console.log(reason);
    });
};