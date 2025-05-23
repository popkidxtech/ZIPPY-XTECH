const { cmd } = require('../command');

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
        if (!quoted) return reply("❗Please reply to a user's message to fetch their profile picture.");

        const targetJid = quoted.sender;

        // Attempt to fetch the profile picture URL
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(targetJid, 'image');
        } catch (err) {
            ppUrl = "https://i.ibb.co/BC6Ddnv/default.jpg"; // fallback image
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
        console.error("Error fetching profile picture:", e);
        reply(`⚠️ Error: ${e.message}`);
    }
});
