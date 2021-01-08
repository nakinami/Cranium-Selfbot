
module.exports = (self) => {
  self.registerCommand('reload', function (msg, args) {

  	if (!args.length) return this.send(msg, "please provide a command")
    command = self.commands.main[args[0]].name
	delete require.cache[require.resolve(`./${command}.js`)];
	let cmd = require(`./${command}`);
    this.send(msg, command)
  })
}