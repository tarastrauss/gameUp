// Require mongoose to create a model.
var mongoose = require('mongoose');



//Schema of User model
var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  facebookId: String,
  age: String,
  level: Number,
  email: String
});

// Create the model using your schema.
var User = mongoose.model('User', userSchema);

// Export the model of the User.
module.exports = User;
