const fetch = require('node-fetch')

const apiUrl = process.env.URL || 'https://gosmlr.xyz'

module.exports = {
  async postUrl (url) {
    try {
      const body = JSON.stringify({ url })
      const options = {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
      }
      const res = await fetch(apiUrl, options)
      const json = await res.json()
      if (res.status !== 200) {
        throw new Error(json.message || 'Something went wrong. Please try again later.')
      }
      return json
    } catch (error) {
      throw error
    }
  }
}
