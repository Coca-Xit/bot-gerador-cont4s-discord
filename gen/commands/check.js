const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json');

module.exports = {
	name: 'check',
	description: 'Cheque algum serviço',

	execute(message, args) {
        if (!args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(`${config.subtitulo} | Erro encontrado`)
                .setDescription(`É Necessário que você selecione no mínimo um serviço.`)
                .setColor(config.color)
            );
        };

        const filePath = `${__dirname}/../stock/${args[0]}.txt`;
        const lines = [];
        var fileContents;

        try {
            fileContents = fs.readFileSync(filePath, 'utf-8');
        } catch (error) {
            if (error) {
                return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(`${config.subtitulo} | Erro Encontrado`)
                .setDescription(`Não encontrei o serviço \`${args[0]}\`, ou não tenho ele no stock.`)
                .setColor(config.color)
                );
            };
        };

        fileContents.split(/\r?\n/).forEach(function (line) {
            lines.push(line);
        });

        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(`${config.subtitulo} | Serviço checado com sucesso`)
                .setDescription(`O Serviço  \`${args[0]}\` que você selecionou, tem atualmente **\`${lines.length}\`** Contas.`)
                .setColor(config.color)
        );
    }
};