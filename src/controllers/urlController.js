const api = require('../api/api')
const log = require('../log/log')
const ncp = require('copy-paste')
const saveUrl = require('../infrastructure/saveUrl')
const clearUrl = require('../infrastructure/clearUrls')
const getUrls = require('../infrastructure/getUrls')

class Url {
  constructor (url) {
    this.url = url
    this.validateUrl()
    this.timer = process.hrtime()
  }

  validateUrl () {
    const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
    if (this.url.search(regex) !== 0) {
      log.error(`${this.url} is not a valid url.`, '', 'both')
      throw new Error('Invalid url')
    }
    return this
  }

  async post () {
    const res = await api.postUrl(this.url)
    this.result = res
    return this
  }

  copy () {
    ncp.copy(this.result.shortUrl)
  }

  print () {
    log.success(this.result.shortUrl, 'was copied to your clipboard! 🐶', 'top')
    log.blue(this.result.count, 'urls have been shortened so far!')
    log.magenta(`${Math.floor(process.hrtime(this.timer)[1] / 1000000)}ms`, '', 'bottom')
  }

  save () {
    saveUrl(this.result)
  }

  list () {
    const urls = getUrls()
    if (urls.length < 1) {
      return log.error('You have no recent urls.', '', 'both')
    }
    log.magenta('Recents', '', 'top')
    console.log('---------\n')
    urls.forEach(url => {
      log.blue(url.shortUrl, `--> ${url.longUrl}`)
    })
  }

  clear () {
    clearUrl()
    log.success('Recents cleared!', '', 'both')
  }
}

module.exports = Url
