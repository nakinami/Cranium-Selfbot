module.exports = (self) => {
  self.registerCommand('watch', function (msg, args) {

    this.self.editStatus(this.config.defaultStatus.toLowerCase(), args ? {name: args.join(' '), type: 3} : null)

    if (args.length == 0) {
    	this.send(msg, "current video removed");
    	return;
    }

    this.send(msg, `set \`${args.join(' ')}\` as watching`)
  })
}
