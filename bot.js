
// reads the token.txt file and gets the token
const token = "";

const fs = require('fs')
fs.readFile('token.txt', (err, data) => {
   if (err) throw err;
      token = data.toString();
})

// create the client object to connect to the discord server
const {Client, Intents} = require("discord.js");
const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES 
    ]
});


// messages when the bot connects to the server
client.on("ready", () =>{
    console.log("On line");
});
client.login(token);