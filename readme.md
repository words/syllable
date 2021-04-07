# syllable

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Syllable count in JavaScript.

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install syllable
```

## API

This package exports the following identifiers: `syllable`.
There is no default export.

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

## CLI

```txt
Usage: syllable [options] <words...>

Syllable count in an English word

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

## Inspiration

Based on the syllable functionality found in [`Text-Statistics`][stats] (PHP),
in turn inspired by [`Lingua::EN::Syllable`][lingua] (Perl).

Support for word-breaks, non-ASCII characters, and many fixes added later.

## Related

*   [`automated-readability`](https://github.com/words/automated-readability)
    — Formula to detect ease of reading according to the Automated Readability
    Index (1967)
*   [`buzzwords`](https://github.com/words/buzzwords)
    — List of buzzwords
*   [`coleman-liau`](https://github.com/words/coleman-liau)
    — Formula to detect the ease of reading a text according to the Coleman-Liau
    index (1975)
*   [`cuss`](https://github.com/words/cuss)
    — Map of profane words to a rating of sureness
*   [`dale-chall`](https://github.com/words/dale-chall)
    — List of easy American-English words: The New Dale-Chall (1995)
*   [`dale-chall-formula`](https://github.com/words/dale-chall-formula)
    — Formula to find the grade level according to the (revised) Dale–Chall
    Readability Formula (1995)
*   [`fillers`](https://github.com/words/fillers)
    — List of filler words
*   [`flesch`](https://github.com/words/flesch)
    — Formula to detect the ease of reading a text according to Flesch Reading
    Ease (1975)
*   [`flesch-kincaid`](https://github.com/words/flesch-kincaid)
    — Formula to detect the grade level of text according to Flesch–Kincaid
    Grade Level (1975)
*   [`gunning-fog`](https://github.com/words/gunning-fog)
    — Formula to detect the ease of reading a text according to the Gunning fog
    index (1952)
*   [`hedges`](https://github.com/words/hedges)
    — List of hedge words
*   [`profanities`](https://github.com/words/profanities)
    — List of profane words
*   [`smog-formula`](https://github.com/words/smog-formula)
    — Formula to detect the ease of reading a text according to the SMOG
    (Simple Measure of Gobbledygook) formula (1969)
*   [`spache`](https://github.com/words/spache)
    — List of familiar American-English words (1974)
*   [`spache-formula`](https://github.com/words/spache-formula)
    — Uses a dictionary, suited for lower reading levels
*   [`weasels`](https://github.com/words/weasels)
    — Formula to detect the grade level of text according to the (revised)
    Spache Readability Formula (1974)

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

[license]: license

[author]: https://wooorm.com

[stats]: https://github.com/DaveChild/Text-Statistics

[lingua]: https://metacpan.org/pod/Lingua::EN::Syllable
