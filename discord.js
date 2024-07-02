// index.js

const { Client } = require('discord.js-selfbot-v13');
require('dotenv').config();

const client = new Client();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // sendMessageToChannel("https://discord.com/channels/997123065467121786/1161742235755356190", "lol")
});

function parseDiscordLink(link) {
    const regex = /https:\/\/discord.com\/channels\/(\d+)\/(\d+)\/?(\d+)?/;
    const match = link.match(regex);

    if (match) {
        return {
            guildId: match[1],
            channelId: match[2],
            messageId: match[3] || null
        };
    } else {
        throw new Error('Invalid Discord link');
    }
}


async function post_to_discord(link, message) {
    try {
        const { guildId, channelId } = parseDiscordLink(link);
        const channel = await client.channels.fetch(channelId);

        if (channel) {
            const sentMessage = await channel.send(message);
            console.log(`Message sent to channel ${channelId} in server ${guildId}`);

            let messageLink = `https://discord.com/channels/${guildId}/${channelId}/${sentMessage.id}`;
            return messageLink

        } else {
            console.log('Channel not found');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}


client.login(process.env.DISCORD_TOKEN);

module.exports = {
    post_to_discord
}


