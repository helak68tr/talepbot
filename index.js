const { Client, Message, MessageEmbed, Collection, Discord } = require("discord.js");
const Sequelize = require('sequelize');
//import DiscordJS, { Intents } from 'discord.js'
const fs = require("fs");
const slashs = require("@discordjs/builders");
const config = require("./config.json");
const db = require("quick.db");
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const prefix = config.prefix;
const token = process.env.TOKEN

const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 50,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});
const özellogkanalı = client.channels.cache.get('');
const önerikanalı = '';

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Komut Var!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name} İsimli Komut Aktif!`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

if(!token){
  console.log("Bu Proje Glitch Özel Uyarlanmıştır .env Dosyasına Discord Bot Tokeninizi Yazınız!")
} else { 
client.login(token); 
}


const express = require("express");
const app = express();
const http = require("http");
const { resolve } = require("path");
app.get("/", (request, response) => {
  console.log(`Uptime Başarılı`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 60000);

// Embeds //

const helpembed = new MessageEmbed()
.setColor('RANDOM')
.setAuthor('TCKA Help Listesi.')
.setDescription(`
deneme 1

denem 2 
denem 3
`)
.setTimestamp();

const başlangıçreactembed = new MessageEmbed()
.setColor('BLUE')
.setAuthor('Üye Olmak İçin Basın.')
.setDescription(`Üye Olmak İçin Emojiye Basınız.`)
//.setThumbnail(client.user.displayAvatarURL())
.setImage('https://media.discordapp.net/attachments/879744810100088914/881549239338037298/standard.gif?width=300&height=40') // https://media.discordapp.net/attachments/879744810100088914/881549239338037298/standard.gif?width=300&height=40
.setTimestamp();



// Embeds (End) //

// Slash Command Creating //
client.on('ready', async() => {
  

let commands

const guild = client.guilds.cache.get('485466577693573120'); // denem

if(guild) {
  commands = guild.commands
} else {
  commands = client.applications?.commands
}


  
  
  commands?.create({
  name: "says",
  description: "deneme",
})
  
  
commands?.create({
  name: "warn",
  description: "Kullanıcının Kaç Uyarısı Olduğunu Gösterir.",
})

commands?.create({
  name: "addrole",
  description: "Member Add a Role",
  options: [
    {
      name: "member",
      description: "Rol Verilecek Kişi.",
      required: true,
      type: "USER"
    },
    {
      name: "role",
      description: "Verilecek Rol.",
      required: true,
      type: "ROLE"
    },
  ]
})

commands?.create({
  name: "removerole",
  description: "Member Remove a Role",
  options: [
    {
      name: "member",
      description: "Rolü Alınacak Kişi.",
      required: true,
      type: "USER"
    },
    {
      name: "role",
      description: "Alınacak Rol.",
      required: true,
      type: "ROLE"
    },
  ]
})

commands?.create({
  name: "prefix",
  description: "Show My Prefix.",
})
  
  commands?.create({
  name: "clear",
  description: "Yazdığınız Sayı Kadar Mesaj Siler.",
    options: [{
      name: "amount",
      description: "Mesaj Sayısı Yazınız.",
      required: true,
      type: "NUMBER"
    }],
})

commands?.create({
  name: "ticketkanalayar",
  description: "Ticket Kanalını Ayarlar.",
  options: [
    {
      name: "ticketkanal",
      description: "Ticket Mesajı Hangi Kalana Gitsin?",
      required: true,
      type: "CHANNEL"
    }
  ]
})
  
  commands?.create({
  name: "kanalkontrol",
  description: "React Kanalını Gösterir.",
})

commands?.create({
  name: "hello",
  description: "Say Hello World.", // desc
})

commands?.create({
  name: "öneriaç",
  description: "Öneri Reactları Açar.", // desc
})

commands?.create({
  name: "önerikapat",
  description: "Öneri Reactları Kapatır.", // desc
})

commands?.create({
  name: "önerireact",
  description: "Öneri Reactları Açıp/Kapatır.", // desc
  options: [
    {
      name: "durum",
      description: "React Durumunu Yazınız, 1: Açık, 0: Kapalı",
      required: true,
      type: 'NUMBER',
    },
  ],
})
  
commands?.create({
  name: "help",
  description: "Show My Help List.",
})

//commands?.create({
 // name: "üyereactmesaj",
//  description: "React Başlangıç Mesahını Gönderir.",
//})

commands?.create({
  name: "setreactchannel",
  description: "React Üye Rolü Vermesi İçin Bir Komuttur.",
  options: [
    {
      name: "kanal",
      description: "React Mesajı Hangi Kalana Gitsin?",
      required: true,
      type: "CHANNEL"
    },
  ],
})

  });
// Slash Command Creating (end) //

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
  
    if(commandName === 'ip') {
    int.reply({
      content: "TCKA Minecraft IP: **mc.TCKA.org**",
      ephemeral: true,
    })
  }
  if(int.member.permissions.has("MANAGE_MESSAGES")){
    if(commandName === 'clear') {
      const amountt = options.getNumber('amount')
if (amountt < 1) return int.reply({ content: "**1** adetten az mesaj silemem!", ephemeral: true, })
if (amountt > 100) return int.reply({ content: "**100** adetten fazla mesaj silemem!", ephemeral: true, })
      
int.channel.bulkDelete(amountt).then(deletedMessages => {
if (deletedMessages.size < 1) return int.reply({ content: "Hiç mesaj silemedim! _(**14** günden önceki mesajları silemem!)_", ephemeral: true, })
  })

      int.reply({content: `**${amountt}** adet mesaj başarıyla silindi!`, ephemeral: false, })

    }
  } else { int.reply({ content: "Bunu Yapamazsın!", ephemeral: true, }) };
  
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
  
 // if(int.member.permissions.has("ADMINISTRATOR")){
 //   const reactkanal = options.getChannel('kanal')
 //   const kanaltagbul = client.channels.cache.get(başlangıçreactkanal)
 //   if(commandName === 'üyereactmesaj'){
 //     int.reply({
 //       content: `Gönderildi. Kanal: ${başlangıçreactkanal}, ${kanaltagbul} `,
 //       ephemeral: false,
//      })
//    }
//    } else if(!int.member.permissions.has("ADMINISTRATOR")) { int.reply({ content: "Bunu Yapamazsın!", ephemeral: false, }) };

if(int.member.permissions.has("ADMINISTRATOR")){
  const ticketkanal = options.getChannel('ticketkanal')
  
  if(commandName === 'ticketkanalayar'){
    int.reply({
      content: `Başarı ile Ticket Kanalını Belirlediniz. Kanal: ${ticketkanal} `,
      ephemeral: false,
    })
    db.set(`ticketkanalbaş_${int.guild.id}`, ticketkanal.id);
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
  const getareact = options.getNumber('durum')
  //const getareactkp = options.getString('kapalı')
  if(getareact === '1'){
      int.reply({
    content: "Başarı İle Öneri Reactları Açıldı.",
    ephemeral: true,
  })
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
} else if(!int.member.permissions.has("ADMINISTRATOR")) { int.reply({ content: "Bunu Yapamazsın!", ephemeral: false, }) };
  
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
    //özellogkanalı.reply({ content: "Role Eklendi. Eklenen Kişi: ${memberopts}, Eklenen Rol: ${roleopts}" })
  }
} else if(!int.member.permissions.has("MANAGE_ROLES")) { int.reply({ content: "Bunu Yapamazsın!", ephemeral: false, }) };


// ---- Slash Commands Add ---- //



  
})


client.on('messageCreate', async (message) => {
  if(message.content.toLowerCase().includes(`<@!${client.user.id}>`)) return message.channel.send({ content: "Prefixim: ! , Fakat ( / ) Komutlarınıda Kullanabilirsin." })
});
client.on('messageCreate', async (message) => {
  const reactopenclose = await db.get(`önerireactt_${message.guild.id}`)

  if(reactopenclose === 'opened'){
  if(!message.author.bot){
  if(!message.member.permissions.has("ADMINISTRATOR")){
  if(message.channel.id === önerikanalı) {
   await message.react('763765123142647818')
   await message.react('763765132815761408')
   await message.react('750047216437297272')
  };
  };
  };
  };

  if(message.author.id === '551072969728851988') {
   // message.react('👑')
  };
  if(message.author.id === '747435392969605242') {
    //message.react('👑')
  };
  
}
)  

          
  
client.on('messageReactionAdd', async (reaction, user) => {
if (reaction.partial) await reaction.fetch();

//client.on('messageCreate', async message => {
  if(reaction.message.channel.id === önerikanalı){ // öneri react kanal id
if(user.id === '747435392969605242'){
    if(reaction.emoji.id === '763765123142647818'){
       reaction.message.react('☑️') //deneme.
    };
    if(reaction.emoji.id === '763765132815761408'){
       reaction.message.react('❌') //deneme.
    };
    if(reaction.emoji.id === '750047216437297272'){
      await reaction.message.delete();
   };
  } else if(user.id === '551072969728851988'){
    if(reaction.emoji.id === '763765123142647818'){
       reaction.message.react('☑️') //deneme.
    };
    if(reaction.emoji.id === '763765132815761408'){
       reaction.message.react('❌') //deneme.
    };
    if(reaction.emoji.id === '750047216437297272'){
      await reaction.message.delete();
   };
  } else if(user.id === '565483439004975104'){
    if(reaction.emoji.id === '763765123142647818'){
       reaction.message.react('☑️') //deneme.
    };
    if(reaction.emoji.id === '763765132815761408'){
       reaction.message.react('❌') //deneme.
    };
    if(reaction.emoji.id === '750047216437297272'){
      await reaction.message.delete();
   };
  }

};

});

client.on('messageCreate', async message => {
  

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.partial) await reaction.fetch();
  
  

  if(reaction.message.channel.id === önerikanalı){
if(user.id === '747435392969605242'){
    if(reaction.emoji.id === '763765123142647818'){
      reaction.message.reactions.cache.get('☑️').remove() //deneme.
    } else if(reaction.emoji.id === '763765132815761408'){
      reaction.message.reactions.cache.get('❌').remove() //deneme.
    };

  };
  if(user.id === '551072969728851988'){
    if(reaction.emoji.id === '763765123142647818'){
      reaction.message.reactions.cache.get('☑️').remove() //deneme.
    };
    if(reaction.emoji.id === '763765132815761408'){
      reaction.message.reactions.cache.get('❌').remove() //deneme.
    };
if(user.id === '565483439004975104'){
    if(reaction.emoji.id === '763765123142647818'){
       reaction.message.reactions.cache.get('☑️').remove()
    };
    if(reaction.emoji.id === '763765132815761408'){
       reaction.message.reactions.cache.get('❌').remove()
    };
    
  };
  };
  };
if (reaction.partial) await reaction.fetch();
});


  });



//if (message.content.toLowerCase().message.content.includes('message')

client.on('messageReactionAdd', async(reaction, user) => {
  if (reaction.partial) await reaction.fetch();
  
// const başlangıçreactkanal = db.fetch(`reactkanalbaş_${user.guild.id}`)
const üyerolüüü = reaction.message.guild.roles.cache.find(r => r.id === "883841221414510663")
  if(reaction.message.channel.id === '888866053583675392'){
    if(reaction.emoji.id === '763765123142647818'){
      reaction.message.guild.members.cache.get(user.id).roles.add(üyerolüüü);
    };
  
  
  
  };
});



