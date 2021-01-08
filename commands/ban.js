/*
  Ban. Bans a user from a guild. Can input a mention, ID or name. Can specify how many days of messages to delete. (Needs "Ban Members" permission)
  "ban @user 3" will ban "user" and delete 3 days of their messages (Will only accept number of days between 1 - 9) (Default is 3)
*/
module.exports = (self) => {
  self.registerCommand('ban', function (msg, args) {
    // If no user is specified
    if (!args[0]) return this.send(msg, 'specify a user')

    // Find the user and get deleteDays
    let user = this.findMember(msg, args[0])
    if (!user) return this.send(msg, 'specify a user')
    let deleteDays = /\d{1}/.test(args[1]) ? parseInt(args[1], 10) : 3

    // Ban user
    msg.channel.guild.banMember(user.id, deleteDays)
    .then(() => this.send(msg, `\`${user.username}#${user.discriminator}\` banned!`))
    .catch((err) => { this.log.err(err, 'ban'); this.send(msg, `could not ban \`${user.username}\``) })
  }, {
    perms: ['banMembers'],
    noPms: true
  })
}
