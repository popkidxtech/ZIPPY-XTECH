const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu2",
    alias: ["allmenu2","fullmenu2"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "menu",
    react: "📜",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *${config.BOT_NAME}* 〕━━┈⊷
┃✞︎╭─────────────────·๏
┃✞︎┃• 👑 Owner : *${config.OWNER_NAME}*
┃✞︎┃• ⚙️ Prefix : *[${config.PREFIX}]*
┃✞︎┃• 🌐 Platform : *Heroku*
┃✞︎┃• 📦 Version : *4.0.0*
┃✞︎┃• ⏱️ Runtime : *${runtime(process.uptime())}*
┃✞︎╰─────────────────┈⊷
╰━━━━━━━━━━━━━━━━━━━┈⊷
╭─⊳⋅🤖 𝕮𝖔𝖗𝖊 𝖀𝖙𝖎𝖑𝖘 ⋅⊲─╮
⌬ alive
⌬ menu
⌬ system
⌬ owner
⌬ ping
⌬ owner
⌬ dev
╰─⊲⋅═══════════⋅⊳─╯

╭─⊳⋅⛩️ 𝕬𝖓𝖎𝖒𝖊 ⋅⊲─╮
⌬ anime
⌬ andl
⌬ download
⌬ animedetails
╰─═══════════⋅⊳─╯

╭─⊳⋅📡 𝕬𝕴 ⋅⊲─╮
⟠ ai 
⟠ gpt 
⟠ gemini 
⟠ eepseek
⟠ claude
⟠ metaai
⟠ dalle
╰─⊲⋅═════════⋅⊳─╯

╭─⊳⋅🎲 𝕲𝖆𝖒𝖊𝖘 & 𝕱𝖚𝖓 ⋅⊲─╮  
★ roll  
☆ coinflip  
✦ shapar 
╰─⊲⋅═════════════⋅⊳─╯ 

╭─⊳⋅🔧 𝖀𝖙𝖎𝖑𝖎𝖙𝖎𝖊𝖘 ⋅⊲─╮  
➤ rcolor  
➜ time  
➺ date  
➺ userinfo
╰─⊲⋅═════════⋅⊳─╯

╭─⊳⋅👑 𝕺𝖜𝖓𝖊𝖗 ⋅⊲─╮  
✪ count  
⌬ shutdown
⌬ broadcast
⌬ gjid
╰─⊲⋅═════════⋅⊳─╯

╭─⊳⋅🎵 𝕸𝖊𝖉𝖎𝖆 𝕿𝖔𝖔𝖑𝖘 ⋅⊲─╮
⭒ sticker
⭒ toimg
⭒ gen
⭒ txt2img
⭒ shorten
⭒ tourl
⭒ movie
⭒ img
⭒ vv
⭒ say
⭒ aivoice <text>
⭒ calculate
⭒ font
⭒ couplepp
⭒ wallpaper
⭒ calc
⭒ lyrics
⭒ define
⭒ pokedex
⭒ tempmail
⭒ checkmail
⭒ technews
⭒ vcf
⭒ font <text>
╰─⊲⋅═════════════⋅⊳─╯

╭─⊳⋅⬇️ 𝕯𝖔𝖜𝖓𝖑𝖔𝖆𝖉𝖊𝖗𝖘 ⋅⊲─╮
⋗ 𝘼𝙪𝙙𝙞𝙤:
  ⇝ song
  ⇝ ttmp3
  ⇝ spotify
  ⇝ ringtone
  ⇝ ytmp3 <url>

⋗ �𝙧𝙚𝙢𝙞𝙪𝙢:
  ⇝ modapk

⋗ 𝙑𝙞𝙙𝙚𝙤:
  ⇝ video
  ⇝ fb
  ⇝ ttmp4
  ⇝ insta
  ⇝ movie
  ⇝ ytmp4 <url>

⋗ 𝙁𝙞𝙡𝙚𝙨:
  ⇝ dl
  ⇝ mediafire
  ⇝ rtik
  ⇝ tiktok <urlW
  ⇝ gdrive 
  ⇝ capcut
  ⇝ elestick
  ⇝ apk
╰─⊲⋅═══════════⋅⊳─╯

╭─⊳⋅🔍 𝕾𝖊𝖆𝖗𝖈𝖍 ⋅⊲─╮
⨳ anime
⨳ img
⨳ weather
⨳ movie
⨳ ytsearch
⨳ wikipedia
⨳ tiksearch
╰─⊲⋅══════════⋅⊳─╯

╭─⊳⋅😃 𝓔𝓜𝓞𝓣𝓘𝓞𝓝𝓢 ⋅⊲─╮
⤷ happy
⤷ heart
⤷ angry
⤷ sad
⤷ shy
⤷ moon
⤷ confused
⤷ hot
⤷ nikal
╰─⊲⋅════════════⋅⊳─╯

╭─⊳⋅ ⚜ 𝕷𝖔𝖌𝖔 ⋅⊲─╮
⚜ ephoto <name>
╰─⊲⋅═══════⋅⊳─╯


╭─⊳⋅✞ 𝓡𝓔𝓵𝓲𝓰𝓲𝓸𝓷⋅⊲─╮
⤞ bible 
⤞ quran
⤞ surahlist
⤞ praytime
╰─⊲⋅══════════⋅⊳─╯

╭─⊳⋅🗞️ 𝕹𝖊𝖜𝖘 ⋅⊲─╮
⨠ hirunews
⨠ itnnews
╰─⊲⋅════════⋅⊳─╯

╭─⊳⋅🛠️ 𝕾𝖞𝖘𝖙𝖊𝖒 ⋅⊲─╮
⚙ $restart
⚙ leave
⚙ block
⚙ unblock
╰─⊲⋅══════════⋅⊳─╯

╭─⊳⋅⚙️ 𝕾𝖊𝖙𝖙𝖎𝖓𝖌𝖘 ⋅⊲─╮
⚙ setprefix
⚙ mode
⚙ auto_typing
⚙ always_online
⚙ auto_reacording
⚙ status_view
⚙ status_react
⚙ read_message
⚙ anti_bad
⚙ auto_sticker
⚙ auto_reply
⚙ auto_voice
⚙ auto_react
⚙ custom_reacts
⚙ anti_link
⚙ status_reply
╰─⊲⋅═════════⋅⊳─╯


╭─⊳⋅👥 Group ⋅⊲─╮
✫ mute
✫ unmute
✫ promote
✫ demote
✫ kick
✫ add
✫ gcpp
✫ fullpp
✫ gclink
✫ tagall
✫ take
✫ kickall
✫ kickall2
✫ kickadmins
✫ groupinfo
✫ opentime
✫ closetime
✫ updategdesc
✫ updategname
✫ ginfo
✫ join
✫ lockgc
✫ unlockgc
✫ newgc
✫ out
✫ poll
✫ revoke
✫ hidetag
✫ unlockgc
╰─⊲⋅══════════⋅⊳─╯


╭─⊳⋅🌐 𝕾𝖕𝖊𝖈𝖎𝖆𝖑 ⋅⊲─╮
⎇ sinhala
╰─⊲⋅═════════⋅⊳─╯

╭─⊳⋅🎨 𝕬𝖓𝖎𝖒𝖊 𝕴𝖒𝖆𝖌𝖊𝖘 ⋅⊲─╮
⤷ garl
⤷ waifu
⤷ neko
⤷ megumin
⤷ maid
⤷ awoo
⤷ animegirl
⤷ animegirl1
⤷ animegirl2
⤷ animegirl3
⤷ animegirl4
⤷ animegirl5
⤷ anime
⤷ anime1
⤷ anime2
⤷ anime3
⤷ anime4
⤷ anime5
⤷ dog
╰─⊲⋅════════════⋅⊳─╯

╭─⊳⋅🔞 𝕹𝕾𝕱𝕎 ⋅⊲─╮
⤷ xnxx-dl
⤷ epsearch
⤷ epdownload
⤷ hentai
⤷ waifu
╰─⊲⋅══════════⋅⊳─╯

╭─⊳⋅👨💻 𝕯𝕰𝕽𝕾 ⋅⊲─╮
✏ gitclone
✏ ssweb
✏ qr
✏ topdf
✏ fetch
╰─⊲⋅════════════⋅⊳─╯

╭─⊳⋅😜 𝕱𝕌𝕹 ⋅⊲─╮
✘ quote
✘ jokes
✘ pickupline
✘ emojimix
✘ truth
✘ dare
╰─⊲⋅════════⋅⊳─╯

╭─⊳⋅📱 𝕾𝖙𝖆𝖑𝖐𝖘 ⋅⊲─╮
⟹ ttstalk
⟹ ghstalk
╰─⊲⋅═════════⋅⊳─╯
> ${config.DESCRIPTION}`;

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
