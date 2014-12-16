#!/usr/bin/env node
'use strict';

/*
 * Dependencies.
 */

var syllable,
    pack;

syllable = require('./');
pack = require('./package.json');

/*
 * Arguments.
 */

var argv;

argv = process.argv.slice(2);

/*
 * Command.
 */

var command;

command = Object.keys(pack.bin)[0];

/**
 * Help.
 */
function help() {
    return [
        '',
        'Usage: ' + command + ' [options] words...',
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
        '# output syllables for words',
        '$ ' + command + ' syllable unicorn',
        '# 6',
        '',
        '# output syllables for words from stdin',
        '$ echo "syllable unicorn banana" | ' + command,
        '# 9'
    ].join('\n  ') + '\n';
}

/**
 * Add `a` to `b`.
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function sum(a, b) {
    return a + b;
}

/**
 * Get the syllables of a list of words.
 *
 * @param {Array.<string>} values
 */
function getSyllables(values) {
    if (values.length) {
        console.log(values.map(syllable).reduce(sum));
    } else {
        process.stderr.write(help());
        process.exit(1);
    }
}

/*
 * Program.
 */

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
} else if (argv[0]) {
    getSyllables(argv.join(' ').split(/\s+/g));
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        getSyllables(data.trim().split(/\s+/g));
    });
}
