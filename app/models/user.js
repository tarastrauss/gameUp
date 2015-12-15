// Require mongoose to create a model.
var mongoose = require('mongoose');

mongoose.Promise = Promise;

//Schema of User model
var userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  level: Number,
  email: String
});

// Create the model using your schema.
var User = mongoose.model('User', userSchema);

// Export the model of the User.
module.exports = User;
