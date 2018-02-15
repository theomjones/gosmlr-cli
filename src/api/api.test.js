const { postUrl } = require('./api')

const urlToSend = 'theomjones.com'

test('should get response', async () => {
  const urlObj = await postUrl(urlToSend)
  expect(urlObj).toHaveProperty('shortUrl')
  expect(urlObj).toHaveProperty('longUrl')
  expect(urlObj).toHaveProperty('count')
  expect(urlObj.longUrl).toEqual(urlToSend)


})
