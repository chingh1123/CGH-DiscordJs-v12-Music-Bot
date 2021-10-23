const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "nowplaying",
    description: "To show the music which is currently playing in this server",
    usage: "",
    aliases: ["np"],
  },

  run: async function(client, message, args) {

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) return sendError("There is nothing playing in this server.", message.channel);

    let song = serverQueue.songs[0]

    let thing = new MessageEmbed()
      .setAuthor("Now Playing", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
      .setThumbnail(song.img)
      .setColor("RANDOM")
      .addField("**__Name:__**", `\`\`\`fix\n ${song.title}\n\`\`\``, true)
      .addField("**__Duration:__**", `\`\`\`fix\n ${song.duration}\n\`\`\``, true)
      .addField("**__Requested by:__**", `\`\`\`fix\n ${song.req.tag}\n\`\`\``)
      .addField("**__Video URL:__**", song.url)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  },
}