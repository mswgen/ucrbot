const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'reload',
    aliases: ['reload', '리로드', 'ㄱ디ㅐㅁㅇ', 'ㄹㄹㄷ', 'ffe', 'flfhem'],
    description: '봇의 모든 커멘드 파일을 리로드해요.',
    usage: 'u!reload',
    permission: '봇 개발자',
    run: async (client, message, _args, ops) => {
        if (!ops.ownerId.includes(message.author.id)) return;
        const embed = new Discord.MessageEmbed()
            .setTitle(`리로드 중`)
            .setThumbnail(client.user.displayAvatarURL({
                dynamic: true,
                format: 'jpg',
                size: 2048
            }))
            .addField('커멘드 파일 로드 상태', `리로드 중`)
            .setColor(0xffff00)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let m = await message.channel.send(embed);
        fs.readdir('./commands/', async (_err, list) => {
            client.commands.clear();
            client.alises.clear();
            var i = 0;
            for (let x of list) {
                i++;
                delete require.cache[require.resolve(`${__dirname}/${x}`)];
                let pull = require(`./${x}`);
                if (pull.name) {
                    for (let alises of pull.alises) {
                        client.alises.set(alises, pull.name);
                    }
                    client.commands.set(pull.name, pull);
                }
            }
                embed.spliceFields(0, 1)
                    .addField('커멘드 파일 로드 상태', `리로드 완료(${list.length}개)`)
                    .setTitle('리로드가 완료되었어요.')
                    .setColor(0x00ffff)
                await m.edit(embed);
        });
    }
}