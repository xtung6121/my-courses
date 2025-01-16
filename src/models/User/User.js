const mongoose = require('mongoose');
const { SchemaTypes } = mongoose

let Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 10,
        lowercase: true
    }, //Tài khoản
    password: {
        type: String,
        required: true,
        // hide: true
    }, //Mật khẩu
    passwordLevel2: {
        type: String,
        default: "",
        hide: true
    }, //Mật khẩu
    cart: {
        // To define that you want to store an array, you simply create an array
        // Array of embedded documents
        items: [
            {
                productId: {
                    type: SchemaTypes.ObjectId,
                    // ref to indicate ID refers to product stored/defined through product model (refs only needed when using references)
                    ref: 'Courses',
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
    avatar: {
        type: String,
    },
    IsLock: { type: Boolean, default: false }, //khóa acc
    RegDate: { type: Date, default: Date.now } //ngày tạo

},

    { timestamps: true });
module.exports = mongoose.model('User', Schema);