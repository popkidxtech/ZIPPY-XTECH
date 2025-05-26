const axios = require('axios');

// Global chatbot toggle (true = on, false = off)
let chatbotEnabled = true;

cmd({
    pattern: "chatbot",
    alias: ["cbot", "ask"],
    use: ".chatbot <message | toggle>",
    desc: "Chat with OpenAI GPT or toggle chatbot",
    category: "main",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, q, isOwner, reply }) => {
    try {
        const input = q.trim();

        if (!input) return reply("❓ *Usage:* .chatbot <message | toggle>");

        // Toggle mode (only owner can toggle)
        if (input.toLowerCase() === "toggle") {
            if (!isOwner) return reply("❌ Only *owner* can toggle the chatbot.");
            chatbotEnabled = !chatbotEnabled;
            return reply(`✅ Chatbot is now *${chatbotEnabled ? "ENABLED" : "DISABLED"}*`);
        }

        // Check if chatbot is disabled
        if (!chatbotEnabled) return reply("⚠️ Chatbot is currently *disabled*.");

        await conn.sendPresenceUpdate('composing', from); // Typing...

        // OpenAI API call
        const res = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful WhatsApp assistant called POPKID-XTECH." },
                { role: "user", content: input }
            ],
            temperature: 0.7
        }, {
            headers: {
                Authorization: `Bearer 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`,
                'Content-Type': 'application/json'
            }
        });

        const replyText = res.data.choices[0]?.message?.content?.trim();
        if (!replyText) return reply("⚠️ No response from GPT.");

        // React with emoji
        const emojis = ['✨', '🧠', '🤖', '💡'];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        await conn.sendMessage(from, {
            react: { text: emoji, key: mek.key }
        });

        // Send the GPT reply
        await conn.sendMessage(from, {
            text: replyText,
            contextInfo: {
                mentionedJid: [sender]
            }
        }, { quoted: mek });

    } catch (err) {
        console.error("Chatbot error:", err);
        reply(`❌ Error: ${err.message}`);
    }
});
