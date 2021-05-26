const Discord = require("discord.js");

const config = require("./config.json");

const bot = new Discord.Client();
const express = require("express");

const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online


//inicio de tudo
bot.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'channel') return;
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  if (message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`)) return;

  const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`)//puxando a pasta comands + o comando
    commandFile.run(bot, message, args);
  } catch (err) {
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`${message.author}, O comando informado nao existe ou ainda nao foi adcionado, se isso for um erro chame por <@434791887241740288> \nUtilize **.help** para saber meus comandos.`)
    return message.channel.send(embed);
  }
});

//status
bot.on("ready", () => {
    let ferinha = [
        `Atualmente em ${bot.guilds.cache.size} servidores`,
        `Peça ajuda com: ${config.prefix}help`,
        `Gerenciando ${bot.users.cache.size} pessoas`
      ],
      fera = 0;
    setInterval( () => bot.user.setActivity(`${ferinha[fera++ % ferinha.length]}`, {
          type:"STREAMING" //mais tipos: WATCHING / LISTENING
        }), 1000 * 10); 
    bot.user
        .setStatus("online")
        .catch(console.error);
  console.log("Estou pronto(a) para ser utilizada!")
  });

bot.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type == 'ferinha')
    return
    if(message.content == `<@${bot.user.id}>` || message.content == `<@!${bot.user.id}>`) {
    return message.channel.send(`<:emoji_22:846180754839961641>| Olá ${message.author}, veja meus comandos com **${config.prefix}help**!`)
    }
    }); 
    
bot.login(process.env.TOKEN);

// Entrada e saida

bot.on("guildMemberAdd", (member) => {

  let chx = db.get(`welcomec_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }

  let entrada = new Discord.MessageEmbed()
  .setAuthor(member.user.tag, member.user.displayAvatarURL())
  .setColor("#000001")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`Olá **${member.user.username}** Seja muito bem vindo a esse servidor lindo e maravilhoso, \n\n Atualmente estamos com **${member.guild.memberCount} membros no servidor!**`);
  
  bot.channels.cache.get(chx).send(entrada)
});

bot.on("guildMemberRemove", (member) => {

  let chx = db.get(`goodbyec_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }

  let saida = new Discord.MessageEmbed()
  .setAuthor(member.user.tag, member.user.displayAvatarURL())
  .setTitle(`Alguem saiu do servidor :c`)
  .setColor("#000001")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`**${member.user.username}** Saiu do servidor, espero que algum dia ele volte :c`);
  
  bot.channels.cache.get(chx).send(saida)
});
