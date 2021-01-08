const translate = require('google-translate-api');

module.exports = (self) => {
  self.registerCommand('translate', async function (msg, args) {

  	if (!args) {
  		this.send(msg, "please input a lang or text")
  	} 
  	
  	let lang = args[0]
  	let input = args.slice(1).join(' ')

  	let res;

  	try {
  	res = await translate(input, { from: 'auto', to: lang })
  	} catch (a) {
  		return this.send(msg, "failed to translate")
  	}
  	this.send(msg, res.text.toLowerCase())
  })
}