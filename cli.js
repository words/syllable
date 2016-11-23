#!/usr/bin/env node
'use strict';

/* eslint-disable no-process-exit */

/* Dependencies. */
var trim = require('trim');
var pack = require('./package.json');
var syllable = require('./');

/* Arguments. */
var argv = process.argv.slice(2);

/* Command. */
var command = pack.name;

/* Program. */
if (
  argv.indexOf('--help') !== -1 ||
  argv.indexOf('-h') !== -1
) {
  console.log(help());
} else if (
  argv.indexOf('--version') !== -1 ||
  argv.indexOf('-v') !== -1
) {
  console.log(pack.version);
} else if (argv.length) {
  getSyllables(argv.join(' '));
} else {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (data) {
    getSyllables(data);
  });
}

/* Get the syllables in a document. */
function getSyllables(value) {
  value = value.split(/\s+/g).map(trim).filter(Boolean);

  if (value.length) {
    console.log(syllables(value));
  } else {
    process.stderr.write(help());
    process.exit(1);
  }
}

/* Get the syllables for multiple words. */
function syllables(values) {
  return values.map(syllable).reduce(sum);
}

/* Help. */
function help() {
  return [
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
  ].join('\n  ') + '\n';
}

/* Add `a` to `b`. */
function sum(a, b) {
  return a + b;
}
