const request = require('request')

module.exports = (self) => {
  self.registerCommand('cmusic', function (msg, args) {

		request(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${self.secrets.lastfm.username}&api_key=${self.secrets.lastfm.apiKey}&format=json&limit=1&nowplaying=true`, (error, response, body) => {
		var music = JSON.parse(body)


	let album = music.recenttracks.track[0].album['#text']
	if (!album)
		album = "none"

    this.embed(msg, {
    author: {
      name: "current song"
    },
    description: (`name > \`${music.recenttracks.track[0].name}\`\nartist > \`${music.recenttracks.track[0].artist['#text']}\`\nalbum > \`${album}\``).toLowerCase(),
    /*lfm link > [${music.recenttracks.track[0].name}](${music.recenttracks.track[0].url})*/
    thumbnail: {
      url: music.recenttracks.track[0].image[2]['#text']},
    color: 16777215,
    /*fields: [
      {
        name: "name",
        value: `${music.recenttracks.track[0].name}`,
        inline: true
      },
      {
        name: "artist",
        value: `${music.recenttracks.track[0].artist['#text']}`,
        inline: true
      },
      {
        name: "album",
        value: `${music.recenttracks.track[0].album['#text']}`,
        inline: true
      },
      {
        name: "lfm link",
        value: `[${music.recenttracks.track[0].name}](${music.recenttracks.track[0].url})`,
        inline: true
      },
    ],*/
    footer: {
    icon_url: "https://i.imgur.com/RmDcNyZ.png",
    text: "cranium"
    }
  })
})
})
}