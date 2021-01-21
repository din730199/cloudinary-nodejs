const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model('User', userSchema);
