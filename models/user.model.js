const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  social: {
    googleId: String,
    facebookId: String
  }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;