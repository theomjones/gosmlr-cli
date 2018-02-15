const chalk = require('chalk')

class Message {
  constructor (type) {
    this.type = type
  }

  log (msg, args, pad) {
    if (pad === 'top' || pad === 'both') console.log('')
    console.log(this.type(msg), args)
    if (pad === 'bottom' || pad === 'both') console.log('')
    return this
  }
}

module.exports = {
  success: (msg, args, pad) => new Message(chalk.green).log(msg, args, pad),
  error: (msg, args, pad) => new Message(chalk.red).log(msg, args, pad),
  blue: (msg, args, pad) => new Message(chalk.blue).log(msg, args, pad),
  magenta: (msg, args, pad) => new Message(chalk.magenta).log(msg, args, pad)
}
