const config = require('../config')
const { cmd, commands } = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "ai",
    desc: "ai chat",
    category: "main",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, {
    from,
    quoted,
    body,
    isCmd,
    command,
    args,
    q,
    isGroup,
    sender,
    senderNumber,
    botNumber2,
    botNumber,
    pushname,
    isMe,
    isOwner,
    groupMetadata,
    groupName,
    participants,
    groupAdmins,
    isBotAdmins,
    isAdmins,
    reply
}) => {
    try {
        // Use args to get the query text
        let query = args.join(" ");
        
        // Check if query text was provided
        if (!query || query.trim() === "") {
            return reply("Please provide some text for the AI to process.");
        }

        // Fetch response from the new API endpoint
        let res = await fetchJson(`https://api.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(query)}`);
        
        // Use the 'result' field from the response
        if (res && res.result) {
            return reply(res.result);
        } else {
            return reply("The API did not return a valid response.");
        }
    } catch (e) {
        console.error(e);
        return reply(`Error: ${e.message || e}`);
    }
});
