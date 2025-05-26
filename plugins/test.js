const { cmd } = require('../command');

cmd({
    pattern: "test",
    alias: [],
    use: '.test',
    desc: "Send a random voice note from URL.",
    category: "fun",
    react: "🎙️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const songUrls = [
            "https://files.catbox.moe/igdgw1.m4a",
            "https://files.catbox.moe/65csuc.m4a",
            "https://files.catbox.moe/lzgyrl.m4a"
            // Add more direct URLs here
        ];

        if (!songUrls.length) return reply("No song URLs configured.");

        const randomUrl = songUrls[Math.floor(Math.random() * songUrls.length)];

        await conn.sendMessage(from, {
            audio: { url: randomUrl },
            mimetype: 'audio/mp4',
            ptt: true, // Voice note style
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363290715861418@newsletter',
                    newsletterName: "PopkidXtech",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in test command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
