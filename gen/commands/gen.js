const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json');
const generated = new Set();
module.exports = {
	name: 'gen',
	description: 'Comando do gerador',
    
	execute(message) {
        if(message.channel.id !== config.canal){
              message.channel.send(
                    new Discord.MessageEmbed()
                .setTitle(`${config.subtitulo} | Canal sem Permissão`)
                .setDescription(`Esse canal não tem acesso ao gerador, se redirecione para o canal <#${config.canal}> e use o comando lá.`)
                .setColor(config.color))
        }
        
       else{
            if (generated.has(message.author.id)) {
                message.channel.send(
                    new Discord.MessageEmbed()
                .setTitle(`${config.subtitulo} | Você está em cooldown`)
                .setDescription(`Aguarde um pouco antes de executar esse comando novamente.`)
                .setColor(config.color)
                );

                return;
            } else {
                const messageArray = message.content.split(' ');
                const args = messageArray.slice(1);
                if (!args[0]) {
                    message.channel.send(
                        new Discord.MessageEmbed()
                .setTitle(`${config.subtitulo} | Serviço não selecionado`)
                .setDescription(`É Necessario que você selecione no minimo um produto do meu estoque.`)
                .setColor(config.color)
                    );
                    return;
                };

                const filePath = `${__dirname}/../stock/${args[0]}.txt`;
                fs.readFile(filePath, function (error, data) {
                    if (!error) {
                        data = data.toString();
                        const position = data.toString().indexOf('\n');
                        const firstLine = data.split('\n')[0];
                        if (position === -1) {
                            message.channel.send(
                                new Discord.MessageEmbed()
                .setTitle(`${config.subtitulo} | Sem estoque`)
                .setDescription(`O Serviço selecionado está atualmente sem estoque, tente novamente mais tarde.`)
                .setColor(config.color)
                            );
                            return;
                        };

                        message.author.send(
                            new Discord.MessageEmbed()
                            .setColor(config.color.green)
                            .setTitle(`${config.subtitulo} | Conta gerada com êxito`)
                            .setDescription(`
\`\`\`\
${firstLine}
\`\`\`\

**💼 | Serviço selecionado:** ${args[0]}
**🎄 | Expirou:** Não definido
**🧐 | Autor:** ${message.author}`)
                            .setColor(config.color)
                            .setImage(config.banner)
                            .setFooter(`Caso você seja mobile, basta pressionar em cima do login`))
                        
                            if (position !== -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (error) {
                            message.channel.send(
                                
                            new Discord.MessageEmbed()
                            .setColor(config.color)
                            .setTitle(`${config.subtitulo} | Conta gerada com êxito`)
                            .setDescription(`Pronto, o serviço \`${args[0]}\` que você selecionou, já foi gerado e já está em seu privado, caso a conta não funcione não reclame, algumas delas são uncheckeds ou antigas.`)
                                );

                                generated.add(message.author.id);
                                setTimeout(() => {
                                    generated.delete(message.author.id);
                                }, config.cooldown);

                                if (error) {
                                    console.log(error);
                                };
                            });

                        } else {
                            message.channel.send(
                                new Discord.MessageEmbed()
                .setTitle(`${config.subtitulo} | Sem estoque`)
                .setDescription(`O Serviço selecionado está atualmente sem estoque, tente novamente mais tarde.`)
                .setColor(config.color)
                            );
                            return;
                        };
                    } else {

                        message.channel.send(
                            new Discord.MessageEmbed()
                .setTitle(`${config.subtitulo} | Serviço não encontrado`)
                .setDescription(`Não existe nenhum serviço chamado  \`${args[0]}\` no meu estoque.`)
                .setColor(config.color)
                        );
                        return;
  };
 });
};
                   }
},
};