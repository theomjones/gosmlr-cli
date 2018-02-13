const Url = require('../models/Url')
const chalk = require('chalk')

module.exports = {
    list () {
        const urls = new Url({}).read()
        if (urls.length < 1) return console.log(chalk.red('\nYou have no recent urls.'))
        console.log(chalk.cyan('\nYour recent links'))
        console.log('-----------------\n')
        urls.forEach((url, i) => {
            console.log(`${chalk.blue('https://' + url.shortUrl)} -- ${chalk.magenta('http://' + url.longUrl)}`)
        })
    },
    add (urlObj) {
        const url = new Url({
            shortUrl: urlObj.shortUrl,
            longUrl: urlObj.longUrl
        })
        url.save()
    },
    clear () {
        new Url({}).clear()
        console.log(chalk.green('\nCleared recents.'))
    }
}