const { cmd } = require('../command');
const os = require("os");
const { performance } = require('perf_hooks');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["av", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "👨‍💻",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const startTime = performance.now();

        const platform = os.platform();
        const release = os.release();
        const cpu = os.cpus()[0].model.split(" @")[0];
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(2);
        const uptime = runtime(process.uptime());
        const ping = (performance.now() - startTime).toFixed(2);

        const status = `┌─[ 🧊 ᴘᴏᴘᴋɪᴅ xᴛᴇᴄʜ - SYSTEM STATUS ]
│ 
├ 🟢 STATUS    : ONLINE & STABLE
├ ⏱️ UPTIME    : ${uptime}
├ ⚡ PING      : ${ping}ms
├ 💾 RAM USAGE: ${usedMem}GB / ${totalMem}GB
├ 💻 CPU       : ${cpu}
├ 🖥️ PLATFORM  : ${platform}
├ 🛠️ OS        : ${release}
├ 👑 OWNER     : POPKID
├ 🧪 VERSION   : 1.0.0 BETA
│
└──────────────[ 💀 TERMINAL ACTIVE ]`;

        // Send image with template buttons
        await conn.sendMessage(from, {
            image: { url: 'https://i.imgur.com/U9FqgLn.jpeg' }, // Smaller, fast-loading image
            caption: status,
            footer: '👾 PopkidBot Terminal Interface',
            templateButtons: [
                { index: 1, quickReplyButton: { displayText: '📂 MENU', id: 'menu' } },
                { index: 2, quickReplyButton: { displayText: 'ℹ️ SYSTEM INFO', id: 'info' } },
                { index: 3, quickReplyButton: { displayText: '🧰 SUPPORT', id: 'support' } }
            ],
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

        // Wait 1 second to avoid 429 error
        await new Promise(res => setTimeout(res, 1000));

        // Send voice note
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/whiskeysockets/bot-audios/raw/main/hacker_voice.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive command error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});
