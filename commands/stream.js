/*
  stream a specific game
*/
module.exports = (self) => {
  self.registerCommand('stream', function (msg, args) {
	this.self.editStatus(this.config.defaultStatus.toLowerCase(), {name: args ? args.join(' ') : null, type: 1, url: 'https://www.twitch.tv/twitch'})
    
    if (args.length == 0) {
    	this.send(msg, "current stream removed");
    	return;
    }

    this.send(msg, `set \`${args.join(' ')}\` as stream`)
  })
}
