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
async (conn, mek, m, {
  from, quoted, senderNumber, reply
}) => {
  try {
    // Uptime
    const uptime = runtime(process.uptime());

    // Speed test
    const start = performance.now();
    const tempMsg = await conn.sendMessage(from, { text: '🔄 Checking bot status...' }, { quoted: mek });
    const end = performance.now();
    const speed = (end - start).toFixed(2);

    // System Info
    const platform = "Heroku Platform";
    const cpuModel = os.cpus()?.[0]?.model || "Unknown CPU";
    const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
    const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

    // Alive Message
    const status = `🧊╭────[ *𝗣𝗢𝗣𝗞𝗜𝗗 𝗫𝗧𝗘𝗖𝗛 ⚙️* ]────➤

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

📌 Type *menu* to explore commands.

╰──────────────◆`;

    // Newsletter context
    const newsletterContext = {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363290715861418@newsletter',
        newsletterName: 'its popkid👻❤️',
        serverMessageId: 143
      }
    };

    // Send image with caption and newsletter forward style
    await conn.sendMessage(from, {
      image: { url: `https://files.catbox.moe/lkmvah.jpg` },
      caption: status,
      contextInfo: newsletterContext
    }, { quoted: mek });

    // Send audio as voice note with newsletter forward style
    await conn.sendMessage(from, {
      audio: { url: 'https://files.catbox.moe/5df4ei.m4a' }, // Replace with .ogg if desired
      mimetype: 'audio/mp4',
      ptt: true,
      contextInfo: newsletterContext
    }, { quoted: mek });

    // Delete temporary "checking status" message
    await conn.sendMessage(from, { delete: tempMsg.key });

  } catch (e) {
    console.error("Error in alive command:", e);
    reply(`🚨 *An error occurred:* ${e.message}`);
  }
});
