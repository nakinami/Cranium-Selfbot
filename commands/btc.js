const request = require('request')

module.exports = (self) => {
  self.registerCommand('btc', function (msg, args) {

	request(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&e=Coinbase`, (error, response, body) => {
	var btc = JSON.parse(body)
	this.send(msg, `\`$${btc.USD}\``)

	})
  })
}