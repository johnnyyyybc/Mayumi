const Discord = require("discord.js");

module.exports = {
  name: "say",
  //o bot fala sua msg!

  run: async(client, message, args) => {
    let msg = args.join(" "); //setando....

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:x: | ${message.author} Você não possui a permissão **GERENCIAR MENSAGENS**!`);


    if (!msg) return message.channel.send(`:x: | ${message.author} Você precisa escrever algo para eu falar!`); //verificando se há alguma mensagem

    message.channel.send(`<a:emoji_17:846180582010388540> |*Mensagem por: ${message.author}*

${msg}`) //comando para o bot falar sua mensagem
  }
}