const Discord = require('discord.js') // discord.js modülü tanımlıyoruz.
const client = new Discord.Client() // client tanımalamsı
const { readdirSync } = require('fs'); // tanımlamalar
const { join } = require('path'); // tanımlamalar

client.commands= new Discord.Collection(); // komutları alıyoruz

const prefix = "!"

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); // Belli bir klasörden belli .js uzantılı dosyaları buluyor.

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    client.commands.set(command.kod, command); // Komutları Ayarlıyoruz.
}

client.on("error", console.error);

client.on('ready', () => {
    console.log(`Selam ${client.user.tag} Sunucuya Giriş Yaptı!`);
});

client.on('guildMemberAdd', member => {
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === 'aramıza-katılanlar');
  girişçıkış.send(`Aramıza Hoşgeldin ${member} Kuralları Okumayı Unutma!`);
  member.send(`${member} Aramıza Hoşgeldin, Kuralları Okumayı Sakın Unutma!`)
});

client.on('guildMemberRemove', member => {
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === 'aramıza-katılanlar');
  girişçıkış.send(`${member} Aramızdan Ayrıldı Güle Güle Kardeşim`);
});

client.on('ready', () => {

  var actvs = [
        `Yeni Komutlar Eklenecek`,
        `Discord:https://discord.gg/PjRVWvyZN5`,
        `Edit By Arenus`,
        `Nitro Hub`,
        `!çal, !ping, !avatar Komutu Eklendi!`,
    ];

    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'PLAYING' });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'PLAYING'});
    }, 8000);
    client.user.setStatus('idle')
});

client.on('message', message => {
  if (message.content.startsWith('duyur')) {
    const kanal = message.mentions.channels.first();
    const args = message.content.split(' ').slice(2)
    const botmesajı = args.join(" ")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Duyuru Yapmak İçin Yönetici Olmalısın');
    if (!botmesajı) return message.reply('Duyurunun Ne Olacağını Yazmadınız.');
    if (!kanal) return message.reply('Kanal Tanımlamadınız');
    message.delete(message.author)
    kanal.send(botmesajı);
  }
});

client.on('message', message => {
  if (message.content.startsWith('özel')) {
    const kişi = message.mentions.users.first();
    const args = message.content.split(' ').slice(2)
    const botmesajı = args.join(" ")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Duyuru Yapmak İçin Yönetici Olmalısın');
    if (!botmesajı) return message.reply('Duyurunun Ne Olacağını Yazmadınız.');
    message.delete(message.author)
    kişi.send(botmesajı);
  }
});

client.on('message', async message => {
  if (message.content.startsWith('!play')) {
    const args = message.content.split(' ').slice(1)
    const botmesajı = args.join(" ")
    if (!botmesajı) return message.reply('URL Koymadınız')
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const ytdl = require("ytdl-core");
      connection.play(ytdl(`${botmesajı}`, { filter: 'audioonly' }))
title.then(titlee => message.channel.send('VIDEO İsmi: ' + titlee))
    } else {
message.reply('Bir sesli kanala katıl')
    }
  }
})

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login('ODQ5OTQyOTU4OTQ1NDY4NDI3.YLihEA.huLmMqpf9IGPWvGUAxpbI0K4d_8')
