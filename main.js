const { Robot, TextMessage } = require('hubot');
const AIHandler = require('./scripts/AIHandler');
const aiHandler = new AIHandler();
const readline = require('readline');

// Create a Hubot instance
const robot = new Robot(null, 'hubot', false, 'hubot');

// Hubot will respond to any text input
robot.hear(/.*/, async (res) => {
  const userInput = res.message.text;
  try {
    console.log(`\n[User]: ${userInput}`);
    const aiResponse = await aiHandler.sendPrompt(userInput);
    console.log(`[AI]: ${aiResponse}`);
  } catch (error) {
    console.error("Error handling input:", error.message);
  }
});

// Console interface to send user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Chatbot started. Type your message to chat!\n");

const askQuestion = () => {
  rl.question('You: ', (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Exiting chatbot. Goodbye!');
      rl.close();
      process.exit(0);
    }
    robot.receive(new TextMessage({ id: 1, name: 'user' }, input));
    askQuestion();
  });
};

askQuestion();
