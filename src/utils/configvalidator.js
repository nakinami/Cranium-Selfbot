/*
evans selfbot ~ https://github.com/skull
*/
const moment = require('moment')
const chalk = require('chalk')
const status = {
  online: `${chalk.green('"online"')}`,
  idle: `${chalk.yellow('"idle"')}`,
  dnd: `${chalk.red('"dnd"')} (do not disturb)`,
  invisible: '"invisible"'
}

function Err (key, type = '') {
  if (type === 'bol') type = '(Must be either true or false)'
  console.error(`\n[${chalk.black(moment().format('H:mm:ss'))}]${chalk.bgWhite.bold(' config error ')} invalid ${key} \> ${type}\n`)
  process.exit()
}

module.exports.check = function (config, log) {
  log.log('checking config file...', 'config', 'bgWhite', true)
  if (config.token === '' || typeof config.token !== 'string') {
    Err('Token')
  } else if (!(/^\d{17,18}/.test(config.ownerID)) || typeof config.ownerID !== 'string') {
    Err('ownerID', 'Must be a string of your discord ID')
  } else if (config.prefix === '' || typeof config.prefix !== 'string') {
    Err('Prefix')
  } else if (typeof config.defaultStatus !== 'string' || Object.keys(status).indexOf(config.defaultStatus.toLowerCase()) < 0) {
    Err(`defaultStatus. Must be either:\n${Object.values(status).join(', ')}`)
  } else if (typeof config.mentionNotificator !== 'object') {
    Err('mentionNotificator', 'Must be an object with two options:\n\n"mentionNotificator": {\n  "inConsole": true,\n  "inNotificationChannel": true\n}')
  } else if (typeof config.mentionNotificator.inConsole !== 'boolean') {
    Err('mentionNotificator -> "inConsole"', 'bol')
  } else if (typeof config.mentionNotificator.inNotificationChannel !== 'boolean') {
    Err('mentionNotificator -> "inNotificationChannel"', 'bol')
  } else if (typeof config.mentionNotificator.logBlockedUsers !== 'boolean') {
    Err('mentionNotificator -> "logBlockedUsers"', 'bol')
  } else if (!Array.isArray(config.mentionNotificator.ignoredServers)) {
    Err('mentionNotificator -> "ignoredServers"', 'must be an array')
  } else if (typeof config.keywordNotificator !== 'object') {
    Err('keywordNotificator', 'Must be an object with two options:\n\n"keywordNotificator": {\n  "inConsole": true,\n  "inNotificationChannel": true\n}')
  } else if (typeof config.keywordNotificator.inConsole !== 'boolean') {
    Err('keywordNotificator -> "inConsole"', 'bol')
  } else if (typeof config.keywordNotificator.inNotificationChannel !== 'boolean') {
    Err('keywordNotificator -> "inNotificationChannel"', 'bol')
  } else if (typeof config.keywordNotificator.logBlockedUsers !== 'boolean') {
    Err('keywordNotificator -> "logBlockedUsers"', 'bol')
  } else if (typeof config.keywordNotificator.caseInsensitive !== 'boolean') {
    Err('keywordNotificator -> "caseInsensitive"', 'bol')
  } else if (!Array.isArray(config.keywordNotificator.ignoredServers)) {
    Err('keywordNotificator -> "ignoredServers"', 'must be an array')
  } else if (typeof config.eventNotificator !== 'object') {
    Err('eventNotificator', 'Must be an object with two options:\n\n"eventNotificator": {\n  "inConsole": true,\n  "inNotificationChannel": true\n}')
  } else if (typeof config.eventNotificator.inConsole !== 'boolean') {
    Err('eventNotificator -> "inConsole"', 'bol')
  } else if (typeof config.eventNotificator.inNotificationChannel !== 'boolean') {
    Err('eventNotificator -> "inNotificationChannel"', 'bol')
  } else if ((config.mentionNotificator.inNotificationChannel || config.eventNotificator.inNotificationChannel || config.keywordNotificator.inNotificationChannel) && !(/^\d{17,18}/.test(config.notificationChannelID))) {
    Err('notificationChannelID', 'must be a channel id from a server you are in')
  } else if (!/#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/i.test(config.defaultEmbedColor)) {
    Err('defaultEmbedColor', 'must be a valid or full hex color code')
  } else if (typeof config.deleteCommandMessages !== 'boolean') {
    Err('deleteCommandMessages', 'bol')
  } else if (config.deleteCommandMessages && isNaN(config.deleteCommandMessagesTime)) {
    Err('deleteCommandMessagesTime', 'Must be a integer number.')
  } else {
    log.log('config is valid. starting bot...', 'config', 'bgWhite', true)
  }
}
