#!/usr/bin/env node

const program = require('commander')
const fetch = require('node-fetch')
const ncp = require('copy-paste')
const chalk = require('chalk')

program
    .option('-t, --total', 'Get total urls shortened')
    .action(url => {
        fetch('https://gosmlr.xyz', { method: 'POST', body: JSON.stringify({ url }) })
        .then(res => res.json())
        .then(json => {
            ncp.copy(json.shortUrl)
            console.log(`\n${chalk.green(json.shortUrl)} was copied to your clipboard! 🕸`)
            if (program.total) {
                fetch('https://gosmlr.xyz')
                .then((res) => {
                    return res.json()
                })
                .then((json) => {
                    console.log('Total urls Shortened:', chalk.blue(json.total))
                })
                .catch((e) => {
                    console.log('Could not fetch total.', e)
                })
            }
        })
        .catch((e) => {
            if (e.code === "ENOTFOUND") {
                console.log(chalk.red("\nWe could not process your request.\n"))
                console.log(e.message)
            } else {
                console.log(e.FetchError)
            }
        })
        console.log('')
    })
    .parse(process.argv)
