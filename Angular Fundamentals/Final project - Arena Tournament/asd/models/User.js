const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    repeatPass: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
    isAdmin: { type: mongoose.Schema.Types.Boolean, default: false }
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

// User.seedAdminUser = async () => {
//     try {
//         let users = await User.find();
//         if (users.length > 0) return;
//         const salt = encryption.generateSalt();
//         const hashedPass = encryption.generateHashedPassword(salt, 'admin');
//         const username = 'Admin';
//         const repeatPass = 'admin';
//         const adminEmail = 'admin@abv.bg';
//         return User.create({
//             username,
//             adminEmail,
//             hashedPass,
//             repeatPass,
//             salt,
//             isAdmin: true
//         });
//     } catch (e) {
//         console.log(e);
//     }
// };

module.exports = User;
