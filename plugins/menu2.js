const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu",
    alias: ["allmenu","fullmenu"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "menu",
    react: "📜",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `👋 *Hello  ${pushname}*

╭━━〔 𝐏𝐎𝐏𝐊𝐈𝐃 𝐗𝐓𝐄𝐂𝐇 〕━━┈⊷
┃◈╭─────────────────·๏
┃◈┃• 👑 Owner : *${config.OWNER_NAME}*
┃◈┃• ⚙️ Prefix : *[${config.PREFIX}]*
┃◈┃• 📱 Number : *${config.OWNER_NUM}*
┃◈┃• ★ Created by : *𝗣𝗢𝗣𝗞𝗜𝗗*
┃◈┃• 📅 Date : *${new Date().toLocaleDateString()}*
┃◈┃• ⏰ Time : *${new Date().toLocaleTimeString()}*
┃◈┃• 🌐 Platform : *${platform}*
┃◈┃• 📦 Version : *2.0.0*
┃◈┃• ⏱️ Runtime : *${runtime(process.uptime())}*
┃◈╰─────────────────┈⊷
╰━━━━━━━━━━━━━━━━━━━┈⊷
✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧
*𝗫𝗧𝗘𝗖𝗛 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*
✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧



╭─⊳⋅🤖 𝕮𝖔𝖗𝖊 𝖀𝖙𝖎𝖑𝖘 ⋅⊲─╮
⌬ ${config.PREFIX}alive
⌬ ${config.PREFIX}menu
⌬ ${config.PREFIX}system
⌬ ${config.PREFIX}owner
⌬ ${config.PREFIX}ping
⌬ ${config.PREFIX}owner
⌬ ${config.PREFIX}dev
╰─⊲⋅═══════════⋅⊳─╯

╭─⊳⋅⛩️ 𝕬𝖓𝖎𝖒𝖊 ⋅⊲─╮
⌬ ${config.PREFIX}anime
⌬ ${config.PREFIX}andl
⌬ ${config.PREFIX}download
⌬ ${config.PREFIX}animedetails
╰─═══════════⋅⊳─╯

╭─⊳⋅📡 𝕬𝕴 ⋅⊲─╮
⟠ ${config.PREFIX}ai 
⟠ ${config.PREFIX}gpt 
⟠ ${config.PREFIX}gemini 
⟠ ${config.PREFIX}deepseek
⟠ ${config.PREFIX}claude
⟠ ${config.PREFIX}metaai
⟠ ${config.PREFIX}dalle
╰─⊲⋅═════════⋅⊳─╯

╭─⊳⋅🎲 𝕲𝖆𝖒𝖊𝖘 & 𝕱𝖚𝖓 ⋅⊲─╮  
★ ${config.PREFIX}roll  
☆ ${config.PREFIX}coinflip  
✦ ${config.PREFIX}shapar 
╰─⊲⋅═════════════⋅⊳─╯ 

╭─⊳⋅🔧 𝖀𝖙𝖎𝖑𝖎𝖙𝖎𝖊𝖘 ⋅⊲─╮  
➤ ${config.PREFIX}rcolor  
➜ ${config.PREFIX}time  
➺ ${config.PREFIX}date  
➺ ${config.PREFIX}userinfo
╰─⊲⋅═════════⋅⊳─╯

╭─⊳⋅👑 𝕺𝖜𝖓𝖊𝖗 ⋅⊲─╮  
✪ ${config.PREFIX}count  
⌬ ${config.PREFIX}shutdown
⌬ ${config.PREFIX}broadcast
⌬ ${config.PREFIX}gjid
╰─⊲⋅═════════⋅⊳─╯

╭─⊳⋅🎵 𝕸𝖊𝖉𝖎𝖆 𝕿𝖔𝖔𝖑𝖘 ⋅⊲─╮
⭒ ${config.PREFIX}sticker
⭒ ${config.PREFIX}toimg
⭒ ${config.PREFIX}gen
⭒ ${config.PREFIX}txt2img
⭒ ${config.PREFIX}shorten
⭒ ${config.PREFIX}tourl
⭒ ${config.PREFIX}movie
⭒ ${config.PREFIX}img
⭒ ${config.PREFIX}gifsearch
⭒ ${config.PREFIX}vv
⭒ ${config.PREFIX}say
⭒ ${config.PREFIX}aivoice <text>
⭒ ${config.PREFIX}calculate
⭒ ${config.PREFIX}font
⭒ ${config.PREFIX}couplepp
⭒ ${config.PREFIX}wallpaper
⭒ ${config.PREFIX}calc
⭒ ${config.PREFIX}lyrics
⭒ ${config.PREFIX}define
⭒ ${config.PREFIX}pokedex
⭒ ${config.PREFIX}tempmail
⭒ ${config.PREFIX}checkmail
⭒ ${config.PREFIX}technews
⭒ ${config.PREFIX}vcf
⭒ ${config.PREFIX}font <text>
╰─⊲⋅═════════════⋅⊳─╯

╭─⊳⋅⬇️ 𝕯𝖔𝖜𝖓𝖑𝖔𝖆𝖉𝖊𝖗𝖘 ⋅⊲─╮
⋗ 𝘼𝙪𝙙𝙞𝙤:
  ⇝ ${config.PREFIX}song
  ⇝ ${config.PREFIX}ttmp3
  ⇝ ${config.PREFIX}spotify
  ⇝ ${config.PREFIX}ringtone
  ⇝ ${config.PREFIX}ytmp3 <url>

⋗ �𝙧𝙚𝙢𝙞𝙪𝙢:
  ⇝ ${config.PREFIX}modapk

⋗ 𝙑𝙞𝙙𝙚𝙤:
  ⇝ ${config.PREFIX}video
  ⇝ ${config.PREFIX}fb
  ⇝ ${config.PREFIX}ttmp4
  ⇝ ${config.PREFIX}insta
  ⇝ ${config.PREFIX}movie
  ⇝ ${config.PREFIX}ytmp4 <url>

⋗ 𝙁𝙞𝙡𝙚𝙨:
  ⇝ ${config.PREFIX}dl
  ⇝ ${config.PREFIX}mediafire
  ⇝ ${config.PREFIX}rtik
  ⇝ ${config.PREFIX}tiktok <urlW
  ⇝ ${config.PREFIX}gdrive 
  ⇝ ${config.PREFIX}capcut
  ⇝ ${config.PREFIX}telestick
  ⇝ ${config.PREFIX}apk
╰─⊲⋅═══════════⋅⊳─╯

╭─⊳⋅🔍 𝕾𝖊𝖆𝖗𝖈𝖍 ⋅⊲─╮
⨳ ${config.PREFIX}anime
⨳ ${config.PREFIX}img
⨳ ${config.PREFIX}weather
⨳ ${config.PREFIX}movie
⨳ ${config.PREFIX}ytsearch
⨳ ${config.PREFIX}wikipedia
⨳ ${config.PREFIX}tiksearch
╰─⊲⋅══════════⋅⊳─╯

╭─⊳⋅😃 𝓔𝓜𝓞𝓣𝓘𝓞𝓝𝓢 ⋅⊲─╮
⤷ ${config.PREFIX}happy
⤷ ${config.PREFIX}heart
⤷ ${config.PREFIX}angry
⤷ ${config.PREFIX}sad
⤷ ${config.PREFIX}shy
⤷ ${config.PREFIX}moon
⤷ ${config.PREFIX}confused
⤷ ${config.PREFIX}hot
⤷ ${config.PREFIX}nikal
╰─⊲⋅════════════⋅⊳─╯

╭─⊳⋅ ⚜ 𝕷𝖔𝖌𝖔 ⋅⊲─╮
⚜ ${config.PREFIX}ephoto <name>
╰─⊲⋅═══════⋅⊳─╯


╭─⊳⋅✞ 𝓡𝓔𝓵𝓲𝓰𝓲𝓸𝓷⋅⊲─╮
⤞ ${config.PREFIX}bible 
⤞ ${config.PREFIX}quran
⤞ ${config.PREFIX}surahlist
⤞ ${config.PREFIX}praytime
╰─⊲⋅══════════⋅⊳─╯

╭─⊳⋅🗞️ 𝕹𝖊𝖜𝖘 ⋅⊲─╮
⨠ ${config.PREFIX}hirunews
⨠ ${config.PREFIX}itnnews
╰─⊲⋅════════⋅⊳─╯

╭─⊳⋅🛠️ 𝕾𝖞𝖘𝖙𝖊𝖒 ⋅⊲─╮
⚙ ${config.PREFIX}restart
⚙ ${config.PREFIX}leave
⚙ ${config.PREFIX}block
⚙ ${config.PREFIX}unblock
╰─⊲⋅══════════⋅⊳─╯

╭─⊳⋅⚙️ 𝕾𝖊𝖙𝖙𝖎𝖓𝖌𝖘 ⋅⊲─╮
⚙ ${config.PREFIX}setprefix
⚙ ${config.PREFIX}mode
⚙ ${config.PREFIX}auto_typing
⚙ ${config.PREFIX}always_online
⚙ ${config.PREFIX}auto_reacording
⚙ ${config.PREFIX}status_view
⚙ ${config.PREFIX}status_react
⚙ ${config.PREFIX}read_message
⚙ ${config.PREFIX}anti_bad
⚙ ${config.PREFIX}auto_sticker
⚙ ${config.PREFIX}auto_reply
⚙ ${config.PREFIX}auto_voice
⚙ ${config.PREFIX}auto_react
⚙ ${config.PREFIX}custom_reacts
⚙ ${config.PREFIX}anti_link
⚙ ${config.PREFIX}status_reply
╰─⊲⋅═════════⋅⊳─╯


╭─⊳⋅👥 Group ⋅⊲─╮
✫ ${config.PREFIX}mute
✫ ${config.PREFIX}unmute
✫ ${config.PREFIX}promote
✫ ${config.PREFIX}demote
✫ ${config.PREFIX}kick
✫ ${config.PREFIX}add
✫ ${config.PREFIX}gcpp
✫ ${config.PREFIX}fullpp
✫ ${config.PREFIX}gclink
✫ ${config.PREFIX}tagall
✫ ${config.PREFIX}take
✫ ${config.PREFIX}kickall
✫ ${config.PREFIX}kickall2
✫ ${config.PREFIX}kickadmins
✫ ${config.PREFIX}groupinfo
✫ ${config.PREFIX}opentime
✫ ${config.PREFIX}closetime
✫ ${config.PREFIX}updategdesc
✫ ${config.PREFIX}updategname
✫ ${config.PREFIX}ginfo
✫ ${config.PREFIX}join
✫ ${config.PREFIX}lockgc
✫ ${config.PREFIX}unlockgc
✫ ${config.PREFIX}newgc
✫ ${config.PREFIX}out
✫ ${config.PREFIX}poll
✫ ${config.PREFIX}revoke
✫ ${config.PREFIX}hidetag
✫ ${config.PREFIX}unlockgc
╰─⊲⋅══════════⋅⊳─╯


╭─⊳⋅🌐 𝕾𝖕𝖊𝖈𝖎𝖆𝖑 ⋅⊲─╮
⎇ ${config.PREFIX}sinhala
╰─⊲⋅═════════⋅⊳─╯

╭─⊳⋅🎨 𝕬𝖓𝖎𝖒𝖊 𝕴𝖒𝖆𝖌𝖊𝖘 ⋅⊲─╮
⤷ ${config.PREFIX}garl
⤷ ${config.PREFIX}waifu
⤷ ${config.PREFIX}neko
⤷ ${config.PREFIX}megumin
⤷ ${config.PREFIX}maid
⤷ ${config.PREFIX}awoo
⤷ ${config.PREFIX}animegirl
⤷ ${config.PREFIX}animegirl1
⤷ ${config.PREFIX}animegirl2
⤷ ${config.PREFIX}animegirl3
⤷ ${config.PREFIX}animegirl4
⤷ ${config.PREFIX}animegirl5
⤷ ${config.PREFIX}anime
⤷ ${config.PREFIX}anime1
⤷ ${config.PREFIX}anime2
⤷ ${config.PREFIX}anime3
⤷ ${config.PREFIX}anime4
⤷ ${config.PREFIX}anime5
⤷ ${config.PREFIX}dog
╰─⊲⋅════════════⋅⊳─╯

╭─⊳⋅🔞 𝕹𝕾𝕱𝕎 ⋅⊲─╮
⤷ ${config.PREFIX}xnxx-dl
⤷ ${config.PREFIX}epsearch
⤷ ${config.PREFIX}epdownload
⤷ ${config.PREFIX}hentai
⤷ ${config.PREFIX}waifu
╰─⊲⋅══════════⋅⊳─╯

╭─⊳⋅👨💻 𝕯𝕰𝕽𝕾 ⋅⊲─╮
✏ ${config.PREFIX}gitclone
✏ ${config.PREFIX}ssweb
✏ ${config.PREFIX}qr
✏ ${config.PREFIX}topdf
✏ ${config.PREFIX}fetch
╰─⊲⋅════════════⋅⊳─╯

╭─⊳⋅😜 𝕱𝕌𝕹 ⋅⊲─╮
✘ ${config.PREFIX}quote
✘ ${config.PREFIX}jokes
✘ ${config.PREFIX}pickupline
✘ ${config.PREFIX}emojimix
✘ ${config.PREFIX}truth
✘ ${config.PREFIX}dare
╰─⊲⋅════════⋅⊳─╯

╭─⊳⋅📱 𝕾𝖙𝖆𝖑𝖐𝖘 ⋅⊲─╮
⟹ ${config.PREFIX}ttstalk
⟹ ${config.PREFIX}ghstalk
╰─⊲⋅═════════⋅⊳─╯

✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧
 *𝗣𝗢𝗣𝗞𝗜𝗗 𝗫𝗧𝗘𝗖𝗛*
✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧
`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/lkmvah.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363290715861418@newsletter',
                        newsletterName: config.BOT_NAME,
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/10rp3b.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});
