const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;