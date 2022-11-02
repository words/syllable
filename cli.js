#!/usr/bin/env node
import fs from 'node:fs'
import process from 'node:process'
import {URL} from 'node:url'
import {syllable} from './index.js'

/** @type {Record<string, unknown>} */
const pack = JSON.parse(
  String(fs.readFileSync(new URL('package.json', import.meta.url)))
)

const argv = process.argv.slice(2)

const command = pack.name

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
  const values = value
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
 * @param {Array<string>} values
 */
function syllables(values) {
  let sum = 0
  let index = -1

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
