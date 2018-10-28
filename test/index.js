'use strict'

var Stream = require('stream').PassThrough
var test = require('tape')
var execa = require('execa')
var fixtures = require('./fixture.json')
var pack = require('../package.json')
var syllable = require('..')

test('api', function(t) {
  var result = syllable('syllables')

  t.equal(syllable('SYLLABLES'), result, 'should be case insensitive (1)')
  t.equal(syllable('SyLlABlEs'), result, 'should be case insensitive (2)')

  t.equal(syllable(''), 0, 'should return `0` when empty')

  t.equal(syllable('syllables'), 3, 'should work (1)')
  t.equal(syllable('hoopty'), 2, 'should work (2)')
  t.equal(syllable('mmmm'), 1, 'should work (3)')
  t.equal(syllable('am'), 1, 'should work (4)')

  t.equal(syllable('wine'), 1, 'should support multiple word-parts (1)')
  t.equal(syllable('bottle'), 2, 'should support multiple word-parts (2)')
  t.equal(syllable('wine-bottle'), 3, 'should support multiple word-parts (3)')

  t.equal(
    syllable('Zoe'),
    syllable('Zoë'),
    'should support non-ascii characters (1)'
  )
  t.equal(
    syllable('Åland'),
    syllable('Aland'),
    'should support non-ascii characters (2)'
  )

  t.end()
})

test('cli', function(t) {
  var help = ['-h', '--help']
  var version = ['-v', '--version']
  var stream

  t.plan(10)

  execa('./cli.js', ['syllables']).then(function(result) {
    t.equal(result.stdout, '3', 'Should accept an argument')
  }, t.ifErr)

  execa('./cli.js', ['syllables', 'unicorns']).then(function(result) {
    t.equal(result.stdout, '6', 'Should accept arguments')
  }, t.ifErr)

  execa('./cli.js', ['syllables unicorns']).then(function(result) {
    t.equal(result.stdout, '6', 'Should accept values')
  }, t.ifErr)

  execa('./cli.js', ['  ']).then(
    function() {},
    function(err) {
      t.equal(err.code, 1, 'should exit with `1` without input')
      t.ok(
        /\s*Usage: syllable \[options] <words...>/.test(err.stderr),
        'Should emit the help message'
      )
    }
  )

  help.forEach(function(flag) {
    execa('./cli.js', [flag]).then(function(result) {
      t.ok(
        /\s*Usage: syllable \[options] <words...>/.test(result.stdout),
        'Should accept `' + flag + '`'
      )
    }, t.ifErr)
  })

  version.forEach(function(flag) {
    execa('./cli.js', [flag]).then(function(result) {
      t.equal(result.stdout, pack.version, 'Should accept `' + flag + '`')
    }, t.ifErr)
  })

  stream = new Stream()

  execa('./cli.js', {input: stream}).then(function(result) {
    t.equal(result.stdout, '6', 'Should accept stdin')
  }, t.ifErr)

  setImmediate(function() {
    stream.write('syllab')

    setImmediate(function() {
      stream.write('les uni')

      setImmediate(function() {
        stream.end('corns')
      })
    })
  })
})

// Fixtures.
//
// The unit tests include in- and output values provided by the original, and
// ancestor source code.
//
// The tests by Text-Statistics:
// <https://github.com/DaveChild/Text-Statistics>
//
// This library focusses on the required Text-Statistics tests (the library
// provides both optional and required tests).
test('fixtures', function(t) {
  var key
  var expected
  var overwrite = {
    // GH-22: <https://github.com/words/syllable/issues/22>,
    // Barbed is one syllable as well:
    // <https://www.howmanysyllables.com/words/barbed>
    arbed: 1
  }

  for (key in fixtures) {
    expected = (key in overwrite ? overwrite : fixtures)[key]
    t.equal(syllable(key), expected, key)
  }

  t.end()
})
