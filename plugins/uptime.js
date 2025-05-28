const { cmd } = require('../command');
const os = require("os");
const process = require("process");

// Fancy uptime formatter
function fancyUptime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const dayStr = d > 0 ? `${d}d ` : "";
    const hourStr = h > 0 ? `${h}h ` : "";
    const minStr = m > 0 ? `${m}m ` : "";
    const secStr = s > 0 ? `${s}s` : "";

    return `${dayStr}${hourStr}${minStr}${secStr}`.trim() || "0s";
}

cmd({
    pattern: "alive",
    alias: ["av", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, reply, botNumber, pushname }) => {
    try {
        const platform = "Heroku Platform";
        const release = os.release();
        const cpuModel = os.cpus()[0].model;
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const cpuCores = os.cpus().length;
        const arch = os.arch();
        const nodeVersion = process.version;
        const botName = pushname || "POPKID BOT";
        const owner = "popkid";

        // Stylish header - no box lines
        const header = `✨🌌  𝓟𝓞𝓟𝓚𝓘𝓓 𝓧𝓣𝓔𝓒𝓗 𝓐𝓛𝓘𝓥𝓔 🚀✨`;

        const status = `
${header}

🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲   :: ${botName}
🆔 𝗕𝗼𝘁 𝗜𝗗     :: @${botNumber.replace(/@.+/, "")}
👑 𝗢𝘄𝗻𝗲𝗿      :: ${owner}

⏳ 𝗨𝗽𝘁𝗶𝗺𝗲      :: ${fancyUptime(process.uptime())}
💾 𝗥𝗔𝗠 Usage  :: ${usedMem} MB / ${totalMem} MB
🖥️ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺  :: ${platform} (v${release}) [${arch}]
⚙️ 𝗖𝗣𝗨        :: ${cpuModel} (${cpuCores} cores)
🟢 𝗡𝗼𝗱𝗲 𝗩𝗲𝗿𝘀𝗶𝗼𝗻  :: ${nodeVersion}
🧪 𝗩𝗲𝗿𝘀𝗶𝗼𝗻    :: 1.0.0 BETA

───────────────
▶️ Stay tuned for more updates!
        `;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/lkmvah.jpg" },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
            }
        }, { quoted: mek });

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/5df4ei.m4v" },
            mimetype: "audio/mp4",
            ptt: true,
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});
