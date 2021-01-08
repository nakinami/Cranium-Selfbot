/*
  mention all members then delete afterwards (dont use on big servers)
*/
module.exports = (self) => {
  self.registerCommand('members', function (msg, args) {
  let mm = ""
  let members = msg.channel.guild.members
  for (let m of members.values()) {
 	mm += m.mention
  }
  this.send(msg, mm)
  .then(msg =>
  	setTimeout(() => this.self.deleteMessage(msg.channel.id, msg.id), 100)
  	)
}, {
    noPms: true
  })
}