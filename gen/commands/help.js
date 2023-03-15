const { MessageEmbed, Message } = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'help', 
	description: 'Mostra lista de Comandos.',
    
	execute(message) {
		const { commands } = message.client;
        
        message.channel.send(
            new MessageEmbed()
            .setTitle(`${config.subtitulo} | Meus Comandos`)
            .setDescription(`
**📌 | h!help** - veja meus comandos
**📌 | h!stockPago** - veja meus serviços
**📌 | h!invite** - veja como me comprar
**📌 | h!gen** - gere algum serviço
**📌 | h!check** - cheque algum serviço`)
            .setThumbnail(config.thumbnail)
            .setColor(config.color)
        );
	}
};