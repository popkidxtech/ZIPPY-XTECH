const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hrs = Math.floor((seconds % (3600 * 24)) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${days}d ${hrs}h ${mins}m ${secs}s`;
}

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
    const platform = "Heroku Platform";
    const release = os.release();
    const cpuModel = os.cpus()[0].model;
    const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
    const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

    let totalGroups = 0;
    try {
      totalGroups = conn.chats.array ? conn.chats.array().filter(c => c.jid.endsWith('@g.us')).length : 0;
    } catch {}

    const up = formatUptime(process.uptime());

    const statusMsg = `
🚀 *POPKID XTECH BOT* 🚀

👤 *Owner:* popkid
📱 *Bot Number:* +${botNumber.replace(/\D/g, '')}
👥 *Groups:* ${totalGroups}

⏳ *Uptime:* ${up}
💻 *Platform:* ${platform} (${release})
🧠 *CPU:* ${cpuModel}
💾 *RAM Usage:* ${usedMem}MB / ${totalMem}MB

⚙️ *Version:* 1.0.0 BETA
🟢 *Status:* Online & Active

_Thank you for using POPKID XTECH!_
`;

    const buttons = [
      { buttonId: "ping", buttonText: { displayText: "⚡ Ping" }, type: 1 },
      { buttonId: "menu", buttonText: { displayText: "❓ Help" }, type: 1 }
    ];

    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/lkmvah.jpg' },
      caption: statusMsg,
      footer: "👾 Powered by POPKID-XTECH",
      buttons,
      headerType: 4
    }, { quoted: mek });

    await conn.sendMessage(from, {
      audio: { url: 'https://files.catbox.moe/5df4ei.m4v' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: mek });

  } catch (e) {
    console.error("Error in alive command:", e);
    reply(`🚨 *An error occurred:* ${e.message}`);
  }
});
