const Discord = require('discord.js');
module.exports = async member => {
    if (member.guild.channels.cache.find(x => x.name.includes('검문소'))) {
        let m = await member.guild.channels.cache.find(x => x.name.includes('검문소')).send(`${member.user}님 ${member.guild.name}에 오신 걸 환영합니다!\n먼저 이 채널에 어떻게 오게 되었는지 입력하면 곧 관리자가 모든 채널을 볼 수 있게 해줄 거에요.`);
        const filter = m => m.authoe.id == member.user.id;
        const collector = m.channel.createMessageCollector(filter, {
            max: 1
        });
        collector.on('end', collected => {
            collected.first().delete();
            m.author.send('감사합니다! 곧 관리자가 확인하고 역할을 줄 거에요.');
            let check = member.guild.members.cache.get('607377024184483852'.user.send(`${collected.first().author.tag}님의 검문소 확인 요청.\n입력한 내용: ${collected.first().content}`));
            await m.react('✅️');
            await m.react('❌️');
            const filter2 = (r, u) => (r.emoji.name == '✅️' || r.emoji.name == '❌️') && u.id == '607377024184483852';
            const rcollector = check.createReactionCollector(filter2, {
                max: 1
            });
            rcollector.on('end', collected => {
                m.reactions.removeAll();
                if (collected.first().emoji.name == '✅️') {
                    member.roles.add(member.guild.roles.cache.find(x => x.name.includes('멤버')));
                    check.edit('완료.');
                    member.user.send(`검문소 인증이 완료되었어요. 기다려주셔서 감사해요!`);
                } else {
                    check.edit('인증 거부.');
                    member.user.send(`검문소 인증이 거부되었어요.`);
                }
            });
        });
    }
}