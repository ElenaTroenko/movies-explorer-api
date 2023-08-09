const mongoose = require('mongoose');
const validator = require('validator');

// схема user
const userSchema = new mongoose.Schema({
  name: {
    require: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    unique: true,
    type: String,
    require: function() {
      validator.isEmail(this.email);
    },
  },
  password: {
    require: true,
    type: String,
    minlength: 8,
    select: false,
  },
});


module.exports = mongoose.model('user', userSchema);