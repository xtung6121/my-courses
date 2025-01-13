let mongoose = require('mongoose');
let Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        // unique: true
    }, //Tài khoản
    password: {
        type: String,
        required: true,
        // hide: true
    }, //Mật khẩu
    // PasswordLevel2: {
    //     type: String,
    //     default: "",
    //     hide: true
    // }, //Mật khẩu
    // IsLock: { type: Boolean, default: false }, //khóa acc
    // RegDate: { type: Date, default: Date.now } //ngày tạo
},

    { timestamps: true });
module.exports = mongoose.model('User', Schema);