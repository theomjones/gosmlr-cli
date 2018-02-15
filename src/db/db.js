const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')

const adapter = new FileSync(path.join(__dirname, '/urls.json'))
const db = low(adapter)

db.defaults({
  urls: []
}).write()

module.exports = db
