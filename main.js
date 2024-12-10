const AIHandler = require('./scripts/AIHandler');
const aiHandler = new AIHandler();
const readline = require('readline');

// Initialize console interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Chatbot started. Type your message to chat!\nType 'exit' to quit.");

// Function to handle chat input/output
const startChat = () => {
  rl.question('You: ', async (userInput) => {
    if (userInput.toLowerCase() === 'exit') {
      console.log('Exiting chatbot. Goodbye!');
      rl.close();
      return;
    }
    try {
      // Send prompt to AIHandler
      const aiResponse = await aiHandler.sendPrompt(userInput);
      console.log(`AI: ${aiResponse}`);
    } catch (error) {
      console.error("Error fetching AI response:", error.message);
    }

    // Continue the chat
    startChat();
  });
};

// Start the chat
startChat();
