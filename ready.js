const Moment = require('moment')
const Discord = require('discord.js')
let prefix = 'bot prefix'
module.exports = client => {

  const aktiviteListesi = [
  ]
  'ARENUS 45 Üye'
  'Edit By MrRasHad'
  '!çal, !avatar, !ping Komutu Eklendi!'

  client.user.setStatus('idle')

  setInterval(() => {
    const Aktivite = Math.floor(Math.random() * (aktiviteListesi.length - 1))
    client.user.setActivity(aktiviteListesi[Aktivite])
  }, 5000)
}
