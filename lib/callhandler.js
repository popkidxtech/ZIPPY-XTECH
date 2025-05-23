// lib/callhandler.js

/**
 * Handles incoming WhatsApp calls, rejects them, and sends a warning message.
 * @param {import('@whiskeysockets/baileys').WASocket} conn Baileys WhatsApp connection object.
 * @param {boolean} anticallEnabled Global flag to enable/disable anti-call.
 */
module.exports = (conn, anticallEnabled) => {
    conn.ev.on('call', async (callData) => {
        if (!anticallEnabled) return; // Check if anticall is enabled

        for (const call of callData) {
            if (call.status === 'offer') {
                const callerId = call.from;

                // Reject the call
                await conn.rejectCall(call.id, callerId); // Removed empty array, not needed for rejectCall

                // Send warning message to caller
                await conn.sendMessage(callerId, {
                    text: `🚫 *Auto Call Rejection!*\n\nPlease do not call this bot. Future calls may result in you being blocked.`,
                });

                // Log the event
                console.log(`[ANTICALL] Rejected call from: ${callerId}`);
            }
        }
    });

    console.log("[ANTICALL] Call handler loaded.");
};

