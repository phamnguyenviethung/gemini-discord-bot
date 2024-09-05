const Discord = require('discord.js');
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBWyILgmsuS2SCQISscZBFPZVzOA3QMMQM.GsabVt.fO9VJkzHYS6ICMUy5nt-kl4yLTwI-pNNRcQZ74";

client.on('message', async message => {
    if (message.author.bot) return;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [{
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const parts = [{
        role: "user",
        content: message.content,
    }, ];

    const result = await model.generateContent({
        contents: parts,
        generationConfig,
        safetySettings,
    });

    const response = result.response;
    message.channel.send(response.text());
});

client.login('MTE5MTA4NTQ4NDQyMDYzMjgxNw.GsabVt.fO9VJkzHYS6ICMUy5nt-kl4yLTwI-pNNRcQZ74');