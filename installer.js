const Logger = require('./scripts/Logger');
const logger = new Logger();

// Register CoffeeScript to handle .coffee files
require('coffeescript/register');

// Start Hubot with the shell adapter
require('./node_modules/hubot/bin/hubot');
