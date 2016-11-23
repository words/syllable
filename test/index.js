/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module syllable
 * @fileoverview Test suite for `syllable`.
 */

'use strict';

/* Dependencies. */
var Stream = require('stream').PassThrough;
var test = require('tape');
var execa = require('execa');
var fixtures = require('./fixture.json');
var pack = require('../package.json');
var syllable = require('..');

/* Tests. */
test('api', function (t) {
  var result = syllable('syllables');

  t.equal(syllable('SYLLABLES'), result, 'should be case insensitive (1)');
  t.equal(syllable('SyLlABlEs'), result, 'should be case insensitive (2)');

  t.equal(syllable(''), 0, 'should return `0` when empty');

  t.equal(syllable('syllables'), 3, 'should work (1)');
  t.equal(syllable('hoopty'), 2, 'should work (2)');
  t.equal(syllable('mmmm'), 1, 'should work (3)');
  t.equal(syllable('am'), 1, 'should work (4)');

  t.end();
});

/* CLI. */
test('cli', function (t) {
  var stream;

  t.plan(10);

  execa('./cli.js', ['syllables']).then(function (result) {
    t.equal(result.stdout, '3', 'Should accept an argument');
  }, t.ifErr);

  execa('./cli.js', ['syllables', 'unicorns']).then(function (result) {
    t.equal(result.stdout, '6', 'Should accept arguments');
  }, t.ifErr);

  execa('./cli.js', ['syllables unicorns']).then(function (result) {
    t.equal(result.stdout, '6', 'Should accept values');
  }, t.ifErr);

  execa('./cli.js', ['  ']).then(function () {}, function (err) {
    t.equal(err.code, 1, 'should exit with `1` without input');
    t.ok(
      /\s*Usage: syllable \[options] <words...>/.test(err.stderr),
      'Should emit the help message'
    );
  });

  ['-h', '--help'].forEach(function (flag) {
    execa('./cli.js', [flag]).then(function (result) {
      t.ok(
        /\s*Usage: syllable \[options] <words...>/.test(result.stdout),
        'Should accept `' + flag + '`'
      );
    }, t.ifErr);
  });

  ['-v', '--version'].forEach(function (flag) {
    execa('./cli.js', [flag]).then(function (result) {
      t.equal(
        result.stdout,
        pack.version,
        'Should accept `' + flag + '`'
      );
    }, t.ifErr);
  });

  stream = new Stream();

  execa('./cli.js', {input: stream}).then(function (result) {
    t.equal(result.stdout, '6', 'Should accept stdin');
  }, t.ifErr);

  setImmediate(function () {
    stream.write('syllab');

    setImmediate(function () {
      stream.write('les uni');

      setImmediate(function () {
        stream.end('corns');
      });
    });
  });

  // execa('./cli.js').then(function () {
  //   console.log('res: ', err);
  // }, function (err) {
  //   console.log('err: ', err);
  // });
});

/* Fixtures.
 *
 * The unit tests include in- and output values provided by the original,
 * and ancestor source code.
 *
 * The only test provided by the original code:
 *   http://search.cpan.org/~gregfast/Lingua-EN-Syllable-0.251/
 *   Syllable.pm
 *
 * The test provided by Text-Statistics:
 *   https://github.com/DaveChild/Text-Statistics
 *
 * This library focusses on the required Text-Statistics tests (the
 * library provides both optional and required tests). */
test('fixtures', function (t) {
  var key;

  for (key in fixtures) {
    t.equal(syllable(key), fixtures[key], key);
  }

  t.end();
});
