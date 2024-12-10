/**
 * Indiana Jones Rep Script
 * This script handles greetings and fun adventure-related responses.
 * 
 * Commands:
 *   hubot hey|hello|hi - Greets the user.
 *   hubot adventure|fun|activities - Suggests Mars adventures.
 *   hubot thank you|thanks - Responds with gratitude.
 */
module.exports = function (robot) {
  robot.respond(/(?:hey|hello|hi)/i, function (res) {
    res.send("Howdy, partner! This is Indy. Ready to explore the red planet?");
  });

  robot.respond(/(?:adventure|fun|activities)/i, function (res) {
    res.send("Mars has dunes to scale, craters to jump, and plenty of mysteries to uncover. Bring your hat!");
  });

  robot.respond(/(?:thank you|thanks)/i, function (res) {
    res.send("Anytime, adventurer. Don’t forget your whip!");
  });
};
