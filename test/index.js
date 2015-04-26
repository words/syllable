'use strict';

/* eslint-env mocha */

/**
 * Dependencies.
 */

var syllable = require('..');
var fixtures = require('./fixture.json');
var assert = require('assert');

/**
 * The unit tests include in- and output values provided by the original,
 * and ancestor source code.
 *
 * The only test provided by the original code:
 *   http://search.cpan.org/~gregfast/Lingua-EN-Syllable-0.251/
 *   Syllable.pm
 *
 * The test provided by Text-Statistics:
 *   https://github.com/DaveChild/Text-Statistics
 *
 * This library foxusses on the required Text-Statistics tests (the
 * library provides both optional and required tests)
 */

describe('syllable()', function () {
    it('should be a `function`', function () {
        assert(typeof syllable === 'function');
    });

    it('should be case insensitive', function () {
        var result = syllable('syllables');

        assert(syllable('SYLLABLES') === result);
        assert(syllable('SyLlABlEs') === result);
    });

    it('should work on empty values', function () {
        assert(syllable('') === 0);
    });

    it('should work', function () {
        assert(syllable('syllables') === 3);
        assert(syllable('hoopty') === 2);
        assert(syllable('mmmm') === 1);
        assert(syllable('am') === 1);
    });
});

describe('fixtures', function () {
    var values = Object.keys(fixtures);

    it('should work on ' + values.length + ' fixtures', function () {
        values.forEach(function (value) {
            assert(syllable(value) === fixtures[value]);
        });
    });
});
