/* 
evans selfbot ~ https://github.com/skull
*/
const moment = require('moment')
const chalk = require('chalk')
const status = {
  online: `${chalk.green('"online"')}`,
  idle: `${chalk.white('"idle"')}`,
  dnd: `${chalk.red('"dnd"')}`,
  invisible: '"invisible"'
}

function configErr (text) {
  console.error(`\n[${chalk.black(moment().format('H:mm:ss'))}]${chalk.bgRed.bold(' config error ')} ${text}\n`)
  process.exit()
}

function logger (bg, title, text, timed = true) { console.log(`${timed ? `[${chalk.gray(moment().format('H:mm:ss'))}]` : ''}${chalk[bg].bold(` ${title} `)} ${text}`) }

module.exports = {
  log (text, title = 'log', bg = 'bgWhite', timed = false) { logger(bg, title, text, timed) },
  warn (text) { logger('bgWhite', 'warning', text) },
  err (err, title = 'bot') { logger('bgRed', `${title} error`, `\n${(err && err.stack) || err}`) },
  fs (text, title) { logger('bgWhite', title, text) },
  cmd (msg, self) {
    if (typeof msg === 'object') {
      const cleanMsg = msg.cleanContent.replace(/\n/g, ' ')
      if (msg.author.id !== self.user.id) return
      logger('bgWhite', 'msg', `|> ${chalk.black(msg.channel.guild ? msg.channel.guild.name : 'in pms')}: ${cleanMsg}`)
    }
  },
  mention (msg) {
    if (typeof msg === 'object') {
      const cleanMsg = msg.cleanContent.replace(/\n/g, ' ')
      logger('grey', 'mention', `|> ${chalk.bgWhite(msg.channel.guild.name)}|> #${chalk.bgWhite(msg.channel.name)}|> ${msg.author.username} (${msg.author.id}):\n\n${cleanMsg}\n`)
    }
  },
  keyword (msg, word = '') {
    if (typeof msg === 'object') {
      const cleanMsg = msg.cleanContent.replace(/\n/g, ' ')
      logger('grey', `keyword mention: "${word}"`, `|> ${chalk.bgWhite(msg.channel.guild.name)}|> #${chalk.bgWhite(msg.channel.name)}|> ${msg.author.username} (${msg.author.id}):\n\n${cleanMsg}\n`)
    }
  },
  ready (self, config) {
    if (self.user.id !== config.ownerID) { configErr('owner id doesnt match user token') } else {
      console.log(chalk.gray([
        `\n${chalk.white('|')} started at ${chalk.white(moment(self.startTime).format('H:mm:ss'))}`,
        `${chalk.white('|')} logged in as ${chalk.white(self.user.username)}${chalk.white('#' + self.user.discriminator)}`,
        `${chalk.white('|')} your discord status is ${chalk.white(`${status[config.defaultStatus.toLowerCase()]}`)}\n`,
        `    - ${chalk.white(self.guilds.size)} servers (${chalk.white(Object.keys(self.channelGuildMap).length + ' channels')}) (${chalk.white(self.users.size + ' users')})`,
        `    - ${chalk.white(self.relationships.size)} friends (${chalk.white(self.relationships.filter(r => r.status !== 'offline').length + ' online')})\n`,
        `${chalk.white('|')} bot is ${chalk.white(`${self.shards.random().status}`)}`,
        `${chalk.white('|')} use ${chalk.white('control + c')} to exit\n`,
      ].join('\n')))
    }
  }
}
