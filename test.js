const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client();
require('dotenv').config();

const inviteLink = 'https://discord.com/invite/rbvuNgmrne';

// Event when the bot is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Join the server using the invite link
  client.fetchInvite(inviteLink)
    .then(invite => {
      client.acceptInvite(invite)
        .then(() => {
          console.log('Successfully joined the server!');
        })
        .catch(console.error);
    })
    .catch(console.error);
});

// Log in to Discord with your app's token
client.login(process.env.DISCORD_TOKEN);
