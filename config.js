// config.js

// This file holds your bot's configuration settings.
// Make sure to fill in all the required details.

module.exports = {
    // Command Prefix: The character(s) your bot will use to recognize commands.
    // For example, if PREFIX is '.', a command would be '.help'.
    PREFIX: '.',

    // Bot Mode: Controls where your bot responds to messages.
    // 'public': Responds in both private chats and groups. (Recommended for your goal)
    // 'groups': Responds only in groups (for non-owner messages).
    // 'inbox': Responds only in private chats (for non-owner messages).
    // 'private': Responds only to the owner's messages (in any chat).
    MODE: 'public', // Set this to 'public' to enable responses in all groups

    // Auto Status Seen: Set to 'true' to automatically view all status updates.
    AUTO_STATUS_SEEN: 'true',

    // Auto Status React: Set to 'true' to automatically react to status updates.
    AUTO_STATUS_REACT: 'true',

    // Auto Status Reply: Set to 'true' to automatically reply to status updates.
    AUTO_STATUS_REPLY: 'false', // Be careful with this, it can be spammy.

    // Custom Status Message: The message to send when AUTO_STATUS_REPLY is 'true'.
    AUTO_STATUS_MSG: 'Hey there! Your status is awesome!',

    // Auto React to all messages: Set to 'true' to make the bot react to every message it sees.
    AUTO_REACT: 'false', // This can make your bot very chatty!

    // Custom React Emojis: If AUTO_REACT is 'true' or CUSTOM_REACT is 'true',
    // use these emojis (comma-separated) for reactions.
    CUSTOM_REACT_EMOJIS: '🥲,😂,👍🏻,🙂,😔', // Example: '❤️,🔥,💯'

    // Custom React based on settings: Set to 'true' to use CUSTOM_REACT_EMOJIS for reactions.
    CUSTOM_REACT: 'false', // If you want custom emojis but not on ALL messages, manage this in your command logic.

    // Read Message: Set to 'true' to automatically mark messages as read.
    READ_MESSAGE: 'true',

    // Session ID: Your WhatsApp session data.
    // This is crucial for the bot to connect.
    SESSION_ID: 'POPKID;;;YOUR_MEGA_FILE_ID_HERE', // !! IMPORTANT: Replace with your actual Mega file ID !!

    // Anti-Call Feature: Set to 'true' to automatically reject incoming calls.
    ANTICALL: 'true', // Recommended to prevent your bot from being spammed by calls.

    // Developer Number: A number for special dev commands.
    // This should be your own WhatsApp number in international format (e.g., 2547XXXXXXXX).
    DEV: '2547XXXXXXXX', // !! IMPORTANT: Replace with your actual developer number !!

    // Owner Name: The name displayed as the bot's owner.
    OwnerName: 'POPKID',

    // Bot Name: The name of your bot.
    BotName: 'POPKID-XTECH',

    // Global E-mail: An email address (optional, for vcard).
    email: 'popkiddevs@gmail.com',

    // GitHub Username: Your GitHub username (optional, for vcard).
    github: 'Popkiddevs',

    // Location: Your location (optional, for vcard).
    location: 'Kenya, Africa',

    // Message for 'About' or 'Info' command.
    WELCOME_MESSAGE: 'Hello there! Welcome to the group! I\'m Popkid Xtech, your helpful assistant. Use .help to see my commands.',

    // Farewell message for 'Bye' command.
    GOODBYE_MESSAGE: 'Goodbye! We\'ll miss you!',

    // Database path (leave as is unless you have a specific need to change it).
    DATABASE_PATH: './data/database.json',
};
