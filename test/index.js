import {exec} from 'node:child_process'
import fs from 'node:fs'
import {URL} from 'node:url'
import {PassThrough} from 'node:stream'
import test from 'tape'
import {syllable} from '../index.js'

var own = {}.hasOwnProperty

/** @type {Object.<string, unknown>} */
var pack = JSON.parse(
  String(fs.readFileSync(new URL('../package.json', import.meta.url)))
)

/** @type {Object.<string, number>} */
var fixtures = JSON.parse(
  String(fs.readFileSync(new URL('fixture.json', import.meta.url)))
)

test('api', function (t) {
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
    ['real', 'deal', 'really'].map((d) => syllable(d)),
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
    ].map((d) => syllable(d)),
    [1, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 2, 3],
    'GH-32 (awe)'
  )

  t.deepEqual(
    [
      'communion',
      'contagion',
      'decision',
      'division',
      'erosion',
      'occasion',
      'opinion',
      'religion',
      'reunion',
      'bunion',
      'fission',
      'fusion',
      'mission',
      'nation',
      'onion',
      'passion',
      'region',
      'session',
      'union',
      'version',
      'vision'
    ].map((d) => syllable(d)),
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    'GH-36 ([gnst]ion$)'
  )

  t.deepEqual(
    [
      'anybody',
      'anymore',
      'anyone',
      'anyones',
      'anyplace',
      'anything',
      'anythings',
      'anytime',
      'anyway',
      'anyways',
      'anywhere'
    ].map((d) => syllable(d)),
    [4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    'GH-36 ^any'
  )

  t.deepEqual(
    [
      'anyone',
      'everyone',
      'alone',
      'lonely',
      'ozone',
      'one',
      'bone',
      'phone'
    ].map((d) => syllable(d)),
    [3, 3, 2, 2, 2, 1, 1, 1],
    'GH-36 one$'
  )

  t.deepEqual(
    [
      'embodying',
      'annoying',
      'buoying',
      'busying',
      'envying',
      'jurying',
      'nosying',
      'obeying',
      'pitying',
      'untying',
      'braying',
      'buying',
      'cloying',
      'crying',
      'drying',
      'dying',
      'eying',
      'eyeing',
      'flying',
      'lying',
      'paying',
      'plying',
      'saying',
      'spraying',
      'toying',
      'trying',
      'tying',
      'vying',
      'ying'
    ].map((d) => syllable(d)),
    [
      4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 1
    ],
    'GH-37 (ying$)'
  )

  t.deepEqual(
    [
      'shreds',
      'shredded',
      'shredder',
      'shredders',
      'shredding',
      'shredless'
    ].map((d) => syllable(d)),
    [1, 2, 2, 2, 2, 2],
    'GH-37 shredless'
  )

  t.deepEqual(
    [
      'monotheist',
      'monotheists',
      'monotheistic',
      'polytheist',
      'polytheists',
      'polytheistic',
      'atheist',
      'atheists',
      'atheistic',
      'pantheist',
      'pantheists',
      'pantheistic',
      'deist',
      'deists',
      'deistic',
      'theist',
      'theists',
      'theistic',
      'heist'
    ].map((d) => syllable(d)),
    [4, 4, 5, 4, 4, 5, 3, 3, 4, 3, 3, 4, 2, 2, 3, 2, 2, 3, 1],
    'GH-37 (th|d)iest(s|ic)?)'
  )

  t.deepEqual(
    [
      'reminiscense',
      'commonsense',
      'innocense',
      'recompense',
      'condense',
      'defense',
      'dispense',
      'expanse',
      'expense',
      'immense',
      'intense',
      'license',
      'mouthrinse',
      'nonsense',
      'offense',
      'pretense',
      'response',
      'suspense',
      'cleanse',
      'dense',
      'rinse',
      'sense',
      'tense'
    ].map((d) => syllable(d)),
    [4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
    'GH-39 ([aeiouy]nse$)'
  )

  t.end()
})

test('cli', function (t) {
  var input = new PassThrough()

  t.plan(8)

  exec('./cli.js syllables', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '3\n', ''], 'one')
  })

  exec('./cli.js syllables unicorns', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '6\n', ''], 'two')
  })

  exec('./cli.js ""', function (error, stdout, stderr) {
    t.deepEqual(
      [Boolean(error), stdout, /Usage: syllable/.test(stderr)],
      [true, '', true],
      'no arguments'
    )
  })

  var subprocess = exec('./cli.js', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '6\n', ''], 'stdin')
  })

  input.pipe(subprocess.stdin)
  input.write('syllab')
  setImmediate(function () {
    input.write('les uni')
    setImmediate(function () {
      input.end('corns')
    })
  })

  exec('./cli.js -h', function (error, stdout, stderr) {
    t.deepEqual(
      [error, /\sUsage: syllable/.test(stdout), stderr],
      [null, true, ''],
      '-h'
    )
  })

  exec('./cli.js --help', function (error, stdout, stderr) {
    t.deepEqual(
      [error, /\sUsage: syllable/.test(stdout), stderr],
      [null, true, ''],
      '--help'
    )
  })

  exec('./cli.js -v', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, pack.version + '\n', ''], '-v')
  })

  exec('./cli.js --version', function (error, stdout, stderr) {
    t.deepEqual(
      [error, stdout, stderr],
      [null, pack.version + '\n', ''],
      '--version'
    )
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
test('fixtures', function (t) {
  var overwrite = {
    // GH-22: <https://github.com/words/syllable/issues/22>,
    // Barbed is one syllable as well:
    // <https://www.howmanysyllables.com/words/barbed>
    arbed: 1
  }
  /** @type {string} */
  var key
  /** @type {number} */
  var expected

  for (key in fixtures) {
    if (own.call(fixtures, key)) {
      expected = (key in overwrite ? overwrite : fixtures)[key]
      t.equal(syllable(key), expected, key)
    }
  }

  t.end()
})
