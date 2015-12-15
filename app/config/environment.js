
var _ = require('lodash');

var localEnvVars = {
  TITLE: 'gameUp',
  SAFE_TITLE: 'gameUpIsAwesome',
  SECRET_KEY: 'Foxy'

};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
