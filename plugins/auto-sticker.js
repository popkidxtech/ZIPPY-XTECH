const axios = require('axios');
const config = require('../config');
const { cmd } = require('../command');

cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
  try {
    const url = 'https://raw.githubusercontent.com/XdTechPro/KHAN-DATA/main/autosticker.json';
    const { data } = await axios.get(url);

    for (const text in data) {
      if (body.toLowerCase() === text.toLowerCase()) {
        if (config.AUTO_STICKER === 'true') {
          //if (isOwner) return;
          await conn.sendMessage(from, {
            sticker: { url: data[text] },
            package: 'KHAN-MD'
          }, { quoted: mek });
        }
      }
    }
  } catch (err) {
    console.error("AutoSticker Error:", err.message);
  }
});
