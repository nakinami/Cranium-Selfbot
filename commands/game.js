module.exports = (self) => {
  self.registerCommand('game', function (msg, args) {

    this.self.editStatus(this.config.defaultStatus.toLowerCase(), args ? {name: args.join(' '), type: 0} : null)

    if (args.length == 0) {
    	this.send(msg, "current game removed");
    	return;
    }

    this.send(msg, `set \`${args.join(' ')}\` as game`)
  })
}
