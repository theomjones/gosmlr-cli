#!/usr/bin/env node

const program = require('commander')
const axios = require('axios')
const ncp = require('copy-paste')
const chalk = require('chalk')
const urlController = require('./Controllers/UrlController')

const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm

program
    .option('-l --list', '<long_url> [--list] --- List your recent urls.', program)
    .option('-C --clear', 'list [--clear] --- Clear your recent urls.')

program
    .version('0.2.2')
    .action(url => {
        if (url.search(regex) !== 0) {return console.log('\nERROR: ' + chalk.magenta(url) + chalk.red(' is not a valid url.'))}
        axios.post('https://gosmlr.xyz', { url })
        .then(res => {
            return res.data
        })
        .then(json => {
            ncp.copy(json.shortUrl)
            urlController.add({ shortUrl: json.shortUrl, longUrl: json.longUrl })
            console.log(`\n${chalk.green(json.shortUrl)} was copied to your clipboard! 🐶`)
            console.log(chalk.blue(json.count) + ' urls have been made smaller!')
            if (program.list) {
                urlController.list()
            }
        })
        .catch((e) => {
            if (e.code === "ENOTFOUND") {
                console.log(chalk.red("\nWe could not process your request.\n"))
                console.log(e.message)
            } else {
                console.log(e)
            }
        })

        console.log('')
    })

program
    .command('list')
    .option('-C --clear')
    .action(() => {
        if (program.clear) {
            urlController.clear()
        } else {
            urlController.list()
        }
    })
    
program.parse(process.argv)