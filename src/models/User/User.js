const mongoose = require('mongoose');
const { SchemaTypes } = mongoose;
const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 10,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    passwordLevel2: {
        type: String,
        default: "",
        hide: true
    },
    balance: {
        type: Number,
        default: 0, // Số dư mặc định là 0
    },
    purchasedProducts: [{
        type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến collection Course
        ref: 'Course', // Tên collection tham chiếu
    }],
    cart: {
        items: [
            {
                productId: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Course',
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: [ROLE.ADMIN, ROLE.BASIC],
        default: ROLE.BASIC
    },
    IsLock: { type: Boolean, default: false },
    RegDate: { type: Date, default: Date.now }
}, { timestamps: true });

userSchema.methods.addToCart = function (product) {
    // findIndex() returns matching index, or -1 if no matching index
    const cartProductIndex = this.cart.items.findIndex((cp) => {
        // _id retrieved from database can be used as a string in JS, but technically isn't of type string
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            // Mongoose automatically wraps in ObjectId
            productId: product._id,
            quantity: newQuantity,
        });
    }
    const updatedCart = {
        items: updatedCartItems,
    };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
    // filter() JS method creates new array with all elements that pass test implemented by provided function (like find(), but returns array with all matching items rather than first one)
    const updatedCartItems = this.cart.items.filter((i) => {
        // Return true (keep) for all items except one being deleted
        return i.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
};

module.exports = mongoose.model('User', userSchema);
