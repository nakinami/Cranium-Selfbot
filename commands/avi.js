/*
  get the avatar of a specific user
*/
module.exports = (self) => {
  self.registerCommand('avi', function (msg, args) {

  	if (!args[0]) return this.send(msg, 'specify a name, an id or mention the user.')
    let user = this.findMember(msg, args[0])
    if (!user) return this.send(msg, 'specify a name, an id or mention the user')

    let avatar = user.avatarURL
	avatar = avatar.slice(0, -3);
	avatar += "1024"
    this.send(msg, avatar)
})
}