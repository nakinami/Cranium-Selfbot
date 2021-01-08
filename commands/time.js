module.exports = (self) => {
  self.registerCommand('time', function (msg, args) {
  
  	//var time = new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"});

  	var d = new Date(),
    h = (d.getHours()<10?'0':'') + d.getHours(),
    m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    var time = h + ':' + m;

    this.send(msg, '⌚  `' + time + '`')
  })
}