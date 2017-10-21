const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String },
    lastName: { type: mongoose.Schema.Types.String },
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    salt: { type: mongoose.Schema.Types.String, required: true },
    isAdmin: { type: mongoose.Schema.Types.Boolean, default: false },
    isBlocked: { type: mongoose.Schema.Types.Boolean, default: false }
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = () => {

        User.find().then((users) => {
            if (users.length > 0) return;
            const salt = encryption.generateSalt();
            const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
            return User.create({
                username: 'Admin',
                salt,
                hashedPass,
                isAdmin: true
            });
        })
        .catch((err) => {
            console.log(err);
            return;
        });
};

module.exports = User;
