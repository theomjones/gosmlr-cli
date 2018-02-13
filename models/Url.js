const db = require('../db/db')

class Url {
    constructor (urlObj) {
        this.db = db
        this.shortUrl = urlObj.shortUrl
        this.longUrl = urlObj.longUrl
        this.created = new Date()
        this.db.defaults({
            urls: []
        }).write()
    }

    save () {
        this.db.get('urls')
            .push({ shortUrl: this.shortUrl, longUrl: this.longUrl, created: this.created })
            .write()
    }

    read () {
        const urls = this.db.get('urls').value()
        return urls
    }

    clear () {
        this.db.get('urls')
            .remove()
            .write()
    }

}

module.exports = Url