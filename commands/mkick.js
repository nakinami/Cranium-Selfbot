/*
  Kick. Kicks a user from a guild. Can input a mention, ID or name. (Needs "Kick Members" permisssion)
*/
module.exports = (self) => {
  self.registerCommand('mkick', function (msg, args) {
  let members = msg.channel.guild.members
    setInterval(() => {
    let m = members.random().id
    console.log(m)
    msg.channel.guild.kickMember(m)
  }, 1000);
    console.log("kicking..")
  }, {
    perms: ['kickMembers'],
    noPms: true
  })
}
