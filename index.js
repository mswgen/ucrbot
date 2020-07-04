const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const fs = require('fs');
const ascii = require('ascii-table');
const ops = require('./config.json');
const table = new ascii().setHeading('Command', 'Load Status');
dotenv.config();
fs.readdir('./commands/', (err, list) => {
    for (let file of list) {
        try {
            let pull = require(`./commands/${file}`);
            if (pull.name && pull.run) {
                client.commands.set(pull.name, pull);
                for (let alias of pull.aliases) {
                    client.aliases.set(alias, pull.name)
                }
                table.addRow(file, '✅️');
            } else {
                table.addRow(file, '❌️ -> Error');
            }
        } catch (e) {
            table.addRow(file, `❌️ -> ${e}`);
        }
    }
    console.log(table.toString());
});
client.on('ready', () => {
    console.log(`Login ${client.user.username}\n------------------`);
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type != 'text') return;
    if (!message.content.startsWith(ops.prefix)) return;
    message.channel.startTyping(1);
    let args = message.content.slice(ops.prefix.length).trim().split(' ');
    let cmd = args[0].toLowerCase();
    if (client.commands.get(cmd)) {
        client.commands.get(cmd).run(client, message, args, ops);
    } else if (client.aliases.get(cmd)) {
        client.commands.get(client.cliases.get(cmd)).run(client, message, args, ops);
    }
    message.channel.stopTyping(true);
});
client.on('guildMemberAdd', member => {
    if (client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('모든 유저 수'))) {
        client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('모든 유저 수')).setName(`모든 유저 수: ${message.guild.memberCount}`);
    }
    if (client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('유저 수'))) {
        client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('유저 수')).setName(`유저 수: ${message.guild.members.cache.filter(x => !x.user.bot).size}`);
    }
    if (client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('봇 수'))) {
        client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('봇 수')).setName(`봇 수: ${message.guild.members.cache.filter(x => x.user.bot).size}`);
    }
    require('./check.js')(member);
});
client.on('guildMemberRemove', () => {
    if (client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('모든 유저 수'))) {
        client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('모든 유저 수')).setName(`모든 유저 수: ${message.guild.memberCount}`);
    }
    if (client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('유저 수'))) {
        client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('유저 수')).setName(`유저 수: ${message.guild.members.cache.filter(x => !x.user.bot).size}`);
    }
    if (client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('봇 수'))) {
        client.channels.cache.find(x => x.type == 'voice' && x.name.startsWith('봇 수')).setName(`봇 수: ${message.guild.members.cache.filter(x => x.user.bot).size}`);
    }
});
client.login(process.env.TOKEN);