const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    aliases: ['핑', 'latency', '지연시간', '레이턴시'],
    run: async (client, message, args, ops) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('Pinging...')
            .setTimestamp()
            .setColor('RANDOM')
        let m = await message.channel.send(embed);
        embed.setTitle('PONG!')
            .setColor('RANDOM')
            .addField('Latency', `${m.createdAt - message.createdAt}ms`)
            .addField('API Latency', `${client.ws.ping}ms`)
        m.edit(embed);
    }
}