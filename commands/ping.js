/*
  checks bot ping
*/

module.exports = (self) => {
  self.registerCommand('ping', function (msg, args) {
  	let sh = self.shards.random()
    this.self.createMessage(msg.channel.id, '> ').then(m => this.edit(m, `${m.content} \`${m.timestamp - msg.timestamp}ms\` - \`${sh.latency}ms\``))
  })
}
