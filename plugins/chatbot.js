const { cmd } = require('../command');
const config = require('../config');
const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(new Configuration({
    apiKey: config.OPENAI_API_KEY
}));

// Store chatbot status in memory (per chat)
const chatbotStatus = {};

cmd({
    pattern: "chatbot",
    desc: "Toggle chatbot ON/OFF for this chat",
    category: "main",
    use: ".chatbot on / .chatbot off",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    const option = args[0]?.toLowerCase();
    if (!["on", "off"].includes(option)) {
        return reply("*Usage:* .chatbot on / .chatbot off");
    }

    chatbotStatus[from] = option === "on";
    await reply(`🤖 Chatbot has been turned *${option.toUpperCase()}* for this chat.`);
});

// Message handler: auto-reply using GPT if chatbot is ON
cmd({
    pattern: ".*",
    dontAddCommandList: true, // don't show in help menu
    filename: __filename
},
async (conn, mek, m, { from, body, isCmd, sender }) => {
    if (isCmd || !body || !chatbotStatus[from]) return;

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: body }]
        });

        const replyText = completion.data.choices[0].message.content;

        await conn.sendMessage(from, {
            text: replyText,
            contextInfo: {
                mentionedJid: [sender]
            }
        }, { quoted: mek });

    } catch (err) {
        console.error("GPT Chatbot error:", err.message);
        await conn.sendMessage(from, { text: "❌ Chatbot error. Try again later." }, { quoted: mek });
    }
});
