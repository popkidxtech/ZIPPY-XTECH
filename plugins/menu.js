const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
pattern: "menu",
alias: ["allmenu","fullmenu"],use: '.menu',
desc: "menu the bot",
category: "menu",
react: "📱",
filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {
let dec = `╭──❍「 USER INFO 」❍
├• 🦸 Owner: 𝗗𝗲𝘃 𝗣𝗼𝗽𝗸𝗶𝗱
├• 🏆 Rank: Tadpole
├• 🎮 XP: 27
├• 🎩 User: 𝗣𝗼𝗽𝗸𝗶𝗱
╰─┬─★─☆──♪♪─❍
╭─┴❍「 BOT STATUS 」❍
├• 📅 Date: May 13, 2025
├• ⏲️ Time: 02:20:00 EAT
├• 🤖 Bot: 𝗣𝗼𝗽𝗸𝗶𝗱 𝗫𝗺𝗱
├• #️⃣ Prefix: .
├• ⏱️ Uptime: ${runtime(process.uptime())}
├• 📊 Database: 0 / 120
╰─┬─★─☆──♪♪─❍

╭─┴❍「 DOWNLOAD 」❍
├🍟 .fb
├⬡ .insta
├⬡ .video
├⬡ .gdrive
├⬡ .twitter
├⬡ .tt
├⬡ .mediafire
├⬡ .play
├⬡ .song
├⬡ .video
├⬡ .spotify
├⬡ .video4
├⬡ .img
├⬡ .lyrics
├⬡ .apk
├⬡ .baiscope
├🍟 .ginisisila
╰─┬─★─☆──♪♪─❍
╭─┴❍「 SEARCH 」❍
├🌸 .yts
├⬡ .yta
├⬡ .movie
├⬡ .romance
├⬡ .motivate
├⬡ .aivoice
├⬡ .google
├⬡ .weather
├🌸 .sticksearch
╰─┬─★─☆──♪♪─❍
╭─┴❍「 LOGO 」❍
├👻 .3dcomic
├⬡ .dragonball
├⬡ .deadpool
├⬡ .blackpink
├⬡ .neonlight
├⬡ .cat
├⬡ .sadgirl
├⬡ .pornhub
├⬡ .naruto
├⬡ .thor
├⬡ .america
├⬡ .eraser
├⬡ .3dpaper
├⬡ .futuristic
├⬡ .clouds
├⬡ .sans
├⬡ .galaxy
├⬡ .leaf
├⬡ .sunset
├⬡ .nigeria
├⬡ .devilwings
├⬡ .hacker
├⬡ .boom
├⬡ .luxury
├⬡ .zodiac
├⬡ .angelwings
├⬡ .bulb
├⬡ .tattoo
├⬡ .castle
├⬡ .frozen
├⬡ .paint
├⬡ .birthday
├⬡ .typography
├⬡ .bear
├👻 .valorant
╰─┬─★─☆──♪♪─❍
╭─┴❍「 AI 」❍
├🚀 .gpt
├⬡ .ai
├⬡ .imagescan
├🚀 .imagine
╰─┬─★─☆──♪♪─❍
╭─┴❍「 OWNER 」❍
├🎮 .updatecmd
├⬡ .settings
├⬡ .owner
├⬡ .repo
├⬡ .system
├⬡ .status
├⬡ .about
├⬡ .block
├⬡ .unblock
├⬡ .shutdown
├⬡ .broadcast
├⬡ .jid
├⬡ .gjid
├⬡ .pair
├⬡ .save
├🎮 .restart
╰─┬─★─☆──♪♪─❍
╭─┴❍「 GROUP 」❍
├🎲 .remove
├⬡ .del
├⬡ .add
├⬡ .kick
├⬡ .kickall
├⬡ .promote
├⬡ .demote
├⬡ .tagall
├⬡ .invite
├⬡ .revoke
├⬡ .poll
├⬡ .randomship
├⬡ .newgc
├⬡ .mute
├⬡ .unmute
├⬡ .lockgc
├⬡ .unlockgc
├⬡ .leave
├⬡ .gname
├⬡ .makeadmin
├⬡ .tagadmins
├⬡ .gdesc
├⬡ .join
├⬡ .hidetag
├🎲 .ginfo
╰─┬─★─☆──♪♪─❍
╭─┴❍「 INFO 」❍
├🍉 .about
├⬡ .alive
├⬡ .request
├⬡ .botinfo
├⬡ .status
├⬡ .ping
├⬡ .system
├🍉 .uptime
╰─┬─★─☆──♪♪─❍
╭─┴❍「 BOT 」❍
├💖 .repo
├⬡ .menu
├⬡ .update
├⬡ .mode
├⬡ .auto-typing
├⬡ .alwaysonline
├⬡ .auto-recording
├⬡ .autoreadstatus
├⬡ .antibad
├⬡ .autosticker
├⬡ .autoreply
├⬡ .autoreact
├⬡ .antilink
├💖 .autoread
╰─┬─★─☆──♪♪─❍
╭─┴❍「 CONVERTER 」❍
├🎥 .sticker
├⬡ .take
├⬡ .trt
├⬡ .tts
├⬡ .fancy
├⬡ .url
├⬡ .age
├⬡ .convert
├⬡ .tiny
├⬡ .movie
├⬡ .terminate
├⬡ .family
├⬡ .trt
├🎥 .tts
╰─┬─★─☆──♪♪─❍
╭─┴❍「 RANDOM 」❍
├🍔 .anime
├⬡ .couplepp
├⬡ .loli
├⬡ .waifu
├⬡ .cosplay
├⬡ .neko
├🍔 .randomanime
╰─┬─★─☆──♪♪─❍
╭─┴❍「 WALLPAPERS 」❍
├🧊 .img
├⬡ .logo
├🧊 .ss
╰─┬─★─☆──♪♪─❍
╭─┴❍「 OTHER 」❍
├🫠 .trt
├⬡ .joke
├⬡ .fact
├⬡ .github
├⬡ .gpass
├⬡ .hack
├⬡ .vv
├⬡ .vv2
├⬡ .spam
├⬡ .vcard
├⬡ .srepo
├⬡ .system
├⬡ .rank
├⬡ .timezone
├⬡ .define
├🫠 .dailyfact
╰─┬─★─☆──♪♪─❍
✨ Powered by Popkid 🎲`;

await conn.sendMessage( from, { image: { url: `https://files.catbox.moe/e6rhto.jpg` }, caption: dec, contextInfo: { mentionedJid: [m.sender], forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363290715861418@newsletter', newsletterName: 'PᴏᴘᴋɪᴅXᴛᴇᴄʜ', serverMessageId: 143 } } }, { quoted: mek } ); // Send audio await conn.sendMessage(from, { audio: { url: 'https://files.catbox.moe/kxdej4.m4a' }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek }); } catch (e) { console.log(e); reply(`${e}`); }

});
