const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd, commands } = require("../command");

cmd({
  pattern: "tourl",
  alias: ["imgtourl", "imgurl", "url", "geturl", "upload"],
  react: '🖇',
  desc: "Convert media to Catbox URL",
  category: "utility",
  use: ".tourl [reply to media]",
  filename: __filename
}, async (client, message, args, { reply }) => {
  try {
    const quotedMsg = message.quoted ? message.quoted : message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';

    if (!mimeType) {
      throw "⚠️ Please reply to an image, video, or audio file.";
    }

    // Download media buffer
    const mediaBuffer = await quotedMsg.download();
    const tempFilePath = path.join(os.tmpdir(), `catbox_upload_${Date.now()}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Get proper file extension
    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else if (mimeType.includes('image/gif')) extension = '.gif';
    else if (mimeType.includes('video/mp4')) extension = '.mp4';
    else if (mimeType.includes('video/webm')) extension = '.webm';
    else if (mimeType.includes('audio/mp3')) extension = '.mp3';
    else if (mimeType.includes('audio/ogg')) extension = '.ogg';
    else {
      fs.unlinkSync(tempFilePath);
      return await reply("❌ Unsupported file type for Catbox.");
    }

    const fileName = `file${extension}`;

    // Prepare Catbox form
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), fileName);
    form.append('reqtype', 'fileupload');

    const response = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const mediaUrl = response.data;

    if (!mediaUrl || typeof mediaUrl !== 'string' || mediaUrl.startsWith("Error")) {
      fs.unlinkSync(tempFilePath);
      throw `Catbox error: ${mediaUrl}`;
    }

    fs.unlinkSync(tempFilePath);

    // Detect media type
    let mediaType = 'File';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';

    // Send stylish hacker response
    await client.sendMessage(message.chat, {
      text:
        `🟢 [ FILE UPLOADED TO CATBOX ]\n` +
        `┌───────────────◇\n` +
        `│ 📁 Type : *${mediaType}*\n` +
        `│ 💾 Size : *${formatBytes(mediaBuffer.length)}*\n` +
        `│ 🌐 URL  : *${mediaUrl}*\n` +
        `└───────────────◇\n` +
        `\n` +
        `👨‍💻 Uploader : *Popkid Mainframe v1.0.0*\n` +
        `🧠 Protocol : *catbox.moe - secure upload*\n` +
        `🔓 Status : *Encrypted & Deployed* ✅`,
      buttons: [
        {
          buttonId: mediaUrl,
          buttonText: { displayText: '💻 OPEN URL' },
          type: 1
        },
        {
          buttonId: '.tourl',
          buttonText: { displayText: '🔁 Upload Another' },
          type: 1
        }
      ],
      footer: "⛓️ POPKID-XTECH BOT ─ Hacker Protocol",
      headerType: 1
    }, { quoted: message });

  } catch (error) {
    console.error(error);
    await reply(`❌ Error: ${error.message || error}`);
  }
});

// Format bytes function
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
