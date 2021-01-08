/*
  commands
*/
module.exports = (self) => {
  self.registerCommand('help', function (msg, args) {
  	
    // send embed
    this.embed(msg, {
    author: {
	  name: 'help',
	  },
	  description: `the command prefix is \`${self.config.prefix}\`\nmalicious commands are noted with the \`⚠\` symbol\n\n**help** > displays all commands\n**info** > display bot information\n**restart** > restarts the bot\n**ping** > displays the bot ping\n**${self.config.prefix}** > purges your messages \`${self.config.prefix + self.config.prefix} 5 or ${self.config.prefix + self.config.prefix}\`\n**${self.config.prefix + self.config.prefix}** \`⚠\` > purges all messages \`${self.config.prefix + self.config.prefix + self.config.prefix} 5 or ${self.config.prefix + self.config.prefix + self.config.prefix}\`\n**kick** > kicks a member \`${self.config.prefix}kick @user/user\`\n**ban** > bans a member \`${self.config.prefix}ban @user/user\`\n**mkick** \`⚠\` > kicks all members possible\n**nick** > sets nickname\n**cnick** > cycles through nicknames\n**avi** > dumps a users avatar \`${self.config.prefix}avi @user/user\`\n**avatar** > set your avatar \`${self.config.prefix}avatar https://example.com/image.png\`\n**game** > sets custom playing game \`${self.config.prefix}game example\`\n**stream** > sets custom stream \`${self.config.prefix}stream example\`\n**time** > displays the time\n**gtime** > sets the current time as playing game\n**stime** > sets the current time as stream\n**cmusic** > displays current song\n**gmusic** > sets current song as playing game\n**members** \`⚠\` > tags all server members\n**me** > embed quoter\n**tweet** > post a tweet\n**translate** > translate text \`${this.config.prefix}translate *language* *text*\`\n**btc** > displays btc price\n**ph** > tatsumaki point hoarder \`wonderland server only\`\n**sm** > displays social medias\n**crole** > cycle a specific role colour\n**cap** > caps the first letter of words`,
    color: 16777215,
    footer: {
    icon_url: "https://i.imgur.com/RmDcNyZ.png",
    text: "cranium"
    }
  })}
)}