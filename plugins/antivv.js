const {
  cmd,
  commands
} = require("../command");
cmd({
  'pattern': 'vv',
  'alias': ['vo', "veiewonce"],
  'react': '✨',
  'desc': "read vv",
  'category': "download",
  'filename': __filename
}, async (_0x596f5d, _0x12dce5, _0x13dcca, {
  from: _0x3b2c6c,
  quoted: _0x20898b,
  body: _0xa19a3c,
  isCmd: _0x328a9a,
  command: _0x11d738,
  args: _0x4325ad,
  q: _0x35a40a,
  isGroup: _0x49212c,
  sender: _0x40a127,
  senderNumber: _0x324f6b,
  botNumber2: _0x1dd621,
  botNumber: _0x516789,
  pushname: _0x209c22,
  isMe: _0x127392,
  isOwner: _0x5ead44,
  groupMetadata: _0x215d2a,
  groupName: _0x17b2eb,
  participants: _0x3ef935,
  groupAdmins: _0x5ad39b,
  isBotAdmins: _0xff4c67,
  isAdmins: _0x38ea8e,
  reply: _0x597c0c
}) => {
  try {
    const _0x5f2807 = _0x12dce5.msg.contextInfo?.["quotedMessage"]?.['viewOnceMessageV2'];
    if (_0x5f2807) {
      if (_0x5f2807.message.imageMessage) {
        console.log("Quoting an image");
        let _0x20acc9 = _0x5f2807.message.imageMessage.caption;
        let _0x231c2e = await _0x596f5d.downloadAndSaveMediaMessage(_0x5f2807.message.imageMessage);
        return _0x596f5d.sendMessage(_0x12dce5.chat, {
          'image': {
            'url': _0x231c2e
          },
          'caption': _0x20acc9
        });
      }
      if (_0x5f2807.message.videoMessage) {
        let _0x4a787f = _0x5f2807.message.videoMessage.caption;
        let _0x3e85dc = await _0x596f5d.downloadAndSaveMediaMessage(_0x5f2807.message.videoMessage);
        return _0x596f5d.sendMessage(_0x12dce5.chat, {
          'video': {
            'url': _0x3e85dc
          },
          'caption': _0x4a787f
        });
      }
    }
  } catch (_0xf27711) {
    console.log("Error processing viewOnce message:", _0xf27711);
  }
  if (!_0x20898b) {
    return _0x597c0c("Please reply to a ViewOnce message");
  }
  if (_0x20898b.mtype === "viewOnceMessage") {
    console.log("Processing a ViewOnce message");
    if (_0x20898b.message.imageMessage) {
      let _0x508f06 = _0x20898b.message.imageMessage.caption;
      let _0x117701 = await _0x596f5d.downloadAndSaveMediaMessage(_0x20898b.message.imageMessage);
      return _0x596f5d.sendMessage(_0x12dce5.chat, {
        'image': {
          'url': _0x117701
        },
        'caption': _0x508f06
      });
    }
    if (_0x20898b.message.videoMessage) {
      let _0x233ce7 = _0x20898b.message.videoMessage.caption;
      let _0x1f2aef = await _0x596f5d.downloadAndSaveMediaMessage(_0x20898b.message.videoMessage);
      return _0x596f5d.sendMessage(_0x12dce5.chat, {
        'video': {
          'url': _0x1f2aef
        },
        'caption': _0x233ce7
      });
    }
  } else {
    return _0x597c0c("This is not a ViewOnce message");
  }
});
