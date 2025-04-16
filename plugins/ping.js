const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    desc: "Check bot's response speed with 30 stylish formats",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const start = Date.now();
        
        // Emoji collections
        const reactionEmojis = ['⚡', '🚀', '💨', '🎯', '💥', '🔹', '✨', '🌟', '🌀', '🎉'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🔱', '🛡️', '🔰', '🎯'];
        
        // Select unique emojis
        let reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction
        await conn.sendMessage(from, {
            react: { text: reactionEmoji, key: mek.key }
        });

        const responseTime = (Date.now() - start) / 1000;

        // 30 Unique Ping Styles
        const pingStyles = [
            // 1-10: Basic Styles
            `⚡ *${config.BOT_NAME} SPEED*: ${responseTime.toFixed(2)}ms ${textEmoji}`,
            `╭───『 PING 』───⳹\n│\n│ ⚡ ${responseTime.toFixed(2)}ms\n│\n╰────────────────⳹`,
            `🚀 *BLAST FAST!* 🚀\n${responseTime.toFixed(2)}ms ${textEmoji}`,
            `▰▰▰ PING ▰▰▰\n${responseTime.toFixed(2)}ms ${textEmoji}`,
            `• ${responseTime.toFixed(2)}ms • ${textEmoji}`,
            `⚡ ${responseTime.toFixed(2)}ms ⚡`,
            `✧ ${config.BOT_NAME} ✧\n${responseTime.toFixed(2)}ms ${textEmoji}`,
            `> ${responseTime.toFixed(2)}ms < ${textEmoji}`,
            `【 ${responseTime.toFixed(2)}ms 】${textEmoji}`,
            `♢ ${responseTime.toFixed(2)}ms ♢ ${textEmoji}`,

            // 11-20: Creative Styles
            `╔═✦ ${config.BOT_NAME} ✦═╗\n║ ${responseTime.toFixed(2)}ms ${textEmoji} ║\n╚══════════╝`,
            `▄▀▄▀▄ ${responseTime.toFixed(2)}ms ▄▀▄▀▄\n${textEmoji} ${config.BOT_NAME}`,
            `✦・゜゜・${responseTime.toFixed(2)}ms・゜゜・✦\n${textEmoji}`,
            `|~~~ ${responseTime.toFixed(2)}ms ~~~|\n${textEmoji}`,
            `♡ ${responseTime.toFixed(2)}ms ♡\n${textEmoji}`,
            `✧･ﾟ: *${responseTime.toFixed(2)}ms* :･ﾟ✧\n${textEmoji}`,
            `★・・・・・・★\n ${responseTime.toFixed(2)}ms \n★・・・・・・★\n${textEmoji}`,
            `≈≈≈≈≈≈≈≈≈≈≈≈≈\n  ${responseTime.toFixed(2)}ms  \n≈≈≈≈≈≈≈≈≈≈≈≈≈\n${textEmoji}`,
            `▁ ▂ ▄ ▅ ▆ ▇ ${responseTime.toFixed(2)}ms ▇ ▆ ▅ ▄ ▂ ▁\n${textEmoji}`,
            `◈◈◈ ${responseTime.toFixed(2)}ms ◈◈◈\n${textEmoji}`,

            // 21-30: Fancy Styles
            `╭┉┉┉┉┉┉┉┉╮\n┋ ${responseTime.toFixed(2)}ms ┋\n╰┉┉┉┉┉┉┉┉╯\n${textEmoji}`,
            `▞▚ ${responseTime.toFixed(2)}ms ▞▚\n${textEmoji}`,
            `▣▣▣▣▣▣▣▣\n ${responseTime.toFixed(2)}ms \n▣▣▣▣▣▣▣▣\n${textEmoji}`,
            `✼ ҉ ✼ ${responseTime.toFixed(2)}ms ✼ ҉ ✼\n${textEmoji}`,
            `◖ ${responseTime.toFixed(2)}ms ◗\n${textEmoji}`,
            `▰▱▰▱ ${responseTime.toFixed(2)}ms ▰▱▰▱\n${textEmoji}`,
            `≪ ${responseTime.toFixed(2)}ms ≫\n${textEmoji}`,
            `◈◇◈ ${responseTime.toFixed(2)}ms ◈◇◈\n${textEmoji}`,
            `▷▶ ${responseTime.toFixed(2)}ms ◀◁\n${textEmoji}`,
            `✧⋄⋆ ${responseTime.toFixed(2)}ms ⋆⋄✧\n${textEmoji}`
        ];

        // Select random style
        const selectedStyle = pingStyles[Math.floor(Math.random() * pingStyles.length)];

        // Send ping response
        await conn.sendMessage(from, {
            text: selectedStyle,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363290715861418@newsletter',
                    newsletterName: config.OWNER_NAME || "PopkidXtech",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Ping Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
