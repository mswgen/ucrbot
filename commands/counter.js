const Discord = require('discord.js');
module.exports = {
    name: 'counter',
    aliases: ['카운터'],
    run: async (client, message, args, ops) => {
        if (message.guild.channels.cache.find(x => x.type == 'category' && x.name == `${message.guild.name}의 유저 수`)) {
            message.guild.channels.cache.find(x => x.type == 'category' && x.name == `${message.guild.name}의 유저 수`).children.forEach(x => x.delete());
            message.guild.channels.cache.find(x => x.type == 'category' && x.name == `${message.guild.name}의 유저 수`).delete();
        }
        message.guild.channels.create(`${message.guild.name}의 유저 수`, {
            type: 'category',
            position: 0
        }).then(ch => {
            message.guild.channels.create(`모든 유저 수: ${message.guild.memberCount}`, {
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: 'VIEW_CHANNEL',
                        deny: 'CONNECT'
                    },
                    {
                        id: client.user.id,
                        allow: [
                            'VIEW_CHANNEL',
                            'CONNECT',
                            'MANAGE_CHANNELS',
                            'MANAGE_ROLES'
                        ]
                    }
                ],
                parent: ch
            });
            message.guild.channels.create(`유저 수: ${message.guild.members.cache.filter(x => !x.user.bot).size}`, {
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: 'VIEW_CHANNEL',
                        deny: 'CONNECT'
                    },
                    {
                        id: client.user.id,
                        allow: [
                            'VIEW_CHANNEL',
                            'CONNECT',
                            'MANAGE_CHANNELS',
                            'MANAGE_ROLES'
                        ]
                    }
                ],
                parent: ch
            });
            message.guild.channels.create(`봇 수: ${message.guild.members.cache.filter(x => x.user.bot).size}`, {
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: 'VIEW_CHANNEL',
                        deny: 'CONNECT'
                    },
                    {
                        id: client.user.id,
                        allow: [
                            'VIEW_CHANNEL',
                            'CONNECT',
                            'MANAGE_CHANNELS',
                            'MANAGE_ROLES'
                        ]
                    }
                ],
                parent: ch
            });
        });
        message.reply('완료!');
    }
}