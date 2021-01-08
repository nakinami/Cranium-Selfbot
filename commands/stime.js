// Puts the local time as your current stream (only other users can see this)

module.exports = (self) => {
  self.registerCommand('stime', function (msg, args) {
    
    setInterval(() => {

      var d = new Date(),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = (d.getMinutes()<10?'0':'') + d.getMinutes();
      var time = h + ':' + m;

    this.self.editStatus(this.config.defaultStatus.toLowerCase(), {name: "at " + time, type: 1, url: 'https://www.twitch.tv/twitch'})
    }, 20000);

    this.send(msg, '`stream` = ⌚')
  })
}