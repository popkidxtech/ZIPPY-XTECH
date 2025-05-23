const settingsManager = require('../lib/settingsmanager'); // Path to your settings manager
const { cmd } = require('../command'); // Adjust path as needed to your command registration

cmd({
    pattern: "anticall",
    alias: ["callblock", "togglecall"], // Added "togglecall" as another alias
    desc: "Toggles the anti-call feature on or off.",
    category: "owner",
    react: "📞", // Your chosen reaction for the command itself
    filename: __filename,
    fromMe: true // Ensure only the bot owner can use this (via direct messages from bot)
},
async (conn, mek, m, { isOwner, reply, from, sender }) => { // Added 'from' and 'sender' for the reply style
    try {
        if (!isOwner) {
            return reply("🚫 This command is for the bot owner only.");
        }

        let currentStatus = settingsManager.getSetting('ANTICALL');
        let newStatus = !currentStatus;

        settingsManager.setSetting('ANTICALL', newStatus);

        const statusText = newStatus ? 'enabled' : 'disabled';
        const reactionEmoji = newStatus ? '✅' : '❌'; // Reaction for the final message

        // Send reaction to the command message itself (like ping)
        await conn.sendMessage(from, {
            react: { text: reactionEmoji, key: mek.key }
        });

        const replyText = `📞 Anti-call feature is now *${statusText}*!`;

        // Send a formatted reply with contextInfo, similar to your ping command
        await conn.sendMessage(from, {
            text: replyText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999, // You can adjust or remove this
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363290715861418@newsletter', // Ensure this JID is valid
                    newsletterName: "PopkidXtech",
                    serverMessageId: 143 // You can adjust or remove this
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in anticall command:", e);
        reply(`An error occurred while toggling anti-call: ${e.message}`);
    }
});
