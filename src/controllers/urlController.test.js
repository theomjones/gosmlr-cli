const Controller = require('./urlController')

const testUrl = 'theomjones.com'

test('basic controller tests', async () => {
  const url = new Controller(testUrl)
  expect(url).toBeInstanceOf(Controller)

  const response = await url.post()
  expect(response).toBeDefined()
  expect(response.result).toMatchObject({
    shortUrl: 'gosmlr.xyz/ig',
    count: '2',
    longUrl: testUrl
  })
})
