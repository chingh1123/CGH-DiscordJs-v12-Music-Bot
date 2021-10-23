const discord = require('discord.js');
module.exports = {
    info: {
        name: "ping",
        description: "To see the bot latency",
        usage: "[ping]",
        aliases: ["pg"],
    },

    run: async function (client, message, args) {
        let embed = new discord.MessageEmbed()
        .setDescription(`Pong - ${client.ws.ping}ms`)
        .setColor("BLUE")
        .setFooter(`Requested by ${message.author.username}`)

        message.channel.send(embed)
    },
}