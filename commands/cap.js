
module.exports = (self) => {
  self.registerCommand('cap', function (msg, args) {

  	if (args.length === 0) {
        this.send(msg, "input text to edit")
    }

	this.send(msg, (args.map(arg => arg[0].toUpperCase() + arg.slice(1).toLowerCase()).join(' ')));

  })
}