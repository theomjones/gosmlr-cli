const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const Url = require('./db')

const adapter = new FileSync('./Data/urls.json')
const db = low(adapter)

module.exports = db