const role = require('../config/role.json')
module.exports = (self) => {
  self.registerCommand('crole', function (msg, args) {
    let r = msg.channel.guild.roles
    let rr = r.find(r => r.name == '骨架')

    let index = role.indexOf(rr.color)
    setInterval(() => {
    if (index != -1) {
    index++;
    if (index > (role.length - 1)) {
      index = 0
    }
    msg.channel.guild.editRole(rr.id, {color: role[index]})
    } else {
    index = 0
    msg.channel.guild.editRole(rr.id, {color: role[index]})
    }
  }, 1000);
  })
}
