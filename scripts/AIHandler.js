const OpenAI = require('openai');
const axios = require("axios");
const aiSettings = require('../../config/ai-settings.json');

const openai = new OpenAI({
    apiKey: aiSettings.apiKey,
});

class AIHandler {
    async analyzeImage(context) {
        console.log(`**gor context : ${JSON.stringify(context)}`);
    try {
        const imageUrl = context.imageUrl;
        console.log(`Start analyze the following image and return a JSON list of all objects detected (using label): ${imageUrl}`);
        const prompt = `Analyze the following image and return a JSON list of all objects detected (using label): ${imageUrl}`;
        const response = await openai.chat.completions.create({
            model: aiSettings.model,
            messages: [{ role: "user", content: prompt }],
        });

        const rawResponse = response.choices[0].message.content;
        console.log(`Raw AI Response: ${rawResponse}`); // Log the raw response

        // Attempt to parse the response as JSON
        const parsedResponse = JSON.parse(rawResponse);
        return parsedResponse;
    } catch (error) {
        console.error(`Error analyzing image: ${error.message}`);
        console.error("Ensure the AI response is valid JSON.");
        throw error; // Re-throw the error to propagate it
    }
}


    async generateUpliftingMessage(context) {
        try {
            const prompt = `Based on the following chat context, generate an uplifting message:\n${JSON.stringify(context.message)}`;
            const response = await openai.chat.completions.create({
                model: aiSettings.model,
                messages: [{ role: "user", content: prompt }],
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.error(`Error generating uplifting message: ${error.message}`);
            throw error;
        }
    }

    async generateEndingMessage(context) {
        try {
            const timeOfDay = new Date().getHours();
            const partOfDay = timeOfDay < 12 ? "morning" : timeOfDay < 18 ? "afternoon" : "evening";
            const prompt = `Based on the following chat context and the time (${partOfDay}), generate an appropriate ending message:\n${JSON.stringify(context.message)}`;
            const response = await openai.chat.completions.create({
                model: aiSettings.model,
                messages: [{ role: "user", content: prompt }],
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.error(`Error generating ending message: ${error.message}`);
            throw error;
        }
    }

    async createPersonalizedAgent(agentDefinition) {
        try {
            const prompt = `Create a personalized chat agent based on the following definition:\n${JSON.stringify(agentDefinition)}`;
            const response = await openai.chat.completions.create({
                model: aiSettings.model,
                messages: [{ role: "user", content: prompt }],
            });
            return JSON.parse(response.choices[0].message.content);
        } catch (error) {
            console.error(`Error creating personalized agent: ${error.message}`);
            throw error;
        }
    }

    async sendPrompt(prompt) {
        try {
            const response = await openai.chat.completions.create({
                model: aiSettings.model,
                messages: [{ role: "user", content: prompt }],
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.error(`Error sending prompt: ${error.message}`);
            throw new Error("Failed to fetch AI response.");
        }
    }

    async summarizeContext(context) {
        try {
            const prompt = `Summarize the following chat context briefly:\n${JSON.stringify(context.chat_history)}`;
            const response = await openai.chat.completions.create({
                model: aiSettings.model,
                messages: [{ role: "user", content: prompt }],
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.error(`Error summarizing context: ${error.message}`);
            throw error;
        }
    }
}

module.exports = AIHandler;
