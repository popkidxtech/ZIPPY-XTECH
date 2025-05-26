const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

cmd({
    pattern: "test",
    alias: [],
    use: '.test',
    desc: "Send a random song audio.",
    category: "fun",
    react: "🎶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        // Folder where audio files are stored
        const songDir = path.join(__dirname, '../media/songs');

        // Get all mp3 files in the folder
        const files = fs.readdirSync(songDir).filter(file => file.endsWith('.mp3'));

        if (!files.length) return reply("No songs found in media/songs folder.");

        // Pick a random song
        const randomFile = files[Math.floor(Math.random() * files.length)];
        const filePath = path.join(songDir, randomFile);

        // Send the audio
        await conn.sendMessage(from, {
            audio: fs.readFileSync(filePath),
            mimetype: 'audio/mp4',
            ptt: false  // set to true if you want it to be a voice note
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in test command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
