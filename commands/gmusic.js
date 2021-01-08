const request = require('request')

module.exports = (self) => {
  self.registerCommand('gmusic', function (msg, args) {

  	let currentgame = 0
    
	setInterval(function () {
		request(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${self.secrets.lastfm.username}&api_key=${self.secrets.lastfm.apikey}&format=json&limit=1&nowplaying=true`, (error, response, body) => {
		var music= JSON.parse(body)
      	let mcontent = music.recenttracks.track[0].artist['#text'] + " - " + music.recenttracks.track[0].name
     	
        if (currentgame != mcontent) {
		this.self.editStatus(this.config.defaultStatus.toLowerCase(), {name: mcontent.toLowerCase(), type: 2})
        currentgame = mcontent
        self.log.log(mcontent.toLowerCase(), 'song', 'bgWhite', true)
        }
      })
    }.bind(this), 10000)
  })
}
