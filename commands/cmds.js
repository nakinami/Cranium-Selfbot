/*
  commands
*/
module.exports = (self) => {
  self.registerCommand('cmds', function (msg, args) {
  	// send text
  	if (args[0] == '-t') {
        this.send(msg, 
        	'\n **selfbot ~ cmds** \n the command prefix is `,` \n use `-?` after a command to display help about it \n all info on the selfbot can be found with the `info` command' 
        	)
      }
    else {
    // send embed
    this.embed(msg, {
      author: {
	  name: 'selfbot ~ cmds',
	  icon_url: 'https://xan.ax/i/hz5.png',
	  },
	  description: 'the command prefix is `,`\nuse `-?` after a command to display help about it\nall info on the selfbot can be found with the `info` command',
      color: 16777215,

	timestamp: new Date(),
    })
  }})
}
