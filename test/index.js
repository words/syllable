import assert from 'node:assert/strict'
import cp from 'node:child_process'
import fs from 'node:fs'
import {URL} from 'node:url'
import util from 'node:util'
import {PassThrough} from 'node:stream'
import test from 'node:test'
import {syllable} from '../index.js'

const exec = util.promisify(cp.exec)

const own = {}.hasOwnProperty

/** @type {Record<string, unknown>} */
const pack = JSON.parse(
  String(fs.readFileSync(new URL('../package.json', import.meta.url)))
)

/** @type {Record<string, number>} */
const fixtures = JSON.parse(
  String(fs.readFileSync(new URL('fixture.json', import.meta.url)))
)

test('api', function () {
  const result = syllable('syllables')

  assert.equal(syllable('SYLLABLES'), result, 'should be case insensitive (1)')
  assert.equal(syllable('SyLlABlEs'), result, 'should be case insensitive (2)')

  assert.equal(syllable(''), 0, 'should return `0` when empty')

  assert.equal(syllable('syllables'), 3, 'should work (1)')
  assert.equal(syllable('hoopty'), 2, 'should work (2)')
  assert.equal(syllable('mmmm'), 1, 'should work (3)')
  assert.equal(syllable('am'), 1, 'should work (4)')

  assert.equal(syllable('wine'), 1, 'should support multiple word-parts (1)')
  assert.equal(syllable('bottle'), 2, 'should support multiple word-parts (2)')
  assert.equal(
    syllable('wine-bottle'),
    3,
    'should support multiple word-parts (3)'
  )

  assert.equal(
    syllable('Zoe'),
    syllable('Zoë'),
    'should support non-ascii characters (1)'
  )
  assert.equal(
    syllable('Åland'),
    syllable('Aland'),
    'should support non-ascii characters (2)'
  )

  assert.equal(syllable('Snuffleupagus'), 5, 'GH-25 (snuffleupagus)')
  assert.equal(syllable('queue'), 1, 'GH-26 (queue)')

  assert.deepEqual(
    ['real', 'deal', 'really'].map((d) => syllable(d)),
    [1, 1, 2],
    'GH-31 (real/deal/really)'
  )

  assert.deepEqual(
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

  assert.deepEqual(
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

  assert.deepEqual(
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

  assert.deepEqual(
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

  assert.deepEqual(
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

  assert.deepEqual(
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

  assert.deepEqual(
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

  assert.deepEqual(
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
})

test('cli', async function () {
  try {
    await exec('./cli.js ""')
    assert.fail('should not pass')
  } catch (error) {
    assert.ok(/Usage: syllable/.test(String(error)), 'not enough arguments')
  }

  assert.deepEqual(
    await exec('./cli.js syllables'),
    {stdout: '3\n', stderr: ''},
    'one'
  )

  assert.deepEqual(
    await exec('./cli.js syllables unicorns'),
    {stdout: '6\n', stderr: ''},
    'two'
  )

  await new Promise(function (resolve) {
    const input = new PassThrough()
    const subprocess = cp.exec('./cli.js', function (error, stdout, stderr) {
      assert.deepEqual([error, stdout, stderr], [null, '6\n', ''], 'stdin')
      setImmediate(resolve)
    })
    assert(subprocess.stdin, 'expected stdin on `subprocess`')
    input.pipe(subprocess.stdin)
    input.write('syllab')
    setImmediate(function () {
      input.write(' les uni')
      setImmediate(function () {
        input.end('corns')
      })
    })
  })

  const h = await exec('./cli.js -h')
  assert.ok(/\sUsage: syllable/.test(h.stdout), '-h')

  const help = await exec('./cli.js --help')
  assert.ok(/\sUsage: syllable/.test(help.stdout), '-h')

  assert.deepEqual(
    await exec('./cli.js -v'),
    {stdout: pack.version + '\n', stderr: ''},
    '-v'
  )

  assert.deepEqual(
    await exec('./cli.js --version'),
    {stdout: pack.version + '\n', stderr: ''},
    '--version'
  )
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
test('fixtures', function () {
  const overwrite = {
    // GH-22: <https://github.com/words/syllable/issues/22>,
    // Barbed is one syllable as well:
    // <https://www.howmanysyllables.com/words/barbed>
    arbed: 1
  }
  /** @type {string} */
  let key

  for (key in fixtures) {
    if (own.call(fixtures, key)) {
      const expected = (key in overwrite ? overwrite : fixtures)[key]
      assert.equal(syllable(key), expected, key)
    }
  }
})
