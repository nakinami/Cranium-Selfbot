/*
  Kick. Kicks a user from a guild. Can input a mention, ID or name. (Needs "Kick Members" permisssion)
*/
module.exports = (self) => {
  self.registerCommand('kick', function (msg, args) {
    // If no user is specified
    if (!args[0]) return this.send(msg, 'specify the user')

    // Find the user
    let user = this.findMember(msg, args[0])
    if (!user) return this.send(msg, 'specify the user')

    // Kick user
    msg.channel.guild.kickMember(user.id)
    .then(() => this.send(msg, `\`${user.username}#${user.discriminator}\` kicked!`))
    .catch((err) => { this.log.err(err, 'kick'); this.send(msg, `could not kick \`${user.username}#${user.discriminator}\``) })
  }, {
    perms: ['kickMembers'],
    noPms: true
  })
}
