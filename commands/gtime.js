 //Puts the local time as your current playing game (Only other people can see this)
//var time = new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"});

var d = new Date(),
  h = (d.getHours()<10?'0':'') + d.getHours(),
  m = (d.getMinutes()<10?'0':'') + d.getMinutes();
var time = h + ':' + m;

module.exports = (self) => {
  self.registerCommand('gtime', function (msg, args) {
    
    setInterval(() => {
      console.log(time)
    //this.self.editStatus(this.config.defaultStatus.toLowerCase(), {name: "at " + time, type: 0});
    }, 10000);

    this.send(msg, '!')
  })
}