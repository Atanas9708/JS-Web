const mongoose = require('mongoose');
const path = 'mongodb://localhost:27017/MemeDb';
mongoose.Promise = global.Promise;

module.exports = mongoose.connect(path, {
    useMongoClient: true
});