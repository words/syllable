# syllable

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Syllable count in JavaScript.

## Install

[npm][]:

```sh
npm install syllable
```

## API

```javascript
var syllable = require('syllable')

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

```text
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

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/words/syllable.svg

[build]: https://travis-ci.org/words/syllable

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
