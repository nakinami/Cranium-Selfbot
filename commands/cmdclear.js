module.exports = (self) => {
  self.registerCommand('cmdclear', function (msg, args) {
  	process.stdout.write('\033c');
  })
}