const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async(client, message, args) => {
  
  const botlogg = client.channels.cache.get('')
  const as = await db.fetch(`numara.${message.guild.id}`);
  

  if (message.member.roles.cache.some(role => role.id === '')){
    if(message.channel.name.startsWith("talep" || "kapalı")){
      message.channel.delete();
      botlogg.send({ content: `**Tag: ${message.author.tag} id: ${message.author.id}** Adlı Kişi Komut ile Bir **${message.channel.name} Sildi.** ` })
      db.add(`numara.${message.guild.id}`, -1)
      
    } else if (message.member.roles.cache.some(role => role.id !== '')) {
      message.reply({ content: "Bunu, Bu Kanalda Yapamazsın!" }).then(m => {
        setTimeout(() => {
          m.delete();
        }, 9600)
      })
    }
  };
  
};
exports.conf = {
  aliases: ['tsil', "tisil"]
};

exports.help = {
  name: "ticketsil"
}; 