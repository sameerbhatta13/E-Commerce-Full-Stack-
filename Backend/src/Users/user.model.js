const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        trim: true
    },
    password: {
        type: String,

    },
    image: {
        type: String
    },
    isvarified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otptime: {
        type: Date,
        default: () => Date.now() + 150000
    },
    refrestoken: {
        type: String
    },
    iv: { type: String, required: true }

})

module.exports = mongoose.model('User', userShema)