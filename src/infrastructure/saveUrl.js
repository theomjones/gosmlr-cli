const db = require('../db/db')

module.exports = (urlObj) => {
  try {
    db.get('urls')
      .push({
        shortUrl: 'urlObj.shortUrl',
        longUrl: urlObj.longUrl,
        created: new Date().toLocaleString()
      })
      .write()
  } catch (e) {
    throw e
  }
}
