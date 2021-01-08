/* 
nakinami selfbot ~ https://github.com/nakinami
*/
const Eris = require('eris')
const path = require('path')
const fs = require('fs')

const configValidator = require('./src/utils/configvalidator.js')
const constants = require('./src/utils/constants.js')
const log = require('./src/plugins/logger.js')

const config = require('./config/config.json')
const secrets = require('./config/secrets.json')
const nick = require('./config/nick.json')

const Command = require('./src/command.js')

// Check if config is valid
configValidator.check(config, log)

// Setup discord client
const self = new Eris(config.token)
let isReady = false 

// Pass config and constants to self
self.constants = constants
self.config = config
self.secrets = secrets
self.log = log

const counts = {
  msgsGot: 0,
  msgsSent: 0,
  mentionsGot: 0,
  keywordsGot: 0
}

const commands = {
  main: {},
  aliases: {}
}

// Register Command Function
self.registerCommand = function (name, generator, options) {
  if (!name) {
    throw new Error('you must specify a name for the command')
  }
  if (name.includes(' ')) {
    throw new Error('command names cannot contain spaces')
  }
  if (commands.main[name]) {
    throw new Error('you have already registered a command for ' + name)
  }
  options = options || {}
  name = name.toLowerCase()
  commands.main[name] = new Command(self, name, generator, options)
  if (options.aliases && options.aliases.length > 0) {
    options.aliases.forEach((alias) => {
      commands.aliases[alias] = name
    })
  }
  return commands.main[name]
}

self.on('messageCreate', (msg) => {
  counts.msgsGot = counts.msgsGot + 1
  if (!isReady || !msg.author) return
  // Only reply to owner
  if (msg.author.id !== self.user.id) return
  // Get prefix and check for it
  const prefix = self.config.prefix.replace(/@mention/g, self.user.mention)
  if (msg.content.replace(/<@!/g, '<@').startsWith(prefix)) {
    // Only if isnt empty command
    if (msg.content.length === prefix.length) return

    // Get trigger and args
    const args = msg.content.replace(/<@!/g, '<@').substring(prefix.length).split(' ')
    let trigger = args.shift().toLowerCase()
    trigger = commands.aliases[trigger] || trigger

    // Get command and run it
    const command = commands.main[trigger]
    if (command !== undefined) {
      log.cmd(msg, self)
      setTimeout(() => self.deleteMessage(msg.channel.id, msg.id), 750)
      command.process(msg, args)
    }
    return
  }
  return
})

// Event handling
self.on('warn', (msg) => { if (msg.includes('authentication')) { log.warn(msg) } })
self.on('error', (err) => log.err(err, 'bot'))
self.on('disconnect', () => log.log('disconnected from discord', 'disconnect'))

// Load command files
let cmds = {} // eslint-disable-line
fs.readdir(path.join(__dirname, 'commands/'), (err, files) => {
  log.fs(`loading ${files.length} command files...`, 'cmds')
  if (err) return log.err(err, 'command directory reading')
  if (!files) { log.err('no command files.', 'command directory reading') } else {
    for (let command of files) {
      if (path.extname(command) !== '.js') continue
      cmds = require(`./commands/${command}`)(self)
    }
    log.fs('finished.', 'cmds')
  }
})

// On ready
self.on('ready', () => {
  isReady = true
  self.commands = commands
  self.counts = counts
  log.ready(self, config)
})

require('./src/plugins/mentionstalker.js')(self, log, config)

require('./src/plugins/keywordlogger.js')(self, log, config)

self.connect().catch(err => log.err(err, 'login'))

process.on('SIGINT', () => { self.disconnect({reconnect: false}); setTimeout(() => process.exit(0), 1000) })

process.on('unhandledRejection', (err) => log.err(err, 'unknown / unhandled error'))
