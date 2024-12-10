const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');

// Load AI settings from ai-settings.json
const aiSettings = JSON.parse(fs.readFileSync('./config/ai-settings.json', 'utf-8'));

// Initialize OpenAI API client
const configuration = new Configuration({
  apiKey: aiSettings.apiKey,
});
const openai = new OpenAIApi(configuration);

// Function to send a prompt
async function sendPrompt(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: aiSettings.model,
      messages: [{ role: 'user', content: prompt }],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error(`Error: ${error.response ? error.response.data.error.message : error.message}`);
  }
}

// Main function to test the AI prompt
async function testAI() {
  const prompt = "What is the weather in Holland now?";
  console.log(`Sending prompt: "${prompt}"\n`);

  try {
    const result = await sendPrompt(prompt);
    console.log(`AI Response: ${result}`);
  } catch (error) {
    console.error(error.message);
  }
}

// Run the test
testAI();
