const Discord = require('discord.js');
module.exports = {
    name: 'help',
    aliases: ['도움', '도움말'],
    run: async (client, message, args, ops) => {
        if (args[1]) {
            if (client.commands.get(args.slice(1).join(' '))) { 
                const embed = new Discord.MessageEmbed()
                    .setTitle(client.commands.get(args.slice(1).join(' ')).name)
                    .setColor('RANDOM')
                    .addField('Aliases', client.commands.get(args.slice(1).join(' ')).aliases.map(x => `\`${x}\``).join(', '))
                    .addField('Description', client.commands.get(args.slice(1).join(' ')).description)
                    .addField('Usage', client.commands.get(args.slice(1).join(' ')).usage)
                    .setFooter(message.author.tag, message.author.avatarURL())
                    .setTimestamp();
                message.channel.send(embed);
            } else {
                message.channel.send(`해당 명령어가 없어요, \`${ops.prefix}help\`를 입력해 모든 명령어를 확인할 수 있어요.`);
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${client.user.username} 도움말`)
                .setDescription(`이 봇의 프리픽스는 ${ops.prefix}에요.\n\`${ops.prefix}help <명령어 이름>\`을 입력해 상세한 명령어 도움말을 볼 수 있어요.\n\n명령어 목록\n\n${client.commands.cache.map(x => `\`${x}\``)}`)
                .setColor('RANDOM')
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(message.author.tag, message.author.avatarURL())
                .setTimestamp()
            message.channel.send(embed);
        }
    }
}