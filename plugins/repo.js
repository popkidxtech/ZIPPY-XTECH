const axios = require('axios');
const { cmd } = require('../command');

// Repo info
cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Info about the bot repository",
    category: "main",
    react: "👨‍💻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Fetch repository data from GitHub API
        const repoResponse = await axios.get('https://api.github.com/repos/Popkiddevs/POPKID-XTECH');
        const { stargazers_count, forks_count } = repoResponse.data;
        const userCount = forks_count * 5; // Estimate user count based on forks

        // Construct the message
        const message = `
╭───〔 *POPKID MD REPOSITORY* 〕───◆
│
├ 👋 *Hello, Popkid User!*
│
├ 💻 *Repository Info*
│   ├ ⭐ Stars: ${stargazers_count}
│   ├ 🍴 Forks: ${forks_count}
│   └ 👥 Estimated Users: ${userCount}
│
├ 🔗 *Repo Link*
│   └ https://github.com/Popkiddevs/POPKID-XTECH
│
├ ✨ *About*
│   └ Popkid WhatsApp Bot – Simple. Smart. Feature-packed.
│
├ 🎊 Elevate your WhatsApp experience with cutting-edge bot tech!
│
├ 💡 *Tip:* Fork the repo & star it to support development!
│
╰───〔 *Thanks for using Popkid MD!* 〕───◆
        `;

        // Send the repository info as a text message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

        // Send a related image with additional newsletter forwarding context
        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/e6rhto.jpg` },
                caption: message,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363290715861418@newsletter',
                        newsletterName: 'popkid Xtech',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send an audio response (PTT voice note)
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/hpwsi2.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error('Error fetching repository data:', error);
        reply(`❌ *Error fetching repository data:* ${error.message}`);
    }
});
