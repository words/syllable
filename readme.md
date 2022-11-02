# syllable

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Count syllables in an English word.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`syllable(value)`](#syllablevalue)
*   [CLI](#cli)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [Security](#security)
*   [Notice](#notice)
*   [License](#license)

## What is this?

This package estimates how many syllables are in an English word.

## When should I use this?

Use this when you want to do fun things with natural language, like rhyming,
detecting reading ease, etc.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+, 16.0+), install with [npm][]:

```sh
npm install syllable
```

In Deno with [`esm.sh`][esmsh]:

```js
import {syllable} from 'https://esm.sh/syllable@5'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {syllable} from 'https://esm.sh/syllable@5?bundle'
</script>
```

## Use

```js
import {syllable} from 'syllable'

syllable('syllable') // 3
syllable('unicorn') // 3
syllable('hi') // 1
syllable('hihi') // 2
syllable('mmmmmmmmmmmmmmmm') // 1
syllable('wine') // 1
syllable('bottle') // 2
syllable('wine-bottle') // 3
syllable('Åland') // 2
```

## API

This package exports the identifier `syllable`.
There is no default export.

### `syllable(value)`

Get the number of syllables in `value`.

###### `value`

Value to check (`string`, required).

##### Returns

Syllables in `value` (`number`).

## CLI

```txt
Usage: syllable [options] <words...>

Count syllables in English words

Options:

  -h, --help           output usage information
  -v, --version        output version number

Usage:

# output syllables
$ syllable syllable unicorn
# 6

# output syllables from stdin
$ echo "syllable unicorn banana" | syllable
# 9
```

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
It also works in Deno and modern browsers.

## Related

*   [`automated-readability`](https://github.com/words/automated-readability)
    — formula to detect ease of reading according to the Automated Readability
    Index (1967)
*   [`buzzwords`](https://github.com/words/buzzwords)
    — list of buzzwords
*   [`coleman-liau`](https://github.com/words/coleman-liau)
    — formula to detect the ease of reading a text according to the Coleman-Liau
    index (1975)
*   [`cuss`](https://github.com/words/cuss)
    — map of profane words to a rating of sureness
*   [`dale-chall`](https://github.com/words/dale-chall)
    — list of easy American-English words: The New Dale-Chall (1995)
*   [`dale-chall-formula`](https://github.com/words/dale-chall-formula)
    — formula to find the grade level according to the (revised) Dale–Chall
    Readability Formula (1995)
*   [`fillers`](https://github.com/words/fillers)
    — list of filler words
*   [`flesch`](https://github.com/words/flesch)
    — formula to detect the ease of reading a text according to Flesch Reading
    Ease (1975)
*   [`flesch-kincaid`](https://github.com/words/flesch-kincaid)
    — formula to detect the grade level of text according to Flesch–Kincaid
    Grade Level (1975)
*   [`gunning-fog`](https://github.com/words/gunning-fog)
    — formula to detect the ease of reading a text according to the Gunning fog
    index (1952)
*   [`hedges`](https://github.com/words/hedges)
    — list of hedge words
*   [`profanities`](https://github.com/words/profanities)
    — list of profane words
*   [`smog-formula`](https://github.com/words/smog-formula)
    — formula to detect the ease of reading a text according to the SMOG
    (Simple Measure of Gobbledygook) formula (1969)
*   [`spache`](https://github.com/words/spache)
    — list of familiar American-English words (1974)
*   [`spache-formula`](https://github.com/words/spache-formula)
    — uses a dictionary, suited for lower reading levels
*   [`weasels`](https://github.com/words/weasels)
    — formula to detect the grade level of text according to the (revised)
    Spache Readability Formula (1974)

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## Security

This package is safe.

## Notice

Based on the syllable functionality found in [`Text-Statistics`][stats] (PHP),
in turn inspired by [`Lingua::EN::Syllable`][lingua] (Perl).

Support for word-breaks, non-ASCII characters, and many fixes added later.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/words/syllable/workflows/main/badge.svg

[build]: https://github.com/words/syllable/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/words/syllable.svg

[coverage]: https://codecov.io/github/words/syllable

[downloads-badge]: https://img.shields.io/npm/dm/syllable.svg

[downloads]: https://www.npmjs.com/package/syllable

[size-badge]: https://img.shields.io/bundlephobia/minzip/syllable.svg

[size]: https://bundlephobia.com/result?p=syllable

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[license]: license

[author]: https://wooorm.com

[stats]: https://github.com/DaveChild/Text-Statistics

[lingua]: https://metacpan.org/pod/Lingua::EN::Syllable
