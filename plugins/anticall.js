const settingsManager = require('../lib/settingsmanager'); // Path to your settings manager
const { cmd } = require('../command'); // Adjust path as needed to your command registration

cmd({
    pattern: "anticall",
    alias: ["callblock", "togglecall"],
    desc: "Toggles the anti-call feature on or off.",
    category: "owner",
    react: "📞",
    filename: __filename,
    fromMe: true // Only accessible by the bot's own number
},
async (conn, mek, m, { isOwner, reply, from, sender }) => {
    try {
        if (!isOwner) {
            return reply("🚫 This command is for the bot owner only.");
        }

        let currentStatus = settingsManager.getSetting('ANTICALL');
        let newStatus = !currentStatus;

        settingsManager.setSetting('ANTICALL', newStatus); // Update the setting via settingsManager

        const statusText = newStatus ? 'enabled' : 'disabled';
        const reactionEmoji = newStatus ? '✅' : '❌'; // Reaction for the final message

        // Send reaction to the command message itself
        await conn.sendMessage(from, {
            react: { text: reactionEmoji, key: mek.key }
        });

        const replyText = `📞 Anti-call feature is now *${statusText}*!`;

        // Send a formatted reply with contextInfo
        await conn.sendMessage(from, {
            text: replyText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363290715861418@newsletter', // Ensure this JID is valid
                    newsletterName: "PopkidXtech",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in anticall command:", e);
        reply(`An error occurred while toggling anti-call: ${e.message}`);
    }
});
