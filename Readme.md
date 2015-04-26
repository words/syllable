# syllable [![Build Status](https://img.shields.io/travis/wooorm/syllable.svg?style=flat)](https://travis-ci.org/wooorm/syllable) [![Coverage Status](https://img.shields.io/coveralls/wooorm/syllable.svg?style=flat)](https://coveralls.io/r/wooorm/syllable?branch=master)

Syllable count in JavaScript.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
$ npm install syllable
```

[Component.js](https://github.com/componentjs/component):

```bash
$ component install wooorm/syllable
```

[Bower](http://bower.io/#install-packages):

```bash
$ bower install syllable
```

[Duo](http://duojs.org/#getting-started):

```javascript
var syllable = require('wooorm/syllable');
```

## Usage

Dependencies:

```javascript

var syllable = require('syllable');
```

Results:

```javascript

syllable('syllable'); // 3
syllable('unicorn'); // 3
syllable('hi'); // 1
syllable('hihi'); // 2
syllable('mmmmmmmmmmmmmmmm'); // 1
```

## CLI

Install:

```bash
$ npm install --global syllable
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

## Benchmark

On a MacBook Air, it runs about 57,000 words per second.

```text
          syllable — this module
  57 op/s » op/s * 1,000

          syllablistic
  37 op/s » op/s * 1,000

          text-statistics
  51 op/s » op/s * 1,000
```

## Inspiration

Based on the syllable functionality found in [**Text-Statistics**](https://github.com/DaveChild/Text-Statistics) (PHP), in turn inspired by [Lingua-EN-Syllable](http://search.cpan.org/~gregfast/Lingua-EN-Syllable-0.251/) (Perl).

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
