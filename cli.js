#!/usr/bin/env node
'use strict'

var pack = require('./package.json')
var syllable = require('.')

var argv = process.argv.slice(2)

var command = pack.name

if (argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1) {
  console.log(help())
} else if (argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', getSyllables)
} else {
  getSyllables(argv.join(' '))
}

function getSyllables(value) {
  value = value
    .split(/\s+/g)
    .map((d) => d.trim())
    .filter(Boolean)

  if (value.length === 0) {
    process.stderr.write(help())
    process.exit(1)
  } else {
    console.log(syllables(value))
  }
}

function syllables(values) {
  var sum = 0
  var index = -1

  while (++index < values.length) {
    sum += syllable(values[index])
  }

  return sum
}

function help() {
  return (
    [
      '',
      'Usage: ' + command + ' [options] <words...>',
      '',
      pack.description,
      '',
      'Options:',
      '',
      '  -h, --help           output usage information',
      '  -v, --version        output version number',
      '',
      'Usage:',
      '',
      '# output syllables',
      '$ ' + command + ' syllable unicorn',
      '# ' + syllables(['syllable', 'unicorn']),
      '',
      '# output syllables from stdin',
      '$ echo "syllable unicorn banana" | ' + command,
      '# ' + syllables(['syllable', 'unicorn', 'banana']),
      ''
    ].join('\n  ') + '\n'
  )
}
