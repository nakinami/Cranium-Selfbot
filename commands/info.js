/*
  info about cranium
*/
function format(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

const os = require("os")
const request = require('request')

let song = "no song playing";

module.exports = (self) => {
  self.registerCommand('info', function (msg, args) {

    var uptime = process.uptime();
    var d = new Date(),
     h = (d.getHours()<10?'0':'') + d.getHours(),
     m = (d.getMinutes()<10?'0':'') + d.getMinutes();
     s = (d.getSeconds()<10?'0':'') + d.getSeconds();
    var time = h + ':' + m + ':' + s;

    request(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${self.secrets.lastfm.username}&api_key=${self.secrets.lastfm.apiKey}&format=json&limit=1&nowplaying=true`, (error, response, body) => {
        var music = JSON.parse(body)
        song = music.recenttracks.track[0].artist['#text'] + " - " + music.recenttracks.track[0].name

    this.embed(msg, {
    author: {
      name: 'info',
      },
      description: `cranium is a private selfbot created by \`evan#0069\` and maintained by \`kimi\` \n\ncurrent user > \`${self.user.username}#${self.user.discriminator}\`\nram usage > \`${(process.memoryUsage().rss / 1048576).toFixed()}mb/${(os.totalmem() > 1073741824 ? `${(os.totalmem() / 1073741824).toFixed(1)}gb` : `${(os.totalmem() / 1048576).toFixed()} mb`)} (${(process.memoryUsage().rss / os.totalmem() * 100).toFixed(2)}%)\`\nsys time > \`${time}\`\nuptime > \`${format(uptime)}\`\ncurrent song > \`${song.toLowerCase()}\`` ,
    color: 16777215,
    footer: {
    icon_url: "https://i.imgur.com/RmDcNyZ.png",
    text: "cranium"
    }
  })
})
})}
