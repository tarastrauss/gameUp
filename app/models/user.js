// Require mongoose to create a model.
var mongoose = require('mongoose');

mongoose.Promise = Promise;

//Schema of User model
var userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  level: String,
  email: String
});

// add bcrypt hashing to model (works on a password field)!
userSchema.plugin(require('mongoose-bcrypt'));

// Create the model using your schema.
var User = mongoose.model('User', userSchema);

// Export the model of the User.
module.exports = User;
