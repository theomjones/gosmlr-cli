#!/usr/bin/env node

const program = require('commander')
const axios = require('axios')
const ncp = require('copy-paste')
const chalk = require('chalk')
const urlController = require('./Controllers/UrlController')


program
    .option('-l --list', 'List your recent links.')
    .option('-C --clear')

program
    .action(url => {
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
    .action(() => {
        if (program.clear) {
            urlController.clear()
        } else {
            urlController.list()
        }
    })
    
program.parse(process.argv)