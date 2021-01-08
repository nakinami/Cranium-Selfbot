/*
  cycles your nickname to whatever is in the config file
*/
const nick = require('../config/nick.json')
module.exports = (self) => {
self.registerCommand('cnick', function (msg, args) {

let index = nick.indexOf(msg.member.nick)
setInterval(() => {
if (index != -1) {
    index++;
    if (index > (nick.length - 1)) {
      index = 0
    }
    this.self.editNickname(msg.channel.guild.id, nick[index])
  } else {
    index = 0
    this.self.editNickname(msg.channel.guild.id, nick[index])
  }
}, 1000);
  },  {
    perms: ['changeNickname'],
    noPms: true
  })
}
