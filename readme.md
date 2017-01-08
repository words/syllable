# syllable [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Syllable count in JavaScript.

## Installation

[npm][]:

```bash
npm install syllable
```

## Usage

```javascript
var syllable = require('syllable');

syllable('syllable'); // 3
syllable('unicorn'); // 3
syllable('hi'); // 1
syllable('hihi'); // 2
syllable('mmmmmmmmmmmmmmmm'); // 1
syllable('wine'); // 1
syllable('bottle'); // 2
syllable('wine-bottle'); // 3
syllable('Åland'); // 2
```

## CLI

Install:

```bash
npm install --global syllable
```

Use:

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

Based on the syllable functionality found in [**Text-Statistics**][stats]
(PHP), in turn inspired by [**Lingua-EN-Syllable**][lingua] (Perl).

Support for word-breaks and non-ASCII characters added later.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/syllable.svg

[travis]: https://travis-ci.org/wooorm/syllable

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/syllable.svg

[codecov]: https://codecov.io/github/wooorm/syllable

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[stats]: https://github.com/DaveChild/Text-Statistics

[lingua]: http://search.cpan.org/~gregfast/Lingua-EN-Syllable-0.251
