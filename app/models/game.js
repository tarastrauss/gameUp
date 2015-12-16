// Require mongoose to create a model.
var mongoose = require('mongoose');

mongoose.Promise = Promise;

//Schema of User model
var gameSchema = new mongoose.Schema({
  name: String,
  level: Number,
});



// Create the model using your schema.
var Game = mongoose.model('Game', gameSchema);

// Export the model of the User.
module.exports = Game;
