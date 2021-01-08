module.exports = (self) => {
  self.registerCommand('fn', function (msg, args) {

    nn = args.slice(1).join(' ')
    let user = this.findMember(msg, args[0])

    setInterval(function () {
    uu = msg.channel.guild.members.find(u => u.username == user.username)
    
    if (nn != uu.nick)
    {
      uu.edit({nick: nn})
    }
	     	  
    }.bind(this), 1000)
  })
}