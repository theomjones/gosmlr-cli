const program = require('commander')
const Url = require('./controllers/urlController')

program
  .option('-l --list', '<long_url> [--list] --- List your recent urls.', program)
  .option('-C --clear', 'list [--clear] --- Clear your recent urls.')
  .option('-v --verbose', 'Verbose error messages')

program
  .version('0.4.0')
  .action(async (input) => {
    try {
      const url = new Url(input)
      await url.post()
      url.save()
      url.copy()
      url.print()
      if (program.list) {
        url.list()
      }
    } catch (e) {
      if (program.verbose) {
        console.log(e)
      }
    }
  })

program
  .command('list')
  .option('-C --clear')
  .action(() => {
    const url = new Url('theomjones.com')
    if (program.clear) {
      url.clear()
    } else {
      url.list()
    }
  })

program.parse(process.argv)
