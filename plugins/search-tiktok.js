

function hi() {
  console.log("Hello World!");
}
hi();
const fetch = require("node-fetch");
const {
  cmd
} = require("../command");
cmd({
  'pattern': "tiktoksearch",
  'alias': ["tiktoks", 'tiks'],
  'desc': "Search for TikTok videos using a query.",
  'react': '✅',
  'category': "tools",
  'filename': __filename
}, async (_0x5d41f4, _0x1978a1, _0x1de991, {
  from: _0x57c353,
  args: _0x2aa5e5,
  reply: _0x3ef93b
}) => {
  if (!_0x2aa5e5[0x0]) {
    return _0x3ef93b("🌸 What do you want to search on TikTok?\n\n*Usage Example:*\n.tiktoksearch <query>");
  }
  const _0x59b32e = _0x2aa5e5.join(" ");
  await _0x1de991.react('⌛');
  try {
    _0x3ef93b("🔎 Searching TikTok for: " + _0x59b32e);
    const _0x2f8a3e = await fetch("https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=" + encodeURIComponent(_0x59b32e));
    const _0x405b6c = await _0x2f8a3e.json();
    if (!_0x405b6c || !_0x405b6c.data || _0x405b6c.data.length === 0x0) {
      await _0x1de991.react('❌');
      return _0x3ef93b("❌ No results found for your query. Please try with a different keyword.");
    }
    const _0x5cb45f = _0x405b6c.data.slice(0x0, 0x7);
    _0x5cb45f.sort(() => Math.random() - 0.5);
    for (const _0x30ddb6 of _0x5cb45f) {
      const _0x4869f9 = "🌸 *Popkid TikTok Video Result*:\n\n*• Title*: " + _0x30ddb6.title + "\n\n*• Author*: " + (_0x30ddb6.author || 'Unknown') + "\n\n*• Duration*: " + (_0x30ddb6.duration || 'Unknown') + "\n\n*• URL*: " + _0x30ddb6.link + "\n\n";
      if (_0x30ddb6.nowm) {
        await _0x5d41f4.sendMessage(_0x57c353, {
          'video': {
            'url': _0x30ddb6.nowm
          },
          'caption': _0x4869f9
        }, {
          'quoted': _0x1de991
        });
      } else {
        _0x3ef93b("❌ Failed to retrieve video for \"" + _0x30ddb6.title + "\".");
      }
    }
    await _0x1de991.react('✅');
  } catch (_0x58e748) {
    console.error("Error in TikTokSearch command:", _0x58e748);
    await _0x1de991.react('❌');
    _0x3ef93b("❌ An error occurred while searching TikTok. Please try again later.");
  }
});
