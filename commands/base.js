module.exports = (self) => {
  self.registerCommand('base', function (msg, args) {
  	this.send(msg, "hello")
  })
}