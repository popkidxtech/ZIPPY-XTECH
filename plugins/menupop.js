const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu",
    alias: ["allmenu","popkid"],use: '.menu',
    desc: "menu the bot",
    category: "menu",
    react: "📱",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
🌟━━━ *${config.BOT_NAME}* ━━━🌟
╭–––––––––––––––––––––––––––––––––––––
│⚙️ *ʀᴜɴᴛɪᴍᴇ:* ${runtime(process.uptime())}
│🕹️ *ᴍᴏᴅᴇ:* *${config.MODE}*
│🎯 *ᴘʀᴇғɪx:* *${config.PREFIX}*
│💡 *ʀᴀᴍ ᴜsᴇ:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} GB / ${Math.round(require('os').totalmem / 1024 / 1024)} GB
│👑 *ᴅᴇᴠ:* *ᴘᴏᴘᴋɪᴅ ᴛᴇᴄʜ*
│🚀 *ᴠᴇʀsɪᴏɴ:* *1.0.0*
╰–––––––––––––––––––––––––––––––––––––
> ©𝗱𝗲𝘃 𝗽𝗼𝗽𝗸𝗶𝗱🎮

---
📚 *DOWNLOAD COMMANDS*
---
* ⚡ .fb
* ⚡ .insta
* ⚡ .video
* ⚡ .gdrive
* ⚡ .twitter
* ⚡ .tt
* ⚡ .mediafire
* ⚡ .play
* ⚡ .song
* ⚡ .video
* ⚡ .spotify
* ⚡ .video4
* ⚡ .img
* ⚡ .lyrics
* ⚡ .apk
* ⚡ .baiscope
* ⚡ .ginisisila

---
🔍 *SEARCH COMMANDS*
---
* 🔎 .yts
* 🔎 .yta
* 🔎 .movie
* 🔎 .romance
* 🔎 .motivate
* 🔎 .aivoice
* 🔎 .google
* 🔎 .weather
* 🔎 .sticksearch

---
🎨 *LOGO COMMANDS*
---
* 🖌️ .3dcomic
* 🖌️ .dragonball
* 🖌️ .deadpool
* 🖌️ .blackpink
* 🖌️ .neonlight
* 🖌️ .cat
* 🖌️ .sadgirl
* 🖌️ .pornhub
* 🖌️ .naruto
* 🖌️ .thor
* 🖌️ .america
* 🖌️ .eraser
* 🖌️ .3dpaper
* 🖌️ .futuristic
* 🖌️ .clouds
* 🖌️ .sans
* 🖌️ .galaxy
* 🖌️ .leaf
* 🖌️ .sunset
* 🖌️ .nigeria
* 🖌️ .devilwings
* 🖌️ .hacker
* 🖌️ .boom
* 🖌️ .luxury
* 🖌️ .zodiac
* 🖌️ .angelwings
* 🖌️ .bulb
* 🖌️ .tattoo
* 🖌️ .castle
* 🖌️ .frozen
* 🖌️ .paint
* 🖌️ .birthday
* 🖌️ .typography
* 🖌️ .bear
* 🖌️ .valorant

---
🧠 *AI COMMANDS*
---
* 🤖 .gpt
* 🤖 .ai
* 🤖 .imagescan
* 🤖 .imagine

---
👑 *OWNER COMMANDS*
---
* ⚙️ .updatecmd
* ⚙️ .settings
* ⚙️ .owner
* ⚙️ .repo
* ⚙️ .system
* ⚙️ .status
* ⚙️ .about
* ⚙️ .block
* ⚙️ .unblock
* ⚙️ .shutdown
* ⚙️ .broadcast
* ⚙️ .jid
* ⚙️ .gjid
* ⚙️ .pair
* ⚙️ .save
* ⚙️ .popkid
* ⚙️ .restart

---
👥 *GROUP COMMANDS*
---
* 👨‍👩‍👧‍👦 .remove
* 👨‍👩‍👧‍👦 .del
* 👨‍👩‍👧‍👦 .add
* 👨‍👩‍👧‍👦 .kick
* 👨‍👩‍👧‍👦 .kickall
* 👨‍👩‍👧‍👦 .promote
* 👨‍👩‍👧‍👦 .demote
* 👨‍👩‍👧‍👦 .tagall
* 👨‍👩‍👧‍👦 .invite
* 👨‍👩‍👧‍👦 .revoke
* 👨‍👩‍👧‍👦 .poll
* 👨‍👩‍👧‍👦 .randomship
* 👨‍👩‍👧‍👦 .newgc
* 👨‍👩‍👧‍👦 .mute
* 👨‍👩‍👧‍👦 .unmute
* 👨‍👩‍👧‍👦 .lockgc
* 👨‍👩‍👧‍👦 .unlockgc
* 👨‍👩‍👧‍👦 .leave
* 👨‍👩‍👧‍👦 .gname
* 👨‍👩‍👧‍👦 .makeadmin
* 👨‍👩‍👧‍👦 .tagadmins
* 👨‍👩‍👧‍👦 .gdesc
* 👨‍👩‍👧‍👦 .join
* 👨‍👩‍👧‍👦 .hidetag
* 👨‍👩‍👧‍👦 .ginfo

---
ℹ️ *INFO COMMANDS*
---
* 💡 .about
* 💡 .alive
* 💡 .request
* 💡 .botinfo
* 💡 .status
* 💡 .ping
* 💡 .system
* 💡 .uptime

---
🤖 *BOT SETTINGS*
---
* ⚙️ .repo
* ⚙️ .menu
* ⚙️ .update
* ⚙️ .mode
* ⚙️ .auto-typing
* ⚙️ .alwaysonline
* ⚙️ .auto-recording
* ⚙️ .autoreadstatus
* ⚙️ .antibad
* ⚙️ .autosticker
* ⚙️ .autoreply
* ⚙️ .autoreact
* ⚙️ .antilink
* ⚙️ .autoread

---
🔄 *CONVERTER COMMANDS*
---
* 🛠️ .sticker
* 🛠️ .take
* 🛠️ .trt
* 🛠️ .tts
* 🛠️ .fancy
* 🛠️ .url
* 🛠️ .age
* 🛠️ .convert
* 🛠️ .tiny
* 🛠️ .movie
* 🛠️ .terminate
* 🛠️ .family
* 🛠️ .trt
* 🛠️ .tts

---
🎲 *RANDOM COMMANDS*
---
* 🍀 .anime
* 🍀 .couplepp
* 🍀 .loli
* 🍀 .waifu
* 🍀 .cosplay
* 🍀 .neko
* 🍀 .randomanime

---
🖼️ *WALLPAPERS COMMANDS*
---
* 🏞️ .img
* 🏞️ .logo
* 🏞️ .ss

---
✨ *OTHER COMMANDS*
---
* 🌐 .trt
* 🌐 .joke
* 🌐 .fact
* 🌐 .github
* 🌐 .gpass
* 🌐 .hack
* 🌐 .vv
* 🌐 .vv2
* 🌐 .spam
* 🌐 .vcard
* 🌐 .srepo
* 🌐 .system
* 🌐 .rank
* 🌐 .timezone
* 🌐 .define
* 🌐 .dailyfact

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘᴏᴘᴋɪᴅ🎲`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/e6rhto.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363290715861418@newsletter',
                        newsletterName: 'PᴏᴘᴋɪᴅXᴛᴇᴄʜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Function to send menu audio with timeout
        const sendMenuAudio = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay after image
                await conn.sendMessage(from, {
                    audio: { url: 'https://github.com/Popkiddevs/POP-DATA/raw/refs/heads/main/autovoice/menu.m4a' },
                    mimetype: 'audio/mp4',
                    ptt: true,
                }, { quoted: mek });
            } catch (e) {
                console.log('Audio send failed, continuing without it');
            }
        };
