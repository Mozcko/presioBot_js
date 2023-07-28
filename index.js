const { ask } = require("./ai.js"); //import the "ask" function from the "ai.js" file
const { Client, GatewayIntentBits } = require("discord.js"); //v14.6.0
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const dotenv = require("dotenv");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

dotenv.config();

// reads the .env file and gets the token and the prefix
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

// create the client object to connect to the discord server
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// music constants

function ask_bot(prompt) {
  return ask(prompt); // Return the promise from the ask function
}

// messages when the bot connects to the server
client.on("ready", () => {
  console.log("On line");
});
client.on("reconnecting", () => {
  console.log("Reconnecting!");
});
client.on("disconnect", () => {
  console.log("Disconnect!");
});

async function connect(message) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
  );

  const permissions = voiceChannel.permissionsFor(message.client.user);
  
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

    /*const connection = joinVoiceChannel({
      ChannelID: voiceChannel.id,
      guildId: voiceChannel.guild.id,
	    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });*/

}


// reads the commands when a message is created
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  // ping message, to ensure that the program is working
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("Pong!");
  }

  if (message.content.startsWith(`${prefix}play`)) {
    //execute(message, queue);
    connect(message);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    //skip(message, queue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    //stop(message, queue);
    return;
  } else if (message.content.startsWith(`${prefix}ask`)) {
    // ask a question using chat gpt
    const prompt = message.content.substring(4); // Remove the exclamation mark from the message

    ask_bot(prompt) // Prompt GPT-3
      .then((answer) => {
        if (answer.trim().length > 0) {
          // Check if the answer is not empty
          message.channel.send(answer);
        } else {
          message.channel.send("The AI's response is empty.");
        }
      })
      .catch((error) => {
        console.error(error);
        message.channel.send("An error occurred while processing your request.");
      });
  } else {
    message.channel.send("You need to enter a valid command!");
  }
});

client.login(token);
