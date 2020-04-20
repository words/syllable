'use strict'

var exec = require('child_process').exec
var PassThrough = require('stream').PassThrough
var test = require('tape')
var version = require('../package.json').version
var fixtures = require('./fixture.json')
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

  t.equal(syllable('Snuffleupagus'), 5, 'GH-25 (snuffleupagus)')
  t.equal(syllable('queue'), 1, 'GH-26 (queue)')

  t.deepEqual(
    ['real', 'deal', 'really'].map(syllable),
    [1, 1, 2],
    'GH-31 (real/deal/really)'
  )

  t.deepEqual(
    [
      'awe',
      'awearied',
      'aweary',
      'aweather',
      'aweband',
      'awedness',
      'awee',
      'aweek',
      'aweel',
      'aweigh',
      'awesome',
      'awesomely',
      'awesomeness',
      'awest',
      'aweto'
    ].map(syllable),
    [1, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 2, 3],
    'GH-32 (awe)'
  )

  t.deepEqual(
    ['expanse', 'tense', 'expense', 'rinse', 'response'].map(syllable),
    [2, 1, 2, 1, 2],
    'GH-39 ([aeiouy]nse$)'
  )

  t.end()
})

test('cli', function(t) {
  var input = new PassThrough()
  var helps = ['-h', '--help']
  var versions = ['-v', '--version']

  t.plan(8)

  exec('./cli.js syllables', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, '3\n', ''], 'one')
  })

  exec('./cli.js syllables unicorns', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, '6\n', ''], 'two')
  })

  exec('./cli.js ""', function(err, stdout, stderr) {
    t.deepEqual(
      [Boolean(err), stdout, /Usage: syllable/.test(stderr)],
      [true, '', true],
      'no arguments'
    )
  })

  var subprocess = exec('./cli.js', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, '6\n', ''], 'stdin')
  })

  input.pipe(subprocess.stdin)
  input.write('syllab')
  setImmediate(function() {
    input.write('les uni')
    setImmediate(function() {
      input.end('corns')
    })
  })

  helps.forEach(function(flag) {
    exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual(
        [err, /\sUsage: syllable/.test(stdout), stderr],
        [null, true, ''],
        flag
      )
    })
  })

  versions.forEach(function(flag) {
    exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual([err, stdout, stderr], [null, version + '\n', ''], flag)
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
