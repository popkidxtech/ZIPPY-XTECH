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

        const platform = "Heroku Platform";
        const release = os.release();
        const cpu = os.cpus()[0].model;
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

        await conn.sendMessage(from, {
            image: { url: 'https://i.imgur.com/KN9rDBU.jpeg' }, // Hacker-style image
            caption: status,
            buttons: [
                { buttonId: 'menu', buttonText: { displayText: '📂 MENU' }, type: 1 },
                { buttonId: 'info', buttonText: { displayText: 'ℹ️ SYSTEM INFO' }, type: 1 },
                { buttonId: 'support', buttonText: { displayText: '🧰 SUPPORT' }, type: 1 }
            ],
            footer: '👾 PopkidBot Terminal Interface',
            headerType: 4,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/5df4ei.m4v' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive command error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});
