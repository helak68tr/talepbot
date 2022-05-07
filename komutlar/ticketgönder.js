const Discord = require("discord.js");
const db = require('quick.db');
const Permissions = require('discord.js');


exports.run = async (client, message, args) => {
  
            const açıldıembed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Ticket Açılmıştır.`)
            .setDescription(` Bu Ticket Başarı ile Açılmıştır. :+1:`)
            .setFooter(`BEST and TCKA Ticket Sistemi`, client.user.avatarURL());
  
              const kapandıembed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Ticket Kapanmıştır.`)
            .setDescription(` Bu Ticket Başarı ile Kapanmıştır. :+1:`)
            .setFooter(`BEST and TCKA Ticket Sistemi`, client.user.avatarURL());
  
  
              const messageembed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                  `Çok yakın zaman da seninle ilgileneceğiz.
                Bileti kapatmak istersen: 🔒`);
  
                const tekrarkapatembed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(
                  `Eğerki istersen Buradan Ticketi Kapatabilirsin: 🔒`);
  
                const hangisiticket = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(`Ne tür yardıma ihtiyacın var ?`)
            .setDescription(`***Destek ekibimiz sorularını memnuniyetle dinler.
            ve sorununu çözene kadar sana yardımcı olur!
            Destek alabilceğin şeyler;***
            
            🔑 ** Satın alım öncesi yardım **
            💸 ** Satın alım sonrası yardım **
            🛠️  **Teknik yardım **
            <:minecraft:891610309293400114>  **Sunucu içi yardım**
            📕  **Rütbe (YouTube) başvurusu**
            <:mcelmas:765297071242608680>  **Reklam anlaşması **
            <:mcgapple:765557887056609317>  **Ekibe başvur **
            
            <:Raksodnus_Sword:830493936295870514> **Diğer | Burada Yok**
            `)
            .setImage('') 
            .setFooter(`v13 Ticket Sistemi`, client.user.avatarURL());
  
  if(!message.member.permissions.has("ADMINISTRATOR")){
    message.reply({ content: "Bunu Yapamazsın!", ephemeral: true, })
  }
  
  if(message.member.permissions.has("ADMINISTRATOR")){
    const kanalll = db.fetch(`ticketkanalbaş_${message.guild.id}`)
    
const ticketembed = new Discord.MessageEmbed()
.setColor('GREEN')
.setAuthor('Talep Açmak İçin Basın!')
.setDescription(`**Hey, yardıma ihtiyacın varsa 
📩 emojisine basabilirsin.**
`)
.setThumbnail(client.user.avatarURL())
.setImage('')
.setTimestamp();

  
client.channels.cache.get(kanalll).send({ embeds: [ticketembed] }).then(m => {
      m.react('📩');
  
  client.on('messageReactionAdd', async(reaction, user) => {
    if (reaction.partial) await reaction.fetch();
    if (reaction.partial) return reaction.fetch();
    
    if(reaction.message.channel.id === kanalll){
      if(reaction.emoji.name === '📩' && user.id !== client.user.id){
          const author = reaction.users.cache.last();
          reaction.users.remove(author.id);
        const sd = await db.fetch(`ass.${message.guild.id}.${author.id}`);
          db.add(`numara.${message.guild.id}`, 1);
          const as = await db.fetch(`numara.${message.guild.id}`);
         const açılanchn = message.guild.channels.create(`talep-${as}`, {
    permissionOverwrites: [{
    	id: message.guild.roles.everyone,
        allow: [],
        deny: ['VIEW_CHANNEL'],
	},
{
  id: author,
  allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
  deny: ["ADD_REACTIONS"],
},
{
  id: "851882431631851560",
  allow: ["VIEW_CHANNEL"],
  deny: [],
},
{
    	id: "883841221414510663", //
        allow: [],
        deny: ['VIEW_CHANNEL'],
	},
{
  id: "891623525692096572",
  allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'SEND_MESSAGES'],
  deny: []
}
]
                                        }).then(async s => {
            db.add(`numara.${s.id}`, as);
            db.set(`ass.${message.guild.id}.${author.id}`, s.id);
            db.set(
              `asd.${message.guild.id}.${s.id}.${author.id}`,
              "ticketaçma"
            );
            const destekrole = await db.fetch(`ticketdes_${message.guild.id}`);
            const destekroleelid = '851882431631851560';
            //sssss
            let role = message.guild.roles.cache.find(r => r.name === "@everyone");
            let destekrolebul = message.guild.roles.cache.find(rl => rl.id === destekroleelid);
            setTimeout(() => {

            s.send({ content: `${author} Hoş Geldin.`, embeds: [messageembed] }).then(mmm => {
              mmm.react('🔒')
              //mmm.react('🔓')
            })
              
              }, 50);
           setTimeout(() => {
              s.send({ embeds: [hangisiticket] }).then(mn => {
              mn.react('🔑')
              mn.react('💸')
              mn.react('🛠️')
              mn.react('891610309293400114')
              mn.react('📕')
              mn.react('765297071242608680')
              mn.react('765557887056609317')
              mn.react('830493936295870514')
                
            })
              }, 150);
      })
      }} 
if(reaction.message.channel.name.includes("talep")){
const as = await db.fetch(`numara.${message.guild.id}`);
  // 🔓 açık
  if(reaction.emoji.name === "🔒" && user.id !== client.user.id){
 const author = reaction.users.cache.last();
 reaction.users.remove(author.id);
  reaction.message.channel.send({ embeds: [kapandıembed] }).then(nn => {
                 setTimeout(() => {
                 nn.delete()
                 }, 7800)
  })
    reaction.message.channel.setName(`kapalı-${as}`)
    reaction.message.channel.send({ content: "Bu Ticket Tamamen Kapatmak İçin Basın: ⛔" }).then(mmm => {
      mmm.react('⛔')
    })
                }
      } 
    if(reaction.message.channel.name.includes("kapalı")){ // close
        const as = await db.fetch(`numara.${message.guild.id}`);
        if(reaction.emoji.name === "🔓" && user.id !== client.user.id){
 const author = reaction.users.cache.last();
 reaction.users.remove(author.id);
         reaction.message.channel.send({ content: "**Bu Ticketin Açılmasını istiyormusunuz?** *Eğerki Açarsanız Tekrardan Kapatma Şansınız Olmaz!*"}).then(mm => {
           mm.react('👍')
           mm.react('👎')

          })
        };
             if(reaction.emoji.name === "👍" && user.id !== client.user.id){
               reaction.message.channel.setName(`talep-${as}`)
               reaction.message.channel.send({ embeds: [açıldıembed] })
                 reaction.message.channel.send({ embeds: [tekrarkapatembed] }).then(ss => {
                   ss.react('🔒')
                 })
             }
                     if(reaction.emoji.name === "👎" && user.id !== client.user.id){
               reaction.message.reactions.removeAll()
               reaction.message.channel.send({ content: "**Ticket Açılmadı.**" })
               
             }
                           if(reaction.emoji.name === "⛔" && user.id !== client.user.id){
               reaction.message.channel.send({ content: "*Ticket* ***5*** *Saniye İçinde Kapanıcak.*" })
                             setTimeout(() => {
                             reaction.message.channel.delete()
                               const as = db.fetch(`numara.${message.guild.id}`);
                             }, 6000)
             }
      
      }
      
              
  })
  
  client.on('messageReactionAdd', async(reaction, user) => {
    const as = await db.fetch(`numara.${message.guild.id}`); // ticket
    if(reaction.message.channel.name.includes("talep")){
      if(reaction.emoji.name === "🔒" && user.id !== client.user.id){
        reaction.message.channel.setName(`kapalı-${as}`)
      }
    }
  })
  
    client.on('messageReactionAdd', async(reaction, user) => {
      const as = await db.fetch(`numara.${message.guild.id}`);
    if(reaction.message.channel.name.includes("talep")){
     
      // ---------------------------------------- Ticket Çağırma -------------------------------- //
      if(reaction.emoji.name === "🔑" && user.id !== client.user.id){
        reaction.message.channel.send({ content: `Satın alım öncesi yardım - <@&${''}>` })
        reaction.message.delete();
      };
      if(reaction.emoji.name === "💸" && user.id !== client.user.id){
        reaction.message.channel.send({ content: `Satın alım sonrası yardım - <@&${''}>` })
        reaction.message.delete();
      };
      if(reaction.emoji.name === "🛠️" && user.id !== client.user.id){
        reaction.message.channel.send({ content: `Teknik yardım - <@&${''}>` })
        reaction.message.delete();
      };
      if(reaction.emoji.id === "891610309293400114" && user.id !== client.user.id){
        reaction.message.channel.send({ content: `Sunucu içi yardım - sen sorununu yazarken <@&${''}> Destek  buraya koşşsun!` })
        reaction.message.delete();
      };
      if(reaction.emoji.name === "📕" && user.id !== client.user.id){
        reaction.message.channel.send({ content: `Rütbe (YouTube) başvurusu - <@&${''}>` })
        reaction.message.delete();
      };
      if(reaction.emoji.id === "765297071242608680" && user.id !== client.user.id){
        reaction.message.channel.send({ content: `Reklam anlaşması - <@&${''}>` })
        reaction.message.delete();
      };
      if(reaction.emoji.id === "765557887056609317" && user.id !== client.user.id){
        reaction.message.channel.send({ content: `Ekibe başvur - <@&${''}>` })
        reaction.message.delete();
      };
      if(reaction.emoji.id === "830493936295870514" && user.id !== client.user.id){
        reaction.message.channel.send({ content: `Diğer - <@&${''}>` })
        reaction.message.delete();
      };



      };
      // ---------------------------------------- Ticket Çağırma -------------------------------- // SON
});
  
  //891610309293400114
  
  
});
         };
  const kanalll = db.fetch(`ticketkanalbaş_${message.guild.id}`)
    message.delete();
  message.channel.send({ content: "Başarı ile Ticket Mesajı Gönderilmiştir." }).then(mmmm => {
    setTimeout(() => {
    mmmm.delete()
      }, 6000)
  })
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "ticketgönder"
}; 