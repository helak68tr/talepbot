const { Discord, MessageEmbed } = require('discord.js');
const db = require('quick.db');

exports.run = async (message, client, args) => {
  
  
  // embeds //
  
  const helpembed = new MessageEmbed()
.setColor('RANDOM')
.setAuthor('Ticket Tool Yardım Listesi.')
.setDescription(`
deneme 1
denem 2 
denem 3`)
.setTimestamp();

const başlangıçreactembed = new MessageEmbed()
.setColor('BLUE')
.setAuthor('Üye Olmak İçin Basın.')
.setDescription(`Üye Olmak İçin Emojiye Basınız.`)
.setThumbnail(client.user.displayAvatarURL())
.setImage('')
.setTimestamp();
  

client.on('interactionCreate', async(int) => {
  if(!int.isCommand()) {
    return
  }
  const { commandName, options } = int

// ---- Slash Commands Add ---- //
  if(commandName === 'says') {
    int.reply({
      content: "Says in Says",
      ephemeral: true,
    })
  }
if(commandName === 'topla'){
  const num1 = options.getNumber('num1')
  const num2 = options.getNumber('num2')

  await int.deferReply({
    ephemeral: true,
  })

  await new Promise(resolve => setTimeout(resolve, 2000))
  int.editReply({
    content: `A Numbers: *${num1}* **+** *${num2}* **=>** **${num1 + num2}** `,
  })
}

if(commandName === 'prefix'){
  
  int.reply({
    
    content: `<@!${int.user.id}>, My Prefix is: ( **!** ) `,
    ephemeral: true,
  })
  

}

if(commandName === 'hello'){
  int.reply({
    content: `Helloo World!`,
    ephemeral: false,
  })
}

  if(commandName === 'help'){
    int.reply({
      embeds: [helpembed] ,
      ephemeral: true,
    })
}
if(int.member.permissions.has("ADMINISTRATOR")){
if(commandName === 'öneriaç'){
  int.reply({
    content: "Başarı ile Öneri Reactları Açıldı.",
    ephemeral: false,
  })
  db.set(`önerireactt_${int.guild.id}`, 'opened');
}
} else if(!int.member.permissions.has("ADMINISTRATOR")) { int.reply({ content: "Bunu Yapamazsın!", ephemeral: false, }) };
  
  const başlangıçreactkanal = db.fetch(`reactkanalbaş_${int.guild.id}`)
  
  if(int.member.permissions.has("ADMINISTRATOR")){
  const reactkanal = options.getChannel('kanal')
  const kanaltagbul = client.channels.cache.get(başlangıçreactkanal)
  if(commandName === 'kanalkontrol'){
    int.reply({
      content: `Kanal: ${başlangıçreactkanal}, ${kanaltagbul} `,
      ephemeral: false,
    })
  }
  } else if(!int.member.permissions.has("ADMINISTRATOR")) { int.reply({ content: "Bunu Yapamazsın!", ephemeral: false, }) };
  

if(int.member.permissions.has("ADMINISTRATOR")){
  const reactkanal = options.getChannel('kanal')
  
  if(commandName === 'setreactchannel'){
    int.reply({
      content: `Başarı ile React Kanalını Belirlediniz. Kanal: ${reactkanal} `,
      ephemeral: false,
    })
    db.set(`reactkanalbaş_${int.guild.id}`, reactkanal.id);
  }
  } else if(!int.member.permissions.has("ADMINISTRATOR")) { int.reply({ content: "Bunu Yapamazsın!", ephemeral: false, }) };

if(int.member.permissions.has("ADMINISTRATOR")){
if(commandName === 'önerireact'){
  const getareact = options.getString('choices')
  int.reply({
    content: "Başarı İle Öneri Reactları Açıldı.",
    ephemeral: true,
  })
  if(getareact === 'açık'){
  db.set(`önerireactt_${int.guild.id}`, 'opened');
}
if(getareact === 'kapalı'){
  int.reply({
    content: "deneme kapalı",
    ephemeral: true,
  })
  db.delete(`önerireactt_${int.guild.id}`);
}
} 
} else if(!int.member.permissions.has("MANAGE_ROLES")) { int.reply({ content: "Bunu Yapamazsın!", ephemeral: false, }) };
  
if(int.member.permissions.has("ADMINISTRATOR")){
if(commandName === 'önerikapat'){
  int.reply({
    content: "Başarı ile Öneri Reactları Kapatıldı.",
    ephemeral: false, 
  })
  db.delete(`önerireactt_${int.guild.id}`);
}
} else if(!int.member.permissions.has("MANAGE_ROLES")) { int.reply({ content: "Bunu Yapamazsın!", ephemeral: false, }) };
  
  
if(int.member.permissions.has("MANAGE_ROLES")){

  
  if(commandName === 'addrole'){
  const memberopts = options.getMember('member')
  const roleopts = options.getRole('role')
  int.reply({
    content: `Role Eklendi. Eklenen Kişi: ${memberopts}, Eklenen Rol: ${roleopts} `,
    ephemeral: false, 
  })
  memberopts.roles.add(roleopts)
    //özellogkanalı.reply({ content: "Role Eklendi. Eklenen Kişi: ${memberopts}, Eklenen Rol: ${roleopts}" })
  }
} else if(!int.member.permissions.has("MANAGE_ROLES")) { int.reply({ content: "Bunu Yapamazsın!", ephemeral: false, }) };

if(int.member.permissions.has("MANAGE_ROLES")){
if(commandName === 'removerole'){
  const memberopts = options.getMember('member')
  const roleopts = options.getRole('role')
  int.reply({
    content: `Role Silindi. Rolü Silinen Kişi: ${memberopts}, Silinen Rol: ${roleopts} `,
    ephemeral: false, 
  })
  memberopts.roles.remove(roleopts)
  }
} else if(!int.member.permissions.has("MANAGE_ROLES")) { int.reply({ content: "Bunu Yapamazsın!", ephemeral: false, }) };





  
})
};