const db = require('../db/db')

module.exports = () => {
  db.get('urls')
    .remove()
    .write()
}
