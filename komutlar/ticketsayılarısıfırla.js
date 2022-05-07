const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if(message.author.id === ''){
  const as = await db.fetch(`numara.${message.guild.id}`);
  db.delete(`numara.${message.guild.id}`)
  message.channel.send({ content: "Sıfırlandı. :+1:"})
  } else if(message.author.id !== '') return message.reply({ content: "Bunu Yapamazsın"})
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "ticketsayılarısıfırla"
}; 