/*
  restart the bot..
*/
module.exports = (self) => {
  self.registerCommand('restart', async function (msg, args) {
  	await this.send(msg, 'restarting').then(m => this.edit(m, "`restarting.`")).then(m => this.edit(m, "`restarting..`")).then(m => this.edit(m, "`restarting...`")).then(m => setTimeout(() => this.self.deleteMessage(m.channel.id, m.id), 1000))
	setTimeout(() => process.exit(0), 2000)
  })
}
