# gosmlr

[![npm version](https://badge.fury.io/js/gosmlr.svg)](https://badge.fury.io/js/gosmlr)
![Dependencies](https://david-dm.org/theomjones/gosmlr-cli.svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


A tiny command-line interface for [gosmlr.xyz](https://gosmlr.xyz) – a url shortening micro service.

## Installation

**With NPM**

``` bash
npm install gosmlr -g
```

**With Yarn**

``` bash
yarn global add gosmlr
```

## Usage

Simply pass in your long url as an argument to the `gosmlr` command

``` bash
gosmlr your-reallyl-long-url.com/long-urls/feb-18/3487789

gosmlr --list # Shortens & displays a list of recent urls.
```

The `--list` (`-l`) option will display a list of your recent urls after your link is shortened.

> gosmlr accepts urls with or without the protocol.

---

### List


```bash
gosmlr list # Prints a list of your most recent urls.
gosmlr list --clear # Clears your recents list.
```

![Hyper screenshot](https://theomjonesimg.s3.amazonaws.com/screencap.png)
