

const { cmd } = require("../command");

cmd({
    pattern: "wa",
    alias: ["wamw", "whois"],
    desc: "Display a contact's number in three formats (requires reply to a message). (Owner only)",
    category: "contact",
    react: "📞",
    filename: __filename,
    use: ".wa (reply to a message)"
}, async (conn, mek, m, { from, sender, isOwner, reply }) => {
    try {
        // Ensure that only the owner can use this command
        if (!isOwner) return reply("❌ You are not authorized to use this command.");

        // Check if the command was used as a reply
        if (!m.quoted) {
            return reply("⚠️ Please reply to a message to get that contact's number.");
        }

        // Retrieve the target JID from the replied message
        const targetJid = m.quoted.sender;
        if (!targetJid) return reply("❌ Unable to retrieve the contact's number.");

        // Extract the phone number part from the JID (e.g., "123456789@s.whatsapp.net" becomes "123456789")
        const number = targetJid.split('@')[0];

        // Create the international format (add '+' if missing)
        const plusFormat = number.startsWith("+") ? number : `+${number}`;

        // Create the wa.me link format (without the '+')
        const waLink = `https://wa.me/${number}`;

        // Create the JID format (remains as is)
        const jidFormat = `${number}@s.whatsapp.net`;

        // Construct the final message containing all three formats
        const message = `*📞Contact Number Formats:*\n\n` +
                        `*International Format:* ${plusFormat}\n` +
                        `*Link:* ${waLink}\n` +
                        `*JID:* ${jidFormat}`;

        // Reply with the formatted message
        return reply(message);
    } catch (error) {
        console.error("Error in wa command:", error);
        return reply(`❌ An error occurred: ${error.message}`);
    }
});
