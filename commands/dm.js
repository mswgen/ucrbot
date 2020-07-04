const Discord = require('discord.js');
module.exports = {
    name: 'dm',
    aliases: ['전체디엠', '디엠'],
    run: async (client, message, args, ops) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`서버 관리하기 권한이 필요해요.`);
        if (!args[1]) return message.channel.send('보낼 내용을 입력해주세요.');
        const embed = new Discord.MessageEmbed()
            .setTitle('모든 멤버에게 DM을 보낼까요?')
            .setColor('RANDOM')
            .addField('보낼 내용', args.slice(1).join(' '))
            .setFooter(message.author.tag, message.author.avatarURL())
            .setTimestamp()
            .setThumbnail(message.guild.iconURL());
        let m = await message.channel.send(embed);
        await m.react('✅️');
        await m.react('❌️');
        const filter = (r, u) => (r.emoji.name == '✅️' || r.emoji.name == '❌️') && u.id == message.author.id;
        const collector = m.createReactionCollector(filter, {
            max: 1
        });
        collector.on('end', collected => {
            m.reactions.removeAll();
            if (collected.first().emoji.name == '✅️') {
                message.guild.members.cache.filter(x => !x.user.bot).forEach(x => x.user.send(args.slice(1).join(' ')));
                embed.setTitle('모든 멤버에게 DM을 보냈어요')
                    .setColor("RANDOM");
                m.edit(embed);
            } else {
                embed.setTitle('전체 DM 전송이 취소되었어요')
                    .setColor('RANDOM');
                m.edit(embed);
            }
        });
    }
}