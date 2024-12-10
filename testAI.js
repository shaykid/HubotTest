const AIHandler = require('./scripts/AIHandler'); // Adjust path if necessary
const aiHandler = new AIHandler();

async function testAI() {
  try {
    const prompt = "What is the weather in Holland now?";
    console.log(`Sending prompt: "${prompt}"\n`);

    // Send prompt to AIHandler
    const response = await aiHandler.sendPrompt(prompt);

    // Print AI response
    console.log(`AI Response: ${response}`);
  } catch (error) {
    console.error("Error while fetching AI response:", error.message);
  }
}

// Run the test
testAI();
