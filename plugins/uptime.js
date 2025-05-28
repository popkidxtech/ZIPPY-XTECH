const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const { performance } = require("perf_hooks");

cmd({
pattern: "alive",
alias: ["av", "runtime", "uptime"],
desc: "Check uptime and system status",
category: "main",
react: "📟",
filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {
    // Uptime
    const uptime = runtime(process.uptime());

    // Speed test
    const start = performance.now();
    const tempMsg = await conn.sendMessage(from, { text: '𝑾𝒂𝒊𝒕𝒊𝒏𝒈 𝒇𝒐𝒓 𝒔𝒚𝒔𝒕𝒆𝒎 𝒔𝒕𝒂𝒕𝒖𝒔...' }, { quoted: mek });
    const end = performance.now();
    const speed = (end - start).toFixed(2);

    // System Info
    const platform = "Heroku Platform";
    const cpuModel = os.cpus()?.[0]?.model || "Unknown CPU";
    const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
    const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

    // Stylish Alive Message
    const status = `🧊╭────[ 𝗣𝗢𝗣𝗞𝗜𝗗 𝗫𝗧𝗘𝗖𝗛 ⚙️ ]────➤

👤 *Bot Name:* Popkid-XTech
📟 *Status:* ✅ Online
🔋 *Uptime:* ${uptime}
📶 *Speed:* ${speed} ms

💻 *Platform:* ${platform}
🧠 *CPU:* ${cpuModel}
🗂️ *RAM:* ${usedMem}MB / ${totalMem}MB

👑 *Owner:* @${senderNumber}
📡 *Version:* 1.0.0 BETA
📁 *Framework:* Baileys-MD
🔧 *NodeJS:* ${process.version}

📌 Use *menu* to see all commands.

╰──────────────◆`;

    // Send Image + Caption
    await conn.sendMessage(from, {
        image: { url: `https://files.catbox.moe/lkmvah.jpg` },
        caption: status,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363290715861418@newsletter',
                newsletterName: '𝐏𝐎𝐏𝐊𝐈𝐃 𝐀𝐋𝐈𝐕𝐄🩷',
                serverMessageId: 143
            }
        }
    }, { quoted: mek });

    // Send Audio
    await conn.sendMessage(from, {
        audio: { url: 'https://files.catbox.moe/5df4ei.m4a.ogg' },
        mimetype: 'audio/ogg',
        ptt: true
    }, { quoted: mek });

    // Delete temp message
    await conn.sendMessage(from, { delete: tempMsg.key });

} catch (e) {
    console.error("Error in alive command:", e);
    reply(`🚨 *An error occurred:* ${e.message}`);
}
});
