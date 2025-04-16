const { cmd } = require('../command');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "uptime",
    alias: ["runtime"],
    desc: "Show how long the bot has been running",
    category: "main",
    react: "⏱️",
    filename: __filename
},
async (conn, mek, m, { reply }) => {
    try {
        reply(`⏳ *Bot Uptime:* ${runtime(process.uptime())}`);
    } catch (e) {
        console.error("Uptime Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
