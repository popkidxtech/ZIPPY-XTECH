const { cmd } = require('../command');

let antiDeleteEnabled = false; // Global toggle

cmd({
    pattern: "antidelete2",
    desc: "Toggle global AntiDelete for all chats",
    category: "main",
    filename: __filename,
    use: ".antidelete2 [on/off]",
    react: "♻️"
}, async (conn, mek, m, { args, reply }) => {
    const input = args[0]?.toLowerCase();

    if (!input) {
        return reply(
            `*AntiDelete Menu (Global)*\n\n` +
            `> *.antidelete on* - Enable for all chats\n` +
            `> *.antidelete off* - Disable for all chats\n\n` +
            `Current Status: ${antiDeleteEnabled ? '✅ ENABLED' : '❌ DISABLED'}`
        );
    }

    if (input === "on") {
        antiDeleteEnabled = true;
        return reply(`✅ AntiDelete has been globally *ENABLED*.`);
    } else if (input === "off") {
        antiDeleteEnabled = false;
        return reply(`❌ AntiDelete has been globally *DISABLED*.`);
    } else {
        return reply("Invalid input. Use `.antidelete on` or `.antidelete off`");
    }
});

// Set up listener for deleted messages globally
const setupAntiDeleteListener = (conn) => {
    conn.ev.on("messages.update", async (updates) => {
        for (const update of updates) {
            if (update.messageStubType === 1 && update.key?.remoteJid && antiDeleteEnabled) {
                const jid = update.key.remoteJid;

                // Ignore messages deleted by the bot itself
                if (update.key.fromMe) continue;

                try {
                    const deletedMsg = await conn.store.loadMessage(jid, update.key.id);
                    if (!deletedMsg?.message) return;

                    const sender = update.key.participant || update.participant || jid;
                    const type = Object.keys(deletedMsg.message)[0];

                    const notice = `> *Recovered Deleted Message*\n` +
                                   `• From: @${sender.split('@')[0]}\n` +
                                   `• Type: ${type}`;

                    await conn.sendMessage(jid, {
                        text: notice,
                        contextInfo: { mentionedJid: [sender] }
                    });

                    await conn.sendMessage(jid, deletedMsg.message);
                } catch (err) {
                    console.log("AntiDelete error:", err);
                }
            }
        }
    });
};

module.exports = {
    setupAntiDeleteListener
};
