const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
const fs = require('fs');


module.exports = {
  info: {
    name: "24/7",
    description: "to keep the bot in the voice channel for 24/7",
    usage: "[24/7]",
    aliases: ["247"],
  },

  run: async function (client, message, args) {
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
    if (!afk[message.guild.id]) afk[message.guild.id] = {
      afk: false,
    };
    var serverQueue = afk[message.guild.id]
    if (serverQueue) {

      serverQueue.afk = !serverQueue.afk;
      message.channel.send({
        embed: {
          color: "GREEN",
          description: `💤  **  24/7 is **\`${serverQueue.afk === true ? "enabled" : "disabled"}\`**`
        }
      });
      return  fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {
        if (err) console.error(err);
      });
    };
    return sendError("There is nothing playing in this server.", message.channel);
  },
};