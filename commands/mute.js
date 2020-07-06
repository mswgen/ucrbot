const Discord = require('discord.js');
module.exports = {
    name: 'mute',
    aliases: ['뮤트'],
    description: '멤버를 뮤트해요.',
    usage: 'u!mute <유저 멘션> [이유]',
    permission: '서버 관리하기',
    run: async (client, message, args, ops) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`서버 관리하기 권한이 필요해요.`);
        if (!message.mentions.users.first()) return message.channel.send('뮤트할 멤버를 멘션해주세요.');
        const embed = new Discord.MessageEmbed()
            .setTitle('멤버를 뮤트할까요?')
            .setColor('RANDOM')
            .addField('뮤트할 멤버', message.mentions.users.first().toString())
            .addField('뮤트 이유', args.slice(2).join(' ') || '없음')
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
        collector.on('end', async collected => {
            m.reactions.removeAll();
            if (collected.first().emoji.name == '✅️') {
                if (!message.guild.roles.cache.find(x => x.name.includes(/mute/i) || x.name.includes('뮤트'))) {
                    await message.guild.roles.create({
                        data: {
                            name: '뮤트',
                            color: 0x000000,
                            permissions: 66560
                        }
                    });
                }
                message.guild.member(message.mentions.users.first()).roles.set([message.guild.roles.cache.find(x => x.name.includes(/mute/i) || x.name.includes('뮤트'))])
                embed.setTitle('멤버를 뮤트했어요')
                    .setColor("RANDOM");
                m.edit(embed);
                message.mentions.users.first().send(`${args.slice(2).join(' ')}의 이유로 ${message.guild.name}에서 뮤트되었어요.`)
            } else {
                embed.setTitle('멤버 뮤트가 취소되었어요.')
                    .setColor('RANDOM');
                m.edit(embed);
            }
        });
    }
}