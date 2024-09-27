const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    GoogleID: { type: String ,default: null }
});

// Custom validation to check email/password or GoogleID
userSchema.path('email').validate(function(value) {
    if (!this.email && !this.password && !this.GoogleID) {
        return false;
    }
    return true;
}, 'You must provide either email/password or GoogleID');

userSchema.path('password').validate(function(value) {
    if (!this.email && !this.password && !this.GoogleID) {
        return false;
    }
    return true;
}, 'You must provide either email/password or GoogleID');

userSchema.path('GoogleID').validate(function(value) {
    if (!this.email && !this.password && !this.GoogleID) {
        return false;
    }
    return true;
}, 'You must provide either email/password or GoogleID');

const User = mongoose.model('Users', userSchema,'Users');

module.exports = User;
