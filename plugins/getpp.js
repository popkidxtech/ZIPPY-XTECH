const { cmd } = require('../command'); // Assuming 'command' module is correct

cmd({
    pattern: "pp",
    alias: ["profilepic", "getpp"],
    use: ".pp (reply to a user)",
    desc: "Fetch profile picture of the user you replied to.",
    category: "main",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        // Ensure this command is used as a reply
        if (!quoted) {
            return reply("❗Please reply to a user's message to fetch their profile picture.");
        }

        // Get the JID of the target user.
        // Ensure it's in the correct format (e.g., '1234567890@s.whatsapp.net')
        const targetJid = quoted.sender;

        // Basic validation for targetJid (optional but good practice)
        if (!targetJid || !targetJid.includes('@s.whatsapp.net')) {
            return reply("❗Could not determine the target user's ID. Please try again or reply to a different message.");
        }

        let ppUrl;
        try {
            // Attempt to fetch the profile picture URL
            // Add a timeout to prevent indefinite waiting if the network is bad or WhatsApp is slow
            ppUrl = await Promise.race([
                conn.profilePictureUrl(targetJid, 'image'),
                new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timeout fetching profile picture')), 10000)) // 10 second timeout
            ]);
        } catch (err) {
            console.error(`[PP CMD] Error fetching profile picture for ${targetJid}:`, err);

            // Check for specific Baileys error conditions (if applicable to your version)
            // Common Baileys error when no PP is set: 404 or specific message
            if (err.statusCode === 404 || err.message.includes('404') || err.message.includes('No profile picture for')) {
                ppUrl = "https://i.ibb.co/BC6Ddnv/default.jpg"; // Fallback for no PP
                console.log(`[PP CMD] Using fallback image for ${targetJid} (no PP found).`);
            } else if (err.message.includes('Timeout')) {
                 ppUrl = "https://i.ibb.co/BC6Ddnv/default.jpg"; // Fallback for timeout
                 reply("⚠️ Failed to fetch profile picture due to a timeout. Using default image.");
                 console.log(`[PP CMD] Using fallback image for ${targetJid} (timeout).`);
            }
            else {
                // If it's a different error, use fallback and inform user
                ppUrl = "https://i.ibb.co/BC6Ddnv/default.jpg"; // Fallback for other errors
                reply(`⚠️ An unexpected error occurred while fetching the profile picture: ${err.message}. Using default image.`);
                console.log(`[PP CMD] Using fallback image for ${targetJid} (unexpected error).`);
            }
        }

        // Ensure ppUrl is always set before attempting to send
        if (!ppUrl) {
            ppUrl = "https://i.ibb.co/BC6Ddnv/default.jpg"; // Final fallback if somehow still null
            console.warn(`[PP CMD] ppUrl was unexpectedly null, using final fallback for ${targetJid}`);
        }

        // Send the profile picture back
        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: `✨ Profile Picture of @${targetJid.split('@')[0]}`,
            contextInfo: {
                mentionedJid: [targetJid]
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("[PP CMD] Uncaught error in command execution:", e);
        reply(`⚠️ An internal error occurred: ${e.message}`);
    }
});
