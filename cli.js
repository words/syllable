#!/usr/bin/env node
import fs from 'fs'
import {URL} from 'url'
import {syllable} from './index.js'

/** @type {Object.<string, unknown>} */
var pack = JSON.parse(
  String(fs.readFileSync(new URL('./package.json', import.meta.url)))
)

var argv = process.argv.slice(2)

var command = pack.name

if (argv.includes('--help') || argv.includes('-h')) {
  console.log(help())
} else if (argv.includes('--version') || argv.includes('-v')) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', getSyllables)
} else {
  getSyllables(argv.join(' '))
}

/**
 * @param {string} value
 */
function getSyllables(value) {
  var values = value
    .split(/\s+/g)
    .map((/** @type {string} */ d) => d.trim())
    .filter(Boolean)

  if (values.length === 0) {
    process.stderr.write(help())
    process.exit(1)
  } else {
    console.log(syllables(values))
  }
}

/**
 * @param {Array.<string>} values
 */
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
