#!/usr/bin/env node

const program = require('commander')
const axios = require('axios')
const ncp = require('copy-paste')
const chalk = require('chalk')

program
    .action(url => {
        axios.post('https://gosmlr.xyz', { url })
        .then(res => {
            return res.data
        })
        .then(json => {
            ncp.copy(json.shortUrl)
            
            console.log(`\n${chalk.green(json.shortUrl)} was copied to your clipboard! 🐶`)
            console.log(chalk.blue(json.count) + ' urls have been made smaller!')
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
    .parse(process.argv)
