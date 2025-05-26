const axios = require('axios');

// Global switch to turn chatbot on/off
let chatbotEnabled = true;

cmd({
  pattern: "chatbot",
  alias: ["cbot", "ask"],
  use: ".chatbot <message|toggle>",
  desc: "Chat with GPT AI or toggle it",
  category: "main",
  react: "🤖",
  filename: __filename
},
async (conn, mek, m, {
  from, sender, reply, q, isOwner
}) => {
  try {
    const input = q.trim();

    // Toggle logic (owner only)
    if (input.toLowerCase() === "toggle") {
      if (!isOwner) return reply("Only the *bot owner* can toggle the chatbot.");
      chatbotEnabled = !chatbotEnabled;
      return reply(`✅ Chatbot is now *${chatbotEnabled ? "ENABLED" : "DISABLED"}*`);
    }

    // If chatbot is disabled
    if (!chatbotEnabled) return reply("⚠️ Chatbot is currently *disabled* by the owner.");

    // No input
    if (!input) return reply("Please provide a message. Example: *.chatbot hello*");

    // Typing presence
    await conn.sendPresenceUpdate('composing', from);

    // OpenAI GPT API request
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful WhatsApp assistant named POPKID-XTECH." },
        { role: "user", content: input }
      ],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      }
    });

    const gptReply = response.data.choices[0]?.message?.content?.trim();
    if (!gptReply) return reply("I couldn't generate a response from GPT.");

    // Emoji reactions
    const emojis = ['🤖', '✨', '🧠', '💡'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    // Send reaction
    await conn.sendMessage(from, {
      react: {
        text: emoji,
        key: mek.key
      }
    });

    // Send GPT reply
    await conn.sendMessage(from, {
      text: `*${gptReply}*`,
      contextInfo: {
        mentionedJid: [sender]
      }
    }, { quoted: mek });

  } catch (e) {
    console.error("GPT Chatbot Error:", e.response?.data || e.message);
    reply(`❌ AI Error: ${e.message}`);
  }
});
