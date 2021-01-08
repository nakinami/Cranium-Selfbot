module.exports = (self) => {

const Twitter = require("twitter")
const tclient = new Twitter({
  consumer_key: self.config.tconsumerkey,
  consumer_secret: self.config.tconsumersecret,
  access_token_key: self.config.taccesstokenkey,
  access_token_secret: self.config.taccesstokensecret,
})

  self.registerCommand('tweet', function (msg, args) {
  	
    let twt = args.join(' ')
    
	if (twt.length = 0 || twt.length > 280) {
		this.send(msg, "tweet is either empty or over 280 characters, try again");
		return;
	}

	tclient.post('statuses/update', {status: twt})
    .then(  this.send(msg, `\`${twt}\` tweeted!`) )

  })
}