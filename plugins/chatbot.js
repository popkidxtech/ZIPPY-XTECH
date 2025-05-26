const { cmd } = require('../command');
const config = require('../config');
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
    apiKey: config.OPENAI_API_KEY
}));

// Store chatbot state per chat
const chatbotStatus = {};

// Toggle Command
cmd({
    pattern: "chatbot",
    desc: "Toggle chatbot ON or OFF",
    category: "main",
    use: ".chatbot on / .chatbot off",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    const choice = args[0]?.toLowerCase();
    if (!["on", "off"].includes(choice)) {
        return reply("*Usage:* .chatbot on / .chatbot off");
    }

    chatbotStatus[from] = choice === "on";
    return reply(`🤖 Chatbot is now *${choice.toUpperCase()}* for this chat.`);
});

// Auto-reply using GPT (safe fallback version)
cmd({
    pattern: ".*",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, isCmd, body, sender }) => {
    if (isCmd || !body || !chatbotStatus[from]) return;

    try {
        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: body }]
        });

        const replyText = res.data.choices[0].message.content;

        await conn.sendMessage(from, {
            text: replyText,
            contextInfo: { mentionedJid: [sender] }
        }, { quoted: mek });

    } catch (e) {
        console.error("Chatbot error:", e.message);
        await conn.sendMessage(from, { text: "⚠️ GPT error. Try again later." }, { quoted: mek });
    }
});
