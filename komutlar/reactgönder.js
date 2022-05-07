const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if(!message.member.permissions.has("ADMINISTRATOR")){
    message.reply({ content: "Bunu Yapamazsın!", ephemeral: true, })
  }
  
if(message.member.permissions.has("ADMINISTRATOR")){
  const kanal = db.fetch(`reactkanalbaş_${message.guild.id}`)
  
const başlangıçreactembed = new Discord.MessageEmbed()
.setColor('BLUE')
.setAuthor('Üye Olmak İçin Basın.')
.setDescription(`Üye Olmak İçin Emojiye Basınız.`)
.setThumbnail(client.user.avatarURL())
.setImage('')
.setTimestamp();
    return client.channels.cache.get(kanal).send({ embeds: [başlangıçreactembed] }).then(m => {
     // m.react('emojiid')
    })
};
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "reactgönder"
};
