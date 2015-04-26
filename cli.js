#!/usr/bin/env node
'use strict';

/* eslint-disable no-process-exit */

/*
 * Dependencies.
 */

var syllable = require('./');
var pack = require('./package.json');

/*
 * Detect if a value is expected to be piped in.
 */

var expextPipeIn = !process.stdin.isTTY;

/*
 * Arguments.
 */

var argv = process.argv.slice(2);

/*
 * Command.
 */

var command = Object.keys(pack.bin)[0];

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
 * Get the syllables for multiple words.
 *
 * @param {Array.<string>} values
 * @return {number}
 */
function syllables(values) {
    return values.map(syllable).reduce(sum);
}

/**
 * Help.
 *
 * @return {string}
 */
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

/**
 * Get the syllables in a document.
 *
 * @param {string?} value
 */
function getSyllables(value) {
    if (value) {
        console.log(syllables(value.split(/\s+/g)));
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
} else if (argv.length) {
    getSyllables(argv.join(' '));
} else if (!expextPipeIn) {
    getSyllables();
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        getSyllables(data.trim());
    });
}
