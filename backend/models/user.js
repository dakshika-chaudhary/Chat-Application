const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Trims whitespace
        minlength: 3, // Minimum length
        maxlength: 20, // Maximum length
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User=mongoose.model('User',UserSchema);
module.exports=User;