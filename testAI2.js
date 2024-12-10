const axios = require('axios');
const fs = require('fs');

// Load AI settings from ai-settings.json
const aiSettings = JSON.parse(fs.readFileSync('./config/ai-settings.json', 'utf-8'));

// Function to send prompt to OpenAI API
async function sendPrompt(prompt) {
  try {
    const response = await axios.post(
      `${aiSettings.baseURL}/chat/completions`,
      {
        model: aiSettings.model,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${aiSettings.apiKey}`,
        },
      }
    );

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
