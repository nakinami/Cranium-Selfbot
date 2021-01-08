/*
  displays all my fire sm's
*/
module.exports = (self) => {
  self.registerCommand('sm', function (msg, args) {
    this.embed(msg, {
      author: {
	  name: 'social medias',
	  },
	  description: 'twitter > [@nakinami](https://twitter.com/nakinami)\ninstagram > [@yacinaa](https://instagram.com/yacinaa)\nsteam > [/id/guitars](https://steamcommunity.com/id/guitars)\nsoundcloud > [@masturbated](https://soundcloud.com/masturbated)',
      color: 16777215,
    footer: {
    icon_url: "https://i.imgur.com/RmDcNyZ.png",
    text: "cranium"
    }
    })
  }
 )}

