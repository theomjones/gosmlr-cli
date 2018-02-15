const db = require('../db/db')

module.exports = () => {
  const urls = db.get('urls').value()
  return urls
}
