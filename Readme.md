# syllable [![Build Status](https://travis-ci.org/wooorm/syllable.svg?branch=master)](https://travis-ci.org/wooorm/syllable) [![Coverage Status](https://img.shields.io/coveralls/wooorm/syllable.svg)](https://coveralls.io/r/wooorm/syllable?branch=master)

Get syllable count in JavaScript.

## Installation

npm:
```sh
$ npm install syllable
```

Component:
```sh
$ component install wooorm/syllable
```

Bower:
```sh
$ bower install syllable
```

## Usage

```js
var syllable = require('syllable');

syllable("syllable"); // 3
syllable("unicorn"); // 3
syllable("hi"); // 1
syllable("hihi"); // 2
syllable("mmmmmmmmmmmmmmmm"); // 1
```

## Benchmark

On a MacBook Air, it runs about 57,000 words per second.


```
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

MIT © Titus Wormer
