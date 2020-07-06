const Discord = require('discord.js');
module.exports = {
    name: 'help',
    aliases: ['도움', '도움말'],
    description: '봇의 도움말을 볼 수 있어요.',
    usage: '모든 명령어 보기: u!help\n명령어 상세 정보 보기: u!help <명령어 이름>',
    permission: '없음',
    run: async (client, message, args, ops) => {
        if (args[1]) {
            if (client.commands.get(args.slice(1).join(' '))) { 
                const embed = new Discord.MessageEmbed()
                    .setTitle(client.commands.get(args.slice(1).join(' ')).name)
                    .setColor('RANDOM')
                    .addField('얼리어스 목록', client.commands.get(args.slice(1).join(' ')).aliases.map(x => `\`${x}\``).join(', '))
                    .addField('설명', client.commands.get(args.slice(1).join(' ')).description)
                    .addField('사용 방법', client.commands.get(args.slice(1).join(' ')).usage)
                    .addField('필요한 권한', client.commands.get(args.slice(1).join(' ')).permission)
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