const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(config.connectionString);

    let database = mongoose.connection;

    database.once('open', (err) => {
        if (err){
            console.log(err);
            return;
        }
        console.log('Connected!');
    });
    
    require('../models/Product');
    require('../models/Category');
    require('../models/User').seedAdminUser();
    

    database.on('error', (err) => {
        console.log(err);
    });
}