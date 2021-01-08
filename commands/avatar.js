/*
set avatar to base 64 images
*/
const request = require('superagent')

module.exports = (self) => {
  self.registerCommand('avatar', function (msg, args) {

 request.get(args[0])
  .end((err, res) => {
   	// If there is an error getting the emoji
   if (err) { this.log.err(err, 'avatar'); return this.send(msg, 'error it broke') }
   	// If no error
   if (res.body && res.statusCode === 200) {
   const buf = res.body
   const type = buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF ? 'data:image/jpeg;base64,' : 'data:image/png;base64,'

   avatar = `${type}${res.body.toString('base64')}`
   self.editSelf({avatar: avatar})
  this.send(msg, "avatar set")
	}})
  })
}
