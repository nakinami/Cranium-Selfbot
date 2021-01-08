/*
  Nick. Edits your nickname in a guild. Leave blank to remove the current nick. (Needs "Change Nickname" permission)
*/
module.exports = (self) => {
  self.registerCommand('nick', function (msg, args) {

    this.self.editNickname(msg.channel.guild.id, args ? args.join(' ') : null)
    if (args == "") {
    	this.send(msg, "nick removed")
    	 return
    	}
     this.send(msg, 'nick set to `' + args.join(' ') + '`')

  }, {
    perms: ['changeNickname'],
    noPms: true
  })
}
