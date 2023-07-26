import { ask } from "./ai.js";
import { Client, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv';

dotenv.config();

function ask_bot(prompt) {
    return ask(prompt); // Return the promise from the ask function
  }

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
    ]
});

// messages when the bot connects to the server
client.on("ready", () =>{
    console.log("On line");
});

// reads the commands when a message is created
client.on('messageCreate', message => {

    // ping message, to ensure that the program is working
    if (message.content.startsWith(prefix + "ping")) {
      message.channel.send('Pong!');
    }

    // ask a question using chat gpt
    if (message.content.startsWith(prefix + "ask")) {
        const prompt = message.content.substring(4); // Remove the exclamation mark from the message

        ask_bot(prompt) // Prompt GPT-3
          .then((answer) => {
            if (answer.trim().length > 0) { // Check if the answer is not empty
                client.channels.fetch(message.channelId).then(channel => channel.send(answer));
            } else {
                client.channels.fetch(message.channelId).then(channel => channel.send("The AI's response is empty."));
            }
          })
          .catch((error) => {
            console.error(error);
            client.channels.fetch(message.channelId).then(channel => channel.send("An error occurred while processing your request."));
          });
    }
});

client.login(token);