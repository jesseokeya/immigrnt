'use strict';
const mongoose = require('mongoose');
// User Schema
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        index: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);
