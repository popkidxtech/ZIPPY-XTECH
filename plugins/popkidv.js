const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

cmd({
  pattern: "play",
  react: '⚡',
  desc: "Download audio from YouTube",
  category: "music",
  use: ".play <song name>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    if (!args.length) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("Please provide a song name. Example: .play Moye Moye");
    }

    // Add processing react
    await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

    // Search for the song on YouTube
    const query = args.join(" ");
    const searchResults = await yts(query);
    if (!searchResults.videos.length) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("❌ No results found.");
    }

    const videoUrl = searchResults.videos[0].url;

    // Fetch MP3 download link using the new API
    const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`;
    const response = await axios.get(apiUrl);

    if (!response.data.success || !response.data.result.download_url) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("❌ Failed to fetch the MP3 file.");
    }

    const mp3Url = response.data.result.download_url;

    // Send the MP3 as an audio file
    await conn.sendMessage(from, {
      audio: { url: mp3Url },
      mimetype: 'audio/mpeg',
      ptt: false
    });

    // Add success react
    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

  } catch (error) {
    console.error("Error:", error);

    // Add failure react
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });

    // Send error logs to WhatsApp
    const errorMessage = `
*❌ Play Command Error Logs*

*Error Message:* ${error.message}
*Stack Trace:* ${error.stack || "Not available"}
*Timestamp:* ${new Date().toISOString()}
`;

    await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
  }
});


cmd({
  pattern: "play2",
  react: '⚡',
  desc: "Download audio from YouTube",
  category: "music",
  use: ".play2 <song name>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    if (!args.length) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("Please provide a song name. Example: .play2 Dance Monkey");
    }

    // Add processing react
    await conn.sendMessage(from, { react: { text: '⚡', key: mek.key } });

    // Search for the song on YouTube
    const query = args.join(" ");
    const searchResults = await yts(query);
    if (!searchResults.videos.length) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("❌ No results found.");
    }

    const videoUrl = searchResults.videos[0].url;

    // Fetch MP3 download link using the new API
    const apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${videoUrl}`;
    const response = await axios.get(apiUrl);

    if (!response.data.success || !response.data.result.downloadUrl) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("❌ Failed to fetch the MP3 file.");
    }

    const mp3Url = response.data.result.downloadUrl;

    // Send the MP3 as an audio file
    await conn.sendMessage(from, {
      audio: { url: mp3Url },
      mimetype: 'audio/mpeg',
      ptt: false
    });

    // Add success react
    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

  } catch (error) {
    console.error("Error:", error);

    // Add failure react
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });

    // Send error logs to WhatsApp
    const errorMessage = `
*❌ Play2 Command Error Logs*

*Error Message:* ${error.message}
*Stack Trace:* ${error.stack || "Not available"}
*Timestamp:* ${new Date().toISOString()}
`;

    await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
  }
});

cmd({
  pattern: "video2",
  alias: ["song2"],
  react: '⚡',
  desc: "Download video from YouTube",
  category: "media",
  use: ".video2 <video name>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    if (!args.length) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("Please provide a video name. Example: .video2 Pakistani Farzi");
    }

    // Add processing react
    await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

    // Search for the video on YouTube
    const query = args.join(" ");
    const searchResults = await yts(query);
    if (!searchResults.videos.length) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("❌ No results found.");
    }

    const videoUrl = searchResults.videos[0].url;

    // Fetch video download link using the new API
    const apiUrl = `https://api.agungny.my.id/api/youtube-videov2?url=${videoUrl}`;
    const response = await axios.get(apiUrl);

    if (!response.data.status || !response.data.result.url) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("❌ Failed to fetch the video.");
    }

    const videoUrlDownload = response.data.result.url;

    // Send the video as a file
    await conn.sendMessage(from, {
      video: { url: videoUrlDownload },
      mimetype: 'video/mp4',
      caption: response.data.result.title,
      ptt: false
    });

    // Add success react
    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

  } catch (error) {
    console.error("Error:", error);

    // Add failure react
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });

    // Send error logs to WhatsApp
    const errorMessage = `
*❌ Video2 Command Error Logs*

*Error Message:* ${error.message}
*Stack Trace:* ${error.stack || "Not available"}
*Timestamp:* ${new Date().toISOString()}
`;

    await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
  }
});

cmd({
  pattern: "play4",
  react: '⚡',
  desc: "Download audio from YouTube",
  category: "music",
  use: ".play2 <song name>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    if (!args.length) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("Please provide a song name. Example: .play2 Moye Moye");
    }

    // Add processing react
    await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

    // Search for the song on YouTube
    const query = args.join(" ");
    const searchResults = await yts(query);
    if (!searchResults.videos.length) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("❌ No results found.");
    }

    const videoUrl = searchResults.videos[0].url;

    // Fetch MP3 download link using the new API
    const apiUrl = `https://api.agungny.my.id/api/youtube-audiov2?url=${videoUrl}`;
    const response = await axios.get(apiUrl);

    if (!response.data.status || !response.data.result.url) {
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
      return reply("❌ Failed to fetch the MP3 file.");
    }

    const mp3Url = response.data.result.url;

    // Send the MP3 as an audio file without caption
    await conn.sendMessage(from, {
      audio: { url: mp3Url },
      mimetype: 'audio/mpeg',
      ptt: false
    });

    // Add success react
    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

  } catch (error) {
    console.error("Error:", error);

    // Add failure react
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });

    // Send error logs to WhatsApp
    const errorMessage = `
*❌ Play2 Command Error Logs*

*Error Message:* ${error.message}
*Stack Trace:* ${error.stack || "Not available"}
*Timestamp:* ${new Date().toISOString()}
`;

    await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
  }
});


cmd({  
  pattern: "song",  
  alias: ["video"],  
  react: '⚡',  
  desc: "Download video from YouTube",  
  category: "music",  
  use: ".play <song name>",  
  filename: __filename  
}, async (conn, mek, msg, { from, args, reply }) => {  
  try {  
    if (!args.length) {  
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });  
      return reply("Please provide a song name. Example: .play Pakistani Farzi");  
    }  

    // Add processing react  
    await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });  

    // Search for the song on YouTube  
    const query = args.join(" ");  
    const searchResults = await yts(query);  
    if (!searchResults.videos.length) {  
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });  
      return reply("❌ No results found.");  
    }  

    const videoUrl = searchResults.videos[0].url;  

    // Fetch video download link using the new API  
    const apiUrl = `https://api.agungny.my.id/api/youtube-video?url=${videoUrl}`;  
    const response = await axios.get(apiUrl);  

    if (!response.data.status || !response.data.result.download) {  
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });  
      return reply("❌ Failed to fetch the video file.");  
    }  

    const videoUrlDownload = response.data.result.download;  
    const title = response.data.result.title;  

    // Send the video as a file  
    await conn.sendMessage(from, {  
      video: { url: videoUrlDownload },  
      mimetype: 'video/mp4',  
      caption: `🎬 *${title}*`  
    });  

    // Add success react  
    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });  

  } catch (error) {  
    console.error("Error:", error);  

    // Add failure react  
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });  

    // Send error logs to WhatsApp  
    const errorMessage = `  
*❌ Play Command Error Logs*  
  
*Error Message:* ${error.message}  
*Stack Trace:* ${error.stack || "Not available"}  
*Timestamp:* ${new Date().toISOString()}  
`;  

    await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });  
  }  
});

cmd({  
  pattern: "play3",  
  react: '⚡',  
  desc: "Download audio from YouTube",  
  category: "music",  
  use: ".play <song name>",  
  filename: __filename  
}, async (conn, mek, msg, { from, args, reply }) => {  
  try {  
    if (!args.length) {  
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });  
      return reply("Please provide a song name. Example: .play Moye Moye");  
    }  

    // Add processing react  
    await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });  

    // Search for the song on YouTube  
    const query = args.join(" ");  
    const searchResults = await yts(query);  
    if (!searchResults.videos.length) {  
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });  
      return reply("❌ No results found.");  
    }  

    const videoUrl = searchResults.videos[0].url;  

    // Fetch MP3 download link using the new API  
    const apiUrl = `https://api.agungny.my.id/api/youtube-audio?url=${videoUrl}`;  
    const response = await axios.get(apiUrl);  

    if (!response.data.status || !response.data.result.download) {  
      await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });  
      return reply("❌ Failed to fetch the MP3 file.");  
    }  

    const mp3Url = response.data.result.download;  

    // Send the MP3 as an audio file without caption  
    await conn.sendMessage(from, {  
      audio: { url: mp3Url },  
      mimetype: 'audio/mpeg',  
      ptt: false  
    });  

    // Add success react  
    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });  

  } catch (error) {  
    console.error("Error:", error);  

    // Add failure react  
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });  

    // Send error logs to WhatsApp  
    const errorMessage = `  
*❌ Play Command Error Logs*  
  
*Error Message:* ${error.message}  
*Stack Trace:* ${error.stack || "Not available"}  
*Timestamp:* ${new Date().toISOString()}  
`;  

    await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });  
  }  
});
