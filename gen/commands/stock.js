const { MessageEmbed, Message } = require('discord.js');
const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: 'stockpago',
    description: 'Veja meu estoque',

    execute(message) {
        const stock = [];
        
        fs.readdir(`${__dirname}/../stock/`, function (err, files) {
            if (err) return console.log('❌ | Não consegui encontrar o diretorio: ' + err);

            files.forEach(function (file) {    
                if (!file.endsWith('.txt')) return    
                stock.push(file)     
            });

            const embed = new MessageEmbed()
            .setTitle(`${config.subtitulo} | Meus Serviços (${stock.length})`)
            .setDescription('')
            .setThumbnail(config.thumbnail)
            .setColor(config.color)

            stock.forEach(async function (data) { 
                const acc = fs.readFileSync(`${__dirname}/../stock/${data}`, 'utf-8')    
				const lines = [];
                acc.split(/\r?\n/).forEach(function (line) {
                    lines.push(line);
                });
                embed.addField(`**📦 | ${data.replace('.txt','')}:**`, `\`\`\`${lines.length} Produto(s)\`\`\``, true)
            });
            message.channel.send(embed);
        });    
    }
};