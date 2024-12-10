robot.loadFile('./scripts/AIHandler.js');
// Register CoffeeScript to handle .coffee files
require('coffeescript/register');

// Start Hubot with the shell adapter
require('./node_modules/hubot/bin/hubot');
