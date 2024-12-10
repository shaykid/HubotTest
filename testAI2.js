const fs = require('fs');
const OpenAI = require('openai');

// Load AI settings from ai-settings.json
const aiSettings = JSON.parse(fs.readFileSync('./config/ai-settings.json', 'utf-8'));

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: aiSettings.apiKey,
  baseURL: aiSettings.baseURL,
  model: aiSettings.model
});

async function sendPrompt(prompt) {
  try {
    // Send a prompt to OpenAI Chat Completions API
    const response = await openai.chat.completions.create({
      model: aiSettings.model,
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

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

testAI();
