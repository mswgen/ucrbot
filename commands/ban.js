const Discord = require('discord.js');
module.exports = {
    name: 'ban',
    aliases: ['차단', '밴'],
    run: async (client, message, args, ops) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`멤버 차단하기 권한이 필요해요.`);
        if (!message.mentions.users.first()) return message.channel.send('차단할 멤버를 멘션해주세요.');
        const embed = new Discord.MessageEmbed()
            .setTitle('멤버를 차단할까요?')
            .setColor('RANDOM')
            .addField('차단할 멤버', message.mentions.users.first().toString())
            .addField('차단 이유', args.slice(2).join(' ') || '없음')
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
                message.guild.member(message.mentions.users.first()).ban({
                    reason: args.slice(2).join(' ') || undefined
                }).then(() => {
                    embed.setTitle('멤버를 차단했어요')
                        .setColor("RANDOM");
                    m.edit(embed);
                });
            } else {
                embed.setTitle('멤버 차단이 취소되었어요.')
                    .setColor('RANDOM');
                m.edit(embed);
            }
        });
    }
}