const { cmd } = require('../command');
const axios = require('axios');

cmd({
  'on': "text"
}, async (conn, m, store, { from, isGroup, mentionedJidList, sender }) => {
  try {
    const botJid = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    if (!isGroup || !mentionedJidList.includes(botJid)) return;

    const audioList = [
      "https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/Islamic.m4a",
      "https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a"
    ];

    // Check if URL exists before sending
    const randomAudio = audioList[Math.floor(Math.random() * audioList.length)];
    const response = await axios.head(randomAudio); // Check if file exists

    if (response.status === 200) {
      await conn.sendMessage(from, {
        audio: { url: randomAudio },
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: { 
          mentionedJid: [sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363290715861418@newsletter',
            newsletterName: 'Popkid',
            serverMessageId: 143
          }
        }
      }, { quoted: m });
    }
  } catch (error) {
    console.error("AutoVoice Error:", error.message);
  }
});
